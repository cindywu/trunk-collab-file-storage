import {db} from '../../db.js';
import Pusher from 'pusher'

export default async (req, res) => {
  const push = req.body
  console.log('Processing push', JSON.stringify(push))

  const t0 = Date.now()
  try {
    await db.tx(async t => {
      const {nextval: version} = await t.one("SELECT nextval('version')")
      let lastMutationID = await getLastMutationID(t, push.clientID)

      console.log('version', version, 'lastMutationID:', lastMutationID)

      for (const mutation of push.mutations) {
        const t1 = Date.now()

        const expectedMutationID = lastMutationID + 1

        if (mutation.id < expectedMutationID) {
          console.log(
            `Mutation ${mutation.id} has already been processed - skipping`,
          );
          continue;
        }
        if (mutation.id > expectedMutationID) {
          console.warn(`Mutation ${mutation.id} is from the future - aborting`)
          break;
        }

        console.log('Processing mutation:', JSON.stringify(mutation))

        switch (mutation.name) {
          case 'createReference':
            await createReference(t, mutation.args, version)
            break
          case 'deleteReference':
            await deleteReference(t, mutation.args, version)
            break
          case 'updateReference':
            await updateReference(t, mutation.args, version)
            break
          default:
            throw new Error(`Unknown mutation: ${mutation.name}`)
        }

        lastMutationID = expectedMutationID
        console.log('Processed mutation in', Date.now() - t1);
      }

      await sendPoke();

      console.log(
        'setting',
        push.clientID,
        'last_mutation_id to',
        lastMutationID,
      )
      await t.none(
        'UPDATE reference_replicache_client SET last_mutation_id = $2 WHERE id = $1',
        [push.clientID, lastMutationID],
      )
      res.send('{}')
    })
  } catch (e) {
    console.error(e)
    res.status(500).send(e.toString())
  } finally {
    console.log('Processed push in', Date.now() - t0)
  }
};

async function getLastMutationID(t, clientID) {
  const clientRow = await t.oneOrNone(
    'SELECT last_mutation_id FROM reference_replicache_client WHERE id = $1',
    clientID,
  );
  if (clientRow) {
    return parseInt(clientRow.last_mutation_id)
  }

  console.log('Creating new client', clientID)
  await t.none(
    'INSERT INTO reference_replicache_client (id, last_mutation_id) VALUES ($1, 0)',
    clientID,
  );
  return 0
}

async function createReference(t, {id, src, source_url, name, parent, date, description, labels, comments}, version) {
  await t.none(
    `INSERT INTO reference (
      id, src, source_url, name, parent, date, description, labels, comments, version) values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [id, src, source_url, name, parent, date, description, labels, comments, version],
  );
}

async function deleteReference(t, {id}) {
  await t.none(
    `UPDATE reference
    SET
    deleted = true
    WHERE id = ($1)`,
    [id],
  )
}

async function updateReference(t, {id, src, source_url, name, parent, date, description, labels, comments}, version) {
  await t.none(
    `UPDATE reference
    SET
    src = ($2),
    source_url = ($3),
    name = ($4),
    parent = ($5),
    date = ($6),
    description = ($7),
    labels = ($8),
    comments = ($9),
    version = ($10)
    WHERE id = ($1)`,
    [id, src, source_url, name, parent, date, description, labels, comments, version],
  )
}

async function sendPoke() {
  const pusher = new Pusher({
    appId: process.env.NEXT_PUBLIC_REPLICHAT_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_REPLICHAT_PUSHER_KEY,
    secret: process.env.NEXT_PUBLIC_REPLICHAT_PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_REPLICHAT_PUSHER_CLUSTER,
    useTLS: true,
  })
  const t0 = Date.now()
  await pusher.trigger('default', 'poke', {})
  console.log('Sent poke in', Date.now() - t0)
}
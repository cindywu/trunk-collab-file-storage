import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import {db} from '../../db.js';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pull = req.body;
  console.log(`Processing pull`, JSON.stringify(pull));
  const t0 = Date.now();

  try {
    await db.tx(async t => {
      const lastMutationID = parseInt(
        (
          await db.oneOrNone(
            'select last_mutation_id from reference_replicache_client where id = $1',
            pull.clientID,
          )
        )?.last_mutation_id ?? '0',
      );
      const changed = await db.manyOrNone(
        'select id, source_url, name, parent, date, description, labels, comments, deleted from reference',
        parseInt(pull.cookie ?? 0),
      )
      const cookie = (
        await db.one('select max(version) as version from reference')
      ).version;
      console.log({cookie, lastMutationID, changed})

      const patch = []

      if (pull.cookie === null) {
        patch.push({
          op: 'clear',
        })
      }

      patch.push(
        ...changed.map(row => {
          if (row.deleted == true) {
            console.log("<<<<<<< im gonna delete u", row)
            return (
              {
                op: 'del',
                key: `ref/${row.id}`
              }
            )
          } else {
            return (
              {
                op: 'put',
                key: `ref/${row.id}`,
                value: {
                  source_url: row.source_url,
                  name: row.name,
                  parent: row.parent,
                  date: row.date,
                  description: row.description,
                  labels: row.labels,
                  comments: row.comments,
                },
              }
            )
          }
        })
      )

      console.log('patch', patch)

      res.json({
        lastMutationID,
        cookie,
        patch,
      });
      res.end();
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.toString());
  } finally {
    console.log('Processed pull in', Date.now() - t0);
  }
};

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   res.json({
//     lastMutationID: 0,
//     cookie: null,
//     patch: [
//       {op: 'clear'},
//       {
//         op: 'put',
//         key: 'ref/fad2277c-2042-4eb1-afb6-5689118cbc61',
//         value: {
//           id: 'fad2277c-2042-4eb1-afb6-5689118cbc61',
//           name: 'Clery 2013',
//           parent: 'Wurzel 202X',
//           date: 'Apr 10',
//           description: 'someone said i should read this',
//           labels: [
//             {
//               id: uuidv4(),
//               name: 'Book',
//               color: '#D8EDF2'
//             },
//             {
//               id: uuidv4(),
//               name: 'Missing',
//               color: '#DB615D'
//             }
//           ],
//           comments: [
//             {
//               id: uuidv4(),
//               user: '@cindy',
//               content: 'why are we reading this?'
//             }
//           ]
//         }
//       },
//       {
//         op: 'put',
//         key: 'ref/7cedcf38-3863-496e-bef6-b8e2c3664a70',
//         value: {
//           id: '7cedcf38-3863-496e-bef6-b8e2c3664a70',
//           name: 'Harchol et al. 2020',
//           parent: '',
//           date: 'Apr 10',
//           description: 'A public option for the core',
//           labels: [
//             {
//               id: uuidv4(),
//               name: 'Journal article',
//               color: '#EDC963'
//             }
//           ],
//           comments: [
//             {
//               id: uuidv4(),
//               user: 'cindy',
//               content: 'GPT-3 summary: In the past, all the big companies who make up the Internet used to work together to help find new ways to build more Internet, but now they are all fighting against each other.'
//             },
//             {
//               id: uuidv4(),
//               user: 'jsoares',
//               content: 'Kids today... ^_^'
//             },
//             {
//               id: uuidv4(),
//               user: 'jsoares',
//               content: `This isn't new: most of the non-US Tier1 ISPs (TeliaSonera, Telefonica, Deutsche Telekom, Telecom Italia, NTT, ...) were once public.`
//             },
//             {
//               id: uuidv4(),
//               user: 'jsoares',
//               content: "(public as in state-owned)"
//             },
//             {
//               id: uuidv4(),
//               user: 'karolakirsanow',
//               content: `"Abundant supply and increasing competition have led to robust price erosion throughout the global bandwidth market. New 100 Gbps equipped submarine cable systems and upgrades to existing networks have further lowered unit costs"`
//             },
//             {
//               id: uuidv4(),
//               user: 'karolakirsanow',
//               content: `naive Q: how much of the internet's traffic is google and amazon sending packets to themselves?`
//             },
//             {
//               id: uuidv4(),
//               user: 'willscott',
//               content: `There's a disconnect here. the observation is that lots of traffic in individual wide area providers networks stays within their network now. The top level public core that is proposed does not compete with that trend - a google would still be motivated to lease direct lines between its disparate data centers since it can predict traffic needs and gains extra control by having that infrastructure fully under its control. Its hard to imagine that there's an economy of scale these large content providers are missing out on where they'd be economically motivated to offload that traffic back into public core. On the other hand the end user traffic to content providers still goes through 'the public internet' in so much as BGP is still in play. the public internet has just shrunk to the meet-me room at the local POP rather than backhaul links.`
//             },
//             {
//               id: uuidv4(),
//               user: 'jsoares',
//               content: `The observation is still relevant but I agree with Will's point. I don't know the answer to Karola's question but I wouldn't imagine it to be /that/ substantial. It is definitely a big (absolute) number given the scale of both services; however, it would be a very bad sign for their engineering if the inter-DC traffic overhead (as in inter-data-centre traffic / user traffic) was high. OVER-simplifying an example, YouTube only needs to transfer a new video to each DC once, from where it will be downloaded by millions of people afterwards. A more interesting question is e.g. how much of the trans-oceanic traffic consists of cloud providers moving data around? I'd expect that fraction to be a lot higher, because this model of distributed data centers greatly reduces the need for trans-oceanic user traffic even as it increases trans-oceanic inter-DC traffic.`
//             },
//             {
//               id: uuidv4(),
//               user: 'evan',
//               content: `I think the connection the authors imply later in the paper is that a public internet that this paragraph describes is more susceptible to net neutrality violations (since e.g. google can prioritize google traffic on their links)`
//             },
//           ]
//         }
//       },
//     ],
//   })
//   res.end()
// }

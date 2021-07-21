import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import ReferenceAdd from '../../components/reference-add'
import NavWest from '../../components/nav-west'
import NavNorth from '../../components/nav-north'
import NavSouth from '../../components/nav-south'
import NavEast from '../../components/nav-east'
import styles from '../../styles/workspace.module.css'

import { Replicache } from 'replicache'

export default function Workspace() {
  const [rep, setRep] = useState<any>(null)

  useEffect(() => {
    (async() => {
      const rep = new Replicache({
        pushURL: '/api/rep-push',
        pullURL: 'api/rep-pull',
        wasmModule: '/replicache.dev.wasm'
      })
      listen(rep)
      setRep(rep)
    })()
  }, [])

  function listen(rep: any){
    console.log('i am in listen')
  }

  return (
    <Layout>
      <Head>
        <title>Workspace</title>
      </Head>
      <ReferenceAdd />
      <div className={styles.container}>
        <NavWest />
        <div className={styles.center}>
          <NavNorth />
          <NavSouth rep={rep}/>
        </div>
        <NavEast />
      </div>
    </Layout>
  )
}

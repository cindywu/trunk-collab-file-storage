import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import ReferenceAdd from '../../components/reference-add'
import NavWest from '../../components/nav-west'
import NavNorth from '../../components/nav-north'
import NavSouth from '../../components/nav-south'
import NavEast from '../../components/nav-east'
import styles from '../../styles/workspace.module.css'

export default function Workspace() {
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
          <NavSouth />
        </div>
        <NavEast />
      </div>
    </Layout>
  )
}

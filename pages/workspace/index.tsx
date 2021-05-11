import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import ReferenceAdd from '../../components/ReferenceAdd'
import NavigationWest from '../../components/NavigationWest'
import NavigationNorth from '../../components/NavigationNorth'
import NavigationSouth from '../../components/NavigationSouth'
import NavigationEast from '../../components/NavigationEast'
import styles from '../../styles/workspace.module.css'

export default function Workspace() {
  return (
    <Layout>
      <Head>
        <title>Workspace</title>
      </Head>
      <ReferenceAdd />
      <div className={styles.container}>
        <NavigationWest />
        <div className={styles.center}>
          <NavigationNorth />
          <NavigationSouth />
        </div>
        <NavigationEast />
      </div>
    </Layout>
  )
}

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import ReferenceProvider from '../../components/ReferenceProvider'
import ReferenceAdd from '../../components/ReferenceAdd'
import NavigationSidebar from '../../components/NavigationSidebar'
import NavigationTopbar from '../../components/NavigationTopbar'
import ReferenceList from '../../components/ReferenceList'
import ReferenceEdit from '../../components/ReferenceEdit'
import styles from '../../styles/workspace.module.css'

export default function Workspace() {
  return (
    <Layout>
      <Head>
        <title>Workspace</title>
      </Head>
      <ReferenceProvider>
        <ReferenceAdd />
        <div className={styles.container}>
          <NavigationSidebar />
          <div className={styles.center}>
            <NavigationTopbar />
            <ReferenceList />
          </div>  
          <ReferenceEdit />      
        </div>
      </ReferenceProvider>
    </Layout>
  )
}

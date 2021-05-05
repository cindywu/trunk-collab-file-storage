import React, { useState, createContext, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import ReferenceAdd from '../../components/ReferenceAdd'
import NavigationSidebar from '../../components/NavigationSidebar'
import NavigationTopbar from '../../components/NavigationTopbar'
import ReferenceList from '../../components/ReferenceList'
import { sampleReferenceData } from '../../utils/sample-data'
import styles from '../../styles/workspace.module.css'
import { v4 as uuidv4 } from 'uuid'
import type { IReference } from '../../interfaces'

type ReferencesContextType = {
  references: Array<IReference>
  showReferenceAddModal: boolean
  handleReferenceAdd: () => void
  handleReferenceArchive: (id: string) => void
}

const defaultContextValue = {
  references: [],
  showReferenceAddModal: false,
  handleReferenceAdd: () => {},
  handleReferenceArchive: (id: string) => {}
}

export const ReferenceContext = createContext<ReferencesContextType>(defaultContextValue)

const LOCAL_STORAGE_KEY = 'trunk.references'

type Props = {
  children: React.ReactNode
}

export const ReferenceProvider = ({ children } : Props) => {
  const [references, setReferences] = useState(sampleReferenceData)
  const [showReferenceAddModal, setShowReferenceAddModal] = useState(false)

  useEffect(() => {
    const referenceJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (referenceJSON != null) setReferences(JSON.parse(referenceJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(references))
  }, [references])

  const referenceContextValue = {
    references,
    showReferenceAddModal,
    handleReferenceAdd,
    handleReferenceArchive
  }

  function handleReferenceAdd() {
    const newReference = {
      id: uuidv4(),
      name: 'New',
      parent: 'Parent',
      date: 'Apr 10',
      description: 'A very informative title',
      labels: [
        {
          id: uuidv4(),
          name: 'label',
          color: '#DB615D'
        }
      ],
      comments: [
        {
          id: uuidv4(),
          user: 'cindy',
          content: 'why are we reading this?'
        }
      ]
    }
    setReferences([...references, newReference])
  }

  function handleReferenceArchive(id: string) {
    setReferences(references.filter(reference => reference.id !== id))
  }

  return (
    <ReferenceContext.Provider value={referenceContextValue}>
      {children}
    </ReferenceContext.Provider>
  )
}

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
        </div>
      </ReferenceProvider>
    </Layout>
  )
}

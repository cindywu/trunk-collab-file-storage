import React, { useState, createContext, useEffect, useContext } from 'react'
import { IReference } from '../interfaces'
import { v4 as uuidv4 } from 'uuid'
import { sampleReferenceData } from '../utils/sample-data'

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

export const ReferencesContext = createContext<ReferencesContextType>(defaultContextValue)

const LOCAL_STORAGE_KEY = 'trunk.references'

type ReferenceProviderProps = {
  children: React.ReactNode
}

export const ReferenceProvider = ({ children } : ReferenceProviderProps) => {
  const [references, setReferences] = useState(sampleReferenceData)
  const [showReferenceAddModal, setShowReferenceAddModal] = useState(false)

  useEffect(() => {
    const referenceJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (referenceJSON != null) setReferences(JSON.parse(referenceJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(references))
  }, [references])

  const referencesContextValue = {
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
    <ReferencesContext.Provider value={referencesContextValue}>
      {children}
    </ReferencesContext.Provider>
  )
}

export const useReferences = () => useContext(ReferencesContext)

export default ReferenceProvider
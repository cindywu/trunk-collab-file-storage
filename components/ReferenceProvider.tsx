import React, { useState, createContext, useEffect, useContext } from 'react'
import { IReference } from '../interfaces'
import { v4 as uuidv4 } from 'uuid'
import { sampleReferenceData } from '../utils/sample-data'

type ReferencesContextType = {
  references: IReference[]
  selectedReference: IReference | undefined
  showReferenceAdd: boolean
  handleReferenceAdd: (newReference: IReference) => void
  handleReferenceArchive: (id: string) => void
  handleReferenceSelect: (id: string) => void
  handleReferenceDeselect: () => void
  handleReferenceChange: (id: string | undefined, reference: IReference) => void
  handleShowReferenceAdd: () => void
}

const defaultContextValue = {
  references: [],
  selectedReference: undefined,
  showReferenceAdd: false,
  handleReferenceAdd: (newReference: IReference) => {},
  handleReferenceArchive: (id: string) => {},
  handleReferenceSelect: (id: string) => {},
  handleReferenceDeselect: () => {},
  handleReferenceChange: (id: string | undefined, reference: IReference) => {},
  handleShowReferenceAdd: () => {}
}

export const ReferencesContext = createContext<ReferencesContextType>(defaultContextValue)

const LOCAL_STORAGE_KEY = 'trunk.references'

type ReferenceProviderProps = {
  children: React.ReactNode
}

export const ReferenceProvider = ({ children } : ReferenceProviderProps) => {
  const [references, setReferences] = useState<IReference[]>(sampleReferenceData)
  const [showReferenceAdd, setShowReferenceAdd] = useState<boolean>(false)
  const [selectedReferenceId, setSelectedReferenceId] = useState<string | undefined>()

  const selectedReference = references.find(reference => reference.id === selectedReferenceId)

  useEffect(() => {
    const referenceJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (referenceJSON != null) setReferences(JSON.parse(referenceJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(references))
  }, [references])

  const referencesContextValue = {
    references,
    showReferenceAdd,
    selectedReference,
    handleReferenceAdd,
    handleReferenceArchive,
    handleReferenceSelect,
    handleReferenceDeselect,
    handleReferenceChange,
    handleShowReferenceAdd
  }

  function handleReferenceSelect(id: string){
    setSelectedReferenceId(id)
  }

  function handleShowReferenceAdd() {
    setShowReferenceAdd(!showReferenceAdd)
  }

  function handleReferenceAdd(newReference: IReference) {
    // const newReference = {
    //   id: uuidv4(),
    //   name: 'New',
    //   parent: 'Parent',
    //   date: 'Apr 10',
    //   description: 'A very informative title',
    //   labels: [
    //     {
    //       id: uuidv4(),
    //       name: 'label',
    //       color: '#DB615D'
    //     }
    //   ],
    //   comments: [
    //     {
    //       id: uuidv4(),
    //       user: 'cindy',
    //       content: 'why are we reading this?'
    //     }
    //   ]
    // }
    setReferences([...references, newReference])
    showReferenceAdd && setShowReferenceAdd(!showReferenceAdd)
  }

  function handleReferenceArchive(id: string) {
    setReferences(references.filter(reference => reference.id !== id))
  }

  function handleReferenceDeselect() {
    setSelectedReferenceId(undefined)
  }

  function handleReferenceChange(id: string | undefined, reference: IReference) {
    const newReferences = [...references]
    const index = newReferences.findIndex(r => r.id === id)
    newReferences[index] = reference
    setReferences(newReferences)
  }

  return (
    <ReferencesContext.Provider value={referencesContextValue}>
      {children}
    </ReferencesContext.Provider>
  )
}

export const useReferences = () => useContext(ReferencesContext)

export default ReferenceProvider
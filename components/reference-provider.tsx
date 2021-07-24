import React, { useState, createContext, useEffect, useContext, useRef } from 'react'
import { IReference } from '../interfaces'
import { sampleReferenceData } from '../utils/sample-data'
import { useSubscribe } from 'replicache-react'

type ReferencesContextType = {
  references: IReference[]
  selectedReference: IReference | undefined
  showReferenceAdd: boolean
  expandSelectedReference: boolean
  handleReferenceAdd: (newReference: IReference) => void
  handleReferenceArchive: (id: string) => void
  handleReferenceSelect: (id: string) => void
  handleReferenceDeselect: () => void
  handleReferenceChange: (id: string | undefined, reference: IReference) => void
  handleShowReferenceAdd: () => void
  handleReferenceExpandChange: () => void
  handleSetRep: (rep: any) => void
  handleSetSelectedReference: (reference: IReference) => void
}

const defaultContextValue = {
  references: [],
  selectedReference: undefined,
  showReferenceAdd: false,
  expandSelectedReference: false,
  handleReferenceAdd: (newReference: IReference) => {},
  handleReferenceArchive: (id: string) => {},
  handleReferenceSelect: (id: string) => {},
  handleReferenceDeselect: () => {},
  handleReferenceChange: (id: string | undefined, reference: IReference) => {},
  handleShowReferenceAdd: () => {},
  handleReferenceExpandChange: () => {},
  handleSetRep: (rep: any) => {},
  handleSetSelectedReference: (reference: IReference) => {}
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
  const [expandSelectedReference, setExpandSelectedReference] = useState<boolean>(false)
  const [rep, setRep] = useState<any>()
  const [selectedReference, setSelectedReference] = useState<IReference>()

  function handleSetSelectedReference(reference: IReference){
    setSelectedReference(reference)
  }


  const referencesContextValue = {
    references,
    showReferenceAdd,
    selectedReference,
    expandSelectedReference,
    handleReferenceAdd,
    handleReferenceArchive,
    handleReferenceSelect,
    handleReferenceDeselect,
    handleReferenceChange,
    handleShowReferenceAdd,
    handleReferenceExpandChange,
    handleSetRep,
    handleSetSelectedReference
  }

  function handleReferenceSelect(id: string){
    setSelectedReferenceId(id)
  }

  function handleShowReferenceAdd() {
    setShowReferenceAdd(!showReferenceAdd)
  }

  function handleReferenceAdd(newReference: IReference) {
    if (rep != undefined) {
      rep.mutate.createReference(newReference)
      showReferenceAdd && setShowReferenceAdd(!showReferenceAdd)
    }
  }

  function handleReferenceArchive(id: string) {
    if (rep != undefined) {
      rep.mutate.deleteReference({id: id})
    }
    // setReferences(references.filter(reference => reference.id !== id))
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

  function handleReferenceExpandChange() {
    setExpandSelectedReference(!expandSelectedReference)
  }

  function handleSetRep(rep: any) {
    setRep(rep)
  }

  return (
    <ReferencesContext.Provider
      value={referencesContextValue}
    >
      {children}
    </ReferencesContext.Provider>
  )
}

export const useReferences = () => useContext(ReferencesContext)

export default ReferenceProvider
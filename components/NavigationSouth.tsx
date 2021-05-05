import React from 'react'
import ReferenceList from './ReferenceList'
import ReferenceView from './ReferenceView'
import { useReferences } from './ReferenceProvider'

export default function NavigationSouth() {
  const { selectedReference, expandSelectedReference } = useReferences()
  return (
    <>
      { selectedReference && expandSelectedReference ?
        <ReferenceView />
      :
        <ReferenceList />
      }
      
    </>
  )
}

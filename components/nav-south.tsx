import React from 'react'
import ReferenceList from './reference-list'
import ReferenceView from './reference-view'
import { useReferences } from './reference-provider'

export default function NavSouth({rep} : any) {
  const { selectedReference, expandSelectedReference } = useReferences()
  return (
    <>
      { selectedReference && expandSelectedReference ?
        <ReferenceView />
      :
        <ReferenceList rep={rep}/>
      }

    </>
  )
}

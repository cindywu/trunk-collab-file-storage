import React from 'react'
import ReferenceList from './reference-list'
import ReferenceView from './reference-view'
import { useReferences } from './reference-provider'
import { useSubscribe } from 'replicache-react'

export default function NavSouth({ rep } : any) {
  const { selectedReference, expandSelectedReference } = useReferences()

  const references = useSubscribe(
    rep,
    async tx => {
      const list = await tx.scan({ prefix: 'ref/'}).entries().toArray()
      return list
    },
    [],
  )
  return (
    <>
      { selectedReference && expandSelectedReference ?
        <ReferenceView />
      :
        <ReferenceList references={references}/>
      }
    </>
  )
}

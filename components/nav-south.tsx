import React, { useState, useEffect } from 'react'
import ReferenceList from './reference-list'
import ReferenceView from './reference-view'
import { useReferences } from './reference-provider'
import { useSubscribe } from 'replicache-react'

export default function NavSouth({ rep } : any) {
  const { selectedReferenceId, expandSelectedReference } = useReferences()
  const [selectedReference, setSelectedReference] = useState<any>()

  const references = useSubscribe(
    rep,
    async tx => {
      const list = await tx.scan({ prefix: 'ref/'}).entries().toArray()
      return list
    },
    [],
  )

  useEffect(() => {
    selectedReferenceId ?
    findSelectedReference()
    :
    setSelectedReference(null)
  }, [selectedReferenceId, references])

  function findSelectedReference(){
    references.map(([k, v]) => {
      if (k.substring(4) === selectedReferenceId) {
        const payload = v
        Object.assign(payload, {id: k.substring(4)})
        setSelectedReference(payload)
      }
    })
  }

  return (
    <>
      { selectedReference && expandSelectedReference ?
        <ReferenceView
          references={references}
          selectedReference={selectedReference}
          setSelectedReference={setSelectedReference}
        />
      :
        <ReferenceList
          references={references}
          selectedReference={selectedReference}
        />
      }
    </>
  )
}

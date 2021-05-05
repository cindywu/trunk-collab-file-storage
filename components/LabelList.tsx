import React from 'react'
import Label from './Label'
import type { ILabel } from '../interfaces'

interface LabelListProps {
  labels: Array<ILabel>
}

export default function LabelList({ labels } : LabelListProps) {

  const labelElements = labels.map(label => {
    return <Label key={label.id} {...label} />
  })

  return (
    <>
      {labelElements}
    </>
  )
}

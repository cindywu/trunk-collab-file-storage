import React from 'react'
import Label from './label'
import type { ILabel } from '../interfaces'

type Props = {
  labels: ILabel[]
}

export default function LabelList({ labels } : Props) {
  const labelElements = labels.map(label => {
    return <Label key={label.id} {...label} />
  })

  return (
    <>
      {labelElements}
    </>
  )
}

import React from 'react'
import Label from './label'
import type { ILabel } from '../interfaces'

type Props = {
  labels: ILabel[]
}

export default function LabelList({ labels } : Props) {
  const labelElements = labels.map((label, index) => {
    return <Label key={index} {...label} />
  })

  return (
    <>
      {labelElements}
    </>
  )
}

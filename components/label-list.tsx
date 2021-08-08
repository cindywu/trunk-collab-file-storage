import React from 'react'
import Label from './label'

type Props = {
  labels: any[]
}

export default function LabelList({ labels } : Props) {
  const labelElements = labels.map((label, index) => {
    const obj = JSON.parse(label)
    return <Label key={index} label={obj} />
  })

  return (
    <>
      {labelElements}
    </>
  )
}

export type IReference = {
  id: string
  name: string
  parent: string
  date: string
  description: string
  labels: Array<ILabel>
  comments: Array<IComment>
}

export type ILabel = {
  id: string
  name: string
  color: string
}

export type IComment = {
  id: string
  user: string
  content: string
}
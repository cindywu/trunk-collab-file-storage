import React from 'react'
import styles from './reference-edit.module.css'
import ReferenceLabelEdit from './reference-label-edit'
import ReferenceCommentEdit from './reference-comment-edit'
import { useReferences } from './reference-provider'
import { ILabel, IComment } from '../interfaces'
import { v4 as uuidv4 } from 'uuid'

export default function ReferenceEdit() {
  const {
    selectedReference,
    handleReferenceArchive,
    handleReferenceDeselect,
    handleReferenceChange,
    handleReferenceExpandChange,
    expandSelectedReference
  } = useReferences()

  if (selectedReference === undefined) {
    return null
  }

  function handleChange(changes: object){
    selectedReference && handleReferenceChange(selectedReference.id, { ...selectedReference, ...changes })
  }

  function handleLabelChange(id: string, label: ILabel) {
    if (selectedReference !== undefined) {
      const newLabels = [...selectedReference.labels]
      const index = newLabels.findIndex(i => i.id === id)
      newLabels[index] = label
      handleChange({ labels: newLabels })
    }
  }

  const handleLabelAdd = () =>  {
    const newLabel = {
      id: uuidv4(),
      name: '',
      color: '',
    }
    handleChange({ labels: [...selectedReference.labels, newLabel]})
  }

  const handleLabelDelete = (id: string) => {
    handleChange({
      labels: selectedReference.labels.filter((label) => label.id !== id)
    })
  }

  function handleCommentChange(id: string, comment: IComment) {
    if (selectedReference !== undefined) {
      const newComments = [...selectedReference.comments]
      const index = newComments.findIndex(i => i.id === id)
      newComments[index] = comment
      handleChange({ comments: newComments })
    }

  }

  const handleCommentAdd = () => {
    const newComment = {
      id: uuidv4(),
      user: 'cindy',
      content: ''
    }
    handleChange({ comments: [...selectedReference.comments, newComment]})
  }

  const handleCommentDelete = (id: string) => {
    handleChange({
      comments: selectedReference.comments.filter((comment) => comment.id !== id)
    })
  }

  return (
    selectedReference &&
    <div className={styles.container}>
      <div className={styles.navigationButtonContainer}>
        {!expandSelectedReference &&
          <button
            className="btn btn--secondary"
            onClick={handleReferenceExpandChange}
          >
            Expand
          </button>
        }
        <button
          className="btn btn--secondary"
          onClick={handleReferenceDeselect}
        >
          &times;
        </button>
      </div>
      <div className={styles.detailsGrid}>
        <label
          htmlFor="name"
          className={styles.label}
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={selectedReference.name}
          onChange={e => handleChange({ name: e.target.value })}
          className={styles.input} />
        <label
          htmlFor="parent"
          className={styles.label}
        >
          Parent
        </label>
        <input
          type="text"
          name="parent"
          id="parent"
          autoComplete="off"
          value={selectedReference.parent}
          onChange={e => handleChange({ parent: e.target.value })}
          className={styles.input} />
        <label
          htmlFor="date"
          className={styles.label}>
          Date
        </label>
        <input
          type="text"
          name="date"
          id="date"
          autoComplete="off"
          value={selectedReference.date}
          onChange={e => handleChange({ date: e.target.value })}
          className={styles.input} />
        <label
          htmlFor="description"
          className={styles.label}>
          Description
        </label>
        <textarea
          name="description"
          id="description"
          onChange={e => handleChange({ description: e.target.value })}
          value={selectedReference.description}
          className={styles.input} />
      </div>
      <div>
        <label
          htmlFor="labels"
          className={styles.label}>
          Labels
        </label>
        <div className={styles.labelGrid}>
          <div>
            Name
          </div>
          <div>
            Color
          </div>
          <div></div>
          {selectedReference.labels.map((label, index) => (
            <ReferenceLabelEdit
              handleLabelChange={handleLabelChange}
              handleLabelDelete={handleLabelDelete}
              label={label}
              key={index}
            />
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button
            className="btn btn--primary"
            onClick={handleLabelAdd}
          >
            Add Label
          </button>
        </div>
        <label
          htmlFor="comments"
          className={styles.label}
        >
          Comments
        </label>
        <div className={styles.commentGrid}>
          <div>User</div>
          <div>Content</div>
          <div></div>
          {selectedReference.comments.map(comment => (
            <ReferenceCommentEdit
              handleCommentChange={handleCommentChange}
              handleCommentDelete={handleCommentDelete}
              key={comment.id}
              comment={comment}
            />
          ))}

        </div>
        <div className={styles.buttonContainer}>
          <button
            className="btn btn--primary"
            onClick={handleCommentAdd}
          >
            Add Comment
          </button>
        </div>
        <div
          className={styles.buttonContainer}
        >
          <button
            className="btn btn--secondary"
            onClick={() => handleReferenceArchive(selectedReference.id)}
          >
            Archive
          </button>
        </div>
      </div>
    </div>
  )
}

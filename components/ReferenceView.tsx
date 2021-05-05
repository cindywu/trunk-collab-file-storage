import React from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { useReferences } from './ReferenceProvider' 

export default function ReferenceView() {
  const { selectedReference } = useReferences()
  return (
    <>
      {selectedReference &&
        <div className="reference-view__container">
          <div className="reference-view__reference-view-container">
            <div className="reference-view__reference-name">{selectedReference.name}</div>
            <div className="reference-view__reference-description">{selectedReference.description}</div>
            <div className="reference-view__add-sub-reference-button-container">
              <button className="btn btn-secondary">+ Add sub-references</button>
            </div>
            <CommentList />
            <CommentForm />
          </div> 
        </div>
      }
    </>
  )
}

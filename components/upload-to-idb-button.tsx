import React from 'react'

export default function UploadToIDBButton(props:any) {
  console.log('props', props)
  return (
    <div>
      <label className="button primary block" htmlFor="single">
        {props.loading ? 'Uploading ...' : '+ Upload to indexedDB, then to Supabase'}
      </label>
      <input
        style={{
          visibility: 'hidden',
          position: 'absolute',
        }}
        type="file"
        id="single"
        accept="image/*, application/pdf"
        onChange={props.onUpload}
        disabled={props.loading}
      />
    </div>
  )
}

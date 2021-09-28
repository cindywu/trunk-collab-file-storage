import { ChangeEventHandler } from 'react'

export type UploadButtonProps = {
  onUpload: ChangeEventHandler<HTMLInputElement>
  loading: boolean
  sourceUrl: string
}

export default function UploadButton(props: UploadButtonProps) {
  return (
    <div>
      <label className="button primary block" htmlFor="single">
        {props.loading ? 'Uploading ...' :
          props.sourceUrl ? '+ Replace source file' : '+ Add source file'
        }
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

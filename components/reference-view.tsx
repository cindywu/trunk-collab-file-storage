import React, { useState, ChangeEvent, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import CommentList from './comment-list'
import CommentForm from './comment-form'
import UploadButton from './upload-button'
import styles from './reference-view.module.css'
import { v4 as uuidv4 } from 'uuid'
import { useReferences } from './reference-provider'
import ProfileCard from './profile-card'
import * as base64 from 'base64-arraybuffer'
import { Document, Page } from 'react-pdf'


export default function ReferenceView({ references, selectedReference, setSelectedReference }: any) {
  let blobby = new Blob([""], { type: 'application/pdf' });
  const [uploading, setUploading] = useState<boolean>(false)
  const [sourceFile, setSourceFile] = useState<string | null> (null)
  const [session, setSession] = useState(null)
  const [src, setSrc] = useState('')
  const [filePath, setFilePath] = useState('')
  const [blob, setBlob] = useState<any>(blobby)
  const [fileName, setFileName] = useState('')
  const [filey, setFiley] = useState<any>()
  const LOCAL_STORAGE_KEY = 'supabase.auth.token'

  const {
    handleReferenceChange,
  } = useReferences()

  function handleChange(changes: object){
    const payload = {...selectedReference, ...changes}
    console.log('payload', payload)
    selectedReference && handleReferenceChange(payload)
    setSelectedReference(payload)
  }

  useEffect(() => {
    const session = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (session != null) (
      setSession(JSON.parse(session).currentSession)
    )
  }, [])

  useEffect(() => {
    let payload = {source_url: filePath, src: src}
    handleChange(payload)
    console.log('i am in reference view useEffect, src dependent')
  }, [src, filePath])

  useEffect(() => {
    console.log('i am in reference view useEffect, blob dependent', blob)
    console.log('hi', toDataURL(blob).then((dataUrl) => { console.log('dataUrl', dataUrl)}))
    function srcToFile(src, fileName, mimeType){
      return (fetch(src)
          .then(function(res){return res.arrayBuffer();})
          .then(function(buf){return new File([buf], fileName, {type:mimeType});})
      );
    }
    srcToFile(blob, 'hello.pdf', 'application/pdf').then(function(filey){
      console.log('filey', filey)
      setFiley(filey)
    })
  }, [blob])

  const DEFAULT_SOURCE_FILES_BUCKET = 'avatars'

  async function readFile(file: any) {
    const arrayBuffer = await new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.readAsArrayBuffer(file)
    })
    return arrayBuffer
  }

  async function toDataURL(blob: any) {
    const dataUrl = await new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
    return dataUrl
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }
      const file = event.target.files[0]

      console.log('file', file)
      const fileExt = file.name.split('.').pop()
      const fileName=`${session?.user.id}/${uuidv4()}.${fileExt}`
      const filePath = `${fileName}`
      setFilePath(filePath)

      readFile(file).then((arrayBuffer: ArrayBuffer) => {
        const base64String = base64.encode(arrayBuffer)
        setSrc(base64String)
        const backToFile = base64.decode(base64String)
        const dog = new Uint32Array(backToFile)
        const newnew = new Blob([backToFile], { type: 'application/pdf' })
        setBlob(newnew)
        const url = window.URL.createObjectURL(newnew)
      })

      toDataURL(blob).then((dataUrl: any) => {
        console.log('blob', blob)
        console.log('dataUrl', dataUrl)
      })



      const user = supabase.auth.user()

      const files = event.target.files

      const type = file.type
      const obj_url = window.URL.createObjectURL(file)

      const arrayBuffer = new ArrayBuffer(files.length)
      const view = new Uint8Array(arrayBuffer)


      let { error: uploadError } = await supabase.storage
        .from(DEFAULT_SOURCE_FILES_BUCKET)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      let { error: updateError } = await supabase.from('profiles').upsert({
        id: user!.id,
        avatar_url: filePath,
      })

      if (updateError) {
        throw updateError
      }

      setSourceFile(null)
      setSourceFile(filePath)

    } catch (error) {
      alert(error.message)

    } finally {
      setUploading(false)

    }
  }

  return (
    <>
      {selectedReference && references.map(([k, v] : [any, any]) => {
        const id = k.substring(4)
        return (
          id === selectedReference.id &&
            <div className={styles.container} key={id}>
              <div className={styles.name}>{v.name}</div>
              <div className={styles.description}>{v.description}</div>
              {/* <div className={styles.buttonContainer}>
                <button className={`${styles.subReferenceButton} btn btn-secondary`}>+ Add sub-references</button>
              </div> */}
              <div className={styles.buttonContainer}>
                <button className={`${styles.subReferenceButton} btn btn-secondary`}>
                  <UploadButton
                    onUpload={uploadAvatar}
                    loading={uploading}
                  />
                </button>
              </div>
              <ProfileCard profile={selectedReference}/>
              <div>
                <Document file={window.URL.createObjectURL(blob)}>
                  <Page pageNumber={1} />
                </Document>
              </div>
              <CommentList selectedReference={v}/>
              <CommentForm selectedReference={v}/>
            </div>
        )
      })}
    </>
  )
}

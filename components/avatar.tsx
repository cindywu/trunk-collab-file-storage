import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { DEFAULT_AVATARS_BUCKET } from '../lib/constants'

export default function Avatar({ url, size }: { url: string | null; size: number }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [localSourceUrl, setLocalSourceUrl] = useState<string |null>(null)

  useEffect(() => {
    if (url) {
      console.log('get pdf from indexedDB')
      downloadPDFFromIDB(url)
    }
  }, [url])

  function idbOK() {
    return "indexedDB" in window
  }


  function downloadPDFFromIDB(url) {

    let refIDSourceID = url.split('/')
    let string = refIDSourceID[1]+"/"+refIDSourceID[2]
    let thing = string.split('.')
    let final = thing[0]

    if (!idbOK()) return

    let openRequest = indexedDB.open('trunk_idb1', 1)

    openRequest.onupgradeneeded = function(event: any) {
      let thisDB = event.target.result

      if (!thisDB.objectStoreNames.contains('sources')) {
        thisDB.createObjectStore('sources', { keyPath: 'id' })
      }
    }

    openRequest.onsuccess = function(event: any) {
      let db = event.target.result
      let tx = db.transaction(['sources'], 'readonly')
      let store = tx.objectStore('sources')

      var request = store.get(final)

      request.onerror = function(event: any) {
        console.log('error', event.target.error.name)
      }

      request.onsuccess = function(event: any) {
        var result = event.target.result
        console.dir(result)
        const hi = URL.createObjectURL(result.file)
        setLocalSourceUrl(hi)
      }
    }

    openRequest.onerror = function(event:any) {
      console.dir(event)
      console.log('you need to fetch the file from supabase, it is not available in indexedDB')
    }

  }

  // async function downloadImage(path: string) {
  //   try {
  //     const { data, error } = await supabase.storage.from(DEFAULT_AVATARS_BUCKET).download(path)
  //     if (error) {
  //       throw error
  //     }

  //     const url = URL.createObjectURL(data)
  //     setAvatarUrl(url)
  //   } catch (error) {
  //     console.log('Error downloading image: ', error.message)
  //   }
  // }

  return localSourceUrl ? (
    <div>
      <a href={localSourceUrl} target="_blank">🗂 Source file</a>
    </div>
  ) : (
    <div className="avatar no-image" style={{ height: size, width: size }} >
    No source file
    </div>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { LayoutAnimation } from 'react-native'
import * as RNFetchBlob from 'rn-fetch-blob'
import { BookAction } from 'shared/model'
import { Storage } from 'shared/storage'

export const savePath = RNFetchBlob.default.fs.dirs.CacheDir

export const useFileAction = (
  bookId: number,
  url: string,
  initialStatus?: string
) => {
  const storage = Storage.getInstance()
  const [status, setStatus] = useState(initialStatus)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    async function checkFileExist() {
      const fileIds = await storage.getFileIds()

      if (fileIds.includes(bookId.toString())) {
        setStatus(BookAction.DOWNLOADED)
      }
    }

    checkFileExist()
  }, [status])

  const doAction = useCallback(() => {
    switch (status) {
      case BookAction.DOWNLOAD:
        setStatus(BookAction.DOWNLOADING)
        const task = RNFetchBlob.default
          .config({
            path: `${savePath}/${bookId}.pdf`
          })
          .fetch('GET', url)
          .progress({ count: 50 }, (received, total) => {
            setProgress(received / total)
          })

        task
          .then(() => {
            // console.log('The file saved to ', res.path())
            setStatus(BookAction.DOWNLOADED)
            storage.setFileId(bookId.toString())
          })
          .catch(() => {
            setStatus(BookAction.DOWNLOAD)
          })
        break
      case BookAction.UPDATE:
        LayoutAnimation.easeInEaseOut()
        setStatus(BookAction.DOWNLOADING)
        break
      case BookAction.DOWNLOADING:
        // Ask for canceling the request
        // storage.removeFileId(bookId.toString())
        // setStatus(BookAction.DOWNLOAD)
        break
      default:
        // Maybe user need read book, ignore here
        break
    }
  }, [status])

  return {
    status,
    progress,
    doAction
  }
}

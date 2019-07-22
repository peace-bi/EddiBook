import { useCallback, useEffect, useState } from 'react'
import { LayoutAnimation } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import * as RNFetchBlob from 'rn-fetch-blob'
import { BookAction } from 'shared/model'
import { Storage } from 'shared/storage'

export interface FileAction {
  status?: string
  progress: number
  doAction: () => void
  readFile: () => Promise<void>
}
export const savePath = RNFetchBlob.default.fs.dirs.CacheDir

export const useFileAction = (
  bookId: number,
  url: string,
  initialStatus?: string
) => {
  const storage = Storage.getInstance()
  const [status, setStatus] = useState(initialStatus)
  const [progress, setProgress] = useState(0)
  const navigation = useNavigation()

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

  const readFile = useCallback(async () => {
    const fileExist = await RNFetchBlob.default.fs.exists(
      `${savePath}/${bookId}.pdf`
    )

    if (!fileExist) {
      storage.removeFileId(bookId.toString())
      setStatus(BookAction.DOWNLOAD)
    } else {
      navigation.navigate('ViewPDF', {
        url: `${savePath}/${bookId}.pdf`
      })
    }
  }, [url])

  return {
    status,
    progress,
    doAction,
    readFile
  } as FileAction
}

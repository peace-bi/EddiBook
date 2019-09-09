import { Modal } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import { ChangeActionStatus } from 'pages/BookShelf/+state/bookshelf.actions'
import { useCallback, useState } from 'react'
import { LayoutAnimation } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import * as RNFetchBlob from 'rn-fetch-blob'
import { BookAction } from 'shared/model'
import { Storage } from 'shared/storage'
import { useThunkDispatch } from 'shared/util'

export interface FileAction {
  status?: string
  progress: number
  doAction: () => void
  readFile: () => Promise<void>
  deleteFile: () => void
}
export const savePath = RNFetchBlob.default.fs.dirs.CacheDir

export const useFileAction = (
  bookId: number,
  url: string,
  status: BookAction
) => {
  const storage = Storage.getInstance()
  const [progress, setProgress] = useState(0)
  const navigation = useNavigation()
  const dispatch = useThunkDispatch()

  const doAction = useCallback(async () => {
    const { jwt } = await storage.getToken()

    switch (status) {
      case BookAction.DOWNLOAD:
        dispatch(
          ChangeActionStatus.get({ bookId, status: BookAction.DOWNLOADING })
        )
        const task = RNFetchBlob.default
          .config({
            path: `${savePath}/${bookId}.pdf`
          })
          .fetch('GET', encodeURI(url), {
            Authorization: `bearer ${jwt}`
          })
          .progress({ count: 50 }, (received, total) => {
            setProgress(received / total)
          })

        task
          .then(() => {
            // console.log('The file saved to ', res.path())
            dispatch(
              ChangeActionStatus.get({
                bookId,
                status: BookAction.DOWNLOADED
              })
            )
            storage.setFileId(bookId.toString())
          })
          .catch(() => {
            dispatch(
              ChangeActionStatus.get({
                bookId,
                status: BookAction.DOWNLOAD
              })
            )
          })
        break
      case BookAction.UPDATE:
        LayoutAnimation.easeInEaseOut()
        // TODO: Implement here
        dispatch(
          ChangeActionStatus.get({ bookId, status: BookAction.DOWNLOADING })
        )
        break
      case BookAction.DOWNLOADING:
        // Ask for canceling the request
        // storage.removeFileId(bookId.toString())
        // setStatus(BookAction.DOWNLOAD)
        break
      default:
        break
    }
  }, [status])

  const readFile = useCallback(async () => {
    const fileExist = await RNFetchBlob.default.fs.exists(
      `${savePath}/${bookId}.pdf`
    )

    if (!fileExist) {
      storage.removeFileId(bookId.toString())
      dispatch(ChangeActionStatus.get({ bookId, status: BookAction.DOWNLOAD }))
      // setStatus(BookAction.DOWNLOAD)
    } else {
      navigation.navigate('ViewPDF', {
        url: `${savePath}/${bookId}.pdf`
      })
    }
  }, [url])

  const deleteFile = useCallback(async () => {
    const fileExist = await RNFetchBlob.default.fs.exists(
      `${savePath}/${bookId}.pdf`
    )

    if (fileExist) {
      RNFetchBlob.default.fs.unlink(`${savePath}/${bookId}.pdf`).then(() => {
        storage.removeFileId(bookId.toString())
        dispatch(
          ChangeActionStatus.get({ bookId, status: BookAction.DOWNLOAD })
        )
        Modal.alert('', Localize.t('Common.Success'), [
          {
            text: Localize.t('Common.OK'),
            style: 'cancel'
          }
        ])
      })
    }
  }, [url])

  return {
    status,
    progress,
    doAction,
    readFile,
    deleteFile
  } as FileAction
}

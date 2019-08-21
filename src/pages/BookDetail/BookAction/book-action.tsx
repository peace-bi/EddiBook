import { Button } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React, { forwardRef, Fragment, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { getHost } from 'shared/api'
import { useFileAction } from 'shared/hooks'
import { BookAction } from 'shared/model'
import { RootReducer } from 'shared/store/rootReducer'
import styled from 'styled-components/native'

interface Props {
  bookId: number
  bookUrl: string
  ref: any
}

const ButtonOutline = styled(Button).attrs((props) => ({
  styles: {
    defaultRawText: {
      color: props.theme.primary_color
    }
  }
}))`
  border-color: ${(props) => props.theme.primary_color};
`

export const BookActionButton = forwardRef((props: Props, ref: any) => {
  const actionStatusState = useSelector(
    (s: RootReducer) => s.BookShelfState.actionStatus
  )
  const status = actionStatusState[props.bookId]
  const fileAction = useFileAction(
    props.bookId,
    `${getHost()}${props.bookUrl}`,
    status
  )

  useImperativeHandle(ref, () => ({

    deleteBook() {
      fileAction.deleteFile()
    }

  }))

  let btnView
  switch (status) {
    case BookAction.DOWNLOADED:
      btnView = (
        <Button
          type="primary"
          onPress={fileAction.readFile}
          style={{ alignSelf: 'stretch', marginTop: 36 }}
        >
          {Localize.t('Common.Read')}
        </Button>
      )
      break
    case BookAction.DOWNLOAD:
      btnView = (
        <Button
          type="primary"
          onPress={fileAction.doAction}
          style={{ alignSelf: 'stretch', marginTop: 36 }}
        >
          {Localize.t('Common.Download')}
        </Button>
      )
      break
    case BookAction.DOWNLOADING:
      btnView = (
        <Button
          type="primary"
          loading
          onPress={fileAction.doAction}
          style={{ alignSelf: 'stretch', marginTop: 36 }}
        >
          {Localize.t('Common.Download')}
        </Button>
      )
      break
    case BookAction.UPDATE:
      btnView = (
        <View
          style={{
            marginTop: 36,
            alignSelf: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <ButtonOutline onPress={fileAction.doAction} style={{ flex: 0.45 }}>
            {Localize.t('Common.Update')}
          </ButtonOutline>
          <Button type="primary" onPress={() => {}} style={{ flex: 0.45 }}>
            {Localize.t('Common.Read')}
          </Button>
        </View>
      )
      break
    default:
      btnView = <Fragment />
      break
  }

  return btnView
})

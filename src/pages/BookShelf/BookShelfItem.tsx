import { Card, Modal, WhiteSpace, WingBlank } from '@ant-design/react-native'
import React, { useCallback, useState } from 'react'
import {
  Alert,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as Progress from 'react-native-progress'
import { useNavigation } from 'react-navigation-hooks'
import * as RNFetchBlob from 'rn-fetch-blob'
import { Ribbon, StyledCategory } from 'shared/components'
import { EddiIcon } from 'shared/util'
import styled, { css } from 'styled-components/native'
import { Book, BookAction } from './+model'

interface Props {
  item: Book
}

const StyledView = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
`

const StyledBodyContent = styled.View`
  flex: 1;
  padding-left: 16px;
`
const StyledMutedText = styled.Text`
  color: #bdbdbd;
  margin-top: 8px;
  font-size: 12px;
`
const StyledTitleText = styled.Text`
  height: 40px;
  color: #4f4f4f;
  font-size: 16px;
  font-weight: bold;
`

const StyledPdfImage = styled(FastImage)`
  width: 95px;
  height: 150px;
  margin-top: -30;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`

// prettier-ignore
const StyledStatusContainer = styled.View`
  position: absolute;
  right: -3;
  top: -10;
  ${Platform.select({
    ios: css`
      zIndex: 999;
    `,
    android: css`
      elevation: 999;
    `
  })};
`

const StyledStatusRibbon = styled(Ribbon)``

const getAction = (status?: string, progress?: number) => {
  if (!status || status === BookAction.READ) {
    return <Text>Read</Text>
  }
  if (status === BookAction.DOWNLOADING) {
    return <Progress.Pie progress={progress} size={24} />
  }
  if (status === BookAction.UPDATE) {
    return <Text>Update</Text>
  }

  const iconName = status === BookAction.DOWNLOAD ? 'download' : 'next'
  return <EddiIcon name={iconName} size={38} color="#F23F3C" />
}

const useFileAction = (initialStatus?: string) => {
  const [status, setStatus] = useState(initialStatus)
  const [progress, setProgress] = useState(0)

  const doAction = useCallback(() => {
    switch (status) {
      case BookAction.DOWNLOAD:
        Modal.prompt(
          'Access Code',
          'Please enter the access code to view your bookshelf.',
          (password) => {
            if (password) {
              setStatus(BookAction.DOWNLOADING)
              RNFetchBlob.default
                .config({
                  fileCache: true,
                  appendExt: 'zip'
                })
                .fetch('GET', 'https://sample-videos.com/zip/10mb.zip')
                .progress({ count: 50 }, (received, total) => {
                  setProgress(received / total)
                })
                .then((res) => {
                  Alert.alert('The file saved to ', res.path())
                  setStatus(BookAction.READ)
                })
            }
          },
          'default',
          undefined,
          ['Access code']
        )
        break

      default:
        Alert.alert('b' + status)
        setStatus(BookAction.DOWNLOAD)
        break
    }
  }, [status])

  return {
    status,
    progress,
    doAction
  }
}

export const BookShelfItem = ({ item }: Props) => {
  const fileAction = useFileAction(item.action)
  const { navigate } = useNavigation()
  const navigateDetail = useCallback(() => {
    navigate('BookDetail', {
      id: item.key
    })
  }, [])

  return (
    <TouchableWithoutFeedback onPress={navigateDetail}>
      <View style={{ flex: 1 }}>
        <WhiteSpace size="lg" style={{ paddingTop: 15 }} />
        <WingBlank style={{ paddingBottom: 20 }}>
          <StyledStatusContainer>
            <StyledStatusRibbon size={30} textSize={8} />
          </StyledStatusContainer>

          <Card
            style={{
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 2
            }}
          >
            <Card.Body style={{ borderTopWidth: 0, paddingBottom: 16 }}>
              <StyledView>
                <StyledPdfImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: item.coverUrl
                  }}
                />
                <StyledBodyContent>
                  <WhiteSpace size="xl" />
                  <StyledTitleText numberOfLines={2} ellipsizeMode="tail">
                    {item.name}
                  </StyledTitleText>
                  <StyledMutedText>License end date 10/12/2020</StyledMutedText>
                  <View
                    style={{
                      marginTop: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <StyledCategory>Foreign Language</StyledCategory>
                    <TouchableWithoutFeedback onPress={fileAction.doAction}>
                      {getAction(fileAction.status, fileAction.progress)}
                    </TouchableWithoutFeedback>
                  </View>
                </StyledBodyContent>
              </StyledView>
            </Card.Body>
          </Card>
        </WingBlank>
      </View>
    </TouchableWithoutFeedback>
  )
}

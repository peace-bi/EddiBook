import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'
import React, { useCallback, useState } from 'react'
import { Alert, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import * as Progress from 'react-native-progress'
import { useNavigation } from 'react-navigation-hooks'
import * as RNFetchBlob from 'rn-fetch-blob'
import { StyledCategory } from 'shared/components'
import { savePath } from 'shared/hooks/file'
import { EddiIcon } from 'shared/util'
import { Book, BookAction } from './+model'
import * as Styled from './BookShelf.contant'

interface Props {
  item: Book
}

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
        setStatus(BookAction.DOWNLOADING)
        RNFetchBlob.default
          .config({
            path: `${savePath}/example.pdf`
          })
          .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf')
          .progress({ count: 50 }, (received, total) => {
            setProgress(received / total)
          })
          .then((res) => {
            Alert.alert('The file saved to ', res.path())
            setStatus(BookAction.READ)
          })
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
          <Styled.StatusContainer>
            <Styled.StatusRibbon size={30} textSize={8} />
          </Styled.StatusContainer>

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
              <Styled.ItemContainer>
                <Styled.PdfImage
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: item.coverUrl
                  }}
                />
                <Styled.ItemBodyContent>
                  <WhiteSpace size="xl" />
                  <Styled.TitleText numberOfLines={2} ellipsizeMode="tail">
                    {item.name}
                  </Styled.TitleText>
                  <Styled.MutedText>
                    License end date 10/12/2020
                  </Styled.MutedText>
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
                </Styled.ItemBodyContent>
              </Styled.ItemContainer>
            </Card.Body>
          </Card>
        </WingBlank>
      </View>
    </TouchableWithoutFeedback>
  )
}

import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React, { Fragment, useCallback } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import * as Progress from 'react-native-progress'
import { useNavigation } from 'react-navigation-hooks'
import { getHost } from 'shared/api'
import { StyledCategory } from 'shared/components'
import { useFileAction } from 'shared/hooks'
import { BookAction } from 'shared/model'
import { Book } from './+model'
import * as Styled from './BookShelf.contant'

interface Props {
  item: Book
  status: Dictionary<BookAction>
}

const getActionView = (status?: string, progress?: number) => {
  if (!status || status === BookAction.DOWNLOADED) {
    return <Fragment />
  }
  if (status === BookAction.DOWNLOADING) {
    return <Progress.Pie progress={progress} size={24} />
  }
  if (status === BookAction.UPDATE) {
    return (
      <Styled.ItemActionButton>
        <Styled.ItemActionText>Update</Styled.ItemActionText>
      </Styled.ItemActionButton>
    )
  }

  const iconName = status === BookAction.DOWNLOAD ? 'download' : 'next'
  return <Styled.HeaderActionIcon name={iconName} size={38} />
}

export const BookShelfItem = ({ item, status }: Props) => {
  const bookActionStatus = status[item.bookId]
  const fileAction = useFileAction(
    item.bookId,
    `${getHost()}${item.pdf}`,
    bookActionStatus
  )
  const { navigate } = useNavigation()
  const navigateDetail = useCallback(() => {
    navigate('BookDetail', {
      id: item.bookId,
      item
    })
  }, [])

  const renderLicenseTime = () => {
    if (item.hasLicenseExpired) {
      return Localize.t('Book.LicenseDate', {
        p: Localize.t('Common.Expired')
      })
    }
    if (item.licenseStatus === 'Perpetual') {
      return null
    }
    if (item.licenseEndDate) {
      return Localize.t('Book.LicenseDate', {
        p: Localize.strftime(new Date(item.licenseEndDate), '%Y/%m/%d')
      })
    }
    return null
  }

  return (
    <TouchableWithoutFeedback onPress={navigateDetail}>
      <View style={{ flex: 1 }}>
        <WhiteSpace size="lg" style={{ paddingTop: 15 }} />
        <WingBlank style={{ paddingBottom: 20 }}>
          <Styled.StatusContainer>
            {item.new ? <Styled.StatusRibbon size={30} textSize={8} /> : null}
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
                    uri: `${getHost()}${item.cover}`
                  }}
                />
                <Styled.ItemBodyContent>
                  <WhiteSpace size="xl" />
                  <Styled.TitleText numberOfLines={2} ellipsizeMode="tail">
                    {item.name}
                  </Styled.TitleText>
                  <Styled.MutedText>{renderLicenseTime()}</Styled.MutedText>
                  <View
                    style={{
                      marginTop: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <StyledCategory>{item.category}</StyledCategory>
                    <TouchableWithoutFeedback onPress={fileAction.doAction}>
                      {getActionView(bookActionStatus, fileAction.progress)}
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

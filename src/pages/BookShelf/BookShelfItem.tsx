import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'
import React from 'react'
import { Platform, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Ribbon } from 'shared/components'
import styled, { css } from 'styled-components/native'
import { Book } from './+model'

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
`

const StyledCategory = styled.Text`
  padding: 4px;
  border: 1px solid #e4e6ea;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
  font-size: 12px;
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

export const BookShelfItem = ({ item }: Props) => {
  return (
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
                <StyledCategory>Foreign Language</StyledCategory>
              </StyledBodyContent>
            </StyledView>
          </Card.Body>
        </Card>
      </WingBlank>
    </View>
  )
}

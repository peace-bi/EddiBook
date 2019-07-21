import { WhiteSpace } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import { StyledBodyText, StyledDescMutedText } from 'shared/components'
import { RenderItem } from 'shared/model'
import styled from 'styled-components/native'
import { data } from './mocks'

const StyledItemView = styled.View`
  width: 115px;
  margin-left: 8px;
  margin-right: 8px;
`

const StyledPdfImage = styled(FastImage)`
  width: 115px;
  height: 150px;
  border-width: 1px;
  border-color: ${(props) => props.theme.border_color_base};
  border-radius: 8px;
`

const StyledFLatList = styled(FlatList)`
  margin-left: 8px;
  margin-right: 8px;
  padding-bottom: 8px;
`

const StyledExpiredDate = styled(StyledDescMutedText)`
  font-size: 10px;
`

function keyExtractor(item: any) {
  return item.key
}

const renderItem = ({ item }: RenderItem<any>) => {
  return (
    <StyledItemView>
      <StyledPdfImage
        resizeMode={FastImage.resizeMode.cover}
        source={{
          uri: item.coverUrl
        }}
      />
      <WhiteSpace />
      <StyledBodyText numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </StyledBodyText>
      <WhiteSpace size="xs" />
      <StyledExpiredDate>
        {Localize.t('BookingDetail.ExpiryDate', {
          p: Localize.strftime(new Date(), '%m/%d/%Y')
        })}
      </StyledExpiredDate>
    </StyledItemView>
  )
}

export const RelatedBook = () => {
  const renderItemCall = useCallback(
    ({ item, index }) => renderItem({ item, index }),
    []
  )

  return (
    <StyledFLatList
      horizontal={true}
      data={data}
      renderItem={renderItemCall}
      keyExtractor={keyExtractor}
    />
  )
}

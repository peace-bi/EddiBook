import { Button, Icon, List, SearchBar } from '@ant-design/react-native'
import { throttle } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { Header } from 'react-navigation'
import styled from 'styled-components/native'

const Styled = {
  Container: styled.View`
    height: 100%;
  `,
  ViewWrapper: styled.View`
    height: ${Header.HEIGHT};
    flex-direction: row;
  `,
  BackButtonWrapper: styled.View`
    justify-content: center;
    flex: 0.3;
  `,
  BackButton: styled(Button)`
    border-width: 0;
    align-self: flex-start;
    background-color: transparent;
  `,
  BackButtonIcon: styled(Icon).attrs(() => ({
    name: 'left'
  }))`
    color: #888;
  `,
  TitleWrapper: styled.View`
    justify-content: center;
    flex: 0.4;
  `,
  HeaderTitle: styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  `,
  DoneWrapper: styled.View`
    justify-content: center;
    flex: 0.3;
  `,
  DoneButton: styled(Button)`
    border-width: 0;
    align-self: flex-end;
    background-color: transparent;
  `,
  DoneText: styled.Text`
    color: #f23f3c;
  `,
  CheckMarkIcon: styled(Icon).attrs(() => ({
    name: 'check'
  }))`
    color: #f23f3c;
  `
}

interface Props {
  headerTitle: string
  data: Array<{
    value: string
    label: string
  }>
  selectedValue: string | number
  closeModal: () => void
  handleChange: (e: unknown | React.ChangeEvent<any>) => void
}

export function PickerModal(props: Props) {
  const [selectedValue, setSelectedValue] = useState(props.selectedValue)
  const [activeList, setActiveList] = useState(props.data)
  const [searchKeyword, setSearchKeyword] = useState('')

  const debouncer = useRef(
    throttle((criteria: string) => {
      const result =
        criteria.length === 0
          ? props.data
          : props.data.filter(
              (country) =>
                country.label
                  .toLocaleLowerCase()
                  .indexOf(criteria.toLocaleLowerCase()) === 0
            )
      setActiveList(result)
    }, 300)
  )
  useEffect(() => {
    debouncer.current(searchKeyword)
  }, [searchKeyword])
  return (
    <Styled.Container>
      <Styled.ViewWrapper>
        <Styled.BackButtonWrapper>
          <Styled.BackButton onPress={props.closeModal}>
            <Styled.BackButtonIcon />
          </Styled.BackButton>
        </Styled.BackButtonWrapper>
        <Styled.TitleWrapper>
          <Styled.HeaderTitle>{props.headerTitle}</Styled.HeaderTitle>
        </Styled.TitleWrapper>
        <Styled.DoneWrapper>
          <Styled.DoneButton
            onPress={() => {
              props.handleChange(selectedValue)
              props.closeModal()
            }}
          >
            <Styled.DoneText>Done</Styled.DoneText>
          </Styled.DoneButton>
        </Styled.DoneWrapper>
      </Styled.ViewWrapper>
      <SearchBar onChange={setSearchKeyword} cancelText="Cancel" />
      <ScrollView>
        <List style={{ flex: 1 }}>
          {activeList.map(({ label, value }, index) => (
            <List.Item
              extra={selectedValue === value && <Styled.CheckMarkIcon />}
              key={index}
              onPress={() => setSelectedValue(value)}
            >
              {label}
            </List.Item>
          ))}
        </List>
      </ScrollView>
    </Styled.Container>
  )
}

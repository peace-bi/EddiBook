import { Button, Icon, List, SearchBar } from '@ant-design/react-native'
import { throttle } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { countryPickerStyles as styles } from '../edit-profile.constant'

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
                  .indexOf(criteria.toLocaleLowerCase()) > -1
            )
      setActiveList(result)
    }, 3000)
  )
  useEffect(() => {
    debouncer.current(searchKeyword)
  }, [searchKeyword])
  return (
    <View style={{ height: '100%' }}>
      <View style={styles.viewWrapper}>
        <View style={styles.backButtonWrapper}>
          <Button style={styles.backButton} onPress={props.closeModal}>
            <Icon name="left" style={styles.backButtonIcon} />
          </Button>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{props.headerTitle}</Text>
        </View>
        <View style={styles.doneWrapper}>
          <Button
            style={styles.doneButton}
            onPress={() => {
              props.handleChange(selectedValue)
              props.closeModal()
            }}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </Button>
        </View>
      </View>
      <SearchBar onChange={setSearchKeyword} cancelText="Cancel" />
      <ScrollView>
        <List style={{ flex: 1 }}>
          {activeList.map(({ label, value }, index) => (
            <List.Item
              extra={
                selectedValue === value && (
                  <Icon name="check" style={styles.checkMark} />
                )
              }
              key={index}
              onPress={() => setSelectedValue(value)}
            >
              {label}
            </List.Item>
          ))}
        </List>
      </ScrollView>
    </View>
  )
}

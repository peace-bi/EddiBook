import { List, Modal } from '@ant-design/react-native'
import { Localize } from 'core/localize'
import React, { useEffect, useState } from 'react'
import { ScrollView, Switch, View } from 'react-native'
import { PickerModal } from 'shared/components'
import { Storage } from 'shared/storage'

const RenderModalItem = (props: {
  label: string
  data: SelectItem[]
  disabled?: boolean
  handleChange: (e: unknown) => void
  selectedValue: string
}) => {
  const [openModal, setOpenModal] = useState(false)
  const result = props.data.find(
    (i) => i.value.toString() === props.selectedValue.toString()
  )
  return (
    <View>
      <List.Item
        extra={result ? result.label : ''}
        arrow="horizontal"
        onPress={() => setOpenModal(!openModal)}
      >
        {props.label}
      </List.Item>
      <Modal
        transparent={false}
        visible={openModal}
        animationType="slide-up"
        onClose={() => setOpenModal(!openModal)}
      >
        <PickerModal
          headerTitle={props.label}
          closeModal={() => setOpenModal(!openModal)}
          data={props.data}
          handleChange={props.handleChange}
          selectedValue={props.selectedValue}
        />
      </Modal>
    </View>
  )
}

const SettingComponent = () => {
  const [language, setLanguage] = useState('en')
  const [pageTransition, setPageTransition] = useState('curl')
  const [notify, setNotify] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const languageList: SelectItem[] = [
    {
      label: 'Vietnam',
      value: 'vi'
    },
    {
      label: 'English',
      value: 'en'
    }
  ]
  const pageTransitionList: SelectItem[] = [
    {
      label: 'Curl',
      value: 'curl'
    },
    {
      label: 'Scroll',
      value: 'scroll'
    }
  ]

  useEffect(() => {}, [language])
  // useEffect(()=> {}, [pageTransition])
  // useEffect(()=> {}, [notify])
  useEffect(() => {}, [darkMode])

  useEffect(() => {
    Storage.getInstance()
      .getLanguage()
      .then(setLanguage)
    Storage.getInstance()
      .getPageTransition()
      .then(setPageTransition)
  }, [])

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#f5f5f9' }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <List>
        <RenderModalItem
          label={Localize.t('Setting.Language')}
          data={languageList}
          handleChange={(value) => {
            setLanguage(value as string)
            Storage.getInstance().setLanguage(value as string)
          }}
          selectedValue={language}
        />
        <RenderModalItem
          label={Localize.t('Setting.PageTransition')}
          data={pageTransitionList}
          handleChange={(value) => {
            setPageTransition(value as string)
            Storage.getInstance().setPageTransition(value as string)
          }}
          selectedValue={pageTransition}
        />
        <List.Item
          extra={<Switch value={darkMode} onValueChange={setDarkMode} />}
        >
          {Localize.t('Setting.DarkMode')}
        </List.Item>
        <List.Item extra={<Switch value={notify} onValueChange={setNotify} />}>
          {Localize.t('Setting.Notification')}
        </List.Item>
      </List>
    </ScrollView>
  )
}

SettingComponent.navigationOptions = {
  headerTitle: 'Settings'
}

export default SettingComponent

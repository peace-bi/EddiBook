import { IconFill } from '@ant-design/icons-react-native'
import { Icon } from '@ant-design/react-native'
import { OnChangeParams } from '@ant-design/react-native/lib/checkbox/PropsType'
import CheckboxStyles from '@ant-design/react-native/lib/checkbox/style'
import { WithTheme } from '@ant-design/react-native/lib/style'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import {
  LayoutAnimation,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

interface Props {
  disabled?: boolean
  children?: any
  onChange?: (params: OnChangeParams) => void
  checked?: boolean
}

export const CheckBox = forwardRef((props: Props, ref: any) => {
  const { disabled, children, onChange, checked: initialChecked } = props
  const [checked, setChecked] = useState(initialChecked || false)
  const handleClick = useCallback(() => {
    if (disabled) {
      return
    }

    const afterCheck = !checked

    LayoutAnimation.easeInEaseOut()
    setChecked(afterCheck)

    if (onChange) {
      onChange({ target: { checked: afterCheck } })
    }
  }, [checked])

  useEffect(() => {
    if (initialChecked !== checked) {
      LayoutAnimation.easeInEaseOut()
      setChecked(initialChecked || false)
    }
  }, [initialChecked])

  useImperativeHandle(ref, () => ({
    toggle: () => {
      handleClick()
    }
  }))

  return (
    <WithTheme themeStyles={CheckboxStyles}>
      {(styles, theme) => {
        const iconSize = 22
        let icon
        if (checked) {
          icon = disabled ? (
            <IconFill
              name="check-square"
              style={[styles.icon]}
              size={iconSize}
            />
          ) : (
            <IconFill
              name="check-square"
              color={theme.brand_primary}
              style={[styles.icon]}
              size={iconSize}
            />
          )
        } else {
          icon = disabled ? (
            <Icon
              name="border"
              color={theme.dividerColor}
              style={[styles.icon]}
            />
          ) : (
            <Icon
              name="border"
              color={theme.dividerColor}
              style={[styles.icon]}
            />
          )
        }

        return (
          <TouchableWithoutFeedback onPress={handleClick}>
            <View style={[styles.wrapper]}>
              {icon}
              {typeof children === 'string' ? (
                // tslint:disable-next-line:jsx-no-multiline-js
                <Text style={styles.iconRight}>{children}</Text>
              ) : (
                children
              )}
            </View>
          </TouchableWithoutFeedback>
        )
      }}
    </WithTheme>
  )
})

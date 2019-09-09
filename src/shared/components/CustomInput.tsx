import { Icon } from '@ant-design/react-native'
import React, {
  forwardRef,
  RefForwardingComponent,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View
} from 'react-native'

export interface Props extends TextInputProps {
  valid?: ((e: string) => boolean | undefined) | (boolean | undefined)
  disabled?: boolean
  noBorder?: boolean
  style?: {}
}

interface OutputHandler {
  focus(): void
}

const CustomInputComponent: RefForwardingComponent<OutputHandler, Props> = (
  props: Props,
  ref
) => {
  const inputRef = useRef<TextInput>(null)
  const [inputValue, setInputValue] = useState(props.value || '')
  useImperativeHandle(ref, () => ({
    focus() {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }))
  const {
    valid,
    noBorder,
    onChangeText,
    style,
    secureTextEntry,
    disabled,
    placeholder,
    ...restProps
  } = props
  const isValid = !secureTextEntry
    ? inputStyleValidate(valid, inputValue)
    : valid
    ? !!inputStyleValidate(valid, inputValue)
      ? undefined
      : false
    : undefined
  const [canShowPassword, setCanShowPassword] = useState(secureTextEntry)
  return (
    <View style={[styles.container, style]}>
      <TextInput
        {...restProps}
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={'#BDBDBD'}
        value={inputValue}
        editable={disabled}
        onChangeText={(e) => {
          if (onChangeText) {
            onChangeText(e)
          }
          setInputValue(e)
        }}
        secureTextEntry={canShowPassword}
        style={{
          ...styles.input,
          ...(noBorder ? styles.inputNoBorder : styles.inputWithBorder),
          ...(disabled ? styles.disabled : {}),
          ...validateStyle(isValid)
        }}
      ></TextInput>
      {!secureTextEntry
        ? typeof isValid === 'boolean' && (
            <Icon
              name={!!isValid ? 'check' : 'close'}
              style={{
                color: !!isValid ? '#3AAA35' : '#E5007D',
                position: 'absolute',
                top: 16,
                fontSize: 16,
                right: 15
              }}
            />
          )
        : !disabled && (
            <View style={styles.showPasswordContainer}>
              <TouchableWithoutFeedback
                onPress={() => setCanShowPassword(!canShowPassword)}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 24, height: 24 }}
                  source={
                    canShowPassword
                      ? require('../assets/password-show.png')
                      : require('../assets/password-hide.png')
                  }
                />
              </TouchableWithoutFeedback>
            </View>
          )}
    </View>
  )
}
function inputStyleValidate(
  valid: ((e: string) => boolean | undefined) | (boolean | undefined),
  input: string
): boolean | undefined {
  let validString: boolean | undefined
  if (typeof valid === 'function') {
    const rule = valid(input)
    validString = rule !== undefined ? !!rule : undefined
  } else if (typeof valid === 'boolean') {
    validString = !!valid
  } else {
    validString = undefined
  }
  return validString
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    height: 48,
    width: '100%',
    flexDirection: 'row'
  },
  active: {},
  disabled: {
    backgroundColor: '#E4E6EA',
    borderColor: '#E4E6EA',
    color: '#43484B'
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    paddingBottom: 0,
    paddingTop: 0,
    height: 48,
    borderRadius: 9,
    paddingLeft: 14,
    paddingRight: 30,
    fontSize: 15
  },
  inputWithBorder: {
    borderWidth: 1
  },
  inputNoBorder: {
    borderWidth: 0
  },
  normalStyle: {
    borderColor: '#D3DCE6',
    color: '#1F2D3D'
  },
  validStyle: {
    borderColor: '#3AAA35',
    color: '#3AAA35'
  },
  errorStyle: {
    borderColor: '#E5007D',
    color: '#E5007D'
  },
  showPasswordContainer: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 12,
    right: 15
  }
})
const validateStyle = (
  styleName: boolean | undefined
): {
  borderColor: string
  color: string
} => {
  if (styleName === true) {
    return styles.validStyle
  } else if (styleName === false) {
    return styles.errorStyle
  }
  return styles.normalStyle
}
export type CustomInput = typeof CustomInput & OutputHandler
export const CustomInput = forwardRef(CustomInputComponent)

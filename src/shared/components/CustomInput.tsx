import React from 'react'
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
interface State {
  input: string
  showPassword: boolean
}
// tslint:disable-next-line:function-name
export class CustomInput extends React.PureComponent<Props, State> {
  inputRef: React.RefObject<TextInput>
  constructor(props: Props) {
    super(props)
    this.state = {
      input: props.value || '',
      showPassword: props.secureTextEntry || false
    }
    this.showPassword = this.showPassword.bind(this)
    this.inputRef = React.createRef()
  }
  handleChangeText(e: string) {
    this.setState({ input: e })
  }
  showPassword() {
    this.setState({ showPassword: !this.state.showPassword })
  }
  focus() {
    if (this.inputRef.current) {
      this.inputRef.current.focus()
    }
  }
  render() {
    const {
      valid,
      children,
      noBorder,
      value,
      onChangeText,
      onFocus,
      onBlur,
      style,
      secureTextEntry,
      disabled,
      placeholder,
      ...restProps
    } = this.props
    const { input } = this.state
    const isValid = !secureTextEntry
      ? inputStyleValidate(valid, input)
      : valid
      ? inputStyleValidate(valid, input) === 'true'
        ? 'undefined'
        : 'false'
      : 'undefined'
    return (
      <View
        style={{
          position: 'relative',
          alignSelf: 'center',
          height: 48,
          width: '100%',
          flexDirection: 'row',
          ...style
        }}
      >
        <TextInput
          {...restProps}
          ref={this.inputRef}
          placeholder={this.props.placeholder}
          placeholderTextColor={'#BDBDBD'}
          value={this.state.input}
          editable={this.props.disabled}
          onBlur={onBlur}
          onChangeText={(e) => {
            this.handleChangeText.bind(this)(e)
            if (onChangeText) {
              onChangeText(e)
            }
          }}
          secureTextEntry={this.state.showPassword}
          style={{
            ...styles.input,
            ...(noBorder ? styles.inputNoBorder : styles.inputWithBorder),
            ...(disabled ? styles.disabled : {}),
            ...validateStyle[isValid]
          }}
        >
          {children}
        </TextInput>
        {!secureTextEntry ? (
          <Image
            style={{
              width: 15,
              height: 15,
              position: 'absolute',
              top: isValid === 'true' ? 16 : 16,
              right: 15
            }}
            source={
              isValid === 'undefined'
                ? null
                : isValid === 'true'
                ? require('../assets/path.png')
                : require('../assets/close.png')
            }
          />
        ) : (
          !disabled && (
            <View
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                top: 12,
                right: 15
              }}
            >
              <TouchableWithoutFeedback onPress={this.showPassword}>
                <Image
                  resizeMode="contain"
                  style={{ width: 24, height: 24 }}
                  source={
                    this.state.showPassword
                      ? require('../assets/password-hide.png')
                      : require('../assets/password-show.png')
                  }
                />
              </TouchableWithoutFeedback>
            </View>
          )
        )}
      </View>
    )
  }
}
function inputStyleValidate(
  valid: ((e: string) => boolean | undefined) | (boolean | undefined),
  input: string
): 'true' | 'false' | 'undefined' {
  let validString: 'true' | 'false' | 'undefined' = 'undefined'
  if (typeof valid === 'function') {
    const rule = valid(input)
    validString =
      rule !== undefined ? (rule.toString() as 'true' | 'false') : 'undefined'
  } else if (typeof valid === 'boolean') {
    validString = valid.toString() as 'true' | 'false'
  } else {
    validString = 'undefined'
  }
  return validString
}
const styles = StyleSheet.create({
  container: {},
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
  }
})
const validateStyle: {
  [s: string]: {
    borderColor: string
    color: string
  }
} = {
  false: styles.errorStyle,
  true: styles.validStyle,
  undefined: styles.normalStyle
}

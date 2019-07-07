export interface ThemeAttribute {
  primaryColor: string
  brandPrimary: string
  brandPrimaryTap: string
  colorTextBase: string
  colorTextBaseInverse: string
  colorTextSecondary: string
  colorTextPlaceholder: string
  colorTextDisabled: string
  colorTextCaption: string
  colorTextParagraph: string
  fillBase: string
  fillBody: string
  fillTap: string
  fillDisabled: string
  fillMask: string
  colorIconBase: string
  fillGrey: string
  brandSuccess: string
  brandWarning: string
  brandError: string
  brandImportant: string
  brandWait: string
  borderColorBase: string
  primaryButtonFillTap: string
  warningButtonFill: string
  warningButtonFillTap: string
  linkButtonFillTap: string
  inputColorIcon: string
  tabBarFill: string
  toastFill: string
  searchBarFill: string
  searchColorIcon: string
  noticeBarFill: string
  switchFill: string
  dividerColor: string
  containerBackgroundColor: string
  colorTextMuted: string
}

export interface ThemeColor {
  [key: string]: ThemeAttribute
}

export const ThemeColor: ThemeColor = {
  light: {
    primaryColor: '#6abf47',
    brandPrimary: '#6abf47',
    brandPrimaryTap: '#6abf47',
    colorTextBase: '#4F4F4F',
    colorTextBaseInverse: '#ffffff',
    colorTextSecondary: '#a4a9b0',
    colorTextPlaceholder: '#bbbbbb',
    colorTextDisabled: '#bbbbbb',
    colorTextCaption: '#333333',
    colorTextParagraph: '#43484B',
    colorTextMuted: '#888888',
    fillBase: '#ffffff',
    fillBody: '#f5f5f9',
    fillTap: '#dddddd',
    fillDisabled: '#dddddd',
    fillMask: 'rgba(0, 0, 0, .4)',
    colorIconBase: '#cccccc',
    fillGrey: '#f7f7f7',
    brandSuccess: '#6abf47',
    brandWarning: '#f4333c',
    brandError: '#f4333c',
    brandImportant: '#ff5b05',
    brandWait: '#108ee9',
    borderColorBase: '#dddddd',
    primaryButtonFillTap: '#0e80d2',
    warningButtonFill: '#e94f4f',
    warningButtonFillTap: '#e94f4f',
    linkButtonFillTap: '#dddddd',
    inputColorIcon: '#cccccc',
    tabBarFill: '#ebeeef',
    toastFill: 'rgba(0, 0, 0, .8)',
    searchBarFill: '#efeff4',
    searchColorIcon: '#bbbbbb',
    noticeBarFill: '#fffada',
    switchFill: '#4dd865',
    dividerColor: '#F2F3F5',
    containerBackgroundColor: '#ffffff'
  },
  dark: {
    primaryColor: '#f4333c',
    brandPrimary: '#f4333c',
    brandPrimaryTap: '#f4333c',
    colorTextBase: '#ffffff',
    colorTextBaseInverse: '#000000',
    colorTextSecondary: '#a4a9b0',
    colorTextPlaceholder: '#bbbbbb',
    colorTextDisabled: '#bbbbbb',
    colorTextCaption: '#888888',
    colorTextParagraph: '#a4a9b0',
    colorTextMuted: '#888888',
    fillBase: '#ffffff',
    fillBody: '#f5f5f9',
    fillTap: '#dddddd',
    fillDisabled: '#dddddd',
    fillMask: 'rgba(0, 0, 0, .4)',
    colorIconBase: '#cccccc',
    fillGrey: '#f7f7f7',
    brandSuccess: '#6abf47',
    brandWarning: '#f4333c',
    brandError: '#f4333c',
    brandImportant: '#ff5b05',
    brandWait: '#108ee9',
    borderColorBase: '#dddddd',
    primaryButtonFillTap: '#0e80d2',
    warningButtonFill: '#e94f4f',
    warningButtonFillTap: '#e94f4f',
    linkButtonFillTap: '#dddddd',
    inputColorIcon: '#cccccc',
    tabBarFill: '#ebeeef',
    toastFill: 'rgba(0, 0, 0, .8)',
    searchBarFill: '#efeff4',
    searchColorIcon: '#bbbbbb',
    noticeBarFill: '#fffada',
    switchFill: '#4dd865',
    dividerColor: '#F2F3F5',
    containerBackgroundColor: '#000000'
  }
}

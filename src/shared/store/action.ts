import { defineAction } from 'redux-typed-actions'

export const ShowLoading = defineAction<void>('SHOW_LOADING')
export const HideLoading = defineAction<void>('HIDE_LOADING')
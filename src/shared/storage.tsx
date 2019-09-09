import AsyncStorage from '@react-native-community/async-storage'

interface Token {
  jwt: string
  refresh: string
}

export interface StorageKey {
  fileIds: string[]
  token: Token
  language: string
  pageTransition: string
  darkMode: string
}

export class Storage {
  static instance: Storage | null = null

  static getInstance() {
    if (Storage.instance === null) {
      Storage.instance = new Storage()
    }

    return this.instance as Storage
  }

  getAsyncStorage() {
    return AsyncStorage
  }

  async getItem(
    key: keyof StorageKey
  ): Promise<StorageKey[keyof StorageKey] | null> {
    try {
      const item = await this.getAsyncStorage().getItem(key)
      return item ? JSON.parse(item) : null
    } catch (e) {
      console.info(`getItem with ${key} error`, e)
      return null
    }
  }

  async setItem(key: keyof StorageKey, value: StorageKey[keyof StorageKey]) {
    try {
      await this.getAsyncStorage().setItem(key, JSON.stringify(value))

      return true
    } catch (e) {
      console.info(`setItem with ${key} error`, e)
      return false
    }
  }

  async removeItem(key: keyof StorageKey) {
    try {
      await this.getAsyncStorage().removeItem(key)

      return true
    } catch (e) {
      console.info(`removeItem with ${key} error`, e)
      return false
    }
  }

  async getFileIds(): Promise<string[]> {
    const item = (await this.getItem('fileIds')) as string[]
    return item || []
  }

  async getToken(): Promise<Token> {
    const item = (await this.getItem('token')) as Token
    return item || {}
  }

  async setToken(value: Token) {
    this.setItem('token', value)
  }

  async removeToken() {
    this.removeItem('token')
  }

  async setFileId(id: string) {
    const fileIds = await this.getFileIds()

    if (!fileIds.includes(id)) {
      fileIds.push(id)
      this.setItem('fileIds', fileIds)
    }
  }

  async removeFileId(id: string) {
    const fileIds = await this.getFileIds()
    const result = fileIds.filter((item) => item !== id)

    this.setItem('fileIds', result)
  }

  async getLanguage() {
    const item = (await this.getItem('language')) as string
    return item || ''
  }
  async setLanguage(key: string) {
    this.setItem('language', key)
  }

  async getPageTransition() {
    const item = (await this.getItem('pageTransition')) as string
    return item || ''
  }
  async setPageTransition(key: string) {
    this.setItem('pageTransition', key)
  }

  async getDarkMode() {
    const item = (await this.getItem('darkMode')) as string
    return item === 'true' || false
  }
  async setDarkMode(key: boolean) {
    this.setItem('darkMode', `${key}`)
  }
}

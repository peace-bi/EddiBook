export interface Book {
  key: string
  name: string
  status: string
  downloaded: boolean
  coverUrl: string
  action?: string
}

export enum BookAction {
  DOWNLOAD = 'DOWNLOAD',
  UPDATE = 'UPDATE',
  DOWNLOADING = 'DOWNLOADING',
  READ = 'READ'
}

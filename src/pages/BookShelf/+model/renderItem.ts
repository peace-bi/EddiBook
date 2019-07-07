import { RenderItem } from 'shared/model'

export interface BookRenderItem<S, P> extends RenderItem<S> {
  item: S
  index: number
  bookStatus: P[]
  setBookStatus: React.Dispatch<React.SetStateAction<P[]>>
}

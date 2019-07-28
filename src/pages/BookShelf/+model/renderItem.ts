import { RenderItem } from 'shared/model'

export interface BookRenderItem<S, P> extends RenderItem<S> {
  item: S
  index: number
  bookActionStatus: P
}

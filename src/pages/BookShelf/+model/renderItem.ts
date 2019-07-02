export interface RenderItem<S, P> {
  item: S
  index: number
  bookStatus: P[]
  setBookStatus: React.Dispatch<React.SetStateAction<P[]>>
}

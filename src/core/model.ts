export type ItemCategories = 'dead' | 'alive'

export type Item = { 
  id: string
  category: ItemCategories
}

export interface State {
  items: Item[];
}

export type ItemResponse = {
  data: Item[]
}

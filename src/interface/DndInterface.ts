export interface DndLine {
  id: string;
  children: string[]; // should keep the order
  type: DndType;
}

export type SubItemsMap = Record<string, string[]>;

export interface DndItems {
  id: string;
  width: string;
  type: DndType;
  resizable?: boolean;
  itemType?: DndItemType;
  itemRender?: DndItemRenderProps;
}

export enum DndType {
  Line = 'Line',
  Item = 'Item',
  CloneItem = 'CloneItem'
}

export enum DndItemType {
  Default = 'Default',
  /** all line item, the width of the item is fixed at 100%  */
  LineItem = 'LineItem',
  /** item has sub draggable items  */
  GroupItem = 'GroupItem',
  /** item has sub draggable items with fixed 100% width */
  GroupLineItem = 'GroupLineItem'
}

export interface DndItemRenderProps {
  wrapperClassName?: string;
  body?: (item: DndItems) => React.ReactNode;
  header?: (item: DndItems) => React.ReactNode;
}

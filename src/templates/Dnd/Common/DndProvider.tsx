import {
  Dispatch,
  PropsWithChildren,
  Ref,
  SetStateAction,
  createContext,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';

import { cloneDeep, omit } from 'lodash-es';

import {
  DndItemRenderProps,
  DndItems,
  DndLine,
  SubItemsMap
} from '../../../interface/DndInterface';

export type ItemsMap = Record<string, DndItems>;

export interface DndContextProps extends DndItemContextProps {
  lines: DndLine[];
  setLines?: Dispatch<SetStateAction<DndLine[]>>;
  items: ItemsMap;
  setItems?: Dispatch<SetStateAction<ItemsMap>>;

  chosenItem?: DndItems;
  setChosenItem?: (item: DndItems) => void;
  subItemsMap?: SubItemsMap;
  setSubItemsMap?: (item: SubItemsMap) => void;
  deleteItem?: (id: string, line?: string) => void;

  changeLine?: (id: string, children: string[]) => void;
  changeSubChildren?: (itemId: string, children: string[]) => void;
}

interface DndItemContextProps {
  defaultWidth: number; // item default percent width
  gridSetting?: { columns: number; unitWidth: string };
  itemRender?: DndItemRenderProps;
  chosenClassName?: string;
}

export const DndContext = createContext<DndContextProps>({
  lines: [],
  items: {},
  defaultWidth: 25
});

interface DndProviderProps extends PropsWithChildren {
  defaultWidth?: number;
  defaultLine?: DndLine[];
  defaultItems?: Record<string, DndItems>;
  grid?: { columns: number };
  onChooseItem?: (item: DndItems) => void;
  itemRender?: DndItemRenderProps;
  chosenClassName?: string;
}

export interface DndProviderRef {
  setLines: (e: DndLine[]) => void;
  setItems: (e: Record<string, DndItems>) => void;
  getData: () => {
    lines: DndLine[];
    items: Record<string, DndItems>;
    subItemsMap: SubItemsMap;
  };
}

const DndProvider = (props: DndProviderProps, ref: Ref<DndProviderRef>) => {
  const {
    defaultLine,
    defaultItems,
    children,
    defaultWidth = 25,
    grid,
    itemRender,
    onChooseItem,
    chosenClassName
  } = props;
  const [lines, setLines] = useState<DndLine[]>(defaultLine ?? []);
  const [items, setItems] = useState<ItemsMap>(defaultItems ?? {});
  const [chosenItem, setChosenItem] = useState<DndItems>();
  const [subItemsMap, setSubItemsMap] = useState<SubItemsMap>({});

  useImperativeHandle(ref, () => ({
    setLines,
    setItems,
    getData: () => ({ lines, items, subItemsMap })
  }));

  const deleteItem = (itemId: string, LineId?: string) => {
    setItems(omit(items, itemId));
    const tempLines = cloneDeep(lines);
    if (LineId) {
      const line = tempLines.find((e) => e.id === LineId);
      if (line) {
        line.children = line.children.filter((e) => e !== itemId);
      }
    } else {
      tempLines.forEach((e) => {
        e.children = e.children.filter((e) => e !== itemId);
      });
    }
    setLines(tempLines);
    chosenItem?.id === itemId && setChosenItem(undefined);
  };

  const changeLine = (id: string, children: string[]) => {
    if (!children.length) {
      setLines((e) => e.filter((e) => e.id !== id));
      return;
    }
    // this set will not trigger rerender
    setLines((tempLine) => {
      const currentLine = tempLine.find((e) => e.id === id);
      if (currentLine) {
        currentLine.children = children;
      }
      return tempLine;
    });
  };

  /** set group item children */
  const changeSubChildren = (itemId: string, children: string[]) => {
    setSubItemsMap((tempMap) => {
      tempMap[itemId] = children;
      return tempMap;
    });
  };

  const gridSetting = grid
    ? {
        columns: grid.columns,
        unitWidth: 100 / grid.columns + '%'
      }
    : undefined;

  const handleChooseItem = (e: DndItems) => {
    onChooseItem?.(e);
    setChosenItem(e);
  };

  return (
    <DndContext.Provider
      value={{
        lines,
        setLines,
        items,
        setItems,
        subItemsMap,
        setSubItemsMap,
        chosenItem,
        setChosenItem: handleChooseItem,
        chosenClassName,

        defaultWidth: grid ? 100 / grid.columns : defaultWidth,
        gridSetting,
        deleteItem,

        itemRender,
        changeLine,
        changeSubChildren
      }}
    >
      {children}
    </DndContext.Provider>
  );
};

export default forwardRef<DndProviderRef, DndProviderProps>(DndProvider);

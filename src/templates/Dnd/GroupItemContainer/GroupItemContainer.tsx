import { useContext, useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { compact } from 'lodash-es';
import { twMerge } from 'tailwind-merge';

import {
  DndItemType,
  DndItems,
  DndType
} from '../../../interface/DndInterface';
import { DndContext } from '../Common/DndProvider';
import {
  createNewItem,
  getDataTypeFromElement,
  isGroupItem
} from '../Common/utils';
import ResizableItem from '../ResizableItem/ResizableItem';

interface GroupItemContainerProps {
  lineId: string;
  groupItem: DndItems;
}

const GroupItemContainer = (props: GroupItemContainerProps) => {
  const { groupItem } = props;

  const {
    items: keyMap,
    changeSubChildren: setSubChildren,
    defaultWidth,
    setItems,
    itemRender,
    subItemsMap
  } = useContext(DndContext);

  const [itemKeys, setItemsKeys] = useState(subItemsMap?.[groupItem?.id ?? '']);

  const subItems = useMemo(() => {
    return compact((itemKeys ?? []).map((key) => keyMap[key]));
  }, [itemKeys, keyMap]);

  return (
    /** do not change this width style to className */
    <>
      <div
        className={twMerge(
          groupItem?.itemType === DndItemType.GroupLineItem
            ? 'lineHandle'
            : 'itemHandle',
          'w-full pb-2 cursor-grab'
        )}
      >
        {groupItem?.itemRender?.header?.(groupItem) ||
          itemRender?.header?.(groupItem) ||
          'header'}
      </div>
      <ReactSortable
        className='flex w-full min-h-[70px] overflow-x-auto overflow-y-hidden pb-1 px-[1px]'
        list={subItems}
        setList={(itemList, _, sortable) => {
          if (sortable.dragging) {
            const subItemKeys = itemList.map((e) => {
              /** drop a clone item. in general, this handle while trigger only once */
              if (e.type === DndType.CloneItem) {
                console.log(e);
                const newItem = createNewItem({
                  width:
                    e.itemType === DndItemType.LineItem
                      ? '100%'
                      : `${defaultWidth}%`
                });
                setItems?.({ ...keyMap, [newItem.id]: newItem });
                return newItem.id;
              }
              return e.id;
            });
            setItemsKeys(subItemKeys);
            setSubChildren?.(groupItem?.id ?? '', subItemKeys);
          }
        }}
        group={{
          name: 'GroupItem',
          put: (_to, _from, dragEle) => {
            const itemType = getDataTypeFromElement(dragEle);
            if (itemType === DndType.Line || isGroupItem(itemType)) {
              return false;
            }
            return true;
          }
        }}
        handle='.subItemHandle'
        animation={150}
        forceFallback
      >
        {subItems.map((subItem) => (
          <ResizableItem
            key={subItem.id}
            item={subItem}
            className={twMerge(
              'subItemHandle cursor-grab',
              subItem.itemRender?.wrapperClassName ||
                itemRender?.wrapperClassName
            )}
          >
            {subItem.itemRender?.body?.(subItem) ||
              itemRender?.body?.(subItem) ||
              subItem.width}
          </ResizableItem>
        ))}
      </ReactSortable>
    </>
  );
};

export default GroupItemContainer;

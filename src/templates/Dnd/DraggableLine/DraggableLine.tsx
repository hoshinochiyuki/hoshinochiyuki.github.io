import { useContext, useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { cloneDeep, compact } from 'lodash-es';
import { twMerge } from 'tailwind-merge';

import { DndItems, DndLine, DndType } from '../../../interface/DndInterface';
import { DndContext } from '../Common/DndProvider';
import {
  createNewItem,
  getNumberFromPercent,
  isGroupItem
} from '../Common/utils';
import GroupItemContainer from '../GroupItemContainer/GroupItemContainer';
import ResizableItem from '../ResizableItem/ResizableItem';

interface DndContainerProps {
  lineIndex: number;
  line: DndLine;
}

const DraggableLine = (props: DndContainerProps) => {
  const { lineIndex, line } = props;

  const { id, children: defaultKeys = [] } = line;

  const {
    items: keyMap,
    changeLine: setCurrentLine,
    defaultWidth,
    setItems,
    itemRender
  } = useContext(DndContext);

  const [itemKeys, setItemsKeys] = useState(defaultKeys);

  const items = useMemo(() => {
    return compact(itemKeys.map((key) => keyMap[key]));
  }, [itemKeys, keyMap]);

  const handleChangeList = (itemList: DndItems[]) => {
    const itemKeys = itemList.map((e) => {
      /** drop a clone item. in general, this handle while trigger only once */
      if (e.type === DndType.CloneItem) {
        const newItem = createNewItem({
          width: `${defaultWidth}%`,
          itemType: e.itemType
        });
        setItems?.({ ...keyMap, [newItem.id]: newItem });
        return newItem.id;
      }
      return e.id;
    });
    setItemsKeys(itemKeys);
    setCurrentLine?.(id, itemKeys);
  };

  return (
    /** do not change this width style to className */
    <div
      className='flex overflow-hidden '
      style={{ width: '100%' }}
      data-type={DndType.Line}
    >
      <ReactSortable
        className='h-full flex w-full'
        list={cloneDeep(items)}
        setList={(itemList, _, sortable) =>
          sortable.dragging && handleChangeList(itemList)
        }
        group={{
          name: 'LayoutSettingLine',
          put: (to, _, dragEle) => {
            let width = getNumberFromPercent(dragEle.style.width);
            to.el.childNodes.forEach((childNode) => {
              const node = childNode as HTMLDivElement;
              if (node.style.width) {
                width += getNumberFromPercent(node.style.width);
              }
            });
            if (width > 100) {
              return false;
            }
            return true;
          }
        }}
        handle='.itemHandle'
        animation={150}
        forceFallback
        fallbackOnBody
      >
        {items.map((item) => (
          <ResizableItem
            key={item.id}
            item={item}
            lineItems={items}
            lineIndex={lineIndex}
            changeLineItemKeys={setItemsKeys}
            className={twMerge(
              !isGroupItem(item.itemType) && 'itemHandle cursor-grab',
              item.itemRender?.wrapperClassName || itemRender?.wrapperClassName
            )}
          >
            {isGroupItem(item.itemType) ? (
              <GroupItemContainer groupItem={item} lineId={id} />
            ) : (
              <>
                {item.itemRender?.body?.(item) ||
                  itemRender?.body?.(item) ||
                  JSON.stringify(item.width)}
              </>
            )}
          </ResizableItem>
        ))}
        <div className='lineHandle flex-1 cursor-grab' />
      </ReactSortable>
    </div>
  );
};

export default DraggableLine;

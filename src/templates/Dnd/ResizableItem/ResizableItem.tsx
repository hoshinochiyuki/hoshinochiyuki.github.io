import { useContext, useState } from 'react';

import { RightOutlined } from '@ant-design/icons';

import { cloneDeep } from 'lodash-es';
import { Resizable } from 're-resizable';
import { twMerge } from 'tailwind-merge';

import { DndItems } from '../../../interface/DndInterface';
import { DndContext } from '../Common/DndProvider';
import {
  isFixedFullWidth,
  overWidthDivider,
  roundPercent
} from '../Common/utils';

interface DraggableItemProps {
  children?: React.ReactNode;
  className?: string;
  wrapClassName?: string;
  item?: DndItems;

  /** No need to pass those props if do not check over width */
  isCheckOverWidth?: boolean;
  lineItems?: DndItems[];
  lineIndex?: number;
  changeLineItemKeys?: (e: string[]) => void;
}

const ResizableItem = (props: DraggableItemProps) => {
  const {
    children,
    className,
    wrapClassName,
    item,
    lineItems = [],
    lineIndex = 0,
    changeLineItemKeys,
    isCheckOverWidth = true
  } = props;

  const {
    setItems,
    items,
    lines,
    setLines,
    defaultWidth,
    gridSetting,
    chosenItem,
    chosenClassName,
    setChosenItem
  } = useContext(DndContext);

  const itemWidth = isFixedFullWidth(item?.itemType)
    ? '100%'
    : item?.width || `${defaultWidth}%`;

  const isChosen = chosenItem?.id === item?.id;

  const [gridWidth, setGridWidth] = useState(0);

  return (
    <>
      <Resizable
        size={{ width: itemWidth, height: 'auto' }}
        data-type={item?.itemType}
        minHeight='70px'
        maxWidth='100%'
        minWidth={gridSetting ? gridWidth : undefined}
        bounds='parent'
        enable={{
          right: item?.resizable !== false && !isFixedFullWidth(item?.itemType)
        }}
        ref={(e) => {
          const parentWidth = e?.parentNode?.clientWidth;
          if (parentWidth && gridSetting) {
            setGridWidth(parentWidth / gridSetting.columns);
          }
        }}
        className={twMerge(
          'border h-full content-center break-words transition-colors overflow-hidden',
          wrapClassName,
          isChosen && (chosenClassName || 'bg-primary-1')
        )}
        grid={gridSetting ? [gridWidth, 0] : undefined}
        handleComponent={{
          right: <RightOutlined className='w-[10px] -ml-2 resizeHandle' />
        }}
        handleClasses={{
          right: 'content-center resizeHandle'
        }}
        onResizeStop={(_, _dri, ele) => {
          const tempItems = cloneDeep(items);
          const currentItem = tempItems[item?.id ?? ''];
          const width = gridSetting
            ? roundPercent(ele.style.width)
            : ele.style.width;
          if (currentItem) {
            currentItem.width = width;
          }
          setItems?.(tempItems);
          if (isCheckOverWidth) {
            const over = overWidthDivider?.(
              lineItems,
              { id: item?.id ?? '', width: width },
              { lines, lineIndex }
            );
            if (over.isOverWidth) {
              changeLineItemKeys?.(over.firstLine);
              setLines?.(over.changedLines);
            }
          }
        }}
      >
        <div
          className={twMerge(className, 'px-3 py-2 w-full h-full select-none')}
          onMouseDown={(e) => {
            e.stopPropagation();
            const classList = (e.target as HTMLElement).classList;
            if (classList.contains('resizeHandle')) {
              return;
            }
            item && setChosenItem?.(item);
          }}
        >
          {children}
        </div>
      </Resizable>
    </>
  );
};

export default ResizableItem;

import { ReactNode, useContext } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { HolderOutlined } from '@ant-design/icons';

import { twMerge } from 'tailwind-merge';

import { DndItemType, DndType } from '../../../interface/DndInterface';
import { DndContext } from '../Common/DndProvider';
import { isFixedFullWidth } from '../Common/utils';

interface CloneContainerProps<T> {
  items?: CloneContainerItem<T>[];
  render?: (item: CloneContainerItem<T>) => ReactNode;
  className?: string;
}

export interface CloneContainerItem<T> {
  id: string;
  label?: string;
  icon?: ReactNode;
  render?: (item: CloneContainerItem<T>) => ReactNode;

  resizable?: boolean;
  itemType?: DndItemType;
  settings?: T;
}

const CloneContainer = <T,>(props: CloneContainerProps<T>) => {
  const { items = [], render, className } = props;

  const { defaultWidth } = useContext(DndContext);

  return (
    <ReactSortable
      id='sortablePanel'
      setList={() => {}}
      className={twMerge(
        'h-full w-[220px] flex-shrink-0 p-4 space-y-2 [&_.cloneItem]:!w-[188px] border-r',
        className
      )}
      group={{ name: 'Clone', put: false, pull: 'clone' }}
      list={items.map((item) => ({ ...item, type: DndType.CloneItem }))}
      forceFallback
    >
      {items.map((item) => {
        if (item.render || render) {
          return (
            <div key={item.id}>{item.render?.(item) || render?.(item)}</div>
          );
        }
        return (
          <div
            className='flex border p-2 rounded justify-between cursor-grab cloneItem bg-surface2 select-none'
            key={`${item.id}_${item.itemType}`}
            style={{
              width: isFixedFullWidth(item.itemType)
                ? '100%'
                : `${defaultWidth}%`
            }}
            data-type={item.itemType}
          >
            <div className='flex text-primary overflow-hidden'>
              <span className='self-center mr-2'>{item.icon}</span>
              <span className='self-center whitespace-nowrap'>
                {item.label}
              </span>
            </div>
            <HolderOutlined className='self-center' />
          </div>
        );
      })}
    </ReactSortable>
  );
};

export default CloneContainer;

import { FC, useContext } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { get, keyBy } from 'lodash-es';
import { twMerge } from 'tailwind-merge';

import { DndType } from '../../interface/DndInterface';
import { DndContext } from './Common/DndProvider';
import { createNewItem, createNewLine, isFixedFullWidth } from './Common/utils';
import DraggableLine from './DraggableLine/DraggableLine';

interface DndContainerProps {
  className?: string;
}

const DndContainer: FC<DndContainerProps> = (props) => {
  const { className } = props;

  const { lines, setLines, defaultWidth, items, setItems } =
    useContext(DndContext);

  return (
    <div
      className={twMerge(
        `w-full flex-shrink overflow-y-scroll rounded-r`,
        className
      )}
    >
      <ReactSortable
        id='sortablePanel'
        className='min-h-full pb-8'
        setList={(lineList, _, sortable) => {
          if (sortable.dragging) {
            const keyMapLine = keyBy(lines, 'id');
            const sortedLine = lineList.map((line) => {
              if ([DndType.Item, DndType.CloneItem].includes(line.type)) {
                /** drop a clone item to new line. in general, this handle while trigger only once  */
                if (line.type === DndType.CloneItem) {
                  const itemType = get(line, 'itemType');
                  const newItem = createNewItem({
                    width: isFixedFullWidth(itemType)
                      ? '100%'
                      : `${defaultWidth}%`,
                    itemType
                  });
                  setItems?.({ ...items, [newItem.id]: newItem });
                  return createNewLine({ children: [newItem.id] });
                }
                return createNewLine({ children: [line.id] });
              }
              return keyMapLine[line.id];
            });
            setLines?.(sortedLine);
          }
        }}
        group={{ name: 'LayoutSettingContainer', put: true }}
        animation={150}
        list={lines.map((e) => ({ ...e }))}
        handle='.lineHandle'
        forceFallback
      >
        {lines.map((line, rowIndex) => (
          <DraggableLine key={line.id} line={line} lineIndex={rowIndex} />
        ))}
      </ReactSortable>
    </div>
  );
};

export default DndContainer;

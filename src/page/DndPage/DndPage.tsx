import { useState } from 'react';

import { InputNumber } from 'antd';

import { DndItemType } from '../../interface/DndInterface';
import CloneContainer from '../../templates/Dnd/CloneContainer/CloneContainer';
import DndProvider from '../../templates/Dnd/Common/DndProvider';
import DndContainer from '../../templates/Dnd/DndContainer';

const items = [
  {
    id: 'type1',
    label: 'Default'
  },
  {
    id: 'type2',
    label: 'LineItem',
    itemType: DndItemType.LineItem
  },
  {
    id: 'type3',
    label: 'GroupItem',
    itemType: DndItemType.GroupItem
  },
  {
    id: 'type4',
    label: 'GroupLineItem',
    itemType: DndItemType.GroupLineItem
  }
];

const DndPage = () => {
  const [defaultWidth, setDefaultWidth] = useState(25);

  const [columns, setColumns] = useState<number>();

  return (
    <div className='border h-full rounded'>
      <div className='px-4 py-4'>
        <div className='flex justify-end'>
          <div className='border border-gray-6 border-r-0 rounded-l-md -mr-[1px] px-2 bg-gray-3 content-around'>
            行
          </div>
          <InputNumber
            className=' rounded-l-none w-[100px]'
            value={columns}
            min={4}
            max={16}
            onBlur={(e) =>
              setColumns(e.target.value ? Number(e.target.value) : undefined)
            }
          />
          <div className='ml-4 border border-gray-6 border-r-0 rounded-l-md -mr-[1px] px-2 bg-gray-3 content-around'>
            默认宽度
          </div>
          <InputNumber
            className=' rounded-l-none w-[100px]'
            value={defaultWidth}
            onChange={(e) => setDefaultWidth(Number(e ?? 25))}
          />
        </div>
      </div>
      <div className='m-4 mt-0 flex h-[calc(100vh-180px)] border rounded overflow-hidden'>
        <DndProvider
          defaultWidth={defaultWidth}
          grid={columns ? { columns } : undefined}
        >
          <CloneContainer items={items} />
          <DndContainer className='w-[calc(100%-200px)] p-4 pr-2' />
        </DndProvider>
      </div>
    </div>
  );
};

export default DndPage;

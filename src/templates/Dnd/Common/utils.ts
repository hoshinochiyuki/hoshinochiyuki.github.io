import { cloneDeep, keys, round } from 'lodash-es';
import { v4 } from 'uuid';

import {
  DndItemType,
  DndItems,
  DndLine,
  DndType
} from '../../../interface/DndInterface';

/** check line items sum with over width */
export const overWidthDivider = (
  items: DndItems[],
  changedItem?: { id: string; width: string },
  linesSetting?: { lines: DndLine[]; lineIndex: number }
) => {
  let sum = 0;
  const firstLine: string[] = [];
  const secondLine: string[] = [];
  items.forEach((item) => {
    const itemWidth =
      item.id === changedItem?.id ? changedItem.width : item.width;
    sum = sum + Number(itemWidth.replace('%', ''));
    sum > 100 ? secondLine.push(item.id) : firstLine.push(item.id);
  });
  let changedLines: DndLine[] = [];
  // if over width, change lines
  if (linesSetting) {
    const { lines, lineIndex } = linesSetting;
    changedLines = cloneDeep(lines);
    changedLines[lineIndex].children = firstLine;
    changedLines.splice(
      lineIndex + 1,
      0,
      createNewLine({ children: secondLine })
    );
  }
  return { isOverWidth: sum > 100, firstLine, secondLine, changedLines };
};

export const createNewLine = (props?: Partial<DndLine>): DndLine => {
  return { id: v4(), type: DndType.Line, children: [], ...props };
};

export const createNewItem = (props?: Partial<DndItems>): DndItems => {
  return { id: v4(), type: DndType.Item, width: '25%', ...props };
};

/** 50% -> 50 */
export const getNumberFromPercent = (width: string): number => {
  return Number(width.replace('%', ''));
};

/** 49.99 -> 50.0 */
export const roundPercent = (width: string): string => {
  return round(getNumberFromPercent(width), 1) + '%';
};

export const isGroupItem = (item?: DndItemType): boolean => {
  return item
    ? [DndItemType.GroupItem, DndItemType.GroupLineItem].includes(item)
    : false;
};

export const isFixedFullWidth = (item?: DndItemType): boolean => {
  return item
    ? [DndItemType.LineItem, DndItemType.GroupLineItem].includes(item)
    : false;
};

/** resizable items has data-type attribute which means DndItemType */
export const getDataTypeFromElement = (
  element: HTMLElement
): DndItemType | DndType.Line => {
  const type = element.getAttribute('data-type') ?? '';
  /** drag line into group */
  if (type === DndType.Line) {
    return type;
  }
  /** drag item ( include group items ) into group */
  if (keys(DndItemType).includes(type)) {
    return type as DndItemType;
  }
  return DndItemType.Default;
};

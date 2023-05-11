import { keyBy, map } from 'lodash';
import { Sprite } from 'pixi.js';
import { useMemo } from 'react';

interface useKeyClickProps {
  leader: Sprite | null;
  target: Sprite | null;
}

export const useHitCheck = (props: useKeyClickProps) => {
  const { leader, target } = props;
  return leader && target ? hitTestRectangle(leader, target) : { isHit: false, vx: 100, vy: 100 };
};

function hitTestRectangle(r1: Sprite, r2: Sprite) {
  //hit will determine whether there's a collision
  let hit = false;
  //Find the center points of each sprite
  const r1CenterX = r1.x + r1.width / 2;
  const r1CenterY = r1.y + r1.height / 2;
  const r2CenterX = r2.x + r2.width / 2;
  const r2CenterY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  const r1HalfWidth = r1.width / 2;
  const r1HalfHeight = r1.height / 2;
  const r2HalfWidth = r2.width / 2;
  const r2HalfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  const vx = r1CenterX - r2CenterX;
  const vy = r1CenterY - r2CenterY;

  //Figure out the combined half-widths and half-heights
  const combinedHalfWidths = r1HalfWidth + r2HalfWidth;
  const combinedHalfHeights = r1HalfHeight + r2HalfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {
      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return { isHit: hit, vx: vx, vy: vy };
}

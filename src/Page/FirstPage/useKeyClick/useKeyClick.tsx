import { keyBy, map } from 'lodash';
import { useMemo } from 'react';

interface useKeyClickProps {
  usedKeys: { [x: string]: { press?: () => void; release?: () => void } };
}

export const useKeyClick = (props: useKeyClickProps) => {
  const { usedKeys } = props;
  const keysArr = useMemo(
    () => map(usedKeys, (value, key) => keyboard(key, value.press, value.release)),
    [usedKeys],
  );
  return keyBy(keysArr, (e) => e.key);
};

interface KeyboardProps {
  key?: string;
  isDown?: boolean;
  isUp?: boolean;
  press?: () => void;
  release?: () => void;
  downHandler?: (event: KeyboardEvent) => void;
  upHandler?: (event: KeyboardEvent) => void;
  unsubscribe?: () => void;
}

const keyboard = (value: string, press?: () => void, release?: () => void) => {
  const key: KeyboardProps = {};
  key.key = value;
  key.isDown = false;
  key.isUp = true;
  key.press = press;
  key.release = release;
  //The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.key) {
      key.press?.();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };
  //The `upHandler`
  key.upHandler = (event: KeyboardEvent) => {
    if (event.key === key.key) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
  };
  return key;
};

export default useKeyClick;

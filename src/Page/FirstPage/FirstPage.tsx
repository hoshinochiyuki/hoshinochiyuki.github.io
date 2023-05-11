import { Container, Sprite, Text } from '@pixi/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Sprite as SpriteProps, TextStyle } from 'pixi.js';
import './FirstPage.css';
import useKeyClick from './useKeyClick/useKeyClick';
import { v4 } from 'uuid';
import { useHitCheck } from './useHitCheck/useHitCheck';
import { sample } from 'lodash';

const speed = 7;

export const FirstPage = () => {
  const initKeys = useMemo(() => {
    const keys: { [x: string]: { press?: () => void; release?: () => void } } = {};
    ['a', 'd', 's', 'w'].forEach((key) => {
      keys[key] = { press: () => handleMoveClick(key) };
    });
    return keys;
  }, []);

  const [hasHit, setHasHit] = useState(false);
  const keyEvents = useKeyClick({ usedKeys: initKeys });

  const [catPosition, setCatPosition] = useState([400, 270]);
  const [refresh, setRefresh] = useState('');
  const [language, setLanguage] = useState('啥子哦');

  const catRef = useRef<SpriteProps>(null);
  const targetRef = useRef<SpriteProps>(null);

  const { isHit, vx, vy } = useHitCheck({ leader: catRef.current, target: targetRef.current });

  const handleMoveClick = (key: string) => {
    setCatPosition((tempPosition) => {
      if (key === 'a') {
        tempPosition[0] = tempPosition[0] - speed;
      }
      if (key === 'd') {
        tempPosition[0] = tempPosition[0] + speed;
      }
      if (key === 'w') {
        tempPosition[1] = tempPosition[1] - speed;
      }
      if (key === 's') {
        tempPosition[1] = tempPosition[1] + speed;
      }
      return tempPosition;
    });
    setRefresh(v4());
  };

  useEffect(() => {
    if (isHit && !hasHit) {
      isHit && setHasHit(true);

      setInterval(() => {
        const random = sample([0, 1, 2, 3, 4, 5]) || 0;
        setLanguage(
          [
            '啥子哦',
            '你的态度能不能好一点',
            '私は路飞',
            '你妈和我的猫都很想你……骗你的啦哈哈哈，我没有猫，你也没有妈',
            '说道痛处就气急败坏，说到底还不是条懒狗',
            'NMSL',
          ][random],
        );
      }, 2000);
    }
  }, [isHit]);

  const style = new TextStyle({
    fontFamily: 'Futura',
    fontSize: 14,
    fill: 'white',
  });
  return (
    <>
      <Container>
        <Container>
          {hasHit && (
            <Text
              text={vx > 200 || vy > 200 ? '玩原神玩的' : '啧啧'}
              style={style}
              x={catPosition[0]}
              y={catPosition[1] - 60}
            />
          )}
          <Sprite
            image="https://pixijs.io/pixi-react/img/bunny.png"
            x={catPosition[0]}
            y={catPosition[1]}
            anchor={{ x: 0.5, y: 0.5 }}
            ref={catRef}
          />
        </Container>
        <Container>
          <Container visible={hasHit}>
            <Text text={language} x={150} y={210} style={style} />
          </Container>
          <Sprite
            image="https://pixijs.io/pixi-react/img/bunny.png"
            x={200}
            y={270}
            anchor={{ x: 0.5, y: 0.5 }}
            ref={targetRef}
          />
        </Container>
      </Container>
    </>
  );
};

export default FirstPage;

import { Container, Sprite } from '@pixi/react';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { v4 } from 'uuid';
import { cloneDeep } from 'lodash';

interface BulletsPosition {
  key: string;
  x: number;
  y: number;
}

interface BulletsProps {
  catX: number;
  catY: number;
  cRef: React.RefObject<{ handleAddBullet: () => void }>;
}

export const Bullets = (props: BulletsProps) => {
  const { catX, catY, cRef } = props;

  const [bullets, setBullets] = useState<BulletsPosition[]>([]);
  const [refresh, setRefresh] = useState('');

  useImperativeHandle(cRef, () => ({
    handleAddBullet: handleAddBullet,
  }));

  const handleAddBullet = () => {
    const newBullets = cloneDeep(bullets);
    newBullets.push({ key: v4(), x: catX, y: catY });
    setBullets(newBullets);
  };

  useEffect(() => {
    setInterval(() => {
      setBullets((newBullets) => {
        newBullets.forEach((e) => {
          e.y = e.y - 10;
        });
        return newBullets.filter((e) => e.y > 10);
      });
      setRefresh(v4());
    }, 100);
  }, []);

  return (
    <>
      <Container>
        {bullets.map((e) => (
          <Sprite
            key={e.key}
            image="https://pixijs.io/pixi-react/img/bunny.png"
            x={e.x}
            y={e.y}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        ))}
      </Container>
    </>
  );
};

export default Bullets;

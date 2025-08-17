import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

/*
  PropertyShowcase
  - Layout: Left large card, Right 3 stacked small cards
  - Rotation (no GSAP):
      Every 3s: middle-right -> left
                  left -> bottom-right
                  bottom-right -> top-right
                  top-right -> middle-right
    This matches a circular wheel among the 4 displayed items.
  - Animations: CSS transitions on transform/opacity
  - Pause on hover
  - Responsive: stacks vertically on narrow screens

  Props:
    properties: Array<{ id, name, location, price?, image }>
*/

const ROTATE_MS = 3000;
const TRANSITION_MS = 600; // sliding duration

const PropertyShowcase = ({ properties = [] }) => {
  const init = useMemo(() => {
    const base = (properties || []).slice(0, 4);
    return base.length >= 1 ? [...base, base[0]] : base; // [a,b,c,d,a]
  }, [properties]);
  const [queue, setQueue] = useState(init); // using 5 items with clone at end
  const [animating, setAnimating] = useState(false);
  const hoverRef = useRef(false);
  const timerRef = useRef(null);

  // keep queue in sync if props change
  useEffect(() => {
    const base = (properties || []).slice(0, 4);
    setQueue(base.length >= 1 ? [...base, base[0]] : base);
  }, [properties]);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      if (hoverRef.current) return; // paused on hover
      // trigger animation phase
      setAnimating(true);
      // after transition, commit new order and reset anim state
      setTimeout(() => {
        setQueue(prev => {
          if (!prev || prev.length < 4) return prev;
          // prev is [a,b,c,d,a] shape; maintain duplicate last = new left
          const [q0, q1, q2, q3, q4] = prev;
          // After rotation, visible should be [c,d,b,a]; keep duplicate of new left (c) at end
          return [q2, q3, q1, q0, q2];
        });
        setAnimating(false);
      }, TRANSITION_MS);
    }, ROTATE_MS);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseEnter = () => {
    hoverRef.current = true;
  };
  const onMouseLeave = () => {
    hoverRef.current = false;
  };

  const left = queue[0];
  const top = queue[1];
  const middle = queue[2];
  const bottom = queue[3];

  // During animating=true we temporarily move elements to their target slots using transforms
  return (
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Grid>
        <LeftSlot>
          <Card
            $size="large"
            className={animating ? 'to-bottom' : ''}
            style={{ zIndex: animating ? 2 : 3 }}
            item={left}
          />
        </LeftSlot>
        <RightCol>
          <SmallSlot>
            <Card
              $size="small"
              className={animating ? 'to-middle' : ''}
              style={{ zIndex: 3 }}
              item={top}
            />
          </SmallSlot>
          <SmallSlot>
            <Card
              $size="small"
              className={animating ? 'to-left' : ''}
              style={{ zIndex: 4 }}
              item={middle}
            />
          </SmallSlot>
          <SmallSlot>
            <Card
              $size="small"
              className={animating ? 'to-top' : ''}
              style={{ zIndex: 2 }}
              item={bottom}
            />
          </SmallSlot>
        </RightCol>
      </Grid>
    </Wrapper>
  );
};

const Card = ({ item, $size, className, style }) => {
  if (!item) return null;
  return (
    <CardBox $size={$size} className={`card ${className || ''}`} style={style}>
      <img src={item.image} alt={item.name} className="bg" />
      <div className="overlay" />
      <div className="content">
        <h3>{item.name}</h3>
        <p className="loc">{item.location}</p>
        {item.price ? <div className="price">{item.price}</div> : null}
      </div>
    </CardBox>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 2rem 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.25rem;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSlot = styled.div`
  position: relative;
`;

const RightCol = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
`;

const SmallSlot = styled.div`
  position: relative;
`;

const CardBox = styled.div`
  position: relative;
  width: 100%;
  height: ${p => (p.$size === 'large' ? '420px' : '120px')};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 24px rgba(0,0,0,0.08);
  background: #eee;
  transition: transform ${TRANSITION_MS}ms ease, opacity ${TRANSITION_MS}ms ease;

  .bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.02); transition: transform 400ms ease; }
  .overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.45)); }
  .content { position: absolute; left: 16px; right: 16px; bottom: 16px; color: #fff; }
  .content h3 { margin: 0 0 6px; font-size: ${p => (p.$size === 'large' ? '1.5rem' : '1rem')}; }
  .content .loc { opacity: 0.9; font-size: ${p => (p.$size === 'large' ? '1rem' : '0.9rem')}; }
  .price { position: absolute; top: 14px; right: 14px; background: rgba(0,0,0,0.5); padding: 6px 10px; border-radius: 10px; font-weight: 600; }

  &:hover .bg { transform: scale(1.06); }

  /* Animation roles (applied only during animating) */
  &.to-left { transform: translateX(calc(-100% - 1.25rem)); opacity: 1; }
  &.to-top { transform: translateY(calc(-100% - 1rem)); opacity: 1; }
  &.to-middle { transform: translateY(calc(100% + 1rem)); opacity: 1; }
  &.to-bottom { transform: translateX(calc(100% + 1.25rem)); opacity: 1; }

  @media (max-width: 900px) {
    height: ${p => (p.$size === 'large' ? '320px' : '140px')};
  }
`;

export default PropertyShowcase;

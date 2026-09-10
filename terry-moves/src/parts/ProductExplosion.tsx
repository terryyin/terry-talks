import React from 'react';
import {Point} from './ProductAssimilation';

// The blast grows from the entered projectile, then throws ink and rings outward.
// Clipping keeps every mark within the receiving product, away from captions.
export const ProductExplosion: React.FC<{progress: number; center: Point}> = ({progress, center}) => {
  const visible = progress > 0 && progress < 1;
  const expansion = Math.min(1, progress * 8);
  const fade = Math.min(1, (1 - progress) * 3);
  const radius = 18 + 73 * expansion;
  const burst = Array.from({length: 28}, (_, index) => {
    const angle = index * Math.PI / 14 + progress * .2;
    const length = radius * (index % 2 === 0 ? 1 : .47 + .08 * Math.sin(index + progress * 15));
    return `${center.x + Math.cos(angle) * length},${center.y + Math.sin(angle) * length}`;
  }).join(' ');
  return <g data-testid="internal-explosion" clipPath="url(#upright-product-interior)" opacity={visible ? fade : 0}>
    {[0, 1, 2].map((index) => <circle key={index} cx={center.x} cy={center.y} r={20 + ((progress * 1.7 + index / 3) % 1) * 115} fill="none" stroke={index % 2 ? '#253B3C' : '#D9654E'} strokeWidth={5 - index} opacity={.48 * (1 - progress)} />)}
    <polygon data-testid="blast-core" points={burst} fill="#E5AC58" stroke="#D9654E" strokeWidth="4" opacity={Math.max(0, 1 - progress * 1.1)} />
    <circle cx={center.x} cy={center.y} r={Math.max(0, 27 * (1 - progress * 2))} fill="#FFFCF4" />
    {Array.from({length: 16}, (_, index) => {
      const angle = index * Math.PI / 8;
      const distance = 30 + 95 * expansion + 10 * Math.sin(index);
      const x = center.x + Math.cos(angle) * distance;
      const y = center.y + Math.sin(angle) * distance;
      return <path key={index} d={`M ${x} ${y} l ${Math.cos(angle) * (9 + progress * 13)} ${Math.sin(angle) * (9 + progress * 13)}`} stroke={index % 3 ? '#D9654E' : '#253B3C'} strokeWidth={index % 3 ? 4 : 6} strokeLinecap="round" opacity={1 - progress * .8} />;
    })}
  </g>;
};

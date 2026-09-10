import React from 'react';
import {AbsoluteFill} from 'remotion';

const ink = '#253B3C';
const paper = '#F5F1E7';

export const StoryProductFrame: React.FC<{title: string; description: string; edition: string; caption: string; children: React.ReactNode}> = ({title, description, edition, caption, children}) => {
  return <AbsoluteFill style={{backgroundColor: paper, color: ink, fontFamily: 'Arial, sans-serif'}}>
    <div style={{position: 'absolute', top: 58, left: 68, fontSize: 20, letterSpacing: 4, fontWeight: 700}}>STORY / PRODUCT</div>
    <div style={{position: 'absolute', top: 105, left: 65, fontSize: 53, fontFamily: 'Georgia, serif', letterSpacing: -1.5}}>{title}</div>
    <svg viewBox="0 0 1080 1080" style={{position: 'absolute', inset: 0}} aria-label={description}>
      {children}
      <line x1="68" x2="1012" y1="795" y2="795" stroke={ink} strokeWidth="1" opacity=".2" />
      <text x="68" y="1020" fontSize="18" letterSpacing="2" fill={ink} opacity=".55">THE CHANGE REMAINS</text>
      <text x="1012" y="1020" textAnchor="end" fontSize="18" fill={ink} opacity=".55">{edition}</text>
    </svg>
    <div data-testid="caption" style={{position: 'absolute', top: 831, left: 78, right: 78, height: 142, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, lineHeight: 1.28, textAlign: 'center', fontWeight: 500}}>{caption}</div>
  </AbsoluteFill>;
};

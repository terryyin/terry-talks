import React from 'react';

export const OddEMark: React.FC<{
	readonly size: number;
	readonly ink: string;
	readonly paper: string;
}> = ({size, ink, paper}) => <div aria-label="Odd-e" style={{width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'ListenPoppins', borderRadius: '50%', backgroundColor: ink, color: paper, border: `${size * 0.02}px solid ${paper}`, outline: `${size * 0.02}px solid ${ink}`, outlineOffset: size * 0.034, fontSize: size * 0.2, fontWeight: 500}}>Odd-e</div>;

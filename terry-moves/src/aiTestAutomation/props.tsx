import React from 'react';
import { Label, palette } from './design';

export const Ticket: React.FC<{ x: number; y: number; rotation?: number; scale?: number; resolved?: boolean }> = ({ x, y, rotation = 0, scale = 1, resolved = false }) => <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} stroke={palette.ink} strokeWidth="3" filter="url(#paper-shadow)">
	<path d="M-42-27H30L43-15V27H-42Z" fill={resolved ? '#D6ECD7' : '#FFD2BF'}/><path d="M30-27V-15H43" fill="none"/>
	{resolved ? <path d="M-14 1L-4 11L14-11" fill="none" stroke={palette.green} strokeWidth="6" strokeLinecap="round"/> : <><circle cx="-23" cy="-7" r="7" fill={palette.coral}/><path d="M-8-7H26M-26 9H25" strokeWidth="3" opacity="0.6"/></>}
</g>;

export const CodeSpool: React.FC<{ x: number; y: number; scale?: number; extent?: number }> = ({ x, y, scale = 1, extent = 1 }) => <g transform={`translate(${x} ${y}) scale(${scale})`} data-testid="test-code-spool" stroke={palette.ink} strokeWidth="4" strokeLinejoin="round">
	<ellipse cy="88" rx="116" ry="19" fill={palette.shadow} opacity="0.25" stroke="none"/>
	<path d={`M-57-36H62V63Q65 ${95 + extent * 40} 13 ${92 + extent * 40}H-95Q-127 ${98 + extent * 40}-123 ${125 + extent * 40}H57`} fill={palette.gold}/>
	<path d="M-69-39L-78-58H77L83-38V66L69 84H-70Z" fill="#F3C660"/>
	<ellipse cx="0" cy="-40" rx="81" ry="27" fill="#FFE2A2"/>
	<ellipse cx="0" cy="-40" rx="33" ry="10" fill={palette.paper}/>
	<path d="M-46-4L-61 8L-46 20M43-4L58 8L43 20M10-8L-9 25" fill="none" strokeWidth="5"/>
	<Label x={0} y={51} size={18}>TEST CODE</Label>
	<path d={`M-17 104H16M-61 ${110 + extent * 28}H-20M-47 ${125 + extent * 28}H5M-72 ${136 + extent * 28}H-17`} fill="none" strokeWidth="3" opacity="0.6"/>
</g>;

export const CheckCard: React.FC<{ x: number; y: number; scale?: number; kind?: 'finding' | 'workflow' | 'test'; title?: string; selected?: boolean }> = ({ x, y, scale = 1, kind = 'workflow', title = 'CHECK', selected = false }) => <g transform={`translate(${x} ${y}) scale(${scale})`} data-testid={`${kind}-card`} filter="url(#paper-shadow)" stroke={palette.ink} strokeWidth="4" strokeLinejoin="round">
	<rect x="-74" y="-63" width="148" height="126" rx="12" fill={kind === 'test' ? palette.gold : kind === 'finding' ? '#D7E9EC' : palette.cream}/>
	<path d="M-73-22H73" strokeWidth="2" opacity="0.28"/>
	<Label x={0} y={-37} size={15}>{title}</Label>
	{kind === 'test' ? <><path d="M-22-4L-38 9L-22 22M23-4L39 9L23 22M7-7L-8 27" fill="none" strokeWidth="4"/><path d="M-32 43H32" strokeWidth="3"/></> : <><rect x="-49" y="-8" width="20" height="20" rx="3" fill={selected ? palette.green : palette.cream}/><path d="M-15 1H45M-49 31H41M-49 45H19" strokeWidth="3" opacity="0.55"/>{selected && <path d="M-44 1L-38 7L-30-4" stroke={palette.cream} fill="none" strokeWidth="3"/>}</>}
</g>;

export const Sandbox: React.FC<{ x: number; y: number; width?: number; height?: number; children: React.ReactNode; resetting?: number }> = ({ x, y, width = 460, height = 450, children, resetting = 0 }) => <g transform={`translate(${x} ${y})`} data-testid="isolated-repeatable-environment">
	<path d={`M0 25L30 0H${width - 14}L${width} 26V${height}L${width - 25} ${height + 25}H0Z`} fill="url(#glass)" stroke={palette.ink} strokeWidth="5" strokeLinejoin="round"/>
	<path d={`M0 26H${width}M${width - 25} 26V${height + 25}M0 ${height - 38}H${width - 25}`} stroke="#6C969E" strokeWidth="3" fill="none"/>
	<g>{children}</g>
	<path d={`M32 48L20 ${height - 64}M${width - 55} 48L${width - 66} ${height - 76}`} stroke="white" strokeWidth="11" opacity="0.58"/>
	<rect x="24" y="-22" width={width - 55} height="50" rx="8" fill={palette.cream} stroke={palette.ink} strokeWidth="4"/>
	<Label x={(width - 10) / 2} y={12} size={22}>ISOLATED COPY</Label>
	<g transform={`translate(${width / 2} ${height - 12})`} data-testid="reset-control" stroke={palette.ink} strokeWidth="4"><rect x="-77" y="-28" width="154" height="57" rx="12" fill={palette.gold}/><path transform={`rotate(${resetting * 360} -44 0)`} d="M-34-8A14 14 0 1 0-31 7M-34-8L-34 2L-45-2" fill="none"/><Label x={24} y={8} size={20}>RESET</Label></g>
</g>;

export const Wrench: React.FC<{ x: number; y: number; rotation?: number }> = ({ x, y, rotation = 0 }) => <g transform={`translate(${x} ${y}) rotate(${rotation})`} stroke={palette.ink} strokeWidth="4" strokeLinejoin="round"><path d="M-8 46V-9Q-32-30-17-48L-10-26H9L16-48Q32-32 9-10V46Z" fill="#B6CCD2"/><circle cy="42" r="4" fill={palette.paper}/></g>;

export const UnitCheck: React.FC<{ x: number; y: number; label: string; opacity?: number }> = ({ x, y, label, opacity = 1 }) => <g transform={`translate(${x} ${y})`} opacity={opacity} data-testid="focused-unit-check" stroke={palette.ink} strokeWidth="4"><rect x="-89" y="-44" width="178" height="88" rx="30" fill="#D8EFD8"/><path d="M-56-2L-44 10L-25-13" stroke={palette.green} strokeWidth="7" fill="none" strokeLinecap="round"/><Label x={23} y={7} size={18}>{label}</Label></g>;

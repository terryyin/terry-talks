import type React from 'react';
import {Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {blue, Heading, Label, mono, red, ReviewLayout, Sheet} from './ReviewLayout';

const schema = {heading: {type: 'text-content', default: 'The eleventh row', description: 'Opening title'}} as const;
const rows = [['09', 'Lena Brooks'], ['10', 'Ravi Shah'], ['11', 'Mia Chen']];

const ImportFailureScene: React.FC<{heading: string; style?: React.CSSProperties}> = ({heading, style}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const rejected = frame >= 1.4 * fps;
	return <ReviewLayout style={style}>
		<Heading>{heading}</Heading>
		<Sheet>
			<div style={{padding: '29px 34px', background: '#e9edf5', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<div style={{fontFamily: mono, fontSize: 42, fontWeight: 700}}>customers.csv</div>
				<div style={{fontSize: 36, color: '#156149', fontWeight: 800}}>11 valid rows</div>
			</div>
			<div style={{padding: '16px 34px 24px'}}>
				<div style={{fontSize: 29, color: '#4a596d', padding: '12px 0'}}>LAST THREE ROWS</div>
				{rows.map(([number, name]) => <div key={number} style={{display: 'flex', gap: 42, padding: '14px 0', borderTop: '2px solid #e3e7ed', fontSize: 43, lineHeight: 1.12}}>
					<span style={{fontFamily: mono, color: '#4a596d'}}>{number}</span>
					<span>{name}</span>
				</div>)}
			</div>
			{rejected ? (
				<div style={{background: '#fce5e7', borderTop: '3px solid #eac2c5', padding: '28px 34px', boxShadow: `inset 9px 0 ${red}`}}>
					<Label color={red}>IMPORT BLOCKED</Label>
					<div style={{color: red, fontSize: 54, fontWeight: 800, marginTop: 10}}>Maximum 10 rows</div>
				</div>
			) : (
				<div style={{position: 'relative', borderTop: '3px solid #e3e7ed', padding: '30px 34px'}}>
					<div style={{background: blue, color: 'white', borderRadius: 11, padding: '20px 28px', width: 'fit-content', fontSize: 47, fontWeight: 800}}>Import 11 rows</div>
					<svg width={62} height={72} viewBox="0 0 62 72" style={{
						position: 'absolute', left: 315, top: 72,
						translate: interpolate(frame, [.25 * fps, 1.2 * fps], ['110px 24px', '0px 0px'], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
						scale: interpolate(frame, [1.2 * fps, 1.4 * fps], [1, .82], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
					}}><path d="M7 4L54 47L33 49L25 67Z" fill="white" stroke="#142236" strokeWidth={5} strokeLinejoin="round"/></svg>
				</div>
			)}
		</Sheet>
	</ReviewLayout>;
};

export const ImportFailure = Interactive.withSchema({Component: ImportFailureScene, componentName: '<ImportFailure>', schema, wrapInSequence: true});

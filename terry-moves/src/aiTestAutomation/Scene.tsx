import React from 'react';
import { AbsoluteFill } from 'remotion';
import { AI, Cabinet, Engineer, Shield } from './actors';
import { BODY, Definitions, HEAD, Label, palette, Workshop } from './design';
import { captionAt, FilmScene, filmScript, reveal, sceneAt, STAGE } from './film';
import { CheckCard, CodeSpool, Magnifier, Sandbox, Ticket, UnitCheck, Wrench } from './props';

const Header: React.FC<{ scene: FilmScene }> = ({ scene }) => {
	const titles: Record<FilmScene['id'], [string, string]> = {
		hook: ['Ask AI to write', 'more tests?'],
		overload: ['Already more problems', 'than you can solve?'],
		upkeep: ['Protection.', 'And a responsibility.'],
		sandbox: ['Let AI do the checking.', 'First, learn the checks.'],
		investigate: ['A finding is a lead.', 'Investigate. Then fix.'],
		selective: ['Automate what', 'earns its place.'],
		optimize: ['Better feedback.', 'Less to maintain.'],
		end: ['Better protection.', 'Less to maintain.'],
	};
	return <g>
		<Label x={65} y={55} size={18} anchor="start" color={palette.muted}>TERRY MOVES / THE LEGACY WORKSHOP</Label>
		<g fontFamily={HEAD} fontWeight="700" fontSize="66" fill={palette.ink} letterSpacing="-1.8">
			<text x="65" y="144">{titles[scene.id][0]}</text><text x="65" y="222">{titles[scene.id][1]}</text>
		</g>
		<path d="M65 263H147" stroke={palette.coral} strokeWidth="8" strokeLinecap="round"/>
		{scene.id !== 'hook' && <Label x={172} y={271} size={21} anchor="start" color={palette.muted}>LARGE LEGACY PROJECT · MAINTENANCE OVERLOAD</Label>}
	</g>;
};

const Hook: React.FC = () => <g>
	<Cabinet x={425} y={423} scale={0.82}/><Shield x={648} y={677} scale={0.75}/>
	<Engineer x={272} y={1006} scale={1.45} mood="concerned" pose="stop" gaze={1} lean={-4}/>
	<AI x={818} y={978} scale={1.45} mood="pleased" pose="work" gaze={-1} tilt={-4}/>
	<CodeSpool x={589} y={834} scale={1.15}/>
	<Ticket x={630} y={368} rotation={15}/><Ticket x={785} y={425} rotation={-7}/><Ticket x={749} y={912} rotation={14}/>
</g>;

const Overload: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const upkeep = seconds >= scene.captionRanges[2].start;
	return <g>
		<path d="M306 445L898 490" stroke={palette.ink} strokeWidth="21" strokeLinecap="round"/><path d="M308 440L896 485" stroke="#C8CFD0" strokeWidth="10"/>
		{[0, 1, 2, 3, 4].map((i) => <Ticket key={i} x={343 + i * 112} y={410 + i * 9} rotation={-4 + i * 3} scale={0.8}/>)}
		<Label x={570} y={367} size={25} color={palette.red}>PROBLEMS ARRIVING</Label>
		<Cabinet x={594} y={595} scale={1.03}/><Shield x={857} y={863} scale={0.8}/>
		<Engineer x={290} y={1000} scale={1.21} mood="concerned" pose="work" gaze={1} lean={6}/>
		<AI x={490} y={1000} scale={0.82} mood="concerned" gaze={1}/>
		{[0, 1, 2, 3, 4, 5].map((i) => <Ticket key={i} x={610 + (i % 3) * 86} y={988 - Math.floor(i / 3) * 53} rotation={(i % 3 - 1) * 9}/>)}
		<Ticket x={224} y={905} rotation={-9} resolved/>
		{upkeep && <g><CodeSpool x={467} y={590} scale={0.85}/><Label x={454} y={789} size={19}>UPKEEP</Label></g>}
	</g>;
};

const Upkeep: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const engineering = seconds >= scene.captionRanges[2].start;
	return <g>
		<Cabinet x={494} y={508} scale={1.13}/><Shield x={805} y={774} scale={1.05}/>
		<Engineer x={283} y={1000} scale={1.14} mood={engineering ? 'focused' : 'pleased'} pose="point" gaze={1}/>
		<AI x={912} y={993} scale={0.93} mood="focused" gaze={-1}/>
		<Wrench x={424} y={769} rotation={22}/>
		<CodeSpool x={408} y={966} scale={0.65}/>
		<g><CheckCard x={779} y={439} kind="test" title="USEFUL TEST" scale={0.82}/><path d="M775 493V580" stroke={palette.green} strokeWidth="7" strokeDasharray="9 9"/></g>
		{engineering && <g><CheckCard x={616} y={940} title="DATA" scale={0.63}/><CheckCard x={725} y={958} title="ENVIRONMENT" scale={0.63}/><CheckCard x={834} y={958} title="DIAGNOSIS" scale={0.63}/></g>}
		<Ticket x={473} y={385} scale={0.8} rotation={-5}/>
	</g>;
};

const SandboxShot: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const aiChecks = seconds >= scene.captionRanges[2].start;
	return <g>
		<Cabinet x={116} y={493} scale={0.47}/><Shield x={126} y={669} scale={0.47}/>
		<Sandbox x={479} y={457} width={462} height={460}>
			<Cabinet x={46} y={105} scale={0.65}/>
			<AI x={341} y={392} scale={0.84} mood="focused" pose={aiChecks ? 'point' : 'rest'} gaze={-1}/>
		</Sandbox>
		<Engineer x={288} y={1000} scale={1.1} mood="focused" pose="point" gaze={1}/>
		<CheckCard x={399} y={622} title="KNOWN CHECK" scale={0.8} selected/>
		<Label x={197} y={461} size={19}>PRODUCT</Label>
		<path d="M306 419L444 419" fill="none" stroke="#8BAAA8" strokeWidth="5" strokeDasharray="8 12"/><path d="M434 411L446 419L434 427" fill="none" stroke="#8BAAA8" strokeWidth="4"/>
		<Label x={712} y={1014} size={23}>CONTROLLED START · REPEATABLE CHECK</Label>
	</g>;
};

const Investigate: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const fixed = seconds >= (scene.captionRanges[0].wordCues.confirmed ?? scene.start + 2.4);
	return <g>
		<Sandbox x={106} y={478} width={323} height={396}>
			<Cabinet x={29} y={118} scale={0.52}/>
			<AI x={258} y={321} scale={0.62} mood="concerned" pose="point" gaze={-1}/>
		</Sandbox>
		<CheckCard x={468} y={592} kind="finding" title="FINDING" scale={0.9}/>
		<path d="M432 671Q502 709 552 711" fill="none" stroke={palette.muted} strokeWidth="4" strokeDasharray="8 11"/>
		<Cabinet x={710} y={577} scale={0.81} fixed={fixed}/><Shield x={924} y={800} scale={0.7}/>
		<Engineer x={611} y={1007} scale={1.04} mood={fixed ? 'pleased' : 'focused'} pose="work" gaze={1} lean={5}/>
		{fixed ? <Wrench x={746} y={812} rotation={23}/> : <Magnifier x={752} y={802} scale={1.04}/>}
		<Label x={267} y={984} size={20}>OBSERVE</Label><Label x={788} y={989} size={20}>INVESTIGATE + FIX</Label>
	</g>;
};

const Selective: React.FC = () => <g>
	<Cabinet x={421} y={466} scale={0.83} fixed/><Shield x={650} y={687} scale={0.75}/>
	<Engineer x={261} y={999} scale={1.05} mood="pleased" pose="point" gaze={1}/>
	<AI x={865} y={997} scale={0.94} mood="pleased" pose="point" gaze={-1}/>
	<CheckCard x={430} y={807} kind="workflow" title="USEFUL" scale={0.82} selected/>
	<CheckCard x={621} y={807} kind="test" title="KEEP" scale={0.82}/>
	<path d="M507 807H546" fill="none" stroke={palette.ink} strokeWidth="5"/><path d="M534 797L546 807L534 817" fill="none" stroke={palette.ink} strokeWidth="5"/>
	<CheckCard x={420} y={973} kind="workflow" title="OBSERVATION" scale={0.64}/>
	<CheckCard x={618} y={965} kind="test" title="KEEP" scale={0.64}/>
	<Ticket x={753} y={397} rotation={12} scale={0.8}/>
</g>;

const Optimize: React.FC<{ seconds: number; scene: FilmScene }> = ({ seconds, scene }) => {
	const unitTime = scene.captionRanges.find((c) => c.spoken.includes('unit tests'))?.start ?? scene.start + 4;
	const local = seconds >= unitTime;
	return <g>
		<g data-testid="retained-wider-protection"><path d="M267 607C267 392 814 382 814 607" fill="none" stroke={palette.gold} strokeWidth="16"/><path d="M267 607C267 392 814 382 814 607" fill="none" stroke={palette.ink} strokeWidth="3"/><Label x={549} y={428} size={24}>KEEP WIDER PROTECTION</Label></g>
		{[267, 540, 814].map((x, i) => <g key={x}><Cabinet x={x - 72} y={557} scale={0.5} compact fixed/><Label x={x} y={764} size={18}>{['SCREEN', 'SERVICE', 'DATA'][i]}</Label></g>)}
		<Shield x={888} y={683} scale={0.57}/>
		<path d="M412 638H466M686 638H741" fill="none" stroke={palette.ink} strokeWidth="4"/>
		<g data-testid="deleted-duplicate" opacity="0.5"><path d="M272 557C319 451 761 451 817 557" fill="none" stroke={palette.muted} strokeWidth="5" strokeDasharray="9 13"/><path d="M467 465L490 488M490 465L467 488" stroke={palette.coral} strokeWidth="8" strokeLinecap="round"/></g>
		{local && <g><path d="M286 746V799M556 746V799" stroke={palette.green} strokeWidth="5" strokeDasharray="7 9"/><UnitCheck x={300} y={848} label="UNIT"/><UnitCheck x={573} y={848} label="UNIT"/><Label x={438} y={934} size={22}>LOCAL CHECKS · FAST FEEDBACK</Label></g>}
		<Engineer x={165} y={1060} scale={0.64} mood="pleased" gaze={1}/>
		<AI x={896} y={1065} scale={0.7} mood="pleased" gaze={-1}/>
	</g>;
};

const Ending: React.FC = () => <g>
	<Cabinet x={424} y={521} scale={0.83} fixed/><Shield x={653} y={738} scale={0.77}/>
	<Engineer x={291} y={1009} scale={1.08} mood="pleased" pose="rest" gaze={1}/>
	<AI x={801} y={1007} scale={1.12} mood="pleased" pose="rest" gaze={-1}/>
	<CheckCard x={504} y={928} kind="test" title="USEFUL" scale={0.62}/>
	<UnitCheck x={656} y={954} label="FAST"/>
	<Ticket x={731} y={411} rotation={12} scale={0.72}/><Ticket x={824} y={466} rotation={-4} scale={0.66}/>
	<Label x={543} y={1080} size={20} color={palette.muted}>STILL WORK TO DO. MORE ROOM TO DO IT.</Label>
</g>;

const CaptionBar: React.FC<{ seconds: number }> = ({ seconds }) => {
	const caption = captionAt(seconds);
	return <div data-testid="caption-bar" style={{ position: 'absolute', left: 0, top: 1125, width: 1080, height: 225, boxSizing: 'border-box', background: palette.paper, borderTop: '2px solid #D9C8B3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '22px 76px 35px' }}>
		<div style={{ fontFamily: BODY, fontSize: 44, fontWeight: 600, lineHeight: 1.24, textAlign: 'center', color: palette.ink }}>{caption?.text}</div>
		{sceneAt(seconds).id === 'end' && <div style={{ position: 'absolute', bottom: 13, left: 0, right: 0, fontFamily: BODY, textAlign: 'center', color: palette.muted, fontSize: 17, letterSpacing: 1 }}>{filmScript.voiceCredit}</div>}
	</div>;
};

export const AITestAutomationScene: React.FC<{ seconds: number }> = ({ seconds }) => {
	const scene = sceneAt(seconds);
	// The opening is fully present on frame zero for a muted feed. Later shots settle quickly.
	const arrival = scene.id === 'hook' ? 1 : reveal(seconds, scene.start, 0.3);
	return <AbsoluteFill style={{ background: palette.paper }} data-scene={scene.id}>
		<svg width={STAGE.width} height={STAGE.height} viewBox="0 0 1080 1350" role="img" aria-label={`${scene.label}: illustrated legacy workshop`}>
			<Definitions/><Workshop quiet={scene.id === 'end'}/><Header scene={scene}/>
			<g opacity={arrival} transform={`translate(0 ${(1 - arrival) * 12})`}>
				{scene.id === 'hook' && <Hook/>}
				{scene.id === 'overload' && <Overload seconds={seconds} scene={scene}/>}
				{scene.id === 'upkeep' && <Upkeep seconds={seconds} scene={scene}/>}
				{scene.id === 'sandbox' && <SandboxShot seconds={seconds} scene={scene}/>}
				{scene.id === 'investigate' && <Investigate seconds={seconds} scene={scene}/>}
				{scene.id === 'selective' && <Selective/>}
				{scene.id === 'optimize' && <Optimize seconds={seconds} scene={scene}/>}
				{scene.id === 'end' && <Ending/>}
			</g>
		</svg>
		<CaptionBar seconds={seconds}/>
	</AbsoluteFill>;
};

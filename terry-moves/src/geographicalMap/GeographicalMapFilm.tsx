import React, { useMemo } from 'react';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { MapDirection, MapGeography, mapPath, MapPose, mapScreenOrigin, mapTimeline, projectMapPoint } from './direction';
import { mapOpening } from './script';

const ink = '#263b3b';
const paper = '#f6f2e8';
const filmFormat = { width: 1080, height: 1080, fps: 30 };
const mapWindow = { x: 64, y: 376, width: 952, height: 598 };
const mapWindowRadius = 4;

export const GeographicalMapPicture: React.FC<{ geography: MapGeography; pose: MapPose }> = ({ geography, pose }) => {
	const { camera } = pose;
	const waterLabel = projectMapPoint(geography.water.labelPosition, camera);
	return <div data-map-cue={pose.cue} style={{ position: 'absolute', inset: 0, backgroundColor: paper, color: ink, fontFamily: 'Arial, sans-serif' }}>
		<div style={{ position: 'absolute', left: 90, top: 98, fontSize: 28, fontWeight: 700, letterSpacing: 3, color: '#657475' }}>{pose.copy.eyebrow}</div>
		<div data-map-headline style={{ position: 'absolute', left: 86, top: 150, fontSize: 84, fontWeight: 600, lineHeight: 1.04, letterSpacing: -2.7 }}>
			{pose.copy.headline.map((line, index) => <div key={index}>{line}</div>)}
		</div>
		<svg width={filmFormat.width} height={filmFormat.height} viewBox={`0 0 ${filmFormat.width} ${filmFormat.height}`} style={{ position: 'absolute', inset: 0 }}>
			<defs>
				<clipPath id="map-window"><rect {...mapWindow} rx={mapWindowRadius} /></clipPath>
				<pattern id="map-land-grain" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M 3 22 L 8 17" stroke="#a89777" strokeWidth="1" opacity="0.2" /></pattern>
			</defs>
			<g clipPath="url(#map-window)">
				<rect {...mapWindow} fill="#dfebed" />
				<g data-map-camera transform={`translate(${mapScreenOrigin.x} ${mapScreenOrigin.y}) scale(${camera.scale}) translate(${-camera.center.x} ${-camera.center.y})`}>
					<path data-map-land d={mapPath(geography.land, true)} fill="#e5ddc9" />
					<path d={mapPath(geography.land, true)} fill="url(#map-land-grain)" />
					<path data-map-coast d={mapPath(geography.coastline)} fill="none" stroke="#879d99" strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
					{geography.routes.map((route) => {
						const state = pose.routes[route.id] ?? { progress: 0, opacity: 0 };
						return <g key={route.id} opacity={state.opacity}>
							<path data-map-route-base={route.id} d={mapPath(route.points)} fill="none" stroke="#c7b8a0" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
							{/* Normalized dashes scale with the path; preserve screen width separately. */}
							<path data-map-route={route.id} d={mapPath(route.points)} fill="none" stroke={route.color} strokeWidth={10 / camera.scale} strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - state.progress} />
						</g>;
					})}
				</g>
				<text data-map-water-label x={waterLabel.x} y={waterLabel.y} textAnchor="middle" fill="#537c86" fontSize="42" fontStyle="italic">{geography.water.name}</text>
				{geography.routes.map((route) => {
					const point = projectMapPoint(route.labelPosition, camera);
					return <text key={route.id} data-map-route-label={route.id} x={point.x + route.labelOffset.x} y={point.y + route.labelOffset.y} textAnchor="middle" fill={route.color} fontSize="44" fontWeight="600" opacity={pose.routes[route.id]?.opacity ?? 0}>{route.name}</text>;
				})}
				{geography.places.map((place) => {
					const point = projectMapPoint(place.position, camera);
					return <g key={place.id} data-map-place={place.id}>
						<circle cx={point.x} cy={point.y} r="21" fill={paper} />
						<circle data-map-town-marker cx={point.x} cy={point.y} r="11" fill={ink} />
						<text data-map-town-label x={point.x + place.labelOffset.x} y={point.y + place.labelOffset.y} textAnchor="middle" fill={ink} stroke={paper} strokeWidth="9" paintOrder="stroke" strokeLinejoin="round" fontSize="48" fontWeight="700">{place.name}</text>
					</g>;
				})}
			</g>
			<rect {...mapWindow} rx={mapWindowRadius} fill="none" stroke="#c4cec4" strokeWidth="2" />
		</svg>
		<div style={{ position: 'absolute', left: 90, bottom: 52, fontSize: 24, letterSpacing: 2, color: '#657475' }}>{pose.copy.footer}</div>
	</div>;
};

type GeographicalMapFilmProps = { direction: MapDirection };

export const GeographicalMapFilm: React.FC<GeographicalMapFilmProps> = ({ direction }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const performance = useMemo(() => mapTimeline(direction, fps), [direction, fps]);
	return <GeographicalMapPicture geography={direction.geography} pose={performance.poseAt(frame)} />;
};

export const GeographicalMapOpeningComposition: React.FC = () => <Composition
	id="GeographicalMapOpening"
	component={GeographicalMapFilm}
	defaultProps={{ direction: mapOpening }}
	durationInFrames={mapTimeline(mapOpening, filmFormat.fps).durationInFrames}
	{...filmFormat}
/>;

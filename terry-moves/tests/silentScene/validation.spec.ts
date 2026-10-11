import { compileScene } from '../../src/silentScene/compileScene';
import { Move, SceneScript, script } from '../../src/silentScene/script';
import { carrying, original, putDown } from './fixtures';
import { expectCarriedWrench, expectWrenchRestingAt, firstMiddleLast, picture } from './picture';

test('the story\'s last travel to kitchen reports its 1-based move and the named places before a timeline is returned', () => {
	const invalid: SceneScript = {
		...original,
		moves: [original.moves[0], original.moves[1], { kind: 'travel', to: 'kitchen', seconds: 2 }],
	};
	expect(() => compileScene(invalid)).toThrow(new Error('move 3 (travel to kitchen): unknown place "kitchen"; places are door, desk, window'));
});

test('an unknown starting place reports the first move context', () => {
	expect(() => compileScene({ ...original, start: 'kitchen' })).toThrow(new Error('move 1 (travel to desk): unknown place "kitchen"; places are door, desk, window'));
});

test('a cut uses the same named-place rule as travel', () => {
	const invalid: SceneScript = { ...original, moves: [original.moves[0], { kind: 'cut', to: 'kitchen' }] };
	expect(() => compileScene(invalid)).toThrow(new Error('move 2 (cut to kitchen): unknown place "kitchen"; places are door, desk, window'));
});

test.each(['constructor', 'toString'])('inherited place name %s is not a named destination', (to) => {
	const invalid: SceneScript = { ...original, moves: [{ kind: 'travel', to, seconds: 1 }] };
	expect(() => compileScene(invalid)).toThrow(new Error(`move 1 (travel to ${to}): unknown place "${to}"; places are door, desk, window`));
});

test('an own place may share an inherited property name', () => {
	const named: SceneScript = {
		...original,
		places: { ...original.places, toString: { x: 700, y: 650 } },
		moves: [{ kind: 'cut', to: 'toString' }],
	};
	expect(compileScene(named).poseAt(0)).toEqual(carrying({ x: 700, y: 650 }));
});

test('an unknown actor identifies the first move and supported actor', () => {
	const invalid = { ...original, actor: 'Painter' } as unknown as SceneScript;
	expect(() => compileScene(invalid)).toThrow(new Error('move 1 (travel to desk): unknown actor "Painter"; actors are Engineer'));
});

test('an unknown move kind identifies its position, name and supported kinds', () => {
	const invalid = { ...original, moves: [original.moves[0], { kind: 'dance', seconds: 1 }] } as unknown as SceneScript;
	expect(() => compileScene(invalid)).toThrow(new Error('move 2 (dance): unknown move kind "dance"; kinds are travel, hop, hold, cut, pick up, put down'));
});

describe.each(['travel', 'hop', 'hold'] as const)('%s duration validation', (kind) => {
	test.each([0, -0.1, NaN, Infinity, -Infinity])('rejects %s seconds before returning a timeline', (seconds) => {
		const move: Move = kind === 'travel' ? { kind, to: 'window', seconds } : { kind, seconds };
		const invalid: SceneScript = { ...original, moves: [original.moves[0], move] };
		const description = kind === 'travel' ? 'travel to window' : kind;
		expect(() => compileScene(invalid)).toThrow(new Error(`move 2 (${description}): invalid duration ${seconds}; duration must be a finite number greater than 0`));
	});
});

test('the first invalid move is reported when a later move also has a problem', () => {
	const invalid: SceneScript = {
		...original,
		moves: [{ kind: 'hop', seconds: 0 }, { kind: 'travel', to: 'kitchen', seconds: 1 }],
	};
	expect(() => compileScene(invalid)).toThrow(new Error('move 1 (hop): invalid duration 0; duration must be a finite number greater than 0'));
});

test('the actual valid script still compiles at its authored duration and final place', () => {
	const scene = compileScene(script);
	expect(scene.durationInFrames).toBe(171);
	const { x, y, lift, held } = scene.poseAt(scene.durationInFrames - 1);
	expect({ x, y, lift, held }).toEqual({ x: script.places.window.x, y: script.places.window.y, lift: 0, held: null });
});

describe('a prop move that contradicts reach or ownership is reported before a timeline is returned', () => {
	const [travelToDesk, pickUpWrench, travelToWindow, putDownWrench, hop] = putDown.moves;
	const { desk, window } = putDown.places;
	const refused = (script: SceneScript, message: string) => expect(() => compileScene(script)).toThrow(new Error(message));

	describe('the pick up moved to after the travel to the window', () => {
		const outOfReach: SceneScript = { ...putDown, moves: [travelToDesk, travelToWindow, pickUpWrench, putDownWrench, hop] };

		test('names the pick up, the desk the wrench rests at, the window the Engineer is at, and the fix', () => {
			refused(outOfReach, 'move 3 (pick up wrench): wrench rests at desk, out of reach from window; travel or cut to desk first');
		});

		describe('with cut to desk inserted before the pick up', () => {
			const cutBack: SceneScript = { ...putDown, moves: [travelToDesk, travelToWindow, { kind: 'cut', to: 'desk' }, pickUpWrench, putDownWrench, hop] };
			const scene = compileScene(cutBack);
			const cut = scene.beatRange('3 cut to desk');
			const pickUpRange = scene.beatRange('4 pick up wrench');
			const [first, contact] = firstMiddleLast(pickUpRange);

			test('the pick up begins at the desk on the frame after the cut, with the wrench still on the desk', () => {
				expect(cut.durationInFrames).toBe(1);
				expect(first).toBe(cut.from + 1);
				expect(picture(scene.poseAt(cut.from - 1), cutBack.places).actor).toEqual({ x: window.x, y: window.y });
				[cut.from, first].forEach((frame) => {
					const drawn = expectWrenchRestingAt(desk.surface, scene.poseAt(frame), cutBack.places);
					expect(drawn.actor).toEqual({ x: desk.x, y: desk.y });
				});
			});

			test('the real hand takes the wrench at the desk grip with the arm at its fixed lengths', () => {
				const before = expectWrenchRestingAt(desk.surface, scene.poseAt(contact - 1), cutBack.places);
				expect(Math.hypot(before.worldHand.x - desk.surface.x, before.worldHand.y - desk.surface.y)).toBeGreaterThan(1);
				const drawn = expectCarriedWrench(scene.poseAt(contact), cutBack.places);
				expect(drawn.actor).toEqual({ x: desk.x, y: desk.y });
				expect(drawn.worldHand.x).toBeCloseTo(desk.surface.x, 8);
				expect(drawn.worldHand.y).toBeCloseTo(desk.surface.y, 8);
			});

			test('the put down that follows releases the wrench back on the desk', () => {
				expectWrenchRestingAt(desk.surface, scene.poseAt(scene.durationInFrames - 1), cutBack.places);
			});
		});
	});

	test('the put down moved to before the pick up reports that nothing is held', () => {
		refused({ ...putDown, moves: [travelToDesk, putDownWrench, pickUpWrench, travelToWindow, hop] }, 'move 2 (put down wrench): nothing is held');
	});

	test('a second pick up of the held wrench reports that it is already in hand', () => {
		refused({ ...putDown, moves: [travelToDesk, pickUpWrench, travelToWindow, pickUpWrench, putDownWrench, hop] }, 'move 4 (pick up wrench): wrench is already in hand');
	});

	test('putting the wrench down at the door reports the place and the places that have a surface', () => {
		const atDoor: SceneScript = { ...putDown, moves: [travelToDesk, pickUpWrench, { kind: 'travel', to: 'door', seconds: 2 }, putDownWrench, hop] };
		refused(atDoor, 'move 4 (put down wrench): door has no surface; surfaces are desk, window');
	});

	test.each(['pick up', 'put down'] as const)('a %s of an undeclared prop reports the declared props', (kind) => {
		refused({ ...putDown, moves: [travelToDesk, { kind, prop: 'spanner', seconds: 0.8 }] }, `move 2 (${kind} spanner): unknown prop "spanner"; props are wrench`);
	});

	test('an inherited property name is not a declared prop', () => {
		refused({ ...putDown, moves: [travelToDesk, { kind: 'pick up', prop: 'toString', seconds: 0.8 }] }, 'move 2 (pick up toString): unknown prop "toString"; props are wrench');
	});

	describe('with a spanner also resting on the window surface', () => {
		const twoProps: SceneScript = { ...putDown, props: { wrench: { at: 'desk' }, spanner: { at: 'window' } } };

		test('a pick up while another prop is held names the held prop, where the Engineer is, and the fix', () => {
			const moves: SceneScript['moves'] = [travelToDesk, pickUpWrench, travelToWindow, { kind: 'pick up', prop: 'spanner', seconds: 0.8 }];
			refused({ ...twoProps, moves }, 'move 4 (pick up spanner): the Engineer at window already holds wrench; put down wrench first');
		});

		test('a put down of a prop that is not the held one names where it rests and what the Engineer holds', () => {
			const moves: SceneScript['moves'] = [travelToDesk, pickUpWrench, travelToWindow, { kind: 'put down', prop: 'spanner', seconds: 0.8 }];
			refused({ ...twoProps, moves }, 'move 4 (put down spanner): spanner rests at window, not in hand; the Engineer at window holds wrench');
		});
	});

	test('a wrench on a surface beyond the fixed-length arm of the Engineer standing at that place names the surface', () => {
		const tooFar: SceneScript = { ...putDown, places: { ...putDown.places, desk: { ...desk, surface: { x: 850, y: 690 } } } };
		refused(tooFar, 'move 2 (pick up wrench): wrench rests at desk, but the desk surface is beyond the Engineer\'s reach from desk; move the surface closer');
	});

	test('a put down on a surface beyond the fixed-length arm names the held wrench, the place, and the surface', () => {
		const tooFar: SceneScript = { ...putDown, places: { ...putDown.places, window: { ...window, surface: { x: 1160, y: 590 } } } };
		refused(tooFar, 'move 4 (put down wrench): wrench is in hand at window, but the window surface is beyond the Engineer\'s reach; move the surface closer');
	});

	test('the place named is the one a cut moved the Engineer to', () => {
		const moves: SceneScript['moves'] = [travelToDesk, pickUpWrench, { kind: 'cut', to: 'door' }, putDownWrench];
		refused({ ...putDown, moves }, 'move 4 (put down wrench): door has no surface; surfaces are desk, window');
		refused({ ...putDown, moves: [{ kind: 'cut', to: 'window' }, pickUpWrench] }, 'move 2 (pick up wrench): wrench rests at desk, out of reach from window; travel or cut to desk first');
	});

	test('a wrench put down at the window is reported as resting there when picked up from the desk', () => {
		const moves: SceneScript['moves'] = [travelToDesk, pickUpWrench, travelToWindow, putDownWrench, { kind: 'travel', to: 'desk', seconds: 2 }, pickUpWrench];
		refused({ ...putDown, moves }, 'move 6 (pick up wrench): wrench rests at window, out of reach from desk; travel or cut to window first');
	});

	test('the first contradictory move is reported when a later move has an unknown place', () => {
		const moves: SceneScript['moves'] = [travelToDesk, putDownWrench, { kind: 'travel', to: 'kitchen', seconds: 1 }];
		refused({ ...putDown, moves }, 'move 2 (put down wrench): nothing is held');
	});

	describe('prop declarations', () => {
		test('a prop starting at a place without a surface reports the place and the places that have one', () => {
			refused({ ...putDown, props: { wrench: { at: 'door' } } }, 'scene start: wrench rests at door, which has no surface; surfaces are desk, window');
		});

		test('a prop starting at an undeclared place reports the declared places', () => {
			refused({ ...putDown, props: { wrench: { at: 'kitchen' } } }, 'scene start: wrench rests at unknown place "kitchen"; places are door, desk, window');
		});

		test('two props held at the start report that only one prop can be held', () => {
			refused({ ...putDown, props: { wrench: 'held', spanner: 'held' } }, 'scene start: wrench and spanner are both held; only one prop can be held');
		});

		test('a scene with no surface at all says so', () => {
			refused({ ...original, props: { wrench: { at: 'desk' } } }, 'scene start: wrench rests at desk, which has no surface; surfaces are none');
		});
	});
});

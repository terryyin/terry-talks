import {loadFont} from '@remotion/fonts';
import {cancelRender, staticFile} from 'remotion';

export const poppinsFontFamily = 'Poppins';

// loadFont holds Remotion renders until these local faces are available.
// Import this module only in the See–Do–Feedback film.
export const poppinsFontReady = Promise.all([
	loadFont({
		family: poppinsFontFamily,
		url: staticFile('assets/fonts/poppins/Poppins-Regular.ttf'),
		weight: '400',
		style: 'normal',
		display: 'block',
	}),
	loadFont({
		family: poppinsFontFamily,
		url: staticFile('assets/fonts/poppins/Poppins-Medium.ttf'),
		weight: '500',
		style: 'normal',
		display: 'block',
	}),
	loadFont({
		family: poppinsFontFamily,
		url: staticFile('assets/fonts/poppins/Poppins-SemiBold.ttf'),
		weight: '600',
		style: 'normal',
		display: 'block',
	}),
]);

void poppinsFontReady.catch(cancelRender);

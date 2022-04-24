import adapter from '@sveltejs/adapter-netlify';

const config = {
	kit: {
		// default options are shown
		adapter: adapter({
			// if true, will create a Netlify Edge Function rather
			// than using standard Node-based functions
			edge: false,

			// if true, will split your app into multiple functions
			// instead of creating a single one for the entire app.
			// if `edge` is true, this option cannot be used
			split: false
		})
		// ,prerender: {
		// 	onError: 'continue'
		// }
	}
};
export default config;

// import adapter from '@sveltejs/adapter-auto';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: adapter()
// 	}
// };

// export default config;

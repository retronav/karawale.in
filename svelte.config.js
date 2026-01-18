import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	compilerOptions: {
		runes: true
	},

	kit: { adapter: adapter(), prerender: {handleHttpError: 'warn'} },
	extensions: ['.svelte', '.svx']
};

export default config;

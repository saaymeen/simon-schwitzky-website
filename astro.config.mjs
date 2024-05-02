import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import glsl from 'vite-plugin-glsl';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react()],
	vite: {
		plugins: [glsl()],
	},
	i18n: {
		defaultLocale: 'de',
		locales: ['de', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
		fallback: {
			en: 'de',
		},
	},
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import glsl from 'vite-plugin-glsl';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { locales, defaultLocale, localeMap } from './src/config/i18n.mjs';
import { imageService } from '@unpic/astro/service';

const site = 'https://simonschwitz.ky';

// @astrojs/cloudflare@0.0.0-cf-deps-chunk-20240407075425
// update dependency once this is fixed
// https://github.com/withastro/adapters/issues/211

export default defineConfig({
	integrations: [
		tailwind(),
		react(),
		sitemap({
			i18n: {
				defaultLocale,
				locales: localeMap,
			},
		}),
	],
	vite: {
		plugins: [glsl()],
	},
	adapter: cloudflare({
		imageService: 'passthrough',
	}),
	i18n: {
		locales,
		defaultLocale,
		routing: {
			prefixDefaultLocale: false,
		},
	},
	site,
	output: 'hybrid',
	server: {
		host: '0.0.0.0',
	},
	image: { service: imageService() },
});

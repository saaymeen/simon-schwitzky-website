import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import glsl from 'vite-plugin-glsl';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { locales, defaultLocale, localeMap } from './src/config/i18n.mjs';
import { passthroughImageService } from 'astro/config';
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
				defaultLocale: 'de',
				locales: localeMap,
			},
			serialize(item) {
				// remove stuff like this from sitemap: <xhtml:link rel="alternate" hreflang="de" href="https://simonschwitz.ky/"/>
				let targetLink = undefined;
				item.links = item.links?.filter((link) => {
					if (link.lang === defaultLocale && link.url.includes(site + '/' + defaultLocale) === false) {
						targetLink = link;
						return false;
					}
					return true;
				});

				if (typeof targetLink !== 'undefined') {
					targetLink.lang = 'x-default';
					item.links?.push(targetLink);
				}

				return item;
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
	},
	//i18n: {
	//	defaultLocale,
	//	locales,
	//	routing: {
	//		prefixDefaultLocale: true,
	//		redirectToDefaultLocale: false,
	//	},
	//	fallback: {
	//		en: 'de',
	//	},
	//},
	site,
	output: 'hybrid',
	server: {
		host: '0.0.0.0',
	},
	image: { service: imageService() },
});

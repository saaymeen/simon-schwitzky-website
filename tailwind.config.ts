import type { Config } from 'tailwindcss';
import tailwindForms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			xs: '480px',
			...defaultTheme.screens,
		},
		extend: {
			fontFamily: {
				sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
				serif: ['"Noticia Text"', ...defaultTheme.fontFamily.serif],
			},
		},
	},
	plugins: [tailwindForms],
} satisfies Config;

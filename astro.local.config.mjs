import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";
import robots from "astro-robots";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import yaml from '@rollup/plugin-yaml';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			configFile: './tailwind.toyota.js'
		}),
		sitemap(),
		robots({
			policy: [
				{
					userAgent: ["*"],
					allow: ["/"],
					disallow: ["/?*"],
				},
			  ],
		}),
		alpinejs(),
		mdx(),
		icon(),
		react(),
	],
	vite: {
		plugins: [yaml()],
		css: {
			preprocessorOptions: {
			  	scss: {
					silenceDeprecations: ['legacy-js-api'],
				},
			},
		},
	},
	redirects: {
		"/brands/toyota/camry-2024": "/cars/",
		"/brands/toyota/hiace": "/cars/",
		"/brands/toyota/land-cruiser-prado-2020": "/cars/",
		"/brands/toyota/new-c-hr": "/cars/",
		"/dopolnitelnoe-oborudovanie/aksessuary-khann": "/aksessuary-khann/",
		"/dopolnitelnoe-oborudovanie/legkosplavnye-diski-khann": "/legkosplavnye-diski-khann/",
		"/cars/compare": "/cars/",
		"/cars/not-found": "/cars/"
	},
	site: 'https://alexsab-ru.github.io',
	base: '/'
});
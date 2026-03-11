import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import alpinejs from '@astrojs/alpinejs';
import sitemap from "@astrojs/sitemap";
import robots from "astro-robots";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import yaml from '@rollup/plugin-yaml';
import react from '@astrojs/react';
import { loadEnv } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

// https://astro.build/config
//
// Определяем значение site из src/data/scripts.json.
// Если там нет, то берём DOMAIN из .env и добавляем https:// в начале.
// Если ни одно не задано, используем прежнее значение по умолчанию.
// Важно: в astro.config.mjs .env не загружается автоматически. Рекомендуемый способ — loadEnv из Vite.
// См. документацию: https://docs.astro.build/en/guides/environment-variables/#in-the-astro-config-file
const env = (() => {
    try {
        return loadEnv(process.env.MODE ?? process.env.NODE_ENV ?? 'development', process.cwd(), '');
    } catch (_) {
        return {};
    }
})();

const resolveSiteFromConfig = (fallbackUrl) => {
    // Читаем ./src/data/scripts.json из корня проекта.
    const scriptsJsonPath = path.resolve(process.cwd(), 'src/data/scripts.json');
    let scriptsSiteFromJson = '';
    try {
        const rawFileContent = fs.readFileSync(scriptsJsonPath, 'utf-8');
        const parsedJson = JSON.parse(rawFileContent);
        // В JSON ключ называется "site". Допускаем отсутствие.
        scriptsSiteFromJson = (parsedJson?.site ?? '').toString().trim();
    } catch (_) {
        // Файл может отсутствовать на ранних этапах. Это нормально.
    }

    // Берём приоритетно значение из JSON, затем из ENV.
    const rawDomain = scriptsSiteFromJson || ((env.DOMAIN ?? process.env.DOMAIN ?? '').toString().trim());

    // Нормализуем до https://<domain>. Также переводим http:// -> https://.
    if (!rawDomain) return fallbackUrl;
    if (rawDomain.startsWith('https://')) return rawDomain;
    if (rawDomain.startsWith('http://')) return rawDomain.replace(/^http:\/\//, 'https://');
    return `https://${rawDomain}`;
};

const computedSite = resolveSiteFromConfig('https://example.com');
export default defineConfig({
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith('telegram-bot/') && !page.endsWith('redirect/')
		}),
		robots({
			policy: [
				{
					userAgent: "Yandex",
					allow: ["/"],
					disallow: ["/?*"],
					cleanParam: [
						"_ym_debug&_ym_lang&_ym_status-check&yadclid&yadordid&yandex_ad_client_id&yandex-source&yclid&yhid&ymclid&yhic&ychyd&ycilyd&ycylid&ypppel&yqppel", 
						"_ga&_gac&ga&gclid&gcmes&gcmlg&utm_sourcegoogle", 
						"utm_&utm_bn_id&utm_bn_system_id&utm_branch&utm_c&utm_campai&utm_campaign&utm_content&utm_from&utm_hclid&utm_me&utm_mediu&utm_medium&utm_orderpage&utm_partner_id&utm_placement&utm_position&utm_redirect&utm_referer&utm_referrer&utm_source&utm_startpage&utm_term&utm_type&_openstat&_source_stat_&gtm_debug", 
						"adid&admitad_uid&adrclid&adv&aid&baobab_event_id&bxajaxid&calltouch_tm&clid&dclid&erid&etext&fbclid&from&frommarket&height&int_campaign&lang&length&mindbox&mindbox_nocache&mindbox-click-id&mindbox-message-key&mobileApp&msclkid&msisdn&mt_click_id&noredirect&openstat&order&ORDER_BY", 
						"pay&payment&q&s&rb_clickid&ref&referrer&roistat_visit&sa&set_filter&source&tag&tags&target&text&token&twclid&type&types&userDataToken&USERID&uuid&ved&vendor&wbraid&width&action&register&cid&k50id&search&cm_id&ivid&hl&tpclid", 
						"region&region_name&utm_ya_campaign&utm_candidate&block&model&color&drive&complects&editionuid"
					],
				},
				{
					userAgent: "Googlebot",
					allow: ["/"],
					disallow: ["/?*"],
				},
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
	redirects: {
		"/used/volkswagen/polo": "/used_cars",
		"/used/volkswagen": "/used_cars",
		"/used/toyota/rav4/n3174675": "/used_cars",
		"/used/toyota/rav4/n2909764": "/used_cars",
		"/used/toyota/new-rav4": "/used_cars",
		"/used/toyota/land-cruiser-300/n3055943": "/used_cars",
		"/used/toyota/land-cruiser-300/n3055943": "/used_cars",
		"/used/toyota/land-cruiser-300/n2989502": "/used_cars",
		"/used/toyota/hilux_ng/n2899975": "/used_cars",
		"/used/toyota/hilux_ng": "/used_cars",
		"/used/toyota/highlander": "/used_cars",
		"/used/toyota/hiace": "/used_cars",
		"/used/toyota/hiace": "/used_cars",
		"/used/toyota/corolla-2020/n2998038": "/used_cars",
		"/used/toyota/corolla-2020/n2998038": "/used_cars",
		"/used/toyota/avalon/n2913461": "/used_cars",
		"/used/toyota/avalon/n2913461": "/used_cars",
		"/used/toyota/avalon/n2868566": "/used_cars",
		"/used/toyota/avalon/n2841835": "/used_cars",
		"/used/toyota": "/used_cars",
		"/used/lexus/rx/u1872762": "/used_cars",
		"/used/lexus/rx/u1872762": "/used_cars",
		"/used/lexus/rx-2019/u2481675": "/used_cars",
		"/used/lexus/lx": "/used_cars",
		"/used/lexus/lx": "/used_cars",
		"/used/lexus/es/u2020920": "/used_cars",
		"/used/lada/XRAY/u2408939": "/used_cars",
		"/used/lada/niva/u2353853": "/used_cars",
		"/used/lada/granta": "/used_cars",
		"/used/lada": "/used_cars",
		"/used/kia/stinger": "/used_cars",
		"/used/kia/rio/u2380089": "/used_cars",
		"/used/kia/rio/u2380089": "/used_cars",
		"/used/hyundai/tucson/u2344962": "/used_cars",
		"/used/hyundai/tucson/u2344962": "/used_cars",
		"/used/hyundai/tucson": "/used_cars",
		"/used/hyundai/tucson-2018": "/used_cars",
		"/used/haval/f7/u2250004": "/used_cars",
		"/used/haval/f7": "/used_cars",
		"/used/datsun": "/used_cars",
		"/used/chevrolet/aveo_sedan/u2488358": "/used_cars",
		"/used/bmw/5er/u1003817": "/used_cars",
		"/used/audi": "/used_cars",
		"/used/audi": "/used_cars",
		"/used": "/used_cars",
		"/new/toyota/rav4/n3182806": "/cars",
		"/new/toyota/rav4/n3174672": "/cars",
		"/new/toyota/rav4/n2918807": "/cars",
		"/new/toyota/rav4/n2917532": "/cars",
		"/new/toyota/rav4/n2917528": "/cars",
		"/new/toyota/rav4/n2917520": "/cars",
		"/new/toyota/rav4/n2917520": "/cars",
		"/new/toyota/rav4/n2917519": "/cars",
		"/new/toyota/rav4/n2917514": "/cars",
		"/new/toyota/rav4/n2916241": "/cars",
		"/new/toyota/rav4/n2913492": "/cars",
		"/new/toyota/rav4/n2913486": "/cars",
		"/new/toyota/rav4/n2913482": "/cars",
		"/new/toyota/rav4/n2909935": "/cars",
		"/new/toyota/rav4/n2909764": "/cars",
		"/new/toyota/rav4/n2909764": "/cars",
		"/new/toyota/rav4/n2909762": "/cars",
		"/new/toyota/rav4/n2909762": "/cars",
		"/new/toyota/rav4/n2895285": "/cars",
		"/new/toyota/rav4/n2894922": "/cars",
		"/new/toyota/rav4/n2894920": "/cars",
		"/new/toyota/rav4/n2892378": "/cars",
		"/new/toyota/rav4/n2892378": "/cars",
		"/new/toyota/rav4/n2892377": "/cars",
		"/new/toyota/rav4/n2892376": "/cars",
		"/new/toyota/rav4/n2870646": "/cars",
		"/new/toyota/rav4/n2853907": "/cars",
		"/new/toyota/rav4/n2833220": "/cars",
		"/new/toyota/rav4/n2747449": "/cars",
		"/new/toyota/rav4/n2747449": "/cars",
		"/new/toyota/rav4/n2648724": "/cars",
		"/new/toyota/new-rav4/n2634810": "/cars",
		"/new/toyota/new-rav4/n2605137": "/cars",
		"/new/toyota/new-rav4/n2518144": "/cars",
		"/new/toyota/new-camry/n3072050": "/cars",
		"/new/toyota/new-camry/n2990055": "/cars",
		"/new/toyota/new-camry/n2913466": "/cars",
		"/new/toyota/new-camry/n2913464": "/cars",
		"/new/toyota/new-camry/n2913463": "/cars",
		"/new/toyota/new-camry/n2913463": "/cars",
		"/new/toyota/new-camry/n2905273": "/cars",
		"/new/toyota/new-camry/n2905273": "/cars",
		"/new/toyota/new-camry/n2896967": "/cars",
		"/new/toyota/new-camry/n2867444": "/cars",
		"/new/toyota/new-camry/n2867442": "/cars",
		"/new/toyota/new-camry/n2867440": "/cars",
		"/new/toyota/new-camry/n2848966": "/cars",
		"/new/toyota/new-camry/n2847025": "/cars",
		"/new/toyota/new-camry/n2847025": "/cars",
		"/new/toyota/new-camry/n2845283": "/cars",
		"/new/toyota/new-camry/n2845282": "/cars",
		"/new/toyota/new-camry/n2845282": "/cars",
		"/new/toyota/new-camry/n2845279": "/cars",
		"/new/toyota/new-camry/n2845279": "/cars",
		"/new/toyota/new-camry/n2842735": "/cars",
		"/new/toyota/new-camry/n2747418": "/cars",
		"/new/toyota/new-camry/n2621716": "/cars",
		"/new/toyota/new-camry/n1872761": "/cars",
		"/new/toyota/new-camry/n1842702": "/cars",
		"/new/toyota/new-camry/n1838249": "/cars",
		"/new/toyota/new-camry/n1715465": "/cars",
		"/new/toyota/land-cruiser-prado/n3047485": "/cars",
		"/new/toyota/land-cruiser-prado/n3000577": "/cars",
		"/new/toyota/land-cruiser-prado/n2916239": "/cars",
		"/new/toyota/land-cruiser-prado/n2916239": "/cars",
		"/new/toyota/land-cruiser-prado/n2905458": "/cars",
		"/new/toyota/land-cruiser-prado/n2891069": "/cars",
		"/new/toyota/land-cruiser-prado/n2880767": "/cars",
		"/new/toyota/land-cruiser-prado/n2872438": "/cars",
		"/new/toyota/land-cruiser-prado/n2833494": "/cars",
		"/new/toyota/land-cruiser-prado/n2833494": "/cars",
		"/new/toyota/land-cruiser-prado/n2832985": "/cars",
		"/new/toyota/land-cruiser-prado/n2832984": "/cars",
		"/new/toyota/land-cruiser-prado/n2825546": "/cars",
		"/new/toyota/land-cruiser-prado/n2825164": "/cars",
		"/new/toyota/land-cruiser-prado-2017/n2906414": "/cars",
		"/new/toyota/land-cruiser-prado-2017/n2893892": "/cars",
		"/new/toyota/land-cruiser-prado-2017/n2893892": "/cars",
		"/new/toyota/land-cruiser-300/n2978316": "/cars",
		"/new/toyota/land-cruiser-300/n2978316": "/cars",
		"/new/toyota/land-cruiser-300/n2938859": "/cars",
		"/new/toyota/land-cruiser-300/n2938855": "/cars",
		"/new/toyota/land-cruiser-300/n2906051": "/cars",
		"/new/toyota/land-cruiser-300/n2906051": "/cars",
		"/new/toyota/land-cruiser-300/n2898879": "/cars",
		"/new/toyota/land-cruiser-300/n2898879": "/cars",
		"/new/toyota/land-cruiser-300/n2868569": "/cars",
		"/new/toyota/land-cruiser-300/n2863743": "/cars",
		"/new/toyota/land-cruiser-300/n2840620": "/cars",
		"/new/toyota/land-cruiser-300/n2825544": "/cars",
		"/new/toyota/land-cruiser-300/n2825544": "/cars",
		"/new/toyota/land-cruiser-300": "/cars",
		"/new/toyota/land-cruiser-300": "/cars",
		"/new/toyota/hilux-2020/n1607069": "/cars",
		"/new/toyota/hilux-2020/n1607069": "/cars",
		"/new/toyota/hilux_ng/n2747429": "/cars",
		"/new/toyota/fortuner/n2841208": "/cars",
		"/new/toyota/corolla": "/cars",
		"/new/toyota/corolla-2020/n1715490": "/cars",
		"/new/toyota/camry-ix/n3148955": "/cars",
		"/new/toyota/c-hr/n2894308": "/cars",
		"/new/toyota/c-hr/n2747415": "/cars",
		"/new/toyota/c-hr-2016/n2881765": "/cars",
		"/new/toyota/avalon/n2917193": "/cars",
		"/new/toyota/avalon/n2917192": "/cars",
		"/new/toyota/avalon/n2898731": "/cars",
		"/new/toyota/avalon/n2891591": "/cars",
		"/new/toyota/avalon/n2874549": "/cars",
		"/new/toyota/avalon/n2867446": "/cars",
		"/new/toyota/avalon/n2866702": "/cars",
		"/new/toyota/avalon/n2853493": "/cars",
		"/new/toyota/avalon/n2839861": "/cars",
		"/new/toyota/avalon/n2836623": "/cars",
		"/new/toyota/avalon/n2836623": "/cars",
		"/new/toyota/avalon/n2836143": "/cars",
		"/new/toyota/avalon/n2836143": "/cars",
		"/new/toyota/avalon/n2836141": "/cars",
		"/new/ravon/r2": "/cars",
		"/new/peugeot/partner": "/cars",
		"/new/peugeot": "/cars",
		"/new/peugeot": "/cars",
		"/new/nissan": "/cars",
		"/new/lexus/es": "/cars",
		"/new": "/cars",
		"/cars/used": "/used_cars",
		"/cars/new": "/cars",
		"/brands/toyota/rav4/offroad": "/models",
		"/brands/toyota/rav4/crossover": "/models",
		"/brands/toyota/rav4/compare-complectations/suv": "/models",
		"/brands/toyota/rav4/compare-complectations/offroad": "/models",
		"/brands/toyota/rav4/compare-complectations/crossover": "/models",
		"/brands/toyota/new-rav4/compare-complectations": "/models",
		"/brands/toyota/new-rav4": "/models"
},
	vite: {
		plugins: [
			yaml(),
			tailwindcss(),
		],
		css: {
			preprocessorOptions: {
			  	scss: {
					silenceDeprecations: ['legacy-js-api'],
				},
			},
		},
	},
    site: computedSite,
	base: "/"
});

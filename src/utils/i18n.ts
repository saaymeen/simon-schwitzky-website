import { defaultLocale, localeMap, locales } from '../config/i18n.mjs';

function getLocalizedPageURL(prefferedLocale: string | undefined, url: URL): string {
	let locale = defaultLocale;
	if (typeof prefferedLocale !== 'undefined') {
		locale = prefferedLocale;
	}

	return '/' + locale + url.pathname + url.search;
}

function stripLocale(url: URL): [string, string] {
	const { pathname, search } = url;

	for (const locale of locales) {
		if (pathname.startsWith('/' + locale)) {
			const pathParts = pathname.split('/');

			pathParts.shift(); // pathname starts with '/' so we get first element empty string
			pathParts.shift(); // remove locale found

			if (pathParts.length === 0) {
				pathParts.push('');
				pathParts.push('');
			}

			return [pathParts.join('/'), search];
		}
	}

	return [pathname, search];
}

function getAlternateLangs(baseURL: string): [string, string][] {
	const urls = [] as [string, string][];
	for (const locale of locales) {
		urls.push(['/' + locale + baseURL + '/', locale]);
	}

	return urls;
}

function getTranslation<T extends object>(
	currentLocale: string | undefined,
	translations: Record<keyof typeof localeMap, T>,
): T {
	if (typeof currentLocale === 'undefined') {
		return translations[defaultLocale];
	}

	if (Object.keys(translations).some((value) => value === currentLocale)) {
		return translations[currentLocale as keyof typeof localeMap];
	}

	throw new Error('locale not found in translations');
}

export { getLocalizedPageURL, getAlternateLangs, stripLocale, getTranslation };

import { BASE_URL, LYRIC_DIR, vercelPreview } from './env'
import type { Metadata } from 'next'
import { stegaClean } from 'next-sanity'

export function resolveUrl(
	page?: Sanity.PageBase,
	{
		base = true,
		params,
	}: {
		base?: boolean
		params?: string
		language?: string
	} = {},
) {
	const segment = page?._type === 'lyrics' ? `/lyrics/` : '/'
	const slug = page?.metadata?.slug?.current
	const path = slug === 'index' ? null : slug

	return [
		base && process.env.NEXT_PUBLIC_BASE_URL,
		segment,
		path,
		stegaClean(params),
	]
		.filter(Boolean)
		.join('')
}

export default async function processMetadata(
	page: (Sanity.Lyric),
): Promise<Metadata> {
	const url = resolveUrl(page)
	const { title, description, ogimage, noIndex } = page.metadata

	return {
		metadataBase: new URL(BASE_URL),
		title,
		description,
		openGraph: {
			type: 'website',
			url,
			title,
			description,
			images:
				ogimage || `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`,
		},
		robots: {
			index: noIndex || vercelPreview ? false : undefined,
		},
		alternates: {
			canonical: url,
			types: {
				'application/rss+xml': `/${LYRIC_DIR}/rss.xml`,
			},
		},
	}
}

export const dev = process.env.NODE_ENV === 'development'
export const vercelPreview = process.env.VERCEL_ENV === 'preview'

if (!process.env.NEXT_PUBLIC_BASE_URL) {
	throw new Error('Missing base url: 🤞 Domain Expansion (Unlimited Void) requires a proper URL!\n\n')
}

export const BASE_URL = dev
	? 'http://localhost:3000'
	: process.env.NEXT_PUBLIC_BASE_URL!

export const LYRIC_DIR = 'lyrics'

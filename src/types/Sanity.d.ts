import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { SanityAssetDocument, SanityDocument } from 'next-sanity'

export interface Lyric {
    _id: string;
    title: string;
    slug: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any; // Replace `any` with the correct type if using block content
    artist?: {
      _id: string;
      name: string;
    };
    user?: {
      _id: string;
      name: string;
    };
    album?: {
      _id: string;
      title: string;
    };
    language: string;
    seo?: {
      title: string;
      description: string;
    };
    songLinks?: {
      platform: string;
      url: string;
    }[];
  }

declare global {
	namespace Sanity {
        interface PageBase extends SanityDocument {
			title?: string
			metadata: Metadata
			readonly language?: string
		}
        interface Image extends SanityAssetDocument {
			alt: string
			loading: 'lazy' | 'eager'
		}
        interface Img {
			readonly _type: 'img'
			image: Image
			responsive?: {
				image: Image
				media: string
			}[]
			alt?: string
			loading?: 'lazy' | 'eager'
		}
        interface Lyric extends PageBase {
            _id: string;
            title: string;
            slug: string;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content: any; // Replace `any` with the correct type if using block content
            artist?: {
              _id: string;
              name: string;
            };
            user?: {
              _id: string;
              name: string;
            };
            album?: {
              _id: string;
              title: string;
            };
        } 
    }
}
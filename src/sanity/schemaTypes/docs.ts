import { defineType, defineField, defineArrayMember } from 'sanity';

export const blockContent = defineType({
    name: 'blockContent',
    title: 'Block Content',
    type: 'array',
    of: [
      {
        type: 'block',
      },
    ],
  });
  
  export const user = defineType({
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
      }),
      defineField({
        name: 'username',
        title: 'Username',
        type: 'string',
      }),
      defineField({
        name: 'profileImage',
        title: 'Profile Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
          }),
        ],
      }),
      defineField({
        name: 'email',
        title: 'Email',
        type: 'string',
      }),
      defineField({
        name: 'role',
        title: 'Role',
        type: 'string',
        initialValue: 'user',
        options: {
          list: ['user', 'editor', 'admin'],
        },
      }),
    ],
  });
  
  export const artist = defineType({
    name: 'artist',
    title: 'Artist',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'name', maxLength: 96 },
      }),
      defineField({
        name: 'profileImage',
        title: 'Profile Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
          }),
        ],
      }),
      defineField({
        name: 'bio',
        title: 'Bio',
        type: 'blockContent',
      }),
      defineField({
        name: 'metadata',
        title: 'Metadata',
        type: 'metadata',
      }),
      
    ],
  });
  
  export const album = defineType({
    name: 'album',
    title: 'Album',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title', maxLength: 96 },
      }),
      defineField({
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
          }),
        ],
      }),
      defineField({
        name: 'artist',
        title: 'Artist',
        type: 'reference',
        to: [{ type: 'artist' }],
      }),
      defineField({
        name: 'releaseYear',
        title: 'Release Year',
        type: 'number',
      
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'blockContent',
      }),
      defineField({
        name: 'genre',
        title: 'Genre',
        type: 'string',
        options: {
          list: ['Rock', 'Pop', 'Hip-Hop', 'Electronic', 'Country', 'Jazz'],
        },
      }),
      
      defineField({
        name: 'metadata',
        title: 'Metadata',
        type: 'metadata',
      }),
      defineField({
        name: 'lyrics',
        title: 'Lyrics',
        type: 'array',
        of: [defineArrayMember({ type: 'reference', to: [{ type: 'lyric' }] })],
      }),
    ],
  });
  
  export const lyric = defineType({
    name: 'lyric',
    title: 'Lyric',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
      }),
      defineField({
        name: 'titleAm',
        title: 'Title (Amharic)',
        type: 'string',
      }),
      defineField({
        name: 'lyricImage',
        title: 'Lyric Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
          }),
        ],
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'title', maxLength: 96 },
      }),
      defineField({
        name: 'content',
        title: 'Lyrics Content',
        type: 'blockContent',
      }),
      defineField({
        name: 'artist',
        title: 'Artist',
        type: 'reference',
        to: [{ type: 'artist' }],
      }),
      defineField({
        name: 'user',
        title: 'Uploaded By',
        type: 'reference',
        to: [{ type: 'user' }],
      }),
      defineField({
        name: 'metadata',
        type: 'metadata',
      }),
      defineField({
        name: 'album',
        title: 'Album',
        type: 'reference',
        to: [{ type: 'album' }],
      }),
      defineField({
        name: 'language',
        title: 'Language',
        type: 'string',
        initialValue: 'en',
        options: {
          list: ['et', 'en', 'es', 'fr', 'de', 'it'],
        },
      }),
      
      defineField({
        name: 'songLinks',
        title: 'Song Links',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            fields: [
              defineField({
                name: 'platform',
                title: 'Platform',
                type: 'string',
                options: {
                  list: [
                    'Spotify',
                    'Apple Music',
                    'YouTube',
                    'SoundCloud',
                    'Tidal',
                    'Amazon Music',
                  ],
                },
          
              }),
              defineField({
                name: 'url',
                title: 'URL',
                type: 'url',
              }),
            ],
          }),
        ],
      }),
    ],
  });
  

export const metadata = defineType({
	name: 'metadata',
	title: 'Metadata',
	description: 'For search engines',
	type: 'object',
	fields: [
		defineField({
			name: 'slug',
			type: 'slug',
			description: 'URL path or permalink',
			options: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				source: (doc: any) => doc.title || doc.metadata.title,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.max(60).warning(),
			
		}),
		defineField({
			name: 'description',
			type: 'text',
			validation: (Rule) => Rule.max(160).warning(),
			
		}),
		defineField({
			name: 'image',
			description: 'Used for social sharing previews',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'noIndex',
			description: 'Prevent search engines from indexing this page',
			type: 'boolean',
			initialValue: false,
		}),
	],
})

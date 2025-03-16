import { type SchemaTypeDefinition } from 'sanity'
import { album, artist, blockContent, lyric, user, metadata } from './docs'


const schemas: { types: SchemaTypeDefinition[] } = {
  types: [user, album, artist, lyric, blockContent, metadata],
}

export default schemas

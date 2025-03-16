'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import schemas from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  title: 'Zema HUB',
  basePath: '/studio',
  projectId,
  dataset,
  name: 'production-workspace',
  schema: schemas,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})

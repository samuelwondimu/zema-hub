import React from 'react'

import Content from '@/components/RichtextModule/Content'
import { cn } from '@/lib/utils'

type Params = { lyric: Sanity.Lyric }

function LyricsPage({lyric}: Params) {
  return (
    <div className="flex min-h-screen flex-col">
    <Content
              value={lyric.content}
              className={cn(
                  'max-w-screen-md',
              )}
          />
  </div>
  )
}

export default LyricsPage
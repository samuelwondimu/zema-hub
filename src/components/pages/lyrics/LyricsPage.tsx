import React from 'react'

import Content from '@/components/RichtextModule/Content'
import { Img } from '@/components/ui/Img'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'

type Params = { lyric: Sanity.Lyric }

function LyricsPage({lyric}: Params) {
  return (
    <div className="flex min-h-screen flex-col">
        <section className="relative">
        <div className="absolute inset-0 z-0">
        <Img
					image={lyric.lyricImage}
					className="max-h-fold size-full object-cover"
					width={2400}
					draggable={false}
				/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="relative z-10 pt-12 pb-8 md:pt-24 md:pb-12 px-4 md:px-20">
          <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] items-start">
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
            <Img
					image={lyric.lyricImage}
					className="max-h-fold size-full object-cover"
					width={2400}
					draggable={false}
				/>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {lyric.titleAm} |  {lyric.title}
                </h1>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                  <Img
					image={lyric.artist?.profileImage}
					className="max-h-fold size-full object-cover"
					width={2400}
					draggable={false}
				/>
                  </Avatar>
                  <span className="font-medium">{lyric.artist?.name}</span>
                </div>
              </div>
              <p className="max-w-prose bg-white rounded-md p-4">
                {lyric.metadata.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='mx-4 md:mx-20 py-4'>
    <Content
              value={lyric.content}
              className='text-2xl'
          />
          </section>
  </div>
  )
}

export default LyricsPage
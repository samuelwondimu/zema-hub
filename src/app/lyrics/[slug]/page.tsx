import { fetchSanityLive } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import processMetadata from "@/lib/processMetadata";
import Content from "@/components/RichtextModule/Content";
import { cn } from "@/lib/utils";

export default async function Page({ params }: Props) {
  const lyric = await getLyric(await params)
  if (!lyric) notFound()
  return (
    <div className="flex min-h-screen flex-col ">
      <Content
				value={lyric.content}
				className={cn(
					'max-w-screen-md',
				)}
			/>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
	const post = await getLyric(await params)
	if (!post) notFound()
	return processMetadata(post)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[_type == 'lyric' && defined(metadata.slug.current)].metadata.slug.current`,
	)
	return slugs.map((slug) => ({ slug: slug.split('/') }))
}

type Params = { slug: string }

type Props = {
	params: Promise<Params>
}

export async function getLyric(params: Params) {
  const { slug } = processSlug(params)
  const response = await fetchSanityLive<Sanity.Lyric>({
    query: groq`
      *[_type == "lyric" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        metadata,
        content,
        "artist": artist->{
          _id,
          name
        },
        "user": user->{
          _id,
          name
        },
        "album": album->{
          _id,
          title
        },
        language,
        seo{
          title,
          description
        },
        songLinks[]{
          platform,
          url
        }
      }
    `,
    params: { slug },
  });
  return response || null;
}

function processSlug(params: Params) {
	const slug = params.slug
	return {
		slug: slug,
	}
}
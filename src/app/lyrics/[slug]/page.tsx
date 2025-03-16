import { groq } from "next-sanity";
// import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import processMetadata from "@/lib/processMetadata";
import LyricsPage from "@/components/pages/lyrics/LyricsPage";
import { client } from "@/sanity/lib/client";

type Params = { slug: string }

type Props = {
	params: Promise<Params>
}

export default async function Page({ params }: Props) {
  const lyric = await getLyric(await params)
  if (!lyric) notFound()
  return <LyricsPage lyric={lyric}/>;
}

export async function generateMetadata({ params }: Props) {
	const post = await getLyric(await params)
	if (!post) notFound()
	return processMetadata(post)
}

// export async function generateStaticParams() {
// 	const slugs = await client.fetch<string[]>(
// 		groq`*[_type == 'lyric' && defined(metadata.slug.current)].metadata.slug.current`,
// 	)
// 	return slugs.map((slug) => ({ slug: slug }))
// }

async function getLyric(params: Params) {
  const { slug } = processSlug(params)
  const response = await client.fetch<Sanity.Lyric>(groq`
      *[_type == "lyric" && slug.current == $slug][0]{
        _id,
        title,
        titleAm,
        "slug": slug.current,
        metadata,
        lyricImage,
        content,
        "artist": artist->{
          _id,
          name,
          profileImage,
          bio
        },
        "user": user->{
          _id,
          name
        },
        "album": album->{
          _id,
          title,
          coverImage
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
   { slug },
  );
  return response || null;
}

function processSlug(params: Params) {
	const slug = params.slug
	return {
		slug: slug,
	}
}
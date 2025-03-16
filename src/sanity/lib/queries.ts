import { groq } from "next-sanity";
import { fetchSanityLive } from "@/sanity/lib/fetch"; // Adjust the import path accordingly

// Define the type for the Lyric document
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

// Fetch a lyric by its slug
export async function getLyric(slug: string): Promise<Lyric | null> {
  const response = await fetchSanityLive<Lyric[]>({
    query: groq`
      *[_type == "lyric" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
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

  return response[0] || null;
}

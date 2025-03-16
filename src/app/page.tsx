"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import groq from "groq";
import { client } from "@/sanity/lib/client";

export default function Home() {
  const [query, setQuery] = useState("");
  const [lyrics, setLyrics] = useState<Sanity.Lyric[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 1) {
      setLyrics([]);
      return;
    }

    setLoading(true);

    const fetchLyrics = async () => {
      // Convert the search query to lowercase and append a wildcard.
      const searchTerm = query.toLowerCase() + "*";
      const groqQuery = groq`
        *[
          _type == "lyric" &&
          !(_id in path("drafts.**")) &&
          (
            lower(title) match $searchTerm ||
            lower(titleAm) match $searchTerm ||
            lower(pt::text(content)) match $searchTerm ||
            lower(artist->name) match $searchTerm ||
            lower(album->title) match $searchTerm
          )
        ]{
          title,
          titleAm,
          "content": pt::text(content),
          "artist": artist->name,
          "album": album->title,
          "image": lyricImage.asset->url,
          "slug": slug.current,
          "language": language
        }
      `;

      try {
        const results = await client.fetch(groqQuery, { searchTerm });
        setLyrics(results);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [query]);

  return (
    <div className="flex min-h-screen flex-col min-w-screen justify-center">
      <header className="sticky top-0 z-10 border-b bg-background justify-center">
        <div className="flex h-16 items-center justify-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">ዜማ HUB</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="flex flex-col items-center justify-center gap-6 py-24 px-4 text-center md:py-32">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            ለሚወዷቸው ዘፈኖች ግጥሞችን ያግኙ
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            በዘፈን ርዕስ፣ በአርቲስት ወይም በአልበም ግጥሞችን ይፈልጉ እና አዲስ ሙዚቃ ያግኙ።
          </p>

          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ዘፈን ርዕስ፣ አርቲስት ወይም አልበም ይፈልጉ..."
              className="w-full rounded-full border-2 pl-10 pr-4 py-6 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {loading && <p className="text-gray-500">Searching...</p>}

          <div className="w-full max-w-2xl mt-6 text-left">
            {lyrics.length > 0 ? (
              <ul className="space-y-4">
                {lyrics.map((lyric) => (
                  <Link key={lyric.slug} href={`/lyrics/${lyric.slug}`}>
                    <li className="border p-4 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold">{lyric.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {lyric.artist?.name} - {lyric.album?.title}
                      </p>
                      <p className="mt-2 line-clamp-3">{lyric.content}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            ) : query.length > 1 && !loading ? (
              <p className="text-gray-500">No lyrics found.</p>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 ዜማ HUB. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

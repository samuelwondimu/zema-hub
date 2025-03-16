import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col min-w-screen justify-center">
      <header className="sticky top-0 z-10 border-b bg-background justify-center">
        <div className="flex h-16 items-center justify-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">ዜማ HUB</span>
          </Link>
          <div className="flex items-center gap-4"></div>
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
              placeholder="በዘፈን ርዕስ፣ በአርቲስት ወይም በአልበም ግጥሞችን ይፈልጉ እና አዲስ ሙዚቃ ያግኙ።"
              className="w-full rounded-full border-2 pl-10 pr-4 py-6 text-lg"
            />
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

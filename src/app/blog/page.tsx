import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getAllArticles } from "../../lib/db";

const COLORS = [
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
];

export default async function BlogPage() {
  const articles = await getAllArticles();

  return (
    <div className="max-w-7xl mx-auto flex flex-col grow gap-4 p-4 w-full">
      <div className="text-center relative sm:py-8">
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-2 bg-blue-100 rounded-xl blur-md opacity-70"></div>
          <div className="absolute -inset-1 bg-blue-50 rounded-lg"></div>
          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-blue-500 bg-white relative px-10 py-5 rounded-lg shadow-lg border-2 border-blue-100 transform rotate-1">
            Интересные статьи
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-4 sm:my-auto">
        {articles.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <Card
              className={cn(
                "transition-all duration-300 h-full rounded-2xl bg-blue-500 border-0 overflow-hidden relative",
                COLORS[
                  Array.from(post.title ?? "").reduce(
                    (sum, char) => sum + char.charCodeAt(0),
                    0
                  ) % COLORS.length
                ]
              )}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-300" />

              <CardHeader className="flex flex-col items-center space-y-2 sm:space-y-4 pb-3 relative z-10">
                <div className="text-5xl transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6">
                  📖
                </div>
                <CardTitle className="text-lg sm:text-2xl font-bold text-white text-center max-sm:leading-5">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow relative z-10 space-y-4">
                <p className="text-xs sm:text-sm text-white/90 font-medium text-center px-2 line-clamp-3">
                  {post.summary}
                </p>

                <div className="flex items-center justify-center pt-2">
                  <div className="text-xs text-white/80 font-medium">
                    {new Date(post.published_at!).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

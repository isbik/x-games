import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, getArticleBySlug } from "../../../lib/db";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article does not exist.",
    };
  }

  return {
    title: article.title,
    description: article.summary || article.title,
    openGraph: {
      title: article.title,
      description: article.summary || article.title,
      url: `/${article.slug}`,
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-4 p-4 w-full">
      <div className="text-center relative sm:py-8">
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-2 bg-blue-100 rounded-xl blur-md opacity-70"></div>
          <div className="absolute -inset-1 bg-blue-50 rounded-lg"></div>
          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-blue-500 bg-white relative px-10 py-5 rounded-lg shadow-lg border-2 border-blue-100 transform rotate-1 text-balance leading-tight">
            {article.title}
          </h1>
        </div>

        <div className="relative -mt-2">
          <p className="sm:text-lg text-gray-600 max-w-2xl mx-auto px-8 py-4 bg-white rounded-[20px] shadow-lg border-2 border-blue-100 relative z-10 text-pretty leading-relaxed">
            {article.summary}
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border-2 border-blue-100 text-sm text-gray-600 font-medium mt-4">
            Опубликовано{" "}
            {new Date(article.published_at!).toLocaleDateString("ru-RU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      <Card className="rounded-2xl bg-white border-2 border-blue-100 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <article className="max-w-none">
            <div
              className="prose prose-lg lg:prose-xl max-w-none px-8 py-12 md:px-12 lg:px-16
                prose-headings:text-gray-800 prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:text-blue-500
                prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-gray-800
                prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-gray-700
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-code:bg-blue-50 prose-code:text-blue-800 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-medium
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50/50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                prose-ul:my-6 prose-li:my-2 prose-li:text-gray-700
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium"
              dangerouslySetInnerHTML={{
                __html: article.body
                  .replace(/\n/g, "<br>")
                  .replace(
                    /```(\w+)?\n([\s\S]*?)```/g,
                    '<pre class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-lg border border-gray-700"><code class="text-sm">$2</code></pre>'
                  )
                  .replace(
                    /`([^`]+)`/g,
                    '<code class="bg-blue-50 text-blue-800 px-2 py-1 rounded-md text-sm font-medium">$1</code>'
                  )
                  .replace(
                    /^# (.+)$/gm,
                    '<h1 class="text-4xl font-bold text-blue-500 mt-12 mb-6 tracking-tight">$1</h1>'
                  )
                  .replace(
                    /^## (.+)$/gm,
                    '<h2 class="text-3xl font-bold text-gray-800 mt-10 mb-4 tracking-tight">$1</h2>'
                  )
                  .replace(
                    /^### (.+)$/gm,
                    '<h3 class="text-2xl font-bold text-gray-700 mt-8 mb-3 tracking-tight">$1</h3>'
                  ),
              }}
            />
          </article>
        </CardContent>
      </Card>

      <div className="text-center py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
          Назад к блогу
        </Link>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { BlogPreview } from "@/components/site/BlogPreview";
import { blogPosts } from "@/lib/services-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Updates — GST, ITR, ROC & Legal News | VKRTAX TECH" },
      { name: "description", content: "Stay updated with the latest GST notifications, Income Tax changes, ROC due dates, startup registration tips and legal advisory from VKRTAX TECH." },
      { property: "og:title", content: "VKRTAX TECH Blog & Updates" },
      { property: "og:description", content: "Tax, GST, ROC and Legal updates by VKRTAX TECH experts." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: () => (
    <Layout>
      <div className="border-b border-border bg-secondary/30 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-[color:var(--navy)]">Blog & Updates</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">GST updates, ITR filing tips, ROC compliance, trademark news and legal advisory.</p>
        </div>
      </div>
      <BlogPreview limit={blogPosts.length} />
    </Layout>
  ),
});
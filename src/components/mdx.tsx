import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
export function Content({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                { theme: "github-dark", keepBackground: true },
              ],
            ],
          },
        }}
        components={{
          table: ({ children, ...props }) => (
            <div
              className="table-scroll"
              role="region"
              aria-label="Article table"
              tabIndex={0}
            >
              <table {...props}>{children}</table>
            </div>
          ),
          a: ({ href, children, ...props }) => (
            <a
              {...props}
              href={href}
              {...(href?.startsWith("https://")
                ? { rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          ),
        }}
      />
    </div>
  );
}

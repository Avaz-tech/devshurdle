import { urlForImage } from "@sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import HighlightCode from "./HighlightCode";

export const RichText = {
  //================================================================================================================

  types: {
    image: ({ value }: any) => {
      // Extract dimensions from Sanity image asset reference to maintain aspect ratio
      const id = value.asset?._ref || value.asset?._id;
      const dimensions = id?.split("-")[2]?.split("x").map(Number);
      const width = dimensions?.[0] || 1200;
      const height = dimensions?.[1] || 800;

      return (
        <figure className="my-6">
          <div className="rounded-xl overflow-hidden shadow-md border border-border">
            <Image
              src={urlForImage(value).url()}
              alt={value.alt || "Post image"}
              width={width}
              height={height}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority={false}
            />
          </div>
          {value.alt && (
            <figcaption className="mt-2 text-xs text-center text-muted-foreground italic">{value.alt}</figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: any) => {
      return (
        // CHANGED: Reduced my-6 to my-4 (Tighter spacing around code blocks)
        <div className="my-4">
          <HighlightCode content={value.code} language={value.language || "javascript"} />
        </div>
      );
    },
  },
  //================================================================================================================

  list: {
    bullet: ({ children }: any) => (
      <ul className="pl-5 my-3 space-y-1 text-foreground list-disc marker:text-mainColor">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="pl-5 my-3 space-y-1 text-foreground list-decimal marker:text-mainColor">{children}</ol>
    ),
  },
  //================================================================================================================

  listItem: {
    // CHANGED: leading-7 to leading-normal (Slightly tighter line height for lists)
    bullet: ({ children }: any) => <li className="text-base leading-normal pl-1">{children}</li>,
    number: ({ children }: any) => <li className="text-base leading-normal pl-1">{children}</li>,
  },
  //================================================================================================================

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-10 mb-5 leading-tight tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 leading-tight tracking-tight border-l-4 border-l-mainColor pl-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-foreground mt-8 mb-3 leading-tight tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-bold text-foreground mt-4 mb-2 leading-tight">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-l-mainColor bg-mainColor/5 pl-4 py-3 pr-3 my-4 rounded-r-lg italic text-foreground/90 text-base">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-base leading-relaxed text-foreground/90 mb-4 last:mb-0">{children}</p>
    ),
  },
  //================================================================================================================

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href?.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          target={!value.href?.startsWith("/") ? "_blank" : undefined}
          className="text-mainColor hover:text-mainColor/80 font-medium underline decoration-mainColor/30 hover:decoration-mainColor/60 transition-all duration-200"
        >
          {children}
        </Link>
      );
    },
    em: ({ children }: any) => <em className="italic text-foreground">{children}</em>,
    strong: ({ children }: any) => <strong className="font-bold text-foreground">{children}</strong>,
    code: ({ children }: any) => {
      return (
        <code className="bg-mainColor/10 text-mainColor font-medium px-1.5 py-0.5 rounded text-sm font-mono inline-block border border-mainColor/20">
          {children}
        </code>
      );
    },
  },
};

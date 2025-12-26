import { urlForImage } from "@sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import HighlightCode from "./HighlightCode";

export const RichText = {
  //================================================================================================================

  types: {
    image: ({ value }: any) => {
      return (
        <figure className="my-10 -mx-4 md:mx-0">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || "Post image"}
            width={1200}
            height={600}
            priority={false}
            className="w-full h-auto rounded-xl shadow-lg object-cover border border-border"
          />
          {value.alt && (
            <figcaption className="mt-3 text-sm text-center text-muted-foreground italic">{value.alt}</figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: any) => {
      return (
        <div className="my-6">
          <HighlightCode content={value.code} language={value.language || "javascript"} />
        </div>
      );
    },
  },
  //================================================================================================================

  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-6 my-6 space-y-3 text-foreground list-disc marker:text-mainColor">{children}</ul>
    ),
  },
  //================================================================================================================

  listItem: {
    bullet: ({ children }: any) => <li className="text-base leading-relaxed">{children}</li>,
  },
  //================================================================================================================

  number: {
    bullet: ({ children }: any) => (
      <ol className="ml-6 my-6 space-y-3 text-foreground list-decimal marker:text-mainColor">{children}</ol>
    ),
  },
  //================================================================================================================

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-12 mb-6 leading-tight tracking-tight">
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
      <h4 className="text-lg md:text-xl font-bold text-foreground mt-6 mb-3 leading-tight">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-l-mainColor bg-mainColor/5 pl-6 py-4 pr-4 my-8 rounded-r-lg italic text-foreground/90 text-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-base md:text-lg leading-relaxed text-foreground my-5">{children}</p>
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
          className="text-mainColor hover:text-mainColor/80 font-semibold underline decoration-mainColor/30 hover:decoration-mainColor/60 transition-all duration-200"
        >
          {children}
        </Link>
      );
    },
    em: ({ children }: any) => <em className="italic text-foreground">{children}</em>,
    strong: ({ children }: any) => <strong className="font-bold text-foreground">{children}</strong>,
    code: ({ children }: any) => {
      return (
        <code className="bg-mainColor/15 text-mainColor font-semibold px-2.5 py-1 rounded-md text-sm font-mono inline-block">
          {children}
        </code>
      );
    },
  },
  //================================================================================================================
};

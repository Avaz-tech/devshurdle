import { urlForImage } from "@sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import HighlightCode from "./HighlightCode";

export const RichText = {
  //================================================================================================================

  types: {
    image: ({ value }: any) => {
      return (
        <div className="flex justify-start items-center">
          <Image
            src={urlForImage(value).url()}
            alt="Post image"
            width={700}
            height={700}
            priority={true}
            className="object-contain py-2"
          />
        </div>
      );
    },
    code: ({ value }: any) => {
      return <HighlightCode content={value.code} language={value.language && value.language} />;
    },
  },
  //================================================================================================================

  list: {
    bullet: ({ children }: any) => <ul className="ml-4 py-2 list-disc space-y-3">{children}</ul>,
  },
  //================================================================================================================

  number: {
    bullet: ({ children }: any) => <ol className="mt-lg list-decimal">{children}</ol>,
  },
  //================================================================================================================

  block: {
    h1: ({ children }: any) => <h1 className="text-4xl pt-8 pb-4 font-bold">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl pt-6 pb-2 font-bold">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl pt-4 font-bold">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl pt-2 font-bold">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-mainColor border-l-4 pl-5 py-5 my-5 text-base ">{children}</blockquote>
    ),
    normal: ({ children }: any) => <p className="py-[3px]">{children}</p>,
  },
  //================================================================================================================

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link href={value.href} rel={rel} className="underline">
          {children}
        </Link>
      );
    },
    code: ({ children }: any) => {
      return (
        <code className="bg-[var(--code-bg)] border border-[var(--code-border)] text-[var(--code-text)] text-sm px-0.5 py-[1px] rounded">
          {children}
        </code>
      );
    },
  },
  //================================================================================================================
};

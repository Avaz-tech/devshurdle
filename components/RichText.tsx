import { urlForImage } from "@sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import HighlightCode from "./HighlightCode";

export const RichText = {
  //================================================================================================================

  types: {
    image: ({ value }: any) => {
      return (
        <div className="flex justify-center items-center">
          <Image
            src={urlForImage(value).url()}
            alt="Post image"
            width={700}
            height={700}
            priority={true}
            className="object-contain p-6"
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
    bullet: ({ children }: any) => (
      <ul className="ml-10 py-5 list-disc space-y-5 leading-[1.7em] text-[#6B6B6B]">{children}</ul>
    ),
  },
  //================================================================================================================

  number: {
    bullet: ({ children }: any) => <ol className="mt-lg list-decimal">{children}</ol>,
  },
  //================================================================================================================

  block: {
    h1: ({ children }: any) => <h1 className="text-4xl py-8 font-bold">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl py-6 font-bold">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl py-4 font-bold">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl py-2 font-bold">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-mainColor border-l-4 pl-5 py-5 my-5 text-base leading-[1.7em] text-[#6B6B6B]">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="py-[3px] leading-[1.7em] text-[#6B6B6B]">{children}</p>,
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
  },
  //================================================================================================================
};

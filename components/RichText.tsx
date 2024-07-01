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
          <Image src={urlForImage(value).url()} alt="Post image" width={700} height={700} priority={true} className="object-contain p-6" />
        </div>
      );
    },
    code: ({value }: any) => {
      return (
       <pre className="rounded-md my-4 overflow-hidden"><code className="rounded-md overflow-auto">
        <HighlightCode content={value.code} /></code></pre>
         
      );
    },
  },
  //================================================================================================================

  list: {
    bullet: ({ children }: any) => <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>,
  },
  //================================================================================================================

  number: {
    bullet: ({ children }: any) => <ol className="mt-lg list-decimal">{children}</ol>,
  },
  //================================================================================================================

  block: {
    h1: ({ children }: any) => <h1 className="text-4xl py-10 font-bold">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl py-10 font-bold">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl py-10 font-bold">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl py-10 font-bold">{children}</h4>,
    blockquote: ({ children }: any) => <blockquote className="border-l-blue-600 border-l-4 pl-5 py-5 my-5">{children}</blockquote>,
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

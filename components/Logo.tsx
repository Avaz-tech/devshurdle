import Link from "next/link";
// import Image from "next/image";
// import logo from "@/images/brandIcon.png";

import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: "../fonts/meedori_bold.ttf" });

interface Props {
  title?: string;
  className?: string;
}

const Logo = ({ title, className }: Props) => {
  return (
    <div>
      <Link className="flex items-center justify-between gap-3" href={"/"}>
        {/* <Image
          src={logo}
          alt="banner image"
          className="w-full max-h-[50px] object-contain"
        /> */}
        <h1 className={`${myFont.className} text-3xl brand-name text-mainColor tracking-[-5px]`}>DH.</h1>

        {/* <h1 className={`text-3xl font-extrabold ${className}`}>
          {title || "DevsHurdle"}
        </h1> */}
      </Link>
    </div>
  );
};

export default Logo;

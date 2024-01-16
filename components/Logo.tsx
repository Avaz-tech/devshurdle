import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo-no-background.svg";
interface Props {
  title?: string;
  className?: string;
}

const Logo = ({ title, className }: Props) => {
  return (
    <div>
      <Link href={"/"}>
        <Image
          src={logo}
          alt="banner image"
          className="w-full max-h-[40px] object-contain"
        />
        {/* <h1 className={`text-3xl font-extrabold ${className}`}>
          {title || "DevsHurdle"}
        </h1> */}
      </Link>
    </div>
  );
};

export default Logo;

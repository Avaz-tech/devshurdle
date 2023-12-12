import Link from "next/link";


interface Props {
  title?: string;
  className?: string;
}

const Logo = ({ title, className }: Props) => {
  return (
    <div>
      <Link href={"/"}>
        <h1 className={`text-3xl font-extrabold uppercase ${className}`}>
          {title || "Blogger"}
        </h1>
      </Link>
    </div>
  );
};

export default Logo;

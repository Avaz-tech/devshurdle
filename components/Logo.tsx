import Link from "next/link";

interface Props {
  title?: string;
  className?: string;
}

const Logo = ({ title, className }: Props) => {
  return (
    <div>
      <Link href={"/"}>
        <h1 className={`text-3xl font-extrabold ${className}`}>
          {title || "DevsHurdle"}
        </h1>
      </Link>
    </div>
  );
};

export default Logo;

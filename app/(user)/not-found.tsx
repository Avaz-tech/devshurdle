import ComingSoon from "@components/ComingSoon";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | DevsHurdle",
  description: "The page you're looking for doesn't exist",
};

export default function NotFound() {
  return (
    <ComingSoon
      title="404 - Page Not Found"
      description="Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. Don&apos;t worry, we&apos;ve got plenty of coding solutions waiting for you!"
      backButtonText="Go Back Home"
      backButtonHref="/"
    />
  );
}


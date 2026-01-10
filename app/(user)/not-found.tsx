import ComingSoon from "@components/ComingSoon";

export const metadata = {
  title: "404 - Page Not Found | DevsHurdle",
  description: "The page you're looking for doesn't exist",
};

export default function NotFound() {
  return (
    <ComingSoon
      title="404 - Page Not Found"
      description="Oops! The page you're looking for doesn't exist or has been moved. Don't worry, we've got plenty of coding solutions waiting for you!"
      backButtonText="Go Back Home"
      backButtonHref="/"
    />
  );
}

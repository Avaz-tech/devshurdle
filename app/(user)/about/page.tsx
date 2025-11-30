import ComingSoon from "@components/ComingSoon";

export const metadata = {
  title: "About - DevsHurdle",
  description: "Learn more about DevsHurdle and our mission",
};

export default function AboutPage() {
  return (
    <ComingSoon
      title="About Page Coming Soon"
      description="Learn more about the story behind DevsHurdle, our mission to help developers overcome coding challenges, and the journey we&apos;re on together."
      backButtonText="Back to Home"
      backButtonHref="/"
    />
  );
}


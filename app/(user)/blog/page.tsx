import ComingSoon from "@components/ComingSoon";

export const metadata = {
  title: "Blog - DevsHurdle",
  description: "Browse all our coding solutions and tutorials",
};

export default function BlogPage() {
  return (
    <ComingSoon
      title="Blog Coming Soon"
      description="We&apos;re curating the best coding solutions and tutorials for you. The blog section will feature categorized posts, search functionality, and much more!"
      backButtonText="Back to Home"
      backButtonHref="/"
    />
  );
}


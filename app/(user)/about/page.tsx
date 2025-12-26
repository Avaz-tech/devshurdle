import Container from "@components/Container";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Breadcrumb from "@components/Breadcrumb";

export const metadata = {
  title: "About - DevsHurdle",
  description: "Learn more about DevsHurdle and our mission",
};

export default function AboutPage() {
  const features = [
    {
      icon: "⚡",
      title: "Quick Solutions",
      description:
        "Find practical coding solutions in seconds, not hours. Each solution is battle-tested and ready to use.",
    },
    {
      icon: "🎯",
      title: "Real-World Problems",
      description:
        "Solutions built from actual development challenges, not theoretical examples. Relevant to your projects.",
    },
    {
      icon: "📚",
      title: "Well-Documented",
      description: "Clear explanations and code examples for every solution. Easy to understand and implement.",
    },
    {
      icon: "🔄",
      title: "Always Updated",
      description: "New solutions added regularly as new challenges emerge. Stay ahead with the latest practices.",
    },
  ];

  const stats = [
    { number: "100+", label: "Solutions" },
    { number: "10+", label: "Technologies" },
    { number: "1000+", label: "Happy Developers" },
    { number: "365", label: "Days of Updates" },
  ];

  return (
    <main className="flex justify-center items-center flex-col pt-24">
      {/* Breadcrumb Navigation */}
      <Container className="mx-auto mb-6 px-4">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </Container>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-mainColor/15 to-transparent pb-16 px-4">
        <Container className="mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">About DevsHurdle</h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A developer-first platform dedicated to solving real coding challenges with practical, tested solutions.
            </p>
          </div>
        </Container>
      </section>

      {/* Story Section */}
      <section className="w-full py-20 px-4">
        <Container className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">The Story</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                I&apos;m a developer who has spent countless hours debugging the same issues, searching through multiple
                Stack Overflow threads, and reinventing the wheel for problems I&apos;ve already solved before.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                DevsHurdle was born from frustration. The frustration of losing time on repetitive problems, the
                frustration of fragmented solutions scattered across the internet, and the frustration of not having a
                centralized place to store and share battle-tested fixes.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                So I created DevsHurdle—a personal collection of practical, project-specific solutions to coding
                problems. A place where every solution is tested, documented, and ready to use. Because your time is too
                valuable to waste on problems you&apos;ve already solved.
              </p>
            </div>
            <div className="bg-gradient-to-br from-mainColor/20 to-mainColor/5 rounded-lg p-8 border border-mainColor/20 h-full flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <p className="text-4xl font-bold text-mainColor mb-2">3+</p>
                  <p className="text-foreground font-semibold">Years in Development</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-mainColor mb-2">500+</p>
                  <p className="text-foreground font-semibold">Problems Solved</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-mainColor mb-2">24/7</p>
                  <p className="text-foreground font-semibold">Available for All</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="w-full py-20 px-4 bg-card/50 border-y border-border">
        <Container className="mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              To empower developers worldwide by providing practical, battle-tested solutions to common coding
              challenges. We believe that developers shouldn&apos;t waste time re-solving problems they&apos;ve already
              tackled. DevsHurdle is here to save you time, reduce frustration, and help you ship better code faster.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 bg-background rounded-lg border border-border hover:border-mainColor/50 transition-all"
                >
                  <p className="text-4xl font-bold text-mainColor mb-2">{stat.number}</p>
                  <p className="text-foreground font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-4">
        <Container className="mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why DevsHurdle?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-card rounded-lg border border-border hover:border-mainColor/50 hover:bg-mainColor/5 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision Section */}
      <section className="w-full py-20 px-4 bg-gradient-to-r from-mainColor/10 to-mainColor/5 border-y border-border">
        <Container className="mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">The Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              We envision a future where every developer has access to a comprehensive library of solutions. A
              community-driven platform where developers help each other solve problems faster, collaborate on
              solutions, and collectively reduce wasted time across the industry.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Every solution here is a small victory against repetitive work. Together, we&apos;re building a more
              efficient, collaborative development community.
            </p>
          </div>
        </Container>
      </section>

      {/* Connect Section */}
      <section className="w-full py-20 px-4">
        <Container className="mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Let&apos;s Connect</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Have feedback, suggestions, or want to contribute? I&apos;d love to hear from you. Connect with me on
              social media or send an email.
            </p>
            <div className="flex justify-center gap-6 flex-wrap mb-12">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200 text-foreground font-semibold group"
              >
                <FaTwitter className="group-hover:text-mainColor transition-colors" />
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200 text-foreground font-semibold group"
              >
                <FaGithub className="group-hover:text-mainColor transition-colors" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-lg hover:border-mainColor hover:bg-mainColor/5 transition-all duration-200 text-foreground font-semibold group"
              >
                <FaLinkedin className="group-hover:text-mainColor transition-colors" />
                LinkedIn
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-mainColor hover:bg-mainColor/90 text-white rounded-lg transition-all duration-200 font-semibold"
              >
                <FaEnvelope />
                Contact
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-4 bg-gradient-to-r from-mainColor to-mainColor/80 text-white">
        <Container className="mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Solve Your Challenges?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Browse our collection of solutions and start shipping faster today.
            </p>
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-white hover:bg-white/90 text-mainColor font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Explore Solutions
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

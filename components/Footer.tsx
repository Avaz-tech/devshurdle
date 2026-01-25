import React from "react";
import Section from "./Section";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";

// Footer links - focused on DevsHurdle content
const links = [
  {
    title: "Navigation",
    items: [
      { text: "Home", href: "/" },
      { text: "Blog", href: "/blog" },
      { text: "About", href: "/about" },
      { text: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Categories",
    items: [
      { text: "JavaScript", href: "/blog?category=javascript" },
      { text: "React", href: "/blog?category=react" },
      { text: "Node.js", href: "/blog?category=nodejs" },
      { text: "TypeScript", href: "/blog?category=typescript" },
      { text: "Python", href: "/blog?category=python" },
    ],
  },
  {
    title: "Resources",
    items: [
      { text: "All Solutions", href: "/blog" },
      { text: "Latest Posts", href: "/blog" },
      { text: "Search", href: "/#search-section" },
      { text: "Newsletter", href: "/#newsletter" },
    ],
  },
];

// social links
const socialLinks = [
  { href: "https://github.com/Avaz-tech", icon: <BsGithub />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/avazbek-uchqunovich/", icon: <BsLinkedin />, label: "LinkedIn" },
  { href: "mailto:contact@devshurdle.com", icon: <FaEnvelope />, label: "Email" },
];

const Footer = () => {
  return (
    <Section as="footer" className="bg-card border-t border-border mt-20" size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-mainColor rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-foreground">DevsHurdle</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Conquer coding challenges with practical solutions, tutorials, and insights for developers.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="w-10 h-10 bg-muted hover:bg-mainColor text-muted-foreground hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {links.map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex flex-col gap-3">
              <h6 className="font-semibold text-foreground mb-2">{section.title}</h6>
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className="text-muted-foreground hover:text-mainColor transition-colors duration-200 text-sm"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevsHurdle. Built with ❤️ for developers.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-mainColor transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-mainColor transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-mainColor transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </Section>
  );
};

export default Footer;

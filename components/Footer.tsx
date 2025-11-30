import React from "react";
import Container from "./Container";
import Link from "next/link";
import { BsYoutube, BsGithub, BsLinkedin } from "react-icons/bs";
import { BiLogoFacebook } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";

// Footer links
const links = [
  {
    title: "Use Cases",
    items: [
      { text: "UX Design", href: "https://maze.co/collections/ux-ui-design/tools/" },
      { text: "Wireframing", href: "https://careerfoundry.com/en/blog/ux-design/free-wireframing-tools/" },
      { text: "Diagramming", href: "https://www.lucidchart.com" },
      { text: "Brainstorming", href: "https://miro.com" },
      {
        text: "Team Collaboration",
        href: "https://designlab.com/blog/top-online-collaboration-tools-for-remote-ux-work",
      },
    ],
  },
  {
    title: "Explore",
    items: [
      { text: "Frontend Development", href: "https://www.geeksforgeeks.org/best-front-end-development-courses/" },
      { text: "Backend Development", href: "https://roadmap.sh/frontend/vs-backend-ai" },
      {
        text: "Machine Learning",
        href: "https://www.reddit.com/r/learnmachinelearning/comments/16kv840/best_resource_to_learn_ml_for_a_backend_developer/",
      },
      { text: "Designing", href: "https://detachless.com/blog/design-collaboration-tools-teams" },
      {
        text: "AI Development",
        href: "https://medium.com/design-bootcamp/scope-of-ai-in-front-end-development-a-beginners-guide-to-getting-started-3e44ba90e7bc",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        text: "Learning Materials",
        href: "https://www.coursera.org/courses?productDifficultyLevel=Advanced&query=front+end+development",
      },
      {
        text: "Documentations",
        href: "https://cloudinary.com/guides/front-end-development/front-end-development-the-complete-guide",
      },
      { text: "Free Courses", href: "https://www.youtube.com/watch?v=5yBTxOpT4PE" },
      {
        text: "Paid Courses",
        href: "https://www.coursera.org/courses?productDifficultyLevel=Advanced&query=front+end+development",
      },
      {
        text: "Articles",
        href: "https://medium.com/design-bootcamp/scope-of-ai-in-front-end-development-a-beginners-guide-to-getting-started-3e44ba90e7bc",
      },
    ],
  },
  // New links section
  {
    title: "About",
    items: [
      {
        text: "AI for Development",
        href: "https://www.forbes.com/sites/forbestechcouncil/2023/05/23/the-impact-of-ai-on-software-development/",
      },
      { text: "AI and Machine Learning", href: "https://www.ibm.com/blogs/9-predictions-for-ai-in-2024/" },
      { text: "AI Research Papers", href: "https://arxiv.org/" },
      { text: "AI Tools and Frameworks", href: "https://www.aimultiple.com/ai-tools/" },
      { text: "AI in Web Development", href: "https://www.turing.com/blog/how-ai-is-transforming-web-development/" },
    ],
  },
];
// social links
const socialLinks = [
  { href: "https://www.youtube.com/@devshurdle", icon: <BsYoutube /> },
  { href: "https://github.com/Avaz-tech", icon: <BsGithub /> },
  { href: "https://www.linkedin.com/in/avazbek-uchqunovich/", icon: <FaLinkedinIn /> },
  { href: "https://www.facebook.com/uchqunovich/", icon: <BiLogoFacebook /> },
];

const Footer = () => {
  return (
    <Container className="py-10 flex flex-col gap-20 items-center justify-between max-w-full mx-4 xl:mx-auto border-t ">
      <div className="w-full grid grid-cols-1 items-center content-between gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* other related links */}
        {links.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-2">
            <h6 className="font-semibold mb-3 text-foreground">{section.title}</h6>
            {section.items.map((item, itemIndex) => (
              <Link key={itemIndex} href={item.href} className="hover:text-mainColor duration-200 text-muted-foreground">
                {item.text}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row  justify-between w-full gap-10 border-t py-5">
        {/* social links */}
        <div className="text-foreground inline-flex flex-row items-center gap-7">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href} className="p-3 bg-secondary rounded-full duration-200 hover:bg-mainColor text-secondary-foreground">
              {link.icon}
            </Link>
          ))}
        </div>

        <p className="text-md text-muted-foreground">
          © All rights reserved
          <Link
            href="https://avaz-new-portfolio.vercel.app/"
            className="hover:text-mainColor font-semibold duration-200"
          >
            @devshurdle
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Footer;

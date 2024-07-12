import React from "react";
import Container from "./Container";
import Link from "next/link";
import { BsYoutube } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <Container className="p-10 flex flex-col gap-20 items-center justify-between max-w-full mx-4 lg:mx-auto border-t ">
        <div className="w-full grid grid-cols-1 items-center content-between gap-5 md:grid-cols-2 lg:grid-cols-4 ">
          <div className="text-black hidden md:inline-flex flex-col items-center gap-7">
            <Link href={"https://www.youtube.com/@devshurdle"}>
              <BsYoutube className="text-2xl hover:text-red-500 duration-200" />
            </Link>
            <Link href={"https://github.com/Avaz-tech"}>
              <BsGithub className="text-2xl hover:text-gray-500 duration-200" />
            </Link>
            <Link href={"https://www.linkedin.com/in/avazbek-uchqunovich/"}>
              <BsLinkedin className="text-2xl hover:text-cyan-600 duration-200" />
            </Link>
            <Link href={"https://www.facebook.com/uchqunovich/"}>
              <BsFacebook className="text-2xl hover:text-blue-500 duration-200" />
            </Link>
          </div>

          {/*  -------- */}
          <div className="flex flex-col gap-2">
            <h6 className="font-semibold mb-3">Use Cases</h6>
            <Link href="/ux-design">Ux Design</Link>
            <Link href="/wireframing">Wireframing</Link>
            <Link href="/diagramming">Diagramming</Link>
            <Link href="/brainstorming">Brainstorming</Link>
            <Link href="/team-collaboration">Team Collaboration</Link>
          </div>
          {/*  -------- */}
          <div className="flex flex-col gap-2">
            <h6 className="font-semibold mb-3">Explore</h6>
            <Link href="/frontend-development">Frontend Development</Link>
            <Link href="/backend-development">Backend Development</Link>
            <Link href="/machine-learning">Machine Learning</Link>
            <Link href="/designing">Designing</Link>
            <Link href="/ai-development">AI Development</Link>
          </div>
          {/*  -------- */}
          <div className="flex flex-col gap-2">
            <h6 className="font-semibold mb-3">Resources</h6>
            <Link href="/learning-materials">Learning Materials</Link>
            <Link href="/documentations">Documentations</Link>
            <Link href="/free-courses">Free Courses</Link>
            <Link href="/paid-courses">Paid Courses</Link>
            <Link href="/articles">Articles</Link>
          </div>
          {/*  -------- */}
        </div>

        <p className="text-sm text-gray-700">
          © All rights reserved
          <Link href={"https://avaz-new-portfolio.vercel.app/"} className="hover:text-white font-semibold duration-200">
            @devshurdle
          </Link>
        </p>
      </Container>
    </>
  );
};

export default Footer;

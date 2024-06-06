import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";
import { BsYoutube } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <Container className="p-10 text-gray-100 flex flex-col gap-4 items-center justify-between max-w-full">
        {/* <Logo title="Bloggers" className="text-white" /> */}
        <div></div>
        <div className="text-gray-300 hidden md:inline-flex items-center gap-7">
          <Link href={"https://www.youtube.com/channel/UCOaXidGX7-BzHwsZFJZ1oqg"}>
            <BsYoutube className="text-2xl hover:text-red-500 duration-200" />
          </Link>
          <Link href={"https://avaz-tech.github.io/my-portfolio/"}>
            <BsGithub className="text-2xl hover:text-gray-500 duration-200" />
          </Link>
          <Link href={"https://www.linkedin.com/in/avazbek-ravshanov-ben96/"}>
            <BsLinkedin className="text-2xl hover:text-cyan-600 duration-200" />
          </Link>
          <Link href={"https://www.facebook.com/avazbek.ravshanov.9"}>
            <BsFacebook className="text-2xl hover:text-blue-500 duration-200" />
          </Link>
        </div>
        <p className="text-sm text-gray-300">
          © All rights reserved
          <Link href={"https://avaz-tech.github.io/my-portfolio/"} className="hover:text-white font-semibold duration-200">
            @devshurdle
          </Link>
        </p>
      </Container>
    </>
  );
};

export default Footer;

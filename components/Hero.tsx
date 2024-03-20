import Image from "next/image";
import banner from "@/images/banner.jpg";
import logo from "@/images/logo-no-background.svg";
import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: "../fonts/meedori_regular.ttf" });

const Hero = () => {
  return (
    <div className="w-full max-h-screen relative">
      <div className="h-[90vh] bg-mainBgColor"></div>
      {/* <div></div> */}
      {/* <Image
        src={banner}
        alt="banner image"
        className="w-full max-h-screen object-contain "
      /> */}
      <div className="absolute top-0 w-full h-full  text-gray-100 flex flex-col items-center justify-center">
        <h2 className={`${myFont.className} flex items-center text-center  text-7xl lg:text-[150px] font-bold text-mainColor`}>
          {/* <Image
            src={logo}
            alt="logo"
            className="w-full max-h-[170px] object-contain"
          /> */}
          {/* Fi */}***
          <span className="text-gray-500">#</span>
          {/* ABug */}****
        </h2>
        {/* <p className="text-xl md:text-xl lg:text-5xl font-semibold text-[#f9006b]">
          Where Obstacles Meet Solutions
        </p> */}
      </div>
    </div>
  );
};

export default Hero;

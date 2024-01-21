import Image from "next/image";
import banner from "@/images/banner.jpg";
import logo from "@/images/logo-no-background.svg";

const Hero = () => {
  return (
    <div className="w-full max-h-screen relative">
      <div className="h-[90vh] bg-[#1D366F]">

      </div>
      {/* <Image
        src={banner}
        alt="banner image"
        className="w-full max-h-screen object-contain"
      /> */}
      <div className="absolute top-0 w-full h-full  text-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-7xl lg:text-[150px] font-bold text-[#66b839]">
          {/* <Image
            src={logo}
            alt="logo"
            className="w-full max-h-[170px] object-contain"
          /> */}
        </h2>
        {/* <p className="text-xl md:text-2xl lg:text-5xl font-semibold text-[#f9006b]">
          Where Obstacles Meet Solutions
        </p> */}
      </div>
    </div>
  );
};

export default Hero;

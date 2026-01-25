import Link from "next/link";
import Section from "./Section";

const Hero: React.FC = () => {
  return (
    <Section className="bg-gradient-to-r from-mainColor to-gray-900 text-white min-h-[60vh] flex items-center" containerClassName="text-center">
      <h1 className={`text-4xl md:text-6xl font-bold mb-4 tracking-tight`}>DevsHurdle: Conquer Coding Challenges</h1>
      <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
        Stop wasting time re-solving bugs and errors. DevsHurdle is your personal hub for practical, project-specific
        coding solutions. Find, save, and share fixes faster than ever.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/blog"
          className="bg-mainColor hover:bg-[#19a264c6] text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Browse Solutions
        </Link>
      </div>
    </Section>
  );
};

export default Hero;

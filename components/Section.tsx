import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string; // Classes for the outer wrapper (section/article/etc)
  containerClassName?: string; // Classes for the inner content container
  as?: React.ElementType; // The semantic HTML tag to use (default: "section")
  id?: string; // Optional ID for anchor links
  noPadding?: boolean; // If true, removes vertical padding
  size?: "sm" | "md" | "lg" | "xl" | "full"; // Controls the inner container width
}

const Section = ({
  children,
  className = "",
  containerClassName = "",
  as: Component = "section",
  id,
  noPadding = false,
  size = "xl",
}: SectionProps) => {
  const maxWidths = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
  };

  return (
    <Component
      id={id}
      className={`w-full ${noPadding ? "" : "py-4 md:py-6"} px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className={`${maxWidths[size]} mx-auto ${containerClassName}`}>
        {children}
      </div>
    </Component>
  );
};

export default Section;

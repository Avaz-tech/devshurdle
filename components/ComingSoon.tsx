"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { LuSparkles } from "react-icons/lu";
import { FiArrowLeft } from "react-icons/fi";

interface ComingSoonProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  description = "We&apos;re working hard to bring you something amazing. This page will be available soon!",
  showBackButton = true,
  backButtonText = "Go Back Home",
  backButtonHref = "/",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 pt-20">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Icon/Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary to-primary/60 p-6 rounded-full">
              <LuSparkles className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-sm text-muted-foreground">We&apos;re building something great</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {showBackButton && (
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={backButtonHref} className="flex items-center gap-2">
                <FiArrowLeft className="w-5 h-5" />
                {backButtonText}
              </Link>
            </Button>
          )}
          <Button asChild size="lg" className="w-full sm:w-auto bg-mainColor hover:bg-[#19a264c6]">
            <Link href="/" className="flex items-center gap-2">
              Browse Solutions
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;


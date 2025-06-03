"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function ProfileHeader() {
  const { profile } = useProfile();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(
    0
  )}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 py-4",
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container px-4 mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Roster
          </Link>
          {scrolled && (
            <div className="hidden md:flex items-center">
              <span className="px-2 text-muted-foreground">/</span>
              <span className="font-medium">
                {profile.firstName} {profile.lastName}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 border-2 border-blue-500/20">
              <AvatarImage
                src={profile.avatarUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="object-cover"
              />
              <AvatarFallback className="font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            {scrolled && (
              <span className="text-sm font-medium md:hidden">
                {profile.firstName}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

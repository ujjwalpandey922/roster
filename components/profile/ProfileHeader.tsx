"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container px-4 mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="font-semibold text-xl">Roster</div>
          {scrolled && (
            <div className="hidden md:flex items-center">
              <span className="px-2 text-muted-foreground">/</span>
              <span className="font-medium">{profile.firstName} {profile.lastName}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {scrolled ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.avatarUrl} alt={`${profile.firstName} ${profile.lastName}`} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium md:hidden">{profile.firstName}</span>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              app.joinroster.co/{profile.username}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
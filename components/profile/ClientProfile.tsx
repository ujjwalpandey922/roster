"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Check } from "lucide-react";
import EditableBasicInfo from "@/components/profile/EditableBasicInfo";
import EmployerSection from "@/components/profile/EmployerSection";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useProfile } from "@/contexts/ProfileContext";
import PortfolioGrid from "./PersonalPortfolio";
import ProfileFooter from "./ProfileFooter";

export default function ClientProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { profile } = useProfile();
  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />

      <main className="container px-4 py-8 mx-auto max-w-4xl space-y-12">
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            {isEditing ? (
              <>
                <Check className="h-4 w-4" />
                Done Editing
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <EditableBasicInfo isEditing={isEditing} />

        {((profile.portfolioItems?.length ?? 0) > 0 || isEditing) && (
          <PortfolioGrid isEditing={isEditing} />
        )}

        {(profile.employers.length > 0 || isEditing) && (
          <EmployerSection isEditing={isEditing} />
        )}
      </main>
      <ProfileFooter />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Check } from "lucide-react";
import EditableBasicInfo from "@/components/profile/EditableBasicInfo";
import EmployerSection from "@/components/profile/EmployerSection";
import ProfileHeader from "@/components/profile/ProfileHeader";

export default function ClientProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />

      <main className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
            className="gap-2"
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

        <EmployerSection isEditing={isEditing} />
      </main>
    </div>
  );
}

"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { updateProfileData } from "@/lib/mock-data";
import { Profile } from "@/lib/types";

type EditableBasicInfoProps = {
  isEditing: boolean;
};

export default function EditableBasicInfo({
  isEditing,
}: EditableBasicInfoProps) {
  const { profile, updateBasicInfo } = useProfile();
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    summary: profile.summary,
    avatarUrl: profile.avatarUrl,
  });
  // Calculate if there are changes
  const hasChanges = useMemo(() => {
    return (
      editedInfo.firstName !== profile.firstName ||
      editedInfo.lastName !== profile.lastName ||
      editedInfo.summary !== profile.summary ||
      editedInfo.avatarUrl !== profile.avatarUrl
    );
  }, [editedInfo, profile]);

  // Validate required fields
  const isValid = useMemo(() => {
    return (
      editedInfo.firstName.trim().length > 0 &&
      editedInfo.lastName.trim().length > 0 &&
      editedInfo.summary.trim().length > 0
    );
  }, [editedInfo]);
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({ ...prev, [name]: value }));
  };
  // Handle save
  const handleSave = async () => {
    setIsEditingSummary(true);
    try {
      updateBasicInfo(editedInfo);
      await updateProfileData(editedInfo as Profile);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsEditingSummary(false);
    }
  };
  // Calculate initials for avatar
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(
    0
  )}`;

  if (isEditing) {
    return (
      <div className="bg-card rounded-xl p-6 mb-8 border animate-in fade-in-50 duration-300">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative group">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={editedInfo.avatarUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
              />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Pencil className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-muted-foreground"
                >
                  First Name *
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={editedInfo.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Last Name *
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={editedInfo.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="summary"
                className="text-sm font-medium text-muted-foreground"
              >
                Professional Summary *
              </label>
              <Textarea
                id="summary"
                name="summary"
                value={editedInfo.summary}
                onChange={handleChange}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="avatarUrl"
                className="text-sm font-medium text-muted-foreground"
              >
                Profile Image URL
              </label>
              <Input
                id="avatarUrl"
                name="avatarUrl"
                value={editedInfo.avatarUrl}
                onChange={handleChange}
                placeholder="https://example.com/profile-image.jpg"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={!hasChanges || !isValid || isEditingSummary}
            >
              {isEditingSummary ? "Saving..." : "Save Basic Info"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 mb-8 border">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={profile.avatarUrl}
            alt={`${profile.firstName} ${profile.lastName}`}
          />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            {profile.firstName} {profile.lastName}
          </h1>

          <p className="text-muted-foreground mb-6 max-w-2xl">
            {profile.summary}
          </p>

          <div className="flex flex-wrap gap-3">
            {profile.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

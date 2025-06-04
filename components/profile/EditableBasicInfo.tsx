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
      <div className="bg-card rounded-xl p-6 mb-8 border border-border shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <Avatar className="h-24 w-24 relative">
              <AvatarImage
                src={editedInfo.avatarUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {initials}
              </AvatarFallback>
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
                  className="border-border focus:border-blue-500"
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
                  className="border-border focus:border-blue-500"
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
                className="resize-none border-border focus:border-blue-500"
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
                className="border-border focus:border-blue-500"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={!hasChanges || !isValid || isEditingSummary}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              {isEditingSummary ? "Saving..." : "Save Basic Info"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 mb-8 border border-border shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 border-2 border-blue-500/20">
          <AvatarImage
            src={profile.avatarUrl}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            {profile.firstName} {profile.lastName}
          </h1>

          <p className="text-muted-foreground mb-6 max-w-2xl text-lg leading-relaxed">
            {profile.summary || "No summary available."}
          </p>

          <div className="flex flex-wrap gap-3">
            {profile.skills.length > 0
              ? profile.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:text-blue-200 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { Employer, EmploymentType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import VideoGallery from "@/components/profile/VideoGallery";
import { format } from "date-fns";
import { updateEmployerData } from "@/lib/mock-data";
import { useProfile } from "@/contexts/ProfileContext";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
type EmployerCardProps = {
  employer: Employer;
  isEditing: boolean;
  onUpdate: (employer: Employer) => void;
  onRemove: () => Promise<void>;
  isRemovingEmployerLoading: boolean;
};

export default function EmployerCard({
  employer,
  isEditing,
  onUpdate,
  onRemove,
  isRemovingEmployerLoading,
}: EmployerCardProps) {
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [isEditingCardLoading, setIsEditingCardLoading] = useState(false);
  const [editedEmployer, setEditedEmployer] = useState(employer);
  const { profile } = useProfile();

  // Calculate if there are changes
  const hasChanges = useMemo(() => {
    return (
      editedEmployer.companyName !== employer.companyName ||
      editedEmployer.jobTitle !== employer.jobTitle ||
      editedEmployer.startDate !== employer.startDate ||
      editedEmployer.endDate !== employer.endDate ||
      editedEmployer.employmentType !== employer.employmentType ||
      editedEmployer.contribution !== employer.contribution ||
      JSON.stringify(editedEmployer.videoUrls) !==
        JSON.stringify(employer.videoUrls)
    );
  }, [editedEmployer, employer]);

  const [videoUrlsString, setVideoUrlsString] = useState(
    editedEmployer.videoUrls.join("\n")
  );

  // useEffect to keep editedEmployer.videoUrls in sync with the string version
  useEffect(() => {
    setVideoUrlsString(editedEmployer.videoUrls.join("\n"));
  }, [editedEmployer.videoUrls]);

  // Validate required fields
  const isValid = useMemo(() => {
    return (
      editedEmployer.companyName.trim().length > 0 &&
      editedEmployer.jobTitle.trim().length > 0 &&
      editedEmployer.startDate.trim().length > 0 &&
      editedEmployer.contribution.trim().length > 0
    );
  }, [editedEmployer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedEmployer((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmploymentTypeChange = (value: string) => {
    setEditedEmployer((prev) => ({
      ...prev,
      employmentType: value as EmploymentType,
    }));
  };
  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      setEditedEmployer((prev) => ({
        ...prev,
        startDate: format(date, "yyyy-MM-dd"),
      }));
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEditedEmployer((prev) => ({
      ...prev,
      endDate: date ? format(date, "yyyy-MM-dd") : null,
    }));
  };
  const handleSave = async () => {
    setIsEditingCardLoading(true);
    try {
      onUpdate(editedEmployer);
      await updateEmployerData(
        profile.username,
        employer.id,
        editedEmployer as Employer
      );
      toast.success("Employer updated successfully");
    } catch (error) {
      console.error("Error updating employer:", error);
      toast.error("Failed to update employer");
    } finally {
      setIsEditingCard(false);
      setIsEditingCardLoading(false);
    }
  };

  // Format the duration nicely
  const formatDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    return `${format(start, "MMM yyyy")} - ${
      endDate ? format(end, "MMM yyyy") : "Present"
    }`;
  };

  if (isEditing && isEditingCard) {
    return (
      <div className="bg-card border rounded-xl p-6 space-y-4 animate-in fade-in-50 duration-300">
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="companyName"
              className="text-sm font-medium text-muted-foreground"
            >
              Company/Client Name *
            </label>
            <Input
              id="companyName"
              name="companyName"
              value={editedEmployer.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="jobTitle"
              className="text-sm font-medium text-muted-foreground"
            >
              Job Title *
            </label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={editedEmployer.jobTitle}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 w-full">
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-muted-foreground"
              >
                Start Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editedEmployer.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editedEmployer.startDate ? (
                      format(new Date(editedEmployer.startDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      editedEmployer.startDate
                        ? new Date(editedEmployer.startDate)
                        : undefined
                    }
                    onSelect={handleStartDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Input
                id="startDate"
                name="startDate"
                type="hidden"
                className="w-full flex-1"
                value={editedEmployer.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-muted-foreground"
              >
                End Date (leave empty if current)
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editedEmployer.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editedEmployer.endDate ? (
                      format(new Date(editedEmployer.endDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      editedEmployer.endDate
                        ? new Date(editedEmployer.endDate)
                        : undefined
                    }
                    onSelect={handleEndDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                id="endDate"
                name="endDate"
                type="hidden"
                value={editedEmployer.endDate || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="employmentType"
              className="text-sm font-medium text-muted-foreground"
            >
              Employment Type *
            </label>
            <Select
              value={editedEmployer.employmentType}
              onValueChange={handleEmploymentTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_TIME">Full-time</SelectItem>
                <SelectItem value="PART_TIME">Part-time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contribution"
              className="text-sm font-medium text-muted-foreground"
            >
              Your Contribution
            </label>
            <Textarea
              id="contribution"
              name="contribution"
              value={editedEmployer.contribution}
              onChange={handleChange}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Videos (URLs, one per line)
          </label>
          <Textarea
            name="videoUrls"
            value={videoUrlsString}
            onChange={(e) => {
              const newString = e.target.value;
              setVideoUrlsString(newString);
              setEditedEmployer((prev) => ({
                ...prev,
                videoUrls: newString
                  .split("\n")
                  .map((url) => url.trim())
                  .filter((url) => url !== ""),
              }));
            }}
            rows={4}
            placeholder="https://example.com/video1.mp4"
            className="resize-none"
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={onRemove}
            className="gap-2"
            disabled={isRemovingEmployerLoading}
          >
            <Trash2 className="h-4 w-4" />
            {isRemovingEmployerLoading ? "Removing..." : "Remove"}
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingCard(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasChanges || !isValid || isEditingCardLoading}
            >
              {isEditingCardLoading ? "Saving..." : " Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-card border rounded-xl p-6 space-y-6 transition-all",
        isEditing && "hover:border-primary/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{employer.companyName}</h3>
          <p className="text-lg">{employer.jobTitle}</p>
          <p className="text-sm text-muted-foreground">
            {formatDuration(employer.startDate, employer.endDate)} ·{" "}
            {employer.employmentType.replace("_", " ").toLowerCase()}
          </p>
        </div>

        {isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditingCard(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>

      {employer.contribution && (
        <div>
          <h4 className="text-sm font-medium mb-2">Contribution</h4>
          <p className="text-muted-foreground">{employer.contribution}</p>
        </div>
      )}

      {employer.videoUrls.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Portfolio Work</h4>
          <VideoGallery videos={employer.videoUrls} />
        </div>
      )}
    </div>
  );
}

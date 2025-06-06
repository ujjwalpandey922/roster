"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { format } from "date-fns";
import { Employer, EmploymentType } from "@/lib/types";
import { v4 as uuidv4 } from "@/lib/uuid";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

type AddEmployerDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employer: Employer) => Promise<void>;
  isAddEmployerLoading: boolean;
};

export default function AddEmployerDialog({
  isOpen,
  onClose,
  onAdd,
  isAddEmployerLoading,
}: AddEmployerDialogProps) {
  const [employer, setEmployer] = useState<Employer>({
    id: "",
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: null,
    employmentType: "FULL_TIME",
    contribution: "",
    videoUrls: [],
  });

  const [videoUrlsText, setVideoUrlsText] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmployer((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmploymentTypeChange = (value: string) => {
    setEmployer((prev) => ({
      ...prev,
      employmentType: value as EmploymentType,
    }));
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      setEmployer((prev) => ({
        ...prev,
        startDate: format(date, "yyyy-MM-dd"),
      }));
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEmployer((prev) => ({
      ...prev,
      endDate: date ? format(date, "yyyy-MM-dd") : null,
    }));
  };
  const validateForm = (): boolean => {
    if (!employer.companyName.trim()) {
      toast.error("Company/Client Name is required");
      return false;
    }

    if (!employer.jobTitle.trim()) {
      toast.error("Job Title is required");
      return false;
    }

    if (!employer.startDate) {
      toast.error("Start Date is required");
      return false;
    }

    if (!employer.contribution.trim()) {
      toast.error("Your Contribution is required");
      return false;
    }

    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form fields
    if (!validateForm()) {
      return;
    }
    try {
      // Parse video URLs from textarea
      const videoUrls = videoUrlsText
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url !== "");

      // Generate an ID and submit the employer
      const newEmployer: Employer = {
        ...employer,
        id: uuidv4(),
        videoUrls,
      };

      await onAdd(newEmployer); // Await the async onAdd function

      // Only reset if the operation was successful
      setEmployer({
        id: "",
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: null,
        employmentType: "FULL_TIME",
        contribution: "",
        videoUrls: [],
      });
      setVideoUrlsText("");
    } catch (error) {
      // Error is already handled in the parent component
      // You could add additional error handling here if needed
      console.error("Error adding employer:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium">
              Company/Client Name
            </label>
            <Input
              id="companyName"
              name="companyName"
              value={employer.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="jobTitle" className="text-sm font-medium">
              Job Title
            </label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={employer.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !employer.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {employer.startDate ? (
                      format(new Date(employer.startDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      employer.startDate
                        ? new Date(employer.startDate)
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
                value={employer.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date (leave empty if current)
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !employer.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {employer.endDate ? (
                      format(new Date(employer.endDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      employer.endDate ? new Date(employer.endDate) : undefined
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
                value={employer.endDate || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="employmentType" className="text-sm font-medium">
              Employment Type
            </label>
            <Select
              value={employer.employmentType}
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
            <label htmlFor="contribution" className="text-sm font-medium">
              Your Contribution
            </label>
            <Textarea
              id="contribution"
              name="contribution"
              value={employer.contribution}
              onChange={handleChange}
              rows={3}
              className="resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="videoUrls" className="text-sm font-medium">
              Videos (URLs, one per line)
            </label>
            <Textarea
              id="videoUrls"
              value={videoUrlsText}
              onChange={(e) => setVideoUrlsText(e.target.value)}
              rows={3}
              placeholder="https://example.com/video1.mp4"
              className="resize-none"
            />
          </div>

          <DialogFooter className="gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isAddEmployerLoading}>
              {isAddEmployerLoading ? "Adding..." : "Add Experience"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

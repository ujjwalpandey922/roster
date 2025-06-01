"use client";

import { useState } from "react";
import { Employer, EmploymentType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import VideoGallery from "@/components/profile/VideoGallery";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type EmployerCardProps = {
  employer: Employer;
  isEditing: boolean;
  onUpdate: (employer: Employer) => void;
  onRemove: () => void;
};

export default function EmployerCard({ 
  employer, 
  isEditing, 
  onUpdate, 
  onRemove 
}: EmployerCardProps) {
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [editedEmployer, setEditedEmployer] = useState(employer);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEmployer(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEmploymentTypeChange = (value: string) => {
    setEditedEmployer(prev => ({ 
      ...prev, 
      employmentType: value as EmploymentType 
    }));
  };

  const handleSave = () => {
    onUpdate(editedEmployer);
    setIsEditingCard(false);
  };

  // Format the duration nicely
  const formatDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    return `${format(start, 'MMM yyyy')} - ${endDate ? format(end, 'MMM yyyy') : 'Present'}`;
  };
  
  if (isEditing && isEditingCard) {
    return (
      <div className="bg-card border rounded-xl p-6 space-y-4 animate-in fade-in-50 duration-300">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium text-muted-foreground">
              Company/Client Name
            </label>
            <Input
              id="companyName"
              name="companyName"
              value={editedEmployer.companyName}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="jobTitle" className="text-sm font-medium text-muted-foreground">
              Job Title
            </label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={editedEmployer.jobTitle}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium text-muted-foreground">
                Start Date
              </label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={editedEmployer.startDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium text-muted-foreground">
                End Date (leave empty if current)
              </label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={editedEmployer.endDate || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="employmentType" className="text-sm font-medium text-muted-foreground">
              Employment Type
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
            <label htmlFor="contribution" className="text-sm font-medium text-muted-foreground">
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
            value={editedEmployer.videoUrls.join("\n")}
            onChange={(e) => {
              setEditedEmployer(prev => ({
                ...prev,
                videoUrls: e.target.value.split("\n").filter(url => url.trim() !== "")
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
          >
            <Trash2 className="h-4 w-4" />
            Remove
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
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn(
      "bg-card border rounded-xl p-6 space-y-6 transition-all",
      isEditing && "hover:border-primary/30"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">{employer.companyName}</h3>
          <p className="text-lg">{employer.jobTitle}</p>
          <p className="text-sm text-muted-foreground">
            {formatDuration(employer.startDate, employer.endDate)} · {employer.employmentType.replace("_", " ").toLowerCase()}
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
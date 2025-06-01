"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Employer, EmploymentType } from "@/lib/types";
import { v4 as uuidv4 } from "@/lib/uuid";

type AddEmployerDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employer: Employer) => void;
};

export default function AddEmployerDialog({ 
  isOpen, 
  onClose, 
  onAdd 
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmployer(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEmploymentTypeChange = (value: string) => {
    setEmployer(prev => ({ 
      ...prev, 
      employmentType: value as EmploymentType 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse video URLs from textarea
    const videoUrls = videoUrlsText
      .split("\n")
      .map(url => url.trim())
      .filter(url => url !== "");
    
    // Generate an ID and submit the employer
    const newEmployer: Employer = {
      ...employer,
      id: uuidv4(),
      videoUrls,
    };
    
    onAdd(newEmployer);
    
    // Reset the form
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
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={employer.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">
                End Date (leave empty if current)
              </label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
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
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Experience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
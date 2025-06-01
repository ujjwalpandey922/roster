"use client";

import { useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import EmployerCard from "@/components/profile/EmployerCard";
import AddEmployerDialog from "@/components/profile/AddEmployerDialog";
import { Employer } from "@/lib/types";

type EmployerSectionProps = {
  isEditing: boolean;
};

export default function EmployerSection({ isEditing }: EmployerSectionProps) {
  const { profile, addEmployer, removeEmployer, updateEmployer } = useProfile();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const handleAddEmployer = (employer: Employer) => {
    addEmployer(employer);
    setIsAddDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Experience</h2>
        
        {isEditing && (
          <Button 
            onClick={() => setIsAddDialogOpen(true)} 
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        {profile.employers.length === 0 ? (
          <div className="bg-muted p-6 rounded-lg text-center">
            <p className="text-muted-foreground">No experience added yet.</p>
            {isEditing && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)} 
                variant="outline" 
                className="mt-4"
              >
                Add Your First Experience
              </Button>
            )}
          </div>
        ) : (
          profile.employers.map((employer, index) => (
            <EmployerCard 
              key={employer.id} 
              employer={employer}
              isEditing={isEditing}
              onUpdate={(updatedEmployer) => updateEmployer(employer.id, updatedEmployer)}
              onRemove={() => removeEmployer(employer.id)}
            />
          ))
        )}
      </div>
      
      <AddEmployerDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddEmployer}
      />
    </div>
  );
}
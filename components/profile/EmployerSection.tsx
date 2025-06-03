"use client";

import { useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import EmployerCard from "@/components/profile/EmployerCard";
import AddEmployerDialog from "@/components/profile/AddEmployerDialog";
import { Employer } from "@/lib/types";
import { addEmployer as addEmployerAPI, deleteEmployer } from "@/lib/mock-data";
import { toast } from "sonner";

type EmployerSectionProps = {
  isEditing: boolean;
};

export default function EmployerSection({ isEditing }: EmployerSectionProps) {
  const { profile, addEmployer, removeEmployer, updateEmployer } = useProfile();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isRemovingEmployer, setIsRemovingEmployer] = useState(false);
  const handleAddEmployer = async (employer: Employer) => {
    setIsAddLoading(true);
    try {
      await addEmployerAPI(profile.username, employer);
      addEmployer(employer);
      setIsAddDialogOpen(false);
      toast.success("Employer added successfully");
    } catch (error) {
      console.error("Error adding employer:", error);
      toast.error("Failed to add employer");
    } finally {
      setIsAddLoading(false);
    }
  };
  const handleRemoveEmployer = async (id: string) => {
    setIsRemovingEmployer(true);
    try {
      await deleteEmployer(profile.username, id);
      toast.success("Employer deleted successfully");
      removeEmployer(id);
    } catch (error) {
      console.error("Error deleting employer:", error);
    } finally {
      setIsRemovingEmployer(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Experience
        </h2>

        {isEditing && (
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {profile.employers.length === 0 ? (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800/50 dark:to-purple-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-muted-foreground mb-4">
              No experience added yet.
            </p>
            {isEditing && (
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                variant="outline"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                Add Your First Experience
              </Button>
            )}
          </div>
        ) : (
          profile.employers.map((employer) => (
            <EmployerCard
              key={employer.id}
              employer={employer}
              isEditing={isEditing}
              onUpdate={(updatedEmployer) =>
                updateEmployer(employer.id, updatedEmployer)
              }
              isRemovingEmployerLoading={isRemovingEmployer}
              onRemove={() => handleRemoveEmployer(employer.id)}
            />
          ))
        )}
      </div>

      <AddEmployerDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddEmployer}
        isAddEmployerLoading={isAddLoading}
      />
    </div>
  );
}

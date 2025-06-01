"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Profile, Employer } from "@/lib/types";

type ProfileContextType = {
  profile: Profile;
  updateBasicInfo: (basicInfo: { 
    firstName: string;
    lastName: string;
    summary: string;
    avatarUrl: string;
  }) => void;
  addEmployer: (employer: Employer) => void;
  updateEmployer: (id: string, employer: Employer) => void;
  removeEmployer: (id: string) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ 
  children, 
  initialData 
}: { 
  children: ReactNode;
  initialData: Profile;
}) {
  const [profile, setProfile] = useState<Profile>(initialData);
  
  const updateBasicInfo = (basicInfo: { 
    firstName: string;
    lastName: string;
    summary: string;
    avatarUrl: string;
  }) => {
    setProfile(prev => ({
      ...prev,
      ...basicInfo
    }));
  };
  
  const addEmployer = (employer: Employer) => {
    setProfile(prev => ({
      ...prev,
      employers: [...prev.employers, employer]
    }));
  };
  
  const updateEmployer = (id: string, employer: Employer) => {
    setProfile(prev => ({
      ...prev,
      employers: prev.employers.map(emp => 
        emp.id === id ? employer : emp
      )
    }));
  };
  
  const removeEmployer = (id: string) => {
    setProfile(prev => ({
      ...prev,
      employers: prev.employers.filter(emp => emp.id !== id)
    }));
  };
  
  return (
    <ProfileContext.Provider value={{
      profile,
      updateBasicInfo,
      addEmployer,
      updateEmployer,
      removeEmployer,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
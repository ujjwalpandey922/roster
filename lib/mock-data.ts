import { Employer, Profile } from "@/lib/types";

export const mockProfileData: Profile = {
  id: "1",
  username: "sonu",
  firstName: "Sonu",
  lastName: "Choudhary",
  avatarUrl:
    "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  summary:
    "Creative professional with 5+ years of experience in video production and editing. Specialized in creating compelling visual stories for brands and individuals. Passionate about translating complex ideas into accessible and engaging content.",
  skills: [
    "Video Editing",
    "Motion Graphics",
    "Cinematography",
    "Storytelling",
    "Adobe Premiere Pro",
    "After Effects",
  ],
  employers: [
    {
      id: "emp1",
      companyName: "CreativeMinds Studio",
      jobTitle: "Senior Video Editor",
      startDate: "2021-03-01",
      endDate: null,
      employmentType: "FULL_TIME",
      contribution:
        "Lead video editor for major brand campaigns, managing a team of 3 junior editors. Increased production efficiency by 30% through workflow improvements.",
      videoUrls: [
        "https://example.com/video1.mp4",
        "https://example.com/video2.mp4",
        "https://example.com/video3.mp4",
      ],
    },
    {
      id: "emp2",
      companyName: "VisualArts Media",
      jobTitle: "Content Creator",
      startDate: "2019-06-15",
      endDate: "2021-02-28",
      employmentType: "CONTRACT",
      contribution:
        "Created over 200 pieces of video content for social media platforms, resulting in a 45% increase in client engagement metrics.",
      videoUrls: [
        "https://example.com/video4.mp4",
        "https://example.com/video5.mp4",
      ],
    },
  ],
};

// Mock API function to fetch profile data
export async function fetchProfileData(username: string): Promise<Profile> {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockProfileData;
}

// Mock API function to extract data from a portfolio URL
export async function extractPortfolioData(url: string): Promise<Profile> {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return mockProfileData;
}

// Mock API function to update profile data
export async function updateProfileData(profile: Profile): Promise<Profile> {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return profile;
}
// Mock API function to update Employer data
export async function updateEmployerData(
  username: string,
  employerId: string,
  updatedEmployer: Employer
): Promise<Employer> {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    ...updatedEmployer,
  };
}
export async function deleteEmployer(
  username: string,
  employerId: string
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: `Employer with ID ${employerId} deleted successfully.`,
  };
}
export async function addEmployer(
  username: string,
  newEmployer: Employer
): Promise<Employer> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    ...newEmployer,
    id: "new_emp_id_" + Math.random().toString(36).substring(2, 8),
  };
}

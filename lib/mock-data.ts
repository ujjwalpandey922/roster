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
// import { Profile } from "./types";

export const profileVariations: Record<string, Profile> = {
  default: {
    id: "0",
    username: "default",
    firstName: "Default",
    lastName: "User",
    avatarUrl: "https://via.placeholder.com/150",
    summary: "This is a default user profile.",
    skills: ["Skill A", "Skill B"],
    employers: [],
  },

  canva: {
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
  },

  personal: {
    id: "2",
    username: "dellinzhang",
    firstName: "Dellin",
    lastName: "Zhang",
    summary: "Animator and VFX artist passionate about visual storytelling.",
    skills: [],
    avatarUrl:
      "https://images.pexels.com/photos/854692/pexels-photo-854692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    employers: [],
    portfolioItems: [
      {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
        label: "Dellin",
        link: "https://dellinzhang.com",
      },
      {
        id: "2",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1748876811441-fdc37ada7905?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
        label: "JENerationDIY",
        link: "https://dellinzhang.com/jenerationdiy",
      },
      {
        id: "3",
        imageUrl:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        label: "Jenn Im",
        link: "https://imjennim.com",
      },
      {
        id: "4",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        label: "Glory Allan",
        link: "https://gloryallan.com",
      },
      {
        id: "5",
        imageUrl:
          "https://images.unsplash.com/photo-1742832599361-7aa7decd73b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        label: "Lisa",
        link: "https://blackpinkofficial.com/lisa",
      },
      {
        id: "6",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        label: "Snow Angel",
        link: "https://snowangel.com",
      },
    ],
  },
};
// Mock API function to fetch profile data
export async function fetchProfileData(username: string): Promise<Profile> {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Determine which profile variation to return based on URL
  if (username === "sonu" || username === "canva") {
    return profileVariations["canva"];
  } else if (username === "dellinzhang" || username === "personal-site") {
    return profileVariations["personal"];
  }

  // Default profile for unknown URLs
  return profileVariations["default"];
}

// Mock API function to extract data from a portfolio URL
export async function extractPortfolioData(url: string): Promise<Profile> {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Determine which profile variation to return based on URL
  if (url.includes("canva")) {
    return profileVariations["canva"];
  } else if (url.includes("dellinzhang") || url.includes("personal-site")) {
    return profileVariations["personal"];
  }

  // Default profile for unknown URLs
  return profileVariations["default"];
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

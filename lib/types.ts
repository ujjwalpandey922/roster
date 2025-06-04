export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "FREELANCE";

export interface Employer {
  id: string;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string | null;
  employmentType: EmploymentType;
  contribution: string;
  videoUrls: string[];
}

export interface Profile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  summary: string;
  skills: string[];
  employers: Employer[];
  portfolioItems?: {
    id: string;
    imageUrl: string;
    label: string;
    link: string;
  }[];
}

export interface PortfolioSubmission {
  url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

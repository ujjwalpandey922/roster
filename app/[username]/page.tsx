import { ProfileProvider } from "@/contexts/ProfileContext";
import { notFound } from "next/navigation";
import ClientProfilePage from "@/components/profile/ClientProfile";
import { fetchProfileData } from "@/lib/mock-data";

type ProfilePageProps = {
  params: {
    username: string;
  };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  // In a real app, this would fetch the user profile from a database
  // For demo purposes, we'll return mock data
  const profile = await fetchProfileData(params.username);

  if (!profile) {
    return notFound();
  }

  return (
    <ProfileProvider initialData={profile}>
      <ClientProfilePage />
    </ProfileProvider>
  );
}

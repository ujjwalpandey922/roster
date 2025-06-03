"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  LayoutTemplate,
  Lightbulb,
  Loader2,
  Rocket,
  Settings,
  Star,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { extractPortfolioData } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic URL validation
    if (!url) {
      setError("Please enter a portfolio URL");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Mock API call - in real app this would validate the URL
      const profile = await extractPortfolioData(url);
      // For demo purposes, we'll just redirect to a profile page
      // In a real app, this would happen after backend processing
      router.push(`/${profile.username}`);
    } catch (err) {
      setError("Failed to process portfolio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 py-16 mx-auto max-w-6xl">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-2xl opacity-20 "></div>
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl mb-4 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome to <span className="text-primary">Roster</span>
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Showcase your creative work and connect with opportunities that
          matter.
          <span className="block mt-2 font-medium text-foreground">
            Built for portfolios, not just resumes.
          </span>
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 place-items-center">
        {/* Form Card */}
        <div className="relative group w-full flex items-center justify-center">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl opacity-10 group-hover:opacity-20 transition-all duration-300 animate-tilt"></div>
          <Card className="w-full max-w-lg relative overflow-hidden transition-transform duration-300 hover:shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <CardContent className="p-8 space-y-6">
              <header className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                    <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Add your portfolio</h2>
                </div>
                <p className="text-muted-foreground">
                  Enter your portfolio URL and we'll automatically extract your
                  work experience.
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Globe className="h-4 w-4 absolute left-3 top-4" />
                    <Input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-12 pl-10"
                    />
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-4 w-4" />
                      Create Profile
                    </>
                  )}
                </Button>
              </form>

              <div className="bg-gradient-to-br w-full from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
                <div className="text-sm flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div className="flex-1">
                    For demo purposes, try this example portfolio:
                    <Button
                      onClick={() =>
                        setUrl("https://sonuchoudhary.my.canva.site/portfolio")
                      }
                      variant="link"
                      className="font-mono text-blue-600 dark:text-blue-400 block mt-1 break-all w-full text-left text-ellipsis overflow-hidden p-0 "
                    >
                      Try this portfolio...!!!
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Section */}
        <div className="relative max-lg:hidden">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <h3 className="text-xl font-bold">Visual Portfolios</h3>
              <p className="text-blue-100">Showcase your work in style</p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Creative professional working"
              width={800}
              height={600}
              className="object-cover w-full aspect-video"
              priority
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-24 text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Why Creators Love Roster</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Designed specifically for creative professionals to showcase their
          best work
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        <FeatureCard
          title="Showcase Your Work"
          description="Display your creative portfolio with videos and visuals front and center."
          icon={<LayoutTemplate className="h-8 w-8" />}
          color="from-blue-500 to-cyan-500"
        />
        <FeatureCard
          title="Stand Out To Clients"
          description="Make an impression with a profile that highlights your creative skills."
          icon={<Star className="h-8 w-8" />}
          color="from-purple-500 to-pink-500"
        />
        <FeatureCard
          title="Manage Your Experience"
          description="Easily organize and update your employment history and contributions."
          icon={<Settings className="h-8 w-8" />}
          color="from-amber-500 to-orange-500"
        />
      </div>

      {/* Testimonial */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-100 dark:border-blue-800/50">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="italic text-lg mb-3">
              "Roster completely transformed how I showcase my design work. I
              got 3x more client inquiries in the first month!"
            </p>
            <p className="font-medium">— Jane Doe, Product Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-card p-8 rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:border-blue-300/50 group">
      <div
        className={`bg-gradient-to-br ${color} p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-6 text-white`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

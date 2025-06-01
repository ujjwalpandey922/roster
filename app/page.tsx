"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just redirect to a profile page
      // In a real app, this would happen after backend processing
      router.push("/sonu");
    } catch (err) {
      setError("Failed to process portfolio. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 py-12 mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
            Welcome to <span className="text-primary">Roster</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Showcase your creative work and connect with opportunities that matter.
            Built for portfolios, not just resumes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Add your portfolio</h2>
              <p className="text-muted-foreground">
                Enter the URL to your portfolio site and we'll automatically extract your work experience.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-12"
                />
                {error && <p className="text-destructive text-sm">{error}</p>}
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : "Create Profile"}
              </Button>
            </form>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                For demo purposes, you can use this example portfolio: 
                <span className="font-medium block mt-1">
                  https://sonuchoudhary.my.canva.site/portfolio
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-xl transition-all">
            <Image
              src="https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Creative professional working"
              width={600}
              height={400}
              className="object-cover w-full aspect-video"
            />
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Showcase Your Work" 
            description="Display your creative portfolio the way it was meant to be seen - with videos and visuals front and center."
          />
          <FeatureCard 
            title="Stand Out To Clients" 
            description="Make an impression with a profile that highlights your creative skills and experience."
          />
          <FeatureCard 
            title="Manage Your Experience" 
            description="Easily organize and update your employment history and contributions."
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
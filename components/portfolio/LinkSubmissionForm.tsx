"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Link } from "lucide-react";
import { extractPortfolioData } from "@/lib/mock-data";

export default function LinkSubmissionForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!url.trim()) {
      setError("Please enter your portfolio URL");
      return;
    }
    
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      // In a real app, this would send the URL to the backend for processing
      // For this demo, we'll use a mock function with a timeout
      await extractPortfolioData(url);
      
      // On success, redirect to the profile page
      router.push("/sonu");
    } catch (err) {
      setError("Failed to process your portfolio. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="space-y-4">
        <div className="space-y-2 text-center mb-4">
          <h2 className="text-2xl font-bold">Submit Your Portfolio</h2>
          <p className="text-muted-foreground">
            Enter the URL to your portfolio website and we'll extract the details automatically.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="animate-in fade-in-50 duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="pl-9"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="ml-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : "Submit"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              For this demo, you can use: <span className="font-medium">https://sonuchoudhary.my.canva.site/portfolio</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
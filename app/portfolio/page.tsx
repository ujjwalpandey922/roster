"use client";

import { LinkSubmissionForm } from "@/components/portfolio/LinkSubmissionForm";
import Image from "next/image";

export default function PortfolioSubmissionPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">
            Add Your Portfolio to Roster
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Let us extract your professional experience from your existing portfolio site
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <LinkSubmissionForm />
          </div>
          
          <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Creative portfolio visualization"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-center mb-8">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number={1} 
              title="Submit Your Portfolio Link" 
              description="Enter the URL to your existing portfolio website."
            />
            <StepCard 
              number={2} 
              title="We Extract Your Experience" 
              description="Our system automatically extracts your work history and media samples."
            />
            <StepCard 
              number={3} 
              title="Review & Enhance Your Profile" 
              description="Add additional details and customize how your experience is displayed."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({ 
  number, 
  title, 
  description 
}: { 
  number: number; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-card p-6 rounded-lg border relative">
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
        {number}
      </div>
      <h3 className="text-xl font-medium mb-2 mt-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
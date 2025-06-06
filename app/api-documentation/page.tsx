"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ApiDocumentationPage() {
  const username = "username";
  const employerId = "employerId";
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex justify-between items-center mb-8 gap-6 max-sm:flex-wrap">
        <h1 className="text-3xl font-bold">API Documentation</h1>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>

      <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
        <h2>Roster API Documentation</h2>

        <p>
          This document outlines the API endpoints required for the Roster
          portfolio feature.
        </p>

        <h3>Endpoints</h3>

        <h4>1. Submit Portfolio URL</h4>
        <p>
          <strong>Endpoint:</strong> <code>POST /api/portfolio</code>
        </p>
        <p>
          <strong>Description:</strong> Submits a portfolio URL for data
          extraction
        </p>

        <div className="bg-muted p-4 rounded-lg mb-4">
          <p className="font-semibold">Request:</p>
          <pre className="bg-card p-2 rounded border overflow-x-auto">
            {`{
  "url": "https://example.com/portfolio"
}`}
          </pre>
        </div>

        <div className="bg-muted p-4 rounded-lg mb-4">
          <p className="font-semibold">Response Success (200):</p>
          <pre className="bg-card p-2 rounded border overflow-x-auto">
            {`{
  "success": true,
  "data": {
    "id": "123",
    "username": "username",
    "firstName": "First",
    "lastName": "Last",
    "avatarUrl": "https://example.com/avatar.jpg",
    "summary": "Professional summary text...",
    "skills": ["Skill1", "Skill2"],
    "employers": [
      {
        "id": "emp1",
        "companyName": "Company Name",
        "jobTitle": "Job Title",
        "startDate": "2022-01-01",
        "endDate": null,
        "employmentType": "FULL_TIME",
        "contribution": "Contribution details...",
        "videoUrls": ["https://example.com/video1.mp4"]
      }
    ],
    "profileUrl": "https://app.joinroster.co/username"
  }
}`}
          </pre>
        </div>

        <h4>2. Fetch Profile by Username</h4>
        <p>
          <strong>Endpoint:</strong> <code>GET /api/profile/{username}</code>
        </p>
        <p>
          <strong>Description:</strong> Retrieves a user's profile by their
          username
        </p>

        <div className="bg-muted p-4 rounded-lg mb-4">
          <p className="font-semibold">Response Success (200):</p>
          <pre className="bg-card p-2 rounded border overflow-x-auto">
            {`{
  "success": true,
  "data": {
    "id": "123",
    "username": "username",
    "firstName": "First",
    "lastName": "Last",
    "avatarUrl": "https://example.com/avatar.jpg",
    "summary": "Professional summary text...",
    "skills": ["Skill1", "Skill2"],
    "employers": [
      {
        "id": "emp1",
        "companyName": "Company Name",
        "jobTitle": "Job Title",
        "startDate": "2022-01-01",
        "endDate": null,
        "employmentType": "FULL_TIME",
        "contribution": "Contribution details...",
        "videoUrls": ["https://example.com/video1.mp4"]
      }
    ]
  }
}`}
          </pre>
        </div>

        <h4>3. Update Profile</h4>
        <p>
          <strong>Endpoint:</strong> <code>PUT /api/profile/{username}</code>
        </p>
        <p>
          <strong>Description:</strong> Updates a user's profile information
        </p>

        <div className="bg-muted p-4 rounded-lg mb-4">
          <p className="font-semibold">Request:</p>
          <pre className="bg-card p-2 rounded border overflow-x-auto">
            {`{
  "firstName": "Updated First",
  "lastName": "Updated Last",
  "summary": "Updated professional summary",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}`}
          </pre>
        </div>

        <h4>4. Add Employer</h4>
        <p>
          <strong>Endpoint:</strong>{" "}
          <code>POST /api/profile/{username}/employers</code>
        </p>
        <p>
          <strong>Description:</strong> Adds a new employer to a user's profile
        </p>

        <div className="bg-muted p-4 rounded-lg mb-4">
          <p className="font-semibold">Request:</p>
          <pre className="bg-card p-2 rounded border overflow-x-auto">
            {`{
  "companyName": "New Company",
  "jobTitle": "New Job Title",
  "startDate": "2023-01-01",
  "endDate": null,
  "employmentType": "CONTRACT",
  "contribution": "Contribution details for the new position",
  "videoUrls": ["https://example.com/new-video.mp4"]
}`}
          </pre>
        </div>

        <h4>5. Update Employer</h4>
        <p>
          <strong>Endpoint:</strong>{" "}
          <code>
            PUT /api/profile/{username}/employers/{employerId}
          </code>
        </p>
        <p>
          <strong>Description:</strong> Updates an existing employer in a user's
          profile
        </p>

        <div className="bg-muted p-4 rounded-lg mb-4">
          <p className="font-semibold">Request:</p>
          <pre className="bg-card p-2 rounded border overflow-x-auto">
            {`{
  "companyName": "Updated Company",
  "jobTitle": "Updated Job Title",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "employmentType": "FULL_TIME",
  "contribution": "Updated contribution details",
  "videoUrls": ["https://example.com/updated-video.mp4"]
}`}
          </pre>
        </div>

        <h4>6. Delete Employer</h4>
        <p>
          <strong>Endpoint:</strong>{" "}
          <code>
            DELETE /api/profile/{username}/employers/{employerId}
          </code>
        </p>
        <p>
          <strong>Description:</strong> Removes an employer from a user's
          profile
        </p>

        <div className="bg-muted p-4 rounded-lg mb-4">
          <p className="font-semibold">Response Success (200):</p>
          <pre className="bg-card p-2 rounded border overflow-x-auto">
            {`{
  "success": true,
  "message": "Employer deleted successfully"
}`}
          </pre>
        </div>

        <h3>Portfolio Data Extraction</h3>
        <p>The backend would implement a scraping service that would:</p>
        <ol>
          <li>Fetch the HTML content of the provided portfolio URL</li>
          <li>
            Parse the document to extract relevant information:
            <ul>
              <li>Basic info (name, summary, profile image)</li>
              <li>Work experience (employers, job titles, dates)</li>
              <li>Media content (videos, images)</li>
            </ul>
          </li>
          <li>Structure the extracted data according to our Profile schema</li>
          <li>Return the structured data to create a new profile</li>
        </ol>
      </div>
    </div>
  );
}

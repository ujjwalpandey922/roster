# Roster API Documentation

This document outlines the API endpoints required for the Roster portfolio feature.

## Endpoints

### 1. Submit Portfolio URL

**Endpoint:** `POST /api/portfolio`

**Description:** Submits a portfolio URL for data extraction

**Request:**
```json
{
  "url": "https://example.com/portfolio"
}
```

**Response Success (200):**
```json
{
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
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": "Invalid URL provided"
}
```

### 2. Fetch Profile by Username

**Endpoint:** `GET /api/profile/{username}`

**Description:** Retrieves a user's profile by their username

**Response Success (200):**
```json
{
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
}
```

**Response Error (404):**
```json
{
  "success": false,
  "error": "Profile not found"
}
```

### 3. Update Profile

**Endpoint:** `PUT /api/profile/{username}`

**Description:** Updates a user's profile information

**Request:**
```json
{
  "firstName": "Updated First",
  "lastName": "Updated Last",
  "summary": "Updated professional summary",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "username": "username",
    "firstName": "Updated First",
    "lastName": "Updated Last",
    "avatarUrl": "https://example.com/new-avatar.jpg",
    "summary": "Updated professional summary",
    "skills": ["Skill1", "Skill2"],
    "employers": [...]
  }
}
```

### 4. Add Employer

**Endpoint:** `POST /api/profile/{username}/employers`

**Description:** Adds a new employer to a user's profile

**Request:**
```json
{
  "companyName": "New Company",
  "jobTitle": "New Job Title",
  "startDate": "2023-01-01",
  "endDate": null,
  "employmentType": "CONTRACT",
  "contribution": "Contribution details for the new position",
  "videoUrls": ["https://example.com/new-video.mp4"]
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "id": "new-emp-id",
    "companyName": "New Company",
    "jobTitle": "New Job Title",
    "startDate": "2023-01-01",
    "endDate": null,
    "employmentType": "CONTRACT",
    "contribution": "Contribution details for the new position",
    "videoUrls": ["https://example.com/new-video.mp4"]
  }
}
```

### 5. Update Employer

**Endpoint:** `PUT /api/profile/{username}/employers/{employerId}`

**Description:** Updates an existing employer in a user's profile

**Request:**
```json
{
  "companyName": "Updated Company",
  "jobTitle": "Updated Job Title",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "employmentType": "FULL_TIME",
  "contribution": "Updated contribution details",
  "videoUrls": ["https://example.com/updated-video.mp4"]
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "emp-id",
    "companyName": "Updated Company",
    "jobTitle": "Updated Job Title",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "employmentType": "FULL_TIME",
    "contribution": "Updated contribution details",
    "videoUrls": ["https://example.com/updated-video.mp4"]
  }
}
```

### 6. Delete Employer

**Endpoint:** `DELETE /api/profile/{username}/employers/{employerId}`

**Description:** Removes an employer from a user's profile

**Response Success (200):**
```json
{
  "success": true,
  "message": "Employer deleted successfully"
}
```

## Portfolio Data Extraction

The backend would implement a scraping service that would:

1. Fetch the HTML content of the provided portfolio URL
2. Parse the document to extract relevant information:
   - Basic info (name, summary, profile image)
   - Work experience (employers, job titles, dates)
   - Media content (videos, images)
   
3. Structure the extracted data according to our Profile schema
4. Return the structured data to create a new profile

For production implementation, consider:
- Rate limiting to prevent abuse
- Caching to improve performance
- Error handling for various portfolio site structures
- User verification to confirm extracted data accuracy
# Properties Management Guide

This guide explains how to add, update, and manage properties on the Two Creeks Properties website.

## Overview

Properties are now managed through a simple data file (`properties.json`) and organized folder structure. No more editing HTML directly!

## File Structure

```
/properties/                  # All property data and images
  /property-id-1/            # One folder per property
    - 1.jpg                  # Property images (numbered)
    - 2.jpg
    - 3.jpg
  /property-id-2/
    - 1.jpg
    - 2.jpg
    - 3.jpg
properties.json              # Property data file
```

## Adding a New Property

### Step 1: Create Property Folder

Create a new folder in `/properties/` with a unique ID (use lowercase, hyphens for spaces):
- Good examples: `broadlands-oak-st`, `leesburg-maple-123`, `ashburn-main-456`
- Bad examples: `Property 1`, `house_2`, `BroadlandsOak`

### Step 2: Add Property Images

Add your property images to the folder, named sequentially:
- `1.jpg` - Main featured image (shown first)
- `2.jpg` - Second image
- `3.jpg` - Third image
- etc.

**Image Tips:**
- Use JPG format for best compatibility
- Recommended size: 1200x800px or larger
- First image should be the best/most appealing shot

### Step 3: Add Property to properties.json

Open `properties.json` and add a new entry:

```json
{
  "id": "broadlands-oak-st",
  "location": "Broadlands",
  "address": "123 Oak Street, Ashburn, VA 20148",
  "description": "Stunning 4-bedroom colonial with upgraded kitchen...",
  "beds": 4,
  "baths": 3.5,
  "sqft": 2400,
  "status": "available",
  "zillowUrl": "https://www.zillow.com/homedetails/...",
  "images": ["1.jpg", "2.jpg", "3.jpg"]
}
```

**Field Definitions:**
- `id` - Must match the folder name exactly
- `location` - Short name (e.g., "Broadlands", "Leesburg")
- `address` - Full street address
- `description` - Property description (1-3 sentences)
- `beds` - Number of bedrooms (can be decimal, e.g., 3.5)
- `baths` - Number of bathrooms (can be decimal, e.g., 2.5)
- `sqft` - Square footage (number only, no commas)
- `status` - One of: `"available"`, `"coming-soon"`, or `"rented"`
- `zillowUrl` - Full URL to Zillow listing
- `images` - Array of image filenames (in order of display)

## Property Status

### Available
Properties with `"status": "available"` appear in the main properties grid.

### Coming Soon
Properties with `"status": "coming-soon"` appear in the "Coming Soon" section below available properties.

### Rented
Properties with `"status": "rented"` are hidden from the website.

**Special Case:** If ALL properties are rented and none are coming soon, the site displays a "check back later" message with thumbnails of recently rented properties.

## Updating an Existing Property

### Change Status
Edit `properties.json` and change the `status` field:
```json
"status": "rented"
```

### Update Details
Edit any field in `properties.json` for that property.

### Replace Images
Replace the image files in the property's folder (keep the same filenames).

## Removing a Property

### Option 1: Mark as Rented (Recommended)
Set `"status": "rented"` in `properties.json`. The property won't display but you keep the data.

### Option 2: Delete Completely
1. Remove the property entry from `properties.json`
2. Optionally delete the property folder

## Example: Complete properties.json

```json
[
  {
    "id": "ashburn-main-123",
    "location": "Ashburn",
    "address": "123 Main Street, Ashburn, VA 20147",
    "description": "Beautiful 3-bedroom, 2.5-bathroom townhome in desirable Ashburn location. Features modern kitchen, hardwood floors, private patio, and 2-car garage. Close to schools, shopping, and Metro access.",
    "beds": 3,
    "baths": 2.5,
    "sqft": 1800,
    "status": "available",
    "zillowUrl": "https://www.zillow.com/",
    "images": ["1.jpg", "2.jpg", "3.jpg"]
  },
  {
    "id": "broadlands-oak-456",
    "location": "Broadlands",
    "address": "456 Oak Street, Ashburn, VA 20148",
    "description": "Spacious 4-bedroom colonial with finished basement and community pool access. Walking distance to Broadlands Village Center.",
    "beds": 4,
    "baths": 3.5,
    "sqft": 2600,
    "status": "coming-soon",
    "zillowUrl": "https://www.zillow.com/",
    "images": ["1.jpg", "2.jpg", "3.jpg"]
  },
  {
    "id": "leesburg-maple-789",
    "location": "Leesburg",
    "address": "789 Maple Drive, Leesburg, VA 20176",
    "description": "Charming single-family home with large backyard and updated appliances.",
    "beds": 3,
    "baths": 2,
    "sqft": 1950,
    "status": "rented",
    "zillowUrl": "https://www.zillow.com/",
    "images": ["1.jpg", "2.jpg"]
  }
]
```

## Testing Your Changes

1. Save your changes to `properties.json`
2. Refresh the website in your browser
3. Properties should update automatically

## Troubleshooting

**Property not showing up?**
- Check that the `id` in properties.json matches the folder name exactly
- Check that the `status` is "available" or "coming-soon" (not "rented")
- Check browser console for errors (F12 → Console tab)

**Images not loading?**
- Verify image filenames in properties.json match the actual files
- Check that images are in the correct property folder
- Make sure image filenames are exactly as listed (case-sensitive)

**JSON syntax errors?**
- Use a JSON validator (jsonlint.com)
- Common mistakes: missing commas, extra commas at end, missing quotes
- Each property except the last needs a comma after its closing `}`

## Tips

- Always use a text editor with JSON syntax highlighting
- Test with one property first before adding many
- Keep property IDs consistent (lowercase-with-hyphens)
- Backup `properties.json` before making major changes
- Images around 1200px wide work well for most screens

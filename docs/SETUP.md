# Windows 11 setup guide

## 1. Install the tools
Install:
- Git for Windows: https://git-scm.com/download/win
- Node.js LTS: https://nodejs.org/
- Visual Studio Code: https://code.visualstudio.com/

After installation, close and reopen PowerShell.

## 2. Check the installations
Open PowerShell and run each command:

```powershell
node --version
npm --version
git --version
```

Each command should display a version number.

## 3. Create a GitHub repository
On GitHub, create a repository named `membeso-rsvp`.
Choose Private. Do not initialise it with a README because this starter already contains one.

Copy the repository HTTPS URL.

## 4. Put this starter project into your repository
Download and extract the starter ZIP. In PowerShell, change directory to the extracted `membeso-rsvp-starter` folder. For example:

```powershell
cd "$HOME\Downloads\membeso-rsvp-starter"
ls
```

The `ls` command should show `frontend`, `supabase`, `docs`, and `README.md`.

Initialise Git and connect your repository:

```powershell
git init
git branch -M main
git remote add origin PASTE_YOUR_GITHUB_REPOSITORY_URL_HERE
git status
git add .
git commit -m "Create Membeso RSVP starter application"
git push -u origin main
```

Replace the placeholder URL with the HTTPS URL copied from your own GitHub repository.

## 5. Install the frontend packages
Enter the frontend folder:

```powershell
cd frontend
npm install
```

`npm install` downloads the libraries listed in `package.json`.

Start the development server:

```powershell
npm run dev
```

Open the local address printed in PowerShell, usually `http://localhost:5173`.

Stop the server with `Ctrl+C`.

## 6. Create the Supabase project
Create a project at https://supabase.com/.
Save the database password somewhere private. Do not put it in GitHub.

In Supabase, open SQL Editor, create a new query, and run the contents of:
`supabase/migrations/001_create_rsvp_responses.sql`

In Project Settings, find the project URL and publishable key.

## 7. Configure the local website
Inside `frontend`, create a file named `.env.local`.

Copy the two variable names from `.env.example` and replace the placeholder values with your Supabase project URL and publishable key.

Do not use a service-role key. Do not commit `.env.local`.

Restart the development server after creating or changing `.env.local`.

## 8. Test
Submit a test RSVP from the local website.

In Supabase, open Table Editor and inspect `rsvp_responses`. The test response should appear.

The public website should not have a page or API query that reads the guest table.

## 9. Important first-release limitation
This starter deliberately does not expose an administrator dashboard. For tonight, the project owner can view responses inside the authenticated Supabase project dashboard. A separate family dashboard requires a properly authorised server-side/admin design and should not be improvised by exposing guest records.

The public insert-only form can still receive spam. Before distributing widely, consider server-side rate limiting, CAPTCHA or a controlled invitation process.

## 10. WhatsApp sharing
Once the website is deployed, copy its real HTTPS URL.

In ordinary WhatsApp:
1. Open the family or guest chat.
2. Attach the original poster using the photo/gallery option.
3. Put the RSVP URL in the image caption.
4. Send the image.

The poster remains a picture in the chat. The URL in the caption is the clickable part.

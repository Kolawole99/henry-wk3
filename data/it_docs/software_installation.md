# Software Installation Guide

**Last Updated:** September 15, 2023
**Philosophy:** We operate a "Self-Service" model. You do not need Admin rights to install approved software.

## Approved Software List (Partial)
* **Browsers:** Chrome, Firefox, Edge
* **Communication:** Slack, Zoom, Teams
* **Productivity:** Microsoft Office 365, Adobe Acrobat Reader
* **Developer:** VS Code, Docker Desktop, Postman (Engineering only)

## How to Install Software

### macOS (Jamf Self Service)
1.  Open the **Applications** folder or press `Cmd+Space`.
2.  Type **"Self Service"** and launch the app (Icon: Company Logo).
3.  Log in with your network credentials if prompted.
4.  Browse categories on the left or search for the app.
5.  Click the **Install** button.
    * *Note: If the button says "Reinstall," the app is already on your machine.*



### Windows (Company Portal)
1.  Press the Windows Key and type **"Company Portal"**.
2.  Launch the app (Blue icon).
3.  Go to the **Apps** tab.
4.  Click the application you need.
5.  Click **Install**. You will see a notification when installation completes.

## Requesting Non-Standard Software
If you need software not listed in the portal (e.g., Adobe Creative Cloud, specialized engineering tools):

1.  Go to the **IT Service Portal** (`helpdesk.company.com`).
2.  Select **Service Catalog** -> **Software Request**.
3.  Fill out the form:
    * **Software Name:**
    * **Business Justification:** (Required for license purchase).
    * **Cost Center:** (Ask your manager).
4.  **Approval:** Your manager will receive an email approval request. Once approved, IT Procurement will purchase the license and assign it to your Self Service portal.

## Admin Rights Policy
**Standard Users do not have Local Admin rights.** This prevents malware and accidental system configurations.
* **Temporary Admin:** If you need to install drivers for a home printer, request "Temporary Admin Access" in the Self Service portal. This grants admin rights for **30 minutes**.

## 5. Software Categories and Approval Requirements

### 5.1 Pre-Approved Software (No Request Needed)
Available immediately via Self Service portal:

**Productivity:**
* Microsoft Office 365 (Word, Excel, PowerPoint, Outlook)
* Adobe Acrobat Reader DC
* Google Chrome, Mozilla Firefox, Microsoft Edge
* 7-Zip (file compression)
* Notepad++ (text editor)

**Communication:**
* Slack (company workspace pre-configured)
* Zoom (licensed account)
* Microsoft Teams
* Discord (for engineering/gaming communities - personal use)

**Utilities:**
* VLC Media Player
* Snagit (screen capture)
* OBS Studio (screen recording)

### 5.2 Role-Based Software
Automatically approved for specific roles:

**Engineering:**
* Visual Studio Code, IntelliJ IDEA, PyCharm
* Docker Desktop (macOS/Windows)
* Postman, Insomnia (API testing)
* Git, GitHub Desktop
* Node.js, Python, Java JDK
* AWS CLI, Azure CLI, Google Cloud SDK
* Terraform, Kubernetes tools (kubectl, k9s)

**Design/Creative:**
* Adobe Creative Cloud (Photoshop, Illustrator, InDesign, Premiere Pro)
* Figma Desktop
* Sketch (macOS only)
* Blender
* DaVinci Resolve

**Data/Analytics:**
* Tableau Desktop
* Power BI Desktop
* Python with Anaconda
* R and RStudio
* SQL clients (DBeaver, DataGrip)

**Sales/Marketing:**
* Salesforce desktop app
* HubSpot desktop app
* Vidyard (video messaging)
* Loom (screen recording)

### 5.3 Manager Approval Required
Submit request with business justification:

**Paid/Licensed Software:**
* Specialty tools not in standard catalog
* Software with per-user licensing costs >$100/year
* Tools that duplicate existing functionality

**Review Timeline:** 2-3 business days for manager approval, then 5 business days for procurement and installation.

### 5.4 Security Review Required
IT Security must approve before installation:

**High-Risk Categories:**
* Remote access tools (TeamViewer, AnyDesk, LogMeIn)
* VPN clients (non-corporate)
* File sharing/sync tools (Dropbox, Box, personal cloud storage)
* Password managers (beyond company-standard 1Password)
* Browser extensions accessing sensitive data
* Tools requiring admin/root access
* Software from non-verified publishers

**Review Timeline:** 7-10 business days. Security will assess:
* Vendor reputation and security posture
* Data handling practices
* Compliance with company policies
* Alternatives already approved

### 5.5 Prohibited Software
The following software is strictly prohibited and will trigger security alerts:

**Never Install:**
* Tor Browser or proxy/anonymization tools
* Hacking/penetration testing tools (outside authorized security team use)
* Peer-to-peer file sharing (BitTorrent, uTorrent)
* Unlicensed/cracked software
* Software from untrusted sources (random downloads, warez sites)
* Cryptocurrency miners
* Keyloggers or monitoring tools
* Remote desktop tools for personal use

**Consequence:** Installation of prohibited software may result in:
* Immediate device quarantine
* Incident investigation
* Disciplinary action up to termination

## 6. Installation Troubleshooting

### 6.1 Self Service Portal Issues

**Issue: "Install" button is grayed out**
* **Cause:** App already installed or pending installation
* **Solution:** Check Applications folder. If not there, restart device and check again.

**Issue: "Not Authorized" error**
* **Cause:** Software requires manager/security approval you haven't obtained
* **Solution:** Submit formal software request via helpdesk

**Issue: Installation fails halfway through**
* **Cause:** Network interruption or insufficient disk space
* **Solution:**
  1. Check internet connection
  2. Verify at least 10GB free disk space
  3. Retry installation
  4. If still failing, submit helpdesk ticket

**Issue: Software installed but won't launch**
* **Cause:** Missing dependencies or licensing issue
* **Solution:**
  1. Restart device
  2. Check for system updates
  3. Uninstall and reinstall via Self Service
  4. Contact helpdesk if persists

### 6.2 License Activation Issues

**Microsoft Office:**
* Should activate automatically with company credentials
* If prompted for product key, sign in with your @company.com email
* Contact IT if activation fails after 24 hours

**Adobe Creative Cloud:**
* Launch Creative Cloud Desktop app
* Sign in with your company Adobe ID (set up during provisioning)
* If "License Expired" error, submit ticket - IT will reassign license

**Development Tools (JetBrains, etc.):**
* Use company license server URL provided in Self Service app description
* Or use educational license if applicable (submit proof of enrollment)

### 6.3 macOS-Specific Issues

**Issue: "App cannot be opened because developer cannot be verified"**
* **Solution:**
  1. Right-click the app, select "Open"
  2. Click "Open" in the security dialog
  3. For persistent issues: System Settings > Privacy & Security > scroll to blocked app, click "Open Anyway"

**Issue: "App is damaged and can't be opened"**
* **Cause:** Gatekeeper quarantine on downloaded app
* **Solution:** IT must remove quarantine attribute. Submit helpdesk ticket with app name.

**Issue: App requires Screen Recording or Accessibility permissions**
* **Solution:**
  1. System Settings > Privacy & Security > Screen Recording (or Accessibility)
  2. Toggle on the app
  3. Restart the app

### 6.4 Windows-Specific Issues

**Issue: "Windows protected your PC" SmartScreen warning**
* **Solution (if approved software):**
  1. Click "More info"
  2. Click "Run anyway"
  3. If option not available, IT must disable SmartScreen temporarily

**Issue: .NET Framework or Visual C++ Redistributable errors**
* **Cause:** Missing Windows system components
* **Solution:** IT will push required components via endpoint management. Submit ticket.

**Issue: Software conflicts with antivirus**
* **Cause:** CrowdStrike or Defender flagging legitimate software
* **Solution:** Submit ticket. IT will whitelist if software is approved.

## 7. Software Updates and Patching

### 7.1 Automatic Updates
The following updates install automatically (managed by IT):
* Operating system security patches (monthly)
* Microsoft Office updates
* Antivirus/endpoint protection updates (daily)
* Browser security updates

**User action:** Restart device when prompted. Do not defer updates beyond 7 days.

### 7.2 User-Initiated Updates
Some apps require user action to update:
* Adobe Creative Cloud apps (update via CC Desktop app)
* Slack (prompts when update available)
* Zoom (prompts when update available)
* Self-installed developer tools

**Best Practice:** Update apps weekly. Outdated versions may have security vulnerabilities.

### 7.3 Major OS Upgrades
**macOS/Windows major versions** (e.g., macOS Sonoma to Sequoia, Windows 11 22H2 to 23H2):
* IT tests compatibility with company tools before pushing
* Upgrade available in Self Service 30-60 days after release
* Optional for first 90 days, then becomes required
* Backup data before upgrading (use Time Machine or OneDrive)

**Note:** Do not upgrade OS via Apple/Microsoft direct channels. Use company-managed upgrades for compatibility.

## 8. Uninstalling Software

### 8.1 Standard Uninstallation

**macOS:**
1. Open **Self Service** app
2. Find installed app
3. Click "Uninstall" button
4. Or manually: Drag app from Applications to Trash

**Windows:**
1. Open **Company Portal** app
2. Go to Installed Apps
3. Click app, select "Uninstall"
4. Or manually: Settings > Apps > Apps & Features > Select app > Uninstall

### 8.2 Complete Removal (Including Settings/Cache)
Some apps leave behind configuration files and caches.

**macOS Advanced Cleanup:**
* Use AppCleaner (available in Self Service) to remove all associated files
* Or manually delete: ~/Library/Application Support/[AppName], ~/Library/Caches/[AppName]

**Windows Advanced Cleanup:**
* Use Revo Uninstaller (available in Self Service)
* Or manually: C:\Program Files\[AppName], C:\Users\[Username]\AppData\Local\[AppName]

### 8.3 Troubleshooting Uninstall Issues

**Issue: App won't uninstall (grayed out or error)**
* **Cause:** App may be running or required by system
* **Solution:**
  1. Quit app completely (check Activity Monitor/Task Manager)
  2. Restart device and try again
  3. Submit helpdesk ticket if still failing

**Issue: "You need administrator permission to uninstall"**
* **Solution:** Submit helpdesk ticket. IT will remotely uninstall or grant temporary admin rights.

## 9. Virtual Machines and Emulation

### 9.1 Approved Virtualization Tools

**Parallels Desktop (macOS):**
* Licensed for Engineering and Product teams
* Available via Self Service
* Pre-configured Windows 11 VM available (IT managed)
* Allocate at least 8GB RAM to VM

**VMware Fusion (macOS):**
* Alternative to Parallels
* Request via helpdesk with justification
* License provisioned within 3 business days

**Docker Desktop:**
* Approved for Engineering
* Available in Self Service
* Requires at least 16GB system RAM

**Windows Subsystem for Linux (WSL):**
* Approved for Engineering on Windows laptops
* Enable via: Settings > Apps > Optional Features > More Windows Features > WSL
* IT provides pre-configured Ubuntu image

### 9.2 Prohibited Emulation
* **VirtualBox:** Not approved due to licensing and support issues. Use Parallels or VMware instead.
* **QEMU:** Not supported for standard users.
* **Android emulators (BlueStacks, etc.):** Not approved except for specific testing roles.

## 10. Browser Extensions and Plugins

### 10.1 Pre-Approved Extensions
Available for all users:

**Productivity:**
* Grammarly
* LastPass/1Password (company account)
* Loom (screen recording)
* Todoist, Trello

**Security:**
* uBlock Origin (ad blocker)
* HTTPS Everywhere
* Privacy Badger

**Developer Tools:**
* React Developer Tools
* Vue.js devtools
* JSON Formatter
* Wappalyzer

### 10.2 Approval Required
Submit request for:
* Extensions accessing email or sensitive data
* Extensions from unknown developers
* Extensions requiring broad permissions ("Read and change all your data")

### 10.3 Prohibited Extensions
* VPN/proxy extensions
* Browser-based torrent clients
* Unauthorized password managers
* Extensions that inject ads or modify search results

**Policy Enforcement:** IT monitors installed extensions via endpoint management. Prohibited extensions will be auto-removed.

## 11. Mobile App Installation (Company Devices)

### 11.1 iOS (iPhone/iPad)

**App Store Access:**
* Company Apple ID provided for managed app installation
* Personal Apple ID can be used for personal apps
* Work apps managed separately from personal apps

**Required Apps (Auto-Installed):**
* Microsoft Outlook
* Microsoft Teams
* Slack
* 1Password
* Okta Verify (MFA)

**Approved for Self-Installation:**
* Any App Store app that doesn't violate company acceptable use policy
* IT cannot remotely install apps you choose personally

**Prohibited:**
* Jailbreaking device
* Installing enterprise profiles from untrusted sources

### 11.2 Android

**Play Store Access:**
* Work Profile separates work apps from personal apps
* Work apps managed via Intune/Company Portal

**Required Apps (Auto-Installed in Work Profile):**
* Outlook, Teams, Slack
* Company Portal
* Microsoft Authenticator

**BYOD:** Personal Android devices can access email/calendar but not full corporate apps.

## 12. Software Licensing and Compliance

### 12.1 License Types

**Site Licenses (Unlimited Use):**
* Microsoft Office 365
* Zoom
* Slack
* Okta

**Named-User Licenses (Limited Quantity):**
* Adobe Creative Cloud (50 licenses - Design team priority)
* Tableau Desktop (30 licenses - Data team)
* IntelliJ Ultimate (100 licenses - Engineering)

**Concurrent Licenses (Floating Pool):**
* ArcGIS (5 concurrent)
* MATLAB (10 concurrent)

**Eligibility:** If requesting named-user or concurrent license software, manager must confirm business need and priority.

### 12.2 License Reclamation
If software unused for >90 days, IT may reclaim license and reassign to another employee.

**Notifications:**
* 30 days before reclamation: Warning email
* 7 days before: Final notice
* Reclamation: License deactivated, app still installed but unlicensed

**Reactivation:** Submit helpdesk ticket if you need license restored.

### 12.3 Personal Use of Company Software
**Permitted:**
* Using Microsoft Office on company laptop for personal documents
* Using Zoom for personal calls on personal time (reasonable use)

**Not Permitted:**
* Installing company software on personal devices using company license keys
* Sharing license keys with family/friends
* Using company Adobe CC license for freelance work

**Violation:** Unauthorized license sharing may result in license termination and disciplinary action.

## 13. Frequently Asked Questions

**Q1: Can I install software from GitHub/open source repositories?**
A: Yes, if it's pre-approved (check Self Service catalog) or you obtain manager approval for new tools. Do not install random scripts or tools without vetting.

**Q2: I need software that's not in Self Service. How long does approval take?**
A: Standard requests: 5-7 business days. Requests requiring security review: 10-14 business days. Plan ahead for project needs.

**Q3: Can I use my personal Microsoft Office license instead of the company license?**
A: No. Company policy requires using company-provided Office 365 for work documents. Personal licenses lack required data protection features.

**Q4: The software I need costs $500. Will the company pay for it?**
A: Submit request via IT Service Portal with business justification. Your manager and Finance will approve if necessary for your role and within budget.

**Q5: Can I install Windows on my Mac using Boot Camp?**
A: Boot Camp is deprecated by Apple. Use Parallels Desktop instead (available in Self Service for approved roles).

**Q6: I accidentally installed prohibited software. What should I do?**
A: Uninstall it immediately and notify IT via helpdesk@company.com. If it was an honest mistake, you won't be penalized.

**Q7: Can I use VS Code plugins/extensions without approval?**
A: Yes, VS Code extensions are generally unrestricted for Engineering. However, extensions that upload code to external services (AI assistants, cloud compilers) require Security review.

**Q8: My software license expired. How do I renew?**
A: Contact IT. Renewals are typically automatic, but if manual renewal needed, submit ticket with license details.

**Q9: Can I install Steam or gaming software on my work laptop?**
A: Personal use during non-work hours is permitted. However, performance-intensive games may drain battery and shorten device lifespan. Use discretion.

**Q10: I need temporary admin rights to configure a development environment. How do I request?**
A: Use Self Service "Temporary Admin Access" option (30-minute window). If you need longer or recurring admin rights, submit justification for IT Security review.

## 14. Contact and Support

| Need | Contact Method | Response Time |
|------|---------|---------------|
| Browse Available Software | Self Service portal (Mac) or Company Portal (Windows) | Instant |
| Request New Software | helpdesk.company.com > Software Request | 5-7 business days |
| License Activation Issue | helpdesk.company.com or Slack #it-help | 4 hours |
| Installation Error | helpdesk.company.com with error message/screenshot | 24 hours |
| Security Review Question | security@company.com | 2 business days |
| Urgent Software Need (Production Issue) | Call x5500, explain urgency | 2 hours |

**Self-Help Resources:**
* Software catalog with install instructions: intranet.company.com/it/software
* Video tutorials: Available in LMS under "IT Training"
* Community support: Slack #it-help channel

## 15. Policy Updates

This policy is reviewed bi-annually and updated to reflect new software offerings, security requirements, and licensing changes.

**Last Updated:** December 1, 2024
**Next Review:** June 1, 2025
**Policy Owner:** IT Director
**Version:** 5.4

Changes will be communicated via email and Slack #it-announcements.
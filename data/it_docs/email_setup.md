# Email Configuration (Microsoft 365)

**Last Updated:** October 2023
**Platform:** Exchange Online
**Web Access:** `outlook.office.com`

## Desktop Setup

### Microsoft Outlook (Windows/Mac) - Preferred
1.  Open Outlook.
2.  If prompted, enter your email: `first.last@company.com`.
3.  Click **Connect**.
4.  **Do not** select IMAP or POP. Select **Office 365** if asked for account type.
5.  The modern login window will appear. Enter your password.
6.  Approve the MFA prompt.
7.  Restart Outlook to sync the Global Address List.



### Apple Mail (macOS)
1.  Open System Settings -> Internet Accounts.
2.  Click **Add Account** -> **Microsoft Exchange**.
3.  Name: Company Name / Email: Your Email.
4.  Click **Sign In** (Do not click "Configure Manually").
5.  This will trigger a browser popup for Modern Auth (Okta/Microsoft).

## Mobile Setup

### iOS (iPhone/iPad)
1.  Download **Microsoft Outlook** from the App Store (Highly Recommended over the native Mail app for security features).
2.  Open Outlook.
3.  Enter your email address -> **Add Account**.
4.  It will detect "Office 365". Enter password and approve MFA.
5.  **Enable Notifications:** When prompted, click Allow.

### Android
1.  Download **Microsoft Outlook** from the Play Store.
2.  Tap **Get Started**.
3.  Enter email -> Continue.
4.  Enter Password and approve MFA.
5.  **Device Admin:** You may be asked to activate "Device Administrator" or create a "Work Profile." You must accept this to sync company data. This separates your work data from personal data.



## Common Errors

### "Need Admin Approval"
**Context:** You are trying to add email to an unapproved third-party app (e.g., "Spark Mail" or "Thunderbird").
**Solution:** We restrict email access to Outlook and Native Mail apps for security. Please switch to an approved client.

### "Password Incorrect" (loop)
**Context:** You recently changed your password.
**Solution:**
1.  iOS: Go to Settings -> Mail -> Accounts -> Company -> **Delete Account**.
2.  Restart phone.
3.  Re-add the account. (Updating the password in place often fails due to cached tokens).

## 5. Advanced Configuration

### 5.1 Outlook Desktop Advanced Settings

**Cached Exchange Mode:**
* Default: Enabled (stores last 12 months locally)
* Benefit: Work offline, faster search
* Adjust: File > Account Settings > Account Settings > Change > Slide the "Mail to keep offline" slider

**Send/Receive Groups:**
* Configure how often Outlook checks for new mail
* Default: Every 30 minutes
* File > Options > Advanced > Send/Receive > Send/Receive Groups

**Mailbox Cleanup:**
* Archive old emails to reduce mailbox size (50GB quota)
* File > Info > Cleanup Tools > Archive or Mailbox Cleanup
* Or use Auto-Archive (File > Options > Advanced > AutoArchive Settings)

**Rules and Filters:**
* Automate email organization
* Home tab > Rules > Manage Rules & Alerts
* Example: Move all emails from specific sender to folder

### 5.2 Out of Office (Auto-Reply)

**Set in Outlook Desktop:**
1. File > Automatic Replies (Out of Office)
2. Select "Send automatic replies"
3. Set date range (optional)
4. Compose internal and external messages separately
5. Click OK

**Set in Outlook Web:**
1. Click settings gear > View all Outlook settings
2. Mail > Automatic replies
3. Toggle "Turn on automatic replies"
4. Set messages and date range
5. Save

**Best Practices:**
* Provide specific return date
* Include emergency contact if appropriate
* Different messages for internal vs. external
* Disable upon early return

### 5.3 Shared Mailboxes

**What are Shared Mailboxes:**
* Team email addresses (e.g., support@company.com, hr@company.com)
* Multiple people can access and respond
* No separate login required

**Access Grant:**
* Manager requests via helpdesk with justification
* IT provisions access within 24 hours

**Adding Shared Mailbox in Outlook:**
1. File > Account Settings > Account Settings
2. Select your account > Change > More Settings
3. Advanced tab > Add
4. Enter shared mailbox address
5. OK > Next > Finish
6. Shared mailbox appears in folder pane

**Sending from Shared Mailbox:**
* New email > From button (if not visible: Options > From)
* Select shared mailbox address
* Compose and send (tracks as sent by you on behalf of shared mailbox)

### 5.4 Delegation and Access Rights

**Granting Delegate Access:**
Allows someone to manage your calendar, send emails on your behalf

1. File > Account Settings > Delegate Access
2. Add > Select person
3. Choose permission levels:
   * Reviewer: Read only
   * Author: Read and create
   * Editor: Read, create, modify
4. Check "Delegate receives copies of meeting-related messages"
5. OK

**Accessing Delegated Mailbox:**
1. File > Open & Export > Other User's Folder
2. Enter name and select folder (Inbox, Calendar, etc.)
3. OK

**Use Cases:**
* Executive assistants managing executive calendars
* Managers reviewing team member's calendar for scheduling
* Backup coverage during vacation

## 6. Calendar Best Practices

### 6.1 Creating Effective Meetings

**Required Fields:**
* Clear subject line
* Required vs. Optional attendees
* Location (physical room or Zoom link)
* Agenda in body
* Attach relevant documents

**Scheduling Assistant:**
* Home > New Meeting > Scheduling Assistant
* Shows attendees' availability
* Suggests optimal times
* Finds conference rooms

**Teams Meeting Integration:**
* In meeting invite, click "Teams Meeting" button
* Auto-generates Zoom/Teams link and dial-in
* Appears in meeting body

### 6.2 Calendar Sharing

**Share with Specific People:**
1. Calendar > Share > Share Calendar
2. Enter name
3. Choose permission level:
   * Can view when I'm busy
   * Can view titles and locations
   * Can view all details
   * Can edit
4. Send

**Viewing Shared Calendars:**
* Shared calendars appear in "People's Calendars" section
* Overlay multiple calendars to find free time
* Right-click calendar name > Change color for distinction

### 6.3 Calendar Categories and Color Coding

**Create Categories:**
1. Home > Categorize > All Categories
2. New > Name category and choose color
3. Examples: "Customer Meetings," "1:1s," "Focus Time," "Personal"

**Apply to Events:**
* Select event > Home > Categorize > Choose category
* Event displays in assigned color

**Search by Category:**
* Search box: category:"Customer Meetings"
* Or use Filter > Categories

### 6.4 Working Hours and Time Zones

**Set Working Hours:**
* File > Options > Calendar > Work time
* Define work week and hours
* Affects Scheduling Assistant availability

**Time Zones:**
* Traveling across zones? Add second time zone
* File > Options > Calendar > Time zones
* Check "Show a second time zone"
* Useful for coordinating with global teams

## 7. Troubleshooting Common Issues

### 7.1 Emails Not Syncing

**Symptoms:** New emails not appearing, sent emails missing, calendar events not updating

**Solutions:**
1. **Check Internet Connection:** Ensure stable connection
2. **Manual Send/Receive:** Outlook Desktop: F9 or Send/Receive > Send/Receive All Folders
3. **Check Offline Mode:** Bottom status bar - if says "Offline," click to reconnect
4. **Restart Outlook:** Close completely (check Task Manager) and reopen
5. **Clear Cache (Mobile):** iOS: Settings > Outlook > Reset Account. Android: App Settings > Clear Cache
6. **Check Mailbox Full:** If >50GB, archive old emails
7. **Submit Ticket:** If still failing after above steps

### 7.2 Search Not Finding Emails

**Outlook Desktop:**
* Rebuild Search Index: File > Options > Search > Indexing Options > Advanced > Rebuild
* Takes 1-2 hours for large mailboxes, run overnight

**Outlook Web:**
* Clear browser cache: Ctrl+Shift+Delete > Clear all
* Try incognito/private window
* Use Advanced Search filters (From, Subject, Has Attachments)

**Outlook Mobile:**
* Search limited to recent emails and synced folders
* For older emails, use desktop or web

### 7.3 Outlook Running Slow

**Causes:**
* Large mailbox (>20GB)
* Too many add-ins
* Corrupted OST file
* Antivirus scanning PST/OST files

**Solutions:**
1. **Archive Old Emails:** Reduce mailbox size to <10GB for optimal performance
2. **Disable Add-ins:** File > Options > Add-ins > Manage COM Add-ins > Uncheck unused
3. **Compact OST:** File > Account Settings > Data Files > Settings > Advanced > Outlook Data File Settings > Compact Now
4. **Exclude from Antivirus:** Add C:\Users\[Username]\AppData\Local\Microsoft\Outlook to antivirus exclusions (IT can do this remotely)
5. **Recreate Profile:** Last resort - IT will recreate Outlook profile if corruption suspected

### 7.4 Meeting Invites Not Sending/Receiving

**Can't Send Invites:**
* Check you have calendar permissions (not in read-only mode)
* Verify attendee email addresses are correct
* Try Send/Receive All Folders (F9)
* Check Outbox for stuck messages

**Not Receiving Invites:**
* Check Junk Email folder
* Check Calendar > View Settings > Filter for hidden categories
* Verify sender not blocked
* Check with IT if mail flow rules blocking

### 7.5 Cannot Access on Mobile After Password Change

**iOS:**
1. Settings > Passwords > AutoFill Passwords > Find Outlook
2. Delete saved credential
3. Open Outlook app > It will re-prompt for password

**Android:**
1. System Settings > Accounts > Company account > Remove
2. Reopen Outlook app > Add account again

**Alternatively:** Delete and reinstall Outlook app (won't lose data, stored server-side)

## 8. Security and Compliance

### 8.1 Email Encryption

**When to Encrypt:**
* Sending PII (Social Security Numbers, medical records)
* Financial data (credit card numbers, bank accounts)
* Legal documents with confidential info
* HR documents (salaries, disciplinary actions)

**How to Encrypt (Outlook Desktop):**
1. Compose email
2. Options tab > Encrypt > Encrypt-Only (recipient can read but not forward)
3. Or: Encrypt and Prevent Forwarding
4. Send

**Recipient Experience:**
* Receives secure link instead of direct email
* Clicks link > Verifies identity > Reads message
* Message expires after 90 days

### 8.2 Data Loss Prevention (DLP)

**Automated Protection:**
* Company DLP policies scan outgoing emails
* Triggers on: Credit cards, SSNs, keywords like "confidential" + attachments
* Policy Tip appears if violation detected

**What Happens:**
* Warning: Email allowed but logged for audit
* Block: Email not sent, notification to you and your manager
* Encrypt: Email auto-encrypted before sending

**If Blocked:**
1. Review email content - remove sensitive data or use approved sharing method
2. Or justify and request exception via IT ticket

### 8.3 Phishing and Spam

**Identifying Phishing:**
* Sender address doesn't match company domain (e.g., first.last@company-secure.com instead of @company.com)
* Urgent requests for password, credentials, or money
* Unexpected attachments or links
* Grammatical errors and generic greetings

**Report Phishing:**
* Outlook: Select email > Home > Report > Report Phishing
* Do not click links or download attachments
* Do not reply or forward

**What Happens:**
* Email sent to Security team for analysis
* If confirmed phishing, sender blocked globally
* Company-wide alert if widespread campaign

**I Clicked a Phishing Link:**
1. Immediately report to security@company.com
2. Change your password via https://account.company.com
3. Watch for unusual account activity
4. Security may reset your account and scan your device

### 8.4 Email Retention and Legal Hold

**Retention Policy:**
* Inbox/Sent: Retained for 7 years, then auto-deleted
* Deleted Items: Purged after 30 days, recoverable via "Recover Deleted Items"
* Archive: Permanent storage (use for long-term keep)

**Legal Hold:**
* If involved in litigation or investigation, Legal places account on hold
* All emails preserved indefinitely, cannot be permanently deleted
* You'll be notified if this applies to you

**Personal Responsibility:**
* Do not delete emails during ongoing legal matters
* Preserve relevant communications per Document Retention Policy
* Forward to Legal if requested

## 9. Best Practices and Tips

### 9.1 Inbox Zero Strategy

**Triage Method:**
* Delete: Spam, FYI emails you don't need
* Delegate: Forward with request for someone else to handle
* Defer: Move to "Follow Up" folder, schedule time to address
* Do: If takes <2 minutes, handle immediately

**Folders vs. Search:**
* Modern approach: Use Search instead of complex folder structures
* Create only key folders: "Action Required," "Waiting For," "Reference"
* Use Categories and Flags for organization

**Email Rules:**
* Auto-file newsletters to "Reading" folder
* Auto-flag emails from your manager
* Auto-categorize emails by project name (if subject contains "[Project X]")

### 9.2 Email Etiquette

**Subject Lines:**
* Clear and descriptive
* Include action needed: "URGENT," "FYI," "ACTION REQUIRED"
* Update subject if topic changes during thread

**Reply vs. Reply All:**
* Reply All only if all recipients need your response
* Avoid accidental "Reply All" storms (don't feed them - just delete)

**Attachments:**
* Keep <10MB (OneDrive link for larger files)
* Name files clearly (not "Document1.pdf")
* Mention attachments in email body

**Response Time:**
* Internal emails: Respond within 24 hours
* Customer emails: Acknowledge within 4 hours (even if full answer takes longer)
* Use Out of Office for extended unavailability

**Tone:**
* Reread before sending (especially if emotional topic)
* Assume positive intent when reading others' emails (tone is hard in text)
* Use video call for complex or sensitive topics

### 9.3 Managing Email Overload

**Reduce Inbound:**
* Unsubscribe from unnecessary newsletters
* Ask to be removed from FYI-only email lists
* Set up filters for low-priority automated emails

**Batching:**
* Process email in dedicated time blocks (9am, 1pm, 4pm) instead of constant monitoring
* Turn off notifications during focus work

**Delegate:**
* Forward emails outside your area to appropriate person
* Create team shared mailboxes for group responsibilities

**Templates:**
* Use Quick Parts for frequently sent responses
* Insert > Quick Parts > Save Selection to Quick Part Gallery

## 10. Email Signatures

### 10.1 Setting Up Signature

**Outlook Desktop:**
1. File > Options > Mail > Signatures
2. New > Name your signature
3. Compose signature:
   * Full Name
   * Title
   * Department
   * Phone (optional: mobile if customer-facing)
   * Company logo (if provided by Marketing)
4. Choose which account to use signature with
5. Set defaults for new emails and replies

**Outlook Web:**
1. Settings gear > View all Outlook settings
2. Compose and reply > Email signature
3. Create signature
4. Toggle "Include signature on new messages"
5. Save

**Outlook Mobile:**
* Settings > Signature
* Compose signature (keep brief for mobile - name and title sufficient)

### 10.2 Signature Guidelines

**Required Elements:**
* Full name
* Job title
* Direct phone number (if customer-facing role)

**Optional Elements:**
* Preferred pronouns (e.g., She/Her, He/Him, They/Them)
* LinkedIn profile link
* Department or team name

**Prohibited:**
* Inspirational quotes
* Political statements or endorsements
* Large images or logos (unless official company logo)
* Links to personal businesses or social media (non-professional)

**Formatting:**
* Keep under 6 lines
* Use company fonts and colors (see Brand Guidelines)
* Test on mobile - avoid complex HTML

**Example:**
```
Jane Smith
Senior Software Engineer | Product Team
jane.smith@company.com | +1 (555) 123-4567
[Company Logo]
```

## 11. Distribution Lists and Groups

### 11.1 Types of Groups

**Distribution Lists (DLs):**
* Email-only lists (e.g., all-engineers@company.com)
* Cannot be used for permissions/file sharing
* Managed by IT

**Microsoft 365 Groups:**
* Include shared mailbox, calendar, files, and Teams workspace
* Used for project teams and departments
* Members can manage themselves (if owner-approved)

**Security Groups:**
* Used for permissions (file access, app access)
* Cannot be emailed directly
* IT-managed only

### 11.2 Requesting Group Creation/Modifications

**Submit Helpdesk Ticket:**
* Group name (e.g., finance-team@company.com)
* Purpose
* Initial members
* Who should own/manage (can add/remove members)
* Public or private

**Approval Required From:**
* Your manager (confirms business need)
* IT Security (if group has sensitive data access)

**Processing Time:** 2-3 business days

### 11.3 Managing Groups You Own

**Add/Remove Members:**
* Outlook Web > People > Groups > [Your Group] > Members > Add/Remove

**Change Settings:**
* Who can send to group (anyone, only members, only specific people)
* Subscribe all members (everyone receives every email) vs. individual subscription
* Allow external senders (be cautious - can invite spam)

## 12. Frequently Asked Questions

**Q1: Why does my Outlook keep asking for password?**
A: Usually cached credential issue. Try: Credential Manager (Windows) > Remove Outlook credentials > Restart Outlook. Or on Mac: Keychain Access > Delete Outlook entries.

**Q2: Can I forward my company email to Gmail?**
A: No. Forwarding to external accounts is blocked for security and compliance. Use Outlook mobile app to access on personal devices.

**Q3: I deleted an important email. Can I recover it?**
A: Yes, if within 30 days. Deleted Items folder > Recover Deleted Items from Server (at top). After 30 days, contact IT - may be recoverable from backup.

**Q4: Why can't I recall a sent email?**
A: Recall only works if recipient hasn't opened email AND is on same Exchange server (internal only). Even then, not reliable. Double-check emails before sending.

**Q5: How do I create an email template?**
A: Compose email > File > Save As > Outlook Template (.oft). To use: Home > New Items > More Items > Choose Form > User Templates in File System.

**Q6: Outlook says my mailbox is almost full. What do I do?**
A: Archive old emails or delete unnecessary ones. Your quota is 50GB. Use Mailbox Cleanup tool (File > Info > Cleanup Tools).

**Q7: Can I access my email from public computers?**
A: Yes, use Outlook Web (outlook.office.com) and sign out when done. Avoid on untrusted public computers. Don't save password.

**Q8: Why do some emails go to Junk even though they're legitimate?**
A: Right-click email > Junk > Never Block Sender. Also add to Safe Senders list in Junk Email settings.

**Q9: How do I add my calendar to my phone's native calendar app?**
A: Not recommended - use Outlook mobile app instead for better sync and security. Native calendar apps don't support all corporate features.

**Q10: Can I schedule an email to send later?**
A: Yes. Outlook Desktop: Options > Delay Delivery > Do not deliver before [date/time]. Outlook Web: Send dropdown > Schedule send.

## 13. Contact and Support

| Need | Contact Method | Response Time |
|------|---------|---------------|
| Email Setup Help | helpdesk.company.com | 4 hours |
| Cannot Access Email | Call x5500 (urgent) or Slack #it-help | 1 hour |
| Shared Mailbox Request | helpdesk.company.com > Email Services | 24 hours |
| Group/DL Changes | helpdesk.company.com > Email Services | 48 hours |
| Phishing Report | Outlook "Report Message" button | Immediate (auto-processed) |
| Email Encryption Question | security@company.com | 24 hours |

**Service Desk Hours:** Monday-Friday 6 AM - 8 PM ET; Weekend support for urgent issues only.

## 14. Policy Updates

This guide is reviewed quarterly and updated to reflect system changes, new features, and best practices.

**Last Updated:** December 1, 2024
**Next Review:** March 1, 2025
**Version:** 4.1
**Maintained By:** IT Communications Team

Check the IT Portal (intranet.company.com/it/email) for the latest version and video tutorials.
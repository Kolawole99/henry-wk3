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
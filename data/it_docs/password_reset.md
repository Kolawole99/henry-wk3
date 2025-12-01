# Password Reset Procedures

**Last Updated:** November 1, 2023
**Identity Provider:** Okta / Active Directory
**Password Policy:** Minimum 14 characters, requires complexity.

## Self-Service Password Reset (SSPR)
If you have forgotten your password or your account is locked, you do not need to call the helpdesk.



[Image of password reset workflow diagram]


### Steps to Reset
1.  Navigate to `https://account.company.com/reset`.
2.  Enter your **Employee ID** or **Email Address**.
3.  **Verification:**
    * Select "Send SMS" to receive a code on your registered mobile.
    * *OR* Select "Push" to verify via the Authenticator App.
4.  **Create New Password:**
    * Must not contain your name.
    * Must not be one of your last 5 passwords.
5.  **Confirmation:** You will receive an email confirmation upon success.

### Unlocking Your Account
If you know your password but are locked out due to too many failed attempts:
1.  Go to the link above.
2.  Select the **"Unlock Account"** button (below the Reset button).
3.  Verify via MFA.
4.  Wait 60 seconds before attempting to log in again.

## Changing a Known Password
1.  Log in to the **MyApps Dashboard** (`myapps.company.com`).
2.  Click your profile avatar in the top right -> **Settings**.
3.  Under "Security Methods," click **Change Password**.
4.  Enter current password, then the new password twice.

## Troubleshooting

### "We could not verify your identity"
**Cause:** You did not set up a recovery phone number or secondary email during onboarding.
**Solution:** You must call the Service Desk at **x5500** (or 555-0199) for a manual identity verification (Manager verification required).

### Mac Keychain Issues
After changing your password, your Mac may keep asking for the "login keychain" password.
**Fix:**
1.  Open **Keychain Access** (Cmd+Space -> type Keychain).
2.  Right-click "login" in the top left -> **Change Password for Keychain "login"**.
3.  **Old Password:** Your *previous* password.
4.  **New Password:** Your *new* password.
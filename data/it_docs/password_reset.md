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

### Password Not Accepted After Reset
**Cause:** The password change may not have fully synchronized across all systems yet.
**Solution:**
1.  Wait 5-10 minutes for full directory synchronization.
2.  Clear browser cache and cookies.
3.  Try logging in from a different device to confirm the new password works.
4.  If still failing after 15 minutes, call Service Desk at x5500.

### SMS Code Not Received
**Cause:** Phone number not updated in system or carrier delays.
**Solution:**
1.  Check that your mobile number is correct in MyApps Dashboard -> Profile Settings.
2.  Wait 2-3 minutes (some carriers have delays).
3.  Try the "Resend Code" option (maximum 3 attempts).
4.  If still not receiving, use the "Push" notification method instead.
5.  If both methods fail, contact Service Desk for manual verification.

### Browser Shows "Session Expired" Error
**Cause:** Password reset token expired (valid for only 15 minutes).
**Solution:**
1.  Close the browser completely.
2.  Reopen and start the password reset process from the beginning.
3.  Complete all steps within 15 minutes.

### Error: "Password Does Not Meet Complexity Requirements"
**Cause:** New password does not meet the minimum security standards.
**Solution:** Ensure your password includes:
- Minimum 14 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)
- Cannot contain your first name, last name, or username
- Cannot be a commonly used password (e.g., Password123!)
- Cannot be one of your last 5 passwords

### Account Still Locked After Reset
**Cause:** Multiple systems may have different lock states.
**Solution:**
1.  After unlocking, wait a full 60 seconds before attempting login.
2.  Ensure you're using the NEW password, not the old one.
3.  If locked again, you may have cached credentials trying to authenticate automatically.
4.  On Windows: Go to Control Panel -> Credential Manager -> Remove all company-related credentials.
5.  On Mac: Go to Keychain Access -> Delete all company entries.
6.  Restart your computer and try again.

## Advanced Password Management

### Password Expiration Policy
- Passwords expire every **90 days**.
- You will receive email reminders starting **14 days** before expiration.
- Final reminder comes **3 days** before expiration.
- If password expires without being changed, account will be locked.
- Locked accounts from expiration can be unlocked through SSPR.

### Password Change Best Practices
1.  **Create Strong Passwords:** Use a passphrase method (e.g., "SummerVacation2024!Beach@Sunset")
2.  **Use a Password Manager:** Company-approved: 1Password, LastPass Enterprise
3.  **Never Share Passwords:** Including with IT staff (legitimate IT will never ask)
4.  **Don't Write Down Passwords:** Especially on sticky notes or unencrypted files
5.  **Use Unique Passwords:** Never reuse your work password on personal accounts

### Password Manager Integration
If you use 1Password or LastPass:
1.  After changing password through SSPR, immediately update it in your password manager.
2.  Configure your password manager to remind you 7 days before the 90-day expiration.
3.  IT recommends generating 16-20 character passwords through the password manager.

## Mobile Device Password Sync

### iOS Devices (iPhone/iPad)
After changing your password, you need to update it on your mobile devices:
1.  Go to **Settings -> Mail -> Accounts**.
2.  Tap your company email account.
3.  Enter the new password.
4.  Go to **Settings -> [Your Name] -> Password & Security**.
5.  Update company app passwords if using MDM (MobileIron/Intune).

### Android Devices
1.  Open **Settings -> Accounts -> Company Account**.
2.  Remove the account completely.
3.  Re-add the account using the new password.
4.  Company apps will re-authenticate automatically.

## Common Scenarios & Solutions

### Scenario 1: First Day at Company
**Situation:** New employee receiving temporary password from IT.
**Steps:**
1.  Use temporary password to log in to MyApps Dashboard.
2.  System will force password change on first login.
3.  Set up MFA (Okta Verify app) immediately after password change.
4.  Test access to email, VPN, and other core systems.

### Scenario 2: Returning from Extended Leave
**Situation:** Password expired during leave (vacation, medical, parental).
**Steps:**
1.  Use SSPR portal - your account may be locked due to expiration.
2.  If MFA device was wiped/returned, call Service Desk for identity verification.
3.  Manager may need to verify your identity via email or phone.

### Scenario 3: Laptop Stolen or Lost
**Situation:** Need to change password immediately for security.
**Steps:**
1.  From any device, go to the SSPR portal immediately.
2.  Change password using normal process.
3.  Call Service Desk at x5500 to report device loss (triggers remote wipe).
4.  Security team will verify that no unauthorized access occurred.

### Scenario 4: Suspicious Account Activity
**Situation:** Received unexpected MFA push notification or password reset email.
**Steps:**
1.  DO NOT approve any MFA push you didn't initiate.
2.  Immediately change your password through SSPR.
3.  Contact Security team at security@company.com.
4.  Review recent account activity in MyApps Dashboard -> Security -> Recent Activity.

### Scenario 5: Working from Location with Limited Internet
**Situation:** Traveling with poor connectivity, need to reset password.
**Steps:**
1.  Use SMS code method (lower bandwidth than push notifications).
2.  If possible, wait until you have stable connection.
3.  As backup, call Service Desk and request manual reset over phone with manager verification.

## Frequently Asked Questions (FAQ)

**Q1: How often do I need to change my password?**
A: Every 90 days. System will force change if you don't update it proactively.

**Q2: Can I use the same password with different numbers at the end?**
A: No. Password123, Password124, Password125 are all blocked. System checks for patterns.

**Q3: What if I'm locked out and don't have my phone for MFA?**
A: Call Service Desk at x5500 with manager verification, or use backup codes (if you saved them during MFA setup).

**Q4: Can I disable MFA on my account?**
A: No. Multi-factor authentication is mandatory for all employees per security policy.

**Q5: Why does my password work on email but not VPN?**
A: There may be a synchronization delay (5-10 minutes). Wait and retry. If persists beyond 15 minutes, call Service Desk.

**Q6: I changed my password but Outlook keeps asking for the old one.**
A: Windows credentials are cached. Go to Control Panel -> Credential Manager -> Windows Credentials -> Remove Microsoft Office entries. Restart Outlook.

**Q7: Can someone from IT reset my password for me?**
A: Yes, but only with proper identity verification (manager confirmation). SSPR is faster.

**Q8: What happens if I enter the wrong password too many times?**
A: Account locks after 5 failed attempts. Automatic unlock after 30 minutes, or use SSPR to unlock immediately.

**Q9: Are there any passwords I should never use?**
A: Never use: company name, "Password", seasons with years (Summer2024), sequential numbers (123456), or keyboard patterns (qwerty).

**Q10: Can I write down my password in a secure location?**
A: Only if it's stored in a locked safe/cabinet at home. Never at your desk or in your bag.

**Q11: What if I forget my password while on VPN?**
A: Disconnect from VPN first, then use SSPR portal over regular internet. Once reset, reconnect to VPN with new password.

**Q12: Do contractors and vendors follow the same process?**
A: Yes, same SSPR process. However, contractors may have different password expiration policies (typically 60 days).

**Q13: Can I use biometrics instead of typing my password?**
A: On company-managed devices, Windows Hello or Touch ID can be enabled. Contact IT Support for setup.

**Q14: What happens to my password if I change departments?**
A: Password remains the same. Only access permissions change. You may receive new MFA token if moving to highly privileged role.

**Q15: How do I know if a password reset email is legitimate or phishing?**
A: Legitimate emails come from noreply@company.com and never ask for your password. Always go directly to https://account.company.com/reset rather than clicking email links if unsure.

## Emergency Contacts & Resources

### Service Desk
- **Internal Extension:** x5500
- **External Number:** (555) 0199
- **Email:** servicedesk@company.com
- **Hours:** Monday-Friday, 7:00 AM - 7:00 PM Eastern Time
- **After-Hours:** Emergency line available for critical lockouts

### Self-Service Portal
- **Main Portal:** https://account.company.com/reset
- **Mobile-Friendly:** Yes
- **Supported Browsers:** Chrome, Firefox, Safari, Edge (latest versions)

### Security Team (for suspicious activity)
- **Email:** security@company.com
- **Phone:** x5599
- **24/7 Emergency:** (555) 0155

### Additional Resources
- **Knowledge Base:** https://kb.company.com/passwords
- **Video Tutorial:** https://training.company.com/password-reset
- **MFA Setup Guide:** https://kb.company.com/mfa-setup
- **Password Manager Guide:** https://kb.company.com/password-managers

## Compliance & Audit Notes

### Password History
The system maintains a history of your last 5 passwords to prevent reuse. Password patterns are also analyzed to prevent simple variations.

### Failed Login Monitoring
All failed login attempts are logged and monitored by the Security team. Unusual patterns (attempts from foreign countries, excessive failures) trigger automatic alerts.

### Password Storage
Passwords are encrypted using industry-standard AES-256 encryption and salted hashing (bcrypt). IT staff cannot view your actual password.

### Regulatory Compliance
This password policy complies with:
- SOC 2 Type II requirements
- GDPR data protection standards
- NIST 800-63B authentication guidelines
- Industry-specific regulations (HIPAA, PCI-DSS where applicable)

---
**Document Version:** 2.1
**Last Reviewed:** November 1, 2023
**Next Review:** February 1, 2024
**Policy Owner:** IT Security Team
**Approval:** Chief Information Security Officer (CISO)
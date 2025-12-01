# VPN Setup Guide: Cisco AnyConnect

**Last Updated:** October 24, 2023
**VPN Provider:** Cisco AnyConnect Secure Mobility Client
**Server Address:** `vpn.company.com`

## Overview
The Corporate VPN allows you to access internal resources (Intranet, File Servers, Jira, Licensing Servers) securely from home or public Wi-Fi.


## System Requirements
- **Windows:** Windows 10 (21H2) or Windows 11
- **macOS:** Monterey (12.0) or newer
- **Internet Speed:** Minimum 15 Mbps download / 5 Mbps upload

## Installation Instructions

### Windows 10/11
1.  **Download:** Go to `https://remote.company.com` and log in with your SSO credentials.
2.  **Install:** Click "Download for Windows." Run the `anyconnect-win-setup.exe` file.
3.  **Setup:**
    * Accept the EULA.
    * Uncheck "Lockdown Manager" (if visible).
    * Click **Install** (You will need Admin rights).
4.  **Launch:** Search for "Cisco AnyConnect" in the Start Menu.

### macOS
1.  **Download:** Go to `https://remote.company.com`.
2.  **Install:** Open the `.dmg` file and run `AnyConnect.pkg`.
3.  **Permissions (Crucial Step):**
    * During installation, macOS will alert you that a "System Extension" was blocked.
    * Go to **System Settings > Privacy & Security**.
    * Click **Allow** next to "Cisco Systems."
    * 

## How to Connect
1.  Open the **Cisco AnyConnect** client.
2.  In the server box, type: `vpn.company.com` and click **Connect**.
3.  **Authentication:**
    * **Group:** Select `General-Users` (unless assigned to `Engineering-Static`).
    * **Username:** Your full email address.
    * **Password:** Your Okta/Network password.
4.  **Second Factor:** You will receive a push notification to your Okta Verify or MS Authenticator app. Approve it.
5.  **Verification:** look for the circular padlock icon in your system tray (Windows) or menu bar (Mac) with a green checkmark.



## Troubleshooting

### Error: "Connection attempt has failed"
**Cause:** Internet instability or firewall blocking.
**Fix:**
1.  Disconnect from your Wi-Fi and reconnect.
2.  If on a public network (hotel/cafe), try connecting to your phone's hotspot to rule out the venue's firewall.

### Error: "Untrusted Server Certificate"
**Cause:** Your client is out of date.
**Fix:** Open "Company Self Service" portal and run the "Update AnyConnect" policy.

### Error: "Login Denied" repeatedly
**Cause:** Account locked due to too many failed attempts.
**Fix:** Wait 15 minutes for auto-unlock, or use the Password Reset Portal to unlock immediately.

### Speed Issues
**Note:** We use **Split Tunneling**. Only traffic destined for company servers (Intranet, Jira, AWS Internal) goes through the VPN. Your Zoom calls and Netflix traffic go directly to the internet to preserve speed.
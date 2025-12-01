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

### Error: "VPN Client is not installed properly"
**Cause:** Installation was interrupted or files are corrupted.
**Fix:**
1.  Uninstall AnyConnect completely (Windows: Add/Remove Programs, Mac: Drag to Trash).
2.  Restart your computer.
3.  Reinstall from https://remote.company.com.
4.  If issue persists, manually remove leftover files:
    - Windows: `C:\Program Files (x86)\Cisco\Cisco AnyConnect`
    - Mac: `/opt/cisco/anyconnect`

### Connection Drops Frequently
**Cause:** Network instability or power saving settings.
**Fix:**
1.  **Windows:** Disable network adapter power saving:
    - Device Manager -> Network Adapters -> Right-click your adapter -> Properties
    - Power Management tab -> Uncheck "Allow computer to turn off this device"
2.  **Mac:** Prevent sleep while connected:
    - System Settings -> Battery -> Prevent automatic sleeping on power adapter
3.  Check if antivirus/firewall is blocking VPN packets.
4.  Try switching from Wi-Fi to Ethernet if available.

### Error: "Cannot Connect to VPN Server"
**Cause:** Firewall blocking outbound VPN ports (UDP 443/TCP 443).
**Fix:**
1.  If on corporate network, ensure you're not already "inside" the network (VPN not needed).
2.  If on public Wi-Fi (hotel, airport), they may block VPN. Try:
    - Using mobile hotspot as alternative
    - Switching to TCP protocol instead of UDP in AnyConnect preferences
3.  Contact network administrator if consistently blocked.

### Error: "AnyConnect Host Scan Failed"
**Cause:** Security posture check failed (outdated OS, missing antivirus).
**Fix:**
1.  Update your operating system to the latest version.
2.  Ensure company-approved antivirus (CrowdStrike, Windows Defender) is running.
3.  Remove unauthorized VPN or security software.
4.  If all updated and still failing, contact IT Security team.

### Cannot Access Specific Internal Resources While Connected
**Cause:** DNS resolution issues or routing table problems.
**Fix:**
1.  Open Command Prompt (Windows) or Terminal (Mac).
2.  Run: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
3.  Disconnect and reconnect VPN.
4.  Test accessing resource by IP address instead of hostname.
5.  If works by IP but not hostname, contact Service Desk to update DNS settings.

### Mac "System Extension Blocked" Won't Clear
**Cause:** Security settings not refreshed after allowing extension.
**Fix:**
1.  Go to System Settings -> Privacy & Security.
2.  Click **Allow** next to Cisco Systems.
3.  Restart your Mac completely (not just logout).
4.  If still blocked: Boot into Recovery Mode (Cmd+R on startup) -> Utilities -> Terminal:
    ```
    spctl kext-consent add VK5DFR2DTL
    ```
5.  Reboot normally and reinstall AnyConnect.

## Advanced Configuration

### VPN Groups Explained
The company maintains separate VPN groups for different use cases:

| Group Name | Purpose | Who Should Use |
|------------|---------|----------------|
| General-Users | Standard access to email, intranet, file servers | Most employees |
| Engineering-Static | Static IP assignment for server access | Developers, DevOps |
| Finance-Restricted | Access to financial systems only | Finance team |
| Remote-Contractors | Limited access with additional logging | External contractors |
| Mobile-Workers | Optimized for cellular connections | Field sales, executives |

**How to Change Groups:**
1.  Disconnect from VPN.
2.  In AnyConnect, click the gear icon -> Preferences.
3.  Under "Default Group," select your assigned group.
4.  If your desired group isn't listed, contact IT to add you to that group.

### Split Tunneling Configuration
By default, only company traffic goes through VPN. To verify or modify:

1.  **Check Current Configuration:**
    - Windows: Open PowerShell and run: `Get-VpnConnection | Select-Object SplitTunneling`
    - Mac: Click AnyConnect icon -> Statistics -> Route Details
2.  **Company Routes (Always Tunneled):**
    - 10.0.0.0/8 (Internal network)
    - 172.16.0.0/12 (Private cloud)
    - intranet.company.com
    - *.company.internal

**Note:** Users cannot disable split tunneling. Full tunnel mode is only available with CISO approval for specific compliance requirements.

### Using VPN on Mobile Devices

#### iOS Setup (iPhone/iPad)
1.  Download **Cisco Secure Client** from the App Store (not AnyConnect - name changed).
2.  Open app and tap "Connections" -> Add VPN Connection.
3.  **Description:** Company VPN
4.  **Server Address:** vpn.company.com
5.  Tap Connect, enter credentials and approve MFA.
6.  Enable "Connect On Demand" for automatic connection to internal resources.

#### Android Setup
1.  Download **Cisco Secure Client** from Google Play Store.
2.  Open app -> Accept permissions for notifications.
3.  Tap + icon -> Add VPN Connection.
4.  **Server:** vpn.company.com
5.  **Group:** Mobile-Workers (pre-selected for mobile clients)
6.  Connect and authenticate.

### VPN on Linux (Ubuntu/Fedora)
Official AnyConnect client is available for major Linux distributions:

1.  **Download:**
    ```bash
    wget https://remote.company.com/linux/anyconnect-linux64.tar.gz
    ```
2.  **Extract and Install:**
    ```bash
    tar -xzvf anyconnect-linux64.tar.gz
    cd anyconnect-linux64
    sudo ./vpn_install.sh
    ```
3.  **Connect via CLI:**
    ```bash
    /opt/cisco/anyconnect/bin/vpn connect vpn.company.com
    ```
4.  Enter username, password, and select group when prompted.

**Alternative:** Use OpenConnect (open-source client):
```bash
sudo apt install openconnect
sudo openconnect vpn.company.com
```

## Best Practices

### When to Use VPN
**Required:**
- Accessing internal file servers or databases
- Using internal web applications (Jira, Confluence, GitLab)
- Checking payroll or HR systems
- Working with confidential customer data
- Connecting to development/staging environments

**Not Required:**
- Checking company email (Office 365 is cloud-based)
- Attending Zoom/Teams meetings
- Accessing SaaS tools (Salesforce, Slack, etc.)
- Browsing public internet
- Streaming services (Netflix, YouTube)

### Security Recommendations
1.  **Always Disconnect When Not Needed:** Reduces load on VPN infrastructure.
2.  **Don't Share VPN Credentials:** Each employee must use their own account.
3.  **Avoid Public Computers:** Never install AnyConnect on shared/public computers.
4.  **Keep Software Updated:** Check for updates monthly through Company Self Service.
5.  **Report Suspicious Activity:** If you receive unexpected VPN disconnections or login attempts, contact Security.

### Performance Optimization
1.  **Use Wired Connection When Possible:** Ethernet provides more stable connection than Wi-Fi.
2.  **Close Unnecessary Applications:** Bandwidth-heavy apps can slow VPN performance.
3.  **Choose Nearest VPN Server:** If you have multiple server options, choose geographically closest:
    - US East: vpn-east.company.com
    - US West: vpn-west.company.com
    - Europe: vpn-eu.company.com
    - Asia Pacific: vpn-apac.company.com
4.  **Check Your Internet Speed:** VPN performance limited by your base internet speed. Minimum 15 Mbps recommended.

## Frequently Asked Questions (FAQ)

**Q1: Can I use VPN on multiple devices simultaneously?**
A: Yes, you can connect up to 3 devices at once (laptop, phone, tablet). Fourth connection will disconnect the oldest session.

**Q2: Does VPN work internationally?**
A: Yes, VPN works from any country. However, some countries (China, UAE) may block VPN protocols. Contact IT before traveling to restricted regions.

**Q3: Why does VPN automatically disconnect after a few hours?**
A: Sessions timeout after 12 hours of inactivity. Active use extends the session indefinitely.

**Q4: Can I use personal VPN alongside company VPN?**
A: No. Running two VPNs simultaneously creates routing conflicts. Disconnect personal VPN before connecting to company VPN.

**Q5: What do I do if VPN is down company-wide?**
A: Check status page at https://status.company.com. IT will post updates. Most cloud services (email, Slack) remain accessible without VPN.

**Q6: Why does my VPN speed seem slower than my internet speed?**
A: VPN adds encryption overhead (typically 10-20% speed reduction). Also limited by VPN server capacity during peak hours.

**Q7: Can I use AnyConnect on a personal computer?**
A: Yes, but personal devices must meet minimum security requirements (updated OS, antivirus). IT may require device registration.

**Q8: What's the difference between AnyConnect and Cisco Secure Client?**
A: Same product, rebranded in 2023. Both names refer to the same application.

**Q9: Why do I need VPN if I have cloud email and tools?**
A: VPN is needed for legacy on-premise systems, internal databases, file servers, and secure development environments not yet migrated to cloud.

**Q10: Can contractors and external partners use VPN?**
A: Yes, with proper approval. They're assigned to the "Remote-Contractors" group with limited access and enhanced logging.

**Q11: What happens if I forget to disconnect VPN?**
A: VPN will auto-disconnect after 12 hours of idle time. Laptops going to sleep maintain connection and reconnect on wake.

**Q12: Why does my battery drain faster when connected to VPN?**
A: Encryption/decryption uses CPU resources. On laptops, expect 10-15% faster battery drain while connected.

**Q13: Can I access VPN from a coffee shop or public Wi-Fi?**
A: Yes, that's a common use case. VPN encrypts your traffic, protecting it from eavesdropping on public networks.

**Q14: Does VPN protect me from viruses and malware?**
A: No. VPN encrypts traffic but doesn't scan for malware. You still need antivirus software (CrowdStrike) running.

**Q15: Who can I contact for VPN issues at 2 AM?**
A: Call after-hours support at +1-800-555-0199. Available 24/7 for critical access issues.

## Known Limitations

### Platform-Specific Issues
**Windows 11 (Version 22H2):**
- AnyConnect may show "Unknown" status on first connection. Disconnect and reconnect to resolve.

**macOS Sonoma (14.0+):**
- Initial setup requires two restarts instead of one due to enhanced security features.

**iPad/iOS:**
- VPN doesn't support certificate-based authentication on iOS (username/password only).

### Network Restrictions
**Corporate Office Networks:**
- VPN is disabled when connected to corporate Wi-Fi (you're already inside the network).

**Hotel/Conference Wi-Fi:**
- Some venues block UDP 443. Switch to TCP mode in AnyConnect preferences.

**Cellular Networks:**
- Some mobile carriers throttle VPN traffic. Consider "Mobile-Workers" group for optimized performance.

## Compliance & Security

### Data Encryption
- **Protocol:** IKEv2/IPsec and SSL/TLS
- **Encryption:** AES-256-GCM
- **Perfect Forward Secrecy:** Enabled (DHE key exchange)

### Logging & Monitoring
The company logs VPN connections for security and compliance:
- Connection timestamps (start/end)
- Username and source IP address
- Data transferred (volume, not content)
- Resources accessed
- **Retention:** Logs kept for 90 days, then archived for 7 years per compliance requirements.

### Access Reviews
VPN access is reviewed quarterly. Inactive accounts (no connection in 60 days) are automatically disabled and require reactivation through IT.

### Geographic Restrictions
Connections from high-risk countries may require additional verification. The Security team receives alerts for connections from:
- Embargoed nations
- Known high-fraud regions
- Locations inconsistent with employee's normal work pattern

## Emergency Procedures

### VPN Service Outage
If you cannot connect and status page confirms an outage:
1.  **Email Access:** Use https://outlook.office365.com (cloud-based, no VPN needed)
2.  **File Access:** Limited files available via OneDrive/SharePoint
3.  **Critical Systems:** Contact your manager for alternative access procedures
4.  **Updates:** Monitor status.company.com and company Slack #incidents channel

### Account Locked Due to Security Event
If Security team locks your VPN access:
1.  You'll receive email notification with reason.
2.  **Immediate:** Contact Security at x5599 or security@company.com.
3.  **After Hours:** Call emergency line at (555) 0155.
4.  Account will be unlocked after identity verification and security review.

### Lost/Stolen Device with Active VPN Session
1.  **Immediate:** Call Service Desk at x5500 to terminate all active VPN sessions.
2.  **Change Password:** Use SSPR portal immediately.
3.  **Report Device:** Fill out lost/stolen device report for remote wipe.
4.  **New Device:** VPN can be installed on replacement device immediately.

## Resources & Support

### Documentation
- **Full VPN Manual:** https://kb.company.com/vpn-guide
- **Video Tutorial:** https://training.company.com/vpn-setup
- **Quick Start PDF:** Available on Service Portal downloads section

### Training
- **New Hire VPN Session:** Offered during IT onboarding (Week 1)
- **Monthly Drop-In Clinic:** Every 2nd Wednesday, 2-3 PM ET, via Zoom
- **One-on-One Support:** Schedule through Service Desk portal

### Contact Information
- **Service Desk:** x5500 / servicedesk@company.com
- **VPN Team:** vpn-support@company.com (for persistent technical issues)
- **Security Team:** security@company.com (for access requests or security concerns)
- **After-Hours Support:** +1-800-555-0199 (24/7 critical support)

---
**Document Version:** 3.2
**Last Updated:** October 24, 2023
**Next Review:** January 24, 2024
**Owner:** IT Infrastructure Team
**Approved By:** Director of IT Operations
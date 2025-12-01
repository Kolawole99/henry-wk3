# Data Privacy Policy (GDPR & CCPA/CPRA)

**Data Protection Officer (DPO):** privacy@company.com
**Management Platform:** OneTrust

## Overview
We are committed to complying with GDPR (Europe), CCPA (California), and LGPD (Brazil). This policy applies to all Customer Data (PII).


## Key Definitions
* **PII (Personally Identifiable Information):** Names, emails, IP addresses, device IDs, location data.
* **Data Controller:** We are the Controller for our employee data and direct-to-consumer marketing.
* **Data Processor:** We are the Processor for data our B2B customers store in our platform.

## Data Subject Access Requests (DSAR)
Users have the right to request, delete, or correct their data.
* **Intake:** All requests must come through the Privacy Portal at `privacy.company.com`.
* **Timeline:** We legally must respond within **30 days** (GDPR) or **45 days** (CCPA).
* **Internal Process:**
    1.  Request received in OneTrust.
    2.  Privacy Team validates identity.
    3.  Engineering runs the "Purge Script" across production databases.
    4.  Marketing removes the email from Marketo/Salesforce.
    5.  Confirmation sent to user.

## Data Transfers (Schrems II)
* **EU to US:** We rely on **Standard Contractual Clauses (SCCs)** for transferring data from the EU to the US.
* **Data Residency:** European customers can choose to have their data hosted solely in our **Frankfurt (AWS eu-central-1)** region.

## Privacy by Design
New features that collect PII must undergo a **DPIA (Data Protection Impact Assessment)** before launch.
* **Trigger:** Creating new user profiles, tracking geolocation, or sharing data with new ad networks.
* **Process:** Submit a "Privacy Review" ticket in Jira. The Privacy Counsel will review data retention policies (Default retention: **7 years** for financial records, **2 years** for marketing logs).

## Cookie Compliance
* **Strictly Necessary:** Always on (Load balancing, auth).
* **Marketing/Analytics:** Must be "Opt-In" for EU visitors and "Opt-Out" for US visitors.
* **Tool:** We use OneTrust Cookie Consent Manager on all web properties. Do not hardcode Google Analytics scripts; they must fire through the OneTrust container.
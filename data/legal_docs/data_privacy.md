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

## 6. Employee Data Privacy

### 6.1 HR Data Collection and Usage
Employee personal data collected includes:
* Contact information (name, address, phone, email)
* National identification numbers (SSN, tax IDs)
* Emergency contacts
* Compensation and benefits information
* Performance reviews and disciplinary records
* Time and attendance records

**Usage Purposes:**
* Payroll and benefits administration
* Compliance with employment laws
* Workforce planning and analytics
* Emergency response

**Access Controls:** HR data is accessible only to authorized HR staff, direct managers (for their reports), and Finance (for payroll). IT may access for technical support under supervision.

### 6.2 Employee Monitoring
The company reserves the right to monitor:
* Company-issued devices and equipment
* Corporate email and messaging systems
* Network traffic and internet usage
* Physical access to facilities (badge swipes)

**Transparency:** Employees are notified during onboarding that monitoring may occur. Personal devices enrolled in MDM are subject to limited monitoring (location, security status) but personal data remains private.

**No Expectation of Privacy:** Communications on company systems should not be considered private, even if marked "personal."

### 6.3 Background Checks
Pre-employment background checks are conducted in compliance with FCRA (Fair Credit Reporting Act) and local laws.
* **Scope:** Criminal history, employment verification, education verification, credit check (for finance roles only)
* **Consent Required:** Candidates must sign authorization form
* **Adverse Action:** If employment is denied based on background check, candidate receives pre-adverse action notice and opportunity to dispute

### 6.4 Employee Rights
Employees may request:
* **Access:** Copy of personal data held in HR systems (request via hr-privacy@company.com)
* **Correction:** Update inaccurate information via Workday or HR
* **Deletion:** Limited right; retention required for legal compliance (tax, employment law)
* **Portability:** Data export in machine-readable format

## 7. Vendor and Third-Party Data Sharing

### 7.1 Data Processing Agreements (DPAs)
All vendors processing customer or employee PII on our behalf must sign a DPA covering:
* Processing instructions and limitations
* Security requirements (encryption, access controls)
* Sub-processor disclosure
* Data breach notification obligations
* Audit rights
* Data return or destruction upon termination

**Review Process:** Submit vendor DPAs to privacy@company.com for Legal review before signature.

### 7.2 Approved Vendor Categories
Common vendors requiring DPAs:
* Payroll and benefits providers (ADP, Workday)
* CRM and marketing platforms (Salesforce, Marketo, HubSpot)
* Cloud infrastructure (AWS, Google Cloud, Azure)
* Customer support tools (Zendesk, Intercom)
* Analytics platforms (Google Analytics, Mixpanel, Amplitude)

### 7.3 International Data Transfers
When sharing data with vendors outside the EEA/UK, ensure:
* **Standard Contractual Clauses (SCCs)** are executed
* Vendor certifies compliance with SCCs
* Transfer Impact Assessment (TIA) completed for high-risk jurisdictions

**High-Risk Jurisdictions:** Countries without adequate data protection laws or subject to broad government surveillance (e.g., China, Russia). Transfers require Privacy Counsel approval.

## 8. Data Retention and Deletion

### 8.1 Standard Retention Periods

| Data Type | Retention Period | Legal Basis |
|-----------|------------------|-------------|
| Customer Account Data | 7 years post-closure | Tax, contract |
| Marketing Contacts | Until opt-out + 30 days | Consent |
| Employee Records | 7 years post-termination | Employment law |
| Financial Records | 7 years | SOX, IRS |
| Server Logs | 90 days | Security, debugging |
| Backup Data | 30 days | Business continuity |

### 8.2 Legal Hold Exception
Data subject to litigation, investigation, or audit must be preserved indefinitely under "legal hold" status. Legal will notify data custodians when legal hold applies.

**Do Not:** Delete data subject to legal hold, even if retention period has expired.

### 8.3 Deletion Procedures
* **Automated Deletion:** Systems automatically purge data per retention schedules
* **Manual Deletion:** For DSAR requests, Engineering runs approved purge scripts
* **Secure Deletion:** Use cryptographic erasure or DOD 5220.22-M wiping standards

## 9. Privacy Incident Response

### 9.1 What Constitutes a Privacy Incident
Examples include:
* Unauthorized access to customer or employee data
* Accidental exposure of PII (emailing customer list to wrong recipient)
* Ransomware attack encrypting databases
* Lost or stolen device containing unencrypted data
* Vendor data breach affecting our data

### 9.2 Reporting Requirements
**Internal:** Report suspected privacy incidents within **1 hour** to:
* security@company.com
* privacy@company.com
* Your manager and HRBP

**External Notification Timelines:**
* **GDPR:** Notify supervisory authority within **72 hours** of becoming aware
* **CCPA:** Notify California AG without unreasonable delay
* **Affected Individuals:** Notify if breach creates risk of identity theft or financial harm

### 9.3 Incident Response Process
1. **Containment:** Immediately isolate affected systems
2. **Assessment:** Determine scope (how many records, data types, cause)
3. **Notification:** Privacy Counsel determines notification obligations
4. **Remediation:** Fix vulnerability, enhance controls
5. **Documentation:** Incident report logged in OneTrust for audit trail

### 9.4 Breach Notification Template
If individual notification is required, use approved template covering:
* Date and nature of breach
* Types of personal data affected
* Steps taken to mitigate harm
* Contact information for questions
* Credit monitoring offer (if applicable)

## 10. Privacy Training and Awareness

### 10.1 Mandatory Training
All employees must complete annual **Data Privacy Fundamentals** training covering:
* What is PII and why it matters
* GDPR, CCPA, and other privacy laws
* Handling DSAR requests
* Recognizing and reporting privacy incidents
* Secure data handling practices

**Completion Deadline:** January 31st annually. Non-completion results in system access suspension.

### 10.2 Role-Specific Training

| Role | Additional Training | Frequency |
|------|---------------------|-----------|
| Engineers | Secure Coding & Privacy by Design | Annually |
| Marketing | Email Privacy & Consent Management | Annually |
| Sales | Data Minimization & Customer Rights | Annually |
| Product Managers | Privacy Impact Assessments | Annually |
| HR | Employee Data Privacy & FCRA | Annually |

### 10.3 Privacy Champions
Each department designates a Privacy Champion responsible for:
* Serving as first point of contact for privacy questions
* Escalating issues to Privacy Counsel
* Promoting privacy awareness in team meetings
* Reviewing new projects for privacy implications

## 11. International Privacy Laws

### 11.1 GDPR (Europe)
**Applicability:** Applies if we offer goods/services to EU residents or monitor their behavior
**Key Principles:**
* Lawful basis required for all processing (consent, contract, legitimate interest)
* Data minimization (collect only what's necessary)
* Purpose limitation (use data only for stated purpose)
* Storage limitation (delete when no longer needed)
* Integrity and confidentiality (security measures)

**Individual Rights:**
* Right to access
* Right to rectification
* Right to erasure ("right to be forgotten")
* Right to data portability
* Right to object to processing
* Right to restrict processing

**Penalties:** Up to 4% of global annual revenue or 20 million euros, whichever is higher

### 11.2 CCPA/CPRA (California)
**Applicability:** Applies to California residents' personal information
**Consumer Rights:**
* Know what personal information is collected
* Delete personal information (with exceptions)
* Opt-out of sale/sharing of personal information
* Non-discrimination for exercising rights
* Correct inaccurate information (CPRA addition)
* Limit use of sensitive personal information (CPRA addition)

**Do Not Sell My Personal Information:** Must provide clear "Do Not Sell" link on website footer

**Penalties:** Up to $7,500 per intentional violation

### 11.3 LGPD (Brazil)
Similar to GDPR, applies to processing of Brazilian residents' data. Key differences:
* Data Protection Officer required if processing large volume of sensitive data
* Consent must be explicit and granular
* 10-day timeline for breach notification to authority

### 11.4 Other Jurisdictions
* **Canada (PIPEDA):** Requires consent for collection, use, disclosure of personal information
* **Australia (Privacy Act):** Covers Australian Privacy Principles (APPs)
* **Japan (APPI):** Requires registration as business handling personal information
* **South Korea (PIPA):** Strict consent requirements and security obligations

## 12. Sensitive Data Categories

### 12.1 Special Category Data (GDPR)
Requires heightened protection:
* Racial or ethnic origin
* Political opinions
* Religious or philosophical beliefs
* Trade union membership
* Genetic data
* Biometric data
* Health data
* Sex life or sexual orientation

**Processing Restrictions:** Generally prohibited unless explicit consent obtained or other legal exception applies (e.g., employment law requirement)

### 12.2 Children's Data
**COPPA (US):** Cannot collect personal information from children under 13 without verifiable parental consent
**GDPR:** Children under 16 (or lower age set by member state) require parental consent for online services

**Company Policy:** Our products/services are not directed at children. Terms of Service require users be 18+.

### 12.3 Payment Card Information (PCI-DSS)
Credit card data subject to PCI-DSS standards:
* Never store CVV codes
* Encrypt cardholder data at rest and in transit
* Tokenize when possible (use payment processor tokens, not raw card numbers)
* Annual PCI compliance audit required

**Minimize Exposure:** Use Stripe/PayPal hosted checkout pages to avoid handling card data directly.

## 13. Privacy by Design and Default

### 13.1 Product Development Requirements
New features involving personal data must:
* Complete **Privacy Impact Assessment (PIA)** before development
* Implement privacy controls by default (opt-in, not opt-out)
* Provide clear, conspicuous disclosures
* Minimize data collection (collect only what's needed)
* Enable user data control (access, delete, export)

### 13.2 Privacy Impact Assessment Process
1. Submit PIA questionnaire in Jira (project: PRIVACY)
2. Privacy Counsel reviews within 5 business days
3. If medium/high risk, full assessment required (meeting with Privacy, Legal, Security, Product)
4. Document mitigation measures
5. Obtain sign-off before launch

**Triggers for PIA:**
* New data collection from users
* Sharing data with new third parties
* Automated decision-making affecting users
* Processing sensitive data categories
* Launching in new geographic markets

### 13.3 Privacy-Enhancing Technologies
Consider implementing:
* **Pseudonymization:** Replace identifying fields with pseudonyms
* **Anonymization:** Irreversibly remove identifying information
* **Differential Privacy:** Add statistical noise to datasets
* **Homomorphic Encryption:** Perform computations on encrypted data
* **Zero-Knowledge Proofs:** Verify facts without revealing underlying data

## 14. Cookie and Tracking Technologies

### 14.1 Cookie Types

**Strictly Necessary:**
* Session management (login state)
* Load balancing (route to correct server)
* Security (CSRF tokens)
* No consent required

**Functional:**
* Language preferences
* Accessibility settings
* May require consent depending on jurisdiction

**Analytics:**
* Google Analytics, Mixpanel
* Requires consent in EU, opt-out in US

**Advertising/Marketing:**
* Facebook Pixel, Google Ads remarketing
* Requires consent in EU, opt-out in US

### 14.2 OneTrust Implementation
All marketing and analytics scripts must:
1. Be added to OneTrust container, not hard-coded in HTML
2. Specify correct category (Analytics, Marketing, etc.)
3. Fire only after user provides consent
4. Respect user's opt-out choices

**Testing:** Use OneTrust testing mode to verify cookies don't fire before consent.

### 14.3 Do Not Track (DNT)
Browser DNT signals are not legally binding, but company policy is to honor them:
* If DNT=1 detected, disable non-essential tracking
* Log DNT preference in privacy preference center

## 15. Frequently Asked Questions

**Q1: Can I email a customer list to a vendor for a marketing campaign?**
A: Only if customers consented to share with third parties. Export list from approved system (Salesforce) and send via encrypted channel. Vendor must sign DPA first.

**Q2: A customer sent a DSAR requesting all their data. What do I do?**
A: Forward the request to privacy@company.com immediately. Do not attempt to compile the data yourself. Privacy team will coordinate response.

**Q3: Can I use customer email addresses to build a lookalike audience on Facebook?**
A: Only if Privacy Policy discloses this use and customers haven't opted out. Submit request to privacy@company.com for review first.

**Q4: Our website privacy policy is out of date. Who updates it?**
A: Privacy Counsel updates the policy. If you notice inaccuracies, report to privacy@company.com with specific details.

**Q5: Can I store customer data in my personal Dropbox for convenience?**
A: No. Customer data must remain in approved company systems only (Salesforce, data warehouse, approved SaaS tools). Unauthorized storage is a policy violation.

**Q6: A customer is asking to delete their account but we need the data for tax records. Can we refuse?**
A: No. Delete the account and customer-facing data, but retain financial/transactional data separately for the legally required retention period (7 years). Document the retention reason.

**Q7: Do we need consent to send transactional emails (order confirmations, password resets)?**
A: No. Transactional emails are exempt from consent requirements under CAN-SPAM and GDPR. Marketing emails require consent or opt-in.

**Q8: Can I install Google Analytics on an internal tool used by employees?**
A: Internal tools don't require OneTrust consent management, but should still comply with data minimization. Avoid tracking sensitive HR data.

**Q9: A vendor is asking for a list of our employees for a training program. Can I provide it?**
A: Check vendor's privacy policy and sign DPA first. Provide only necessary fields (name, email, job title). Do not share SSNs, salaries, or sensitive data.

**Q10: What counts as "sale" of data under CCPA?**
A: Sharing personal information with third parties for monetary or other valuable consideration. This includes ad networks and data brokers, but not service providers acting on our behalf under contract.

## 16. Enforcement and Penalties

### 16.1 Internal Discipline
Privacy policy violations may result in:
* Verbal warning (first minor offense)
* Written warning and mandatory retraining
* Suspension without pay
* Termination (serious or repeated violations)
* Legal action (if violation causes company harm)

### 16.2 Regulatory Fines
Recent privacy enforcement examples:
* Amazon: $877M GDPR fine (2021)
* Google: $170M COPPA fine (2019)
* Facebook: $5B FTC fine (2019)
* British Airways: $26M GDPR fine (2020)

**Risk Mitigation:** Compliance is everyone's responsibility. Report issues early to minimize exposure.

## 17. Resources and Contacts

| Need | Contact | Response Time |
|------|---------|---------------|
| DSAR Processing | privacy@company.com | 48 hours (acknowledgment) |
| Privacy Incident | security@company.com + privacy@company.com | 1 hour |
| DPA Review | privacy@company.com | 3 business days |
| Privacy Impact Assessment | Jira project: PRIVACY | 5 business days |
| Cookie Implementation | privacy@company.com + webteam@company.com | 1 week |
| Training Questions | privacy-training@company.com | 2 business days |
| Policy Interpretation | privacy@company.com | 2 business days |

**Data Protection Officer (DPO):** dpo@company.com
**EU Representative:** eu-rep@company.com (for GDPR inquiries)
**OneTrust Admin Access:** Submit ticket to privacy@company.com

## 18. Policy Updates and Review

This policy is reviewed quarterly by the Privacy Counsel and updated to reflect:
* Changes in applicable laws
* New data processing activities
* Privacy incident lessons learned
* Regulatory guidance updates

**Notification:** Material changes will be communicated via email to all employees and posted on the intranet. Website privacy policy changes will include effective date and change summary.

**Last Updated:** December 1, 2024
**Next Review:** March 1, 2025
**Version:** 5.0
**Policy Owner:** Data Protection Officer (DPO)
# Intellectual Property (IP) Policy

**Effective Date:** January 1, 2024
**Contact:** ip-legal@company.com

## Ownership of Inventions
* **Work for Hire:** Any code, designs, content, or inventions created by employees during work hours or using company equipment are the sole property of the company.
* **Pre-Existing IP:** If you have prior inventions you wish to exclude, they must be listed in the "Proprietary Information and Inventions Assignment Agreement" signed during onboarding.

## Open Source Software (OSS) Policy
We love Open Source, but we must be careful with licenses.

### Traffic Light System
* **GREEN (Approved):** MIT, Apache 2.0, BSD (2-clause/3-clause), ISC.
    * *Action:* You may use these libraries without legal approval.
* **YELLOW (Caution):** MPL (Mozilla), EPL (Eclipse).
    * *Action:* Requires Engineering Manager approval. Code must be kept in separate files/libraries.
* **RED (Prohibited):** GPL (v2 or v3), AGPL, LGPL.
    * *Action:* **Strictly Prohibited.** These "copyleft" licenses can force us to open-source our entire proprietary codebase. Usage requires CTO + General Counsel approval.

## Patent Program
We encourage employees to innovate.
* **Disclosure:** If you believe you have created a patentable invention, submit an **Invention Disclosure Form** (IDF) via the IP Portal.
* **Review Committee:** Meets quarterly to decide which patents to file based on commercial value and detectability.
* **Rewards:**
    * **$1,500** bonus upon filing a provisional application.
    * **$3,000** bonus upon issuance of the patent by the USPTO.

## Copyright & Trademarks
* **Branding:** Do not create new logos or product names without checking with Legal. We must perform a "Knockout Search" to ensure we aren't infringing on existing trademarks.
* **Assets:** All stock photos and fonts must be licensed. Do not use images found via Google Image Search. Use the corporate **Shutterstock** or **Getty Images** account.

## Reporting Infringement
If you see a competitor copying our features, code, or marketing copy:
1.  **Document it:** Take screenshots and archive URLs (Wayback Machine).
2.  **Report it:** Email ip-legal@company.com.
3.  **Do NOT:** Contact the competitor yourself or post about it on social media.

## 5. Trade Secrets Protection

### 5.1 What Qualifies as a Trade Secret
Information that:
* Derives economic value from not being generally known
* Is subject to reasonable efforts to maintain secrecy
* Includes: algorithms, customer lists, pricing strategies, source code, business processes

**Examples:**
* Proprietary machine learning models
* Sales compensation structure
* Manufacturing processes
* Customer pricing agreements
* Unannounced product roadmaps

### 5.2 Handling Trade Secrets
**Do:**
* Mark confidential documents with "Confidential - Trade Secret"
* Store in access-controlled systems
* Share only on need-to-know basis
* Use NDAs before external disclosure

**Don't:**
* Discuss in public places (cafes, airplanes, conferences)
* Email without encryption
* Store on personal devices
* Share with family/friends

### 5.3 Departing Employee Obligations
When leaving the company:
* Return all confidential information and devices
* Delete company data from personal devices
* Do not take customer lists, code, or documents to new employer
* Trade secret obligations survive employment termination indefinitely

**Criminal Liability:** Theft of trade secrets is a federal crime punishable by up to 10 years imprisonment (Economic Espionage Act).

## 6. Copyright Management

### 6.1 Work-for-Hire Doctrine
Under U.S. Copyright Act, works created by employees within the scope of employment automatically belong to the employer.

**Company Owns:**
* Code written during work hours or using company equipment
* Documentation, presentations, and training materials created for work
* Blog posts written for company website
* Marketing copy and product descriptions

**You May Own:**
* Personal projects unrelated to company business, created on own time/equipment
* Pre-existing works brought to company (if disclosed during onboarding)

### 6.2 Copyright Registration
For important works (software releases, product designs, marketing campaigns), Legal may file copyright registrations to strengthen protection.

**Benefits:**
* Establishes public record of ownership
* Required before filing infringement lawsuit
* Enables statutory damages (up to $150k per work) instead of proving actual damages

### 6.3 DMCA Takedown Procedures
If you find unauthorized copies of company copyrighted works online:
1. Email ip-legal@company.com with URL and description
2. Legal will send DMCA takedown notice to hosting provider
3. Most platforms remove infringing content within 24-48 hours

**Do Not:** Send DMCA notices yourself; improper notices can create liability.

## 7. Trademark and Brand Protection

### 7.1 Company Trademarks
Registered trademarks include:
* Company name and logo
* Product names (check trademark database on intranet)
* Taglines and slogans

**Proper Usage:**
* Use ® symbol for registered marks
* Use TM for unregistered marks
* Follow brand guidelines for logo placement, colors, and sizing

### 7.2 Creating New Brands
Before launching new product/feature names:
1. **Brainstorm:** Marketing creates list of potential names
2. **Knockout Search:** Legal conducts preliminary trademark search (2-3 days)
3. **Clearance Search:** Full search by outside counsel for finalists ($1,500-$3,000 per mark)
4. **Filing:** If clear, file trademark application with USPTO ($350 per class)
5. **Approval Timeline:** 8-12 months for registration

**High-Risk Names:** Generic terms (can't trademark "Fast Software") or descriptive terms (difficult to protect "Cloud Storage Pro")

### 7.3 Trademark Enforcement
We enforce trademarks to prevent:
* **Dilution:** Competitors using confusingly similar marks
* **Genericide:** Trademark becoming generic term (like "escalator" or "aspirin")
* **Counterfeiting:** Unauthorized use of identical marks

**Monitoring:** Legal monitors trademark databases and online marketplaces quarterly for infringement.

### 7.4 Domain Name Management
All company domain registrations must be:
* Registered through approved registrar (GoDaddy, Namecheap)
* Using corporate credit card (not personal payment)
* Registered to company legal entity (not individual employee)
* Documented in IT asset database

**Domain Disputes:** If squatter registered confusingly similar domain, Legal can file UDRP complaint ($1,500 fee) to transfer ownership.

## 8. License Compliance and Audits

### 8.1 Software License Audits
Vendors (Microsoft, Adobe, Oracle) may request license audits.
* **Response Time:** 30 days to provide usage data
* **Coordination:** IT and Legal jointly manage audit response
* **Risk:** Non-compliance can result in retroactive fees and penalties

**Proactive Compliance:**
* Use software asset management tools (ServiceNow SAM)
* Track license purchases and deployments
* Remove unused licenses to reduce costs

### 8.2 Open Source Compliance Audits
Before product releases, Engineering must generate Software Bill of Materials (SBOM) listing all open source components.

**Review Checklist:**
- [ ] All dependencies documented with versions
- [ ] Licenses verified as approved (Green or Yellow)
- [ ] Attribution notices included (for MIT, Apache, BSD)
- [ ] No GPL/AGPL components in proprietary code
- [ ] Third-party vulnerability scan completed

**Tools:** Use Snyk, Black Duck, or FOSSA for automated license scanning.

## 9. Invention Disclosure Program

### 9.1 What to Disclose
Submit an Invention Disclosure Form (IDF) if you create:
* Novel algorithms or methods
* Hardware designs or devices
* User interface innovations
* Business process improvements with technical components

**Examples:**
* New data compression technique that reduces storage by 40%
* Unique authentication mechanism
* Novel API architecture
* Machine learning model for fraud detection

### 9.2 Disclosure Process
1. **Submit IDF:** Complete form at ip-portal.company.com (30 minutes)
2. **Initial Review:** IP Committee reviews within 2 weeks
3. **Patent Decision:** Committee decides to file, monitor, or decline
4. **Inventor Duties:** Cooperate with patent attorney (5-10 hours over 6 months)

**Confidentiality:** Keep invention confidential until patent filed. Public disclosure (conference presentation, research paper) starts 12-month clock; must file within 1 year.

### 9.3 Incentive Program
* **$1,500 bonus:** Upon filing provisional or full patent application
* **$3,000 bonus:** Upon issuance of patent (typically 2-3 years after filing)
* **Recognition:** Patent wall in office lobby, announcement in company newsletter

**FY2024 Stats:**
* 47 invention disclosures submitted
* 23 patent applications filed
* 12 patents issued
* $78,000 paid in inventor bonuses

### 9.4 Publication Rights
Inventors may publish research papers about patented inventions *after* filing, with these requirements:
* Submit draft to Legal for review 30 days before publication
* Include patent application number and company affiliation
* Do not disclose proprietary implementation details beyond what's in patent

## 10. Contributor License Agreements (CLAs)

### 10.1 Accepting External Contributions
If accepting code contributions from non-employees (contractors, open source community):
* **Individual CLA:** Required for all individual contributors
* **Corporate CLA:** Required if contributor employed by another company
* **Template:** Use standard Apache-style CLA

**CLA Requirements:**
* Contributor grants company perpetual license to use contribution
* Contributor represents they have rights to grant license
* Contributor agrees to patent license

### 10.2 Contributing to External Projects
Before contributing company code to open source projects:
1. Obtain manager approval
2. Submit request to ip-legal@company.com
3. Verify project license compatible with contribution
4. Use company email and GitHub account (not personal)

**Prohibited:** Contributing code containing customer data, trade secrets, or proprietary algorithms.

## 11. IP in Vendor and Customer Contracts

### 11.1 Vendor Work Product
When hiring agencies, contractors, or consultants:
* **Work-for-Hire Clause:** Required in all agreements
* **Assignment Language:** Vendor assigns all IP rights to company
* **No License Back:** Vendor may not reuse deliverables for other clients

**Red Flag:** Vendor contract stating "Vendor retains all IP rights" - reject and negotiate.

### 11.2 Customer Agreements
Standard customer terms include:
* **License Grant:** Customer receives non-exclusive license to use software
* **Reservation of Rights:** We retain all ownership in software
* **Restrictions:** Customer may not reverse engineer, resell, or create derivative works
* **Customer Data:** Customer retains ownership of their data

### 11.3 Joint Development Agreements
If co-developing technology with partner:
* **Background IP:** Each party retains ownership of pre-existing IP
* **Foreground IP:** Jointly developed IP is co-owned or allocated per contribution
* **Licensing:** Define mutual license rights and commercialization terms

**Approval:** Joint development agreements require CTO and General Counsel approval.

## 12. IP Due Diligence for M&A

### 12.1 Acquisition Targets
When evaluating acquisition targets, Legal reviews:
* Patent portfolio (ownership, validity, licensing)
* Trademark registrations and brand strength
* Open source compliance and license obligations
* Trade secret protection measures
* Pending or threatened IP litigation

**Deal Breakers:**
* Unresolved IP infringement claims
* GPL-licensed code in proprietary products
* Trademark conflicts with major brands
* Employees with restrictive covenants from prior employers

### 12.2 Selling the Company
If company is acquired, acquirer will audit:
* All issued patents and pending applications
* Employee IP assignment agreements
* Open source license compliance
* Chain of title for key IP assets

**Preparation:** Maintain clean IP records and assignment documentation in Legal's repository.

## 13. International IP Protection

### 13.1 Patent Filing Strategy
U.S. patents only protect in U.S. For international protection:
* **PCT Application:** File international application within 12 months of U.S. filing
* **National Phase:** Select countries for patent protection (typical: EU, Canada, China, Japan, Australia)
* **Cost:** $5,000-$15,000 per country for prosecution

**Prioritization:** Focus on markets where we have significant revenue or manufacturing.

### 13.2 Trademark International Registration
* **Madrid Protocol:** File single application covering 120+ countries
* **Cost:** $1,000-$3,000 depending on number of countries
* **Timeline:** 12-18 months for approval

**Country-Specific Requirements:** China requires local agent; some countries require proof of use before registration.

### 13.3 Copyright in International Markets
* **Berne Convention:** Copyright automatically protected in 180+ countries
* **Registration:** Not required internationally, but some countries (U.S., China) offer benefits for registration

## 14. Departing for Competitor - Special Rules

If leaving to join competitor or start competing business:
* **Exit Interview:** HR and Legal will review non-compete and non-solicitation obligations
* **Garden Leave:** Company may place on paid leave during notice period
* **Trade Secret Reminder:** Will receive written reminder of confidentiality obligations
* **New Employer Notice:** Company may notify new employer of confidentiality obligations

**Do Not:**
* Download customer lists before departure
* Email company documents to personal account
* Copy code repositories
* Solicit company customers or employees (check non-solicitation clause)

**Permitted:**
* General skills and knowledge gained during employment
* Using publicly available information about company
* Competing using own independent innovations

## 15. Frequently Asked Questions

**Q1: I created a mobile app on weekends using my personal laptop. Does the company own it?**
A: Generally no, if unrelated to company business and created entirely on personal time/equipment. However, check your employment agreement's "pre-existing IP" clause. Disclose to Legal if in doubt.

**Q2: Can I contribute to open source projects during personal time?**
A: Yes, but use personal email/GitHub account and do not contribute company code. Notify manager if contributing to projects related to your job function.

**Q3: A competitor's patent was just issued that seems to cover our product. What should I do?**
A: Forward the patent to ip-legal@company.com immediately with explanation of potential overlap. Do not discuss publicly or acknowledge infringement.

**Q4: Can I use MIT-licensed code found on GitHub in our product?**
A: Yes, MIT is approved (Green). You must include the MIT license text and copyright notice in your repository. Document in SBOM.

**Q5: I want to use a song in our marketing video. Can I just download it from Spotify?**
A: No. Contact Marketing to license from Shutterstock's music library or obtain sync license from rights holder ($500-$5,000 depending on usage).

**Q6: Our product name might infringe another company's trademark. What should I do?**
A: Pause use of the name and escalate to Legal immediately. Do not wait for cease-and-desist letter. Early rename is cheaper than litigation.

**Q7: A customer is asking for source code escrow. Should we agree?**
A: Source code escrow (depositing code with third party) is reasonable for enterprise customers. Legal will negotiate terms with escrow agent (Iron Mountain, Codekeeper).

**Q8: Can I trademark a domain name I personally own and sell it to the company?**
A: No. If domain relates to company business and you registered it using company resources or knowledge, company owns it. Transfer at no cost.

**Q9: I invented something at home unrelated to my job. Should I tell the company?**
A: Check your employment agreement. Most require disclosure of all inventions during employment. Company may waive claim if unrelated to business.

**Q10: Can we use GPL-licensed libraries if we modify them but don't distribute?**
A: Potentially, if SaaS deployment. GPL requires sharing modifications only if "distributing" software. Consult Legal before using GPL in any context.

## 16. Enforcement and Penalties

### 16.1 Policy Violations
Violations of IP policy may result in:
* Immediate termination
* Forfeiture of equity compensation
* Legal action to recover misappropriated IP
* Criminal referral (for trade secret theft)

### 16.2 Recent Case Study
**Situation:** Employee downloaded customer database and pricing spreadsheet before joining competitor.
**Outcome:** Company obtained injunction preventing employee from starting new role. Competitor settled for $2.5M. Employee criminally charged under Economic Espionage Act.

**Lesson:** IP violations have severe personal consequences beyond job loss.

## 17. Resources and Contacts

| Need | Contact | Response Time |
|------|---------|---------------|
| Invention Disclosure | ip-portal.company.com | 2 weeks |
| Open Source License Question | ip-legal@company.com | 2 business days |
| Trademark Clearance | ip-legal@company.com | 3 business days |
| Copyright Question | ip-legal@company.com | 2 business days |
| Report IP Infringement | ip-legal@company.com | 1 business day |
| Patent Prior Art Search | ip-legal@company.com | 1 week |
| Contractor IP Assignment | contracts@company.com | 3 business days |

**IP Committee:** Meets first Thursday of each month to review invention disclosures. Membership: CTO, General Counsel, VP Engineering, VP Product.

**Patent Attorney:** For prosecution matters, outside counsel is Finnegan, Henderson, Farabow, Garrett & Dunner LLP.

## 18. Policy Updates

This policy is reviewed annually and updated to reflect changes in IP law, business strategy, and technology landscape.

**Last Updated:** December 1, 2024
**Next Review:** December 1, 2025
**Version:** 4.3
**Policy Owner:** General Counsel

All employees must re-acknowledge policy annually via compliance portal.
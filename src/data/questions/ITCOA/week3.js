// src/data/questions/ITCOA/week3.js
export default [

  // ══════════════════════════════════════════════════════════════
  // QUESTION 1 — Group Policy: Governance, Scope & Control (25 marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITCOA_W3_Q1',
    type: 'scenario',
    title: 'Question 1 – Group Policy: Governance, Scope & Control (25 Marks)',
    context: `NovaTech Manufacturing Group is a multinational electronics manufacturer headquartered in Johannesburg, with production facilities in Cape Town, Durban and Gqeberha. The organisation has recently begun modernising its Windows Server infrastructure, including domain controllers, domain-joined clients, and separate OUs for Production, Finance, Sales and IT.

NovaTech's IT department has created a GPO called Finance-Desktop-Standard, intended to apply user settings to Finance employees only. However, Production employees report that some of the settings have appeared on their computers. In another case, administrators have created a GPO but cannot immediately see its effect on a client computer.`,
  },

  {
    id: 'ITCOA_W3_Q1',
    type: 'multiple-choice',
    tags: ['group policy', 'system configuration', 'scoping'],
    sectionLabel: '1.1',
    text: "The primary purpose of **scoping** the `Finance-Desktop-Standard` GPO is to:",
    options: [
      'determine which Windows Server version can execute the GPO',
      "determine which users or computers should receive the GPO's settings",
      'determine how frequently the domain controller replicates the GPO',
      'determine whether the GPO contains computer or user configuration settings',
    ],
    correctAnswers: ["determine which users or computers should receive the GPO's settings"],
    points: 2,
    explanation: 'A GPO can contain settings, but **scoping** determines who or what those settings apply to. In NovaTech\'s case, correct scoping is what prevents Finance-specific settings from unintentionally affecting Production computers.',
  },

  {
    id: 'ITCOA_W3_Q2',
    type: 'open-ended',
    tags: ['group policy', 'troubleshooting', 'gpresult'],
    sectionLabel: '1.2',
    text: 'NovaTech wants to determine which GPOs are currently being applied to a particular client computer. What command should the administrator use?',
    correctAnswers: ['GPRESULT', 'gpresult /r'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation: '`gpresult /r` reports the GPOs actually being applied to a computer, separately showing Computer and User Settings — making it the appropriate diagnostic command, as opposed to a general management console like GPMC.',
  },

  {
    id: 'ITCOA_W3_Q3',
    type: 'fill-in-the-blank',
    tags: ['group policy', 'active directory', 'linking'],
    sectionLabel: '1.3',
    text: 'A GPO must be ___ to an Active Directory location before its settings can apply to objects within that location.',
    blanks: [
      {
        id: 'b1',
        options: ['scoped', 'published', 'enabled', 'linked'],
        correctAnswer: 'linked',
      },
    ],
  },

  {
    id: 'ITCOA_W3_Q4',
    type: 'multiple-choice',
    tags: ['group policy', 'organisational units', 'linking'],
    sectionLabel: '1.4',
    text: 'NovaTech creates a GPO intended to map network drives for employees belonging to the **Accounting Users** OU. Which approach most directly establishes where that GPO should apply?',
    options: [
      'Create the GPO and leave it unlinked because all domain GPOs are automatically inherited',
      "Link the GPO to the appropriate OU containing the intended users",
      "Place the GPO inside the user's Personal certificate store",
      "Enable the GPO's Autoenroll permission",
    ],
    correctAnswers: ['Link the GPO to the appropriate OU containing the intended users'],
    points: 2,
    explanation: 'Linking a GPO to the Accounting Users OU is what causes its settings to apply to the users within that OU. The other options describe mechanisms unrelated to establishing GPO scope.',
  },

  {
    id: 'ITCOA_W3_Q5',
    type: 'show-answer',
    tags: ['group policy', 'processing order', 'troubleshooting'],
    sectionLabel: '1.5',
    text: 'NovaTech discovers the following processing situation:\n\n1. A Local Policy specifies one setting.\n2. A Site-level GPO specifies a different value.\n3. A Domain-level GPO specifies another value.\n4. An OU-level GPO specifies yet another value.\n\n**Analyse the order in which these policies are processed and explain which policy takes precedence when settings conflict.** Your answer must also explain **why understanding processing order matters operationally** when troubleshooting NovaTech\'s `Finance-Desktop-Standard` GPO.',
    correctAnswers: [
      {
        text: 'The Group Policy processing order is:\n\n**Local Policy → Site-level policy → Domain-level policy → OU-level policy.**\n\nLocal Policy is processed first. If the computer belongs to an Active Directory site, Site-level policies are then processed, followed by Domain-level policies and finally OU-level policies. Where settings conflict, the **last applied policy takes precedence** — therefore an OU-level setting can override a conflicting Domain-level setting.\n\nFor NovaTech, this matters because the administrator cannot diagnose the `Finance-Desktop-Standard` GPO by looking at that GPO in isolation. A different policy applied later in the processing sequence may override its setting. The administrator should establish which GPOs are actually being applied and identify where a conflicting setting originates. `gpresult /r` is particularly useful here because it reports the applied Computer and User policies.\n\nThe practical implication is that **the existence of a desired setting in a GPO does not guarantee that it is the effective setting on the client**.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Local → Site → Domain → OU order | 2 |
| Correctly explains later policy precedence | 2 |
| Applies precedence to NovaTech's conflicting settings | 1 |
| Recognises that a GPO must be analysed in context of other applied GPOs | 1 |
| Identifies \`gpresult\`/applied policy investigation as appropriate troubleshooting | 1 |
| **Total** | **7** |

**Examiner notes:**
- **7/7:** Correct sequence and precedence, with explicit application to the scenario.
- **5–6/7:** Correct order and precedence, limited scenario application.
- **3–4/7:** Understands GPOs can conflict but cannot accurately explain the hierarchy.
- **1–2/7:** Isolated facts without demonstrating understanding of precedence.
- **0:** Fundamentally incorrect processing model.`,
    points: 7,
    image: {
        src: "/images/ITCOA_W3_Q5.png",
        alt: "Diagram showing Local Policy, Site-level GPO, Domain-level GPO, and OU-level GPO as four sequential policy sources leading to a NovaTech client computer.",
        caption: "Group Policy processing scenario across Local, Site, Domain, and OU levels."
        }
  },

  {
    id: 'ITCOA_W3_Q6',
    type: 'multiple-choice',
    tags: ['group policy', 'wmi filtering'],
    sectionLabel: '1.6',
    text: 'NovaTech wants a GPO to apply only to computers possessing a particular hardware or software characteristic. Which filtering mechanism is the most appropriate?',
    options: ['Security Filtering', 'WMI Filtering', 'Delegation', 'Loopback Processing'],
    correctAnswers: ['WMI Filtering'],
    points: 2,
    explanation: 'WMI Filtering applies a GPO based on **computer properties**, such as hardware or software configuration, distinguishing it from Security Filtering, which is based on user/group/computer security principals.',
  },

  {
    id: 'ITCOA_W3_Q7',
    type: 'open-ended',
    tags: ['group policy', 'loopback processing'],
    sectionLabel: '1.7',
    text: 'NovaTech has computers in a public training room used by many different employees. Management wants **User Configuration** settings to depend on the computer being used rather than simply on the identity of the person logging in. What feature should be considered?',
    correctAnswers: ['Group Policy loopback', 'loopback processing', 'loopback'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
      tolerance: 10,
    },
    explanation: 'Loopback processing applies User Configuration settings according to the **computer\'s location** rather than the user\'s identity, which is appropriate for shared or public computers such as a training room.',
  },

  {
    id: 'ITCOA_W3_Q8',
    type: 'show-answer',
    tags: ['group policy', 'policies vs preferences'],
    sectionLabel: '1.8',
    text: 'NovaTech wants to prevent users from changing a particular desktop configuration. The IT manager proposes using either a **Policy** or a **Preference**.\n\n**Evaluate the difference between these two approaches and recommend which should be used where the organisation requires the setting to be enforced rather than merely suggested.** Your answer should include a NovaTech-specific example and explain the consequence of choosing the wrong approach.',
    correctAnswers: [
      {
        text: 'A **Policy** is an enforced setting. It is intended to apply regardless of user input and cannot be changed by the user. A **Preference**, in contrast, is a configured setting that the user *can* change. The distinction between Policy and Preference is the degree of control imposed on the user.\n\nFor NovaTech, if management requires a particular desktop configuration to remain enforced — for example, preventing users from changing a security-related desktop setting — a **Policy** should be used. If NovaTech merely wants to establish a preferred configuration while allowing users to modify it, a **Preference** is appropriate.\n\nUsing a Preference where enforcement is required would fail to meet the business requirement, because the user could simply change the setting.\n\nTherefore, the choice is not simply a technical preference: it depends on whether NovaTech requires **enforcement or user flexibility**.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correct definition of Policy | 1 |
| Correct definition of Preference | 1 |
| Clearly distinguishes enforcement from user modification | 1 |
| Appropriate NovaTech example | 1 |
| Explains consequence of incorrectly choosing Preference | 1 |
| Makes explicit recommendation based on requirement | 1 |
| **Total** | **6** |

**Common weak answer:** "Policy is better because it is more secure." This is insufficient — the decisive distinction is **enforcement versus changeability**, not an unsupported claim about security.`,
    points: 6,
  },

  {
    id: 'ITCOA_W3_Q9',
    type: 'multiple-choice',
    tags: ['group policy', 'central store', 'admx'],
    sectionLabel: '1.9',
    text: 'NovaTech wants to make a new administrative policy available consistently to administrators managing Group Policy across the domain. The organisation wants centrally stored **ADMX/ADML** files. Where should the Central Store be created?',
    options: [
      'Personal certificate store',
      'SYSVOL PolicyDefinitions folder',
      'Windows temporary directory',
      'Certification Authority Web Enrollment directory',
    ],
    correctAnswers: ['SYSVOL PolicyDefinitions folder'],
    points: 2,
    explanation: 'The Central Store is enabled by creating a `PolicyDefinitions` folder inside the domain controller\'s **SYSVOL** folder, where ADMX/ADML files are stored for consistent use by all Group Policy administrators.',
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 2 — PKI, Certificates & Enterprise Trust (25 marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITCOA_W3_Q2',
    type: 'scenario',
    title: 'Question 2 – PKI, Certificates & Enterprise Trust (25 Marks)',
    context: `NovaTech's security team wants to deploy certificates throughout the organisation. The company requires user certificates for selected users, computer certificates for domain-joined machines, certificates for internal HTTPS services, and certificates for certain network devices — with automatic certificate distribution and renewal where appropriate.

The security team is debating whether to use an Enterprise CA, a Standalone CA, or a tiered CA architecture, and how certificate templates should be distributed.`,
  },

  {
    id: 'ITCOA_W3_Q10',
    type: 'multiple-choice',
    tags: ['pki', 'certificate authority', 'enterprise ca'],
    sectionLabel: '2.1',
    text: 'NovaTech operates a domain-based Windows environment and wants certificates to be issued to domain users and computers according to centrally controlled certificate templates. Which CA type is the most appropriate starting point?',
    options: ['Standalone CA', 'Enterprise CA', 'Offline workstation CA', 'Web Enrollment CA'],
    correctAnswers: ['Enterprise CA'],
    points: 2,
    explanation: 'An Enterprise CA is domain-integrated and typically remains online to issue certificates to domain users and computers using centrally controlled templates — matching NovaTech\'s domain-based environment.',
  },

  {
    id: 'ITCOA_W3_Q11',
    type: 'open-ended',
    tags: ['pki', 'certificate infrastructure'],
    sectionLabel: '2.2',
    text: 'What is the broad term for a certificate environment consisting of the infrastructure and processes used to issue and manage certificates?',
    correctAnswers: ['PKI', 'Public Key Infrastructure'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
      tolerance: 10,
    },
    explanation: '**PKI (Public Key Infrastructure)** is the broad term for the infrastructure and processes — CAs, templates, certificates, keys — used to issue and manage certificates within an organisation.',
  },

  {
    id: 'ITCOA_W3_Q12',
    type: 'fill-in-the-blank',
    tags: ['pki', 'root ca', 'ca hierarchy'],
    sectionLabel: '2.3',
    text: 'The certificate authority that occupies the highest level in the PKI hierarchy is the ___ CA.',
    blanks: [
      {
        id: 'b1',
        options: ['root', 'subordinate', 'standalone', 'issuing'],
        correctAnswer: 'root',
      },
    ],
  },

  {
    id: 'ITCOA_W3_Q13',
    type: 'multiple-choice',
    tags: ['pki', 'ca hierarchy', 'offline root'],
    sectionLabel: '2.4',
    text: "NovaTech has grown concerned that compromising its permanently online root CA could compromise the organisation's entire PKI. It wants a highly secure architecture in which the root CA can remain offline while subordinate CAs perform certificate issuance. Which architectural choice best matches this requirement?",
    options: [
      'One permanently online standalone CA',
      'A root CA with subordinate issuing CAs',
      'Multiple unrelated enterprise root CAs with no hierarchy',
      'A web-enrollment server acting as the root CA',
    ],
    correctAnswers: ['A root CA with subordinate issuing CAs'],
    points: 2,
    image: {
        src: "/images/ITCOA_W3_Q13.png",
        alt: "Hierarchical PKI diagram showing a Root CA above subordinate or issuing CAs, with certificates issued to users, computers, web servers, and network devices.",
        caption: "NovaTech PKI hierarchy showing certificate authorities and certificate recipients."
        },
    explanation: 'A tiered hierarchy places the root CA at the top, which can then be safely shut down (kept offline) while subordinate/issuing CAs beneath it handle day-to-day certificate issuance, reducing exposure of the most critical CA.',
  },

  {
    id: 'ITCOA_W3_Q14',
    type: 'show-answer',
    tags: ['pki', 'enterprise ca', 'standalone ca', 'offline root'],
    sectionLabel: '2.5',
    text: "NovaTech is deciding between an **Enterprise CA** and a **Standalone CA**. **Critically compare the two choices in the context of NovaTech's environment.** Your answer must: distinguish the two CA types; explain why an Enterprise CA would normally be suitable for NovaTech; identify a legitimate reason NovaTech might nevertheless choose a Standalone CA; explain the security/usability trade-off associated with an offline root CA.",
    correctAnswers: [
      {
        text: 'An **Enterprise CA** must be a member of the domain and is normally kept online to issue certificates to domain users and computers, using certificate templates. This makes it the natural choice for NovaTech, since the organisation already has a domain environment and needs certificates for users and computers alike.\n\nA **Standalone CA** can operate without the same Active Directory dependency, and is appropriate where Active Directory does not exist or where security requirements prohibit domain joining.\n\nA further reason for NovaTech to use a Standalone CA is to create an **offline root CA**. The root CA sits at the highest level of the PKI hierarchy and can be safely shut down when not issuing certificates, reducing the risk that a compromise of an always-online CA compromises the entire PKI. A tiered arrangement then places subordinate issuing CAs below this offline root.\n\nThe trade-off is usability: an offline root is less convenient for routine certificate issuance and is therefore more operationally demanding, since it must be brought online deliberately whenever a subordinate CA certificate needs to be issued or renewed.\n\nFor NovaTech, an **Enterprise CA is appropriate for ordinary domain certificate issuance**, while a more security-conscious architecture could combine an offline Standalone root CA with subordinate Enterprise issuing CAs.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Enterprise CA accurately explained | 1 |
| Standalone CA accurately distinguished | 1 |
| Enterprise CA justified specifically for NovaTech | 2 |
| Valid Standalone/offline-root use case | 1 |
| Security benefit of offline root | 1 |
| Usability/operational trade-off | 1 |
| **Total** | **7** |

**Major misconception to penalise:** "Standalone CA is more secure because it is not in Active Directory." This is too simplistic and misses the actual offline-root rationale.`,
    points: 7,
  },

  {
    id: 'ITCOA_W3_Q15',
    type: 'multiple-choice',
    tags: ['pki', 'certificate templates', 'publishing'],
    sectionLabel: '2.6',
    text: 'NovaTech creates a new certificate template for computer certificates and gives the correct computers permission to request certificates. An administrator immediately tries to request the certificate from a client, but the template does not appear. Which step was most likely overlooked?',
    options: [
      'Restarting every client computer',
      'Publishing the certificate template on the CA',
      'Creating a new IPv6 subnet',
      "Exporting the CA's private key",
    ],
    correctAnswers: ['Publishing the certificate template on the CA'],
    points: 2,
    explanation: 'Creating a template does not automatically make it available for client requests — the template must first be **published** from the CA console before it appears as a request option.',
  },

  {
    id: 'ITCOA_W3_Q16',
    type: 'fill-in-the-blank',
    tags: ['pki', 'autoenrollment', 'certificate templates'],
    sectionLabel: '2.7',
    text: 'NovaTech wants domain-joined computers to automatically obtain and renew certificates through Group Policy. The relevant certificate template must have the ___ permission enabled.',
    blanks: [
      {
        id: 'b1',
        options: ['Read', 'Write', 'Autoenroll', 'Publish'],
        correctAnswer: 'Autoenroll',
      },
    ],
  },

  {
    id: 'ITCOA_W3_Q17',
    type: 'multiple-choice',
    tags: ['pki', 'ad cs', 'web enrollment'],
    sectionLabel: '2.8',
    text: 'A NovaTech administrator needs a browser-based interface through which users can request certificates from a CA. Which AD CS role service most directly provides this functionality?',
    options: [
      'Network Device Enrollment Service',
      'Certification Authority Web Enrollment',
      'Online Responder',
      'Certificate Template Manager',
    ],
    correctAnswers: ['Certification Authority Web Enrollment'],
    points: 2,
    explanation: 'Certification Authority Web Enrollment provides a browser-based mechanism for certificate requests and related certificate-management tasks, unlike the other AD CS role services listed.',
  },

  {
    id: 'ITCOA_W3_Q18',
    type: 'show-answer',
    tags: ['pki', 'encryption', 'public key', 'private key'],
    sectionLabel: '2.9',
    text: "NovaTech's internal web server requires HTTPS. Explain why the organisation must protect the **private key** associated with the certificate, and distinguish the roles of the **public key** and **private key** in the asymmetric encryption process described in the course material.",
    correctAnswers: [
      {
        text: "The **public key** is contained in the SSL certificate and is freely available for use in the HTTPS encryption process. The corresponding **private key** is kept securely on the web server and is never shared.\n\nIn asymmetric encryption, the public key is used to encrypt traffic, and only the corresponding private key can decrypt it. This means the private key is critical to the functioning and security of the SSL certificate: if it is compromised, an attacker could impersonate NovaTech's server or decrypt traffic intended for it, misusing the certificate's cryptographic identity.",
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Public key correctly identified | 1 |
| Private key correctly identified | 1 |
| Correct asymmetric relationship explained | 1 |
| Importance of protecting private key applied to NovaTech | 1 |
| **Total** | **4** |

Full marks require understanding the *relationship* between the two keys, not merely defining "public" and "private."`,
    points: 4,
    image: {
        src: "/images/ITCOA_W3_Q18.png",
        alt: "Conceptual HTTPS diagram showing a NovaTech client, internal web server, certificate, public key, and private key.",
        caption: "Certificate and key relationships in an HTTPS environment."
        }
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 3 — Certificate Deployment, SSL & Lifecycle (20 marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITCOA_W3_Q3',
    type: 'scenario',
    title: 'Question 3 – Certificate Deployment, SSL & Lifecycle Decisions (20 Marks)',
    context: `NovaTech's public-facing customer portal must use an SSL certificate issued by a public certification authority. The web administrator generates a Certificate Signing Request (CSR), submits it to the public CA, and later receives the issued certificate.

The company also operates several web servers that may need to use the same certificate.`,
  },

  {
    id: 'ITCOA_W3_Q19',
    type: 'multiple-choice',
    tags: ['pki', 'ssl', 'csr'],
    sectionLabel: '3.1',
    text: "Which sequence most accurately represents the process NovaTech should follow to obtain its public-authority SSL certificate?",
    options: [
      'Install certificate → create CSR → validate ownership → generate private key',
      'Create CSR → submit request to CA → complete required validation → install resulting certificate',
      'Create private key → export PFX → delete CSR → request certificate',
      'Publish GPO → create CSR → install CA role → import certificate',
    ],
    correctAnswers: ['Create CSR → submit request to CA → complete required validation → install resulting certificate'],
    points: 2,
    image: {
        src: "/images/ITCOA_W3_Q19.png",
        alt: "Diagram showing a NovaTech web server, certificate signing request, public certification authority, domain ownership validation, issued SSL certificate, and web server installation.",
        caption: "NovaTech public SSL certificate acquisition scenario."
        },
    explanation: 'This matches the standard certificate acquisition sequence: create a certificate request, submit it to the public authority, complete validation, and install the resulting certificate.',
  },

  {
    id: 'ITCOA_W3_Q20',
    type: 'open-ended',
    tags: ['pki', 'ssl', 'csr'],
    sectionLabel: '3.2',
    text: 'What file is generated to request an SSL certificate from a public certification authority?',
    correctAnswers: ['CSR', 'Certificate Signing Request'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
      tolerance: 10,
    },
    explanation: 'A **CSR (Certificate Signing Request)** is generated to request the SSL certificate from the public CA, and is cryptographically tied to the private key created alongside it.',
  },

  {
    id: 'ITCOA_W3_Q21',
    type: 'fill-in-the-blank',
    tags: ['pki', 'ssl', 'domain validation'],
    sectionLabel: '3.3',
    text: 'When requesting a public SSL certificate, NovaTech must prove that it controls the relevant domain. This process is called domain ownership ___.',
    blanks: [
      {
        id: 'b1',
        options: ['validation', 'verification', 'enrollment', 'delegation'],
        correctAnswer: 'validation',
      },
    ],
  },

  {
    id: 'ITCOA_W3_Q22',
    type: 'multiple-choice',
    tags: ['pki', 'ssl', 'private key'],
    sectionLabel: '3.4',
    text: 'NovaTech installs an issued SSL certificate on a different server from the one that generated the CSR. The certificate does not show that the corresponding private key is present. What is the most likely explanation?',
    options: [
      'The certificate was installed without the private-key information associated with the original CSR',
      'The certificate authority automatically converted the certificate to IPv6',
      "The server must first receive a GPO through loopback processing",
      'The certificate can never be used on an IIS server',
    ],
    correctAnswers: ['The certificate was installed without the private-key information associated with the original CSR'],
    points: 2,
    explanation: 'The private key generated alongside the CSR remains on the original server unless deliberately exported and imported. Installing only the issued certificate on a different server, without the matching private key, leaves the certificate unusable for SSL on that server.',
  },

  {
    id: 'ITCOA_W3_Q23',
    type: 'show-answer',
    tags: ['pki', 'ssl', 'pfx', 'private key'],
    sectionLabel: '3.5',
    text: 'NovaTech wants to deploy the same SSL certificate on several web servers. The administrator proposes generating a new CSR and obtaining a separate copy of the certificate for every server. **Evaluate this approach and explain why exporting and importing the existing certificate may be preferable.** Your answer must address: the role of the private key; why a PFX file is relevant; why password protection matters; why the certificate should be imported with its corresponding private key.',
    correctAnswers: [
      {
        text: "NovaTech should generally **export and import the existing certificate** rather than repeatedly generating new CSRs and requesting new certificates for each server that needs the same SSL certificate.\n\nThe reason is that the existing certificate has an associated **private key**, and SSL functionality depends on the certificate being paired with its corresponding private key. Repeating the CSR process would create a *different* key pair on each server unnecessarily, and is not required when the intent is simply to reuse the same certificate.\n\nFrom MMC, the administrator can export the certificate and choose **Yes, export the private key**. This produces a **PFX** file, which bundles the certificate together with its private-key information into a single portable file.\n\nThe PFX must be protected with a **strong password**, because anyone who obtains both the file and its password could use the certificate and its private key to impersonate NovaTech's service.\n\nThe PFX can then be **imported on each additional server**, including its private key. The administrator should verify that the imported certificate shows the private-key indication — without it, the certificate cannot properly validate SSL traffic on that server.",
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correctly recommends export/import | 1 |
| Explains importance of private key | 1 |
| Identifies PFX as relevant container | 1 |
| Explains strong password requirement | 1 |
| Explains import with private key | 1 |
| Explains verification of private-key presence / SSL consequence | 1 |
| **Total** | **6** |

**Weak response example:** "Use PFX because it contains the certificate." This misses the central issue — the private key must accompany the certificate for SSL traffic validation on the second server.`,
    points: 6,
    image: {
        src: "/images/ITCOA_W3_Q23.png",
        alt: "Diagram showing an SSL certificate and private key associated with one web server, a PFX file, and multiple web servers.",
        caption: "Certificate and private-key deployment across NovaTech web servers."
        }
  },

  {
    id: 'ITCOA_W3_Q24',
    type: 'multiple-choice',
    tags: ['pki', 'ssl', 'mmc'],
    sectionLabel: '3.6',
    text: 'A NovaTech administrator wants to export an SSL certificate from MMC **without** including its private key. Which statement is correct?',
    options: [
      'This is impossible because MMC always exports the private key',
      'MMC allows the administrator to choose whether to export the private key',
      'Only IIS can export certificates without private keys',
      'A certificate without a private key cannot exist',
    ],
    correctAnswers: ['MMC allows the administrator to choose whether to export the private key'],
    points: 2,
    explanation: 'MMC lets the administrator explicitly decide whether to include the private key during export, unlike some other tools (e.g. IIS) which assume it should be included.',
  },

  {
    id: 'ITCOA_W3_Q25',
    type: 'show-answer',
    tags: ['pki', 'web enrollment', 'mmc'],
    sectionLabel: '3.7',
    text: 'NovaTech has a remote employee who is not using the normal MMC-based certificate-request workflow. The CA administrator is considering **Certification Authority Web Enrollment**. **Explain why this method may be appropriate for the situation and identify the key distinction between browser-based enrollment and requesting a certificate through MMC.**',
    correctAnswers: [
      {
        text: 'CA Web Enrollment is appropriate when NovaTech wants a **browser-based certificate-request process**, particularly for remote users or users who prefer a simpler interface than MMC.\n\nThe important distinction is that MMC uses the **Certificates snap-in** installed locally on the client computer, whereas Web Enrollment provides a **web interface** accessible through a browser, through which users can request certificates without needing the snap-in configured on their machine. This makes it especially useful for NovaTech\'s remote employee.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Identifies browser-based enrollment | 1 |
| Gives appropriate NovaTech scenario | 1 |
| Correctly distinguishes MMC from Web Enrollment | 1 |
| Explains practical benefit | 1 |
| **Total** | **4** |`,
    points: 4,
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 4 — Network Diagnostics, Routing & IPv6 (20 marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITCOA_W3_Q4',
    type: 'scenario',
    title: 'Question 4 – Network Diagnostics, Routing & IPv6 (20 Marks)',
    context: `NovaTech's Cape Town facility has deployed a new server with two network interfaces. One interface connects to the production network and the other to a management network. Administrators discover that the server has been configured with multiple default gateways, and some destinations are now unreachable.

At the same time, users report intermittent network problems, and the network team is unsure whether the cause is connectivity, routing, packet loss, or service availability.`,
  },

  {
    id: 'ITCOA_W3_Q26',
    type: 'multiple-choice',
    tags: ['networking', 'routing', 'default gateway'],
    sectionLabel: '4.1',
    text: 'What is the most important routing principle that applies to NovaTech\'s multi-homed Windows server?',
    options: [
      'A multi-homed server must always have two default gateways',
      'A device should have only one default gateway in its routing table',
      'Each NIC must have a different DNS server',
      'Every network interface must use IPv6',
    ],
    correctAnswers: ['A device should have only one default gateway in its routing table'],
    points: 2,
    image: {
        src: "/images/ITCOA_W3_Q26.png",
        alt: "Network topology showing a NovaTech Windows Server with two network interfaces connected to separate Production and Management networks, each with its own gateway.",
        caption: "NovaTech multi-homed server and network topology."
        },
    explanation: 'A device can have only one default gateway; configuring multiple default gateways, as NovaTech has done, causes unpredictable routing behaviour and can make destinations unreachable.',
  },

  {
    id: 'ITCOA_W3_Q27',
    type: 'open-ended',
    tags: ['networking', 'diagnostics', 'tracert'],
    sectionLabel: '4.2',
    text: 'Which Windows tool is specifically used to trace the path packets take toward a destination?',
    correctAnswers: ['Tracert', 'tracert'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
    explanation: '`Tracert` traces the hop-by-hop path packets take between the source device and a destination.',
  },

  {
    id: 'ITCOA_W3_Q28',
    type: 'multiple-choice',
    tags: ['networking', 'diagnostics', 'pathping'],
    sectionLabel: '4.3',
    text: 'NovaTech needs a diagnostic tool that not only traces the path but also provides statistics concerning packet loss at each hop. Which tool is the best choice?',
    options: ['Ping', 'Tracert', 'Pathping', 'TCPView'],
    correctAnswers: ['Pathping'],
    points: 2,
    explanation: 'Pathping combines path-tracing like Tracert with per-hop **packet-loss statistics**, making it the best match for this specific diagnostic requirement.',
  },

  {
    id: 'ITCOA_W3_Q29',
    type: 'fill-in-the-blank',
    tags: ['networking', 'powershell', 'diagnostics'],
    sectionLabel: '4.4',
    text: 'The PowerShell command used to test connectivity to a remote device while also providing information such as DNS resolution and connection diagnostics is ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Ping-Host', 'Get-NetRoute', 'Resolve-DnsName', 'Test-NetConnection'],
        correctAnswer: 'Test-NetConnection',
      },
    ],
  },

  {
    id: 'ITCOA_W3_Q30',
    type: 'multiple-choice',
    tags: ['networking', 'diagnostics', 'tcpview'],
    sectionLabel: '4.5',
    text: 'NovaTech wants to monitor all active TCP and UDP connections on a Windows computer. Which tool is most appropriate?',
    options: ['TCPView', 'Pathping', 'Test-Connection', 'Tracert'],
    correctAnswers: ['TCPView'],
    points: 2,
    explanation: 'TCPView displays active TCP and UDP connections on a Windows computer, which the other listed tools do not provide.',
  },

  {
    id: 'ITCOA_W3_Q31',
    type: 'show-answer',
    tags: ['networking', 'routing', 'route add', 'powershell'],
    sectionLabel: '4.6',
    text: "The network administrator believes that NovaTech's multi-homed server has an incorrect route. **Explain the information required to construct a route and compare the purpose of the Command Prompt and PowerShell approaches for adding a route.** Your answer should identify: destination; next hop; the relevant route concept; the Command Prompt mechanism; the PowerShell mechanism.",
    correctAnswers: [
      {
        text: 'To construct a route, the administrator needs the **destination** IP address (or network) and the **next hop** — the IP address of the device to which the packet should be sent next in order to reach that destination.\n\nIn **Command Prompt**, the relevant mechanism is:\n\n```\nroute add 192.168.1.10 mask 255.255.255.255 192.168.0.1\n```\n\nIn **PowerShell**, the equivalent mechanism is:\n\n```powershell\nNew-NetRoute -DestinationPrefix 192.168.1.10/32 -InterfaceIndex 3 -NextHop 192.168.0.1\n```\n\nTherefore, NovaTech should not simply add another default gateway. It should identify the specific destination and next hop required and create an appropriate static route for that traffic, rather than relying on multiple default gateways.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Identifies destination | 1 |
| Identifies next hop | 1 |
| Correctly explains next hop | 1 |
| Identifies \`route add\` | 1 |
| Identifies \`New-NetRoute\` | 1 |
| Correctly applies this to multi-homed NovaTech server | 1 |
| **Total** | **6** |`,
    points: 6,
    image: {
        src: "/images/ITCOA_W3_Q31.png",
        alt: "Network diagram showing a NovaTech server communicating through a next-hop router toward a destination network, alongside a neutral routing information panel.",
        caption: "Network route scenario showing source, next hop, destination, and interface information."
        }
  },

  {
    id: 'ITCOA_W3_Q32',
    type: 'multiple-choice',
    tags: ['networking', 'ipv6', 'addressing'],
    sectionLabel: '4.7',
    text: 'NovaTech is planning for future network growth. Which statement best distinguishes IPv6 from IPv4 according to the course material?',
    options: [
      'IPv6 uses 32-bit hexadecimal addresses, while IPv4 uses 128-bit addresses',
      'IPv6 uses 128-bit addresses and represents them using hexadecimal blocks separated by colons',
      'IPv6 eliminates the need for routing tables',
      'IPv6 requires every organisation to stop using NAT immediately',
    ],
    correctAnswers: ['IPv6 uses 128-bit addresses and represents them using hexadecimal blocks separated by colons'],
    points: 2,
    explanation: 'IPv6 addresses are 128 bits long and are represented using hexadecimal blocks separated by colons — unlike IPv4\'s 32-bit dotted-decimal addressing.',
  },

  {
    id: 'ITCOA_W3_Q33',
    type: 'fill-in-the-blank',
    tags: ['networking', 'ipv6', 'notation'],
    sectionLabel: '4.8',
    text: 'In IPv6 notation, consecutive blocks consisting entirely of zeros may be compressed using ___.',
    blanks: [
      {
        id: 'b1',
        options: ['a single colon (:)', 'hexadecimal shorthand', 'a double colon (::)', 'a subnet mask'],
        correctAnswer: 'a double colon (::)',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // QUESTION 5 — NIC Teaming, SDN & Hybrid Networking (10 marks)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'SCENARIO_ITCOA_W3_Q5',
    type: 'scenario',
    title: 'Question 5 – NIC Teaming, SDN & Hybrid Networking (10 Marks)',
    context: `NovaTech's management wants to improve network resilience and begin integrating its on-premises virtual infrastructure with cloud resources. The organisation is considering NIC teaming, Software-Defined Networking, Hyper-V Network Virtualization, private and hybrid cloud environments, and Azure connectivity.`,
  },

  {
    id: 'ITCOA_W3_Q34',
    type: 'multiple-choice',
    tags: ['networking', 'nic teaming'],
    sectionLabel: '5.1',
    text: 'NovaTech groups two or more physical network interface cards into a single logical interface primarily to improve:',
    options: [
      'certificate validity and encryption strength',
      'bandwidth, fault tolerance and load-balancing capabilities',
      'IPv6 address length',
      'Group Policy processing frequency',
    ],
    correctAnswers: ['bandwidth, fault tolerance and load-balancing capabilities'],
    points: 2,
    image: {
        src: "/images/ITCOA_W3_Q34.png",
        alt: "Diagram showing three physical network interface cards on a NovaTech Windows Server connected to one logical NIC Team and then to a network switch.",
        caption: "NovaTech physical network interfaces and logical NIC Team."
        },
    explanation: 'NIC teaming groups two or more physical NICs into one logical interface primarily to improve **bandwidth, fault tolerance, and load balancing** — not the unrelated concepts in the other options.',
  },

  {
    id: 'ITCOA_W3_Q35',
    type: 'open-ended',
    tags: ['networking', 'sdn'],
    sectionLabel: '5.2',
    text: 'What is the networking approach that separates the network control plane from the data plane and allows centralised software-based management?',
    correctAnswers: ['SDN', 'Software-Defined Networking'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true,
      tolerance: 10,
    },
    image: {
        src: "/images/ITCOA_W3_Q35.png",
        alt: "Network architecture diagram showing separate Control Plane and Data Plane areas, with network switches, routers, virtual networks, and servers below.",
        caption: "Network architecture showing control and data plane components."
        },
    explanation: '**Software-Defined Networking (SDN)** separates the control plane from the data plane, allowing network resources to be centrally managed through software.',
  },

  {
    id: 'ITCOA_W3_Q36',
    type: 'multiple-choice',
    tags: ['networking', 'hyper-v', 'virtualization'],
    sectionLabel: '5.3',
    text: 'NovaTech operates several virtual networks for different applications on the same physical infrastructure. The company wants those virtual networks to remain isolated from one another. Which technology most directly addresses this requirement?',
    options: [
      'Hyper-V Network Virtualization',
      'TCPView',
      'Certificate Authority Web Enrollment',
      'Group Policy Loopback',
    ],
    correctAnswers: ['Hyper-V Network Virtualization'],
    points: 2,
    image: {
        src: "/images/ITCOA_W3_Q36.png",
        alt: "Diagram showing multiple virtual networks containing virtual machines sharing physical servers and a physical network switch.",
        caption: "Virtual networks operating across shared physical infrastructure."
        },
    explanation: 'Hyper-V Network Virtualization allows multiple virtual networks to share the same physical infrastructure while remaining isolated from one another — unlike the unrelated tools in the other options.',
  },

  {
    id: 'ITCOA_W3_Q37',
    type: 'fill-in-the-blank',
    tags: ['networking', 'cloud computing'],
    sectionLabel: '5.4',
    text: 'A cloud environment dedicated to a single organisation is known as a ___ cloud.',
    blanks: [
      {
        id: 'b1',
        options: ['public', 'private', 'hybrid', 'community'],
        correctAnswer: 'private',
      },
    ],
  },

  {
    id: 'ITCOA_W3_Q38',
    type: 'show-answer',
    tags: ['networking', 'sdn', 'azure', 'hybrid cloud'],
    sectionLabel: '5.5',
    text: 'NovaTech wants to extend its on-premises network into Microsoft Azure and support a hybrid-cloud scenario. **Explain the role of SDN in this requirement and identify one relevant technology or component from the course material that could support the connection.**',
    correctAnswers: [
      {
        text: 'SDN provides a software-defined, centrally managed approach to networking by separating the control plane from the data plane. This makes it well suited to managing and extending NovaTech\'s network infrastructure toward cloud resources, since network configuration can be applied and adjusted centrally rather than device-by-device.\n\nOne suitable technology is the **Azure Network Adapter**, which provides a streamlined way to connect on-premises networks to Microsoft Azure. An acceptable alternative answer is the **RAS Gateway / SDN Gateway**, which connects on-premises networks to an SDN environment.',
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correctly explains SDN's centralised/software-defined networking role | 1 |
| Identifies and appropriately explains an applicable Azure/SDN component | 1 |
| **Total** | **2** |`,
    points: 2,
  },
];
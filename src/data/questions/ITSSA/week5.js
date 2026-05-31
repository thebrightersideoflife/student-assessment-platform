// src/data/questions/ITSSA2/week5.js
// Week 5 – Access Control, Authentication, Biometrics, Firewalls and Intrusion Detection

export default [

  // ─── SCENARIO ─────────────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITSSA2_W5",
    type: "scenario",
    title: "Week 5 Assessment: Access Control, Authentication, Biometrics, Firewalls and Intrusion Detection (50 Marks)",
    context: `**NovaCore Technologies** is a multinational manufacturer of industrial control systems used in power plants, airports, and transportation networks.\n\nFollowing several cybersecurity incidents, the company has launched a security modernisation programme. Internal investigations revealed several weaknesses:\n\n- Employees **reuse passwords** across multiple systems.\n- Contractors **frequently share credentials**.\n- Engineers access systems remotely from multiple countries.\n- Legacy firewalls rely mainly on **static packet filtering**.\n- The company plans to introduce **biometric authentication** at research facilities.\n- Security analysts have detected several **suspicious network activities** that bypassed perimeter defenses.\n- Senior management wants stronger access control while maintaining usability for employees.\n\nYou have been appointed as a **security consultant** and are required to evaluate NovaCore's proposed security architecture.`,
  },

  // ─── QUESTION 1 – ACCESS CONTROL STRATEGY ────────────────────────────────

  {
    id: "ITSSA2_W5_Q1",
    type: "multiple-choice",
    tags: ["access control"],
    sectionLabel: "1.1",
    text: "A project manager argues that implementing stronger authorization rules will eliminate the need for authentication controls.\n\nWhich statement **best** evaluates this claim?",
    options: [
      "Authorization determines identity, therefore authentication becomes redundant.",
      "Authentication and authorization solve different security problems; authorization depends on successful authentication.",
      "Authorization is a subset of authentication because both determine user privileges.",
      "Authentication only applies to humans while authorization applies to systems.",
    ],
    correctAnswers: [
      "Authentication and authorization solve different security problems; authorization depends on successful authentication.",
    ],
    points: 1,
    explanation:
      "**Authentication** establishes *who* a user is ('Who are you?'). **Authorization** determines *what* that verified user is permitted to do ('What may you do?'). A system cannot correctly authorize a user until it first knows their identity — making the two controls complementary, not competing.",
  },

  {
    id: "ITSSA2_W5_Q2",
    type: "fill-in-the-blank",
    tags: ["access control"],
    sectionLabel: "1.2",
    text: 'The security question "Who goes there?" refers to ___.',
    blanks: [
      {
        id: "b1",
        options: ["Identification", "Authorization", "Authentication", "Encryption"],
        correctAnswer: "Authentication",
      },
    ],
    explanation:
      'The phrase "Who goes there?" is the classic definition of **authentication** throughout access control literature — the process of verifying the identity of a user or entity.',
  },

  {
    id: "ITSSA2_W5_Q3",
    type: "open-ended",
    tags: ["access control"],
    sectionLabel: "1.3",
    text: "NovaCore wants to implement a control that combines a **smart card** and a **PIN**.\n\nWhat authentication principle is being applied? *(1–3 words)*",
    correctAnswers: [
      "Two-factor authentication",
      "2FA",
      "Multi-factor authentication",
      "MFA",
      "Two factor authentication",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation:
      "A PIN represents **something you know**; a smart card represents **something you have**. Combining two independent factors creates **two-factor authentication (2FA)** — a specific form of multi-factor authentication.",
      image: {
        src: "/images/ITSSA_W5_Q3.png",
        alt: "Sequence diagram showing a user providing a username, smart card token, and PIN to an authentication server before access is granted.",
        caption: "Authentication exchange between a user and an authentication server."
        }
  },

  {
    id: "ITSSA2_W5_Q4",
    type: "multiple-choice",
    tags: ["access control", "social engineering"],
    sectionLabel: "1.4",
    text: "NovaCore's engineers frequently choose passwords based on their pets' names, children's birthdays, and favourite sports teams.\n\nWhich attack is **MOST likely** to succeed?",
    options: [
      "Iris spoofing",
      "Dictionary attack",
      "Firewalk attack",
      "Stateful inspection attack",
    ],
    correctAnswers: ["Dictionary attack"],
    points: 2,
    explanation:
      "Names, birthdays, and sports teams are highly predictable choices that commonly appear in attacker wordlists. A **dictionary attack** specifically exploits this pattern by systematically trying a large list of likely passwords. The other options target unrelated systems or protocols.",
  },

  {
    id: "ITSSA2_W5_Q5",
    type: "show-answer",
    tags: ["access control", "risk management", "security policies"],
    sectionLabel: "1.5",
    text: "The Chief Information Security Officer proposes **replacing all passwords with biometric authentication**.\n\nCritically evaluate this proposal. Your answer should discuss:\n- Why organisations seek alternatives to passwords\n- Characteristics of an ideal biometric\n- Biometric strengths and weaknesses\n- The problem of biometric compromise\n- Whether passwords should be eliminated completely",
    correctAnswers: [
      "Passwords remain one of the weakest components of organisational security because they rely heavily on human behaviour. Users often choose predictable passwords, reuse credentials across systems, write passwords down, or disclose them through social engineering attacks. Consequently, organisations increasingly seek stronger authentication methods.\n\n**Biometric authentication** offers an attractive alternative because it relies on *something a person is* rather than something they know. Examples include fingerprints, iris patterns, facial recognition, and voice recognition. Since biometrics cannot easily be forgotten, they reduce several common password-related weaknesses.\n\nAn ideal biometric should possess several characteristics. It should be **universal** (almost every user possesses it), **distinguishing** (differentiate individuals accurately), **permanent** over time, **collectable** without excessive difficulty, **safe**, and **convenient** for users.\n\nDespite these advantages, biometrics have important limitations. No biometric system provides perfect accuracy. Every system experiences a **false acceptance rate** (fraud) and a **false rejection rate** (insult). Attackers may also exploit biometric systems through presentation attacks, compromised databases, or software manipulation.\n\nPerhaps the most significant limitation is **revocation**. A compromised password can be changed immediately, whereas a compromised fingerprint or iris cannot be replaced in the same way. This creates long-term security concerns that passwords do not.\n\nFor these reasons, biometrics should **not** completely replace passwords. The strongest solution is **multi-factor authentication**, combining biometrics with another authentication factor to provide defence in depth while preserving usability and security.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Password weaknesses discussed | 2 |
| Characteristics of ideal biometric | 2 |
| Biometric strengths | 1 |
| Biometric weaknesses | 1 |
| Revocation problem explained | 1 |
| Balanced conclusion recommending MFA | 1 |
| **Total** | **8** |

**Examiner Insight:** A+ answers discuss *why* biometrics are attractive AND *why* they are still imperfect. Weak answers simply list advantages and disadvantages without synthesis.`,
    points: 8,
  },

  // ─── QUESTION 2 – PASSWORD SECURITY INVESTIGATION ────────────────────────

  {
    id: "ITSSA2_W5_Q6",
    type: "fill-in-the-blank",
    tags: ["hashing"],
    sectionLabel: "2.1",
    text: "To prevent attackers from efficiently reusing pre-computed password hash tables across users, passwords should be stored with a unique ___.",
    blanks: [
      {
        id: "b1",
        options: ["salt", "hash", "cipher", "token"],
        correctAnswer: "salt",
      },
    ],
    explanation:
      "A **salt** is a unique random value prepended or appended to each password before hashing. This ensures that two users with the same password still produce different stored hashes, defeating pre-computed rainbow table attacks.",
  },

  {
    id: "ITSSA2_W5_Q7",
    type: "multiple-choice",
    tags: ["hashing", "risk management"],
    sectionLabel: "2.2",
    text: "Why does **salting** significantly increase an attacker's workload?",
    options: [
      "It encrypts the password before hashing.",
      "It requires attackers to generate separate hash calculations for each user.",
      "It prevents passwords from being hashed.",
      "It makes passwords impossible to guess.",
    ],
    correctAnswers: [
      "It requires attackers to generate separate hash calculations for each user.",
    ],
    points: 2,
    explanation:
      "Without salting, an attacker can build a single rainbow table and look up any hash in constant time. With salting, the attacker must recompute hashes **separately for every user** using that user's unique salt — multiplying the computational cost by the size of the user database.",
      image: {
        src: "/images/ITSSA_W5_Q7.png",
        alt: "Authentication database table showing three users with the same password but different salts and different stored password hashes.",
        caption: "Figure 3: Extract from NovaCore authentication database showing password storage records."
        }
  },

  {
    id: "ITSSA2_W5_Q8",
    type: "open-ended",
    tags: ["hashing"],
    sectionLabel: "2.3",
    text: "What type of attack relies on **pre-computed hashes** of commonly used passwords? *(1–3 words)*",
    correctAnswers: [
      "Dictionary attack",
      "Rainbow table attack",
      "Rainbow table",
      "dictionary attack",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation:
      "A **dictionary attack** (or more specifically a **rainbow table attack**) uses a pre-built list of passwords and their corresponding hashes. The attacker looks up stolen hashes against this list rather than computing them on the fly, making the process very fast when salting has not been applied.",
  },

  {
    id: "ITSSA2_W5_Q9",
    type: "multiple-choice",
    tags: ["security policies", "cultural challenges"],
    sectionLabel: "2.4",
    text: "A security administrator proposes forcing password changes **every seven days**.\n\nWhich criticism is **MOST** aligned with the course material?",
    options: [
      "Frequent changes guarantee strong passwords.",
      "Frequent changes eliminate password reuse.",
      "User compliance may decrease, leading to weaker practical security.",
      "Frequent changes prevent social engineering.",
    ],
    correctAnswers: [
      "User compliance may decrease, leading to weaker practical security.",
    ],
    points: 2,
    explanation:
      "When password change intervals are too short, users typically respond by choosing simpler, more predictable passwords or adopting weak rotation patterns (e.g., `Password1`, `Password2`). The net effect is *weaker* practical security despite technically meeting the policy requirement.",
  },

  {
    id: "ITSSA2_W5_Q10",
    type: "show-answer",
    tags: ["hashing", "social engineering", "risk management"],
    sectionLabel: "2.5",
    text: "NovaCore asks whether **password security is fundamentally a technology problem or a human problem**.\n\nDiscuss and justify your position using examples from the scenario and course concepts.",
    correctAnswers: [
      "Password security is fundamentally a **socio-technical problem** involving both technology and human behaviour. Technical mechanisms such as hashing, salting, account lockout controls, and password auditing provide strong protection. However, these controls are frequently undermined by user behaviour.\n\nAt NovaCore, engineers select passwords based on personal information, making them vulnerable to **dictionary attacks**. **Password reuse** further increases risk because compromising one system can provide access to multiple systems.\n\n**Social engineering** compounds this problem. Attackers often bypass technical safeguards entirely by manipulating users into revealing credentials — a threat that cryptography alone cannot prevent.\n\nAlthough cryptographic protections are mathematically strong, security ultimately depends on how people interact with the system. Effective password security therefore requires a combination of technical controls, user education, security policies, auditing, and organisational culture.\n\nConsequently, password security should be viewed as a **socio-technical challenge** rather than purely a technological one.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Technical controls discussed | 2 |
| Human behaviour discussed | 2 |
| Social engineering included | 1 |
| Balanced conclusion | 1 |
| **Total** | **6** |

**Examiner Insight:** The highest-level answers recognise that strong cryptography alone cannot compensate for poor user behaviour. Exceptional answers explicitly connect human behaviour to cryptographic limitations.`,
    points: 6,
  },

  // ─── QUESTION 3 – BIOMETRIC ACCESS CONTROL ───────────────────────────────

  {
    id: "ITSSA2_W5_Q11",
    type: "multiple-choice",
    tags: ["access control"],
    sectionLabel: "3.1",
    text: "Why is **authentication** generally easier than **identification** in biometric systems?",
    options: [
      "Authentication compares one individual against one stored template.",
      "Authentication uses stronger sensors.",
      "Authentication eliminates fraud rates.",
      "Authentication does not require enrollment.",
    ],
    correctAnswers: [
      "Authentication compares one individual against one stored template.",
    ],
    points: 2,
    explanation:
      "**Authentication** is a *1-to-1* comparison: the system checks whether the captured biometric matches a single stored template for the claimed identity. **Identification** is *1-to-many*: the system searches all stored templates to find a match — introducing significantly more opportunities for false matches and requiring greater computational effort.",
  },

  {
    id: "ITSSA2_W5_Q12",
    type: "fill-in-the-blank",
    tags: ["access control"],
    sectionLabel: "3.2",
    text: "The point at which the fraud rate equals the insult rate is known as the ___ ___ rate.",
    blanks: [
      {
        id: "b1",
        options: ["False", "Acceptance", "Equal", "Error"],
        correctAnswer: "Equal",
      },
      {
        id: "b2",
        options: ["Rejection", "Error", "Acceptance", "Threshold"],
        correctAnswer: "Error",
      },
    ],
    explanation:
      "The **Equal Error Rate (EER)** is the operating point on a biometric system's ROC curve where the **False Acceptance Rate** (fraud — impostor accepted) equals the **False Rejection Rate** (insult — legitimate user rejected). A lower EER indicates a more accurate system.",
      image: {
        src: "/images/ITSSA_W5_Q12.png",
        alt: "Graph showing biometric fraud rate decreasing and insult rate increasing as matching threshold changes, with both curves intersecting at point X.",
        caption: "Figure 1: Relationship between fraud rate, insult rate, and matching threshold in a biometric authentication system."
        }
  },

  {
    id: "ITSSA2_W5_Q13",
    type: "multiple-choice",
    tags: ["access control", "risk management"],
    sectionLabel: "3.3",
    text: "Which biometric characteristic is **MOST strongly** associated with long-term stability and uniqueness according to the course material?",
    options: [
      "Hand geometry",
      "Password generators",
      "Iris patterns",
      "Voice recognition",
    ],
    correctAnswers: ["Iris patterns"],
    points: 2,
    explanation:
      "The course specifically highlights **iris patterns** as highly stable over a person's lifetime and strongly unique — even between identical twins and between a person's left and right eyes. They are largely unaffected by genetics, unlike other biometrics such as hand geometry or voice.",
      image: {
        src: "/images/ITSSA_W5_Q13.png",
        alt: "Comparison table evaluating fingerprint, hand geometry, iris recognition, and voice recognition using uniqueness, permanence, enrollment difficulty, and recognition speed.",
        caption: "Figure 7: Characteristics of selected biometric authentication technologies."
        }
  },

  {
    id: "ITSSA2_W5_Q14",
    type: "show-answer",
    tags: ["access control", "risk management"],
    sectionLabel: "3.4",
    text: "NovaCore's board believes that **a successful iris scan automatically proves a user's identity with complete certainty**.\n\nEvaluate this assumption.",
    correctAnswers: [
      "The board's assumption is incorrect because biometric authentication is based on **statistical probability** rather than absolute certainty. During recognition, a captured biometric sample is compared against a stored template and evaluated against a predefined acceptance threshold.\n\n**Iris recognition** is highly accurate because iris patterns remain stable over a person's lifetime and exhibit strong uniqueness. However, no biometric system eliminates **false acceptance** (a fraudulent user accepted) or **false rejection** (a legitimate user denied) entirely. Adjusting the threshold moves the balance between these error rates — it does not remove them.\n\nFurthermore, biometric systems may be attacked through presentation attacks (e.g., high-resolution photographs), stolen templates, compromised databases, or weaknesses in enrollment procedures.\n\nTherefore, a successful iris scan provides **strong evidence** of identity but does not constitute absolute proof. Security professionals should treat biometrics as a highly reliable authentication mechanism rather than a perfect one.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Statistical matching explained | 1 |
| EER / fraud / insult rate discussion | 1 |
| Attack possibilities mentioned | 1 |
| Conclusion rejects absolute certainty | 1 |
| **Total** | **4** |`,
    points: 4,
    image: {
        src: "/images/ITSSA_W5_Q14.png",
        alt: "Flowchart showing captured iris image, feature extraction, iris code generation, template comparison, and access decision based on a matching threshold.",
        caption: "Figure 2: Simplified iris recognition and matching process used in biometric authentication."
        }
  },

  // ─── QUESTION 4 – NETWORK PROTECTION AND INTRUSION DETECTION ─────────────

  {
    id: "ITSSA2_W5_Q15",
    type: "multiple-choice",
    tags: ["firewalls & filtering"],
    sectionLabel: "4.1",
    text: "A traditional **packet-filter firewall** primarily makes decisions using which information?",
    options: [
      "User behaviour history",
      "Packet header information",
      "Biometric templates",
      "Application source code",
    ],
    correctAnswers: ["Packet header information"],
    points: 2,
    explanation:
      "Packet-filter firewalls operate at the network layer, examining **packet header fields** — typically source IP address, destination IP address, protocol type, and port numbers — to allow or deny traffic. They have no visibility into connection state or application-layer content.",
      image: {
        src: "/images/ITSSA_W5_Q15.png",
        alt: "Firewall rules table containing source, destination, port, and action fields alongside a simple network diagram showing Internet, Firewall, and Internal Network.",
        caption: "Figure 4: Firewall filtering rules used to control access between external and internal systems."
        }
  },

  {
    id: "ITSSA2_W5_Q16",
    type: "open-ended",
    tags: ["firewalls & filtering"],
    sectionLabel: "4.2",
    text: "What type of firewall **tracks the state of active network connections** before making decisions? *(1–3 words)*",
    correctAnswers: [
      "Stateful firewall",
      "Stateful packet filter",
      "Stateful inspection firewall",
      "Stateful inspection",
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
      allowPartialMatch: true,
    },
    explanation:
      "A **stateful firewall** (also called a stateful packet filter or stateful inspection firewall) maintains a connection state table. By tracking whether inbound packets belong to an existing legitimate session, it makes far more informed decisions than a simple packet filter, blocking unsolicited packets that superficially appear valid.",
  },

  {
    id: "ITSSA2_W5_Q17",
    type: "multiple-choice",
    tags: ["intrusion detection", "firewalls & filtering"],
    sectionLabel: "4.3",
    text: "Which statement **best** distinguishes an Intrusion Detection System (IDS) from a firewall?",
    options: [
      "Firewalls detect attacks while IDSs encrypt traffic.",
      "IDSs monitor and identify suspicious activity; firewalls primarily control traffic flow.",
      "IDSs replace authentication mechanisms.",
      "Firewalls and IDSs perform identical functions.",
    ],
    correctAnswers: [
      "IDSs monitor and identify suspicious activity; firewalls primarily control traffic flow.",
    ],
    points: 2,
    explanation:
      "**Firewalls** are *preventive* controls — they enforce access rules at network boundaries by permitting or blocking traffic. **IDS** systems are *detective* controls — they analyse network traffic or host activity to identify suspicious patterns and raise alerts. The two technologies are complementary and are often deployed together.",
      image: {
        src: "/images/ITSSA_W5_Q17.png",
        alt: "Network topology showing Internet traffic passing through a firewall, then an IDS sensor, before reaching a corporate network containing servers and workstations.",
        caption: "Figure 5: Layered network security architecture incorporating both preventive and detective controls."
        }
  },

  {
    id: "ITSSA2_W5_Q18",
    type: "fill-in-the-blank",
    tags: ["intrusion detection"],
    sectionLabel: "4.4",
    text: "An IDS that detects attacks by matching known attack patterns uses ___ detection.",
    blanks: [
      {
        id: "b1",
        options: ["Heuristic", "Signature", "Anomaly", "Behavioural"],
        correctAnswer: "Signature",
      },
    ],
    explanation:
      "**Signature-based detection** (also called misuse detection) identifies attacks by comparing observed activity against a database of known attack patterns — analogous to how antivirus software uses virus definitions. It is highly effective against known threats but cannot identify novel attack variants without a matching signature.",
  },

  {
    id: "ITSSA2_W5_Q19",
    type: "multiple-choice",
    tags: ["intrusion detection", "network threats"],
    sectionLabel: "4.5",
    text: "Which limitation is **inherent** to signature-based intrusion detection?",
    options: [
      "It cannot detect known attacks.",
      "It is ineffective against all malware.",
      "It may fail to recognise previously unseen attack variations.",
      "It requires biometric enrollment.",
    ],
    correctAnswers: [
      "It may fail to recognise previously unseen attack variations.",
    ],
    points: 2,
    explanation:
      "Signature-based IDS systems are excellent at detecting **known** attacks that exactly match stored signatures. Their key weakness is that **zero-day exploits** or slight variations of known attacks — without a corresponding signature — will pass undetected. This is why anomaly-based detection complements signature-based approaches.",
  },

  {
    id: "ITSSA2_W5_Q20",
    type: "show-answer",
    tags: ["firewalls & filtering", "intrusion detection", "access control", "CIA triad"],
    sectionLabel: "4.6",
    text: "NovaCore's executives believe that **installing a next-generation firewall alone will provide complete protection against cyberattacks**.\n\nCritically evaluate this belief using concepts from access control, firewalls, authentication, and intrusion detection.",
    correctAnswers: [
      "The executives' belief reflects a common misunderstanding of cybersecurity. While modern firewalls significantly reduce exposure to external threats, they cannot independently provide complete protection.\n\n**Firewalls** primarily control traffic entering and leaving networks. They are highly effective at enforcing access rules and reducing attack surfaces. However, they cannot fully address threats arising from stolen credentials, insider attacks, social engineering, weak passwords, or compromised endpoints. Even the most sophisticated firewall cannot determine whether a legitimately authenticated user is acting maliciously.\n\n**Authentication** mechanisms ensure users are correctly identified before access is granted. Without strong authentication, an attacker who obtains valid credentials can bypass firewall controls entirely — as demonstrated by NovaCore's credential-sharing contractors.\n\n**Authorisation** controls restrict what authenticated users can do, limiting the damage from compromised accounts.\n\n**Intrusion Detection Systems** provide additional visibility by identifying suspicious activity *after* it bypasses preventive controls — filling a gap that firewalls alone cannot address.\n\nNovaCore's scenario illustrates why layered security is essential. Password weaknesses, remote access, contractor credential sharing, and insider risks all exist independently of firewall technology.\n\nThe most effective approach is **defence in depth**, where authentication, authorisation, firewall technologies, IDS monitoring, and organisational security policies operate together to preserve **confidentiality, integrity, and availability**.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Firewall role explained | 1 |
| Firewall limitations discussed | 1 |
| Authentication included | 1 |
| Authorization included | 1 |
| IDS included | 1 |
| Defence-in-depth conclusion | 1 |
| **Total** | **6** |

**Examiner Insight:** The strongest answers move beyond *describing* individual technologies and explain how different controls collectively support the CIA Triad. Top responses explicitly argue for layered security and explain why each control addresses a different risk.`,
    points: 6,
  },
];
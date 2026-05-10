// src/data/questions/ITSSA/week2.js
export default [

  // ─────────────────────────────────────────────
  // SCENARIO BLOCK
  // ─────────────────────────────────────────────
  {
    id: "ITSSA_W2_SCENARIO",
    type: "scenario",
    context: "In April 2026, Vercel disclosed that attackers pivoted from a compromised third-party environment into internal systems after malware stole employee credentials. Around the same period, Microsoft warned of large-scale corporate phishing campaigns in which employees were lured by fake internal compliance notices.\n\nNow consider Aurelia Dynamics, a multinational manufacturer of industrial control electronics.\n\nAurelia Dynamics operates:\n• Cloud-hosted engineering repositories\n• A global finance platform\n• Remote VPN access for engineers\n• Customer support portals\n• Internal Wi-Fi in research facilities\n\nDuring a three-day period, the following occurred:\n1. Several engineers received emails claiming to come from internal compliance officers asking them to \"review policy violations\".\n2. A finance employee installed a \"document viewer update\" downloaded from a redirected webpage.\n3. Shortly afterward, unusual outbound traffic appeared from finance workstations.\n4. Customer support staff received calls from someone claiming to be senior IT, urgently requesting password resets.\n5. Two regional plants temporarily lost access to inventory databases after network traffic flooded wireless gateways.\n6. Some archived design documents were later discovered to have been encrypted and inaccessible.\n\nUse only the scenario above when answering all questions.",
  },

  // ─────────────────────────────────────────────
  // QUESTION 1 — Threat Classification, Information State, and Attack Logic
  // ─────────────────────────────────────────────

  {
    id: "ITSSA_W2_Q1",
    type: "multiple-choice",
    tags: ["threat modelling", "risk management"],
    sectionLabel: "1.1",
    text: "At the moment the finance employee installs the \"document viewer update,\" which classification is **most precise**?",
    options: [
      "A disclosure attack against storage assets",
      "A vulnerability becoming a realized attack during processing",
      "A threat against transmission without asset compromise",
      "A mitigation failure limited to availability only",
    ],
    correctAnswers: ["A vulnerability becoming a realized attack during processing"],
    points: 2,
    explanation: "The key distinction is between *risk* and *attack*. Once malicious code executes, the risk has been realized. Because execution is actively occurring, the dominant information state is **processing** — the malware is not merely stored or in transit.",
  },

  {
    id: "ITSSA_W2_Q2",
    type: "fill-in-the-blank",
    tags: ["threat modelling"],
    sectionLabel: "1.2",
    text: "In the terminology of secure systems, a realized risk is called an ___.",
    blanks: [
      {
      id: "b1",
      options: ["exploit", "threat", "incident", "attack", "vulnerability"],
      correctAnswer: "attack",
      },
      ],
    explanation: "A **threat** plus an exploitable **vulnerability** creates **risk**. When exploitation actually occurs, the risk materialises into an **attack**.",
  },

  {
    id: "ITSSA_W2_Q3",
    type: "open-ended",
    tags: ["threat modelling"],
    sectionLabel: "1.3",
    text: "Which **information state** is primarily involved when malware executes on the finance workstation?",
    correctAnswers: ["processing", "in processing", "data in processing"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation: "The malware is actively being executed and acted upon by the system — this is the **processing** state. The other states are *storage* (data at rest) and *transmission* (data in transit).",
  },

  {
    id: "ITSSA_W2_Q4",
    type: "multiple-choice",
    tags: ["CIA triad", "network threats"],
    sectionLabel: "1.4",
    text: "The flooding of wireless gateways most directly threatens which assurance?",
    options: [
      "Confidentiality",
      "Integrity",
      "Availability",
      "Authenticity",
    ],
    correctAnswers: ["Availability"],
    points: 2,
    explanation: "Flooding wireless gateways prevents legitimate users from reaching resources — a classic **denial of availability**. The attack does not directly read or alter data, so confidentiality and integrity are not the primary targets here.",
  },

  {
    id: "ITSSA_W2_Q5",
    type: "fill-in-the-blank",
    tags: ["CIA triad", "threat modelling"],
    sectionLabel: "1.5",
    text: "Within the **McCumber Cube**, disclosure, alteration, and denial are collectively abbreviated as ___.",
    blanks: [
      {
        id: "b1",
        options: ["CIA", "AAA", "DID", "DAD"],
        correctAnswer: "DAD",
      },
    ],
    explanation: "**DAD** stands for **D**isclosure, **A**lteration, and **D**enial — the attack-oriented mirror of the CIA triad (Confidentiality, Integrity, Availability).",
  },

  {
    id: "ITSSA_W2_Q6",
    type: "show-answer",
    tags: ["threat modelling", "risk management", "CIA triad"],
    sectionLabel: "1.6",
    text: "Using the Aurelia Dynamics scenario, explain how the attack sequence can be analysed using the following concepts:\n\n- **asset**\n- **threat**\n- **vulnerability**\n- **risk**\n- **attack vector**\n- **mitigation**",
    correctAnswers: [
      {
        text: "At **Aurelia Dynamics**, the primary **assets** include engineering designs, finance systems, employee credentials, and inventory databases.\n\nA **threat** exists where adversaries seek to disclose confidential engineering data, alter system trust relationships, or deny access to operational systems.\n\nThe **vulnerabilities** are both technical and human. Technical weaknesses include executable downloads and network exposure; human weaknesses include staff susceptibility to phishing and authority-based deception.\n\nA **risk** emerges when these threats and vulnerabilities intersect. A malicious email alone is not yet an attack — but when an employee trusts the sender and executes the malware, exploitable conditions exist and risk becomes concrete.\n\nThe **attack vector** is the concrete path followed by the attacker:\n\nphishing email → malicious redirection → fake software update → malware execution → credential theft → lateral movement → ransomware or service disruption\n\n**Mitigation** focuses on reducing vulnerability exposure:\n- User awareness training\n- Email filtering\n- Least privilege\n- Endpoint execution controls\n- Network segmentation\n- Monitoring anomalous outbound traffic\n\nA strong interpretation also recognises that this single incident threatens **confidentiality** (credential and data theft), **integrity** (system manipulation), and **availability** (wireless flooding and encrypted files) — rather than belonging neatly to only one CIA category.",
        diagram: {
          type: "mermaid",
          code: `flowchart LR
A[Phishing email] --> B[Malicious redirect]
B --> C[Fake software update]
C --> D[Malware execution]
D --> E[Credential theft]
E --> F[Lateral movement]
F --> G[Ransomware / disruption]`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correct identification of assets | 3 |
| Clear distinction between threat and vulnerability | 4 |
| Accurate explanation of risk | 2 |
| Realistic attack vector path | 4 |
| Appropriate mitigation discussion | 4 |
| Recognition of CIA overlap | 1 |
| **Total** | **18** |

**Common errors:** Defining terms without mapping them to the scenario. Top answers name specific events (e.g. the fake update, the password-reset call) for each concept rather than giving generic definitions.`,
    points: 18,
    image: {
        src: "/images/ITSSA_W2_Q6.png",
        alt: "Attack vector diagram showing a multi-stage enterprise compromise at Aurelia Dynamics, from phishing email through malware execution, credential theft, lateral movement, and ransomware disruption.",
        caption: "Figure 1. Multi-stage attack vector illustrating how a phishing-led compromise escalates into credential theft, lateral movement, and operational disruption."
        }
  },

  // ─────────────────────────────────────────────
  // QUESTION 2 — Malware, Payloads, and Strategic Classification
  // ─────────────────────────────────────────────

  {
    id: "ITSSA_W2_Q7",
    type: "multiple-choice",
    tags: ["application security", "threat modelling"],
    sectionLabel: "2.1",
    text: "The \"document viewer update\" most strongly fits which malware category **at the point of installation**?",
    options: [
      "Worm",
      "Trojan",
      "Botware",
      "Spam",
    ],
    correctAnswers: ["Trojan"],
    points: 2,
    explanation: "A **trojan** masquerades as legitimate software and requires user action to execute. The fake update fulfils both conditions: it poses as a routine document-viewer patch and the employee installs it voluntarily. A *worm* self-propagates without user intervention; *botware* emphasises remote control; *spam* is unsolicited bulk messaging.",
  },

  {
    id: "ITSSA_W2_Q8",
    type: "open-ended",
    tags: ["incident response"],
    sectionLabel: "2.2",
    text: "What malware type specifically holds data hostage until payment is made?",
    correctAnswers: ["ransomware", "ransom ware", "ransom-ware"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation: "**Ransomware** encrypts or locks the victim's files and demands payment in exchange for the decryption key. In the scenario, the encrypted archived design documents are the ransomware payload.",
  },

  {
    id: "ITSSA_W2_Q9",
    type: "fill-in-the-blank",
    tags: ["application security"],
    sectionLabel: "2.3",
    text: "A program that spreads by duplicating itself **with human intervention** is a ___.",
    blanks: [
      {
        id: "b1",
        options: ["worm", "virus", "trojan", "botware"],
        correctAnswer: "virus",
      },
    ],
    explanation: "A **virus** self-replicates but requires a human action (opening a file, running a program) to spread. A *worm*, by contrast, propagates automatically across networks without any human involvement.",
  },

  {
    id: "ITSSA_W2_Q10",
    type: "multiple-choice",
    tags: ["network threats", "intrusion detection"],
    sectionLabel: "2.4",
    text: "Suppose the installed malware silently receives remote instructions from an external command server. Which classification is now **most accurate**?",
    options: [
      "Adware",
      "Botware",
      "Spam",
      "SEO manipulation",
    ],
    correctAnswers: ["Botware"],
    points: 2,
    explanation: "Once a compromised machine receives and executes instructions from a remote command-and-control (C2) server, the defining feature becomes **remote control** — the hallmark of **botware**. The trojan was the delivery mechanism; botware describes the post-installation capability.",
  },

  {
    id: "ITSSA_W2_Q11",
    type: "multiple-choice",
    tags: ["threat modelling"],
    sectionLabel: "2.5",
    text: "Which distinction is **conceptually strongest**?",
    options: [
      "All trojans self-replicate",
      "All ransomware requires stealth persistence",
      "Botware emphasizes remote control rather than disguise",
      "Viruses do not require human involvement",
    ],
    correctAnswers: ["Botware emphasizes remote control rather than disguise"],
    points: 2,
    explanation: "**Botware** is defined by the remote-control relationship between the infected host and the command-and-control server — not by how it was delivered. The other options contain errors: trojans do *not* self-replicate; ransomware does not always require stealth persistence; and viruses *do* require human involvement (unlike worms).",
  },

  {
    id: "ITSSA_W2_Q12",
    type: "show-answer",
    tags: ["application security", "threat modelling", "incident response"],
    sectionLabel: "2.6",
    text: "A security analyst argues:\n\n> \"The finance workstation incident should simply be called ransomware.\"\n\nCritically evaluate this claim.",
    correctAnswers: [
      {
        text: "Calling the incident merely **ransomware** is analytically incomplete.\n\nAt the **initial delivery stage**, the malicious software appears as a legitimate update. That stage fits the definition of a **trojan** — it *masquerades as legitimate software* and requires user participation.\n\nOnce installed, the unusual outbound traffic suggests a second layer of capability: likely credential theft, remote control, or command-and-control communication. At that stage the malware also exhibits **botware** characteristics.\n\nOnly when archived design files become encrypted and inaccessible does the behaviour clearly satisfy the definition of **ransomware**.\n\nThe incident is therefore better understood as a **multi-stage malware chain**, not a single malware category. Malware classifications often describe *functions at different phases* rather than mutually exclusive labels.\n\nA sophisticated analysis distinguishes:\n- **Delivery mechanism** — trojan (disguised as an update)\n- **Post-compromise capability** — botware (C2 communication, credential theft)\n- **Final payload** — ransomware (encryption of design archives)",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
A[Trojan delivery\nFake update installed] --> B[Execution]
B --> C[Remote communication\nBotware / C2 beaconing]
C --> D[Credential abuse\nLateral movement]
D --> E[Ransomware payload\nFiles encrypted]`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correct identification of trojan phase | 4 |
| Recognition of botware / remote-control behaviour | 4 |
| Correct identification of ransomware stage | 4 |
| Multi-stage analytical explanation | 4 |
| Strong concluding judgement | 1 |
| **Total** | **17** |

**Top responses** understand that malware labels often describe **different stages of compromise**, not mutually exclusive categories. Simply naming all three types without explaining *why* each applies at a particular phase earns partial credit only.`,
    points: 17,
  },

  // ─────────────────────────────────────────────
  // QUESTION 3 — Social Engineering, Human Exploitation, and Defensive Architecture
  // ─────────────────────────────────────────────

  {
    id: "ITSSA_W2_Q13",
    type: "multiple-choice",
    tags: ["social engineering"],
    sectionLabel: "3.1",
    text: "The caller posing as senior IT and urgently demanding password resets most clearly combines which two influence principles?",
    options: [
      "Scarcity and authority",
      "Commitment and reciprocation",
      "Liking and inoculation",
      "Diffusion and policy",
    ],
    correctAnswers: ["Scarcity and authority"],
    points: 2,
    explanation: "The attacker claims to be senior IT (**authority**) and creates pressure for immediate action (**scarcity / urgency**). These two principles together are a classic social-engineering pairing because they suppress the target's critical thinking.",
  },

  {
    id: "ITSSA_W2_Q14",
    type: "fill-in-the-blank",
    tags: ["social engineering"],
    sectionLabel: "3.2",
    text: "Creating a fabricated story in order to obtain sensitive information is called ___.",
    blanks: [
      {
        id: "b1",
        options: ["phishing", "pretexting", "tailgating", "vishing"],
        correctAnswer: "pretexting",
      },
    ],
    explanation: "**Pretexting** involves constructing a fabricated scenario (a pretext) to manipulate a target into disclosing information or taking a harmful action. It differs from phishing in that it relies on a crafted narrative rather than a deceptive link or attachment.",
  },

  {
    id: "ITSSA_W2_Q15",
    type: "open-ended",
    tags: ["social engineering"],
    sectionLabel: "3.3",
    text: "An attacker entering a restricted facility by following an employee through a door is called what?",
    correctAnswers: ["tailgating", "piggybacking", "tailgate"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation: "**Tailgating** (also called piggybacking) is the physical social-engineering technique of following an authorised person through a secured entry point without using one's own credentials.",
  },

  {
    id: "ITSSA_W2_Q16",
    type: "multiple-choice",
    tags: ["social engineering", "incident response"],
    sectionLabel: "3.4",
    text: "Which response by staff best reflects the **Reaction** layer of the **T.R.I.P.P.** model?",
    options: [
      "Installing firewalls",
      "Recognising suspicious pressure and increasing scrutiny",
      "Writing access-control policy",
      "Shredding archived records",
    ],
    correctAnswers: ["Recognising suspicious pressure and increasing scrutiny"],
    points: 2,
    explanation: "**Reaction** in T.R.I.P.P. refers to the in-the-moment human response of shifting into a heightened-alert mode when unusual urgency, secrecy, or authority pressure is detected. Installing firewalls is a *physical* control; writing policy is the *policy* layer; shredding records is a *physical* disposal measure.",
  },

  {
    id: "ITSSA_W2_Q17",
    type: "fill-in-the-blank",
    tags: ["security policies"],
    sectionLabel: "3.5",
    text: "Within the defensive framework **T.R.I.P.P.**, the \"P\" referring to formal rules of information flow is ___.",
    blanks: [
      {
        id: "b1",
        options: ["physical", "pretexting", "policy", "prevention"],
        correctAnswer: "policy",
      },
    ],
    explanation: "The two P's in **T.R.I.P.P.** are **P**olicy (formal rules governing information handling and authorisation) and **P**hysical (technical and environmental controls). Policy formalises *who may do what* and *how communications are verified*.",
  },

  {
    id: "ITSSA_W2_Q18",
    type: "show-answer",
    tags: ["social engineering", "security policies"],
    sectionLabel: "3.6",
    text: "Design a layered defence for **Aurelia Dynamics** using the **T.R.I.P.P.** model.",
    correctAnswers: [
      {
        text: "A strong defence should not assume that users will never make mistakes.\n\n**Training**\nEmployees should be taught how phishing, fake compliance notices, authority impersonation, and urgent password-reset requests operate. Training is the foundation — without it, no other layer is reliable.\n\n**Reaction**\nStaff must be conditioned to shift into heightened scrutiny when they encounter unusual urgency, secrecy, or identity pressure. The caller demanding an immediate password reset is a textbook trigger.\n\n**Inoculation**\nSimulated phishing exercises and controlled helpdesk-impersonation drills should occur regularly so recognition becomes habitual rather than theoretical.\n\n**Policy**\nClear formal rules must specify:\n- Who may authorise password resets\n- How internal compliance messages are verified\n- What software may be installed and from where\n- How suspicious communications are escalated\n\nFor policy to work it must be **robust**, **known**, and **followed**.\n\n**Physical**\nEven if users are manipulated, technical controls should limit damage: least privilege, VPN segmentation, wireless access controls, email filtering, and secure media disposal.\n\nThe strongest defence recognises that social engineering is not defeated by awareness alone — it requires *organisational structure* combined with *technical containment*.",
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Training applied to scenario | 3 |
| Reaction correctly explained | 3 |
| Inoculation correctly explained | 3 |
| Policy discussion (robust / known / followed) | 5 |
| Physical controls | 3 |
| Integrated concluding insight | 1 |
| **Total** | **18** |

**Excellent answers** integrate human behaviour, organisational process, and technical containment rather than treating T.R.I.P.P. as a simple checklist.`,
    points: 18,
    image: {
        src: "/images/ITSSA_W2_Q18.png",
        alt: "Layered T.R.I.P.P. defense diagram showing training, reaction, inoculation, policy, and physical controls protecting Aurelia Dynamics against social engineering attacks.",
        caption: "Figure 2. Layered social engineering defense model using the T.R.I.P.P. framework to reduce organizational exposure to manipulation-based attacks."
        }
  },

  // ─────────────────────────────────────────────
  // QUESTION 4 — Applied OSI-Layer and STRIDE Reasoning
  // ─────────────────────────────────────────────

  {
    id: "ITSSA_W2_Q19",
    type: "multiple-choice",
    tags: ["OSI model", "wireless security"],
    sectionLabel: "4.1",
    text: "Flooding wireless gateways most directly targets which **OSI layer**?",
    options: [
      "Session",
      "Network",
      "Physical",
      "Presentation",
    ],
    correctAnswers: ["Physical"],
    points: 2,
    explanation: "Wireless flooding attacks target the **physical** signal medium itself — radio-frequency interference or signal saturation that prevents devices from communicating at Layer 1. The attack does not involve routing (network), session management, or data interpretation.",
  },

  {
    id: "ITSSA_W2_Q20",
    type: "fill-in-the-blank",
    tags: ["OSI model", "network protocols"],
    sectionLabel: "4.2",
    text: "Reading source and destination routing headers primarily concerns the ___ layer.",
    blanks: [
      {
        id: "b1",
        options: ["network", "data link", "transport", "session"],
        correctAnswer: "network",
      },
    ],
    explanation: "Source and destination IP addresses — the basis of routing decisions — live in the **network layer** (Layer 3) header. MAC addresses belong to the data link layer; port numbers belong to the transport layer.",
  },

  {
    id: "ITSSA_W2_Q21",
    type: "open-ended",
    tags: ["OSI model"],
    sectionLabel: "4.3",
    text: "Stealing or poisoning session identifiers most directly attacks which layer?",
    correctAnswers: ["session layer", "session", "layer 5"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: true,
    },
    explanation: "Session identifiers maintain the state of an ongoing conversation between two systems. Stealing or poisoning them — for example, session hijacking — is an attack on the **session layer** (Layer 5).",
  },

  {
    id: "ITSSA_W2_Q22",
    type: "multiple-choice",
    tags: ["OSI model", "application security"],
    sectionLabel: "4.4",
    text: "A malicious PDF that exploits file interpretation rather than transport routing most directly concerns which layer?",
    options: [
      "Presentation layer",
      "Data link layer",
      "Network layer",
      "Physical layer",
    ],
    correctAnswers: ["Presentation layer"],
    points: 2,
    explanation: "The **presentation layer** (Layer 6) handles data encoding, formatting, and interpretation — how content is structured and translated for the application. A malicious PDF that exploits how a viewer *parses* the file format is a presentation-layer attack, not a routing or physical one.",
  },

  {
    id: "ITSSA_W2_Q23",
    type: "multiple-choice",
    tags: ["threat modelling", "access control"],
    sectionLabel: "4.5",
    text: "Within **STRIDE**, a successful fraudulent password reset most directly supports which category?",
    options: [
      "Denial of service",
      "Repudiation",
      "Spoofing",
      "Information disclosure",
    ],
    correctAnswers: ["Spoofing"],
    points: 2,
    explanation: "**Spoofing** in STRIDE means falsely assuming a trusted identity. A fraudulent password reset allows the attacker to impersonate a legitimate user — the attacker gains a credential that lets them appear to be someone they are not.",
  },

  {
    id: "ITSSA_W2_Q24",
    type: "show-answer",
    tags: ["OSI model", "CIA triad", "threat modelling"],
    sectionLabel: "4.6",
    text: "Using the Aurelia Dynamics incident, explain why modern enterprise attacks rarely remain confined to a single OSI layer or a single information assurance category.",
    correctAnswers: [
      {
        text: "The Aurelia Dynamics scenario demonstrates a **multi-layer attack chain**.\n\n**Physical layer**\nWireless flooding disrupts communication availability by saturating the signal medium at Layer 1.\n\n**Network layer**\nUnusual outbound traffic suggests routing-based lateral movement and data exfiltration at Layer 3.\n\n**Session layer**\nSocial engineering of password resets may enable session compromise or impersonation at Layer 5.\n\n**Presentation layer**\nThe malicious document-viewer update exploits how content is encoded, interpreted, or executed at Layer 6.\n\n**Application layer**\nEmployees themselves become the immediate attack surface through phishing, deceptive downloads, and credential misuse at Layer 7.\n\nLikewise, the attack does not affect only one CIA assurance:\n\n| Assurance | Scenario manifestation |\n|---|---|\n| Confidentiality | Credential theft and outbound data leakage |\n| Integrity | Manipulation of trust relationships and system states |\n| Availability | Wireless flooding and encrypted design archives |\n\nModern enterprise attacks are therefore best understood as **composed attack paths** — not isolated technical events. Movement flows from human exploitation → software execution → network behaviour → operational disruption.",
        diagram: {
          type: "mermaid",
          code: `flowchart TD
A[Physical layer\nWireless flooding] --> B[Network layer\nTraffic movement / exfiltration]
B --> C[Session layer\nCredential misuse / reset abuse]
C --> D[Presentation layer\nMalicious file execution]
D --> E[Application layer\nUser-facing compromise]`,
        },
      },
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correct OSI multi-layer reasoning (at least 4 layers mapped) | 8 |
| Accurate mapping to scenario events | 4 |
| CIA triad integration | 4 |
| Strong concluding synthesis | 1 |
| **Total** | **17** |

**Top-tier responses** move fluently between human exploitation, network behaviour, software execution, and business disruption — demonstrating that no attack element in this scenario is confined to a single layer or assurance category.`,
    points: 17,
    image: {
        src: "/images/ITSSA_W2_Q24.png",
        alt: "OSI-layer attack progression diagram showing application, presentation, session, network, and physical layer compromise mapped to confidentiality, integrity, and availability impacts.",
        caption: "Figure 3. Multi-layer attack progression demonstrating how a single enterprise intrusion can traverse multiple OSI layers while affecting all three CIA security assurances."
        }
  },
];
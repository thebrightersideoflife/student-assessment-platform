// src/data/questions/ITSSA2-22/week6.js
export default [

  // ── SCENARIO: Question 1 ────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITSSA_W6_Q1",
    type: "scenario",
    title: "Question 1 – MedSys Global: Securing Healthcare Data (13 Marks)",
    context: `MedSys Global is a multinational healthcare technology provider that stores millions of patient records in cloud-based systems.\n\nRecent security audits revealed several weaknesses:\n• Patient records are stored in plain text within legacy databases.\n• Passwords are stored without hashing.\n• Remote clinics transmit patient information over public networks.\n• Several partner hospitals exchange sensitive medical reports electronically.\n\nThe organisation plans to implement a secure cloud platform that complies with healthcare regulations while maintaining efficient communication between hospitals, doctors, and patients.\n\nThe Chief Information Security Officer (CISO) has requested recommendations regarding encryption technologies and cryptographic controls.`,
  },

  // ── Q1.1 Multiple Choice ────────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q1",
    type: "multiple-choice",
    tags: ["encryption", "CIA triad"],
    sectionLabel: "1.1",
    text: "The security team wants to protect large volumes of patient records stored in cloud databases while maintaining high processing efficiency.\n\nWhich approach is **MOST** appropriate?",
    options: [
      "Use RSA encryption for all database records because public-key cryptography provides authentication.",
      "Use SHA-256 hashing because hashes are faster than encryption algorithms.",
      "Use symmetric encryption such as AES because it efficiently protects large amounts of stored data.",
      "Use Diffie-Hellman because key exchange protocols are designed for data storage protection.",
    ],
    correctAnswers: [
      "Use symmetric encryption such as AES because it efficiently protects large amounts of stored data.",
    ],
    points: 2,
    explanation:
      "**AES** (Advanced Encryption Standard) is a symmetric cipher designed for bulk data encryption — it provides strong **confidentiality** with significantly lower computational cost than public-key algorithms.\n\n- **RSA** is expensive and is used for key exchange or digital signatures, not bulk storage.\n- **SHA-256** produces an *irreversible* hash — original data cannot be recovered, so it cannot protect stored records.\n- **Diffie-Hellman** is a key exchange protocol; it establishes shared secrets but does not encrypt data itself.",
  },

  // ── Q1.2 Fill in the Blank ──────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q2",
    type: "fill-in-the-blank",
    tags: ["encryption"],
    sectionLabel: "1.2",
    text: "The process of transforming readable information into an unreadable form using cryptographic algorithms is called ___.",
    blanks: [
      {
        id: "b1",
        options: ["Encoding", "Hashing", "Encryption", "Compression"],
        correctAnswer: "Encryption",
      },
    ],
  },

  // ── Q1.3 Open-ended ─────────────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q3",
    type: "open-ended",
    tags: ["hashing"],
    sectionLabel: "1.3",
    text: "What cryptographic technique produces a **fixed-length** output from variable-length input?",
    correctAnswers: ["Hashing", "Hash function", "Cryptographic hashing"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation:
      "**Hashing** (or a hash function) maps any input — regardless of size — to a fixed-length digest. Common examples include **SHA-256** (256-bit output) and **MD5** (128-bit output).\n\nUnlike encryption, hashing is a one-way operation: the original input cannot be recovered from the digest, making it suitable for **integrity verification** and **password storage**, not confidentiality.",
  },

  // ── Q1.4 Multiple Choice ────────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q4",
    type: "multiple-choice",
    tags: ["hashing", "CIA triad"],
    sectionLabel: "1.4",
    text: "A hospital wants to verify that a medical report was **not altered** after being signed by a specialist physician.\n\nWhich cryptographic property is **MOST** important?",
    options: [
      "Confidentiality",
      "Availability",
      "Integrity",
      "Compression",
    ],
    correctAnswers: ["Integrity"],
    points: 2,
    explanation:
      "**Integrity** ensures that data has not been modified since it was created or authorised. Detecting whether a document was altered — for example, via a digital signature and hash — is an integrity control.\n\n- **Confidentiality** prevents unauthorised *disclosure*, not modification.\n- **Availability** ensures systems remain accessible.\n- **Compression** is not a security property.\n\nThe key phrase *\"was not altered\"* always signals an **integrity** requirement.",
    
  },

  // ── Q1.5 Fill in the Blank ──────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q5",
    type: "fill-in-the-blank",
    tags: ["encryption"],
    sectionLabel: "1.5",
    text: "In asymmetric encryption, the ___ key is typically distributed openly to other parties.",
    blanks: [
      {
        id: "b1",
        options: ["Private", "Session", "Symmetric", "Public", "Shared"],
        correctAnswer: "Public",
      },
    ],
  },

  // ── Q1.6 Essay / Show-answer ────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q6",
    type: "show-answer",
    tags: ["encryption", "CIA triad", "risk management"],
    sectionLabel: "1.6",
    text: "The board of MedSys Global is considering implementing **only symmetric encryption** across all systems because it is computationally efficient.\n\n**Critically evaluate this proposal.**\n\nYour answer should discuss:\n- Symmetric encryption\n- Asymmetric encryption\n- Authentication requirements\n- Key management considerations\n- Situations where a hybrid approach would be more appropriate",
    correctAnswers: [
      "The proposal to rely solely on symmetric encryption is insufficient for a modern healthcare environment.\n\n**Symmetric encryption** uses a single shared key for both encryption and decryption. Algorithms such as AES are highly efficient and are well-suited to encrypting large volumes of patient records stored in databases, providing strong **confidentiality** with minimal computational overhead.\n\nHowever, symmetric encryption has notable limitations. It does not inherently provide **authentication** or **non-repudiation**. Key distribution also becomes increasingly difficult as more parties are involved: every authorised party must securely obtain and protect the same secret key. If the key is compromised, all encrypted information becomes vulnerable.\n\n**Asymmetric encryption** addresses these challenges by using a public-private key pair. The public key can be distributed openly while the private key remains secret. This architecture enables **authentication**, **integrity verification**, and **non-repudiation** through digital signatures.\n\nIn a healthcare environment where hospitals exchange reports and must verify document origin, asymmetric cryptography is essential — symmetric encryption alone cannot prove who signed or sent a document.\n\nThe most appropriate solution is therefore **hybrid encryption**. Asymmetric encryption is used to securely exchange symmetric session keys; symmetric encryption then performs the actual bulk data encryption. This combines the *efficiency* of symmetric algorithms with the *security benefits* of public-key cryptography, and is the architecture underpinning protocols such as SSL/TLS.\n\nConsequently, MedSys Global should implement a hybrid cryptographic architecture rather than relying exclusively on symmetric encryption.",
    ],
    markingGuide: `| Requirement | Marks |\n|---|---|\n| Correct explanation of symmetric encryption | 1 |\n| Correct explanation of asymmetric encryption | 1 |\n| Discussion of authentication / non-repudiation | 1 |\n| Discussion of key management challenges | 1 |\n| Explanation of hybrid encryption | 1 |\n| Critical evaluation and justified recommendation | 1 |\n| **Total** | **6** |\n\n**Common errors (cap at 4/6 if present):**\n- Claiming symmetric encryption provides non-repudiation\n- Suggesting RSA should encrypt entire databases\n- Ignoring key distribution challenges\n- Defining concepts without reaching a recommendation`,
    points: 6,
    image: {
      src: "/images/ITSSA_W6_Q6.png",
      alt: "Enterprise healthcare architecture showing hospitals, remote clinics, cloud databases, mobile applications, partner organisations, and data flows across public networks.",
      caption: "MedSys Global's proposed healthcare information ecosystem. Review the architecture before answering the questions."
    }
  },

  // ── SCENARIO: Question 2 ────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITSSA_W6_Q2",
    type: "scenario",
    title: "Question 2 – NexusBank Digital Services (12 Marks)",
    context: `NexusBank is launching a new online banking platform serving customers across multiple countries.\n\nThe platform must:\n• Protect customer credentials.\n• Secure online transactions.\n• Enable secure communication between browsers and servers.\n• Ensure compliance with financial security regulations.\n• Prevent attackers from reading sensitive information even if network traffic is intercepted.\n\nSecurity architects are evaluating several cryptographic solutions before deployment.`,
  },

  // ── Q2.1 Multiple Choice ────────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q7",
    type: "multiple-choice",
    tags: ["hashing", "application security"],
    sectionLabel: "2.1",
    text: "A customer enters a password during login.\n\nWhich technique is **MOST** appropriate for **storing** the password?",
    options: [
      "AES encryption",
      "RSA encryption",
      "SHA-256 hashing",
      "Diffie-Hellman key exchange",
    ],
    correctAnswers: ["SHA-256 hashing"],
    points: 2,
    explanation:
      "Passwords should **never** be stored using reversible encryption, because if the key is exposed the original password can be recovered.\n\n**Hashing** (e.g. SHA-256, bcrypt, or Argon2) is one-way: the stored digest cannot be reversed to reveal the original password. During login, the entered password is hashed and compared against the stored hash — no decryption is ever needed.\n\n- **AES / RSA** are reversible — a compromised key exposes all passwords.\n- **Diffie-Hellman** establishes shared keys; it does not store or protect credentials.",
  },

  // ── Q2.2 Open-ended ─────────────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q8",
    type: "open-ended",
    tags: ["encryption"],
    sectionLabel: "2.2",
    text: "Name **one** key exchange protocol discussed in the course.",
    correctAnswers: [
      "Diffie-Hellman",
      "DH",
      "ECDH",
      "Elliptic Curve Diffie-Hellman",
      "KEA",
      "Key Exchange Algorithm",
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 20,
      allowPartialMatch: true,
    },
    explanation:
      "**Diffie-Hellman (DH)** is the foundational key exchange protocol. It allows two parties to establish a shared secret over an insecure channel without transmitting the secret itself.\n\n**ECDH** (Elliptic Curve Diffie-Hellman) is a modern variant that achieves equivalent security with smaller key sizes, and is widely used in TLS 1.3.\n\n**KEA** (Key Exchange Algorithm) is a US government variant of Diffie-Hellman. Any of these is acceptable.",
  },

  // ── Q2.3 Multiple Choice ────────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q9",
    type: "multiple-choice",
    tags: ["encryption", "PKI & certificates"],
    sectionLabel: "2.3",
    text: "During an SSL/TLS session, why is **hybrid encryption** generally preferred?",
    options: [
      "Symmetric encryption is incapable of encrypting data.",
      "Public keys are faster than private keys.",
      "It combines efficient data encryption with secure key exchange.",
      "Hash functions cannot be used with encryption systems.",
    ],
    correctAnswers: [
      "It combines efficient data encryption with secure key exchange.",
    ],
    points: 2,
    explanation:
      "**Hybrid encryption** solves the primary weakness of each approach in isolation:\n\n| Technology | Strength | Weakness |\n|---|---|---|\n| Symmetric (AES) | Fast — suited for bulk data | Insecure key distribution |\n| Asymmetric (RSA / ECDH) | Secure key exchange, authentication | Slow for bulk data |\n\nSSL/TLS uses asymmetric cryptography to securely establish a shared session key, then switches to symmetric encryption for the actual data transfer — giving both **security** and **performance**.",
  },

  // ── Q2.4 Fill in the Blank ──────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q10",
    type: "fill-in-the-blank",
    tags: ["encryption", "CIA triad"],
    sectionLabel: "2.4",
    text: "Encryption applied to information while it is being transmitted across a network protects data ___.",
    blanks: [
      {
        id: "b1",
        options: ["in use", "in transit", "at rest", "in storage"],
        correctAnswer: "in transit",
      },
    ],
  },

  // ── Q2.5 Multiple Choice ────────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q11",
    type: "multiple-choice",
    tags: ["encryption"],
    sectionLabel: "2.5",
    text: "Which statement **correctly** distinguishes symmetric and asymmetric encryption?",
    options: [
      "Both use identical key management processes.",
      "Symmetric encryption uses one key; asymmetric encryption uses public and private keys.",
      "Asymmetric encryption does not provide authentication.",
      "Symmetric encryption requires two public keys.",
    ],
    correctAnswers: [
      "Symmetric encryption uses one key; asymmetric encryption uses public and private keys.",
    ],
    points: 2,
    explanation:
      "The fundamental architectural difference is the **key model**:\n\n- **Symmetric encryption** — one shared secret key is used for both encryption and decryption (e.g. AES).\n- **Asymmetric encryption** — a mathematically linked **public/private key pair** is used; data encrypted with the public key can only be decrypted with the private key (e.g. RSA).\n\nAsymmetric encryption *does* provide authentication (via digital signatures), so option C is incorrect. Neither system requires two public keys.",
  },

  // ── Q2.6 Essay / Show-answer ────────────────────────────────────────────────
  {
    id: "ITSSA_W6_Q12",
    type: "show-answer",
    tags: ["encryption", "firewalls & filtering", "access control"],
    sectionLabel: "2.6",
    text: "NexusBank's executives believe that implementing **encryption alone** is sufficient to secure the organisation's information systems.\n\n**Critically assess this claim.**\n\nYour answer should reference:\n- The role of encryption\n- Data confidentiality\n- Other security controls\n- Organisational security responsibilities",
    correctAnswers: [
      "Encryption is one of the most important security controls because it protects sensitive information from unauthorised disclosure. By converting plaintext into ciphertext, encryption preserves **confidentiality** for both stored and transmitted data.\n\nHowever, encryption alone cannot secure an organisation. Security threats frequently exploit weaknesses that are entirely unrelated to cryptography. For example, attackers may obtain legitimate credentials through phishing, exploit unpatched software vulnerabilities, abuse excessive access privileges, or compromise poorly configured infrastructure. In each of these cases, encryption does not prevent or detect the attack.\n\nAdditional controls are therefore essential. **Firewalls** regulate inbound and outbound network traffic, **access control systems** restrict user permissions to the minimum required, **authentication mechanisms** verify identities before granting access, and **monitoring and logging systems** detect anomalous activity. Security awareness training and organisational policies further reduce risk by addressing the human factor.\n\nA secure banking platform must therefore adopt a **layered security strategy** (defence in depth). Encryption protects information itself, while complementary controls protect users, systems, and business processes.\n\nConsequently, encryption should be understood as a *critical component* of a security architecture — not a complete solution in itself.",
    ],
    markingGuide: `| Requirement | Marks |\n|---|---|\n| Correct explanation of encryption's role | 1 |\n| Discussion of confidentiality | 1 |\n| Discussion of additional controls (firewalls, access control, authentication, etc.) | 1 |\n| Critical conclusion referencing layered / defence-in-depth security | 1 |\n| **Total** | **4** |\n\n**Common errors:**\n- Treating encryption as a complete security solution\n- Discussing availability without linking it to the scenario\n- Failing to name at least one complementary control`,
    points: 4,
  },
];
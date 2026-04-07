// src/data/questions/ITNSA/week5.js
// VPN Design, Management & Security
// Total Marks: 100
// Sections: A (30) | B (40) | C (30)

export default [

  // ═══════════════════════════════════════════════════════════════
  // SECTION A: CONCEPTUAL APPLICATION (30 MARKS)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "SCENARIO_ITNSA_W5_SA",
    type: "scenario",
    title: "Section A: Conceptual Application (30 Marks)",
    context: `A multinational consulting firm has rapidly transitioned to remote work. Employees now connect from a wide variety of insecure environments including public Wi-Fi hotspots, home networks, and mobile data connections. The IT department must evaluate VPN technologies, protocols, and access control strategies to secure this distributed workforce.`,
  },

  // ─────────────────────────────────────────────────────────────
  // QUESTION 1: VPN Security & Limitations (10 Marks)
  // ─────────────────────────────────────────────────────────────

  // Q1 Part A — Fill-in-the-blank: VPN security mechanism chain (4 marks auto-calculated)
  {
    id: "ITNSA_W5_Q1",
    type: "fill-in-the-blank",
    sectionLabel: "1.1",
    text: "A VPN secures remote communication through four core mechanisms. First, ___ scrambles data so that intercepted packets cannot be read by a third party. Second, ___ wraps the data packet inside another packet to carry it securely across a public network. Third, ___ verifies the identity of the user before any access is granted. Finally, ___ ensures that packets have not been altered or tampered with during transmission.",
    blanks: [
        {
            id: "b1",
            options: ["Obfuscation", "Encryption", "Hashing", "Compression"],
            correctAnswer: "Encryption",
        },
        {
            id: "b2",
            options: ["Encapsulation", "Bridging", "Tunneling", "Translation"],
            correctAnswer: "Tunneling",
        },
        {
            id: "b3",
            options: ["Authorization", "Accounting", "Provisioning", "Authentication"],
            correctAnswer: "Authentication",
        },
        {
            id: "b4",
            options: ["Non-repudiation", "Data Integrity", "Redundancy", "Availability"],
            correctAnswer: "Data Integrity",
        },
        ],
    points: 4,
  },

  // Q1.1 — Show-answer: Full VPN security explanation (5 marks)
  {
    id: "ITNSA_W5_Q2",
    type: "show-answer",
    sectionLabel: "1.1 B",
    text: "Explain how a VPN ensures secure communication for employees connecting from insecure environments such as public Wi-Fi. Your answer must link each security mechanism to a specific real-world threat it mitigates.",
    correctAnswers: [
      "A VPN establishes a secure encrypted tunnel between the remote user's device and the corporate network gateway, ensuring confidentiality and integrity of all transmitted data regardless of the underlying network's trustworthiness.\n\nEncryption (addresses Eavesdropping / Passive Interception): Data is encrypted using strong protocols such as AES-256 within IPSec or OpenVPN's TLS layer. Even if an attacker on a public Wi-Fi network captures packets using a tool like Wireshark, the payload is unreadable ciphertext.\n\nTunneling (addresses Network-Level Exposure): Encapsulation wraps the original packet inside a new packet addressed to the VPN gateway. The true destination and content of the communication are hidden from the intermediate public network, preventing traffic analysis.\n\nAuthentication (addresses Unauthorized Access / Identity Spoofing): Before the tunnel is established, the user must verify their identity — typically via credentials, certificates, or MFA tokens. This prevents unauthorized parties from establishing a tunnel even if they intercept the connection request.\n\nData Integrity (addresses Man-in-the-Middle / Packet Tampering): Cryptographic message authentication codes (MACs), such as HMAC-SHA256, are appended to each packet. If any byte of the packet is modified in transit, the integrity check fails and the packet is discarded — ensuring the corporate system never processes tampered data."
    ],
    markingGuide: "Award 2 marks for encryption explained with a link to eavesdropping/interception. Award 1 mark for tunneling and encapsulation. Award 1 mark for authentication. Award 1 mark for data integrity / packet integrity checking. A+ answers must explicitly name the threat each mechanism counters — not merely list the mechanism.",
    points: 5,
  },

  // Q1.2 — Multi-select MCQ: VPN limitations (5 marks)
  {
    id: "ITNSA_W5_Q3",
    type: "multiple-choice",
    sectionLabel: "1.2 A",
    text: "A VPN is deployed to protect remote workers on public Wi-Fi. Which of the following statements correctly identifies a PRIMARY limitation of this deployment — one that could still expose the organization to risk even with a functioning VPN?",
    options: [
      "Encryption overhead introduces latency, and on high-latency mobile connections this may degrade performance to the point users disable the VPN to restore productivity.",
      "A VPN guarantees complete anonymity for all users, eliminating the need for endpoint security controls.",
      "Once authenticated, the VPN grants full trust to the connected device — meaning malware already present on a user's laptop can still traverse the tunnel and reach internal systems.",
      "VPN tunnels use proprietary protocols that are incompatible with standard firewalls, making traffic inspection impossible."
    ],
    correctAnswers: ["Once authenticated, the VPN grants full trust to the connected device — meaning malware already present on a user's laptop can still traverse the tunnel and reach internal systems."],
    points: 2,
  },

  // Q1.2 — Show-answer: Critical evaluation of VPN limitations (5 marks)
  {
    id: "ITNSA_W5_Q4",
    type: "show-answer",
    sectionLabel: "1.2 B",
    text: "Critically evaluate the limitations of VPNs for a remote workforce connecting from insecure networks. For each limitation you identify, explain the specific organizational risk it creates. Do not merely list — link each limitation to its consequence.",
    correctAnswers: [
      "1. Performance Overhead → Business Continuity Risk: Encryption and tunneling introduce computational and network overhead, increasing latency. On low-bandwidth connections (mobile hotspots, congested home networks), this degradation leads users to disable the VPN to restore productivity — precisely eliminating the security control it provides.\n\n2. Endpoint Vulnerability → Lateral Movement Risk: A VPN authenticates the user but implicitly trusts the device. If a user's machine is infected with malware prior to connecting, the VPN tunnel becomes a direct conduit for that malware to reach internal systems. The firewall never inspects traffic already inside the tunnel.\n\n3. No Protection Against Insider Threats or Compromised Credentials: A VPN verifies identity, not intent. If credentials are phished or stolen, an attacker authenticates legitimately and gains access to everything the real user can access. The VPN provides no anomaly detection or behavioral analysis.\n\n4. Policy Bypass by Users: Employees may use split tunneling configurations, personal devices outside policy, or disable the VPN for convenience. Without enforcement mechanisms (NAC, MDM), the VPN policy is advisory rather than mandatory.\n\n5. Management and Configuration Complexity → Misconfiguration Risk: Incorrect VPN gateway configuration (weak cipher suites, expired certificates, overly permissive firewall rules) can create vulnerabilities worse than having no VPN, as the organization gains a false sense of security."
    ],
    markingGuide: "Award 1 mark each for any 5 well-explained limitations. Each must include: the limitation itself AND its specific organizational consequence. Responses that list limitations without linking to risk do not earn full marks per point. A+ responses demonstrate critical evaluation — not a bullet-point inventory.",
    points: 5,
  },

  // ─────────────────────────────────────────────────────────────
  // QUESTION 2: VPN Protocols (10 Marks)
  // ─────────────────────────────────────────────────────────────

  // Q2.1 — MCQ: Protocol identification under constraints
  {
    id: "ITNSA_W5_Q5",
    type: "multiple-choice",
    sectionLabel: "2.1 A",
    text: "A company requires a VPN solution that supports remote workers across multiple device types (Windows, macOS, iOS, Android), uses modern encryption standards, and avoids complex manual configuration. Which option BEST meets all three requirements?",
    options: [
      "PPTP with shared secret authentication",
      "IPSec in transport mode only, using manual key exchange",
      "SSL/TLS-based VPN (e.g., OpenVPN or WireGuard)",
      "Unencrypted GRE tunneling with perimeter firewall filtering"
    ],
    correctAnswers: ["SSL/TLS-based VPN (e.g., OpenVPN or WireGuard)"],
    points: 2,
  },

  // Q2.1 — Show-answer: Full protocol comparison (6 marks)
  {
    id: "ITNSA_W5_Q6",
    type: "show-answer",
    sectionLabel: "2.1 B",
    text: "Compare IPSec, SSL/TLS (OpenVPN), and PPTP across three dimensions: security strength, performance characteristics, and deployment suitability. Your comparison must be specific enough to guide a real procurement decision.",
    correctAnswers: [
      "IPSec:\nSecurity: Very strong. Provides both encryption (AES) and authentication (IKE, pre-shared keys or certificates). Operates at Layer 3, protecting the entire IP packet in tunnel mode. Widely considered the gold standard for network-layer security.\nPerformance: Moderate. The IKE negotiation and packet processing add overhead, particularly on high-throughput links. Hardware acceleration (AES-NI) largely mitigates this on modern devices.\nSuitability: Optimal for site-to-site VPNs between fixed network endpoints (routers, firewalls). Less suited to road warrior / remote access scenarios due to NAT traversal challenges (UDP 500/4500 can be blocked).\n\nSSL/TLS (OpenVPN):\nSecurity: Very strong. Uses TLS 1.3 for handshake and AES-256-GCM for data encryption. Provides certificate-based mutual authentication. Actively maintained and audited open-source codebase.\nPerformance: Good. Operates over TCP or UDP; UDP mode approaches IPSec performance. Slightly higher CPU overhead than native IPSec but negligible on modern hardware.\nSuitability: Excellent for remote access VPNs. Operates on TCP 443, making it virtually firewall-transparent (indistinguishable from HTTPS). Cross-platform client support is comprehensive.\n\nPPTP:\nSecurity: Weak to broken. MS-CHAPv2 authentication has known cryptographic vulnerabilities exploited in practice. The MPPE encryption is considered obsolete. Not recommended for any production deployment.\nPerformance: Fast — low overhead due to minimal security processing.\nSuitability: No modern use case justifies PPTP. Any performance advantage is irrelevant given that the security guarantees are absent."
    ],
    markingGuide: "Award 2 marks per protocol (IPSec, SSL/TLS, PPTP) for a total of 6 marks. Each protocol must address all three dimensions (security, performance, suitability) to earn full marks. Stating 'PPTP is weak' without explaining why (broken authentication, obsolete encryption) earns only 1 mark.",
    points: 6,
  },

  // Q2.2 — Open-ended: Protocol recommendation term
  {
    id: "ITNSA_W5_Q7",
    type: "open-ended",
    sectionLabel: "2.2 A",
    text: "Name the specific VPN protocol most recommended for a modern enterprise remote access deployment, based on its use of TLS, cross-platform compatibility, and active security maintenance.",
    correctAnswers: ["OpenVPN", "SSL/TLS VPN", "WireGuard", "IKEv2"],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
  },

  // Q2.2 — Show-answer: Full recommendation with justification (4 marks)
  {
    id: "ITNSA_W5_Q8",
    type: "show-answer",
    sectionLabel: "2.2 B",
    text: "Recommend the most appropriate VPN protocol for a modern enterprise remote workforce and justify your answer based on real-world deployment constraints including scalability, device diversity, firewall traversal, and security compliance.",
    correctAnswers: [
      "Recommended Protocol: SSL/TLS-based VPN (OpenVPN or IKEv2/IPSec with EAP authentication as a strong alternative).\n\nJustification:\n\n1. Firewall Traversal: OpenVPN over TCP port 443 is indistinguishable from HTTPS traffic to intermediate firewalls and deep packet inspection systems. This is critical in environments where employees connect from hotel networks, client sites, or restrictive ISPs that block UDP 500 (required by IPSec/IKE). Pure IPSec frequently fails in NAT environments without additional UDP encapsulation.\n\n2. Device and Platform Diversity: Enterprise workforces use Windows, macOS, Linux, iOS, and Android. OpenVPN has mature, audited clients across all these platforms. PPTP clients are being removed from modern operating systems entirely.\n\n3. Security Compliance: OpenVPN's TLS 1.3 + AES-256-GCM cipher stack meets the requirements of frameworks such as ISO 27001, PCI-DSS, and HIPAA. PPTP fails all compliance audits. IPSec is compliant but harder to audit in mixed environments.\n\n4. Scalability: SSL VPN gateways (e.g., OpenVPN Access Server, Cisco AnyConnect) support centralized certificate management, allowing thousands of concurrent users with per-user revocation — critical for enterprise scale.\n\nConclusion: For a remote workforce on diverse, potentially hostile networks, SSL/TLS VPN provides the optimal balance of security, compatibility, and operational manageability."
    ],
    markingGuide: "Award 1 mark for the correct recommendation. Award 3 marks for justification — must include at least three real deployment factors (not generic statements). Acceptable factors: firewall traversal, cross-platform support, compliance alignment, scalability, certificate management. Deduct marks if the student recommends PPTP or provides no justification.",
    points: 4,
  },

  // ─────────────────────────────────────────────────────────────
  // QUESTION 3: Authentication & Authorization (10 Marks)
  // ─────────────────────────────────────────────────────────────

  // Q3.1 — Fill-in-the-blank: Auth vs Authz sequence (2 marks auto-calculated)
  {
    id: "ITNSA_W5_Q9",
    type: "fill-in-the-blank",
    sectionLabel: "3.1",
    text: "In VPN access control, the two-stage gatekeeping process works as follows: ___ is the process of verifying that a user is who they claim to be (e.g., via username and password). ___ is the process that follows — determining what resources and systems that verified user is permitted to access.",
    blanks: [
        {
            id: "b1",
            options: ["Accounting", "Authorization", "Authentication", "Auditing"],
            correctAnswer: "Authentication",
        },
        {
            id: "b2",
            options: ["Authorization", "Authentication", "Identification", "Provisioning"],
            correctAnswer: "Authorization",
        },
        ],
    points: 2,
  },

  // Q3.1 — Show-answer: Full distinction with VPN context (4 marks)
  {
    id: "ITNSA_W5_Q10",
    type: "show-answer",
    sectionLabel: "3.1 B",
    text: "Differentiate clearly between authentication and authorization in the context of a corporate VPN. Explain the sequence in which they occur, and describe the security consequence of failing to implement each one correctly.",
    correctAnswers: [
      "Authentication: The process of verifying the claimed identity of a VPN user before the tunnel is established. Mechanisms include username/password, digital certificates, biometrics, or OTP tokens. Authentication answers the question: 'Are you who you say you are?' In a VPN context, authentication occurs at tunnel initiation — the gateway refuses to establish the encrypted tunnel until identity is confirmed.\n\nConsequence of failure: Without robust authentication (e.g., using only a weak static password), stolen or guessed credentials grant an attacker full network access as if they were a legitimate employee. This is the primary vector for credential-stuffing attacks against VPN endpoints.\n\nAuthorization: The process of determining what an authenticated user is permitted to access within the corporate network. Mechanisms include Role-Based Access Control (RBAC), group policies (e.g., via LDAP/AD group membership), and network segmentation rules applied after the tunnel is established. Authorization answers the question: 'What are you allowed to do?'\n\nConsequence of failure: Without granular authorization, all VPN users implicitly receive the same level of access — typically broad network access. A compromised account (even a low-privilege contractor) would then reach sensitive systems including financial databases, HR records, or domain controllers.\n\nSequence: Authentication always precedes authorization. It is logically impossible to determine what a user is allowed to access until the system has confirmed who the user is."
    ],
    markingGuide: "Award 2 marks for authentication — must include a definition, an example mechanism, and the security consequence of failure. Award 2 marks for authorization — same criteria. Award 0 for answers that define the terms correctly but fail to explain the security consequence of each failing.",
    points: 4,
  },

  // Q3.2 — Multi-select MCQ: Valid MFA factors
  {
    id: "ITNSA_W5_Q11",
    type: "multiple-choice",
    sectionLabel: "3.2 A",
    text: "Which of the following combinations correctly implements a multi-factor authentication (MFA) strategy? Select the option that uses factors from at least TWO different authentication categories (something you know / something you have / something you are).",
    options: [
      "Username + Password + Security Question (all 'something you know')",
      "Password (knowledge) + TOTP token via authenticator app (possession) + Fingerprint scan (inherence)",
      "Two different passwords entered in sequence",
      "A hardware token alone, with no additional factor required"
    ],
    correctAnswers: ["Password (knowledge) + TOTP token via authenticator app (possession) + Fingerprint scan (inherence)"],
    points: 2,
  },

  // Q3.2 — Show-answer: Full multi-layered auth strategy (6 marks)
  {
    id: "ITNSA_W5_Q12",
    type: "show-answer",
    sectionLabel: "3.2 B",
    text: "Propose a complete multi-layered authentication strategy suitable for a corporate VPN environment. Your strategy must cover the three MFA factor categories, describe additional access control mechanisms, and explain how the combination reduces the attack surface.",
    correctAnswers: [
      "Layer 1 — Multi-Factor Authentication (MFA):\nFactor 1 — Something You Know: A strong corporate password meeting complexity requirements (minimum 12 characters, alphanumeric + symbols). Enforced rotation and prohibition of reuse.\nFactor 2 — Something You Have: A Time-based One-Time Password (TOTP) generated by an authenticator app (e.g., Microsoft Authenticator, Google Authenticator) or a hardware security key (FIDO2/YubiKey). The TOTP is valid for 30 seconds, rendering intercepted codes useless.\nFactor 3 — Something You Are (optional, high-security roles): Biometric authentication (fingerprint or facial recognition) on managed devices for users accessing sensitive systems (finance, HR, executive infrastructure).\n\nLayer 2 — Role-Based Access Control (RBAC): After authentication, users are placed in AD/LDAP groups (e.g., 'VPN-Standard', 'VPN-Finance', 'VPN-Admin'). Firewall and routing rules restrict each group to only the network segments they require — a contractor in 'VPN-Standard' cannot reach the finance VLAN regardless of their authentication status.\n\nLayer 3 — Device Validation / NAC: Before the tunnel is established, the VPN gateway performs a posture check on the connecting device. Devices must have: current OS patches, active and updated endpoint protection, corporate MDM enrollment. Unmanaged personal devices are denied or placed in a quarantine VLAN.\n\nLayer 4 — Token-Based Session Management: VPN sessions use short-lived session tokens with configurable timeouts (e.g., 8-hour maximum session, 30-minute idle disconnect). Re-authentication is required for new sessions.\n\nCombined Effect: An attacker who steals a password alone cannot authenticate (blocked by TOTP). An attacker who steals both credentials and the TOTP token cannot connect from an unmanaged device (blocked by NAC). Even a fully authenticated attacker is contained by RBAC to only the resources their compromised account was authorized to access."
    ],
    markingGuide: "Award 3 marks for MFA — must correctly identify all three factor categories (know/have/are) with a real mechanism for each. Award 1 mark for RBAC or equivalent access control post-authentication. Award 1 mark for device validation / posture checking. Award 1 mark for explaining how the combined layers reduce attack surface (must show layered reasoning, not just list). A+ answers demonstrate that each layer addresses a distinct attack vector.",
    points: 6,
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION B: SCENARIO-BASED ANALYSIS (40 MARKS)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "SCENARIO_ITNSA_W5_SB1",
    type: "scenario",
    title: "Section B — Scenario 1: Global Legal Associates — Secure Connectivity Crisis (20 Marks)",
    context: `Global Legal Associates operates across three offices: HQ in Johannesburg, Branch 1 in London, and Branch 2 in Singapore. The firm recently experienced data interception attempts, slow VPN performance, unauthorized access incidents, and employees deliberately bypassing VPN policies. The IT department suspects poor VPN design and weak policy enforcement are the root causes.`,
  },

  // Q4.1 — MCQ: Identify the PRIMARY weakness
  {
    id: "ITNSA_W5_Q13",
    type: "multiple-choice",
    sectionLabel: "4.1 A",
    text: "Global Legal Associates reports that employees are bypassing the VPN and connecting directly to corporate systems. Which of the following is MOST LIKELY the primary organizational failure enabling this behaviour?",
    options: [
      "The VPN uses IPSec instead of SSL, which is incompatible with employee devices.",
      "There is no technical enforcement of VPN usage — employees can access corporate resources without connecting to the VPN, so bypass carries no consequence.",
      "The VPN gateway is located in Johannesburg, creating latency for London and Singapore users.",
      "Employees lack awareness of what a VPN is."
    ],
    correctAnswers: ["There is no technical enforcement of VPN usage — employees can access corporate resources without connecting to the VPN, so bypass carries no consequence."],
    points: 2,
  },

  // Q4.1 — Show-answer: Four critical weaknesses (8 marks)
  {
    id: "ITNSA_W5_Q14",
    type: "show-answer",
    sectionLabel: "4.1 B",
    text: "Identify and explain four critical weaknesses in Global Legal Associates' current VPN implementation. For each weakness, identify the specific symptom from the scenario that indicates it, and explain the attack or risk it creates.",
    correctAnswers: [
      "1. Weak or Absent Authentication (No MFA) → Unauthorized Access Incidents: The scenario reports unauthorized access incidents. This strongly indicates that credential-based authentication alone is in use — a stolen or guessed password is sufficient to authenticate. Without MFA, there is no second barrier. A phished employee credential provides an attacker with full VPN access.\n\n2. Poor Protocol Selection → Data Interception Attempts: The data interception attempts suggest the VPN protocol in use either has known cryptographic weaknesses (consistent with PPTP) or that the tunnel is misconfigured (weak cipher suites, expired certificates). A well-configured IPSec or OpenVPN implementation with AES-256 and certificate authentication would not be vulnerable to passive interception.\n\n3. Lack of Traffic Enforcement / Split Tunneling Permitted → Employees Bypassing VPN: If employees can access corporate resources without being on the VPN, split tunneling or entirely optional VPN usage is the configuration. This means unencrypted traffic can reach internal systems, bypassing all perimeter security controls. The VPN policy is unenforced.\n\n4. No Performance Optimization / Suboptimal Topology → Slow VPN Performance: With offices across three continents (Johannesburg, London, Singapore) all tunneling through a single gateway, latency is the inevitable result. This is a design failure — regional VPN gateways or geo-distributed gateway clusters are absent. Poor performance is the direct driver of policy bypass — users disable a slow VPN to get work done."
    ],
    markingGuide: "Award 2 marks per weakness for a maximum of 4 weaknesses (8 marks total). Each weakness must include: the weakness itself, the specific scenario indicator, and the resulting risk or attack vector. Generic answers such as 'weak security' without specificity earn 0 marks per point.",
    points: 8,
  },

  // Q4.2 — Fill-in-the-blank: Architecture component identification
  {
    id: "ITNSA_W5_Q15",
    type: "fill-in-the-blank",
    sectionLabel: "4.2 A",
    text: "In the proposed secure architecture for Global Legal Associates, connections between the three fixed office locations (HQ, London, Singapore) use a ___ VPN. Remote employee connections from home or public Wi-Fi use a ___ VPN. All user traffic is forced through the VPN with no exceptions by disabling ___.",
    blanks: [
        {
            id: "b1",
            options: ["Hub-and-Spoke", "Site-to-Site", "Mesh", "Remote Access"],
            correctAnswer: "Site-to-Site",
        },
        {
            id: "b2",
            options: ["Clientless", "Peer-to-Peer", "Remote Access", "Site-to-Site"],
            correctAnswer: "Remote Access",
        },
        {
            id: "b3",
            options: ["Split Tunneling", "Full Tunneling", "Packet Filtering", "Encapsulation"],
            correctAnswer: "Split Tunneling",
        },
        ],
    points: 3,
  },

  // Q4.2 — Show-answer: Full VPN architecture design (12 marks)
  {
    id: "ITNSA_W5_Q16",
    type: "show-answer",
    sectionLabel: "4.2 B",
    text: "Design a complete secure VPN architecture for Global Legal Associates that addresses all four weaknesses identified. Your answer must specify: the VPN type(s) deployed, authentication mechanisms, encryption approach, and traffic control strategy. Justify each design decision with reference to the weaknesses it resolves.",
    correctAnswers: [
      "Architecture Overview:\nThe design uses a dual-VPN approach: Site-to-Site VPN for inter-office connectivity (Johannesburg ↔ London ↔ Singapore) and Remote Access VPN for individual employee connections.\n\n1. VPN Types:\nSite-to-Site IPSec Tunnels (IKEv2) are established between all three office gateways in a full-mesh topology. Each gateway maintains a permanent encrypted tunnel to both other sites, ensuring inter-office traffic is always encrypted and routed optimally without hairpinning through HQ. This resolves the performance weakness by eliminating single-gateway dependency.\n\nRemote Access SSL VPN (OpenVPN or equivalent) is deployed on a regional gateway in each location. London employees connect to the London gateway; Singapore employees to the Singapore gateway. This eliminates the cross-continental latency that drove users to bypass the VPN.\n\n2. Authentication Mechanisms:\nAll VPN access (site-to-site and remote) enforces MFA: Active Directory credentials (LDAP) combined with TOTP tokens via authenticator app. Site-to-site tunnels use certificate-based mutual authentication (PKI) with regular certificate rotation. This directly resolves the unauthorized access weakness — stolen passwords alone cannot authenticate.\n\n3. Encryption Approach:\nAll tunnels use AES-256-GCM for data encryption with HMAC-SHA-256 for integrity. IKEv2 with Perfect Forward Secrecy (PFS) is used for key exchange — ensuring that compromise of long-term keys does not expose past session traffic. This resolves the data interception vulnerability by eliminating weak cipher suites.\n\n4. Traffic Control:\nSplit tunneling is explicitly disabled on all remote access profiles. All employee traffic — including general internet browsing — is forced through the VPN tunnel and inspected by the corporate firewall and web proxy. This resolves the bypass weakness by removing the technical option to bypass; employees cannot reach corporate resources or the internet without being on the VPN. Network Access Control (NAC) posture checks enforce that only compliant, managed devices can establish a tunnel."
    ],
    markingGuide: "Award 4 marks for a correct and complete architecture (site-to-site + remote access types, regional gateways). Award 4 marks for security mechanisms — must include MFA, certificate-based site-to-site auth, and AES-256 with PFS. Award 4 marks for clarity and justification — each design decision must be explicitly linked to a weakness it resolves. Diagrams or structured descriptions of traffic flow earn full marks; unsupported lists do not.",
    diagram: {
      type: "mermaid",
      code: `flowchart LR
    subgraph Remote_Users
    RU[Employee Laptops\nPublic / Home Wi-Fi]
    end
    subgraph JHB_HQ
    GW_JHB[VPN Gateway\nJohannesburg]
    FW_JHB[Firewall + NAC]
    CORP[Corporate Servers\nHR / Finance / Legal]
    end
    subgraph London_Branch
    GW_LON[VPN Gateway\nLondon]
    end
    subgraph Singapore_Branch
    GW_SIN[VPN Gateway\nSingapore]
    end
    subgraph Auth_Layer
    MFA[MFA: TOTP + LDAP]
    CERT[PKI Certificates\nSite-to-Site]
    end
    RU -->|SSL VPN\nFull Tunnel| GW_JHB
    RU -->|SSL VPN\nFull Tunnel| GW_LON
    RU -->|SSL VPN\nFull Tunnel| GW_SIN
    GW_JHB <-->|IPSec IKEv2\nAES-256 + PFS| GW_LON
    GW_JHB <-->|IPSec IKEv2\nAES-256 + PFS| GW_SIN
    GW_LON <-->|IPSec IKEv2\nAES-256 + PFS| GW_SIN
    GW_JHB --> FW_JHB --> CORP
    RU --> MFA
    GW_JHB --> CERT
    style GW_JHB fill:#f96,stroke:#333,stroke-width:2px
    style MFA fill:#fc6,stroke:#333,stroke-width:2px
    style CORP fill:#69f,stroke:#333,stroke-width:2px`,
    },
    points: 12,
  },

  // ─────────────────────────────────────────────────────────────
  // SCENARIO 2: FinTech Startup (20 Marks)
  // ─────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITNSA_W5_SB2",
    type: "scenario",
    title: "Section B — Scenario 2: FinTech Startup — Rapid Expansion (20 Marks)",
    context: `A fintech startup is scaling rapidly and requires a VPN solution supporting 500+ remote employees, secure communication between cloud and on-premise systems, high performance with low latency, and strong access control. The company is evaluating three approaches: personal VPN solutions, enterprise VPN solutions, and open-source VPN deployment.`,
  },

  // Q5.1 — MCQ: Personal vs Enterprise distinction
  {
    id: "ITNSA_W5_Q17",
    type: "multiple-choice",
    sectionLabel: "5.1 A",
    text: "The fintech startup's CISO states: 'We need centralized control over who connects, from which devices, and what they can access — with audit logs for every session.' Which VPN category is the MINIMUM requirement to fulfil this mandate?",
    options: [
      "Personal VPN (e.g., NordVPN or ExpressVPN) — these are sufficient for 500 users if configured correctly.",
      "Enterprise VPN — only enterprise solutions provide centralized identity management, per-user access control, and session audit logging at scale.",
      "Open-source VPN only — personal solutions lack features but open-source is always cheaper and equally capable.",
      "No VPN is needed — a firewall with NAT provides equivalent access control."
    ],
    correctAnswers: ["Enterprise VPN — only enterprise solutions provide centralized identity management, per-user access control, and session audit logging at scale."],
    points: 2,
  },

  // Q5.1 — Show-answer: Personal vs Enterprise full comparison (8 marks)
  {
    id: "ITNSA_W5_Q18",
    type: "show-answer",
    sectionLabel: "5.1 B",
    text: "Compare personal VPN solutions and enterprise VPN solutions across four relevant dimensions for the fintech startup's context: scalability, access control, management, and security compliance. Your comparison must be specific enough to drive a procurement decision.",
    correctAnswers: [
      "1. Scalability:\nPersonal VPN: Designed for individual use or small groups. Shared server infrastructure with no guaranteed capacity. Concurrent connection limits are fixed by the subscription tier and cannot be dynamically scaled. Unsuitable for 500+ simultaneous enterprise users.\nEnterprise VPN: Architected for organizational scale. Supports hundreds to thousands of concurrent tunnels. Gateway infrastructure is dedicated, sized to organizational requirements, and can be horizontally scaled with load balancers.\n\n2. Access Control:\nPersonal VPN: Binary — either connected (full internet routing) or not. No per-user, per-resource, or role-based access controls exist. All users share the same IP pool and the same access profile.\nEnterprise VPN: Granular RBAC integrated with Active Directory / LDAP. Each user's post-authentication network access is defined by their group membership. A junior analyst cannot reach the payment processing VLAN regardless of having valid VPN credentials.\n\n3. Management and Visibility:\nPersonal VPN: User-controlled. No centralized dashboard, no session audit logs, no revocation mechanism (beyond canceling a subscription). The IT team has no visibility into who is connected or what they are accessing.\nEnterprise VPN: Centralized management console. Per-user session logs (connection time, IP, duration, data volume). Instant certificate revocation for terminated employees. Integration with SIEM for real-time alerting on anomalous access patterns.\n\n4. Security Compliance:\nPersonal VPN: No SLA, no audit reports, no compliance certifications relevant to fintech. Using a consumer VPN in a regulated fintech environment would fail PCI-DSS and financial services compliance audits.\nEnterprise VPN: Vendors provide SOC 2 Type II reports, penetration test results, and compliance documentation. Configurable to enforce TLS 1.3, disable legacy protocols, and integrate with HSMs for key management — all required in regulated financial environments."
    ],
    markingGuide: "Award 2 marks per dimension (scalability, access control, management, compliance) for a total of 8 marks. Each dimension must contrast both types specifically — not generically state 'enterprise is better.' Answers that correctly identify the fintech compliance angle (PCI-DSS, regulated environment) for the compliance dimension earn full marks for that section.",
    points: 8,
  },

  // Q5.2 — Fill-in-the-blank: Open-source VPN trade-offs
  {
    id: "ITNSA_W5_Q19",
    type: "fill-in-the-blank",
    sectionLabel: "5.2 A",
    text: "Open-source VPN solutions such as OpenVPN offer ___ code — meaning security researchers and the organization's own engineers can inspect and verify the implementation for vulnerabilities. However, the primary operational risk is that the organization bears full responsibility for ___, patching, and hardening the deployment without vendor support.",
    blanks: [
        {
            id: "b1",
            options: ["proprietary", "auditable / transparent", "obfuscated", "standardized"],
            correctAnswer: "auditable / transparent",
        },
        {
            id: "b2",
            options: ["orchestration", "provisioning", "compliance", "configuration"],
            correctAnswer: "configuration",
        },
        ],
    points: 2,
  },

  // Q5.2 — Show-answer: Open-source VPN evaluation (6 marks)
  {
    id: "ITNSA_W5_Q20",
    type: "show-answer",
    sectionLabel: "5.2 B",
    text: "Evaluate the use of an open-source VPN solution (e.g., OpenVPN Community Edition or WireGuard) for the fintech startup. Provide three specific benefits and three specific risks, and for each risk explain the organizational consequence if it materialises.",
    correctAnswers: [
      "Benefits:\n1. Cost Effectiveness: Open-source VPN software carries no per-seat licensing fees. For a 500-user deployment, this eliminates potentially significant annual licensing costs versus commercial enterprise solutions, freeing budget for other security controls.\n\n2. Transparency and Auditability: The source code is publicly available and has been reviewed by independent security researchers. The organization can commission its own code audit, verify cryptographic implementation, and confirm that no backdoors or undisclosed data collection exists — critical for a fintech handling customer financial data.\n\n3. Customizability: Open-source solutions can be modified, extended, and integrated with bespoke internal systems. The startup can implement custom authentication plugins, integrate with their proprietary IAM system, or build automation around the VPN API — none of which is possible with closed commercial solutions.\n\nRisks:\n1. Expertise Dependency → Consequence: Misconfiguration Risk: Deploying and hardening OpenVPN requires deep networking and cryptography expertise. A misconfigured server (weak cipher suite selected, certificate validation disabled, firewall rules too permissive) creates vulnerabilities that a commercial vendor's default hardened image would have avoided. In a fintech context, a misconfigured VPN gateway could result in unauthorized access to payment systems and a regulatory breach.\n\n2. Maintenance Burden → Consequence: Unpatched Vulnerability Exposure: The organization must monitor CVE disclosures for the VPN software, test patches, and deploy them promptly. Without a dedicated security operations function, patch deployment may lag — leaving a known vulnerability open. Commercial vendors typically push updates automatically.\n\n3. No Vendor Support → Consequence: Extended Downtime During Incidents: If the VPN gateway fails or is compromised, there is no 24/7 vendor support SLA. Resolution depends entirely on internal expertise. For a 500-user fintech startup, VPN downtime directly blocks remote access to production systems, with immediate revenue and operational impact."
    ],
    markingGuide: "Award 1 mark each for three valid benefits (3 marks total). Award 1 mark each for three valid risks (3 marks total) — but each risk must include the organizational consequence to earn the mark. Risks listed without consequences earn 0.5 marks each.",
    points: 6,
  },

  // Q5.3 — MCQ: Recommendation decision
  {
    id: "ITNSA_W5_Q21",
    type: "multiple-choice",
    sectionLabel: "5.3 A",
    text: "Based on the fintech startup's requirements (500+ users, regulatory compliance, centralized access control, cloud-to-on-premise connectivity), which approach represents the MOST suitable recommendation?",
    options: [
      "Personal VPN for all users — cheapest option and sufficient for the use case.",
      "Pure open-source deployment with no vendor support — maximizes cost savings.",
      "Enterprise VPN as the primary solution, with open-source components selectively integrated for specific use cases such as server-to-server tunnels.",
      "No VPN — rely solely on cloud provider security controls and perimeter firewalls."
    ],
    correctAnswers: ["Enterprise VPN as the primary solution, with open-source components selectively integrated for specific use cases such as server-to-server tunnels."],
    points: 2,
  },

  // Q5.3 — Show-answer: Full recommendation with justification (6 marks)
  {
    id: "ITNSA_W5_Q22",
    type: "show-answer",
    sectionLabel: "5.3 B",
    text: "Recommend the most suitable VPN approach for the fintech startup and justify your decision. Your justification must address scalability, regulatory compliance, access control, and the role of open-source components in the architecture.",
    correctAnswers: [
      "Recommendation: Enterprise VPN as the primary remote access solution, with selective open-source integration for specific infrastructure tunnels (e.g., WireGuard for cloud-to-on-premise site connectivity).\n\nJustification:\n\nScalability: An enterprise VPN platform (e.g., Cisco AnyConnect, Palo Alto GlobalProtect, or commercial OpenVPN Access Server) is purpose-built to support hundreds to thousands of concurrent connections with load balancing, high availability, and geographic distribution. This directly meets the 500+ user requirement with headroom for continued rapid growth.\n\nRegulatory Compliance: Fintech organizations operating under PCI-DSS, GDPR, and financial services regulations require documented security controls, vendor compliance certifications (SOC 2 Type II), and verifiable audit trails. Enterprise VPN vendors provide these. A home-built open-source deployment would require significant internal compliance documentation effort to pass a regulatory audit, and may still fail without vendor attestation.\n\nAccess Control: Enterprise platforms integrate natively with Active Directory, support certificate lifecycle management, and provide per-user RBAC policies — meeting the strong access control requirement. A developer cannot access the payments database and a support agent cannot access infrastructure — enforced by the VPN gateway, not by honor system.\n\nRole of Open-Source: WireGuard or OpenVPN can be strategically deployed for server-to-server tunnels (cloud ↔ on-premise) where the configuration is static, the attack surface is narrow, and the startup's engineering team can apply deep expertise. This captures the cost and auditability benefits of open-source for the infrastructure layer without exposing the user-facing remote access layer to open-source operational risks.\n\nConclusion: The hybrid approach captures the compliance and manageability guarantees of enterprise VPN for the workforce while retaining the flexibility and cost advantages of open-source for infrastructure connectivity."
    ],
    markingGuide: "Award 2 marks for the recommendation itself — must explicitly name the hybrid approach (enterprise primary + open-source selective). Award 4 marks for justification — must address all four specified dimensions (scalability, compliance, access control, open-source role). Responses recommending personal VPN or pure open-source without addressing compliance requirements earn a maximum of 2 marks.",
    points: 6,
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION C: DESIGN & IMPLEMENTATION (30 MARKS)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "SCENARIO_ITNSA_W5_SC1",
    type: "scenario",
    title: "Section C — Question 6: ADH Corporation — Site-to-Site VPN (15 Marks)",
    context: `ADH Corporation must implement a site-to-site VPN connecting three networks: HQ at 192.168.1.0/24, Branch A at 192.168.2.0/24, and Branch B at 192.168.3.0/24. The deployment must use appropriate IPSec modes and follow a structured implementation plan.`,
  },

  // Q6.1 — MCQ: Tunnel vs Transport mode selection
  {
    id: "ITNSA_W5_Q23",
    type: "multiple-choice",
    sectionLabel: "6.1 A",
    text: "ADH Corporation needs to encrypt traffic flowing between 192.168.1.0/24 (HQ) and 192.168.2.0/24 (Branch A) across a public internet connection. The traffic originates from internal hosts, not from the VPN gateways themselves. Which IPSec mode is STRICTLY required for this deployment?",
    options: [
      "Transport Mode — encrypts only the payload, sufficient for network-to-network tunnels.",
      "Tunnel Mode — encrypts the entire original IP packet including headers, required for gateway-to-gateway site-to-site VPNs.",
      "Either mode — the choice has no impact on network-to-network VPN deployments.",
      "Transport Mode — it provides better performance because it does not add a new IP header."
    ],
    correctAnswers: ["Tunnel Mode — encrypts the entire original IP packet including headers, required for gateway-to-gateway site-to-site VPNs."],
    points: 2,
  },

  // Q6.1 — Show-answer: Full tunnel vs transport explanation (5 marks)
  {
    id: "ITNSA_W5_Q24",
    type: "show-answer",
    sectionLabel: "6.1 B",
    text: "Explain how IPSec Tunnel Mode and Transport Mode differ in their operation, and justify which mode is appropriate for the ADH Corporation site-to-site deployment. Include the impact each mode has on the packet structure.",
    correctAnswers: [
      "IPSec Tunnel Mode:\nIn tunnel mode, the entire original IP packet — including its source and destination IP headers — is encrypted and encapsulated inside a new outer IP packet. The outer packet has new source and destination addresses (those of the VPN gateways), completely hiding the internal network topology from any observer on the public internet. A packet from 192.168.1.10 (HQ host) to 192.168.2.20 (Branch A host) is wrapped: the outer packet shows HQ-Gateway → Branch-A-Gateway; the inner encrypted payload contains the original headers and data.\n\nIPSec Transport Mode:\nIn transport mode, only the payload (layer 4 and above) of the original packet is encrypted. The original IP headers are left intact and visible. This mode is designed for host-to-host communication where both endpoints are the communicating parties (e.g., an encrypted session between two specific servers on the same trusted network). Transport mode cannot be used for gateway-to-gateway tunnels because the internal IP addresses would be exposed to the public internet, and routing between different subnets would not function correctly.\n\nApplication to ADH Corporation:\nTunnel mode is mandatory for this deployment. Traffic originates from hosts on 192.168.1.0/24 destined for 192.168.2.0/24 — these are different networks communicating through gateway devices. The VPN gateways must encapsulate the entire original packet to:\n1. Protect the internal IP addressing scheme from exposure on the public internet.\n2. Correctly route packets between subnets — the outer gateway-addressed packet can traverse the internet, while the inner packet carries the original addressing that the receiving gateway uses to forward traffic to the correct internal host.\n3. Enable full encryption of all inter-office traffic, not just the payload."
    ],
    markingGuide: "Award 2 marks for tunnel mode — must describe full packet encapsulation, new outer header, and hidden internal addresses. Award 2 marks for transport mode — must describe payload-only encryption and correct identification as host-to-host only. Award 1 mark for correct application to ADH: must state tunnel mode is required AND give a technical reason (subnet-to-subnet routing, internal address hiding).",
    points: 5,
  },

  // Q6.2 — Fill-in-the-blank: Deployment steps sequence
  {
    id: "ITNSA_W5_Q25",
    type: "fill-in-the-blank",
    sectionLabel: "6.2 A",
    text: "The ADH Corporation VPN deployment follows this sequence: First, ___ routers are installed at HQ, Branch A, and Branch B to serve as the tunnel endpoints. Next, ___ tunnels are configured between each pair of gateways using IKEv2 and AES-256. Then, ___ is configured to ensure that traffic destined for each remote subnet is sent through the correct VPN tunnel rather than the default gateway.",
    blanks: [
      {
        id: "b1",
        options: ["Gateway", "Edge", "VPN", "Concentrator"],
        correctAnswer: "VPN",
      },
      {
        id: "b2",
        options: ["SSL/TLS", "IPSec", "L2TP", "GRE"],
        correctAnswer: "IPSec",
      },
      {
        id: "b3",
        options: ["Dynamic Routing", "Policy-Based Routing", "Route Filtering", "Static Routing"],
        correctAnswer: "Static Routing",
      },
    ],
    points: 3,
  },

  // Q6.2 — Show-answer: Full deployment plan (10 marks)
  {
    id: "ITNSA_W5_Q26",
    type: "show-answer",
    sectionLabel: "6.2 B",
    text: "Design a complete VPN deployment plan for ADH Corporation connecting HQ (192.168.1.0/24), Branch A (192.168.2.0/24), and Branch B (192.168.3.0/24). Your plan must specify required components, setup steps, and protocol justification.",
    correctAnswers: [
      "Required Components:\n- 3× VPN-capable routers or firewall appliances (one per site) acting as IPSec gateways\n- Public static IP addresses on the WAN interface of each gateway\n- PKI infrastructure: Certificate Authority (CA) issuing identity certificates to each gateway for IKEv2 mutual authentication (preferred over pre-shared keys for auditable, revocable authentication)\n- Network management system for tunnel monitoring and alerting\n\nSetup Steps:\n\nStep 1 — Hardware and Network Preparation:\nInstall VPN gateway appliances at HQ, Branch A, and Branch B. Confirm public static IPs are assigned to each WAN interface. Verify that each gateway can reach the other two over the internet (ICMP + UDP 500/4500 permitted).\n\nStep 2 — PKI and Certificate Provisioning:\nEstablish a Certificate Authority (internal or managed). Issue an identity certificate to each gateway. Configure each gateway to trust the CA's root certificate. This enables mutual authentication — both ends verify each other's certificate before establishing the tunnel.\n\nStep 3 — IKEv2 Phase 1 Configuration (ISAKMP Policy):\nOn each gateway, configure IKEv2 parameters: Encryption: AES-256 | Integrity: SHA-256 | DH Group: Group 14 (2048-bit) or higher | Authentication: RSA certificates | Lifetime: 86400 seconds.\n\nStep 4 — IPSec Phase 2 Configuration (Transform Set):\nDefine the IPSec transform set: Protocol: ESP (Encapsulating Security Payload) | Encryption: AES-256-GCM | Mode: Tunnel | Perfect Forward Secrecy: Enabled (DH Group 14) | Lifetime: 3600 seconds.\n\nStep 5 — Tunnel and Crypto Map Configuration:\nCreate crypto maps linking: HQ ↔ Branch A (192.168.1.0/24 ↔ 192.168.2.0/24) | HQ ↔ Branch B (192.168.1.0/24 ↔ 192.168.3.0/24) | Branch A ↔ Branch B (192.168.2.0/24 ↔ 192.168.3.0/24). Apply crypto maps to the WAN interface of each gateway.\n\nStep 6 — Routing Configuration:\nAdd static routes on each gateway: HQ gateway: route 192.168.2.0/24 via Branch-A-tunnel; route 192.168.3.0/24 via Branch-B-tunnel. Apply equivalent routes at each branch. This ensures inter-subnet traffic is forwarded into the correct tunnel rather than dropped at the default gateway.\n\nStep 7 — Testing and Monitoring:\nVerify tunnel establishment (IKE SA and IPSec SA up). Test end-to-end ICMP between host pairs across all three site combinations. Configure SNMP/syslog monitoring for tunnel state changes. Document baseline traffic volumes for anomaly detection.\n\nProtocol Justification:\nIPSec with IKEv2 is selected over SSL VPN for this site-to-site deployment because: (1) it operates at Layer 3, making it transparent to all application protocols without client software on end hosts; (2) IKEv2 provides faster re-keying and built-in NAT traversal; (3) AES-256-GCM with PFS meets enterprise and regulatory encryption requirements."
    ],
    markingGuide: "Award 3 marks for correctly identifying required components (gateways, static IPs, PKI/certificates). Award 4 marks for a logical, complete sequence of setup steps — must include Phase 1 (IKEv2) and Phase 2 (IPSec) configuration as distinct steps, plus routing configuration. Award 3 marks for protocol justification — must explain WHY IPSec/IKEv2 is chosen for this specific use case, not just name the protocol.",
    diagram: {
      type: "mermaid",
      code: `flowchart LR
    HQ["HQ Gateway\n192.168.1.0/24\nPublic IP: A"]
    BA["Branch A Gateway\n192.168.2.0/24\nPublic IP: B"]
    BB["Branch B Gateway\n192.168.3.0/24\nPublic IP: C"]
    HQ <-->|"IPSec Tunnel\nAES-256 + IKEv2\nHQ ↔ Branch A"| BA
    HQ <-->|"IPSec Tunnel\nAES-256 + IKEv2\nHQ ↔ Branch B"| BB
    BA <-->|"IPSec Tunnel\nAES-256 + IKEv2\nBranch A ↔ Branch B"| BB
    style HQ fill:#f96,stroke:#333,stroke-width:2px
    style BA fill:#69f,stroke:#333,stroke-width:2px
    style BB fill:#69f,stroke:#333,stroke-width:2px`,
    },
    points: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // QUESTION 7: VPN Policy & Gateway Security (15 Marks)
  // ─────────────────────────────────────────────────────────────
  {
    id: "SCENARIO_ITNSA_W5_SC2",
    type: "scenario",
    title: "Section C — Question 7: VPN Policy Framework & Gateway Security (15 Marks)",
    context: `A company wants to enforce strict VPN policies to improve security posture. The IT security team must develop a comprehensive VPN policy framework, address the risk of split tunneling, and define best practices for VPN gateway hardening.`,
  },

  // Q7.1 — Show-answer: Full VPN policy framework (8 marks)
  {
    id: "ITNSA_W5_Q27",
    type: "show-answer",
    sectionLabel: "7.1",
    text: "Develop a comprehensive VPN policy framework for a corporate environment. Your framework must address user responsibilities, device compliance requirements, and connection rules. Each policy element must include a rationale explaining the risk it mitigates.",
    correctAnswers: [
      "User Responsibilities:\n1. Mandatory VPN Usage: All employees must connect to the corporate VPN before accessing any internal resource (file servers, email, intranet, cloud applications). Rationale: Eliminates the possibility of data traversing unencrypted paths and enforces consistent security controls regardless of the user's physical location.\n\n2. Credential and MFA Security: Users must not share VPN credentials, store passwords in unsecured locations, or approve MFA prompts they did not initiate. Users must report suspicious MFA requests immediately. Rationale: Credential sharing enables unauthorized access that appears legitimate in audit logs; unsolicited MFA approvals are the primary vector for MFA fatigue attacks.\n\n3. Prohibited Activities: Users must not install unauthorized VPN clients, configure personal hotspot sharing that bypasses corporate controls, or attempt to modify VPN client settings. Rationale: Unauthorized VPN configurations can create unmonitored tunnels that bypass all security controls.\n\nDevice Compliance:\n4. Managed Device Requirement: Only corporate-issued or formally enrolled (MDM-registered) devices may connect to the VPN. Rationale: Unmanaged devices cannot be verified to meet security baselines — they may carry malware that would transit directly into the corporate network through the VPN tunnel.\n\n5. Posture Compliance Checks: The VPN gateway must perform automated pre-connection checks verifying: OS patch level is within 30 days of current | Active and updated endpoint protection (EDR) is running | Disk encryption (BitLocker/FileVault) is enabled. Rationale: A device meeting all authentication requirements but running unpatched software or without endpoint protection is a compromised device waiting to happen.\n\nConnection Rules:\n6. No Split Tunneling: All internet and corporate traffic must be routed through the VPN tunnel. Rationale: Split tunneling allows simultaneous connections to the corporate network and the public internet, creating a bridging attack surface where malware on the device can pivot between networks.\n\n7. Session Timeout: VPN sessions automatically disconnect after 8 hours of total session time or 30 minutes of inactivity, requiring re-authentication. Rationale: Persistent sessions increase the window of exposure if a device is lost, stolen, or left unattended.\n\n8. Geographic Access Restrictions: VPN connections from geographic regions with no business presence are blocked or flagged for immediate review. Rationale: Impossible-travel scenarios (user authenticating from Johannesburg and Singapore within one hour) indicate stolen credentials."
    ],
    markingGuide: "Award 2 marks each for any 4 strong policy elements that include both the policy rule and its security rationale (8 marks total). Elements must span at least two of the three categories (user responsibilities, device compliance, connection rules). Generic policies without rationale earn 1 mark maximum per element.",
    points: 8,
  },

  // Q7.2 — MCQ: Split tunneling primary risk
  {
    id: "ITNSA_W5_Q28",
    type: "multiple-choice",
    sectionLabel: "7.2 A",
    text: "A user's laptop is connected to the corporate VPN with split tunneling enabled. The user opens a phishing email attachment which installs malware. What is the PRIMARY security risk created specifically by the split tunneling configuration in this scenario?",
    options: [
      "The VPN connection will drop, exposing all corporate traffic to the public internet.",
      "The malware can communicate with its command-and-control server via the unrestricted internet path while simultaneously accessing corporate network resources through the VPN tunnel — bypassing all corporate security inspection.",
      "Split tunneling increases bandwidth usage and slows down the VPN connection.",
      "The malware will be detected automatically because split tunneling forces all traffic through the corporate firewall."
    ],
    correctAnswers: ["The malware can communicate with its command-and-control server via the unrestricted internet path while simultaneously accessing corporate network resources through the VPN tunnel — bypassing all corporate security inspection."],
    points: 2,
  },

  // Q7.2 — Show-answer: Full split tunneling critique (4 marks)
  {
    id: "ITNSA_W5_Q29",
    type: "show-answer",
    sectionLabel: "7.2 B",
    text: "Critically explain why split tunneling is prohibited in secure environments. Your answer must describe the technical mechanism of split tunneling, the attack vectors it enables, and why full tunneling is the required alternative.",
    correctAnswers: [
      "Technical Mechanism of Split Tunneling:\nSplit tunneling is a VPN configuration where the routing table on the client device is modified to send only traffic destined for corporate subnets through the encrypted VPN tunnel, while all other traffic (general internet browsing, personal applications, cloud services) is sent directly through the local network interface — bypassing the VPN entirely. The device simultaneously maintains two active network paths: one encrypted tunnel to the corporate network and one unencrypted direct connection to the public internet.\n\nAttack Vectors Enabled:\n1. Malware Pivot / Bridging Attack: If malware infects the device while split tunneling is active, the malware can exfiltrate data through the direct internet path while simultaneously reaching corporate resources through the open VPN tunnel. The corporate firewall never inspects the malware's C2 communication because it travels via the local internet path, not the tunnel.\n\n2. Bypass of Security Controls: Corporate web proxies, DNS filtering, DLP (Data Loss Prevention) systems, and IDS/IPS tools only inspect traffic that traverses the corporate network. Split tunneling means the majority of the user's internet traffic — and potentially exfiltrated data disguised as normal traffic — is never inspected by any corporate security system.\n\n3. Network Bridging: A user with split tunneling on a shared network (home router, hotel Wi-Fi with multiple guests) effectively creates a bridge between that untrusted network and the corporate network. Another device on the same local network can potentially leverage the split-tunnel user as a pivot point.\n\nWhy Full Tunneling is Required:\nFull tunneling forces all traffic — including internet browsing — through the VPN tunnel and corporate firewall. Every connection the device makes passes through corporate security inspection, DLP, DNS filtering, and web proxy controls. Data exfiltration attempts are visible and blockable. Malware cannot establish a covert C2 channel that bypasses corporate monitoring."
    ],
    markingGuide: "Award 2 marks for the explanation of split tunneling — must describe the dual routing path mechanism (not just 'some traffic goes through VPN'). Award 2 marks for the risks — must identify at least two distinct attack vectors with technical specificity. Full tunneling must be mentioned as the alternative. Answers that only state 'split tunneling is a risk because it bypasses security' without explaining the mechanism earn a maximum of 1 mark.",
    points: 4,
  },

  // Q7.3 — Fill-in-the-blank: Gateway best practices (3 marks auto-calculated)
  {
    id: "ITNSA_W5_Q30",
    type: "fill-in-the-blank",
    sectionLabel: "7.3",
    text: "Three critical best practices for VPN gateway hardening are: (1) Replace default pre-shared keys with ___ to enable per-device identity verification and support revocation of compromised endpoints without changing keys for all users. (2) Disable all legacy and weak cipher suites — ensure the gateway only accepts ___ 1.2 or higher for SSL VPNs and AES-256 for IPSec, preventing downgrade attacks. (3) Enable ___ for all administrative logins to the gateway management interface, ensuring that a compromised admin password alone cannot be used to reconfigure or disable the VPN.",
    blanks: [
      {
        id: "b1",
        options: ["Group-based PSKs", "PKI Certificates", "MAC Filtering", "OCSP Stapling"],
        correctAnswer: "PKI Certificates",
      },
      {
        id: "b2",
        options: ["IPSec-AH", "SSHv2", "TLS", "SSLv3"],
        correctAnswer: "TLS",
      },
      {
        id: "b3",
        options: ["TACACS+", "Role-Based Access Control", "MFA"],
        correctAnswer: "MFA",
      },
    ],
    points: 3,
  },

];
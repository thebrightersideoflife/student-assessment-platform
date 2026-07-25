// src/data/questions/ITCOA/week2.js
export default [

  // ── Scenario ─────────────────────────────────────────────
  {
    id: 'SCENARIO_ITCOA_W2',
    type: 'scenario',
    title: 'University-Level Applied Assessment: DNS, DHCP, Active Directory, and Windows Server Administration (100 Marks)',
    context: `**Atlas Electronica Group** is a multinational manufacturer of smart appliances with offices in Johannesburg, Cape Town, Durban, and a small public-facing sales branch in London. The company is modernising its Windows Server environment after years of *fragmented administration*.

Its current problems include:
• manual IP address assignment and frequent address conflicts
• slow and inconsistent name resolution across internal departments
• difficulty separating internal and public-facing naming requirements
• weak continuity when network services fail
• inconsistent user and computer administration across sites
• a lack of central visibility into DNS and DHCP activity
• replication traffic that is larger than necessary between branches

Atlas wants a **centralised, resilient design** that improves operational reliability, supports growth, and makes administration easier for technical staff without sacrificing control. The company will use Windows Server technologies, including **DNS**, **DHCP**, **Active Directory Domain Services**, **Active Directory Users and Computers**, **Active Directory Administrative Center**, **Active Directory Sites and Services**, and **IPAM** where appropriate.

*All questions below relate to Atlas Electronica Group unless a question explicitly says otherwise.*`,
  },

  // ── QUESTION 1 — DNS DESIGN, LOOKUP BEHAVIOUR, AND NAME RESOLUTION (20 marks) ──

  // 1.1 Multiple-choice
  {
    id: 'ITCOA_W2_Q1',
    type: 'multiple-choice',
    tags: ['network protocols', 'technological impact'],
    sectionLabel: '1.1',
    text: 'Atlas wants employees to use easy-to-remember hostnames instead of IP addresses when accessing internal services. Which statement best captures the core purpose of DNS in this design?',
    options: [
      'DNS assigns permanent IP addresses to every client device',
      'DNS translates names into IP addresses so clients can reach services',
      'DNS eliminates the need for subnetting in the company network',
      'DNS replaces the need for directory services such as AD DS',
    ],
    correctAnswers: ['DNS translates names into IP addresses so clients can reach services'],
    points: 2,
    explanation: 'DNS exists to map human-readable names to IP addresses so clients can locate services on the network. It is a name-resolution system, not an address-assignment system (that\'s DHCP\'s job), and it does not replace subnetting or directory services like AD DS — those solve different, unrelated problems.',
  },

  // 1.2 Open-ended
  {
    id: 'ITCOA_W2_Q2',
    type: 'open-ended',
    tags: ['network protocols'],
    sectionLabel: '1.2',
    text: 'Name the DNS record that maps one hostname to another hostname.',
    correctAnswers: ['CNAME', 'Canonical Name', 'Canonical Name record'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: 'A **CNAME** record maps an alias to the canonical hostname. It does not point directly to an IP address — the key distinction is "alias to name," not "name to address."',
  },

  // 1.3 Fill-in-the-blank
  {
    id: 'ITCOA_W2_Q3',
    type: 'fill-in-the-blank',
    tags: ['network protocols'],
    sectionLabel: '1.3',
    text: 'When a DNS resolver does not already have the answer cached, it usually begins a ___ query process.',
    blanks: [
      {
        id: 'b1',
        options: ['zone transfer', 'recursive', 'iterative', 'reverse'],
        correctAnswer: 'recursive',
      },
    ],
    explanation: 'In a **recursive** query, the client asks the resolver to do all the work and return a final answer rather than a referral. The resolver then contacts root, TLD, and authoritative servers on the client\'s behalf until it can return a definitive result, caching the answer for future lookups.',
  },

  // 1.4 Show-answer essay
  {
    id: 'ITCOA_W2_Q4',
    type: 'show-answer',
    tags: ['network protocols', 'system configuration', 'systems thinking'],
    sectionLabel: '1.4',
    text: `Atlas has one public website and one internal employee portal that must both be reachable using the same friendly name, but they must resolve to different IP addresses depending on whether the user is inside or outside the corporate network.

Explain how you would design Atlas's DNS solution to support this requirement. Your answer must cover:
- the most appropriate DNS configuration approach
- the role of zone types and authoritative data
- why caching and recursive resolution matter
- which record types you would expect to use
- why this design is superior to manually distributing IP addresses to users

**Examiner note:** high marks require the student to justify the *design choice*, not merely list DNS terms.`,
    correctAnswers: [
      {
        text: `Atlas should use a **split-brain DNS** (split-horizon DNS) design so that the same domain name can resolve to different IP addresses for internal and external users. Internally, the company would host a private zone that returns internal RFC 1918 addresses for employee services, while the public DNS view returns public addresses for the website. This approach is specifically designed for environments that need two versions of one zone: one for intranet users and one for external users.

The design should rely on **authoritative DNS zones** so that each view has a clear source of truth. Atlas would use **A/AAAA records** for direct host-to-address mappings, **CNAME records** where aliases are needed, and **NS records** to indicate authoritative name servers. Caching should be enabled and understood as a performance aid, but the authoritative zone remains the final decision-maker when the resolver needs fresh data. DNS is fundamentally the service that translates names into IP addresses, and the resolver may query root, TLD, and authoritative servers in a *recursive* process when cached data is unavailable.

This design is better than manually distributing IP addresses because it reduces user error, supports future change, and allows Atlas to manage internal and external access without forcing users to learn IP addresses. It also makes operational maintenance cleaner when services move or scale. A well-designed DNS service is therefore not just a naming tool; it is a control point for consistency, access, and adaptability.`,
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Identifies split-brain DNS as the correct design | 3 |
| Explains internal vs external resolution views | 3 |
| Correctly describes authoritative zones and record types | 3 |
| Explains recursive lookup and caching | 2 |
| Justifies why this is better than manual IP distribution | 2 |
| Uses correct terminology and coherent structure | 1 |
| **Total** | **14** |

**Examiner comment:** High marks go to answers that explain *why* the design fits the business, not merely what DNS records do.`,
    points: 14,
  },

  // ── QUESTION 2 — DHCP PLANNING, SCOPE DESIGN, AND SERVICE CONTINUITY (20 marks) ──

  // 2.1 Multiple-choice
  {
    id: 'ITCOA_W2_Q5',
    type: 'multiple-choice',
    tags: ['network protocols', 'system configuration', 'systems thinking'],
    sectionLabel: '2.1',
    text: 'Atlas has two DHCP servers and wants one to remain available if the other fails, while both share scope information. Which arrangement is most appropriate?',
    options: [
      'Manual addressing with static reservations only',
      'DHCP failover',
      'Secondary DNS zones',
      'Stub zones with zone transfers disabled',
    ],
    correctAnswers: ['DHCP failover'],
    points: 2,
    explanation: '**DHCP failover** allows two DHCP servers to share leases and scope information so that one server can continue service if the other fails. Microsoft documents it as a high-availability feature that replicates lease information between partners.',
  },

  // 2.2 Open-ended
  {
    id: 'ITCOA_W2_Q6',
    type: 'open-ended',
    tags: ['network protocols', 'system configuration'],
    sectionLabel: '2.2',
    text: 'Name the DHCP mechanism used to ensure a device always receives the same IP address based on its MAC address.',
    correctAnswers: ['reservation', 'DHCP reservation'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: 'DHCP **reservations** assign a specific IP address to a client based on its MAC address or client identifier, keeping the address consistent for that device.',
  },

  // 2.3 Fill-in-the-blank
  {
    id: 'ITCOA_W2_Q7',
    type: 'fill-in-the-blank',
    tags: ['network protocols', 'system configuration'],
    sectionLabel: '2.3',
    text: 'The period for which a DHCP client may keep an assigned address is called the lease ___.',
    blanks: [
      {
        id: 'b1',
        options: ['scope', 'exclusion', 'duration', 'reservation'],
        correctAnswer: 'duration',
      },
    ],
    explanation: 'The **lease duration** controls how long a client is allowed to keep an assigned IP address before it must renew or release it. Shorter durations return addresses to the pool faster (useful in high-turnover environments like guest Wi-Fi), while longer durations reduce renewal traffic on stable networks.',
  },

  // 2.4 Show-answer essay
  {
    id: 'ITCOA_W2_Q8',
    type: 'show-answer',
    tags: ['system configuration', 'technological impact', 'systems thinking'],
    sectionLabel: '2.4',
    text: `Atlas currently hands out addresses manually at each branch, which is causing conflicts, poor visibility, and wasted administration time. The company wants a central DHCP strategy that scales across multiple sites and VLANs.

Discuss why Atlas should use a dedicated DHCP server rather than relying on router-based addressing. Your answer must integrate:
- the purpose of DHCP in the network
- the meaning of a DHCP scope
- why exclusions, reservations, lease duration, default gateway, and DNS options matter
- how failover improves resilience
- why centralised control matters for a growing enterprise

**Examiner note:** a full-mark answer must show *intent* and *business value*, not just configuration steps.`,
    correctAnswers: [
      {
        text: `Atlas should use a **dedicated centralized DHCP server** rather than leaving IP assignment to routers because DHCP is meant to automate the delivery of IP addresses and TCP/IP configuration settings in a controlled, centrally managed way. A proper DHCP server does more than assign numbers: it supplies the client with a valid address, lease duration, router/default gateway information, and DNS settings. This is why the company should use DHCP as an enterprise service rather than a local workaround.

The scope must be designed carefully. A **DHCP scope** defines the address range that may be leased, while exclusions keep special addresses out of circulation and reservations keep certain devices stable. Lease duration matters because it controls how quickly addresses return to the pool, and scope options matter because they tell clients where the default gateway and DNS servers are. Without correct scope design, Atlas would continue to experience conflicts, inconsistent connectivity, and poor control over address usage.

Atlas should also implement **DHCP failover** so that a second server can continue leasing if the first one fails. Microsoft's implementation shares lease and scope data between failover partners, which supports high availability. That is the correct answer to resilience: not a second isolated server, but a coordinated pair. For a growing company with multiple branches, this provides continuity, logging visibility, and better operational control.`,
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Explains the purpose of DHCP as automatic configuration | 3 |
| Explains scope design: range, exclusions, reservations | 4 |
| Explains lease duration and scope options | 3 |
| Explains why centralized control is better than router-only management | 2 |
| Explains DHCP failover as high availability | 2 |
| **Total** | **14** |

**Examiner comment:** Full credit requires both operational reasoning and service design. Listing DHCP settings without explaining their purpose is not enough.`,
    points: 14,
  },

  // ── QUESTION 3 — ACTIVE DIRECTORY DOMAIN DESIGN AND DOMAIN CONTROLLER LOGIC (20 marks) ──

  // 3.1 Multiple-choice
  {
    id: 'ITCOA_W2_Q9',
    type: 'multiple-choice',
    tags: ['system configuration', 'technological impact'],
    sectionLabel: '3.1',
    text: "Atlas wants its first domain controller to be stable, discoverable, and able to support directory services properly. Which practice is most correct for that server?",
    options: [
      'Give it a dynamic IP address so DHCP can manage it',
      'Point its DNS client to itself and use a static IP address',
      'Disable DNS so AD DS can run independently',
      'Put it on a temporary hostname and rename it later if needed',
    ],
    correctAnswers: ['Point its DNS client to itself and use a static IP address'],
    points: 2,
    explanation: "A domain controller needs stable network identity and DNS integration because AD DS depends on reliable name resolution and predictable service location — clients locate domain controllers by querying DNS for SRV records, so if that identity shifts (a dynamic address, an unregistered hostname) authentication and replication can silently break. Microsoft's AD DS and DNS guidance emphasises DNS as a core dependency for directory services.",
  },

  // 3.2 Open-ended
  {
    id: 'ITCOA_W2_Q10',
    type: 'open-ended',
    tags: ['system configuration'],
    sectionLabel: '3.2',
    text: 'Name the Windows Server role that provides the core services for creating and managing a domain.',
    correctAnswers: ['Active Directory Domain Services', 'AD DS'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: '**Active Directory Domain Services (AD DS)** is the Windows Server role that provides the core services for creating and managing a domain.',
  },

  // 3.3 Fill-in-the-blank
  {
    id: 'ITCOA_W2_Q11',
    type: 'fill-in-the-blank',
    tags: ['system configuration'],
    sectionLabel: '3.3',
    text: 'The password used to boot a domain controller into Directory Services Restore Mode is the ___ password.',
    blanks: [
      {
        id: 'b1',
        options: ['domain admin', 'DSRM', 'recovery key', 'schema master'],
        correctAnswer: 'DSRM',
      },
    ],
    explanation: 'The **DSRM (Directory Services Restore Mode)** password is set when a domain controller is first promoted and is used to log in locally when the server is booted into DSRM for maintenance tasks such as restoring AD DS from backup or repairing a damaged database, since AD DS itself is offline in this mode.',
  },

  // 3.4 Show-answer essay
  {
    id: 'ITCOA_W2_Q12',
    type: 'show-answer',
    tags: ['systems thinking', 'system configuration', 'technological impact'],
    sectionLabel: '3.4',
    text: `Atlas plans to create its first domain controller and later add additional controllers for redundancy. The company also expects multiple users, computers, and departments to join the domain over time.

Explain how Atlas should approach domain-controller preparation and domain creation. Your answer must include:
- why a static IP and stable hostname are important
- why the first domain controller usually also hosts DNS and the global catalog
- what the DSRM password is for
- why multiple domain controllers improve fault tolerance
- how the ideas of domain, tree, and forest help the company scale

**Examiner note:** the strongest answers connect design choices to operational reliability and future growth.`,
    correctAnswers: [
      {
        text: `A domain controller should have a **static IP address** and a stable hostname because directory services depend on predictable network identity. The first domain controller in a new forest commonly provides **DNS** and **Global Catalog** services as part of the standard initial deployment, because the domain controller must be discoverable and integrated with name resolution. The **DSRM password** is used when starting the controller in Directory Services Restore Mode for recovery and maintenance tasks.

Multiple domain controllers provide redundancy and fault tolerance: if one controller fails, another can still authenticate users and service directory requests. The hierarchy of **domain**, **tree**, and **forest** helps Atlas scale: a domain is the basic logical container for users, groups, and computers; a tree is a set of domains in a contiguous namespace; and a forest is the top-level structure that can contain one or more trees while sharing schema and configuration.

Atlas is not simply "installing software," but building an identity architecture that can scale cleanly as the business grows.`,
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Explains stable identity/static network planning for the first DC | 3 |
| Explains why DNS integration matters | 3 |
| Explains the DSRM password purpose | 2 |
| Explains redundancy through multiple DCs | 3 |
| Explains domain/tree/forest as a scale model | 3 |
| **Total** | **14** |

**Examiner comment:** Excellent answers connect directory design to reliability, recovery, and enterprise growth.`,
    points: 14,
  },

  // ── QUESTION 4 — USER ADMINISTRATION, TRUSTS, SITES, AND ADAC (20 marks) ──

  // 4.1 Multiple-choice
  {
    id: 'ITCOA_W2_Q13',
    type: 'multiple-choice',
    tags: ['system configuration', 'technological impact'],
    sectionLabel: '4.1',
    text: "Atlas's administrators want a more task-oriented tool for managing objects, passwords, the Recycle Bin, fine-grained password policies, and command history. Which tool best fits this need?",
    options: [
      'Active Directory Users and Computers',
      'Active Directory Administrative Center',
      'DNS Manager',
      'Server Manager only',
    ],
    correctAnswers: ['Active Directory Administrative Center'],
    points: 2,
    explanation: '**ADAC** is the more task-oriented management tool and includes features such as the Recycle Bin, fine-grained password policies, and PowerShell History Viewer. ADUC and DNS Manager are older, narrower snap-ins that don\'t expose these features, which is why ADAC is the better fit when this specific combination of capabilities is needed.',
  },

  // 4.2 Open-ended
  {
    id: 'ITCOA_W2_Q14',
    type: 'open-ended',
    tags: ['system configuration'],
    sectionLabel: '4.2',
    text: 'Name the MMC snap-in commonly used to create and manage user accounts and group membership.',
    correctAnswers: ['ADUC', 'Active Directory Users and Computers'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation: '**Active Directory Users and Computers (ADUC)** is the common MMC snap-in used to create and manage user accounts and membership information.',
  },

  // 4.3 Fill-in-the-blank
  {
    id: 'ITCOA_W2_Q15',
    type: 'fill-in-the-blank',
    tags: ['system configuration'],
    sectionLabel: '4.3',
    text: 'The feature in ADAC that helps recover deleted directory objects with their attributes preserved is the Active Directory ___ Bin.',
    blanks: [
      {
        id: 'b1',
        options: ['Recycle', 'Restore', 'Archive', 'Backup'],
        correctAnswer: 'Recycle',
      },
    ],
    explanation: 'The Active Directory **Recycle Bin** preserves most of a deleted object\'s attributes and group memberships (not just a tombstone) for a configurable retention period, allowing administrators to restore the object cleanly via ADAC instead of rebuilding it from scratch.',
  },

  // 4.4 Show-answer essay
  {
    id: 'ITCOA_W2_Q16',
    type: 'show-answer',
    tags: ['systems thinking', 'system configuration', 'technological impact'],
    sectionLabel: '4.4',
    text: `Atlas has branch offices in different cities, and the network team wants replication traffic to be efficient. The company also wants better control over creating users, restoring deleted objects, and enforcing different password policies for different groups.

Explain how Atlas should use Active Directory Sites and Services and Active Directory Administrative Center together. Your answer must discuss:
- sites, subnets, and site links
- why moving controllers into the correct site matters
- the administrative purpose of ADAC
- how the Recycle Bin, fine-grained password policy, and PowerShell history fit into operations
- why these tools support both efficiency and governance

**Examiner note:** students should show that they understand *why* sites and ADAC exist, not just what menu they live under.`,
    correctAnswers: [
      {
        text: `**Active Directory Sites and Services** is used to model the physical network by associating IP subnets with sites and controlling replication paths between domain controllers. Moving controllers into the correct site matters because site membership influences how authentication and replication traffic are handled, helping Atlas reduce unnecessary WAN traffic and improve performance for branch users. Site links describe how sites communicate and how replication is organised.

**Active Directory Administrative Center (ADAC)** is a more modern, task-oriented management interface for AD objects. ADAC supports administration features such as the **Recycle Bin** for restoring deleted objects, **fine-grained password policies** for different groups, and the **Windows PowerShell History Viewer** for seeing the command activity behind GUI actions. These features connect to governance: the Recycle Bin improves recoverability, fine-grained password policies support differentiated security controls, and history viewing improves auditing and training.

Atlas is using these tools to make administration both more efficient and more controlled.`,
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Explains sites, subnets, and site links as physical topology modelling | 4 |
| Explains why moving DCs into the correct site matters | 3 |
| Explains ADAC as a management console | 2 |
| Explains Recycle Bin, fine-grained password policy, or PowerShell history | 3 |
| Explains how the two tools support both efficiency and governance | 2 |
| **Total** | **14** |

**Examiner comment:** Strong answers distinguish between *directory topology* and *directory administration*.`,
    points: 14,
  },

  // ── QUESTION 5 — INTEGRATED DESIGN DECISIONS AND OPERATIONAL JUSTIFICATION (20 marks) ──

  // 5.1 Multiple-choice
  {
    id: 'ITCOA_W2_Q17',
    type: 'multiple-choice',
    tags: ['network protocols', 'system configuration', 'systems thinking'],
    sectionLabel: '5.1',
    text: "Atlas's internal support team wants a name-resolution design that can return different answers for the same hostname depending on whether the request comes from inside or outside the company. What is this approach called?",
    options: [
      'Secondary zone delegation',
      'Split-brain DNS',
      'Reverse lookup isolation',
      'Non-recursive caching',
    ],
    correctAnswers: ['Split-brain DNS'],
    points: 2,
    explanation: "**Split-brain DNS** provides two versions of a single zone so internal and external users can receive different responses for the same name. Microsoft's split-brain DNS guidance describes precisely this internal-versus-external design.",
  },

  // 5.2 Open-ended
  {
    id: 'ITCOA_W2_Q18',
    type: 'open-ended',
    tags: ['network protocols'],
    sectionLabel: '5.2',
    text: 'Name the command used on a Windows client to clear the DNS resolver cache.',
    correctAnswers: ['ipconfig /flushdns'],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
    },
    explanation: 'The `ipconfig /flushdns` command clears the DNS resolver cache on a Windows client.',
  },

  // 5.3 Fill-in-the-blank
  {
    id: 'ITCOA_W2_Q19',
    type: 'fill-in-the-blank',
    tags: ['network protocols'],
    sectionLabel: '5.3',
    text: 'A DNS client query that asks the server for the best answer it can provide, often receiving referrals if it is not authoritative, is called an ___ query.',
    blanks: [
      {
        id: 'b1',
        options: ['recursive', 'authoritative', 'iterative', 'reverse'],
        correctAnswer: 'iterative',
      },
    ],
    explanation: 'In an **iterative** query, the server gives the client its best current answer — either the record itself or a referral to another server that may know more — rather than resolving the whole chain itself. This is how DNS servers typically query each other (e.g. a resolver querying root, then TLD, then authoritative servers), as opposed to the recursive style clients use toward their resolver.',
  },

  // 5.4 Show-answer essay
  {
    id: 'ITCOA_W2_Q20',
    type: 'show-answer',
    tags: ['systems thinking', 'system configuration', 'technological impact'],
    sectionLabel: '5.4',
    text: `Atlas is preparing a branch-office rollout that includes DNS, DHCP, and AD DS. The project sponsor has asked for a design that is not just technically correct but also operationally sensible.

Write an integrated response that explains how Atlas should combine:
- DNS zones and record types
- DHCP scopes, reservations, lease duration, and failover
- AD DS, domain controllers, and DNS integration
- sites, subnets, and site links
- the administrative role of IPAM or centralised visibility

Your answer should show how the services work together as one operating model rather than as separate tools.

**Examiner note:** this question rewards synthesis. A list of facts will not earn full marks unless the relationships are made explicit.`,
    correctAnswers: [
      {
        text: `Atlas should treat DNS, DHCP, AD DS, Sites and Services, and IPAM as one connected operating model rather than separate tools. DNS provides the naming layer, DHCP provides client configuration, AD DS provides identity and directory services, Sites and Services aligns the directory to the physical network, and IPAM provides central visibility into address usage and configuration state. When these pieces are designed together, Atlas gets a stable and scalable infrastructure rather than a collection of isolated services.

In practice, Atlas should use DNS records correctly: **A/AAAA** for host-to-address mapping, **CNAME** for aliases, **MX** for mail, **TXT** for policy or verification data, and **NS** for authoritative delegation. DHCP should be configured with scopes, exclusions, reservations, lease duration, and standard options such as default gateway and DNS server addresses. **DHCP failover** should be enabled so that a second server can continue leasing when the first is unavailable.

AD DS then depends on this correct naming and addressing layer. The domain controller infrastructure must have stable identity, and the site design should reflect the reality of branch office subnets and replication links. **IPAM** adds managerial oversight by helping the team track address usage and service state centrally, which is critical in a multi-site environment. The result is a system where each layer supports the one above it: name resolution supports identity, address assignment supports connectivity, sites support replication efficiency, and IPAM supports control.`,
        diagram: {
          type: 'mermaid',
          code: `flowchart TD
    A[DNS - Name Resolution] --> B[DHCP - Client Configuration]
    B --> C[AD DS - Identity and Directory]
    C --> D[Sites and Services - Replication Topology]
    D --> E[IPAM - Central Visibility and Governance]
    A --> C
    B --> D`,
        },
      },
    ],
    markingGuide: `| Component | Marks |
|---|---|
| Explains DNS as the naming layer and uses correct record types | 4 |
| Explains DHCP scopes/options/reservations/failover | 4 |
| Explains AD DS dependency on stable identity and naming | 3 |
| Explains Sites and Services for physical topology and replication | 2 |
| Explains the administrative value of IPAM/central visibility | 1 |
| **Total** | **14** |

**Examiner comment:** This is a synthesis question. Marks are earned by showing how the services depend on one another, not by describing them one by one.`,
    points: 14,
  },
];
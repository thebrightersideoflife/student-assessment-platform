// src/data/questions.js
/**
 * Questions Database
 * Organized by Module ID and Week ID
 * 
 * ITDSA Week 1: Database Concepts and Data Models
 * Assessment Criteria Coverage:
 * 1.1 - Importance of databases and data to information (Q1-5)
 * 1.2 - Historical evolution and file system problems (Q6-10)
 * 1.3 - Key components of database systems (Q11-15)
 * 1.4 - Data models and their significance (Q16-20)
 * 1.5 - Basic building blocks of data models (Q21-23)
 * 1.6 - Business rules in data modelling (Q24-25)
 */

const rawQuestions = {
  ITNSA: {
    "1": [
      // ========================================
      // Section 1.1: Importance of Databases (5 questions)
      // ========================================
      
      {
        id: "ITNSA_W1_Q1",
        type: "multiple-choice",
        text: "Which industry-standard security triad must every organization's security start with?",
        options: [
          "AAA (Authentication, Authorization, Accounting)",
          "CIA (Confidentiality, Integrity, Availability)",
          "TCP (Transmission Control Protocol)",
          "DNS (Domain Name System)"
        ],
        correctAnswers: ["CIA (Confidentiality, Integrity, Availability)"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q2",
        type: "multiple-choice",
        text: "If an attacker manages to modify a database entry without authorization, which specific pillar of the CIA triad has been violated?",
        options: [
          "Confidentiality",
          "Availability",
          "Integrity",
          "Scalability"
        ],
        correctAnswers: ["Integrity"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q3",
        type: "multiple-choice",
        text: "\"Availability\" ensures that data is accessible to authorized users. Name a modern attack specifically designed to collapse this pillar.",
        options: [
          "Phishing",
          "DDoS (Distributed Denial of Service)",
          "Port Scanning",
          "SQL Injection"
        ],
        correctAnswers: ["DDoS (Distributed Denial of Service)"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q4",
        type: "multiple-choice",
        text: "Who is ultimately responsible for maintaining network security within an organization?",
        options: [
          "The Network Administrator only",
          "The IT Department",
          "Every individual user",
          "The Security Guard"
        ],
        correctAnswers: ["Every individual user"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q5",
        type: "multiple-choice",
        text: "In the context of the CIA Triad, what does \"Confidentiality\" specifically protect against?",
        options: [
          "Unauthorized modification of data",
          "Denial of service",
          "Unauthorized access/viewing of data",
          "Hardware failure"
        ],
        correctAnswers: ["Unauthorized access/viewing of data"],
        points: 4
      },
      
      // ========================================
      // Section 1.2: Network Security Fundamentals (5 questions)
      // ========================================
      
      {
        id: "ITNSA_W1_Q6",
        type: "multiple-choice",
        text: "Why do wireless networks inherently lack the security level of wired networks?",
        options: [
          "They are slower",
          "They use radio signals which are harder to contain than physical cables",
          "They are older technology",
          "They cannot use passwords"
        ],
        correctAnswers: ["They use radio signals which are harder to contain than physical cables"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q7",
        type: "multiple-choice",
        text: "Which technology allows you to segregate network traffic to protect sensitive data from unauthorized access?",
        options: [
          "VPN",
          "VLANs",
          "WPA3",
          "DNS"
        ],
        correctAnswers: ["VLANs"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q8",
        type: "open-ended",
        text: "What is currently the strongest encryption protocol available for wireless networks?",
        correctAnswers: ["WPA3"],
        points: 4,
        validationOptions: {
          caseSensitive: false,
          tolerance: 0
        }
      },
      
      {
        id: "ITNSA_W1_Q9",
        type: "open-ended",
        text: "What does \"SSID\" stand for in a wireless context?",
        correctAnswers: ["Service Set Identifier"],
        points: 4,
        validationOptions: {
          requiredTerms: ["service", "set", "identifier"],
          caseSensitive: false,
          allowPartialMatch: false
        }
      },
      
      {
        id: "ITNSA_W1_Q10",
        type: "multiple-choice",
        text: "When using a public wireless network, which tool should be used to encrypt the data stream?",
        options: [
          "DNS",
          "DHCP",
          "VPN (Virtual Private Network)",
          "FTP"
        ],
        correctAnswers: ["VPN (Virtual Private Network)"],
        points: 4
      },
      
      // ========================================
      // Section 1.3: Hacking Fundamentals (5 questions)
      // ========================================
      
      {
        id: "ITNSA_W1_Q11",
        type: "multiple-choice",
        text: "Define \"Hacking\" in the context of network security systems.",
        options: [
          "Writing code quickly",
          "Unauthorized access to or control over systems",
          "Repairing broken computers",
          "Installing video games"
        ],
        correctAnswers: ["Unauthorized access to or control over systems"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q12",
        type: "multiple-choice",
        text: "Which type of hacker uses their skills for defensive purposes and with permission?",
        options: [
          "Black Hat",
          "Grey Hat",
          "White Hat",
          "Red Hat"
        ],
        correctAnswers: ["White Hat"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q13",
        type: "multiple-choice",
        text: "What is the very first phase of the modern hacking process?",
        options: [
          "Scanning",
          "Gaining Access",
          "Reconnaissance",
          "Clearing Tracks"
        ],
        correctAnswers: ["Reconnaissance"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q14",
        type: "multiple-choice",
        text: "How does \"Social Engineering\" differ from a technical exploit?",
        options: [
          "It targets the firewall",
          "It targets the human user (tricks the victim)",
          "It requires expensive software",
          "It only works offline"
        ],
        correctAnswers: ["It targets the human user (tricks the victim)"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q15",
        type: "multiple-choice",
        text: "Define \"Malware\" in terms of its design goal.",
        options: [
          "Software designed to speed up PCs",
          "Software designed to harm a computer system",
          "Software designed to create graphics",
          "Software designed to manage networks"
        ],
        correctAnswers: ["Software designed to harm a computer system"],
        points: 4
      },
      
      // ========================================
      // Section 1.4: Attack Techniques (5 questions)
      // ========================================
      
      {
        id: "ITNSA_W1_Q16",
        type: "multiple-choice",
        text: "What follows the Reconnaissance phase in the hacking cycle?",
        options: [
          "Gaining Access",
          "Scanning",
          "Clearing Tracks",
          "Maintaining Access"
        ],
        correctAnswers: ["Scanning"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q17",
        type: "multiple-choice",
        text: "What is a \"Zero-day attack\"?",
        options: [
          "An attack that takes zero days to execute",
          "An attack exploiting a vulnerability not yet known to the public",
          "An attack on the first day of the month",
          "An attack using 0 computers"
        ],
        correctAnswers: ["An attack exploiting a vulnerability not yet known to the public"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q18",
        type: "open-ended",
        text: "How many virtual ports (TCP and UDP) are available on every machine for a hacker to scan?",
        correctAnswers: ["65535"],
        points: 4,
        validationOptions: {
          tolerance: 0,
          caseSensitive: false
        }
      },
      
      {
        id: "ITNSA_W1_Q19",
        type: "multiple-choice",
        text: "Define \"Ransomware.\"",
        options: [
          "Free software",
          "Malware that encrypts files and demands payment",
          "Antivirus software",
          "A firewall tool"
        ],
        correctAnswers: ["Malware that encrypts files and demands payment"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q20",
        type: "multiple-choice",
        text: "What is a \"Botnet\"?",
        options: [
          "A robot network",
          "A network of infected computers controlled by a hacker",
          "A type of fishing net",
          "A secure firewall"
        ],
        correctAnswers: ["A network of infected computers controlled by a hacker"],
        points: 4
      },
      
      // ========================================
      // Section 1.5: OSI Model Fundamentals (3 questions)
      // ========================================
      
      {
        id: "ITNSA_W1_Q21",
        type: "open-ended",
        text: "What does \"OSI\" stand for in the OSI Reference Model?",
        correctAnswers: ["Open Systems Interconnection", "Open Systems Interface"],
        points: 4,
        validationOptions: {
          requiredTerms: ["open", "systems"],
          caseSensitive: false,
          allowPartialMatch: false
        }
      },
      
      {
        id: "ITNSA_W1_Q22",
        type: "open-ended",
        text: "How many layers exist in the OSI model?",
        correctAnswers: ["7", "seven"],
        points: 4,
        validationOptions: {
          tolerance: 0,
          caseSensitive: false
        }
      },
      
      {
        id: "ITNSA_W1_Q23",
        type: "multiple-choice",
        text: "Which layer of the OSI model provides services directly to the user?",
        options: [
          "Physical",
          "Network",
          "Application",
          "Session"
        ],
        correctAnswers: ["Application"],
        points: 4
      },
      
      // ========================================
      // Section 1.6: Network Protocols (2 questions)
      // ========================================
      
      {
        id: "ITNSA_W1_Q24",
        type: "multiple-choice",
        text: "TCP and UDP operate at which layer?",
        options: [
          "Network",
          "Transport",
          "Session",
          "Presentation"
        ],
        correctAnswers: ["Transport"],
        points: 4
      },
      
      {
        id: "ITNSA_W1_Q25",
        type: "open-ended",
        text: "How many bits are in an IPv4 address?",
        correctAnswers: ["32"],
        points: 4,
        validationOptions: {
          tolerance: 0,
          caseSensitive: false
        }
      }
    ],
    
    "2": [
            // ========================================
            // Part I: Hell-Level Multiple Choice (10 questions)
            // ========================================
            
            {
              id: "ITNSA_W2_Q1",
              type: "multiple-choice",
              text: "A multinational corporation requires a network topology for its internal high-frequency trading floor. The primary constraints are microsecond-latency data transfer and zero tolerance for collision-based delays. Reliability is critical, but the budget is secondary. Which topology and hardware configuration is the absolute optimal choice, and why?",
              options: [
                "Full Mesh Topology using Layer 3 Routers, because every node has a dedicated route to every other node, eliminating all collisions",
                "Star Topology using unmanaged Layer 2 switches, because the central hub effectively manages all traffic flow and reduces cabling costs compared to Mesh",
                "Full Mesh Topology using high-speed Layer 2 Switches, because it offers dedicated point-to-point links for every device pair, maximizing bandwidth and redundancy while bypassing the processing overhead of routing",
                "Ring Topology using Token Passing, because the deterministic nature of the token ensures that no collisions ever occur, guaranteeing the most stable latency"
              ],
              correctAnswers: ["Full Mesh Topology using high-speed Layer 2 Switches, because it offers dedicated point-to-point links for every device pair, maximizing bandwidth and redundancy while bypassing the processing overhead of routing"],
              points: 4
            },
            
            {
              id: "ITNSA_W2_Q2",
              type: "multiple-choice",
              text: "An attacker has successfully infiltrated a target network and is currently installing a Rootkit and creating a 'backdoor' user account with administrative privileges. According to the standard Hacking Phases, which stage is the attacker currently executing, and what is the primary objective of this specific action?",
              options: [
                "Gaining Access; the objective is to escalate privileges from a standard user to an administrator to steal data immediately",
                "Maintaining Access; the objective is to ensure persistent control over the system even if the initial vulnerability is patched or the system is rebooted",
                "Scanning & Enumeration; the objective is to map out the internal OS structure to find where to hide files",
                "Covering Tracks; the objective is to modify system logs so the administrator does not see the new user account"
              ],
              correctAnswers: ["Maintaining Access; the objective is to ensure persistent control over the system even if the initial vulnerability is patched or the system is rebooted"],
              points: 4
            },
            
            {
              id: "ITNSA_W2_Q3",
              type: "multiple-choice",
              text: "You are analyzing a subnetting scheme for a legacy Class C network (192.168.10.0). The previous administrator left a note saying the network uses a /28 subnet mask. You need to assign the last usable host address in the fourth available subnet to a critical gateway. What is that IP address?",
              options: [
                "192.168.10.62",
                "192.168.10.63",
                "192.168.10.46",
                "192.168.10.54"
              ],
              correctAnswers: ["192.168.10.62"],
              points: 4
            },
            
            {
              id: "ITNSA_W2_Q4",
              type: "multiple-choice",
              text: "A 'Hacktivist' group targets a pharmaceutical company. Unlike a 'Script Kiddie' or a 'State-Sponsored Actor,' what is the most likely combination of motivation and attack vector for this specific threat actor?",
              options: [
                "Motivation: Financial Gain; Attack Vector: Ransomware to lock patient data until a fee is paid",
                "Motivation: Ideology/Political Beliefs; Attack Vector: DDoS attacks and website defacement to disrupt operations and damage public reputation",
                "Motivation: Espionage; Attack Vector: Advanced Persistent Threat (APT) to quietly steal R&D formulas over months",
                "Motivation: Thrill/Ego; Attack Vector: Using pre-made scripts to exploit unpatched Windows servers"
              ],
              correctAnswers: ["Motivation: Ideology/Political Beliefs; Attack Vector: DDoS attacks and website defacement to disrupt operations and damage public reputation"],
              points: 4
            },
            
            {
              id: "ITNSA_W2_Q5",
              type: "multiple-choice",
              text: "Consider a network designed with a 'Bus' topology using a coaxial backbone. If a user connects a device with a malfunctioning Network Interface Card (NIC) that continuously chatters (broadcasts noise) at high voltage, what is the immediate impact on the rest of the network, and why?",
              options: [
                "Only the devices immediately adjacent to the faulty node will be affected due to signal attenuation",
                "The network will function normally, but the faulty device will be isolated by the terminators at the ends of the bus",
                "The entire network will collapse (Denial of Service) because the bus is a shared medium; the noise will be interpreted as a collision or jam signal by all other nodes",
                "The central server will detect the noise and logically disconnect the specific port associated with the bus cable"
              ],
              correctAnswers: ["The entire network will collapse (Denial of Service) because the bus is a shared medium; the noise will be interpreted as a collision or jam signal by all other nodes"],
              points: 4
            },
            
            {
              id: "ITNSA_W2_Q6",
              type: "multiple-choice",
              text: "Which of the following scenarios best describes the 'Reconnaissance' phase of an attack, specifically distinguishing Passive from Active reconnaissance?",
              options: [
                "Active: Monitoring company Wi-Fi traffic from the parking lot; Passive: Running an NMAP scan on the company firewall",
                "Active: Calling the helpdesk claiming to be a new employee (Social Engineering); Passive: Reading the company's publicly posted job listings to identify the antivirus software they use",
                "Active: Sending a phishing email to the CEO; Passive: Using Wireshark to capture packets on the local LAN",
                "Active: Attempting to login with default passwords; Passive: Changing the timestamps on modified files to hide activity"
              ],
              correctAnswers: ["Active: Calling the helpdesk claiming to be a new employee (Social Engineering); Passive: Reading the company's publicly posted job listings to identify the antivirus software they use"],
              points: 4
            },
            
            {
              id: "ITNSA_W2_Q7",
              type: "multiple-choice",
              text: "You are replacing a legacy 'Hub' in a high-traffic department with a 'Layer 2 Switch.' Regarding security and traffic flow, what is the most significant architectural change this introduces?",
              options: [
                "It moves the network from a single Broadcast Domain to multiple Broadcast Domains",
                "It eliminates the need for IP addressing on the connected workstations",
                "It moves the network from a single Collision Domain to multiple Collision Domains (one per port), preventing 'promiscuous mode' sniffing of unicast traffic between other nodes",
                "It automatically acts as a firewall, blocking all ports not explicitly opened by the administrator"
              ],
              correctAnswers: ["It moves the network from a single Collision Domain to multiple Collision Domains (one per port), preventing 'promiscuous mode' sniffing of unicast traffic between other nodes"],
              points: 4
            },
            
            {
              id: "ITNSA_W2_Q8",
              type: "multiple-choice",
              text: "An organization is migrating from IPv4 to IPv6 (Dual Stack). A junior engineer configures a firewall rule to block all ICMP traffic to improve security. Why is this a potentially catastrophic error for the IPv6 implementation?",
              options: [
                "IPv6 relies heavily on ICMPv6 for Neighbor Discovery Protocol (NDP) and Router Advertisement; blocking it will break local connectivity and address assignment",
                "IPv6 addresses are 128-bit, so they require ICMP to fragment packets that are too large for the MTU",
                "It isn't an error; blocking ICMP is a standard hardening practice for both IPv4 and IPv6 to prevent Ping of Death attacks",
                "IPv6 does not use ARP; it uses DHCPv6 exclusively, so ICMP is irrelevant"
              ],
              correctAnswers: ["IPv6 relies heavily on ICMPv6 for Neighbor Discovery Protocol (NDP) and Router Advertisement; blocking it will break local connectivity and address assignment"],
              points: 4
            },
            
            {
              id: "ITNSA_W2_Q9",
              type: "multiple-choice",
              text: "In a 'Defense in Depth' strategy, which sequence of controls correctly orders protections from the Network Perimeter inward to the Data?",
              options: [
                "Antivirus -> Firewall -> VLAN ACLs -> User Training",
                "Edge Router -> Firewall -> Internal Switch (VLAN) -> Host-based IPS -> File Permissions",
                "Switch Port Security -> Edge Router -> Firewall -> Biometric Locks",
                "File Encryption -> Firewall -> Router -> DMZ"
              ],
              correctAnswers: ["Edge Router -> Firewall -> Internal Switch (VLAN) -> Host-based IPS -> File Permissions"],
              points: 4
            },
            
            {
              id: "ITNSA_W2_Q10",
              type: "multiple-choice",
              text: "A 'Linear Daisy Chain' topology is often criticized for its lack of redundancy. However, if you convert a Linear Daisy Chain into a Ring Topology, you solve the single-point-of-failure issue only if:",
              options: [
                "The data transmission is unidirectional",
                "The Ring is configured to be bidirectional (or dual-ring), allowing data to traverse the opposite direction if a link fails",
                "You replace all cabling with fiber optics to prevent signal loss",
                "You add a central Hub to manage the token passing"
              ],
              correctAnswers: ["The Ring is configured to be bidirectional (or dual-ring), allowing data to traverse the opposite direction if a link fails"],
              points: 4
            },
            
            // ========================================
            // Part II: Hell-Level Open Ended (10 questions)
            // ========================================
            
            {
              id: "ITNSA_W2_Q11",
              type: "open-ended",
              text: "In the context of the Hacking Process, what is the specific term for the sub-phase of 'Scanning' where the attacker aggressively probes the target network to identify user accounts, shared resources, and specific software versions?",
              correctAnswers: ["Enumeration"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            {
              id: "ITNSA_W2_Q12",
              type: "open-ended",
              text: "You are examining a binary IP address: 11000000.10101000.00001010.10000000. Convert this to Dotted Decimal Notation. (Format: xxx.xxx.xxx.xxx)",
              correctAnswers: ["192.168.10.128"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            {
              id: "ITNSA_W2_Q13",
              type: "open-ended",
              text: "A Star topology relies on a central node. If this central node is a 'switch,' it uses a specific internal database to filter traffic by physical address. What is the acronym for this database?",
              correctAnswers: ["CAM", "CAM Table", "MAC Address Table"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            {
              id: "ITNSA_W2_Q14",
              type: "open-ended",
              text: "Identify the specific type of 'Social Engineering' attack where a perpetrator physically follows an authorized employee through a secure door without presenting their own credentials.",
              correctAnswers: ["Tailgating"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            {
              id: "ITNSA_W2_Q15",
              type: "open-ended",
              text: "In an IPv6 address, the '::' (double colon) notation can be used to compress the address. How many times can this double colon appear in a single IPv6 address?",
              correctAnswers: ["1", "Once", "One"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            {
              id: "ITNSA_W2_Q16",
              type: "open-ended",
              text: "Which specific network device functions at Layer 1 (Physical) of the OSI model, does not amplify signals but regenerates them bit-by-bit to extend network reach, and has no intelligence regarding data destinations?",
              correctAnswers: ["Repeater"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            {
              id: "ITNSA_W2_Q17",
              type: "open-ended",
              text: "A hacker is motivated purely by 'Ideology' rather than financial gain. They launch a coordinated attack to flood a web server with traffic, rendering it inaccessible to legitimate users. What is the specific three-letter acronym for this type of attack?",
              correctAnswers: ["DoS", "DDoS"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            {
              id: "ITNSA_W2_Q18",
              type: "open-ended",
              text: "You have a network address 10.0.0.0/14. How many usable host IP addresses does this single subnet support? (Enter the exact number)",
              correctAnswers: ["262142"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            {
              id: "ITNSA_W2_Q19",
              type: "open-ended",
              text: "In a Token Ring network, a specific packet is passed around the network to authorize transmission. If a node wants to transmit but does not possess this packet, what state must it remain in?",
              correctAnswers: ["Waiting", "Idle"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            {
              id: "ITNSA_W2_Q20",
              type: "open-ended",
              text: "What is the name of the specific protocol used by IPv4 to map a known IP address to an unknown physical (MAC) address?",
              correctAnswers: ["ARP", "Address Resolution Protocol"],
              points: 4,
              validationOptions: {
                caseSensitive: false,
                tolerance: 0
              }
            },
            
            // ========================================
            // Part III: Hell-Level Scenario Analysis (5 questions)
            // ========================================
            
            {
              id: "ITNSA_W2_Q21",
              type: "show-answer",
              text: "Scenario: The 'Invisible' Breach. An attacker performs Passive Reconnaissance on a target company for three weeks. They then use Open Source Intelligence (OSINT) to find the personal email address of the lead System Administrator. The attacker sends a carefully crafted email (Spear Phishing) containing a zero-day exploit in a PDF attachment. The Admin opens it, and the attacker gains shell access. Immediately after gaining this initial shell access, the attacker executes a script to patch the very vulnerability they just exploited. Why would an attacker patch the victim's system, and which 'Phase of Hacking' does this action support?",
              correctAnswers: [
                "The attacker patches the vulnerability to prevent other attackers from compromising the system using the same exploit, thereby maintaining exclusivity over the compromised system. This ensures they retain control and prevents rival hackers from taking over the same machine. This action falls under the 'Maintaining Access' phase of hacking, as it creates a persistent and exclusive foothold in the target system. By closing the door behind them, the attacker secures their ownership of the zombie/bot and protects their investment in the initial compromise."
              ],
              points: 10
            },
            
            {
              id: "ITNSA_W2_Q22",
              type: "show-answer",
              text: "Scenario: Topology Disaster. A startup company connects 50 computers using a Bus Topology because it is cheap and easy to install. As the company grows, they add 20 more users and start transferring large video files. The network slows to a crawl, and users report constant 'connection drops.' Diagnostically, what is the specific technical phenomenon causing the slowness, and what physical characteristic of the Bus topology makes it impossible to isolate the specific user causing the issue without physically checking cables?",
              correctAnswers: [
                "The specific technical phenomenon causing the slowness is 'Packet Collisions' (or network congestion). In a Bus Topology, all nodes share a single cable backbone as a common transmission medium. As the number of devices and bandwidth consumption increases, multiple devices attempt to transmit simultaneously on the shared medium, leading to collisions. The physical characteristic that makes isolation impossible is the 'Shared Medium' (single backbone cable). Since all devices are connected to the same physical cable, device failure or the source of excessive traffic is difficult to locate without physically testing the cable at each connection point. There is no central switch or segmentation that would allow logical isolation of problematic nodes."
              ],
              points: 10
            },
            
            {
              id: "ITNSA_W2_Q23",
              type: "show-answer",
              text: "Scenario: The Subnet Puzzle. You have been given the network block 172.16.0.0/16. You need to create subnets for 5 different departments. The largest department (Sales) requires 4000 hosts. The smallest (HR) requires 50 hosts. Using Variable Length Subnet Masking (VLSM) to preserve address space, what is the most efficient Subnet Mask (in /CIDR notation) you would assign to the Sales department, and how many wasted (unused but allocated) addresses would that leave you with (assuming exactly 4000 hosts are connected)?",
              correctAnswers: [
                "The most efficient subnet mask for the Sales department is /20 (or 255.255.240.0). Calculation: For 4000 hosts, we need 2^12 = 4096 total IP addresses (which requires 12 host bits). This means 32 - 12 = 20 network bits, giving us a /20 subnet. The /20 block provides 4096 total addresses. Subtracting 2 for the Network ID and Broadcast address leaves 4094 usable host addresses. With exactly 4000 hosts connected, this results in 4094 - 4000 = 94 wasted (unused but allocated) addresses. This is the most efficient choice because using /21 would only provide 2046 usable addresses (insufficient), while /19 would provide 8190 usable addresses (significantly more wasteful)."
              ],
              points: 10
            },
            
            {
              id: "ITNSA_W2_Q24",
              type: "show-answer",
              text: "Scenario: Security by Design. You are designing a secure network for a classified government facility. You must choose between a Star Topology and a Full Mesh Topology. Constraints: (1) If any single cable is cut, no connectivity can be lost. (2) If the central switch fails, the network must survive. (3) You must prevent 'Packet Sniffing' where a compromised node can see traffic meant for others. Which topology do you choose, and what specific additional hardware or configuration is required to meet Constraint 3 in that topology?",
              correctAnswers: [
                "The correct choice is Full Mesh Topology. This is the only topology that satisfies all three constraints: (1) Full Mesh provides multiple redundant paths, so cutting any single cable does not interrupt connectivity between other nodes. (2) There is no central switch in a Mesh topology, so Constraint 2 is inherently satisfied. However, to meet Constraint 3 (preventing packet sniffing), the physical topology alone is insufficient. The required additional security control is Link Encryption (such as IPSec or MACsec). While the Mesh topology ensures robust security and privacy through dedicated point-to-point links, encryption is necessary because a compromised router or node could still inspect unencrypted traffic it forwards. Link-layer or network-layer encryption ensures that even if a node is compromised, it cannot read the contents of packets traversing through it."
              ],
              points: 10
            },
            
            {
              id: "ITNSA_W2_Q25",
              type: "show-answer",
              text: "Scenario: The Gateway Conflict. A user manually configures their workstation with the IP 192.168.1.15 and a Subnet Mask of 255.255.255.0. They set their Default Gateway to 192.168.1.1. However, they cannot access the internet. A ping to 127.0.0.1 works. A ping to 192.168.1.1 fails. The user's physical link light is on. You discover that the Router (Gateway) has been configured with the IP 192.168.1.1 but with a Subnet Mask of 255.255.255.128. Explain exactly why the communication is failing at the packet logic level (Layer 3).",
              correctAnswers: [
                "The communication is failing due to an Inconsistent Subnet Configuration (Broadcast Domain Mismatch) at Layer 3. The user's workstation (192.168.1.15/24) believes the network ranges from 192.168.1.0 to 192.168.1.255, with a broadcast address of 192.168.1.255. However, the router (192.168.1.1/25) believes the network ranges from 192.168.1.0 to 192.168.1.127, with a broadcast address of 192.168.1.127. While both IP addresses physically overlap in the lower half of the address block, the logical boundaries are incompatible. When the workstation sends packets, many router operating systems will drop them due to Ingress Filtering or fail to process return traffic correctly because they disagree on the Broadcast Address. If the user sends a broadcast to 192.168.1.255, the router interprets this as remote traffic (outside its subnet) and drops it. This subnet mask mismatch breaks the logical boundaries of the Network Layer, preventing proper Layer 3 communication despite physical Layer 1/2 connectivity."
              ],
              points: 10
            }
          ],

      "3": [
        // ========================================
        // Section 2.1: Hacker Motivations & Targets (3 questions)
        // ========================================

        {
          id: "ITNSA_W3_Q1",
          type: "multiple-choice",
          text: "Which of the following best synthesizes the primary strategic motivation behind a cybercriminal selecting an outdated Content Management System (CMS) as their initial bridgehead, rather than directly attacking the datacenter?",
          options: [
            "The CMS inherently stores higher-value data than the datacenter.",
            "The datacenter relies on user credentials, which are only stored in the CMS.",
            "The CMS provides a vulnerable, less-guarded entry point to establish a foothold for subsequent lateral movement toward the datacenter.",
            "Social engineering is ineffective against datacenter administrators."
          ],
          correctAnswers: ["The CMS provides a vulnerable, less-guarded entry point to establish a foothold for subsequent lateral movement toward the datacenter."],
          points: 4
        },

        {
          id: "ITNSA_W3_Q2",
          type: "open-ended",
          text: "In the context of \"white-hat\" operations, what specific type of assessment involves authorized hackers attempting to exploit system vulnerabilities to improve organizational security?",
          correctAnswers: ["Penetration Testing", "Ethical Hacking", "Penetration Testing (Ethical Hacking)"],
          points: 4,
          validationOptions: {
            caseSensitive: false,
            allowPartialMatch: false
          }
        },

        {
          id: "ITNSA_W3_Q3",
          type: "show-answer",
          text: "Analyze the shift in hacker targeting strategies from traditional endpoint infection (via phishing) to web application exploitation. Why do modern hackers often favor web apps as their initial bridgehead?",
          correctAnswers: [
            "Hackers increasingly target web apps to bypass the human element (social engineering/phishing), which can be unpredictable, and to avoid the heavy security layers (SPAM filters, endpoint antivirus) typically guarding users. Web apps provide a direct, often less-shielded foothold closer to the ultimate target: the datacenter."
          ],
          points: 10
        },

        // ========================================
        // Section 2.2: Stages of the Hacking Process (4 questions)
        // ========================================

        {
          id: "ITNSA_W3_Q4",
          type: "multiple-choice",
          text: "During which specific stage of the hacking methodology would an adversary most likely employ tools like Nmap and OpenVAS in tandem to transition from passive intelligence gathering to active vulnerability identification?",
          options: [
            "Reconnaissance",
            "Scanning",
            "Enumeration",
            "Covering Tracks"
          ],
          correctAnswers: ["Scanning"],
          points: 4
        },

        {
          id: "ITNSA_W3_Q5",
          type: "open-ended",
          text: "What specific term describes the hacking phase where an attacker installs rootkits or backdoors to ensure persistent, undetected access after an initial breach?",
          correctAnswers: ["Maintaining Access"],
          points: 4,
          validationOptions: {
            requiredTerms: ["maintaining", "access"],
            caseSensitive: false,
            allowPartialMatch: false
          }
        },

        {
          id: "ITNSA_W3_Q6",
          type: "show-answer",
          text: "Evaluate the critical difference between the \"Reconnaissance\" and \"Scanning\" stages in the hacking lifecycle. How does the attacker's interaction with the target's infrastructure change between these two phases?",
          correctAnswers: [
            "Reconnaissance is largely passive, involving gathering intelligence from public records, social media, and company websites without directly engaging the target's core systems. Scanning is active; the attacker directly probes the target's network using tools to identify open ports, map network structure, and detect specific vulnerabilities, thereby actively increasing their risk of detection by security systems."
          ],
          points: 10
        },

        {
          id: "ITNSA_W3_Q7",
          type: "multiple-choice",
          text: "If an ethical hacker is altering system logs and modifying file timestamps to simulate a stealthy adversary, which stage of the hacking process are they currently executing?",
          options: [
            "Privilege Escalation",
            "Enumeration",
            "Covering Tracks",
            "Maintaining Access"
          ],
          correctAnswers: ["Covering Tracks"],
          points: 4
        },

        // ========================================
        // Section 2.3: IT Infrastructure Threats (4 questions)
        // ========================================

        {
          id: "ITNSA_W3_Q8",
          type: "multiple-choice",
          text: "An intrusion prevention system (IPS) detects an anomaly where a compromised endpoint is attempting to communicate with an external server to download additional malware payloads and receive execution instructions. What specific threat infrastructure is the IPS attempting to block?",
          options: [
            "A Command-and-Control (C2) channel",
            "A Distributed Hash Table (DHT)",
            "An ARP poisoning broadcast",
            "A legitimate BGP routing update"
          ],
          correctAnswers: ["A Command-and-Control (C2) channel"],
          points: 4
        },

        {
          id: "ITNSA_W3_Q9",
          type: "open-ended",
          text: "What specific category of malware is primarily used by adversaries to extort businesses by encrypting critical data after exploiting Remote Desktop Protocol (RDP) vulnerabilities?",
          correctAnswers: ["Ransomware"],
          points: 4,
          validationOptions: {
            caseSensitive: false,
            allowPartialMatch: false
          }
        },

        {
          id: "ITNSA_W3_Q10",
          type: "show-answer",
          text: "In the context of network availability, analyze how a resource depletion attack specifically compromises a Wireless Sensor Network (WSN). Why are these specific networks highly susceptible to this threat compared to traditional enterprise LANs?",
          correctAnswers: [
            "A resource depletion attack aims to exhaust the limited battery life, bandwidth, and computing memory of sensor nodes, leading to a permanent node outage. WSNs are highly susceptible because their nodes inherently possess limited energy, processing power, and storage, lacking the robust, continuous power and high-capacity infrastructure of traditional enterprise LANs."
          ],
          points: 10
        },

        {
          id: "ITNSA_W3_Q11",
          type: "multiple-choice",
          text: "Which of the following malware threats is characterized by its ability to silently observe network traffic, capture clear-text passwords, and facilitate active eavesdropping without altering the transmitted data?",
          options: [
            "Ransomware",
            "Packet Sniffer",
            "Fileless Malware",
            "Polymorphic Virus"
          ],
          correctAnswers: ["Packet Sniffer"],
          points: 4
        },

        // ========================================
        // Section 2.4: Types of Attacks (4 questions)
        // ========================================

        {
          id: "ITNSA_W3_Q12",
          type: "multiple-choice",
          text: "An attacker executes an active session hijacking exploit by injecting malicious scripts into a web page, bypassing the need to passively sniff the network. Which specific vulnerability is the attacker exploiting to steal the session ID?",
          options: [
            "ARP Spoofing",
            "Cross-Site Scripting (XSS)",
            "SQL Injection",
            "Session Fixation"
          ],
          correctAnswers: ["Cross-Site Scripting (XSS)"],
          points: 4
        },

        {
          id: "ITNSA_W3_Q13",
          type: "open-ended",
          text: "In a Distributed Denial of Service (DDoS) attack, what term refers to the network of compromised computers coordinated by the attacker to flood the target with traffic?",
          correctAnswers: ["Botnet"],
          points: 4,
          validationOptions: {
            caseSensitive: false,
            allowPartialMatch: false
          }
        },

        {
          id: "ITNSA_W3_Q14",
          type: "show-answer",
          text: "Contrast a Man-in-the-Middle (MitM) attack with a standard passive eavesdropping attack. How does the attacker's capability and level of interaction with the data differ between the two?",
          correctAnswers: [
            "In passive eavesdropping, the attacker merely intercepts and monitors data in transit to steal sensitive information without altering it. In a MitM attack, the attacker acts actively by inserting themselves between two communicating parties, not only intercepting the traffic but possessing the capability to alter, modify, or inject malicious data into the communication stream before passing it along."
          ],
          points: 10
        },

        {
          id: "ITNSA_W3_Q15",
          type: "multiple-choice",
          text: "A threat actor floods a Cisco IOS router with an overwhelming number of EIGRP neighbor announcements, causing the router's CPU to max out and drop legitimate routing updates. Which category of attack does this best represent?",
          options: [
            "Protocol-based Denial of Service (DoS) attack",
            "Distributed Denial of Service (DDoS) Reflected attack",
            "Man-in-the-Middle Routing Hijack",
            "Peer-to-Peer Smurf Attack"
          ],
          correctAnswers: ["Protocol-based Denial of Service (DoS) attack"],
          points: 4
        },

        // ========================================
        // Section 2.5: Defense in Depth & Scalability (4 questions)
        // ========================================

        {
          id: "ITNSA_W3_Q16",
          type: "multiple-choice",
          text: "When designing a highly scalable and resilient enterprise network, an architect implements BGP for external WAN routing and OSPF for internal LAN routing, alongside redundant multilayer switches. How does this routing protocol selection directly support defense in depth and scalability?",
          options: [
            "BGP prevents internal DDoS attacks, while OSPF encrypts LAN traffic.",
            "BGP manages complex, redundant internet connections (Autonomous Systems), while OSPF dynamically calculates the shortest internal paths and only sends updates when network changes occur, minimizing overhead.",
            "BGP acts as a stateful firewall, and OSPF operates at the Physical layer to prevent MAC spoofing.",
            "BGP dynamically assigns IPv6 addresses, while OSPF performs NAT."
          ],
          correctAnswers: ["BGP manages complex, redundant internet connections (Autonomous Systems), while OSPF dynamically calculates the shortest internal paths and only sends updates when network changes occur, minimizing overhead."],
          points: 4
        },

        {
          id: "ITNSA_W3_Q17",
          type: "open-ended",
          text: "What architectural principle relies on employing multiple, overlapping layers of security controls so that if one layer fails, others continue to protect the network?",
          correctAnswers: ["Defense in Depth"],
          points: 4,
          validationOptions: {
            requiredTerms: ["defense", "depth"],
            caseSensitive: false,
            allowPartialMatch: false
          }
        },

        {
          id: "ITNSA_W3_Q18",
          type: "show-answer",
          text: "Analyze the role of subnetting and VLANs in a defense-in-depth network architecture. How do these segmentation techniques limit the blast radius of a successful internal breach?",
          correctAnswers: [
            "Subnetting divides a larger network into isolated, smaller logical segments. By routing traffic between these segments through firewalls or multilayer switches with access controls, administrators can enforce strict communication rules. If an attacker breaches one subnet, their lateral movement is restricted, containing the 'blast radius' to that specific segment rather than exposing the entire enterprise."
          ],
          points: 10
        },

        {
          id: "ITNSA_W3_Q19",
          type: "multiple-choice",
          text: "In evaluating network topologies for a scalable core infrastructure, why is a fully meshed topology generally restricted to WAN backbones rather than deployed across enterprise LAN endpoints?",
          options: [
            "Fully meshed topologies require token ring protocols, which are obsolete.",
            "The required number of physical connections grows exponentially, making it financially and physically unscalable for numerous LAN endpoints.",
            "Mesh topologies cannot support IPv6 addressing.",
            "Switches in a mesh topology cannot process MAC addresses effectively."
          ],
          correctAnswers: ["The required number of physical connections grows exponentially, making it financially and physically unscalable for numerous LAN endpoints."],
          points: 4
        },

        // ========================================
        // Section 2.6: Risk Assessment & Management (4 questions)
        // ========================================

        {
          id: "ITNSA_W3_Q20",
          type: "multiple-choice",
          text: "An organization identifies a critical risk where an unpatched web server could be exploited via SQL injection. The cost of upgrading the legacy application is prohibitively high, so management decides to purchase cyber insurance to cover potential fines and settlement costs in the event of a breach. Which risk treatment strategy did the organization employ?",
          options: [
            "Avoid",
            "Mitigate",
            "Transfer",
            "Accept"
          ],
          correctAnswers: ["Transfer"],
          points: 4
        },

        {
          id: "ITNSA_W3_Q21",
          type: "open-ended",
          text: "In the risk analysis phase, what term describes the probability that a specific threat is capable of exploiting a given vulnerability?",
          correctAnswers: ["Likelihood"],
          points: 4,
          validationOptions: {
            caseSensitive: false,
            allowPartialMatch: false
          }
        },

        {
          id: "ITNSA_W3_Q22",
          type: "show-answer",
          text: "During a cybersecurity risk assessment, why is it critical to explicitly define the \"scope\" of the assessment before identifying threats and vulnerabilities? What are the consequences of a poorly defined scope?",
          correctAnswers: [
            "Defining the scope determines exactly which business units, locations, or specific assets are being evaluated, requiring stakeholder support to prioritize critical elements. A poorly defined scope can lead to an unmanageable assessment, wasted resources on low-priority systems, and the failure to identify critical vulnerabilities in the organization's most essential processes."
          ],
          points: 10
        },

        {
          id: "ITNSA_W3_Q23",
          type: "multiple-choice",
          text: "When determining the potential impact of a risk scenario (e.g., customer data theft), which of the following represents an intangible cost that is notoriously difficult to transfer via third-party cyber insurance?",
          options: [
            "Regulatory fines",
            "Legal settlement funding",
            "Damage to brand reputation",
            "Hardware replacement costs"
          ],
          correctAnswers: ["Damage to brand reputation"],
          points: 4
        },

        // ========================================
        // Section 2.7: Firewall Selection (2 questions)
        // ========================================

        {
          id: "ITNSA_W3_Q24",
          type: "multiple-choice",
          text: "A financial institution requires a firewall solution that goes beyond analyzing standard port numbers and IP addresses. They need to analyze actual packet content, perform TCP handshake checks, and actively detect advanced malware threats. Which type of firewall is strictly required for this specific use case?",
          options: [
            "Packet filtering firewall",
            "Stateful inspection firewall",
            "Next-generation firewall",
            "Passive Intrusion Detection System (IDS)"
          ],
          correctAnswers: ["Next-generation firewall"],
          points: 4
        },

        {
          id: "ITNSA_W3_Q25",
          type: "show-answer",
          text: "Compare and contrast a \"packet filtering\" firewall with a \"stateful inspection\" firewall. Why would a network administrator choose stateful inspection over packet filtering for securing a dynamic internal corporate network?",
          correctAnswers: [
            "A packet filtering firewall operates as a basic checkpoint at the network layer, analyzing individual packets strictly based on static rules like IP address, port number, or protocol. A stateful inspection firewall is more advanced; it operates at both the network and transport layers, actively inspecting the source IP, destination IP, source port, and destination port. Administrators prefer stateful inspection because it dynamically understands the context of traffic flows, offering significantly higher defenses than static packet filtering."
          ],
          points: 10
        }
      ],
      "4":[],
      "5":[],
      "6":[],
      "7":[],
  },
  
    ITDSA: {
        "1": [
      // ========================================
      // Part 1: Importance & The Data-Information Transition (4 questions)
      // ========================================
      
      // IMAGE NEEDED: Diagram showing "Data vs Information" transformation
      // - Left side: Raw data (numbers, unorganized facts)
      // - Middle: DBMS processing (indexing, query engine)
      // - Right side: Meaningful information (reports, insights)
      {
        id: "ITDSA_W1_Q1",
        type: "multiple-choice",
        text: "If a database stores 50 terabytes of accurate, processed sales records, but the DBMS lacks an indexing structure or a query engine to retrieve it efficiently, what does this repository constitute?",
        options: [
          "Information",
          "Raw Data",
          "Knowledge",
          "Business Intelligence"
        ],
        correctAnswers: ["Raw Data"],
        points: 4,
        image: {
          src: "/images/ITDSA_W1_Q1.png",
          alt: "Data vs Information transformation diagram showing DBMS processing",
          caption: "Figure: The transformation from raw data to meaningful information"
        }
      },
      
      // IMAGE NEEDED: Figure 1.4 - Database Structure diagram
      // - Show DBMS in center
      // - Metadata repository (structure definition) on one side
      // - End-user data (Customers, Invoices, Products) on other side
      // - Arrows showing interaction between components
      {
        id: "ITDSA_W1_Q2",
        type: "multiple-choice",
        text: "Refer to the \"Database Structure\" in Figure 1.4. If the Metadata repository (the description of the structure) becomes corrupted while the End-user data (Customers, Invoices) remains intact, what is the status of the database?",
        options: [
          "Fully Recoverable via SQL",
          "Unrecoverable / Meaningless",
          "Partially accessible via the File System",
          "Unaffected"
        ],
        correctAnswers: ["Unrecoverable / Meaningless"],
        points: 4,
        image: {
          src: "/images/ITDSA_W1_Q2.png",
          alt: "Database Structure diagram showing DBMS, Metadata, and End-user data components",
          caption: "Figure 1.4: Database Structure and Component Interaction"
        }
      },
      
      // IMAGE NEEDED: Screenshot of a Data Dictionary / Metadata entry
      // - Show table: "Product"
      // - Column: "Status" (Integer)
      // - Values: 1 = "Active", 2 = "Pending", 99 = "Discontinued"
      // - Highlight the metadata description explaining what 99 means
      {
        id: "ITDSA_W1_Q3",
        type: "open-ended",
        text: "You find a column named Status with values 1, 2, and 99. To determine that 99 actually means \"Discontinued,\" which specific database component must a Database Analyst consult?",
        correctAnswers: ["Metadata", "Data Dictionary", "Metadata / Data Dictionary"],
        points: 4,
        validationOptions: {
          requiredTerms: ["metadata"],
          caseSensitive: false,
          allowPartialMatch: false
        },
        image: {
          src: "/images/ITDSA_W1_Q3.png",
          alt: "Data Dictionary showing Status column metadata definitions",
          caption: "Example: Product table metadata showing Status code meanings"
        }
      },
      
      // IMAGE NEEDED: High-frequency trading scenario diagram
      // - Show raw trade log entries (timestamps, prices, symbols without context)
      // - Metadata layer showing definitions (timestamp format, currency codes, transaction types)
      // - DBMS transforming raw data into meaningful trading information
      // - Compare with file system (just storing bytes without interpretation)
      {
        id: "ITDSA_W1_Q4",
        type: "show-answer",
        text: "Scenario: In a high-frequency trading application, raw trade logs (End-User Data) are useless without immediate context. Construct a scenario where metadata becomes the primary driver of value, and explain how a DBMS manages this transition from \"raw facts\" to \"meaningful information\" differently than a file system would.",
        correctAnswers: [
          "In a high-frequency trading scenario, the End-User Data (the raw trade logs) is meaningless without the Metadata (the description of the data structure, such as timestamp formats, currency codes, and transaction types). The DBMS is the critical engine that manages the interaction between this \"End-user data\" and the \"Database structure\" (metadata). A file system would merely store the bytes; the DBMS uses the metadata to interpret those bytes, transforming raw data into a \"Single Integrated View\" that provides meaningful information."
        ],
        points: 10,
        image: {
          src: "/images/ITDSA_W1_Q4.png",
          alt: "High-frequency trading data flow showing metadata's role in context provision",
          caption: "Figure: How DBMS uses metadata to transform raw trade logs into actionable information"
        }
      },
      
      // ========================================
      // Part 2: Historical Evolution & File Systems (4 questions)
      // ========================================
      
      // IMAGE NEEDED: Comparison diagram of File System vs DBMS security
      // - File System: Multiple scattered files with individual permissions
      // - DBMS: Centralized security policy with single integrated view
      // - Show security officer trying to manage both
      {
        id: "ITDSA_W1_Q5",
        type: "multiple-choice",
        text: "Why would a Database Security Officer find it nearly impossible to implement a unified security policy (e.g., \"Only managers can view credit limits\") in a traditional File System environment?",
        options: [
          "File systems do not support passwords",
          "Data is scattered across multiple locations/files",
          "File systems cannot store metadata",
          "File systems rely on the internet"
        ],
        correctAnswers: ["Data is scattered across multiple locations/files"],
        points: 4,        
      },

      {
        id: "ITDSA_W1_Q6",
        type: "open-ended",
        text: "In a manual file system, if a client's phone number is updated in the \"Invoices\" file but not the \"Shipping\" file, what specific type of anomaly has occurred?",
        correctAnswers: ["Update Anomaly", "Update anomaly", "update anomaly"],
        points: 4,
        validationOptions: {
          requiredTerms: ["update", "anomaly"],
          caseSensitive: false,
          allowPartialMatch: false
        },
      },
      
      // No image needed - conceptual question about volume/speed
      {
        id: "ITDSA_W1_Q7",
        type: "open-ended",
        text: "Consider the YouTube case study. Beyond just \"organization,\" what specific factor makes a manual file system (filing cabinets) impossible for YouTube?",
        correctAnswers: ["Volume", "Access Speed", "Retrieval Time", "Concurrency"],
        points: 4,
        validationOptions: {
          caseSensitive: false,
          allowPartialMatch: false
        }
      },
      
      {
        id: "ITDSA_W1_Q8",
        type: "show-answer",
        text: "Scenario: Imagine a legacy COBOL file system where 50 distinct application programs access a Customer file. If a developer decides to add a single field, Email_Address, to the Customer file structure, explain the catastrophic maintenance effect this would have on the 50 programs. How does this illustrate Structural Dependence?",
        correctAnswers: [
          "This illustrates Structural Dependence. In a file system (manual or computerized), the data structure is often hard-coded into the application programs. Adding Email_Address would require rewriting and recompiling all 50 programs to recognize the new file layout. A DBMS solves this by separating the \"Application request\" from the \"End-user data\" via the DBMS engine, allowing the \"Database structure\" to change without breaking the external applications."
        ],
        points: 10,
      },
      
      {
        id: "ITDSA_W1_Q9",
        type: "multiple-choice",
        text: "If an end-user bypasses the DBMS software and attempts to access the \"Invoices\" file directly from the operating system, what specific DBMS function is being circumvented?",
        options: [
          "Data Storage",
          "Security & Integration",
          "Network Connectivity",
          "Data Generation"
        ],
        correctAnswers: ["Security & Integration"],
        points: 4,
      },

      {
        id: "ITDSA_W1_Q10",
        type: "open-ended",
        text: "In Figure 1.4, physical data might be sharded across multiple hard drives. What specific software component hides this complexity to create the \"Single Integrated View\"?",
        correctAnswers: ["DBMS", "Database Management System", "The DBMS"],
        points: 4,
        validationOptions: {
          requiredTerms: ["dbms"],
          caseSensitive: false,
          allowPartialMatch: false
        },
        image: {
          src: "/images/ITDSA_W1_Q2.png",
          alt: "DBMS providing Single Integrated View despite physical data distribution",
          caption: "Figure 1.4: DBMS abstracting physical data complexity into a single view"
        }
      },
      
      // No image needed - role-based question
      {
        id: "ITDSA_W1_Q11",
        type: "open-ended",
        text: "A query runs out of control and crashes the server because no resource limits were set. According to the \"Sample Skills Required,\" which role is responsible for maintaining the DBMS environment to prevent this?",
        correctAnswers: ["Database Administrator", "DBA", "Database Administrator (DBA)"],
        points: 4,
        validationOptions: {
          requiredTerms: ["database", "administrator"],
          caseSensitive: false,
          allowPartialMatch: false
        }
      },
      
      {
        id: "ITDSA_W1_Q12",
        type: "show-answer",
        text: "Refer to the Cloud Computing Data Architect role. How does the \"infrastructure for next-generation cloud database systems\" differ from the traditional architecture in Figure 1.4? Specifically, does the \"Database Structure\" remain centralized?",
        correctAnswers: [
          "The Cloud Computing Data Architect designs \"infrastructure for next-generation cloud database systems\". Unlike the traditional centralized view in Figure 1.4, a cloud architecture distributes the \"Database Structure\" across the \"Internet technologies\" and \"Cloud storage technologies.\" The \"Integrated View\" becomes a logical construct spanning potentially global infrastructure, requiring distinct skills in \"distributed systems\" and \"performance tuning\"."
        ],
        points: 10,
        image: {
          src: "/images/ITDSA_W1_Q2.png",
          alt: "Comparison of traditional centralized vs cloud distributed database architecture",
          caption: "Figure: Traditional Architecture vs Cloud Database Infrastructure"
        }
      },
      
      {
        id: "ITDSA_W1_Q13",
        type: "multiple-choice",
        text: "If a data model lists all the necessary tables (Entities) but fails to define the relationships (lines) between them, is it considered a valid Data Model for design purposes?",
        options: [
          "Yes",
          "No"
        ],
        correctAnswers: ["No"],
        points: 4,
      },

      {
        id: "ITDSA_W1_Q14",
        type: "multiple-choice",
        text: "Look at the ERD on Page 12 (Entities like MODULE and ASSESSMENT). What type of data model is this?",
        options: [
          "Conceptual",
          "Logical",
          "Physical",
          "External"
        ],
        correctAnswers: ["Logical"],
        points: 4,
        image: {
          src: "/images/ITDSA_W1_Q14.png",
          alt: "Logical ERD showing MODULE, ASSESSMENT, STUDENT, and CAMPUS entities",
          caption: "Page 12: Logical Data Model with entities, attributes, and relationships"
        }
      },
      
      // IMAGE NEEDED: Figure 1.4 Application Request flow
      // - Show flow: User → Application Request → DBMS Engine → Database
      // - Highlight where duplicate student ID gets rejected (at DBMS Engine/Application Request)
      {
        id: "ITDSA_W1_Q15",
        type: "open-ended",
        text: "A \"Bad Design\" allows a duplicate student ID. In the Figure 1.4 flow, at which specific step does the system reject the duplicate entry?",
        correctAnswers: ["Application Request", "DBMS Engine", "Application Request / DBMS Engine"],
        points: 4,
        validationOptions: {
          caseSensitive: false,
          allowPartialMatch: false
        },
        image: {
          src: "/images/ITDSA_W1_Q2.png",
          alt: "Application request flow showing where duplicate entries are rejected",
          caption: "Figure 1.4: Duplicate detection at the Application Request/DBMS Engine layer"
        }
      },
      
      // No image needed - role-based question
      {
        id: "ITDSA_W1_Q16",
        type: "open-ended",
        text: "Who is responsible for the \"Physical\" implementation of the database environment (hardware, tablespaces)?",
        correctAnswers: ["Database Architect", "Architect"],
        points: 4,
        validationOptions: {
          requiredTerms: ["architect"],
          caseSensitive: false,
          allowPartialMatch: false
        }
      },
      
      // ========================================
      // Part 5: Building Blocks of Data Models (5 questions)
      // ========================================
      
      // IMAGE NEEDED: MODULE to ASSESSMENT relationship in Crow's Foot notation
      // - MODULE entity (1..1 on MODULE side)
      // - Relationship line with cardinality markers
      // - ASSESSMENT entity (0..* on ASSESSMENT side)
      // - Highlight that 0 assessments is allowed (optional relationship)
      {
        id: "ITDSA_W1_Q17",
        type: "multiple-choice",
        text: "Refer to the relationship: MODULE (1..1) --------- (0..*) ASSESSMENT. Scenario: A new module is approved but has no assessments created yet. Does the data model allow this?",
        options: [
          "Yes",
          "No"
        ],
        correctAnswers: ["Yes"],
        points: 4,
        image: {
          src: "/images/ITDSA_W1_Q14.png",
          alt: "MODULE to ASSESSMENT relationship showing 1..1 to 0..* cardinality",
          caption: "Figure: Crow's Foot notation showing MODULE can exist with zero assessments"
        }
      },
      
      // IMAGE NEEDED: Supertype/Subtype hierarchy from Page 12
      // - MODULE (supertype) with moduleName, moduleCode attributes
      // - Triangle/arrow pointing down to subtypes
      // - CERTIFICATE (subtype) with numOfMonths
      // - DEGREE_MODULE (subtype) with numOfYears
      // - Highlight that shared attributes (moduleName) live in MODULE
      {
        id: "ITDSA_W1_Q18",
        type: "multiple-choice",
        text: "In the Supertype/Subtype hierarchy (Page 12), if a query requests the moduleName of a CERTIFICATE, where does the DBMS look for this attribute?",
        options: [
          "The CERTIFICATE table",
          "The MODULE table",
          "Both tables simultaneously",
          "The Metadata only"
        ],
        correctAnswers: ["The MODULE table"],
        points: 4,
        image: {
          src: "/images/ITDSA_W1_Q14.png",
          alt: "Supertype/Subtype hierarchy showing MODULE, CERTIFICATE, and DEGREE_MODULE",
          caption: "Page 12: Inheritance hierarchy - shared attributes stored in supertype (MODULE)"
        }
      },
      
      {
        id: "ITDSA_W1_Q19",
        type: "multiple-choice",
        text: "For a Database Analyst to efficiently query \"All students living in Pretoria,\" how should the Address attribute be modeled?",
        options: [
          "As a single string (Composite)",
          "As separate attributes: Street, City, Zip (Simple/Atomic)",
          "As a derived attribute",
          "As a foreign key"
        ],
        correctAnswers: ["As separate attributes: Street, City, Zip (Simple/Atomic)"],
        points: 4,
      },
      
      // IMAGE NEEDED: Relationship transformation diagram
      // - Current: STUDENT (1..1) -------- (1..1) CAMPUS
      // - Arrow showing transformation
      // - New: STUDENT (*) -------- (*) CAMPUS with intersection table ENROLLMENT
      // - Label as "Many-to-Many relationship with associative entity"
      {
        id: "ITDSA_W1_Q20",
        type: "open-ended",
        text: "The current model shows STUDENT linked to CAMPUS with a 1..1 relationship. To allow a student to study at multiple campuses simultaneously, what specific relationship type must replace this?",
        correctAnswers: ["Many-to-Many", "Many to Many", "*:*", "M:N"],
        points: 4,
        validationOptions: {
          requiredTerms: ["many"],
          caseSensitive: false,
          allowPartialMatch: false
        },
        image: {
          src: "/images/ITDSA_W1_Q14.png",
          alt: "Transformation from one-to-one to many-to-many relationship",
          caption: "Figure: Converting 1..1 relationship to Many-to-Many for multi-campus support"
        }
      },
      
      {
        id: "ITDSA_W1_Q21",
        type: "show-answer",
        text: "Scenario: You are modeling \"WhatsApp.\" A User is a member of a Group, but a User also has a list of Contacts (who are also Users). Draw or describe how you would model the Contact List relationship using the building blocks from Page 12.",
        correctAnswers: [
          "This requires a Self-Referencing Relationship on the User entity. In the context of the \"Group Activity\" (WhatsApp), a User is related to other Users (Contacts). This would be drawn as a line looping from the User entity back to itself. This is distinct from the User-Group relationship, which is a standard one-to-many or many-to-many."
        ],
        points: 10,
      },
      
      // ========================================
      // Part 6: Business Rules & Data Modelling (4 questions)
      // ========================================
      
      // No image needed - conceptual ERD vs Process logic question
      {
        id: "ITDSA_W1_Q22",
        type: "multiple-choice",
        text: "A business rule states: \"A student cannot register if their current study duration exceeds the numOfMonths defined in the Certificate.\" Is this rule enforced by the Structure (ERD) or by the Process (Application Logic)?",
        options: [
          "Structure (ERD)",
          "Process (Application Logic)"
        ],
        correctAnswers: ["Process (Application Logic)"],
        points: 4
      },
      
      {
        id: "ITDSA_W1_Q23",
        type: "open-ended",
        text: "\"The sum of assessment percentages must equal 100%.\" Since the ERD diagram cannot enforce this calculation, where in the DBMS system does this logic live?",
        correctAnswers: ["Check Constraint", "Application Logic", "DBMS Engine", "Check Constraint / Application Logic"],
        points: 4,
        validationOptions: {
          caseSensitive: false,
          allowPartialMatch: false
        },
        image: {
          src: "/images/ITDSA_W1_Q14.png",
          alt: "ASSESSMENT entity showing check constraint for percentage sum validation",
          caption: "Figure: Check Constraint enforcing business rule (testPerc + projectPerc + examPerc = 100)"
        }
      },
      
      {
        id: "ITDSA_W1_Q24",
        type: "show-answer",
        text: "For the YouTube activity, define the Business Rules governing a \"Comment\". Specifically, how do you model the rule: \"A Comment can be a reply to another Comment\"?",
        correctAnswers: [
          "To model Rule C (Reply to Comment), you need a Recursive Relationship on the COMMENT entity. Impact: The COMMENT entity will have a foreign key (e.g., Parent_Comment_ID) that references its own Primary Key (Comment_ID). This changes the \"Building Block\" by adding a self-looping relationship line to the entity."
        ],
        points: 10,
      },
      
      {
        id: "ITDSA_W1_Q25",
        type: "show-answer",
        text: "Look at the Invoice example. Reverse engineer three explicit Business Rules that must be true for this invoice to exist, based on the data visible.",
        correctAnswers: [
          "Based on the Invoice image: Rule 1: An Invoice is issued to exactly one Client (Mr. J Moncho). Rule 2: An Invoice must have at least one Line Item (it lists Oil Filter, Wiper, Service). Rule 3: An Invoice is issued by exactly one Branch (Bellville)."
        ],
        points: 10,
        image: {
          src: "/images/ITDSA_W1_Q25.png",
          alt: "Sample invoice showing client, branch, and line items with business rules",
          caption: "Invoice Example: Visual representation of three core business rules"
        }
      }
    ],
        
        // ITDSA Week 2: Relational Model, ER Modeling, and Normalization
              /**
               * Assessment Criteria Coverage:
               * 1.4 - Data models and their significance (Q1-3)
               * 1.5 - Basic building blocks of data models (Q4-5)
               * 1.6 - Business rules in data modelling (Q6-7)
               * 2.1 - Logical view of data and keys (Q8-10)
               * 2.2 - Integrity rules (Q11-13)
               * 2.3 - Relational algebra (Q14-16)
               * 2.4 - Entity-relationship model (Q17-19)
               * 2.5 - ER diagram development (Q20-21)
               * 2.6 - Extended ER model (Q22-23)
               * 2.7 - Entity clustering and normalization (Q24-25)
               */

              "2": [
                // ========================================
                // Part 1: Data Models and Significance (3 questions)
                // Criteria 1.4, 1.5
                // ========================================
                
                {
                  id: "ITDSA_W2_Q1",
                  type: "multiple-choice",
                  text: "Which building block of a data model is specifically designed to enforce business rules and ensure data consistency within the database environment?",
                  options: [
                    "Entity",
                    "Attribute",
                    "Relationship",
                    "Constraint"
                  ],
                  correctAnswers: ["Constraint"],
                  points: 4
                },
                
                {
                  id: "ITDSA_W2_Q2",
                  type: "open-ended",
                  text: "What is the term for the process of hiding database complexity to provide a simplified view for different users?",
                  correctAnswers: ["Data Abstraction", "Abstraction"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["abstraction"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                },
                
                // IMAGE NEEDED: Diagram showing semantic gap between conceptual, logical, and physical models
                // - Three layers: Conceptual (top) → Logical (middle) → Physical (bottom)
                // - Arrows showing increasing detail and decreasing abstraction
                // - Highlight "Semantic Gap" between conceptual and physical
                // - Include ACID properties box near physical layer
                {
                  id: "ITDSA_W2_Q3",
                  type: "show-answer",
                  text: "Evaluate the \"Semantic Gap\" between a Conceptual Model and a Physical Model. If a business requires real-time ACID compliance for a high-frequency trading system, discuss why a traditional Relational Model might be favored over a Graph Data Model despite the Graph Model's superior ability to represent complex relationships.",
                  correctAnswers: [
                    "The Semantic Gap is the disconnect between the real-world complexity and the simplified mathematical representation in a database. In high-frequency trading, Relational Models are favored over Graph Models because of their mature implementation of ACID (Atomicity, Consistency, Isolation, Durability). Relational databases use Pessimistic Locking, ensuring that a transaction is fully committed before another begins. Graph models often utilize BASE (Basically Available, Soft state, Eventual consistency), which is faster for relationships but risks double-spending or data desynchronization in a financial environment."
                  ],
                  points: 10,
                  image: {
                    src: "/images/ITDSA_W2_Q3.png",
                    alt: "Semantic gap between conceptual and physical data models with ACID vs BASE comparison",
                    caption: "Figure: Semantic gap and model selection for ACID-compliant systems"
                  }
                },
                
                // ========================================
                // Part 2: Building Blocks and Business Rules (4 questions)
                // Criteria 1.5, 1.6
                // ========================================
                
                {
                  id: "ITDSA_W2_Q4",
                  type: "open-ended",
                  text: "What is the brief, precise, and unambiguous description of a policy, procedure, or principle within a specific organization?",
                  correctAnswers: ["Business Rule"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["business", "rule"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                },
                
                // IMAGE NEEDED: Hospital ERD showing doctor-patient relationships
                // - DOCTOR entity
                // - PATIENT entity with Primary_Doctor_ID (FK)
                // - 1:M relationship line (one doctor, many patients)
                // - Separate SURGICAL_TEAM associative entity
                // - M:N relationship between DOCTOR, PATIENT, SURGERY through SURGICAL_TEAM
                // - Highlight that this avoids circular dependencies
                {
                  id: "ITDSA_W2_Q5",
                  type: "show-answer",
                  text: "You are tasked with modeling a system for a hospital where \"A doctor can treat many patients, but a patient can be assigned to only one primary doctor. However, for specific surgeries, a patient may have a 'surgical team' consisting of multiple doctors.\" How do you translate these conflicting business rules into a single ERD without creating circular dependencies or violating 3NF?",
                  correctAnswers: [
                    "To resolve this, you must model two distinct paths: 1) A 1:M relationship between DOCTOR and PATIENT (where the FK Primary_Doctor_ID is in the PATIENT table). 2) An Associative Entity (e.g., SURGICAL_TEAM) that links DOCTOR, PATIENT, and SURGERY. By separating the administrative primary doctor from the operational surgical team, you maintain 3NF and avoid a circular relationship where a patient belongs to a doctor and a doctor belongs to a patient simultaneously."
                  ],
                  points: 10,
                  image: {
                    src: "/images/ITDSA_W2_Q5.png",
                    alt: "Hospital ERD showing primary doctor relationship and surgical team associative entity",
                    caption: "Figure: Resolving conflicting business rules using associative entity pattern"
                  }
                },
                
                // IMAGE NEEDED: Graph model diagram (similar to Figure 1 from provided content)
                // - Circular nodes representing entities (Agent, Customer, Order, Product)
                // - Properties shown as attributes linked to nodes
                // - Directed edges showing relationships (Places, Buys, Involved_in)
                // - Highlight geometric shapes used (circles for nodes)
                {
                id: "ITDSA_W2_Q6",
                type: "open-ended",
                text: "According to the description of the Graph Model, what geometric shape is used to represent an entity instance (such as an agent), and what do the \"properties\" linked to that shape represent?",
                correctAnswers: [
                  "Circle",
                  "Node",
                  "Circle Node",
                  "Circle, Node",
                  "Node Circle",
                  "A circle (node); properties represent the data/attributes stored about that node"
                ],
                points: 4,
                validationOptions: {
                  requiredTerms: ["circle", "node"],
                  caseSensitive: false,
                  allowPartialMatch: true
                },
                image: {
                  src: "/images/ITDSA_W2_Q6.png",
                  alt: "Graph model showing circular nodes with properties representing entities and attributes",
                  caption: "Figure 1: Graph Data Model with nodes (circles) and properties"
                }
              },
                
                // IMAGE NEEDED: Relational table structure diagram (similar to Figure 3.1)
                // - Table with columns showing: Column Name, Data Type, Domain, Constraints
                // - Highlight "Attribute Domain" concept
                // - Example showing permitted values for specific attributes
                {
                  id: "ITDSA_W2_Q7",
                  type: "open-ended",
                  text: "Based on the characteristics of a Relational Table, what is the technical term for the specific range of permitted values that any given column (attribute) can contain?",
                  correctAnswers: ["Attribute Domain", "Domain"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["domain"],
                    caseSensitive: false,
                    allowPartialMatch: true
                  },
                  image: {
                    src: "/images/ITDSA_W2_Q7.png",
                    alt: "Relational table structure showing attribute domains and permitted value ranges",
                    caption: "Figure 3.1: Relational table characteristics with attribute domain definitions"
                  }
                },
                
                // ========================================
                // Part 3: Keys and Logical View (3 questions)
                // Criterion 2.1
                // ========================================
                
                {
                  id: "ITDSA_W2_Q8",
                  type: "multiple-choice",
                  text: "Which type of key is defined as a \"minimal superkey\" because it contains no unnecessary attributes to achieve uniqueness?",
                  options: [
                    "Secondary Key",
                    "Candidate Key",
                    "Foreign Key",
                    "Composite Key"
                  ],
                  correctAnswers: ["Candidate Key"],
                  points: 4
                },
                
                {
                  id: "ITDSA_W2_Q9",
                  type: "open-ended",
                  text: "What is the name of a system-assigned primary key that has no semantic meaning in the real world?",
                  correctAnswers: ["Surrogate Key", "Surrogate"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["surrogate"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                },
                
                // IMAGE NEEDED: UUID vs Auto-increment comparison diagram
                // - Side-by-side comparison of B-Tree index structures
                // - UUID side: fragmented index with random insertions, page splits highlighted
                // - Auto-increment side: sequential index with clean appends
                // - Performance metrics showing write speed differences
                {
                  id: "ITDSA_W2_Q10",
                  type: "show-answer",
                  text: "In a distributed database environment, analyze the implications of using a UUID (Universally Unique Identifier) as a Primary Key versus a standard Auto-Incrementing Integer. Specifically, address how this choice impacts B-Tree indexing performance and storage fragmentation during high-volume \"Insert\" operations.",
                  correctAnswers: [
                    "Using a UUID as a Primary Key causes Index Fragmentation. Because UUIDs are random, new records are inserted at random locations within the B-Tree index. This forces the database to perform Page Splits, moving data around on the disk to make room. Conversely, Auto-Incrementing Integers are sequential; they are always appended to the end of the index, leading to high fill factors, better cache performance, and significantly faster write speeds."
                  ],
                  points: 10,
                  image: {
                    src: "/images/ITDSA_W2_Q10.png",
                    alt: "B-Tree index comparison showing UUID fragmentation vs sequential auto-increment",
                    caption: "Figure: Impact of UUID vs Auto-increment on B-Tree index performance"
                  }
                },
                
                // ========================================
                // Part 4: Integrity Rules (3 questions)
                // Criterion 2.2
                // ========================================
                
                // IMAGE NEEDED: CUSTOMER and AGENT tables showing integrity rules
                // - CUSTOMER table with columns including AGENT_CODE (FK, nullable)
                // - AGENT table with AGENT_CODE as PK
                // - Highlight row with NULL AGENT_CODE (customer 10013)
                // - Show referential integrity constraint with arrow from FK to PK
                {
                  id: "ITDSA_W2_Q11",
                  type: "multiple-choice",
                  text: "In the Illustration of Integrity Rules involving the CUSTOMER and AGENT tables, why is the AGENT_CODE column for customer 10013 (Paul F. Olowski) permitted to be null?",
                  options: [
                    "It violates Referential Integrity",
                    "It is a Primary Key and Primary Keys can be null",
                    "The customer has not yet been assigned a sales representative",
                    "The AGENT table has been deleted"
                  ],
                  correctAnswers: ["The customer has not yet been assigned a sales representative"],
                  points: 4,
                  image: {
                    src: "/images/ITDSA_W2_Q11.png",
                    alt: "CUSTOMER and AGENT tables showing nullable foreign key for unassigned customer",
                    caption: "Illustration: Integrity rules with optional foreign key relationship"
                  }
                },
                
                {
                  id: "ITDSA_W2_Q12",
                  type: "open-ended",
                  text: "Which integrity rule states that no part of a primary key can ever be null?",
                  correctAnswers: ["Entity Integrity"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["entity", "integrity"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                },
                
                {
                  id: "ITDSA_W2_Q13",
                  type: "show-answer",
                  text: "Analyze the \"Dangling Reference\" problem in a scenario where Referential Integrity is enforced but \"ON DELETE SET NULL\" is used for a mandatory (NOT NULL) foreign key column. How should a Database Architect resolve this logical paradox without allowing orphans or null violations?",
                  correctAnswers: [
                    "This creates a Metadata Conflict. If a Foreign Key is defined as NOT NULL but the delete action is ON DELETE SET NULL, the database engine will block the deletion and throw an error. To resolve this, the architect must either: 1) Change the business rule to allow Optionality (make the FK nullable). 2) Use ON DELETE CASCADE (if the child cannot exist without the parent). 3) Use ON DELETE RESTRICT, forcing the user to manually reassign or delete the child before the parent can be removed."
                  ],
                  points: 10
                },
                
                // ========================================
                // Part 5: Relational Algebra (3 questions)
                // Criterion 2.3
                // ========================================
                
                {
                  id: "ITDSA_W2_Q14",
                  type: "multiple-choice",
                  text: "Which relational algebra operator combines all rows from two tables, resulting in a set of all possible ordered pairs of tuples?",
                  options: [
                    "Selection",
                    "Projection",
                    "Join",
                    "Cartesian Product"
                  ],
                  correctAnswers: ["Cartesian Product"],
                  points: 4
                },
                
                {
                  id: "ITDSA_W2_Q15",
                  type: "open-ended",
                  text: "What is the specialized operator used to find tuples in one relation that match *all* tuples in a second relation (the \"Universal Quantifier\")?",
                  correctAnswers: ["Division Operator", "Division"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["division"],
                    caseSensitive: false,
                    allowPartialMatch: true
                  }
                },
                
                {
                  id: "ITDSA_W2_Q16",
                  type: "show-answer",
                  text: "Given two relations R(A,B) and S(B), express the Division operation (R ÷ S) using only the fundamental operators: Selection (σ), Projection (π), and Set Difference (−). Demonstrate the step-by-step logic to ensure the result contains only values of 'A' associated with every value of 'B' in S.",
                  correctAnswers: [
                    "The expression is: π_A(R) − π_A((π_A(R) × S) − R). Step-by-step logic: 1) π_A(R) finds all possible candidates. 2) π_A(R) × S creates every possible combination of those candidates with the requirements in S. 3) Subtracting R from that ((π_A(R) × S) − R) reveals which candidate-requirement pairs are missing. 4) The final subtraction removes any candidate from the total list who was missing at least one requirement."
                  ],
                  points: 10,
                },

                {
                  id: "ITDSA_W2_Q17",
                  type: "multiple-choice",
                  text: "In a Crow's Foot ERD, what does a circle near the end of a relationship line represent?",
                  options: [
                    "Mandatory One",
                    "Optional Zero",
                    "Mandatory Many",
                    "Optional Many"
                  ],
                  correctAnswers: ["Optional Zero"],
                  points: 4,
                },
                
                {
                  id: "ITDSA_W2_Q18",
                  type: "open-ended",
                  text: "What is the term for an entity that cannot exist without a relationship to a \"strong\" parent entity and lacks its own sufficient primary key?",
                  correctAnswers: ["Weak Entity"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["weak", "entity"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                },
                
                // IMAGE NEEDED: Logistics company ERD
                // - SHIPMENT, ITEM (Fragile/Standard subtypes), SPECIALIST, GENERAL_STAFF entities
                // - ASSIGNMENT/CUSTODY associative entity highlighted
                // - Shows relationships: Specialist handles Fragile Items
                // - ASSIGNMENT entity contains: Specialist_ID (FK), Item_ID (FK), Custody_Timestamp
                {
                  id: "ITDSA_W2_Q19",
                  type: "show-answer",
                  text: "Scenario: A global logistics company tracks \"Shipments.\" Each shipment is made of \"Items.\" Items can be \"Fragile\" or \"Standard.\" Fragile items must be handled by \"Specialists,\" while Standard items can be handled by \"General Staff.\" A specialist can handle many fragile items, but each fragile item is assigned to one specialist. Draw or describe the ERD, specifically identifying where an \"Associative Entity\" is required to track the timestamp of when a specialist took custody of a specific item.",
                  correctAnswers: [
                    "The ERD requires an Associative Entity named ASSIGNMENT (or CUSTODY). ITEM is the parent. SPECIALIST is the parent. ASSIGNMENT is the child of both, containing Specialist_ID (FK), Item_ID (FK), and the crucial attribute: Custody_Timestamp. This allows the company to track multiple specialists handling the same item over time, which a direct relationship cannot do without violating 1NF."
                  ],
                  points: 10,
                  image: {
                    src: "/images/ITDSA_W2_Q19.png",
                    alt: "Logistics ERD showing associative entity for specialist-item custody tracking",
                    caption: "Figure: Associative entity pattern for temporal relationship tracking"
                  }
                },
                
                // ========================================
                // Part 7: Extended ER and Clustering (2 questions)
                // Criterion 2.6
                // ========================================
                
                {
                  id: "ITDSA_W2_Q20",
                  type: "multiple-choice",
                  text: "In EER modeling, which constraint specifies that an entity instance of a supertype can belong to more than one subtype simultaneously?",
                  options: [
                    "Disjoint Constraint",
                    "Overlapping Constraint",
                    "Partial Completeness",
                    "Total Completeness"
                  ],
                  correctAnswers: ["Overlapping Constraint"],
                  points: 4
                },
                
                {
                  id: "ITDSA_W2_Q21",
                  type: "open-ended",
                  text: "What is the \"top-down\" process of identifying lower-level, more specific entity types from a high-level entity?",
                  correctAnswers: ["Specialization"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["specialization"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                },
                
                {
                  id: "ITDSA_W2_Q22",
                  type: "show-answer",
                  text: "Design an EER model for a \"Vehicle\" fleet. You have Subtypes: \"Cargo Truck\" and \"Passenger Bus.\" Use the \"Subtype Discriminator\" attribute to handle a \"Total Specialization\" and \"Disjoint\" constraint. Explain how you would implement this at the physical level using the \"One-Table-Per-Subtype\" approach versus the \"Single-Table\" approach, focusing on the trade-off between null values and join performance.",
                  correctAnswers: [
                    "Single-Table Approach: All Truck and Bus attributes are in the VEHICLE table. This is fast for queries (no joins) but creates many Nulls (e.g., a Bus will have a Null in the Cargo_Tons column). One-Table-Per-Subtype: Separate tables for VEHICLE, TRUCK, and BUS. This is cleaner (no Nulls) but requires a Left Join whenever you want to see the full details of the fleet, which degrades performance at scale."
                  ],
                  points: 10,
                },
                
                // ========================================
                // Part 8: Normalization and Entity Clustering (3 questions)
                // Criterion 2.7
                // ========================================
                
                {
                  id: "ITDSA_W2_Q23",
                  type: "multiple-choice",
                  text: "A table is in Second Normal Form (2NF) if it is in 1NF and contains no _____ dependencies.",
                  options: [
                    "Transitive",
                    "Partial",
                    "Multi-valued",
                    "Recursive"
                  ],
                  correctAnswers: ["Partial"],
                  points: 4
                },
                
                {
                  id: "ITDSA_W2_Q24",
                  type: "open-ended",
                  text: "What is the term for a functional dependency where a non-key attribute is dependent on another non-key attribute?",
                  correctAnswers: ["Transitive Dependency", "Transitive"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["transitive"],
                    caseSensitive: false,
                    allowPartialMatch: true
                  }
                },
                
                // IMAGE NEEDED: Enrollment table normalization diagram
                // - Original table: Enrolment(StudentID, CourseID, InstructorID, Grade)
                // - Functional dependency arrows showing:
                //   * StudentID, CourseID → Grade
                //   * CourseID → InstructorID
                //   * InstructorID → CourseID
                // - Highlight BCNF violation (InstructorID is determinant but not candidate key)
                // - Show decomposed tables: ENROLMENT(StudentID, InstructorID, Grade) and TEACHING_ASSIGNMENT(InstructorID, CourseID)
                {
                  id: "ITDSA_W2_Q25",
                  type: "show-answer",
                  text: "Consider a table: Enrolment(StudentID, CourseID, InstructorID, Grade). Business Rules: 1) A student and course uniquely determine a grade. 2) Each course has only one instructor. 3) An instructor teaches only one course. Analyze why this table is in 3NF but NOT in BCNF (Boyce-Codd Normal Form). Propose a decomposition that resolves the anomaly while preserving all functional dependencies.",
                  correctAnswers: [
                    "The table is in 3NF because there are no transitive dependencies of non-prime attributes on the PK. However, it violates BCNF because InstructorID → CourseID exists, and InstructorID is a determinant but is not a candidate key. Decomposition: Table 1: ENROLMENT(StudentID, InstructorID, Grade). Table 2: TEACHING_ASSIGNMENT(InstructorID, CourseID)."
                  ],
                  points: 10,
                  image: {
                    src: "/images/ITDSA_W2_Q25.png",
                    alt: "Enrollment table showing 3NF to BCNF normalization with functional dependencies",
                    caption: "Figure: BCNF violation and decomposition preserving functional dependencies"
                  }
                }
              ],
        "3": [
                {
                  id: "ITDSA_W3_Q1",
                  type: "multiple-choice",
                  text: "Which condition *must* be true for an entity to be classified as existence-dependent?",
                  options: [
                    "It has a composite primary key",
                    "It participates in a weak relationship",
                    "Its primary key includes the parent entity's primary key",
                    "It cannot exist without a related parent entity"
                  ],
                  correctAnswers: ["It cannot exist without a related parent entity"],
                  points: 4
                  // NOTE: No image required — conceptual definition question (Chapter 4)
                },

                {
                  id: "ITDSA_W3_Q2",
                  type: "multiple-choice",
                  text: "In Crow's Foot notation, a strong (identifying) relationship is depicted by:",
                  options: [
                    "A dashed relationship line",
                    "A double diamond",
                    "A solid relationship line",
                    "Mandatory participation on both sides"
                  ],
                  correctAnswers: ["A solid relationship line"],
                  points: 4
                },

                {
                  id: "ITDSA_W3_Q3",
                  type: "multiple-choice",
                  text: "Which combination correctly represents a total, disjoint specialization?",
                  options: [
                    "Every supertype instance belongs to at least one subtype, but may belong to multiple",
                    "Some supertype instances belong to no subtype, and none overlap",
                    "Every supertype instance belongs to exactly one subtype",
                    "Some supertype instances belong to more than one subtype, but all must belong to one"
                  ],
                  correctAnswers: ["Every supertype instance belongs to exactly one subtype"],
                  points: 4
                },

                {
                  id: "ITDSA_W3_Q4",
                  type: "multiple-choice",
                  text: "Entity clustering is MOST useful when:",
                  options: [
                    "Reducing redundancy in BCNF",
                    "Modeling recursive relationships",
                    "Treating multiple entities as a single abstraction for external access",
                    "Eliminating fan traps"
                  ],
                  correctAnswers: ["Treating multiple entities as a single abstraction for external access"],
                  points: 4
                  // NOTE: No image required — conceptual question (Chapter 4/5)
                },

                {
                  id: "ITDSA_W3_Q5",
                  type: "multiple-choice",
                  text: "A table is in 2NF but NOT 3NF when:",
                  options: [
                    "A non-key attribute depends on another non-key attribute",
                    "A non-key attribute depends on part of a composite key",
                    "A table contains multivalued attributes",
                    "A determinant is not a candidate key"
                  ],
                  correctAnswers: ["A non-key attribute depends on another non-key attribute"],
                  points: 4,
                  image: { 
                    src: "/images/ITDSA_W3_Q5.png", 
                    alt: "Transitive dependency illustrating 2NF vs 3NF violation", 
                    caption: "Example of a table in 2NF but not 3NF due to transitive dependency" 
                  }
                },

                // ========================================
                // SECTION B — Open-Ended (One / Two-Word Answers)
                // Assessment Criteria: 2.8, 2.9
                // ========================================

                {
                  id: "ITDSA_W3_Q6",
                  type: "open-ended",
                  text: "What constraint ensures that every table row has a unique identifier?",
                  correctAnswers: ["Entity integrity", "Entity Integrity"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["entity", "integrity"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                  // NOTE: No image required — factual definition question
                },

                {
                  id: "ITDSA_W3_Q7",
                  type: "open-ended",
                  text: "What term describes attributes that a subtype receives from its supertype?",
                  correctAnswers: ["Inheritance"],
                  points: 4,
                  validationOptions: {
                    caseSensitive: false,
                    tolerance: 0
                  }
                  // NOTE: No image required — conceptual vocabulary question (Chapter 5)
                },

                {
                  id: "ITDSA_W3_Q8",
                  type: "open-ended",
                  text: "What type of dependency violates BCNF but NOT 3NF?",
                  correctAnswers: ["Non-key determinant", "non-key determinant"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["non-key", "determinant"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                  // NOTE: No image required — precise normalization terminology (Chapter 6)
                },

                {
                  id: "ITDSA_W3_Q9",
                  type: "open-ended",
                  text: "What normal form specifically eliminates multivalued dependencies?",
                  correctAnswers: ["4NF", "Fourth Normal Form"],
                  points: 4,
                  validationOptions: {
                    caseSensitive: false,
                    tolerance: 0
                  }
                  // NOTE: No image required — normalization level question (Chapter 6)
                },

                {
                  id: "ITDSA_W3_Q10",
                  type: "open-ended",
                  text: "What database design strategy intentionally introduces redundancy to improve performance?",
                  correctAnswers: ["Denormalization", "denormalization"],
                  points: 4,
                  validationOptions: {
                    caseSensitive: false,
                    tolerance: 0
                  }
                  // NOTE: No image required — factual vocabulary question (Chapter 6)
                },  
                
                {
                  id: "ITDSA_W3_Q11",
                  type: "multiple-choice",
                  text: "In a relational database conceptual design, suppose an entity's existence strictly depends on another entity, and its primary key is partially derived from the parent entity's primary key. How is this relationship and the dependent entity classified in a Crow's Foot ERD?",
                  options: [
                    "Non-identifying relationship, Composite Entity",
                    "Weak relationship, Strong Entity",
                    "Strong (or identifying) relationship, Weak Entity",
                    "Recursive relationship, Subtype Entity"
                  ],
                  correctAnswers: ["Strong (or identifying) relationship, Weak Entity"],
                  points: 4,                  
                  image: { 
                    src: "/images/ITDSA_W3_Q11.png", 
                    alt: "Crow's Foot ERD: identifying relationship between strong and weak entity", 
                    caption: "Criteria 2.4/2.5: Strong (identifying) relationship and Weak Entity classification"
                   }
                },

                {
                  id: "ITDSA_W3_Q12",
                  type: "multiple-choice",
                  text: "When an enterprise DBA (database administrator) consciously reverts a schema from 3NF down to a lower normal form, what is the exact structural trade-off being made?",
                  options: [
                    "Decreased data redundancy at the cost of slower query execution speed",
                    "Increased query performance at the cost of greater data redundancy and an increased risk of data anomalies",
                    "Complete elimination of partial dependencies at the cost of highly complex table structures",
                    "Enhanced entity integrity at the strict cost of referential integrity"
                  ],
                  correctAnswers: ["Increased query performance at the cost of greater data redundancy and an increased risk of data anomalies"],
                  points: 4
                  // NOTE: No image required — conceptual trade-off question (Chapter 6, Denormalization)
                },

                {
                  id: "ITDSA_W3_Q13",
                  type: "multiple-choice",
                  text: "You are designing a table to maintain a history of time-variant data. The natural primary key requires a composite of four distinct attributes to guarantee entity integrity, making indexing and foreign key assignments highly inefficient. According to design guidelines, what is the best strategy?",
                  options: [
                    "Retain the natural composite key to ensure logical entity integrity remains intact",
                    "Denormalize the table to eliminate the need for a complex key",
                    "Implement a single-attribute surrogate primary key to simplify the design and joins",
                    "Utilize an overlapping subtype discriminator as the primary key"
                  ],
                  correctAnswers: ["Implement a single-attribute surrogate primary key to simplify the design and joins"],
                  points: 4
                  // NOTE: No image required — surrogate key design strategy question (Chapter 4/5)
                },

                // --- Part 2: Fact-Based Short Answer (Strictly 1–2 Words) ---

                {
                  id: "ITDSA_W3_Q14",
                  type: "open-ended",
                  text: "In an Extended Entity Relationship (EER) model, what specific attribute in a supertype table is used to explicitly determine which entity subtype a given supertype occurrence relates to?",
                  correctAnswers: ["Subtype discriminator", "subtype discriminator"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["subtype", "discriminator"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                  // NOTE: No image required — EER vocabulary question (Chapter 5)
                },

                {
                  id: "ITDSA_W3_Q15",
                  type: "open-ended",
                  text: "Within a specialization hierarchy, if a single entity instance of a supertype can simultaneously belong to multiple subtypes, what specific constraint is being applied?",
                  correctAnswers: ["Overlapping", "overlapping", "Overlapping constraint"],
                  points: 4,
                  validationOptions: {
                    caseSensitive: false,
                    tolerance: 0
                  }
                  // NOTE: No image required — specialization constraint vocabulary (Chapter 5)
                },

                {
                  id: "ITDSA_W3_Q16",
                  type: "open-ended",
                  text: "When dealing with massive enterprise data models containing hundreds of components, what technique is used to group multiple entities and relationships into a single 'virtual' entity to simplify the ERD?",
                  correctAnswers: ["Entity clustering", "entity clustering"],
                  points: 4,
                  validationOptions: {
                    requiredTerms: ["entity", "clustering"],
                    caseSensitive: false,
                    allowPartialMatch: false
                  }
                  // NOTE: No image required — ERD simplification technique (Chapter 4/5)
                },

                {
                  id: "ITDSA_W3_Q17",
                  type: "open-ended",
                  text: "A table is fully in 3NF. However, a severe anomaly exists where a non-prime attribute determines part of the table's composite primary key. To resolve this specific edge case, to which normal form must the table be converted?",
                  correctAnswers: ["BCNF", "Boyce-Codd Normal Form", "Boyce Codd Normal Form"],
                  points: 4,
                  validationOptions: {
                    caseSensitive: false,
                    tolerance: 0
                  }
                  // NOTE: No image required — normalization edge case question (Chapter 6)
                },

                // --- Part 3: Hell-Level Open-Ended (Synthesis & Evaluation) ---

                {
                  id: "ITDSA_W3_Q18",
                  type: "show-answer",
                  text: "The Normalization Gauntlet: You are handed a flat file (1NF) containing the attributes PROJ_NUM, EMP_NUM, PROJ_NAME, EMP_NAME, JOB_CLASS, CHG_HOUR, and HOURS. The primary key is the composite of PROJ_NUM and EMP_NUM. Detail the exact functional dependencies (partial and transitive) that exist, and explain the precise steps required to convert this structure to 3NF.",
                  correctAnswers: [
                    "Identify Dependencies: The relation has a composite primary key (PROJ_NUM, EMP_NUM). It contains partial dependencies — PROJ_NAME depends only on PROJ_NUM, while EMP_NAME, JOB_CLASS, and CHG_HOUR depend only on EMP_NUM. It also contains a transitive dependency — CHG_HOUR is determined by the non-prime attribute JOB_CLASS. Step to 2NF: Remove partial dependencies by splitting into three tables: (1) PROJECT table (PROJ_NUM, PROJ_NAME), (2) EMPLOYEE table (EMP_NUM, EMP_NAME, JOB_CLASS, CHG_HOUR), and (3) ASSIGNMENT table (PROJ_NUM, EMP_NUM, HOURS). Step to 3NF: Remove the transitive dependency from the EMPLOYEE table by creating a JOB table (JOB_CLASS, CHG_HOUR) and retaining JOB_CLASS as a foreign key in EMPLOYEE. Final result: 4 tables in 3NF with no partial or transitive dependencies remaining."
                  ],
                  points: 10,
                  image: { 
                    src: "/images/ITDSA_W3_Q18.png", 
                    alt: "Normalization gauntlet: 1NF to 3NF decomposition of PROJ/EMP flat file", 
                    caption: "Step-by-step 1NF → 2NF → 3NF normalization of PROJ_NUM/EMP_NUM composite key table"
                   }
                },

                {
                  id: "ITDSA_W3_Q19",
                  type: "show-answer",
                  text: "Specialization Hierarchy Constraints: In the context of the EERM, contrast a 'partial completeness constraint' with a 'total completeness constraint.' How do these constraints dictate the behavior of a supertype entity in relation to its subtypes at the database design level?",
                  correctAnswers: [
                    "A completeness constraint dictates whether every supertype occurrence must also be a member of at least one subtype. Partial Completeness: Not every supertype occurrence is required to be a member of a subtype. Some supertype instances may exist entirely on their own without a matching subtype instance. At the design level, this means the foreign key relationship to the subtype table is optional — a supertype row may have no corresponding subtype row, and NULLs or absent rows in subtype tables are permitted. Total Completeness: Every supertype occurrence must be a member of at least one subtype. A supertype cannot exist in the database without a corresponding representation in a subtype table. At the design level, this mandates that every supertype insert triggers a mandatory corresponding subtype insert, enforced via application logic or database constraints."
                  ],
                  points: 10,
                  image: { 
                    src: "/images/ITDSA_W3_Q19.png", 
                    alt: "Partial vs total completeness constraint in EER specialization hierarchy", 
                    caption: "Partial Completeness (optional subtype) vs Total Completeness (mandatory subtype)" 
                  }
                },

                {
                  id: "ITDSA_W3_Q20",
                  type: "show-answer",
                  text: "The M:N Conceptual Resolution: ER models cannot physically implement Many-to-Many (M:N) relationships directly. Explain the structural mechanism of an Associative (Composite) Entity and how it resolves this issue in a relational database schema.",
                  correctAnswers: [
                    "An associative (or composite) entity is used to physically resolve an unimplementable M:N relationship by breaking it down into two separate 1:M relationships. Structural mechanism: A new bridging entity is introduced between the two original entities. This bridging entity contains the primary keys of both parent entities as foreign keys. Together, these foreign keys typically form the composite primary key of the associative entity itself. Example: A STUDENT–COURSE M:N relationship cannot be directly implemented. An ENROLLMENT associative entity is introduced, containing STUDENT_ID (FK) and COURSE_ID (FK) as its composite PK. The M:N is resolved into STUDENT (1) —< ENROLLMENT >— (1) COURSE — two 1:M relationships. This eliminates data anomalies, enables the storage of relationship-specific attributes (e.g., EnrollmentDate, Grade) on the associative entity, and produces a fully implementable relational schema."
                  ],
                  points: 10,
                  image: { 
                    src: "/images/ITDSA_W3_Q20.png", 
                    alt: "M:N resolution using ENROLLMENT associative entity between STUDENT and COURSE", 
                    caption: "Criteria 2.4/2.5: Associative Entity resolving M:N into two 1:M relationships" 
                  }
                },

                // ========================================
                // SECTION D — Pure Hell-Level Scenario Questions
                // Assessment Criteria: 2.8, 2.9, 2.10, 4.9
                // ========================================

                {
                  id: "ITDSA_W3_Q21",
                  type: "show-answer",
                  text: "You are given a table where a composite primary key partially determines a non-key attribute, AND another non-key attribute transitively depends on a non-key. Design the MINIMUM number of tables required to reach 3NF and justify each decomposition step.",
                  correctAnswers: [
                    "Minimum tables required: 3. Decomposition steps: (1) Table 1 — Full key dependencies: Contains only attributes that are fully functionally dependent on the entire composite primary key. This resolves the 2NF violation (partial dependency removed). (2) Table 2 — Partial dependency table: Contains the partial determinant (part of the composite key) and the attributes it alone determines. This table reaches 2NF for the separated attributes. (3) Table 3 — Transitive dependency table: Contains the non-key determinant and the attribute it determines. This resolves the 3NF violation. Each decomposition: preserves all functional dependencies, eliminates insert/update/delete anomalies, and achieves 3NF across all three resulting tables. No information is lost (lossless decomposition)."
                  ],
                  points: 10,
                  image: { 
                    src: "/images/ITDSA_W3_Q21.png", 
                    alt: "3NF decomposition from a table with partial and transitive dependencies", 
                    caption: "Chapter 6: Minimum 3-table decomposition to achieve 3NF" 
                  }
                },

                {
                  id: "ITDSA_W3_Q22",
                  type: "show-answer",
                  text: "Given a natural key that is composite, mutable, and frequently reused as a foreign key in 12 child tables: Argue whether a surrogate key should replace it. Your answer MUST reference entity integrity and join cost.",
                  correctAnswers: [
                    "A surrogate key SHOULD replace the natural composite key, for the following reasons: (1) Entity Integrity: The natural key is mutable — if the business values change (e.g., a product code is restructured), all 12 child tables must update their foreign key values simultaneously. A surrogate key (e.g., auto-increment integer) is immutable and permanently stable, ensuring entity integrity is maintained without cascading updates. (2) Join Cost: A composite natural key (e.g., 3 columns) propagates all 3 columns as foreign keys into 12 child tables, increasing index size, join complexity, and storage overhead. A single-column surrogate key minimizes join cost to a single integer comparison — significantly improving query performance at scale. (3) Surrogate keys decouple the database structure from business logic changes, providing long-term maintainability. Trade-off: The natural key should be retained as a UNIQUE constraint to preserve its business uniqueness, while the surrogate key serves as the structural identifier."
                  ],
                  points: 10
                  // NOTE: No image required — analytical scenario question
                },

                {
                  id: "ITDSA_W3_Q23",
                  type: "show-answer",
                  text: "Explain how a FAN TRAP can silently pass 3NF validation yet still produce incorrect query results. Provide a concrete example from an ERD context.",
                  correctAnswers: [
                    "A fan trap occurs when a single entity is the source of two separate one-to-many relationships, creating an ambiguous path between two child entities. It silently passes 3NF because: 3NF validates functional dependencies within individual tables — it does not validate semantic relationships between tables or query path correctness. Example: DEPARTMENT (1) → EMPLOYEE (M) and DEPARTMENT (1) → PROJECT (M). If a query asks 'Which employees work on which projects?', the ERD implies a path through DEPARTMENT — but this is incorrect. The query will return a Cartesian product (every employee in a department matched with every project in that department), even though no direct EMPLOYEE–PROJECT relationship exists. The result is statistically inflated and factually wrong, yet every table individually satisfies 3NF. Resolution: Introduce a direct EMPLOYEE–PROJECT associative entity to remove the fan trap."
                  ],
                  points: 10
                },

                {
                  id: "ITDSA_W3_Q24",
                  type: "show-answer",
                  text: "Evaluate a scenario where denormalization improves read performance but introduces update anomalies. When is this trade-off acceptable, and what governance mechanism must accompany it?",
                  correctAnswers: [
                    "Scenario: A retail reporting database stores a denormalized SALES_SUMMARY table that includes ProductName and CategoryName embedded directly alongside SalesAmount, rather than joining to PRODUCT and CATEGORY tables. Performance benefit: Queries for monthly sales reports execute without joins, reducing response time from 8 seconds to 0.3 seconds on 100M rows. Update anomaly introduced: If a product is renamed (e.g., 'Widget A' → 'Widget Pro'), all rows in SALES_SUMMARY containing the old name must be updated manually. A missed update leaves inconsistent ProductName values across historical records. When acceptable: (1) Data warehouses and OLAP systems where data is loaded periodically (ETL batch) and historical snapshots are intentional. (2) Read-to-write ratios are extremely high (e.g., 1000:1). (3) Source-of-truth tables remain normalized (OLTP layer), and denormalization exists only in reporting layers. Governance mechanism required: An ETL refresh schedule that rebuilds or updates the denormalized layer from the normalized source on a defined schedule — ensuring eventual consistency without permanent data corruption."
                  ],
                  points: 10
                  // NOTE: No image required — analytical trade-off question
                },

                {
                  id: "ITDSA_W3_Q25",
                  type: "show-answer",
                  text: "A globally distributed retail system must remain operational during regional network failures and peak sales events. The architects configure the system to prioritize AVAILABILITY and PARTITION TOLERANCE. Which CAP property is sacrificed, and how does this affect data consistency across global regions?",
                  correctAnswers: [
                    "The property sacrificed is CONSISTENCY (C in the CAP theorem). According to CAP theorem, a distributed system can guarantee at most two of the three properties (Consistency, Availability, Partition Tolerance) simultaneously. By choosing Availability (A) + Partition Tolerance (P), the system accepts the following consequences: (1) During a network partition (e.g., the Johannesburg region loses connectivity to the London region), both nodes continue to accept read and write requests independently. (2) A customer in Johannesburg may see a product listed as 'In Stock' while London has already sold the last unit — the inventory states diverge. (3) The system achieves EVENTUAL CONSISTENCY: once the partition heals, the nodes synchronize and converge to a consistent state, but no guarantee is made about real-time accuracy. (4) Business impact: Overselling is possible during partitions (a known trade-off in e-commerce at scale, e.g., Amazon, Takealot). Mitigation strategies include conflict resolution policies (last-write-wins, version vectors) and compensation logic (automated refunds for oversold items)."
                  ],
                  points: 10,
                }
        ],
        "4":[],
        "5":[],
        "6":[],
        "7":[],
    },
};

function normalizePoints(questionsObj) {
  const clone = JSON.parse(JSON.stringify(questionsObj));
  const caps = {
    'multiple-choice': 2,
    'open-ended': 3,
    'show-answer': 8
  };
  for (const moduleKey of Object.keys(clone)) {
    const weeks = clone[moduleKey];
    for (const weekKey of Object.keys(weeks)) {
      const arr = weeks[weekKey];
      if (!Array.isArray(arr)) continue;
      for (const q of arr) {
        if (!q || !q.type) continue;
        const cap = caps[q.type];
        if (typeof cap === 'number') {
          q.points = Math.min(q.points || cap, cap);
        }
      }
    }
  }
  return clone;
}

export const questions = normalizePoints(rawQuestions);
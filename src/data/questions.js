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

export const questions = {
  ITDSA: {
    "1": [
      // ========================================
      // Section 1.1: Importance of Databases (5 questions)
      // ========================================
      
      {
        id: "ITDSA_W1_Q1",
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
        id: "ITDSA_W1_Q2",
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
        id: "ITDSA_W1_Q3",
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
        id: "ITDSA_W1_Q4",
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
        id: "ITDSA_W1_Q5",
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
        id: "ITDSA_W1_Q6",
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
        id: "ITDSA_W1_Q7",
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
        id: "ITDSA_W1_Q8",
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
        id: "ITDSA_W1_Q9",
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
        id: "ITDSA_W1_Q10",
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
        id: "ITDSA_W1_Q11",
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
        id: "ITDSA_W1_Q12",
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
        id: "ITDSA_W1_Q13",
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
        id: "ITDSA_W1_Q14",
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
        id: "ITDSA_W1_Q15",
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
        id: "ITDSA_W1_Q16",
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
        id: "ITDSA_W1_Q17",
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
        id: "ITDSA_W1_Q18",
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
        id: "ITDSA_W1_Q19",
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
        id: "ITDSA_W1_Q20",
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
        id: "ITDSA_W1_Q21",
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
        id: "ITDSA_W1_Q22",
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
        id: "ITDSA_W1_Q23",
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
        id: "ITDSA_W1_Q24",
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
        id: "ITDSA_W1_Q25",
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
    
    "2": [],
    "3": []
  },
  
  ITNSA: {
    "1": [],
    "2": [],
    "3": []
  }
};
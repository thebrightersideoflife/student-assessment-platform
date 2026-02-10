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
    
    "2": [],
    "3": []
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
        
        "2": [],
        "3": []
    },
};
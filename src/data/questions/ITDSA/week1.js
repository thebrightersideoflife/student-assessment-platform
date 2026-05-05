// ITDSA — Week 1
// Parts: 1 Data-Information Transition | 2 Historical Evolution & File Systems |
//        3 DBMS Roles | 4 Data Models | 5 Building Blocks | 6 Business Rules & Data Modelling
export default [
  // ========================================
  // Part 1: Importance & The Data-Information Transition (4 questions)
  // ========================================
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
    explanation: "Although the records are accurate, they lack the indexing and query engine (DBMS processing) necessary to provide context and organization. Without these, the 50 terabytes remain unorganized raw facts that cannot be easily retrieved or used for decision-making.",
    image: {
      src: "/images/ITDSA_W1_Q1.png",
      alt: "Data vs Information transformation diagram showing DBMS processing",
      caption: "Figure: The transformation from raw data to meaningful information"
    }
  },
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
    explanation: "Metadata is the description of the structure. Even if the end-user data exists, the DBMS cannot interpret what the bytes represent (e.g., which numbers are IDs vs. prices) without the metadata schema.",
    image: {
      src: "/images/ITDSA_W1_Q2.png",
      alt: "Database Structure diagram showing DBMS, Metadata, and End-user data components",
      caption: "Figure 1.4: Database Structure and Component Interaction"
    }
  },
  {
    id: "ITDSA_W1_Q3",
    type: "open-ended",
    text: "You find a column named Status with values 1, 2, and 99. To determine that 99 actually means \"Discontinued,\" which specific database component must a Database Analyst consult?",
    correctAnswers: ["Metadata", "Data Dictionary", "Metadata / Data Dictionary"],
    points: 4,
    explanation: "To understand the meaning behind a coded value like 99, a user must consult the Data Dictionary, which stores the definitions and business rules for each attribute.",
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
  {
    id: "ITDSA_W1_Q4",
    type: "show-answer",
    text: "Scenario: In a high-frequency trading application, raw trade logs (End-User Data) are useless without immediate context. Construct a scenario where metadata becomes the primary driver of value, and explain how a DBMS manages this transition from \"raw facts\" to \"meaningful information\" differently than a file system would.",
    correctAnswers: [
      "In a high-frequency trading scenario, the End-User Data (the raw trade logs) is meaningless without the Metadata (the description of the data structure, such as timestamp formats, currency codes, and transaction types). The DBMS is the critical engine that manages the interaction between this \"End-user data\" and the \"Database structure\" (metadata). A file system would merely store the bytes; the DBMS uses the metadata to interpret those bytes, transforming raw data into a \"Single Integrated View\" that provides meaningful information."
    ],
    points: 10,
    explanation: "In a high-frequency trading scenario, a log file might show a value like 1708523400. To a file system, this is just a sequence of bytes. A DBMS uses metadata to immediately interpret it as a Unix timestamp, a specific stock symbol, and a price in cents. Unlike a file system, the DBMS applies the metadata schema to raw data to present a Single Integrated View ready for analysis.",
    image: {
      src: "/images/ITDSA_W1_Q4.png",
      alt: "High-frequency trading data flow showing metadata's role in context provision",
      caption: "Figure: How DBMS uses metadata to transform raw trade logs into actionable information"
    }
  },

  // ========================================
  // Part 2: Historical Evolution & File Systems (4 questions)
  // ========================================
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
    explanation: "Because traditional file systems lack centralized management, security must be applied to every individual file and folder separately, making it nearly impossible to enforce a single, consistent policy across an entire organization."
  },
  {
    id: "ITDSA_W1_Q6",
    type: "open-ended",
    text: "In a manual file system, if a client's phone number is updated in the \"Invoices\" file but not the \"Shipping\" file, what specific type of anomaly has occurred? (Answer in full)",
    correctAnswers: ["Update Anomaly"],
    points: 4,
    explanation: "When the same piece of data (the phone number) exists in multiple independent files and is only updated in one, the data becomes inconsistent, leading to errors in different departments.",
    validationOptions: {
      requiredTerms: ["update", "anomaly"],
      caseSensitive: false,
      allowPartialMatch: false
    }
  },
  {
    id: "ITDSA_W1_Q7",
    type: "open-ended",
    text: "Consider the YouTube case study. Beyond just \"organization,\" what factors make a manual file system (filing cabinets) impossible for YouTube?",
    correctAnswers: ["Volume", "Access Speed", "Retrieval Time", "Concurrency"],
    points: 4,
    explanation: "Beyond organization, manual systems cannot handle the volume (petabytes of data), velocity (millions of concurrent users), or variety (metadata, video files, comments) required for a global digital platform.",
    validationOptions: {
      requiredTerms: ["volume", "access speed", "retrieval time", "concurrency"],
      caseSensitive: false,
      allowPartialMatch: true
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
    explanation: "In legacy systems, structural dependence means the application's code is tied to the physical file layout. Adding an Email Address field changes that layout, requiring every program that touches the file to be recoded and recompiled. A DBMS provides structural independence by separating the logical request from the physical storage."
  },

  // ========================================
  // Part 3: DBMS Functions & Roles (4 questions)
  // ========================================
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
    explanation: "Bypassing the DBMS to access files directly through the operating system skips the security protocols, access controls, and data integrity checks managed by the DBMS software."
  },
  {
    id: "ITDSA_W1_Q10",
    type: "open-ended",
    text: "In Figure 1.4, physical data might be sharded across multiple hard drives. What specific software component hides this complexity to create the \"Single Integrated View\"?",
    correctAnswers: ["DBMS", "Database Management System", "The DBMS"],
    points: 4,
    explanation: "The DBMS software sits between the users and the physical storage, abstracting away complexities like sharding or drive locations to provide a unified logical view.",
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
  {
    id: "ITDSA_W1_Q11",
    type: "open-ended",
    text: "A query runs out of control and crashes the server because no resource limits were set. According to the \"Sample Skills Required,\" which role is responsible for maintaining the DBMS environment to prevent this?",
    correctAnswers: ["Database Administrator", "DBA", "Database Administrator (DBA)"],
    points: 4,
    explanation: "The DBA is responsible for performance tuning, resource management, and ensuring the stability of the environment to prevent server crashes.",
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true
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
    explanation: "Unlike the traditional centralized structure in Figure 1.4, cloud architecture distributes the database structure across global infrastructure. The DBMS still provides a logical integrated view to the end-user, but the physical components are distributed across cloud storage technologies.",
    image: {
      src: "/images/ITDSA_W1_Q2.png",
      alt: "Comparison of traditional centralized vs cloud distributed database architecture",
      caption: "Figure: Traditional Architecture vs Cloud Database Infrastructure"
    }
  },

  // ========================================
  // Part 4: Data Models (4 questions)
  // ========================================
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
    explanation: "A valid data model must define the entities, attributes, and the relationships between them. Without relationships, the model fails to describe how data points interact or the business rules governing those interactions.",
  },
  {
    id: "ITDSA_W1_Q14",
    type: "multiple-choice",
    text: "Look at the ERD below (Entities like MODULE and ASSESSMENT). What type of data model is this?",
    options: [
      "Conceptual",
      "Logical",
      "Physical",
      "External"
    ],
    correctAnswers: ["Logical"],
    points: 4,
    explanation: "It is a logical model because it defines entities, specific attributes, and relationships with cardinalities, but does not yet specify physical storage details like hardware or SQL data types.",
    image: {
      src: "/images/ITDSA_W1_Q14.png",
      alt: "Logical ERD showing MODULE, ASSESSMENT, STUDENT, and CAMPUS entities",
      caption: "Page 12: Logical Data Model with entities, attributes, and relationships"
    }
  },
  {
    id: "ITDSA_W1_Q15",
    type: "open-ended",
    text: "A \"Bad Design\" allows a duplicate student ID. In the Figure 1.4 flow, at which specific step does the system reject the duplicate entry?",
    correctAnswers: ["Application Request", "DBMS Engine", "Application Request / DBMS Engine"],
    points: 4,
    explanation: "The duplicate entry is rejected during the Application Request processing by the DBMS Engine, which enforces the rules before the data is accepted.",
    validationOptions: {
      caseSensitive: false,
      allowPartialMatch: true
    },
    image: {
      src: "/images/ITDSA_W1_Q2.png",
      alt: "Application request flow showing where duplicate entries are rejected",
      caption: "Figure 1.4: Duplicate detection at the Application Request/DBMS Engine layer"
    }
  },
  {
    id: "ITDSA_W1_Q16",
    type: "open-ended",
    text: "Who is responsible for the \"Physical\" implementation of the database environment (hardware, tablespaces)?",
    correctAnswers: ["Database Architect", "Architect"],
    points: 4,
    explanation: "The physical implementation is the responsibility of the architect or DBA, who plans the hardware, storage architecture, and tablespaces required to deploy the database environment.",
    validationOptions: {
      requiredTerms: ["architect"],
      caseSensitive: false,
      allowPartialMatch: false
    }
  },

  // ========================================
  // Part 5: Building Blocks of Data Models (5 questions)
  // ========================================
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
    explanation: "The cardinality 0..* on the ASSESSMENT side explicitly indicates that a MODULE can exist with zero or more associated assessments.",
    image: {
      src: "/images/ITDSA_W1_Q14.png",
      alt: "MODULE to ASSESSMENT relationship showing 1..1 to 0..* cardinality",
      caption: "Figure: Crow's Foot notation showing MODULE can exist with zero assessments"
    }
  },
  {
    id: "ITDSA_W1_Q18",
    type: "multiple-choice",
    text: "In the Supertype/Subtype hierarchy, if a query requests the moduleName of a CERTIFICATE, where does the DBMS look for this attribute?",
    options: [
      "The CERTIFICATE table",
      "The MODULE table",
      "Both tables simultaneously",
      "The Metadata only"
    ],
    correctAnswers: ["The MODULE table"],
    points: 4,
    explanation: "In a Supertype/Subtype hierarchy, common attributes like moduleName are stored in the supertype (MODULE), while type-specific attributes are stored in the subtypes.",
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
    explanation: "Breaking the address into atomic parts allows for efficient querying and sorting by specific criteria, such as City, which would be difficult if it were stored as a single long string.",
  },
  {
    id: "ITDSA_W1_Q20",
    type: "open-ended",
    text: "The current model shows STUDENT linked to CAMPUS with a 1..1 relationship. To allow a student to study at multiple campuses simultaneously, what specific relationship type must replace this?",
    correctAnswers: ["Many-to-Many", "Many to Many", "*:*", "M:N"],
    points: 4,
    explanation: "The relationship must be changed to Many-to-Many so a student can link to multiple campuses simultaneously and each campus can have many students.",
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
    text: "Scenario: You are modeling \"WhatsApp.\" A User is a member of a Group, but a User also has a list of Contacts (who are also Users). Draw or describe how you would model the Contact List relationship using the building blocks from what you've learned this week.",
    "correctAnswers": [
    {
      "text": "**Conceptual Approach:**\n\nTo model a contact list where users are connected to other users, a **Unary (Self-Referencing) Relationship** is used. Since one user can have many contacts, and one user can be a contact for many other people, this is technically a Many-to-Many (M:N) recursive relationship. \nIn a physical implementation, this requires a junction table (e.g., `ContactList`) to resolve the M:N relationship, with two foreign keys both referencing the `User` table.",
      "diagram": {
        "type": "mermaid",
        "code": "erDiagram\n    USER ||--o{ CONTACT_LIST : \"is the owner of\"\n    USER ||--o{ CONTACT_LIST : \"is added as a contact in\"\n    USER {\n        int userID PK\n        string displayName\n        string phoneNumber\n    }\n    CONTACT_LIST {\n        int ownerID FK\n        int contactID FK\n        datetime dateAdded\n    }"
      }
    }
  ],
    points: 10,
    explanation: "This is a self-referencing relationship on the USER entity. One user can have many other users as contacts, represented by a looped relationship line back to the same entity.",
  },

  // ========================================
  // Part 6: Business Rules & Data Modelling (4 questions)
  // ========================================
  {
    id: "ITDSA_W1_Q22",
    type: "multiple-choice",
    text: "A business rule states: \"A student cannot register if their current study duration exceeds the numOfMonths defined in the Certificate.\" Is this rule enforced by the Structure (ERD) or by the Process (Application Logic)?",
    options: [
      "Structure (ERD)",
      "Process (Application Logic)"
    ],
    correctAnswers: ["Process (Application Logic)"],
    points: 4,
    explanation: "Rules involving complex temporal comparisons like current duration versus defined duration are typically handled by application logic or database triggers rather than the ERD structure.",
  },
  {
    id: "ITDSA_W1_Q23",
    type: "open-ended",
    text: "\"The sum of assessment percentages must equal 100%.\" Since the ERD diagram cannot enforce this calculation, where in the DBMS system does this logic live?",
    correctAnswers: ["Check Constraint", "Application Logic", "DBMS Engine", "Check Constraint / Application Logic"],
    points: 4,
    explanation: "This logic lives in check constraints or database triggers because the ERD cannot enforce calculations directly; the DBMS enforces the business rule during data entry or update.",
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
    "correctAnswers": [
    {
      "text": "**Business Rule Implementation:**\n\nThis scenario is modeled using a **Recursive (Self-Referencing) Relationship** on the `COMMENT` entity. A single `COMMENT` table contains a foreign key (e.g., `parentCommentID`) that references its own primary key (`commentID`). \n\nIf the `parentCommentID` is null, it is a top-level comment; if it contains a value, it is a reply. Additionally, each comment maintains a relationship with the `VIDEO` entity to ensure it belongs to a specific piece of content.",
      "diagram": {
        "type": "mermaid",
        "code": "erDiagram\n    VIDEO ||--o{ COMMENT : \"contains\"\n    COMMENT ||--o{ COMMENT : \"is replied to by\"\n    VIDEO {\n        int videoID PK\n        string title\n    }\n    COMMENT {\n        int commentID PK\n        int videoID FK\n        int parentCommentID FK\n        string contentText\n    }"
      }
    }
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
    explanation: "Each invoice must be linked to exactly one client, contain at least one line item, and be associated with exactly one branch, reflecting the explicit business rules visible in the invoice image.",
    image: {
      src: "/images/ITDSA_W1_Q25.png",
      alt: "Sample invoice showing client, branch, and line items with business rules",
      caption: "Invoice Example: Visual representation of three core business rules"
    }
  }
];
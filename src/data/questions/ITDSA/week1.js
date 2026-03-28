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
    points: 4
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
    }
  },
  {
    id: "ITDSA_W1_Q7",
    type: "open-ended",
    text: "Consider the YouTube case study. Beyond just \"organization,\" what specific factor makes a manual file system (filing cabinets) impossible for YouTube?",
    correctAnswers: ["Volume", "Access Speed", "Retrieval Time", "Concurrency"],
    points: 4,
    validationOptions: {
      requiredTerms: ["volume", "access speed", "retrieval time", "concurrency"],
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
    points: 10
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
    points: 4
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
    points: 4
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
    points: 4
  },
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
    points: 10
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
    points: 10
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
];
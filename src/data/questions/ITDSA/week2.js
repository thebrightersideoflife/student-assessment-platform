// ITDSA — Week 2
// Assessment Criteria: 1.4 Data models | 1.5 Building blocks | 1.6 Business rules |
//   2.1 Keys | 2.2 Integrity | 2.3 Relational algebra | 2.4 ER model |
//   2.5 ER diagram | 2.6 Extended ER | 2.7 Normalization
export default [
  // ========================================
  // Part 1: Data Models and Significance (3 questions)
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
  // ========================================
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
    points: 10
  },

  // ========================================
  // Part 6: Entity-Relationship Model (3 questions)
  // ========================================
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
    points: 4
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
    points: 10
  },

  // ========================================
  // Part 8: Normalization and Entity Clustering (3 questions)
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
];
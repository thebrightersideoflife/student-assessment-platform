// File: src/data/questions/ITDSA/week4.js
// Week 4 — Database Systems: Lifecycle, Design & Relational Algebra
// Total: 50 Marks

export default [

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 1 SCENARIO — Global Logistics Corporation
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITDSA_W4_Q1",
    type: "scenario",
    title: "Question 1: Global Logistics Corporation (GLC) — 25 Marks",
    context: `Global Logistics Corporation (GLC) operates across multiple countries, managing freight, warehousing, and delivery services. The company currently uses separate legacy systems for: Shipment Tracking, Warehouse Inventory, Customer Orders, and Billing and Finance.

These systems are not integrated, resulting in inconsistent shipment data across departments, duplicate customer records, delays in updating inventory levels, and poor reporting accuracy.

To resolve these issues, GLC plans to implement a centralised relational database system. A database development team has been formed, including database designers, system analysts, department managers, end users, and external auditors (for compliance).

The organisation must also comply with international data regulations and ensure high data integrity and security.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.1 — DBLC Phases  (9 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W4_Q1_1A",
    type: "multiple-choice",
    sectionLabel: "1.1 Part A",
    text: "GLC's system analysts are conducting interviews with department managers and end users to document inconsistencies such as duplicate customer records and mismatched shipment data. Which phase of the Database Life Cycle (DBLC) does this activity belong to?",
    options: [
      "Physical Design",
      "Database Initial Study / Requirements Analysis",
      "Implementation",
      "Maintenance & Evaluation",
    ],
    correctAnswers: ["Database Initial Study / Requirements Analysis"],
    points: 3,
  },

  {
    id: "ITDSA_W4_Q1_1B",
    type: "multiple-choice",
    sectionLabel: "1.1 Part B",
    text: "During which DBLC phase would the GLC team create Entity-Relationship Diagrams (ERDs), define primary keys and foreign keys, and apply normalisation to eliminate data redundancy?",
    options: [
      "Database Initial Study",
      "Implementation",
      "Database Design (Conceptual & Logical)",
      "Maintenance",
    ],
    correctAnswers: ["Database Design (Conceptual & Logical)"],
    points: 3,
  },

  {
    id: "ITDSA_W4_Q1_1C",
    type: "show-answer",
    sectionLabel: "1.1 Part C",
    text: "Critically discuss how the Implementation and Maintenance phase of the DBLC directly addresses GLC's challenges with legacy data migration and ongoing compliance with international data regulations. In your answer, identify at least two key activities within this phase and justify why this phase is critical to GLC's success.",
    correctAnswers: [
      "The Implementation and Maintenance phase involves building and sustaining the database system. Key activities include: (1) DBMS installation and table creation — the physical database is built from the logical design; (2) Data migration — legacy data from GLC's four siloed systems (shipment, inventory, orders, billing) must be cleaned, transformed, and loaded carefully to avoid carrying forward duplicates and inconsistencies; (3) Testing, user training, and deployment — ensures the system works correctly before go-live; (4) Ongoing maintenance — includes backups, security patching, performance tuning, and audit logging to comply with international data regulations. This phase is critical because even a perfectly designed database will fail in production without proper migration (corrupted or lost data), security controls (regulatory breaches), and performance tuning (slow queries across large logistics datasets). Without maintenance, the system degrades over time.",
    ],
    markingGuide:
      "Award 1 mark for a clear definition of the phase. Award 1 mark for identifying and describing at least two key activities (migration, testing, maintenance, security). Award 1 mark for explicit application to GLC — must mention legacy data migration OR compliance with international regulations. Deduct marks for generic answers with no scenario linkage.",
    points: 3,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.2 — Integrity Constraints  (9 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W4_Q1_2A",
    type: "fill-in-the-blank",
    sectionLabel: "1.2 Part A",
    text: "If a user attempts to insert a Shipment record with a CustomerID that does not exist in the Customer table, the system will trigger a violation of ___ integrity. This constraint is enforced using a ___ key.",
    blanks: [
      {
        id: "b1",
        options: ["Entity", "Referential", "Domain", "User-defined"],
        correctAnswer: "Referential",
      },
      {
        id: "b2",
        options: ["Primary", "Candidate", "Foreign", "Composite"],
        correctAnswer: "Foreign",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W4_Q1_2B",
    type: "open-ended",
    sectionLabel: "1.2 Part B",
    text: "GLC requires that every shipment record can be uniquely identified in the database. No two shipments may share the same identifier, and the identifier field cannot be left empty. Which integrity constraint enforces this rule?",
    correctAnswers: [
      "Entity Integrity",
      "Primary Key Constraint",
      "Entity integrity",
      "Primary key",
    ],
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
    },
    points: 2,
  },

  {
    id: "ITDSA_W4_Q1_2C",
    type: "multiple-choice",
    sectionLabel: "1.2 Part C",
    text: "GLC's database includes a ShipmentStatus field. A data entry error results in the value 'Unknown123' being stored — a value that does not belong to the valid set {Pending, In Transit, Delivered}. Which integrity constraint has been violated, and what is the consequence?",
    options: [
      "Referential Integrity — orphan records are created in related tables.",
      "Entity Integrity — the shipment cannot be uniquely identified.",
      "Domain Constraint — invalid data reduces reporting accuracy and decision-making quality.",
      "User-Defined Integrity — business rules outside the schema are broken.",
    ],
    correctAnswers: [
      "Domain Constraint — invalid data reduces reporting accuracy and decision-making quality.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W4_Q1_2D",
    type: "show-answer",
    sectionLabel: "1.2 Part D",
    text: "Identify and explain THREE integrity constraints that GLC must enforce in its centralised database. For each constraint, provide a relevant example from the GLC scenario and explain the consequence if it is not enforced.",
    correctAnswers: [
      "1. Entity Integrity (Primary Key Constraint): Ensures every table has a unique, non-null primary key. Example: Each shipment must have a unique ShipmentID. Consequence: Without this, duplicate or null IDs make it impossible to uniquely identify shipments, causing tracking errors and data inconsistency.\n\n2. Referential Integrity (Foreign Key Constraint): Ensures foreign key values always reference existing primary keys in related tables. Example: A Shipment record must reference a valid CustomerID that exists in the Customer table. Consequence: Without this, orphan records exist (shipments linked to non-existent customers), resulting in invalid relationships and unreliable reporting.\n\n3. Domain Constraints: Ensure attribute values fall within a defined valid range or set of values. Example: The ShipmentStatus field must only accept values from {Pending, In Transit, Delivered}. Consequence: Without this, invalid values such as 'Unknown123' enter the system, degrading data quality and misleading operational reports.",
    ],
    markingGuide:
      "3 marks per constraint (× 3 = 9 marks). Per constraint: 1 mark for clear definition, 1 mark for a relevant GLC-specific example, 1 mark for a clearly stated consequence of violation. Deduct marks for constraints listed without examples or consequences. Generic textbook definitions with no scenario application are capped at 1 mark per constraint.",
    points: 9,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.3 — Design Levels  (7 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W4_Q1_3A",
    type: "multiple-choice",
    sectionLabel: "1.3 Part A",
    text: "During GLC's database project, the team must decide whether to store the WarehouseID field as an INT or a VARCHAR data type, and whether to create an index on the ShipmentDate column for faster queries. At which level of database design do these decisions occur?",
    options: [
      "Conceptual Design",
      "Logical Design",
      "Physical Design",
      "Requirements Analysis",
    ],
    correctAnswers: ["Physical Design"],
    points: 2,
  },

  {
    id: "ITDSA_W4_Q1_3B",
    type: "fill-in-the-blank",
    sectionLabel: "1.3 Part B",
    text: "Database design progresses through three levels. The ___ design level produces a technology-independent ERD showing entities and relationships. The ___ design level converts this into relational tables with defined keys and constraints. The ___ design level determines how data is physically stored and accessed on disk.",
    blanks: [
      {
        id: "b1",
        options: ["Physical", "Logical", "Conceptual", "Implementation"],
        correctAnswer: "Conceptual",
      },
      {
        id: "b2",
        options: ["Physical", "Logical", "Conceptual", "Implementation"],
        correctAnswer: "Logical",
      },
      {
        id: "b3",
        options: ["Physical", "Logical", "Conceptual", "Implementation"],
        correctAnswer: "Physical",
      },
    ],
    points: 3,
  },

  {
    id: "ITDSA_W4_Q1_3C",
    type: "show-answer",
    sectionLabel: "1.3 Part C",
    text: "Discuss the role of conceptual, logical, and physical database design in GLC's project. Your answer must compare all three levels, explain how each contributes to system success, and show how data representation moves from abstract to implementation.",
    correctAnswers: [
      "Conceptual Design: A high-level, technology-independent model representing entities, relationships, and business rules via ERDs. Role in GLC: Defines core entities such as Customer, Shipment, Warehouse, and Order, ensuring all stakeholders share a common understanding of the system structure before any technical decisions are made.\n\nLogical Design: Transforms the conceptual model into relational tables, defining primary keys, foreign keys, and constraints. Role in GLC: Ensures integration across departments by enforcing structured relationships and normalisation, eliminating the duplication currently caused by siloed legacy systems.\n\nPhysical Design: Determines how data is stored and accessed, including indexing strategies, storage structures, and performance tuning. Role in GLC: Ensures efficient querying of large logistics datasets and supports system scalability as GLC expands across multiple countries.\n\nFlow: Data moves from Conceptual (what data exists) → Logical (how data is structured) → Physical (how data is stored and accessed). This progression ensures the final system is understandable to stakeholders, structurally sound, and performant under real operational loads.",
    ],
    markingGuide:
      "Award 2 marks for Conceptual Design (definition + GLC application). Award 2 marks for Logical Design (definition + GLC application). Award 2 marks for Physical Design (definition + GLC application). Award 1 mark for a clear explanation of the flow/progression between the three levels. Distinction answers explicitly connect each level to GLC's integration challenges.",
    points: 7,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 2 SCENARIO — Online Retail Platform
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITDSA_W4_Q2",
    type: "scenario",
    title: "Question 2: Online Retail Platform — 25 Marks",
    context: `You are working with a database for an online retail platform. The following business rules govern the system:

BR1: A customer can place many orders; each order belongs to exactly one customer.
BR2: An order can contain many products; each product can appear in many orders.
BR3: Each product belongs to exactly one category; a category can have many products.
BR4: Each order records the quantity of each product purchased.

The following relations are used in the system:
CUSTOMER(CustomerID, Name, City)
ORDER(OrderID, CustomerID, OrderDate)
ORDER_ITEM(OrderID, ProductID, Quantity)
PRODUCT(ProductID, ProductName, Price)
CATEGORY(CategoryID, CategoryName)`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.1 — ERD  (12 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W4_Q2_1A",
    type: "multiple-choice",
    sectionLabel: "2.1 Part A",
    text: "According to the business rules for the online retail platform, what type of relationship exists between the ORDER entity and the PRODUCT entity, and how must it be resolved in a relational database?",
    options: [
      "One-to-Many (1:M) — resolved by adding ProductID directly into the ORDER table.",
      "Many-to-Many (M:N) — resolved by creating a bridge/associative entity named ORDER_ITEM.",
      "One-to-One (1:1) — resolved by merging ORDER and PRODUCT into a single table.",
      "Many-to-Many (M:N) — resolved by adding a direct M:N link between the two tables.",
    ],
    correctAnswers: [
      "Many-to-Many (M:N) — resolved by creating a bridge/associative entity named ORDER_ITEM.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W4_Q2_1B",
    type: "fill-in-the-blank",
    sectionLabel: "2.1 Part B",
    text: "In the ORDER_ITEM table, the combination of OrderID and ProductID together forms a ___ primary key. Each of these fields is also a ___ key that references its respective parent table.",
    blanks: [
      {
        id: "b1",
        options: ["Simple", "Composite", "Candidate", "Surrogate"],
        correctAnswer: "Composite",
      },
      {
        id: "b2",
        options: ["Primary", "Candidate", "Foreign", "Natural"],
        correctAnswer: "Foreign",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W4_Q2_1C",
    type: "multiple-choice",
    sectionLabel: "2.1 Part C",
    text: "Business Rule BR4 states that 'each order records the quantity of each product purchased.' In the ERD, where should the Quantity attribute be placed?",
    options: [
      "On the PRODUCT entity, as it describes a product property.",
      "On the ORDER entity, as it belongs to the order.",
      "On the ORDER_ITEM associative entity, as it describes the relationship between a specific order and a specific product.",
      "On both ORDER and PRODUCT as a shared attribute.",
    ],
    correctAnswers: [
      "On the ORDER_ITEM associative entity, as it describes the relationship between a specific order and a specific product.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W4_Q2_1D",
    type: "show-answer",
    sectionLabel: "2.1 Part D",
    text: "Design a complete Entity-Relationship Diagram (ERD) for the online retail platform using Crow's Foot notation. Your design must include all entities, attributes, primary keys, foreign keys, resolved many-to-many relationships, and correct cardinalities. Present your answer using Mermaid.js ERD syntax.",
    correctAnswers: ["ERD diagram provided in the diagram field below."],
    markingGuide:
      "Award 4 marks for all entities with correct attributes (CUSTOMER, ORDER, PRODUCT, CATEGORY, ORDER_ITEM — 1 mark for each entity with at least its PK and key attributes). Award 3 marks for correct PK/FK notation (PKs on all entities, FKs on ORDER, PRODUCT, ORDER_ITEM). Award 3 marks for correct relationships and cardinalities using Crow's Foot notation (1 mark per correct relationship). Award 2 marks for correctly resolving the M:N between ORDER and PRODUCT using ORDER_ITEM with Quantity placed on the junction table. Missing cardinalities: major mark loss. Quantity on PRODUCT or ORDER instead of ORDER_ITEM: lose resolution marks.",
    diagram: {
      type: "mermaid",
      code: `erDiagram
  CUSTOMER {
    int CustomerID PK
    string Name
    string City
  }
  ORDER {
    int OrderID PK
    date OrderDate
    int CustomerID FK
  }
  PRODUCT {
    int ProductID PK
    string ProductName
    float Price
    int CategoryID FK
  }
  CATEGORY {
    int CategoryID PK
    string CategoryName
  }
  ORDER_ITEM {
    int OrderID FK
    int ProductID FK
    int Quantity
  }
  CUSTOMER ||--o{ ORDER : "places"
  ORDER ||--o{ ORDER_ITEM : "contains"
  PRODUCT ||--o{ ORDER_ITEM : "included_in"
  CATEGORY ||--o{ PRODUCT : "categorises"`,
    },
    points: 12,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.2 — Relational Tables  (6 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W4_Q2_2A",
    type: "multiple-choice",
    sectionLabel: "2.2 Part A",
    text: "When transforming the online retail ERD into relational tables, which of the following correctly represents the ORDER_ITEM relation with its key notation?",
    options: [
      "ORDER_ITEM(OrderItemID PK, OrderID, ProductID, Quantity)",
      "ORDER_ITEM(OrderID PK/FK, ProductID PK/FK, Quantity)",
      "ORDER_ITEM(OrderID FK, ProductID FK, Quantity PK)",
      "ORDER_ITEM(OrderID PK, ProductID, Quantity FK)",
    ],
    correctAnswers: ["ORDER_ITEM(OrderID PK/FK, ProductID PK/FK, Quantity)"],
    points: 2,
  },

  {
    id: "ITDSA_W4_Q2_2B",
    type: "fill-in-the-blank",
    sectionLabel: "2.2 Part B",
    text: "In the relational schema for this platform, the PRODUCT table contains a ___ key called CategoryID that references the ___ table, enforcing referential integrity between products and their classifications.",
    blanks: [
      {
        id: "b1",
        options: ["Primary", "Foreign", "Composite", "Candidate"],
        correctAnswer: "Foreign",
      },
      {
        id: "b2",
        options: ["ORDER", "ORDER_ITEM", "CATEGORY", "CUSTOMER"],
        correctAnswer: "CATEGORY",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W4_Q2_2C",
    type: "show-answer",
    sectionLabel: "2.2 Part C",
    text: "Transform your ERD from Q2.1 into a complete relational schema. List all five relations (tables), clearly indicating Primary Keys (PK) and Foreign Keys (FK) for each relation. Ensure the design follows relational database rules.",
    correctAnswers: [
      `CUSTOMER(CustomerID PK, Name, City)
ORDER(OrderID PK, OrderDate, CustomerID FK)
CATEGORY(CategoryID PK, CategoryName)
PRODUCT(ProductID PK, ProductName, Price, CategoryID FK)
ORDER_ITEM(OrderID PK/FK, ProductID PK/FK, Quantity)`,
    ],
    markingGuide:
      "Award 3 marks for all five tables present and correctly named. Award 3 marks for correct PK/FK notation: 0.5 mark per table for correct key marking. Key check — ORDER_ITEM must show composite PK (OrderID PK/FK + ProductID PK/FK). Missing FK notation: deduct 0.5 per instance. Missing composite key indication on ORDER_ITEM: deduct 1 mark.",
    points: 6,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.3 — Relational Algebra  (7 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W4_Q2_3A",
    type: "multiple-choice",
    sectionLabel: "2.3 (a)",
    text: "Which relational algebra expression correctly retrieves the names of all customers who live in Johannesburg?",
    options: [
      "σ_Name(π_City='Johannesburg'(CUSTOMER))",
      "π_Name(σ_City='Johannesburg'(CUSTOMER))",
      "σ_City='Johannesburg'(π_Name(CUSTOMER))",
      "π_City='Johannesburg'(σ_Name(CUSTOMER))",
    ],
    correctAnswers: ["π_Name(σ_City='Johannesburg'(CUSTOMER))"],
    points: 1,
  },

  {
    id: "ITDSA_W4_Q2_3B",
    type: "multiple-choice",
    sectionLabel: "2.3 (b)",
    text: "Which relational algebra expression correctly retrieves the OrderIDs and OrderDates for all orders placed by customers who live in Johannesburg?",
    options: [
      "π_OrderID,OrderDate(σ_City='Johannesburg'(ORDER))",
      "π_OrderID,OrderDate(σ_City='Johannesburg'(CUSTOMER) ⋈ ORDER)",
      "σ_City='Johannesburg'(π_OrderID,OrderDate(CUSTOMER ⋈ ORDER))",
      "π_OrderID,OrderDate(CUSTOMER ⋈ σ_City='Johannesburg'(ORDER))",
    ],
    correctAnswers: [
      "π_OrderID,OrderDate(σ_City='Johannesburg'(CUSTOMER) ⋈ ORDER)",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W4_Q2_3C",
    type: "multiple-choice",
    sectionLabel: "2.3 (c)",
    text: "Which expression correctly retrieves the ProductNames of all products that have been ordered with a quantity greater than 10?",
    options: [
      "π_ProductName(σ_Quantity>10(PRODUCT ⋈ ORDER_ITEM))",
      "σ_Quantity>10(π_ProductName(ORDER_ITEM))",
      "π_ProductName(σ_Quantity>10(ORDER_ITEM) ⋈ PRODUCT)",
      "π_ProductName(σ_Price>10(PRODUCT))",
    ],
    correctAnswers: [
      "π_ProductName(σ_Quantity>10(ORDER_ITEM) ⋈ PRODUCT)",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W4_Q2_3D",
    type: "show-answer",
    sectionLabel: "2.3 (d)",
    text: "Write a relational algebra expression to retrieve the Customer Names and Product Names for all orders placed. Show any intermediate steps clearly using correct relational algebra notation (σ, π, ⋈).",
    correctAnswers: [
      "Step 1 — Join all relevant relations:\nCUSTOMER ⋈ ORDER ⋈ ORDER_ITEM ⋈ PRODUCT\n\nStep 2 — Project only the required attributes:\nπ_Name,ProductName(CUSTOMER ⋈ ORDER ⋈ ORDER_ITEM ⋈ PRODUCT)\n\nFull expression:\nπ_Name,ProductName(CUSTOMER ⋈ ORDER ⋈ ORDER_ITEM ⋈ PRODUCT)",
    ],
    markingGuide:
      "Award 1 mark for identifying that all four tables must be joined. Award 1 mark for the correct join chain (CUSTOMER ⋈ ORDER ⋈ ORDER_ITEM ⋈ PRODUCT — natural joins on shared keys). Award 0.75 mark for the correct projection π_Name,ProductName applied to the joined result. Deduct marks if the join is missing any table required to link customers to products. Missing the PROJECT (π) operator: lose the projection mark.",
    points: 2,
  },
];
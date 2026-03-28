// ITDSA — Week 3
// Sections: A Multiple Choice | B Open-Ended | C Show-Answer (Synthesis) | D Hell-Level Scenarios
// Assessment Criteria: 2.8, 2.9, 2.10, 4.9
export default [
  // ========================================
  // SECTION A — Multiple Choice
  // ========================================
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
  },

  // ========================================
  // SECTION C — Multiple Choice (Advanced Concepts)
  // Assessment Criteria: 2.8, 2.9, 2.10
  // ========================================
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
  },

  // ========================================
  // SECTION C (cont.) — Open-Ended (Strictly 1–2 Words)
  // Assessment Criteria: 2.8, 2.9, 2.10
  // ========================================
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
  },

  // ========================================
  // SECTION D — Pure Hell-Level Scenario Questions
  // Assessment Criteria: 2.8, 2.9, 2.10, 4.9
  // ========================================
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
  },
  {
    id: "ITDSA_W3_Q25",
    type: "show-answer",
    text: "A globally distributed retail system must remain operational during regional network failures and peak sales events. The architects configure the system to prioritize AVAILABILITY and PARTITION TOLERANCE. Which CAP property is sacrificed, and how does this affect data consistency across global regions?",
    correctAnswers: [
      "The property sacrificed is CONSISTENCY (C in the CAP theorem). According to CAP theorem, a distributed system can guarantee at most two of the three properties (Consistency, Availability, Partition Tolerance) simultaneously. By choosing Availability (A) + Partition Tolerance (P), the system accepts the following consequences: (1) During a network partition (e.g., the Johannesburg region loses connectivity to the London region), both nodes continue to accept read and write requests independently. (2) A customer in Johannesburg may see a product listed as 'In Stock' while London has already sold the last unit — the inventory states diverge. (3) The system achieves EVENTUAL CONSISTENCY: once the partition heals, the nodes synchronize and converge to a consistent state, but no guarantee is made about real-time accuracy. (4) Business impact: Overselling is possible during partitions (a known trade-off in e-commerce at scale, e.g., Amazon, Takealot). Mitigation strategies include conflict resolution policies (last-write-wins, version vectors) and compensation logic (automated refunds for oversold items)."
    ],
    points: 10
  }
];
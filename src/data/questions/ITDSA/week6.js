// File: src/data/questions/ITDSA/week6.js
// Week 6 — Distributed Database Architecture, CAP Theorem & Business Intelligence
// Total: 50 Marks

export default [

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 1 SCENARIO — OmniStream Global
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITDSA_W6_Q1",
    type: "scenario",
    title: "Question 1: OmniStream Global — Distributed Database Architecture & The CAP Theorem (25 Marks)",
    context: `OmniStream Global is a multinational media streaming and content delivery network operating massive data centres in North America, Europe, and Asia. Their current centralised architecture is causing high network latency for remote users and total system outages during localised server maintenance.

The CTO has mandated a transition to a Distributed DBMS (DDBMS). The new architecture must handle two highly distinct workloads:

  1. The User Profile & Wallet System — manages subscription billing, payment processing, and user account ledgers.
  2. The Content Delivery & Recommendation System — manages the real-time content catalogue, user watch-history tracking, and dynamic content recommendations.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.1 — Distribution Levels  (8 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W6_Q1_1A",
    type: "multiple-choice",
    sectionLabel: "1.1 Part A",
    text: "OmniStream currently operates a Multiple-Site Processing, Single-Site Data (MSP-SSD) model — regional nodes handle requests, but all data is stored in one centralised location. A European user experiences 280ms latency when loading their profile. Which architectural weakness does this directly expose, and why does MSP-SSD fail to resolve OmniStream's core problem?",
    options: [
      "MSP-SSD fails because distributed processing always increases query complexity — a single-site processing model would be faster.",
      "MSP-SSD fails because while processing is distributed, all data reads and writes must still travel to the single central data store, preserving the latency bottleneck and single point of failure for remote regions.",
      "MSP-SSD fails because it prevents replication — without replication, the system cannot achieve partition tolerance under the CAP Theorem.",
      "MSP-SSD fails because multiple processing sites cannot share a single transaction log, causing ACID violations.",
    ],
    correctAnswers: [
      "MSP-SSD fails because while processing is distributed, all data reads and writes must still travel to the single central data store, preserving the latency bottleneck and single point of failure for remote regions.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W6_Q1_1B",
    type: "multiple-choice",
    sectionLabel: "1.1 Part B",
    text: "OmniStream's CTO wants a truly global, scalable, and fault-tolerant architecture. If the European data centre goes offline for maintenance, North American and Asian users must be completely unaffected — and users in all regions must experience low latency at all times. Which distribution level achieves this, and what is its defining characteristic?",
    options: [
      "Multiple-Site Processing, Single-Site Data (MSP-SSD) — processing is distributed but data remains centralised for consistency.",
      "Single-Site Processing, Multiple-Site Data (SSP-MSD) — one processing node manages all distributed data storage nodes.",
      "Multiple-Site Processing, Multiple-Site Data (MSP-MSD) — both processing and data are fully distributed across all regional nodes, enabling local data access and independent node operation.",
      "Single-Site Processing, Single-Site Data (SSP-SSD) — the simplest model, suitable for global scale with cloud acceleration.",
    ],
    correctAnswers: [
      "Multiple-Site Processing, Multiple-Site Data (MSP-MSD) — both processing and data are fully distributed across all regional nodes, enabling local data access and independent node operation.",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W6_Q1_1C",
    type: "show-answer",
    sectionLabel: "1.1 Part C",
    text: "Identify and evaluate two multi-site levels of data and process distribution relevant to OmniStream. Then recommend which specific level OmniStream should adopt to achieve a truly global, scalable, and fault-tolerant architecture, providing a strong technical justification for your choice.",
    correctAnswers: [
      "Level 1 — Multiple-Site Processing, Single-Site Data (MSP-SSD): Processing tasks are distributed across OmniStream's regional nodes, but all data remains stored at a single centralised location. While this improves processing parallelism (regional nodes handle requests), all data reads and writes must still traverse the network to the central store. This preserves the high latency problem for remote regions and maintains a critical single point of failure — if the central data store goes offline, the entire system fails regardless of how many processing nodes are running.\n\nLevel 2 — Multiple-Site Processing, Multiple-Site Data (MSP-MSD): Both processing tasks and data are fully distributed across OmniStream's North American, European, and Asian nodes. Each regional site stores its own data locally (or accesses nearby replicas), and queries are executed in parallel at each node. This is the architecture of modern distributed systems such as Apache Cassandra and Google Spanner.\n\nRecommendation — OmniStream must adopt MSP-MSD.\nJustification: MSP-MSD directly solves both of OmniStream's stated problems. First, latency: European users query the European node and receive responses without round-tripping to North America, dramatically reducing response times. Second, fault tolerance: if the European data centre goes offline for maintenance, the North American and Asian nodes continue operating independently on their local data — eliminating the single point of failure that caused total outages under the legacy centralised architecture. MSP-MSD is the only distribution level that provides genuine scalability and regional independence simultaneously.",
    ],
    markingGuide:
      "Award 2 marks per distribution level evaluated (× 2 = 4 marks): 1 mark for a clear definition, 1 mark for applying the level to OmniStream's context. Award 4 marks for the recommendation and justification: 1 mark for recommending MSP-MSD, 3 marks for a justification that addresses all three criteria — global scalability, latency reduction, and fault tolerance — with explicit reference to OmniStream's scenario. Answers recommending MSP-MSD without justifying against both problems earn a maximum of 2/4 for the recommendation section.",
    points: 8,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.2 — CAP Theorem  (9 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W6_Q1_2A",
    type: "fill-in-the-blank",
    sectionLabel: "1.2 Part A",
    text: "The CAP Theorem states that a distributed system can only guarantee two of three properties simultaneously. Complete the definitions: ___ ensures every read returns the most recent write or an error, so all nodes reflect identical data. ___ ensures every request receives a non-error response regardless of node failures. ___ ensures the system continues to operate despite network communication breaks between nodes.",
    blanks: [
      {
        id: "b1",
        options: ["Consistency", "Availability", "Partition Tolerance", "Atomicity"],
        correctAnswer: "Consistency",
      },
      {
        id: "b2",
        options: ["Consistency", "Availability", "Partition Tolerance", "Durability"],
        correctAnswer: "Availability",
      },
      {
        id: "b3",
        options: ["Consistency", "Availability", "Partition Tolerance", "Isolation"],
        correctAnswer: "Partition Tolerance",
      },
    ],
    points: 3,
  },

  {
    id: "ITDSA_W6_Q1_2B",
    type: "multiple-choice",
    sectionLabel: "1.2 Part B",
    text: "A fibre-optic cut severs the network link between OmniStream's European and Asian nodes. A user in Tokyo attempts to update their billing information at the exact moment of the partition. OmniStream's User Profile & Wallet System must choose its CAP trade-off. Which decision is technically correct, and why?",
    options: [
      "Prioritise AP — allow the billing update to proceed in Tokyo, accept that Europe may temporarily hold a different balance, and reconcile later.",
      "Prioritise CP — reject or queue the billing update until the partition heals and global consistency can be guaranteed, accepting temporary unavailability of the wallet service.",
      "Prioritise CA — maintain both consistency and availability by disabling partition tolerance, as network failures are rare in production systems.",
      "Prioritise CP — allow the billing update and immediately replicate it to Europe using an asynchronous background job.",
    ],
    correctAnswers: [
      "Prioritise CP — reject or queue the billing update until the partition heals and global consistency can be guaranteed, accepting temporary unavailability of the wallet service.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W6_Q1_2C",
    type: "show-answer",
    sectionLabel: "1.2 Part C",
    text: "Explain the three guarantees of the CAP Theorem. Then classify OmniStream's User Profile & Wallet System and the Content Delivery & Recommendation System as either CA, CP, or AP. Provide a strong technical justification for the trade-off each system must make.",
    correctAnswers: [
      "CAP Theorem Guarantees:\n• Consistency (C): Every read returns the most recent write or an error. All nodes across the distributed system reflect identical data at the same moment.\n• Availability (A): Every request receives a non-error response, regardless of node failures. The system remains operational at all times.\n• Partition Tolerance (P): The system continues to operate correctly despite arbitrary network communication failures (partitions) between nodes. In a global multi-continent system, network partitions are an unavoidable reality and cannot be sacrificed — all practical distributed systems must tolerate partitions.\n\nClassification 1 — User Profile & Wallet System → CP (Consistency + Partition Tolerance):\nFinancial ledgers and billing systems require strong consistency above all else. If a network partition occurs between Europe and Asia, the system must not allow a user to double-spend credits or process a payment that results in divergent balances across global nodes. It is categorically safer to refuse or queue the transaction (sacrifice Availability) than to allow financial data to become inconsistent. A 'Service Temporarily Unavailable' response is recoverable; a corrupted billing ledger is a regulatory and financial liability.\n\nClassification 2 — Content Delivery & Recommendation System → AP (Availability + Partition Tolerance):\nContent browsing and recommendations must prioritise high availability. If a network partition occurs, it is fully acceptable for a user in Asia to see a slightly stale recommendation list or a catalogue that does not yet reflect a title added 30 seconds ago (sacrifice strict Consistency). What is unacceptable — and directly harms user retention — is a user receiving an error when trying to stream a movie. The system must remain available. Eventual consistency is sufficient for non-financial content metadata.",
    ],
    markingGuide:
      "Award 1 mark per CAP guarantee correctly defined (× 3 = 3 marks). Award 3 marks for classifying and justifying the Wallet System as CP: 1 mark for correct classification, 2 marks for justification — must mention financial consistency, double-spend risk, and the trade-off of sacrificing availability. Award 3 marks for classifying and justifying the Content System as AP: 1 mark for correct classification, 2 marks for justification — must mention acceptable stale data, user retention impact of downtime, and eventual consistency. Classifying either system as CA earns 0 for that classification (CA is not viable in a distributed system with real partitions).",
    points: 9,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.3 — Transparency Features  (8 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W6_Q1_3A",
    type: "multiple-choice",
    sectionLabel: "1.3 Part A",
    text: "An OmniStream application developer writes the query: SELECT * FROM USER_PROFILES WHERE UserID = 10042. The DDBMS silently routes this to the European node where that user's data physically resides — the developer's code does not reference any server address or geographic location. Which transparency feature is being demonstrated?",
    options: [
      "Replication Transparency — the developer is unaware that multiple copies of the data exist.",
      "Failure Transparency — the developer is shielded from the consequences of node failures.",
      "Location Transparency — the developer is unaware of the physical location of the data and does not need to specify it.",
      "Transaction Transparency — the DDBMS ensures ACID properties are maintained across the distributed query.",
    ],
    correctAnswers: [
      "Location Transparency — the developer is unaware of the physical location of the data and does not need to specify it.",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W6_Q1_3B",
    type: "open-ended",
    sectionLabel: "1.3 Part B",
    text: "A streaming user in Frankfurt is mid-stream when OmniStream's North American server goes offline. The DDBMS automatically re-routes the user's session to the European node and completes the transaction without surfacing any error to the user or application. What is the specific name of the transparency feature that hides node failures and their recovery from end users?",
    correctAnswers: [
      "Failure Transparency",
      "failure transparency",
      "Failure transparency",
    ],
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    points: 2,
  },

  {
    id: "ITDSA_W6_Q1_3C",
    type: "show-answer",
    sectionLabel: "1.3 Part C",
    text: "For OmniStream's users and application developers, the complex multi-continent architecture must feel like a single, unified database. Select and discuss two specific distributed database transparency features. For each feature, provide a clear definition and explain how it practically benefits OmniStream's users or development teams.",
    correctAnswers: [
      "Feature 1 — Location Transparency:\nDefinition: Ensures that users and applications are completely unaware of the physical location where data is stored. Queries are written without referencing server addresses, geographical regions, or node identifiers.\nPractical Benefit for OmniStream: An OmniStream user logs in to the platform and their profile loads immediately — they have no knowledge or awareness that their account data is physically stored in the European node. A developer writing the profile lookup query does not hard-code any server address. The DDBMS transparently routes the request to the correct regional node. This dramatically simplifies application development and allows OmniStream to reorganise or expand its data infrastructure without requiring application code changes.\n\nFeature 2 — Failure Transparency:\nDefinition: Hides the occurrence of individual node failures and the recovery process from users and applications. When a node goes offline, the DDBMS silently re-routes requests to an available replica or backup node and completes the recovery without surfacing errors.\nPractical Benefit for OmniStream: If OmniStream's North American data centre undergoes emergency maintenance, users who are actively streaming or browsing are transparently redirected to the European or Asian nodes. The movie continues playing; the application does not receive a database connection error. This directly protects OmniStream from user-facing downtime, preserving the service-level agreements (SLAs) and subscriber retention that are critical for a subscription business.",
    ],
    markingGuide:
      "Award 4 marks per feature (× 2 = 8 marks): 2 marks for a clear, accurate definition of the transparency feature; 2 marks for a practical OmniStream application that demonstrates the feature's benefit to users or developers. Acceptable features include: Location, Failure, Replication, Transaction, Fragmentation, or Concurrency Transparency. Definitions without OmniStream application: capped at 2/4 per feature. Vague applications ('the user doesn't notice problems') without explaining the mechanism: capped at 3/4.",
    points: 8,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 2 SCENARIO — OmniStream Analytics Division
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITDSA_W6_Q2",
    type: "scenario",
    title: "Question 2: OmniStream Analytics Division — Business Intelligence & Data Warehousing (25 Marks)",
    context: `Following the successful DDBMS implementation, OmniStream realises they are sitting on petabytes of raw data in a massive Data Lake. Regional managers cannot easily query this raw data to make business decisions on which TV shows to license next quarter.

The Data Engineering team is tasked with building a structured Data Warehouse to support Online Analytical Processing (OLAP) and comprehensive Business Intelligence (BI) dashboards.

The regional managers have initially proposed running their historical forecasting queries directly on the live Operational Database to save costs.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.1 — Operational vs Decision Support Data  (8 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W6_Q2_1A",
    type: "multiple-choice",
    sectionLabel: "2.1 Part A",
    text: "A regional manager runs a complex 12-month historical aggregation query directly on OmniStream's live operational database during peak streaming hours. The query joins seven tables and takes 45 seconds to complete. What is the most likely and most serious technical consequence of this action for OmniStream's streaming subscribers?",
    options: [
      "The query will fail with a syntax error because operational databases do not support aggregation functions.",
      "The analytical query will consume significant CPU and RAM, lock large table segments, and degrade OLTP performance — causing buffering, transaction failures, and potential outages for live streaming users.",
      "The query will return inaccurate results because operational data is stored in a denormalised star schema format.",
      "The query will trigger automatic ETL pipelines, overwriting the operational data with summarised historical records.",
    ],
    correctAnswers: [
      "The analytical query will consume significant CPU and RAM, lock large table segments, and degrade OLTP performance — causing buffering, transaction failures, and potential outages for live streaming users.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W6_Q2_1B",
    type: "fill-in-the-blank",
    sectionLabel: "2.1 Part B",
    text: "Operational data is ___ and captures the current state in real time, whereas Decision Support data is ___ and captures trends across extended historical periods. Operational databases are optimised for high-volume ___ processing, while Data Warehouses are optimised for complex ___ processing.",
    blanks: [
      {
        id: "b1",
        options: ["transactional", "aggregated", "normalised", "archived"],
        correctAnswer: "transactional",
      },
      {
        id: "b2",
        options: ["transactional", "aggregated", "normalised", "current"],
        correctAnswer: "aggregated",
      },
      {
        id: "b3",
        options: ["OLTP", "OLAP", "ETL", "BI"],
        correctAnswer: "OLTP",
      },
      {
        id: "b4",
        options: ["OLTP", "OLAP", "ETL", "BI"],
        correctAnswer: "OLAP",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W6_Q2_1C",
    type: "show-answer",
    sectionLabel: "2.1 Part C",
    text: "OmniStream's regional managers want to run complex historical forecasting queries directly on the live Operational Database. Using four distinct characteristics, contrast Operational Data with Decision Support Data. Then use this contrast to argue why the managers' proposal would be detrimental to OmniStream.",
    correctAnswers: [
      "Characteristic 1 — Nature: Operational data is transactional and real-time, capturing individual events as they occur (e.g., a user starting a stream, a payment being processed). Decision Support data is aggregated and summarised, capturing patterns and trends across long historical periods (e.g., total streams per genre over 12 months).\n\nCharacteristic 2 — Usage: Operational data is consumed by front-line applications and systems — the streaming app, the billing engine, the authentication service. Decision Support data is consumed by analysts, managers, and strategic planners making long-term licensing and content investment decisions.\n\nCharacteristic 3 — Time Frame: Operational data captures the current state ('now'). Decision Support data captures historical trends over weeks, months, or years, enabling trend analysis and forecasting.\n\nCharacteristic 4 — Format / Structure: Operational data is highly normalised (3NF) to minimise redundancy and optimise write performance. Decision Support data is modelled using dimensional schemas (star or snowflake) optimised for fast read performance and intuitive analytical slicing.\n\nArgument Against the Managers' Proposal: Running complex multi-table historical aggregation queries on the live Operational Database would consume enormous CPU and RAM resources. Operational databases are architected for OLTP — high-frequency, short-duration transactions (e.g., starting a stream, processing a payment). Heavy analytical queries will lock large table segments, starving the OLTP engine of resources. The direct consequence for OmniStream is degraded streaming performance, transaction failures, and potential service outages for paying subscribers — the exact outcome a media company cannot afford. Data must be extracted, transformed, and loaded (ETL) into a separate Data Warehouse to isolate analytical workloads from operational systems.",
    ],
    markingGuide:
      "Award 1 mark per clearly distinct characteristic pair (× 4 = 4 marks): each must contrast operational vs decision support specifically — not just define one side. Award 4 marks for the argument against the proposal: must mention OLTP vs OLAP workload conflict, resource contention (CPU/RAM/locking), the direct impact on live subscribers, and the ETL-to-Data-Warehouse solution. Answers listing characteristics without applying them to the argument are capped at 5/8.",
    points: 8,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.2 — Star Schema Design  (9 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W6_Q2_2A",
    type: "open-ended",
    sectionLabel: "2.2 Part A",
    text: "In a multidimensional model optimised for OLAP, identify the specific table type that contains quantitative, additive metrics (such as MinutesWatched and CompletionPercentage) and is characterised by a composite primary key composed entirely of foreign keys referencing surrounding tables.",
    correctAnswers: [
      "Fact Table",
      "fact table",
      "Central Fact Table",
      "central fact table",
    ],
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    points: 2,
  },

  {
    id: "ITDSA_W6_Q2_2B",
    type: "multiple-choice",
    sectionLabel: "2.2 Part B",
    text: "OmniStream's data engineers are building a Star Schema for viewership analysis. They propose a DIM_CONTENT table with attributes: ContentID (PK), Title, Genre, ReleaseYear, and Rating. Which statement best describes the role of this table and why it belongs in a Star Schema rather than a Snowflake Schema?",
    options: [
      "DIM_CONTENT is a Fact table — it stores measurable viewership metrics linked to content identifiers.",
      "DIM_CONTENT is a Dimension table — it stores descriptive attributes about content. In a Star Schema, all content attributes are denormalised into this single flat table, minimising JOIN complexity for OLAP queries.",
      "DIM_CONTENT is a Dimension table — in a Star Schema, Genre and Rating would be split into separate normalised sub-dimension tables to eliminate redundancy.",
      "DIM_CONTENT is a Bridge table — it resolves the many-to-many relationship between users and content.",
    ],
    correctAnswers: [
      "DIM_CONTENT is a Dimension table — it stores descriptive attributes about content. In a Star Schema, all content attributes are denormalised into this single flat table, minimising JOIN complexity for OLAP queries.",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W6_Q2_2C",
    type: "show-answer",
    sectionLabel: "2.2 Part C",
    text: "Design a Star Schema for OmniStream's viewership analysis. Include one central Fact table (FACT_VIEWERSHIP) and at least three distinct Dimension tables. Clearly indicate all Primary Keys (PK) and Foreign Keys (FK). Present your answer as a structural diagram using Mermaid ERD syntax.",
    correctAnswers: [
      `FACT_VIEWERSHIP(ViewershipID PK, UserID FK, ContentID FK, DateID FK, DeviceID FK, MinutesWatched, CompletionPercentage, StreamQuality)

DIM_USER(UserID PK, SubscriptionType, JoinDate, Region, AgeGroup)
DIM_CONTENT(ContentID PK, Title, Genre, ReleaseYear, Rating, Language)
DIM_DATE(DateID PK, CalendarDate, Month, Quarter, Year, DayOfWeek)
DIM_DEVICE(DeviceID PK, DeviceType, OperatingSystem, AppVersion)

Relationships — all Dimension PKs appear as FKs in FACT_VIEWERSHIP:
DIM_USER ||--o{ FACT_VIEWERSHIP : "generates"
DIM_CONTENT ||--o{ FACT_VIEWERSHIP : "is viewed in"
DIM_DATE ||--o{ FACT_VIEWERSHIP : "records"
DIM_DEVICE ||--o{ FACT_VIEWERSHIP : "streamed via"`,
    ],
    markingGuide:
      "Award 3 marks for the central Fact table: must be named FACT_VIEWERSHIP (or equivalent), must contain at least two measurable additive metrics (e.g., MinutesWatched, CompletionPercentage), and must have a composite PK or surrogate PK with FK references to all dimensions. Award 3 marks for at least three valid Dimension tables: each must contain descriptive (non-metric) attributes and a clear PK. Acceptable dimensions include User, Content, Date, Device, Geography, Subscription. Award 3 marks for correct PK/FK relationships: every Dimension PK must appear as an FK in the Fact table, and relationships must be shown as one-to-many (Dimension → Fact). Missing metrics in the Fact table: deduct 1 mark. Fact table with no FK references: deduct all relationship marks.",
    diagram: {
      type: "mermaid",
      code: `erDiagram
    DIM_USER {
        int UserID PK
        string SubscriptionType
        string JoinDate
        string Region
        string AgeGroup
    }
    DIM_CONTENT {
        int ContentID PK
        string Title
        string Genre
        string ReleaseYear
        string Rating
        string Language
    }
    DIM_DATE {
        int DateID PK
        date CalendarDate
        int Month
        int Quarter
        int Year
        string DayOfWeek
    }
    DIM_DEVICE {
        int DeviceID PK
        string DeviceType
        string OperatingSystem
        string AppVersion
    }
    FACT_VIEWERSHIP {
        int ViewershipID PK
        int UserID FK
        int ContentID FK
        int DateID FK
        int DeviceID FK
        int MinutesWatched
        int CompletionPercentage
        string StreamQuality
    }
    DIM_USER ||--o{ FACT_VIEWERSHIP : "generates"
    DIM_CONTENT ||--o{ FACT_VIEWERSHIP : "is viewed in"
    DIM_DATE ||--o{ FACT_VIEWERSHIP : "records"
    DIM_DEVICE ||--o{ FACT_VIEWERSHIP : "streamed via"`,
    },
    points: 9,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.3 — Analytics Methodologies  (8 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W6_Q2_3A",
    type: "multiple-choice",
    sectionLabel: "2.3 Part A",
    text: "OmniStream's BI team produces a dashboard showing the top 10 most-streamed genres per region over the last 12 months, total subscriber growth quarter-over-quarter, and average watch time per device type. Which analytics methodology does this dashboard represent, and what is its defining limitation for strategic decision-making?",
    options: [
      "Prescriptive Analytics — it recommends what OmniStream should do next based on outcomes.",
      "Predictive Analytics — it uses historical patterns to forecast next quarter's most popular genres.",
      "Descriptive Analytics — it summarises what has already happened, but does not forecast future outcomes or recommend actions.",
      "Diagnostic Analytics — it identifies why certain genres outperformed others using root cause analysis.",
    ],
    correctAnswers: [
      "Descriptive Analytics — it summarises what has already happened, but does not forecast future outcomes or recommend actions.",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W6_Q2_3B",
    type: "fill-in-the-blank",
    sectionLabel: "2.3 Part B",
    text: "___ analytics leverages statistical models and machine learning algorithms to forecast future outcomes based on historical data. ___ analytics goes beyond forecasting to recommend specific actions that should be taken to achieve a desired objective. Together, these two forward-looking methodologies move OmniStream from describing ___ to optimising ___.",
    blanks: [
      {
        id: "b1",
        options: ["Predictive", "Prescriptive", "Descriptive", "Diagnostic"],
        correctAnswer: "Predictive",
      },
      {
        id: "b2",
        options: ["Predictive", "Prescriptive", "Descriptive", "Diagnostic"],
        correctAnswer: "Prescriptive",
      },
      {
        id: "b3",
        options: ["the past", "the future", "current operations", "user behaviour"],
        correctAnswer: "the past",
      },
      {
        id: "b4",
        options: ["the future", "the past", "historical trends", "data quality"],
        correctAnswer: "the future",
      },
    ],
    points: 2,
  },

  {
    id: "ITDSA_W6_Q2_3C",
    type: "show-answer",
    sectionLabel: "2.3 Part C",
    text: "OmniStream's data scientists want to apply all three analytics methodologies to maximise revenue. Define Descriptive, Predictive, and Prescriptive analytics. For each, provide one specific, practical application that OmniStream could implement in its streaming business.",
    correctAnswers: [
      "Descriptive Analytics:\nDefinition: Summarises and analyses historical data to provide insights into past performance and trends. It answers the question 'What happened?'\nOmniStream Application: OmniStream creates a BI dashboard displaying total streams per genre per region over the last 12 months, quarterly subscriber growth, and average completion rate per content type. Regional managers use this to understand which content categories drove the most engagement in the previous period.\n\nPredictive Analytics:\nDefinition: Leverages statistical models and machine learning algorithms to forecast future outcomes based on historical data patterns. It answers the question 'What is likely to happen?'\nOmniStream Application: OmniStream analyses each user's historical watch behaviour, completion rates, and content ratings alongside demographic data to predict which new releases or licensed shows they are highly likely to watch next. This powers the personalised 'Recommended for You' engine, increasing engagement and reducing churn.\n\nPrescriptive Analytics:\nDefinition: Goes beyond forecasting to recommend specific actions that should be taken to achieve desired objectives or optimise outcomes. It answers the question 'What should we do about it?'\nOmniStream Application: The system simulates multiple content licensing scenarios — modelling the cost of licensing different TV show catalogues against predicted subscriber acquisition rates from the predictive model. It outputs a specific, ranked recommendation to the content acquisition team on exactly which show licences to renew or purchase in Q3 to maximise revenue per licensing dollar spent.",
    ],
    markingGuide:
      "Award roughly 2.5 marks per analytics type (adjusted to 8 total). Per type: 1 mark for a correct definition that includes the 'question it answers' (What happened / What will happen / What should we do). 1.5 marks for a specific, realistic OmniStream application — must go beyond a generic example and reference OmniStream's streaming/content context. Vague applications ('OmniStream uses data to improve things') earn 0 for the application component. Confusing Predictive and Prescriptive is a common error — Predictive forecasts; Prescriptive recommends actions. Mixing these: deduct 1 mark per confused definition.",
    points: 8,
  },
];
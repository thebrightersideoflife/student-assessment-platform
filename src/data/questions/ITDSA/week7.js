// File: src/data/questions/ITDSA/week7.js
// Week 7 — Enterprise Big Data Architectures, Distributed Systems, Cloud & Connectivity
// Total: 50 Marks

export default [

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 1 SCENARIO — OmniCart Global
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITDSA_W7_Q1",
    type: "scenario",
    title: "Question 1: OmniCart Global — Enterprise Big Data Architectures & Distributed Systems (25 Marks)",
    context: `OmniCart Global is a multinational retail and e-commerce enterprise whose legacy monolithic relational databases are collapsing under modern data demands. The company is currently dealing with three distinct data challenges:

  1. Millions of unstructured social media reviews, product images, and customer service chat logs that cannot be stored in traditional relational tables.
  2. Continuous, high-speed streams of IoT sensor data from automated warehouse robots and a global delivery fleet that must be ingested and acted upon in near real-time.
  3. The strategic goal of mapping deeply interconnected customer relationships — analysing how a specific customer's purchase influences their social network's buying habits — to power a new real-time recommendation engine.

Management has mandated a transition to a modern Big Data ecosystem using Hadoop and NoSQL technologies.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.1 — The Three Vs of Big Data  (9 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W7_Q1_1A",
    type: "fill-in-the-blank",
    sectionLabel: "1.1 Part A",
    text: "OmniCart's three data challenges each map to a distinct Big Data characteristic. The accumulation of millions of social media reviews, product images, and chat logs maps to ___. The continuous high-speed IoT sensor streams from warehouse robots that must be processed in near real-time maps to ___. The existence of structured sensor metrics alongside unstructured images and chat logs maps to ___.",
    blanks: [
      {
        id: "b1",
        options: ["Volume", "Velocity", "Variety", "Veracity"],
        correctAnswer: "Volume",
      },
      {
        id: "b2",
        options: ["Volume", "Velocity", "Variety", "Veracity"],
        correctAnswer: "Velocity",
      },
      {
        id: "b3",
        options: ["Volume", "Velocity", "Variety", "Veracity"],
        correctAnswer: "Variety",
      },
    ],
    points: 3,
  },

  {
    id: "ITDSA_W7_Q1_1B",
    type: "multiple-choice",
    sectionLabel: "1.1 Part B",
    text: "OmniCart's IoT system ingests GPS coordinates, temperature readings, and delivery status updates from 50,000 fleet vehicles simultaneously — all of which must trigger warehouse alerts within milliseconds. Which Big Data characteristic does this most precisely exemplify, and why does a traditional batch-processing relational database fail to address it?",
    options: [
      "Volume — because 50,000 vehicles generate an enormous number of records that exceed traditional storage limits.",
      "Variety — because GPS, temperature, and status data represent three different unstructured data formats.",
      "Velocity — because data is generated and must be processed continuously in near real-time; traditional batch-processing databases cannot ingest and act on streaming data fast enough to trigger timely warehouse alerts.",
      "Veracity — because sensor data from physical devices is inherently unreliable and requires constant quality checks.",
    ],
    correctAnswers: [
      "Velocity — because data is generated and must be processed continuously in near real-time; traditional batch-processing databases cannot ingest and act on streaming data fast enough to trigger timely warehouse alerts.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W7_Q1_1C",
    type: "show-answer",
    sectionLabel: "1.1 Part C",
    text: "Evaluate how the primary Three Vs of Big Data manifest at OmniCart Global. For each characteristic, provide a clear definition and a specific example drawn directly from the scenario to justify your application.",
    correctAnswers: [
      "1. Volume — refers to the immense quantity of data generated at an unprecedented scale, making traditional storage and processing infrastructure inadequate.\nApplication to OmniCart: OmniCart faces extreme Volume through the accumulation of millions of unstructured social media reviews, product images, and customer service chat logs. The sheer count of these records overwhelms the row-and-column storage model of a relational database, necessitating a distributed storage solution like HDFS.\n\n2. Velocity — refers to the high speed at which data is generated and the requirement to process it in real-time or near real-time.\nApplication to OmniCart: OmniCart experiences high Velocity through the continuous, high-speed streams of IoT sensor data from automated warehouse robots and the global delivery fleet. This data arrives without pause and must be ingested and acted upon immediately — a characteristic that traditional batch-processing databases cannot support.\n\n3. Variety — refers to the diverse formats and types of data, encompassing structured, semi-structured, and unstructured sources.\nApplication to OmniCart: OmniCart must simultaneously handle unstructured data (social media text reviews, product images, customer chat logs) alongside structured and streaming data (numeric IoT sensor metrics). No single traditional schema can accommodate all these formats, making a flexible NoSQL or Hadoop ecosystem necessary.",
    ],
    markingGuide:
      "Award 3 marks per V (× 3 = 9 marks): 1 mark for a correct definition, 2 marks for a scenario application that explicitly references the OmniCart context. Common error: confusing Velocity (speed of data generation and ingestion) with database query speed — Velocity is about the rate of data arrival, not query performance. Students who describe Variety only as 'different file types' without distinguishing structured vs unstructured formats receive 1/2 for application.",
    points: 9,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.2 — NoSQL Database Selection  (6 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W7_Q1_2A",
    type: "multiple-choice",
    sectionLabel: "1.2 Part A",
    text: "OmniCart's recommendation engine must determine how Customer A's purchase of a product influences Customer B, who then influences Customers C and D — traversing multiple layers of social relationships to surface personalised recommendations. Which NoSQL database category is architecturally designed for this requirement, and why does a relational database fundamentally struggle with it?",
    options: [
      "Document Database (e.g., MongoDB) — stores each customer as a flexible JSON document with embedded purchase arrays, making nested data fast to retrieve.",
      "Key-Value Store (e.g., Redis) — caches customer IDs against purchase lists for O(1) lookup speed across the influence network.",
      "Column-Family Store (e.g., Cassandra) — partitions customer data across nodes for write-heavy influence tracking at scale.",
      "Graph Database (e.g., Neo4j) — stores customers and products as nodes with relationships (edges) as first-class elements, eliminating the costly multi-table JOIN operations a relational database requires to traverse multi-layered influence networks.",
    ],
    correctAnswers: [
      "Graph Database (e.g., Neo4j) — stores customers and products as nodes with relationships (edges) as first-class elements, eliminating the costly multi-table JOIN operations a relational database requires to traverse multi-layered influence networks.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W7_Q1_2B",
    type: "show-answer",
    sectionLabel: "1.2 Part B",
    text: "Select the most appropriate NoSQL database type for OmniCart's recommendation engine requirement and justify your selection. Explain why this model fundamentally outperforms a traditional RDBMS for this task, and provide one real-world example of this database technology.",
    correctAnswers: [
      "Selected Type: Graph Database.\n\nJustification: Graph databases represent data as nodes (entities — e.g., customers and products), edges (relationships — e.g., BOUGHT, KNOWS, INFLUENCES), and properties attached to both. They are specifically architected for the modelling and traversal of complex, multi-layered relationships between entities. OmniCart needs to answer queries such as 'Which products did Customer A's second-degree social connections purchase?' — a query that requires traversing multiple relationship hops.\n\nWhy it outperforms an RDBMS: A relational database stores customer-product relationships in join tables. Traversing a social influence network of even three layers requires multiple expensive SQL JOIN operations across large tables. As the network grows, JOIN complexity scales exponentially — a known weakness called the 'JOIN problem' in relational systems. A Graph database natively stores the relationship (edge) as a first-class data element, meaning traversal from one node to the next is a direct pointer follow with O(log n) or better performance regardless of network depth.\n\nReal-world Example: Neo4j (used by LinkedIn for connection graphs), Amazon Neptune, or JanusGraph.",
    ],
    markingGuide:
      "Award 2 marks for correctly identifying Graph Database. Award 3 marks for justification: 1 mark for explaining nodes/edges/properties structure, 1 mark for contrasting with RDBMS JOIN complexity, 1 mark for applying this to OmniCart's influence network requirement specifically. Award 1 mark for any valid real-world graph database example. Students recommending Document Databases receive a maximum of 1/6 — Document DBs handle flexible schemas but are not designed for relationship traversal.",
    diagram: {
      type: "mermaid",
      code: `graph TD
    C1((Customer A)) -->|LIKES| P1[Product X]
    C1 -->|KNOWS| C2((Customer B))
    C2 -->|BOUGHT| P1
    C2 -->|LIKES| P2[Product Y]
    C3((Customer C)) -->|INFLUENCES| C1
    style C1 fill:#FFD700,stroke:#333,stroke-width:2px
    style C2 fill:#FFD700,stroke:#333,stroke-width:2px
    style C3 fill:#FFD700,stroke:#333,stroke-width:2px
    style P1 fill:#87CEFA,stroke:#333,stroke-width:2px
    style P2 fill:#87CEFA,stroke:#333,stroke-width:2px`,
    },
    points: 6,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q1.3 — Hadoop: HDFS & MapReduce  (10 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W7_Q1_3A",
    type: "multiple-choice",
    sectionLabel: "1.3 Part A",
    text: "OmniCart stores petabytes of chat logs across a 200-node Hadoop cluster. A hardware failure causes Node 47 to go completely offline. Which mechanism does HDFS use to ensure this data is not lost, and what is the standard default configuration for this mechanism?",
    options: [
      "HDFS uses RAID striping across all nodes — if any node fails, parity blocks are used to reconstruct the missing data automatically.",
      "HDFS uses block replication — each data block is automatically copied to multiple distinct nodes (default: 3 replicas). If Node 47 fails, the NameNode detects the under-replicated blocks and instructs remaining nodes to create new replicas to restore the replication factor.",
      "HDFS uses a centralised backup database — all blocks are mirrored to a designated master backup node that activates on failure.",
      "HDFS uses checkpointing — the NameNode periodically saves a snapshot of the entire filesystem state, which is restored when a DataNode fails.",
    ],
    correctAnswers: [
      "HDFS uses block replication — each data block is automatically copied to multiple distinct nodes (default: 3 replicas). If Node 47 fails, the NameNode detects the under-replicated blocks and instructs remaining nodes to create new replicas to restore the replication factor.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W7_Q1_3B",
    type: "multiple-choice",
    sectionLabel: "1.3 Part B",
    text: "OmniCart runs a MapReduce job to count the frequency of every product keyword across 50 terabytes of customer chat logs. During the Map phase, the system processes the sentence 'great product quality great service' on one node. Which output does the Map phase produce from this input?",
    options: [
      "A single aggregated count: {great: 2, product: 1, quality: 1, service: 1} — the Map phase produces final totals.",
      "The sentence is stored as a 128MB block and forwarded to the Reduce phase unchanged.",
      "Intermediate key-value pairs: (great, 1), (product, 1), (quality, 1), (great, 1), (service, 1) — one pair per word occurrence, to be aggregated later.",
      "The Map phase allocates the sentence to a dedicated CPU core and waits for the Reduce phase to begin before producing any output.",
    ],
    correctAnswers: [
      "Intermediate key-value pairs: (great, 1), (product, 1), (quality, 1), (great, 1), (service, 1) — one pair per word occurrence, to be aggregated later.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W7_Q1_3C",
    type: "show-answer",
    sectionLabel: "1.3 Part C",
    text: "Explain the operational roles of the Hadoop Distributed File System (HDFS) and MapReduce within OmniCart's Big Data ecosystem. Specifically detail how HDFS achieves fault tolerance, and explain what occurs during each of the two MapReduce phases when processing OmniCart's chat log data.",
    correctAnswers: [
      "HDFS (Hadoop Distributed File System):\nHDFS is a distributed file system that provides high-throughput access to data stored across multiple nodes in a Hadoop cluster. It handles OmniCart's massive storage scale by breaking large files (e.g., petabytes of chat logs) into fixed-size blocks (typically 128MB) and distributing those blocks across the physical nodes of the cluster. The NameNode acts as the master metadata server — it tracks which blocks are stored on which DataNodes — while individual DataNodes handle the actual block storage.\n\nFault Tolerance: HDFS achieves fault tolerance through automatic block replication. Each data block is replicated across multiple distinct nodes (the default replication factor is 3). If a DataNode fails — such as Node 47 going offline — the NameNode detects that the affected blocks now have fewer replicas than the configured factor. It automatically instructs surviving DataNodes to create additional copies of the under-replicated blocks on healthy nodes, restoring the full replication factor without any data loss or manual intervention.\n\nMapReduce:\nMapReduce is a distributed programming model that processes large datasets in parallel across the cluster by dividing the work into two distinct phases:\n\nMap Phase: The framework splits the input dataset into independent chunks and distributes them across available nodes. Each node processes its assigned chunk in parallel, transforming the raw input data into intermediate key-value pairs. For OmniCart's chat log analysis, the Map phase would read each chat log segment and emit a (keyword, 1) pair for every word occurrence — e.g., (great, 1), (product, 1), (great, 1). Multiple nodes process different log segments simultaneously.\n\nReduce Phase: The intermediate key-value pairs from all Map tasks are shuffled and sorted by key, then aggregated by the Reduce phase. For OmniCart, all (great, 1) pairs emitted across every node are collected and summed — producing (great, 2847) — and this aggregation is performed for every keyword across the entire 50TB dataset. The Reduce phase outputs the final computed result, which is written back to HDFS.",
    ],
    markingGuide:
      "Award 2 marks for explaining HDFS's role (distributed storage, splitting files into blocks, NameNode/DataNode architecture). Award 3 marks for fault tolerance: must mention block replication, the replication factor (ideally stating the default of 3), the NameNode detecting failure, and automatic re-replication to restore the factor — all three concepts required for full marks. Award 1 mark for identifying MapReduce as a parallel processing model. Award 2 marks for the Map phase: must mention splitting data into chunks, parallel processing across nodes, and the output of intermediate key-value pairs. Award 2 marks for the Reduce phase: must mention aggregating/summarising the intermediate results and producing the final output. Common error: describing the Map phase as producing final results — the Map phase only produces intermediate key-value pairs.",
    points: 10,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // QUESTION 2 SCENARIO — OmniCart: Cloud, Connectivity & Data Exchange
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "SCENARIO_ITDSA_W7_Q2",
    type: "scenario",
    title: "Question 2: OmniCart Global — Cloud Infrastructure, Connectivity & Data Exchange (25 Marks)",
    context: `As part of OmniCart's modernisation, the software engineering and infrastructure teams are overhauling three critical areas:

  1. Developer Productivity: The web development team wants to interact with databases using high-level Python and Java application objects, explicitly avoiding raw SQL statements embedded in application code.

  2. Supplier Integration: Third-party suppliers submit inventory manifests that must strictly adhere to a standardised hierarchical format. Every manifest must be well-formed and contain mandatory elements such as <ManifestID>, <SupplierName>, and <Items> before the system accepts them. Any non-compliant document must be automatically rejected.

  3. Infrastructure: To ensure global reach and eliminate upfront capital investment in physical hardware, the entire platform will be hosted using Cloud Computing services.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.1 — ORM / Database Connectivity  (5 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W7_Q2_1A",
    type: "open-ended",
    sectionLabel: "2.1 Part A",
    text: "OmniCart's Python developers want to retrieve a supplier record by writing supplier = Supplier.query.get(101) instead of executing SELECT * FROM suppliers WHERE id = 101. What specific middleware framework or technology bridges this gap between object-oriented application code and a relational database? (Answer: acronym or full term accepted)",
    correctAnswers: [
      "ORM",
      "Object-Relational Mapping",
      "Object Relational Mapping",
      "object-relational mapping",
      "object relational mapping",
    ],
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    points: 2,
  },

  {
    id: "ITDSA_W7_Q2_1B",
    type: "show-answer",
    sectionLabel: "2.1 Part B",
    text: "Identify and explain the database internet connectivity framework that allows OmniCart's developers to interact with the database using high-level application objects instead of raw SQL. Explain how this technology works and why it simplifies web application development at OmniCart.",
    correctAnswers: [
      "Technology: Object-Relational Mapping (ORM) Framework.\n\nHow it works: An ORM framework abstracts the database access layer by directly mapping database tables to application classes and individual table rows to class instances (objects). When a developer calls a method on an object — such as supplier.save() or Supplier.query.filter_by(region='EU') — the ORM framework automatically translates this into the appropriate SQL statement (INSERT, SELECT, UPDATE, DELETE) and executes it against the underlying database. The developer never writes raw SQL; the ORM handles the translation transparently.\n\nWhy it simplifies development at OmniCart: First, developers work entirely within their native programming language (Python, Java) using familiar object-oriented patterns — no context switching to SQL syntax. Second, the ORM handles database-agnostic abstraction — if OmniCart migrates from PostgreSQL to MySQL, the application code does not change, only the ORM configuration does. Third, it promotes code reuse and maintainability by centralising database logic in model classes rather than scattering raw SQL strings throughout the codebase.\n\nExamples: SQLAlchemy (Python), Hibernate (Java), Entity Framework (.NET).",
    ],
    markingGuide:
      "Award 2 marks for correctly identifying ORM / Object-Relational Mapping. Award 3 marks for the explanation: 1 mark for explaining how the ORM maps tables to classes and rows to objects, 1 mark for explaining the automatic SQL translation mechanism, 1 mark for at least two specific benefits applied to OmniCart's development context. Answers naming 'ODBC' or 'JDBC' as the answer receive 0/2 for identification — these are lower-level connectivity drivers, not ORM frameworks.",
    points: 5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.2 — XML & DTD  (10 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W7_Q2_2A",
    type: "multiple-choice",
    sectionLabel: "2.2 Part A",
    text: "A supplier submits the following XML manifest to OmniCart's intake system:\n\n<Manifest>\n  <SupplierName>TechParts Ltd</SupplierName>\n  <Items><Item>Sensor</Item></Items>\n</Manifest>\n\nOmniCart's validation system automatically rejects this document because the mandatory <ManifestID> element is absent. Which formal specification is OmniCart using to enforce this structural rule and automatically reject non-compliant documents?",
    options: [
      "RESTful API endpoint schema validation — rejects HTTP requests that do not match the expected JSON payload structure.",
      "Document Type Definition (DTD) — a formal specification that defines the required elements, their permitted nesting hierarchy, and mandatory attributes; documents violating these rules are rejected as invalid.",
      "ODBC (Open Database Connectivity) — validates that XML data is compatible with the target relational database schema before insertion.",
      "An Entity-Relationship Diagram (ERD) — ensures the XML structure maps correctly to the relational table design.",
    ],
    correctAnswers: [
      "Document Type Definition (DTD) — a formal specification that defines the required elements, their permitted nesting hierarchy, and mandatory attributes; documents violating these rules are rejected as invalid.",
    ],
    points: 3,
  },

  {
    id: "ITDSA_W7_Q2_2B",
    type: "fill-in-the-blank",
    sectionLabel: "2.2 Part B",
    text: "A DTD defines the ___ of an XML document — specifying which tags are permitted, their required nesting, and their hierarchical relationships. It also defines ___, which are named properties attached to XML elements that carry additional metadata. Together, these components allow OmniCart's system to automatically ___ every supplier manifest before it enters the database.",
    blanks: [
      {
        id: "b1",
        options: ["Elements", "Attributes", "Schemas", "Namespaces"],
        correctAnswer: "Elements",
      },
      {
        id: "b2",
        options: ["Attributes", "Elements", "Schemas", "Namespaces"],
        correctAnswer: "Attributes",
      },
      {
        id: "b3",
        options: ["validate", "encrypt", "compress", "normalise"],
        correctAnswer: "validate",
      },
    ],
    points: 3,
  },

  {
    id: "ITDSA_W7_Q2_2C",
    type: "show-answer",
    sectionLabel: "2.2 Part C",
    text: "OmniCart must enforce strict structural rules on supplier XML manifests to ensure every document contains mandatory elements such as <ManifestID>, <SupplierName>, and <Items>. What formal XML specification must OmniCart implement? Explain its core purpose and describe two of its key components in detail.",
    correctAnswers: [
      "Specification: Document Type Definition (DTD).\n\nCore Purpose: A DTD is a formal specification used to define the structure, rules, and constraints of an XML document. It acts as a blueprint that the XML must conform to before it is considered valid. By validating every incoming supplier manifest against the DTD, OmniCart's intake system can automatically reject any document that is missing mandatory elements (e.g., <ManifestID>), uses incorrect hierarchical nesting, or introduces unauthorised tags — preventing malformed or incomplete data from entering the operational database.\n\nKey Component 1 — Elements: DTD defines the complete set of allowed tags (elements) that may appear in the document, specifying their names, their required or optional status, and the rules governing their nesting hierarchy. For OmniCart, the DTD would declare that <Manifest> must contain exactly one <ManifestID>, one <SupplierName>, and one <Items> element, and that <Items> must contain at least one <Item> child element. Any document missing these required elements is flagged as invalid.\n\nKey Component 2 — Attributes: DTD defines the attributes that can or must be associated with each element, including the attribute name, its data type (e.g., CDATA for character data), and whether it is required or has a default value. For OmniCart, a DTD attribute declaration might specify that every <Item> element must carry a required partNumber attribute — enabling the system to reject any item entry that omits this identifier.",
    ],
    markingGuide:
      "Award 2 marks for correctly identifying DTD (Document Type Definition). Award 4 marks for the core purpose explanation: must mention structural definition/constraints, validation against a schema, and the direct benefit to OmniCart of automatic rejection of non-compliant manifests. Award 2 marks per key component (× 2 = 4 marks): each component requires a clear definition AND an OmniCart-specific application example. Acceptable components: Elements, Attributes, Validation Rules, or Entities. Vague component descriptions ('DTD checks the document') without explaining the mechanism receive a maximum of 1/2 per component.",
    points: 10,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Q2.3 — Cloud Computing Assessment  (10 Marks)
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: "ITDSA_W7_Q2_3A",
    type: "multiple-choice",
    sectionLabel: "2.3 Part A",
    text: "OmniCart's scenario explicitly states the goal of eliminating 'upfront capital investments in physical hardware.' Which cloud computing benefit directly addresses this, and what financial model does cloud adoption introduce in its place?",
    options: [
      "Global Reach — cloud providers operate worldwide data centres, replacing the need for capital hardware with localised server leases.",
      "Elasticity — cloud auto-scaling replaces hardware budgets with variable compute contracts billed per scaling event.",
      "Cost-effectiveness via the OpEx model — cloud services replace large upfront CapEx (capital expenditure) on physical hardware with a pay-as-you-go operational expenditure (OpEx) model, where OmniCart pays only for resources actually consumed.",
      "High Availability — cloud SLAs guarantee 99.99% uptime, eliminating the cost of maintaining redundant on-premises hardware.",
    ],
    correctAnswers: [
      "Cost-effectiveness via the OpEx model — cloud services replace large upfront CapEx (capital expenditure) on physical hardware with a pay-as-you-go operational expenditure (OpEx) model, where OmniCart pays only for resources actually consumed.",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W7_Q2_3B",
    type: "multiple-choice",
    sectionLabel: "2.3 Part B",
    text: "OmniCart's automated warehouse robots rely on continuous cloud database connectivity to retrieve routing instructions and log sensor data. Which of the following represents a legitimate strategic risk introduced directly by this cloud architecture? (Select the most precise answer)",
    options: [
      "Cloud migration removes OmniCart's ability to dynamically scale storage during peak shopping seasons.",
      "Cloud providers charge massive upfront capital fees for storage that exceed the cost of on-premises hardware.",
      "Total dependency on continuous internet connectivity — any network outage or cloud provider downtime directly disrupts warehouse robot operations and global order processing.",
      "Cloud databases cannot support NoSQL workloads, forcing OmniCart to maintain an on-premises Hadoop cluster in parallel.",
    ],
    correctAnswers: [
      "Total dependency on continuous internet connectivity — any network outage or cloud provider downtime directly disrupts warehouse robot operations and global order processing.",
    ],
    points: 2,
  },

  {
    id: "ITDSA_W7_Q2_3C",
    type: "show-answer",
    sectionLabel: "2.3 Part C",
    text: "Critically assess OmniCart's strategic decision to migrate its entire infrastructure to Cloud Computing. Discuss three specific benefits they will gain from this transition and highlight two distinct disadvantages or risks they must carefully manage. Apply each point to the OmniCart context.",
    correctAnswers: [
      "BENEFITS:\n\n1. Scalability: Cloud services allow OmniCart to dynamically scale computing resources up or down in response to demand — within minutes, not months. During peak events such as the holiday shopping season, OmniCart can provision additional servers to handle traffic surges and immediately release them afterwards, paying only for the increased capacity during that window. This is impossible to replicate cost-effectively with fixed on-premises hardware.\n\n2. Cost-effectiveness (CapEx to OpEx shift): The cloud eliminates the large upfront capital expenditures required to purchase, install, and maintain physical server infrastructure — directly addressing the scenario's stated goal. OmniCart transitions to a pay-as-you-go operational expenditure model, paying only for the compute, storage, and network resources actually consumed. This frees capital for core business investment.\n\n3. Global Reach and Low Latency: Cloud providers operate data centres across multiple continents. OmniCart can deploy its applications and databases in regions closest to its international users and warehouse locations, reducing network latency for both customers and warehouse robot connectivity — a direct performance benefit for a multinational retail operation.\n\nDISADVANTAGES / RISKS:\n\n1. Dependency on Internet Connectivity: OmniCart's entire infrastructure — including the real-time routing instructions for warehouse robots and order processing systems — relies on continuous internet connectivity to the cloud provider. A network outage, ISP failure, or cloud provider incident can halt warehouse automation and order fulfilment entirely. This single dependency represents an operational vulnerability that on-premises systems do not share.\n\n2. Vendor Lock-in: If OmniCart deeply integrates with a specific cloud provider's proprietary services — such as AWS DynamoDB, Azure Cosmos DB, or Google BigQuery — migrating to a competitor later becomes technically complex and financially costly. Proprietary APIs, data formats, and cloud-specific configurations create tight coupling that can limit OmniCart's negotiating power and strategic flexibility over the long term.",
    ],
    markingGuide:
      "Award 2 marks per benefit (× 3 = 6 marks): 1 mark for identifying the benefit, 1 mark for applying it specifically to OmniCart. Generic benefits without scenario application receive a maximum of 1/2. Award 2 marks per risk (× 2 = 4 marks): 1 mark for identifying the risk, 1 mark for explaining the operational consequence for OmniCart. Required for full marks on risks: must address internet dependency (and its specific impact on warehouse robots or operations) and at least one of: vendor lock-in, security/data sovereignty concerns, or ongoing operational cost escalation. Risks described vaguely ('cloud can go down') without technical specificity receive 1/2.",
    points: 10,
  },
];
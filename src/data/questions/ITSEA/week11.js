// src/data/questions/ITSEA/week11.js
// Week 11 – Service-Oriented Software Engineering (SOA, REST, Service Engineering & Service Composition)

export default [

  // ─── SCENARIO ─────────────────────────────────────────────────────────────

  {
    id: 'SCENARIO_ITSEA_W11',
    type: 'scenario',
    title: 'Week 11 Assessment: Service-Oriented Software Engineering (50 Marks)',
    context: `**MediLink Global Health Network** is a multinational healthcare technology company that provides digital services to hospitals, pharmacies, laboratories, insurance providers, and telemedicine platforms across multiple countries.\n\nHistorically, each partner organisation developed its own systems independently. As a result:\n\n- Patient records exist in **separate databases**.\n- Laboratory systems use **different technologies**.\n- Pharmacy systems **cannot directly access** insurance verification services.\n- New partners require **lengthy integration projects**.\n- Mobile healthcare applications experience **performance constraints** when processing medical data.\n\nTo address these challenges, MediLink plans to transition to a **service-oriented architecture (SOA)** where independent healthcare services can be reused, composed, and integrated across different organisations.\n\nThe company intends to develop services such as:\n\n- Patient Record Service\n- Laboratory Results Service\n- Insurance Verification Service\n- Appointment Scheduling Service\n- Medication Catalogue Service\n- Telemedicine Consultation Service\n\nSome services will be developed internally while others will be consumed from external providers. The system must support both **SOAP-based** and **RESTful** service interfaces where appropriate.`,
  },

  // ─── QUESTION 1 – UNDERSTANDING SERVICE-ORIENTED ARCHITECTURE ────────────

  {
    id: 'ITSEA_W11_Q1',
    type: 'multiple-choice',
    tags: ['system design', 'software processes'],
    sectionLabel: '1.1',
    text: 'A senior architect states:\n\n> "The most important property of a service is that it should be reusable by different systems without depending on specific applications."\n\nWhich concept is being emphasised?',
    options: [
      'Tight coupling',
      'Encapsulation',
      'Service independence',
      'Dynamic binding',
    ],
    correctAnswers: ['Service independence'],
    points: 2,
    explanation:
      'A defining characteristic of services is that they are **independent and loosely coupled**. Unlike traditional components, services do not rely on specific applications through a required interface — allowing them to be reused freely across different systems.\n\n**Common mistake:** Students often confuse encapsulation with independence. Encapsulation hides implementation details; independence allows services to be reused without application-specific dependencies.',
  },

  {
    id: 'ITSEA_W11_Q2',
    type: 'fill-in-the-blank',
    tags: ['system design'],
    sectionLabel: '1.2',
    text: 'A service communicates with other services primarily through ___-based messages.',
    blanks: [
      {
        id: 'b1',
        options: ['XML', 'JSON', 'HTML', 'Binary'],
        correctAnswer: 'XML',
      },
    ],
    explanation:
      'Services rely on **message-based communication** where messages are expressed in **XML**. This standard format enables interoperability between services regardless of their underlying implementation technologies.',
  },

  {
    id: 'ITSEA_W11_Q3',
    type: 'open-ended',
    tags: ['system design', 'software processes'],
    sectionLabel: '1.3',
    text: 'What is the name of the architectural approach where applications are built from independent reusable services?',
    correctAnswers: [
      'Service-Oriented Architecture',
      'SOA',
      'Service Oriented Architecture',
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation:
      '**Service-Oriented Architecture (SOA)** is the architectural approach where reusable services form the building blocks of systems, enabling integration, reuse, and composition across applications and organisations.',
  },

  {
    id: 'ITSEA_W11_Q4',
    type: 'multiple-choice',
    tags: ['system design', 'managerial impact'],
    sectionLabel: '1.4',
    text: 'MediLink wishes to integrate an external Insurance Verification Service developed by a third-party company.\n\nWhich SOA benefit is **most directly** demonstrated?',
    options: [
      'Information hiding',
      'Opportunistic service composition',
      'Strong component dependency',
      'Internal state preservation',
    ],
    correctAnswers: ['Opportunistic service composition'],
    points: 2,
    explanation:
      '**Opportunistic service composition** refers to the ability to leverage existing external services rather than building them internally. MediLink is integrating a third-party Insurance Verification Service instead of developing one from scratch — a direct example of this SOA benefit.',
  },

  {
    id: 'ITSEA_W11_Q5',
    type: 'show-answer',
    tags: ['system design', 'technological impact', 'managerial impact'],
    sectionLabel: '1.5',
    text: "MediLink's executive board is uncertain whether migrating to a service-oriented architecture is worth the investment.\n\nUsing the scenario, discuss **three major benefits** that MediLink could gain from adopting a service-oriented architecture.",
    correctAnswers: [
      "MediLink would gain several significant benefits from adopting a Service-Oriented Architecture.\n\nFirst, **service reuse** would reduce development effort. For example, a Patient Record Service could be used by hospitals, telemedicine systems, pharmacies, and insurance providers without requiring separate implementations for each — directly addressing MediLink's problem of duplicated systems across partner organisations.\n\nSecond, SOA promotes **cross-organisational integration**. Since healthcare partners operate different systems and technologies, exposing functionality as services enables interoperability regardless of underlying implementation. Pharmacies could access insurance verification, and laboratories could share results with hospitals through standard service interfaces.\n\nThird, SOA supports **dynamic adaptability**. MediLink can replace one Insurance Verification provider with another without redesigning dependent applications. This improves flexibility and reduces vendor lock-in — particularly valuable in a multi-country environment where regulatory requirements may change.\n\nAdditionally, mobile healthcare applications benefit because computationally intensive tasks can be delegated to remote services rather than processed locally, addressing the performance constraints identified in the scenario.",
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Benefit 1 explained with scenario link | 2 |
| Benefit 2 explained with scenario link | 2 |
| Benefit 3 explained with scenario link | 2 |
| **Total** | **6** |

**A+ Characteristics:** Uses specific scenario evidence; links technical and business advantages; demonstrates understanding of why SOA principles matter to MediLink's situation rather than describing benefits in the abstract.`,
    points: 6,
  },

  // ─── QUESTION 2 – SERVICE DESIGN AND SERVICE IDENTIFICATION ──────────────

  {
    id: 'ITSEA_W11_Q6',
    type: 'multiple-choice',
    tags: ['requirements analysis', 'system design'],
    sectionLabel: '2.1',
    text: 'The Medication Catalogue Service is intended to be used by pharmacies, hospitals, insurance companies, and mobile applications.\n\nWhich service type **best** describes this service?',
    options: [
      'Coordination Service',
      'Utility Service',
      'Business Service',
      'Workflow Service',
    ],
    correctAnswers: ['Business Service'],
    points: 2,
    explanation:
      'A **business service** directly supports a business function. The Medication Catalogue Service manages product information central to pharmacy and hospital operations — it supports a core business function involving product data and ordering processes, making it a business service rather than a generic utility.',
  },

  {
    id: 'ITSEA_W11_Q7',
    type: 'open-ended',
    tags: ['system design'],
    sectionLabel: '2.2',
    text: 'A service associated with a specific business entity such as a patient record is called a(n) ___-oriented service.',
    correctAnswers: ['Entity', 'entity'],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
      allowPartialMatch: false,
    },
    explanation:
      '**Entity-oriented services** are associated with specific business entities — such as patients, products, orders, or records. They are defined by the data entity they represent rather than the task they perform.',
  },

  {
    id: 'ITSEA_W11_Q8',
    type: 'multiple-choice',
    tags: ['requirements analysis', 'system design'],
    sectionLabel: '2.3',
    text: 'Which question would be **MOST important** during service candidate identification?',
    options: [
      'Which programming language is preferred?',
      'Can the service be used by clients outside the organisation?',
      'Which database vendor is most popular?',
      'Should services always be SOAP-based?',
    ],
    correctAnswers: ['Can the service be used by clients outside the organisation?'],
    points: 2,
    explanation:
      "Reusability and external accessibility are core criteria when identifying service candidates. Asking whether a service **can be used by clients outside the organisation** directly tests the service's potential for reuse and composition — one of the key service identification questions from the course material.",
  },

  {
    id: 'ITSEA_W11_Q9',
    type: 'fill-in-the-blank',
    tags: ['software processes'],
    sectionLabel: '2.4',
    text: 'The process of developing reusable services for future use is known as service ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Discovery', 'Engineering', 'Composition', 'Binding'],
        correctAnswer: 'Engineering',
      },
    ],
    explanation:
      '**Service engineering** is the process of developing services specifically for reuse across multiple future applications — as opposed to developing an application that happens to expose a service. It emphasises designing with reusability and interoperability as primary goals from the outset.',
  },

  {
    id: 'ITSEA_W11_Q10',
    type: 'show-answer',
    tags: ['requirements analysis', 'system design'],
    sectionLabel: '2.5',
    text: 'MediLink plans to implement the following services:\n- Patient Record Service\n- Insurance Verification Service\n- Appointment Scheduling Service\n- Medication Catalogue Service\n- Telemedicine Consultation Service\n\nFor **any three services**, identify:\n1. Whether they are likely to be utility, business, or coordination services.\n2. Whether they are task-oriented or entity-oriented.\n3. Justify your classification.',
    correctAnswers: [
      `Strong responses classify and justify any three of the following:\n\n| Service | Classification | Orientation | Justification |\n|---|---|---|---|\n| Patient Record Service | Business Service | Entity-Oriented | Represents a core patient entity; supports healthcare operations across all partner types |\n| Insurance Verification Service | Business Service | Task-Oriented | Performs a specific business activity (verifying coverage) rather than managing an entity |\n| Appointment Scheduling Service | Coordination Service | Task-Oriented | Orchestrates multiple actors and activities (patient, clinician, calendar) to complete a goal |\n| Medication Catalogue Service | Business or Utility Service | Entity-Oriented | Manages a catalogue entity; may be utility if used as a generic lookup across all systems |\n| Telemedicine Consultation Service | Business Service | Task-Oriented | Supports a specific business interaction rather than managing a persistent entity |\n\nThe strongest responses recognise that classification is not purely memorisation — it depends on the service's purpose, behaviour, and context. Exceptional answers acknowledge where multiple classifications may be defensible (e.g. Medication Catalogue as both utility and business).`,
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Correct classification — Service 1 | 2 |
| Correct classification — Service 2 | 2 |
| Correct classification — Service 3 | 2 |
| Quality of justification | 1 |
| **Total** | **7** |

**Examiner Comment:** The strongest responses recognise that classification depends on the service's purpose and behaviour, not memorisation. Award the justification mark only where the student explains *why* rather than simply asserting the category.`,
    points: 7,
  },

  // ─── QUESTION 3 – WSDL AND SOAP-BASED SERVICES ───────────────────────────

  {
    id: 'ITSEA_W11_Q11',
    type: 'fill-in-the-blank',
    tags: ['system design'],
    sectionLabel: '3.1',
    text: 'The language used to formally describe SOAP web services is ___.',
    blanks: [
      {
        id: 'b1',
        options: ['SOAP', 'REST', 'WSDL', 'XML'],
        correctAnswer: 'WSDL',
      },
    ],
    explanation:
      '**WSDL (Web Service Description Language)** is the standard language used to formally describe SOAP-based web services. It defines what the service does, how to communicate with it, and where it can be accessed.',
  },

  {
    id: 'ITSEA_W11_Q12',
    type: 'multiple-choice',
    tags: ['system design'],
    sectionLabel: '3.2',
    text: 'Which WSDL component specifies the **operations supported by a service** and the structure of exchanged messages?',
    options: [
      'Endpoint',
      'Interface',
      'Binding',
      'Location',
    ],
    correctAnswers: ['Interface'],
    points: 2,
    explanation:
      'The **Interface** (or "What") component of a WSDL document defines the operations a service supports and the structure of the input and output messages for each operation. It describes *what* the service can do, without specifying *how* or *where*.',
  },

  {
    id: 'ITSEA_W11_Q13',
    type: 'multiple-choice',
    tags: ['system design'],
    sectionLabel: '3.3',
    text: 'Which WSDL component explains how a service communicates using **specific protocols**?',
    options: [
      'Interface',
      'Endpoint',
      'Binding',
      'Resource',
    ],
    correctAnswers: ['Binding'],
    points: 2,
    explanation:
      'The **Binding** (or "How") component maps the abstract interface onto actual communication protocols and message formats. It specifies technical details such as whether the service uses SOAP over HTTP, and how messages should be encoded — telling consumers *how* to talk to the service.',
  },

  {
    id: 'ITSEA_W11_Q14',
    type: 'open-ended',
    tags: ['system design'],
    sectionLabel: '3.4',
    text: 'What does the **"where"** part of a WSDL document describe?',
    correctAnswers: [
      'Service location',
      'Endpoint URI',
      'Endpoint',
      'Service URI',
      'Location',
      'Service address',
    ],
    points: 1,
    validationOptions: {
      caseSensitive: false,
      tolerance: 15,
      allowPartialMatch: true,
    },
    explanation:
      'The **"Where"** component — defined by the Endpoint element — identifies the physical **URI (location)** where the service can be accessed. Without this, a consumer would know what the service does and how to call it, but not where to send the request.',
  },

  {
    id: 'ITSEA_W11_Q15',
    type: 'show-answer',
    tags: ['system design', 'requirements analysis'],
    sectionLabel: '3.5',
    text: 'Suppose a laboratory partner wants to expose a Laboratory Results Service.\n\nExplain the purpose of the **"What"**, **"How"**, and **"Where"** components of WSDL and discuss why each is important to service consumers.',
    correctAnswers: [
      `WSDL contains three major components that together give service consumers everything they need to discover and invoke a service.\n\n**What → Interface**\nThe Interface component defines the operations a service exposes and the structure of input and output messages. For the Laboratory Results Service, this would describe operations such as \`getResultsByPatientID\` and specify which parameters are expected and what data is returned. Without this, consumers cannot know what functionality exists.\n\n**How → Binding**\nThe Binding component maps the abstract interface onto specific communication protocols and message formats — for example, SOAP over HTTP with document-literal encoding. This tells consumers the technical details required to construct and send valid requests. Without it, a consumer would know what to request but not how to format the message.\n\n**Where → Endpoint**\nThe Endpoint component specifies the URI at which the service is physically hosted. This is the address to which requests must be sent. Without it, a consumer cannot locate the service regardless of how well they understand the interface and binding.\n\nAll three components are necessary for successful service consumption. The Interface answers *what*, the Binding answers *how*, and the Endpoint answers *where* — together forming a complete service contract.`,
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| What (Interface) explained | 1 |
| How (Binding) explained | 1 |
| Where (Endpoint) explained | 1 |
| Importance to consumers discussed | 1 |
| **Total** | **4** |

**Examiner Comment:** Top responses explain how consumers need all three pieces to successfully discover and invoke a service — not just what each component contains in isolation.`,
    points: 4,
  },

  // ─── QUESTION 4 – RESTFUL SERVICE DESIGN ─────────────────────────────────

  {
    id: 'ITSEA_W11_Q16',
    type: 'multiple-choice',
    tags: ['system design'],
    sectionLabel: '4.1',
    text: 'Which statement **best** describes a resource in REST?',
    options: [
      'A reusable workflow',
      'A data element that can have multiple representations',
      'A communication protocol',
      'A service registry',
    ],
    correctAnswers: ['A data element that can have multiple representations'],
    points: 2,
    explanation:
      'In REST, a **resource** is any meaningful data element (such as a patient record, appointment, or medication) that can be identified by a URI and represented in multiple formats — JSON, XML, PDF, HTML, etc. REST is fundamentally resource-centric rather than operation-centric.',
  },

  {
    id: 'ITSEA_W11_Q17',
    type: 'matching',
    tags: ['system design'],
    sectionLabel: '4.2',
    text: 'Match each CRUD operation to its corresponding HTTP verb.',
    pairs: [
      { left: 'Create', right: 'POST' },
      { left: 'Read', right: 'GET' },
      { left: 'Update', right: 'PUT' },
      { left: 'Delete', right: 'DELETE' },
    ],
    points: 4,
    explanation:
      'REST maps CRUD operations directly to standard HTTP verbs: **POST** creates a new resource, **GET** retrieves it, **PUT** updates it, and **DELETE** removes it. This uniform interface is one of the core REST constraints and makes APIs predictable and interoperable.',
  },

  {
    id: 'ITSEA_W11_Q18',
    type: 'multiple-choice',
    tags: ['system design'],
    sectionLabel: '4.3',
    text: 'Which criticism of REST is **most relevant** when implementing highly complex business operations?',
    options: [
      'REST requires XML',
      'REST lacks standard databases',
      'Complex service interfaces may be difficult to model as resources',
      'REST cannot support web applications',
    ],
    correctAnswers: ['Complex service interfaces may be difficult to model as resources'],
    points: 2,
    explanation:
      'REST\'s resource-oriented model works well for straightforward CRUD scenarios, but becomes awkward when modelling **complex business transactions** that don\'t map cleanly to a single resource (e.g., a multi-step insurance claim process). This is one of the limitations explicitly identified in the course material.',
  },

  {
    id: 'ITSEA_W11_Q19',
    type: 'fill-in-the-blank',
    tags: ['system design'],
    sectionLabel: '4.4',
    text: 'REST stands for Representational State ___.',
    blanks: [
      {
        id: 'b1',
        options: ['Transaction', 'Transport', 'Transformation', 'Transfer'],
        correctAnswer: 'Transfer',
      },
    ],
    explanation:
      '**REST** stands for **Representational State Transfer** — an architectural style for distributed hypermedia systems defined by Roy Fielding in 2000. The name reflects the concept of transferring representations of resource state between client and server.',
  },

  {
    id: 'ITSEA_W11_Q20',
    type: 'show-answer',
    tags: ['system design', 'requirements analysis'],
    sectionLabel: '4.5',
    text: 'Design a RESTful interface for the **Patient Record Service**.\n\nYour answer should:\n1. Identify appropriate resources.\n2. Specify URLs.\n3. Map operations to HTTP verbs.\n4. Explain why the design follows REST principles.',
    correctAnswers: [
      `A RESTful Patient Record Service treats patients as resources, each uniquely identified by a URI.\n\n**Resource Design**\n\nThe primary resource is the **patient**, accessible at:\n- \`/patients\` — the collection of all patients\n- \`/patients/{patientID}\` — a specific patient record\n\n**CRUD Mapping**\n\n| Operation | HTTP Verb | URL |\n|---|---|---|\n| Create a new patient | POST | /patients |\n| Retrieve a patient record | GET | /patients/{patientID} |\n| Update a patient record | PUT | /patients/{patientID} |\n| Delete a patient record | DELETE | /patients/{patientID} |\n\n**Why this follows REST principles:**\n\n1. **Resources represent entities** — patients are modelled as first-class resources rather than as actions (e.g., avoiding anti-patterns like \`/getPatient\` or \`/createPatient\`).\n2. **Uniform interface** — standard HTTP verbs perform CRUD operations consistently, making the API predictable.\n3. **Unique URIs** — each patient is unambiguously identified by \`/patients/{patientID}\`.\n4. **Multiple representations** — the service can return patient data as JSON, XML, or other formats depending on the \`Accept\` header, satisfying the representational flexibility of REST.\n\nThis design supports MediLink's goal of enabling hospitals, pharmacies, and telemedicine platforms to access patient records through a standard, interoperable interface.`,
    ],
    markingGuide: `| Criterion | Marks |
|---|---|
| Resources identified correctly | 2 |
| URLs designed correctly | 1 |
| HTTP verbs mapped correctly | 2 |
| REST justification provided | 1 |
| **Total** | **6** |

**Examiner Comment:** The most common mistake is modelling actions as resources (e.g., \`/createPatient\` or \`/getPatientRecord\`) instead of modelling the patient itself as the resource and using HTTP verbs to express the operation. A+ responses justify design choices and demonstrate resource-oriented thinking.`,
    points: 6,
  },
];
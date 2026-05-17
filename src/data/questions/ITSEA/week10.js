// src/data/questions/ITSEA/week10.js
export default [

  // ─── SCENARIO ────────────────────────────────────────────────────────────────

  {
    id: "ITSEA_W10_S1",
    type: "scenario",
    text: "MedSys Global is a multinational healthcare technology provider initiating a complete redesign of its hospital management ecosystem using Component-Based Software Engineering (CBSE).\n\nThe existing infrastructure suffers from:\n• Tightly coupled legacy applications\n• Incompatible departmental systems\n• Duplicated patient data\n• Poor interoperability between laboratory, pharmacy, billing, and emergency-care systems\n• Slow deployment of new services across regional hospitals\n\nThe new system must support independently deployable software components, reusable medical service modules, distributed communication across hospitals, integration with third-party insurance providers, and future migration toward cloud-based healthcare services.\n\nA consulting team of software architects, middleware specialists, security analysts, healthcare administrators, and compliance officers has been appointed to evaluate the transition. The organisation also discovered that several existing components developed by external vendors follow incompatible component standards, creating serious integration challenges.\n\nAll questions in this assessment relate to this organisational context unless otherwise stated.",
  },

  // ─── QUESTION 1 — Foundations of CBSE in Enterprise Systems ─────────────────

  {
    id: "ITSEA_W10_Q1",
    type: "multiple-choice",
    tags: ["system design", "software processes", "interfaces & abstract classes"],
    sectionLabel: "1.1",
    text: "A senior architect argues that MedSys Global should replace several monolithic hospital applications with reusable components because components are *more abstract and independently deployable than object classes.*\n\nWhich statement BEST reflects the underlying CBSE principle being applied?",
    options: [
      "Components eliminate the need for interfaces by exposing internal logic directly.",
      "Components improve reuse because they encapsulate services behind standardised interfaces.",
      "Components are reusable primarily because they execute sequentially.",
      "Components remove the requirement for middleware in distributed systems.",
    ],
    correctAnswers: [
      "Components improve reuse because they encapsulate services behind standardised interfaces.",
    ],
    points: 2,
    explanation:
      "CBSE depends on **interface abstraction**. Components expose functionality through publicly defined interfaces while hiding implementation details — enabling independent reuse and replacement. This distinguishes CBSE from object-oriented reuse: components emphasise deployability and standardised interaction, not just inheritance and polymorphism.",
  },

  {
    id: "ITSEA_W10_Q2",
    type: "fill-in-the-blank",
    tags: ["system design", "interfaces & abstract classes"],
    sectionLabel: "1.2",
    text: "The interface that specifies the services a component *needs* in order to function correctly is called the ___ interface.",
    blanks: [
      {
        id: "b1",
        options: ["provides", "requires", "exposes", "depends"],
        correctAnswer: "requires",
      },
    ],
    explanation:
      "A component has two types of interfaces: a **provides** interface (services it offers) and a **requires** interface (external services it depends on to function). Correctly identifying which interface specifies dependencies is essential for composition planning and integration design.",
  },

  {
    id: "ITSEA_W10_Q3",
    type: "open-ended",
    tags: ["system design", "software processes"],
    sectionLabel: "1.3",
    text: "State the architectural mechanism that enables distributed components to communicate across independent systems.\n\n**Answer in one word only.**",
    correctAnswers: ["Middleware", "middleware"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**Middleware** provides the communication, coordination, transaction management, and service-discovery infrastructure that allows independently deployed components to interact across distributed environments. Without middleware, components developed in isolation cannot reliably exchange data or invoke one another's services.",
  },

  {
    id: "ITSEA_W10_Q4",
    type: "multiple-choice",
    tags: ["system design", "technological impact"],
    sectionLabel: "1.4",
    text: "MedSys Global plans to integrate components developed under different standards, including older enterprise technologies and modern cloud services.\n\nWhich challenge MOST directly threatens interoperability in this scenario?",
    options: [
      "Excessive component documentation",
      "Binary deployment restrictions",
      "Competing component standards",
      "Hierarchical composition models",
    ],
    correctAnswers: ["Competing component standards"],
    points: 3,
    explanation:
      "Historically, technologies such as COM, CORBA CCM, and Enterprise Java Beans introduced incompatible ecosystems. Components built under one standard frequently could not interoperate with components built under another — regardless of their individual quality. This is the most direct interoperability threat in heterogeneous environments like MedSys Global's.",
  },

  {
    id: "ITSEA_W10_Q5",
    type: "show-answer",
    tags: [
      "system design",
      "technological impact",
      "managerial impact",
      "software processes",
    ],
    sectionLabel: "1.5",
    text: "MedSys Global executives believe that simply introducing reusable components will automatically improve operational efficiency across all hospitals.\n\nCritically evaluate this assumption using CBSE principles. Your discussion should include:\n- Independence of components\n- Interface abstraction\n- Middleware support\n- Organisational implications\n- Limitations associated with component interoperability",
    correctAnswers: [
      "Introducing reusable components alone does not automatically improve operational efficiency. CBSE improves modularity and reuse *only* when supported by disciplined architectural practices.\n\n**Component independence** enables departments such as pharmacy, billing, and laboratory systems to evolve separately without directly affecting one another. This reduces maintenance complexity and supports scalability across hospitals — departments can be upgraded or replaced without cascading disruption.\n\n**Interface abstraction** allows components to communicate without exposing implementation details. This separation improves maintainability and enables replacement of components, provided interfaces remain contractually stable. If interfaces are poorly defined or unstable, the benefits of abstraction collapse.\n\nHowever, distributed healthcare systems require robust **middleware support**. Middleware handles communication, data exchange, transaction coordination, and service discovery. Without mature middleware infrastructure, independently developed components cannot reliably interact across hospital systems or external integrators.\n\nThe scenario explicitly highlights a critical limitation: **competing component standards**. Components built using incompatible models may fail to integrate despite being individually reusable. This creates integration overhead and increases system complexity in direct opposition to CBSE's efficiency goals.\n\n**Organisational implications** are equally significant. Hospitals adopting CBSE must establish governance standards, validation procedures, compliance policies, documentation standards, and security controls. In healthcare environments where patient safety is directly at stake, these are non-negotiable requirements — not optional overhead.\n\nAdditional limitations the assumption ignores include: incompatible interfaces, hidden component dependencies, performance overhead introduced by distributed service calls, validation difficulties with third-party components, and strategic dependence on trusted external suppliers.\n\nTherefore, CBSE *can* improve operational efficiency, but only when supported by standardisation, governance, middleware infrastructure, and rigorous validation practices. The assumption that components alone deliver efficiency is technically and organisationally incorrect.",
    ],
    markingGuide: `| Assessment Area | Marks |
|---|---|
| Explains component independence | 3 |
| Explains interface abstraction | 3 |
| Discusses middleware role | 3 |
| Evaluates interoperability limitations | 3 |
| Discusses organisational implications | 2 |
| Critical evaluation & synthesis | 2 |
| **Total** | **16** |

**Common weaknesses:** Listing CBSE advantages without critically evaluating the *assumption*. Treating the question as a straightforward benefits analysis rather than a critical challenge.`,
    points: 16,
    image: {
        src: "/images/ITSEA_W10_Q5.png",
        alt: "Comparison diagram showing fragmented legacy hospital systems versus a modern CBSE healthcare architecture connected through middleware and standardised interfaces.",
        caption: "Legacy healthcare systems compared with a modern Component-Based Software Engineering (CBSE) architecture demonstrating middleware integration, reusable components, and reduction of data silos."
        }
  },

  // ─── QUESTION 2 — Component Characteristics & Design Decisions ───────────────

  {
    id: "ITSEA_W10_Q6",
    type: "multiple-choice",
    tags: ["system design", "software maintenance"],
    sectionLabel: "2.1",
    text: "A software auditor states that a hospital scheduling component violates CBSE principles because it cannot operate unless several undocumented modules are manually installed first.\n\nWhich characteristic of a component is MOST clearly violated?",
    options: [
      "Composability",
      "Standardisation",
      "Deployability",
      "Documentation",
    ],
    correctAnswers: ["Deployability"],
    points: 3,
    explanation:
      "**Deployability** requires that a component can be independently installed and operated without undocumented manual prerequisites. A component that silently depends on external modules that must be configured by hand violates this principle — consumers cannot reliably deploy it without hidden tribal knowledge. Composability concerns interface-based combination, which is a separate concern.",
  },

  {
    id: "ITSEA_W10_Q7",
    type: "fill-in-the-blank",
    tags: ["system design"],
    sectionLabel: "2.2",
    text: "A component that can be combined with other components exclusively through publicly defined interfaces is considered ___.",
    blanks: [
      {
        id: "b1",
        options: ["deployable", "reusable", "composable", "sequential"],
        correctAnswer: "composable",
      },
    ],
    explanation:
      "A **composable** component interacts with other components *only* through its publicly defined provides and requires interfaces — it never relies on back-channel access, shared global state, or undocumented coupling. This property is what makes component assembly predictable and scalable.",
  },

  {
    id: "ITSEA_W10_Q8",
    type: "multiple-choice",
    tags: ["validation & verification", "system design"],
    sectionLabel: "2.3",
    text: "MedSys Global wants to ensure that future third-party vendors can evaluate whether components satisfy regulatory healthcare requirements before deployment.\n\nWhich component characteristic MOST directly supports this objective?",
    options: [
      "Independence",
      "Documentation",
      "Sequential composition",
      "Binary execution",
    ],
    correctAnswers: ["Documentation"],
    points: 3,
    explanation:
      "**Documentation** enables external evaluators — vendors, auditors, and compliance officers — to assess whether a component's behaviour, interfaces, and constraints satisfy regulatory or functional requirements *before* deployment. Without adequate documentation, pre-deployment validation is impossible regardless of component quality.",
  },

  {
    id: "ITSEA_W10_Q9",
    type: "open-ended",
    tags: ["system design", "software processes"],
    sectionLabel: "2.4",
    text: "What term describes a software unit that can be independently deployed and composed without modification according to a composition standard?\n\n**Answer in one word only.**",
    correctAnswers: ["Component", "component"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "A **component** is the fundamental unit of CBSE — a self-contained software entity that can be independently deployed, composed with other components through defined interfaces, and reused across systems without requiring source-level modification. This definition distinguishes components from classes, modules, and services in important ways.",
  },

  {
    id: "ITSEA_W10_Q10",
    type: "show-answer",
    tags: ["technological impact", "system design", "software processes"],
    sectionLabel: "2.5",
    text: "The consulting team proposes that MedSys Global transition from traditional component models toward service-oriented implementations hosted in the cloud.\n\nDiscuss why executable services are increasingly replacing traditional CBSE approaches in large-scale enterprise environments. Your answer should address:\n- Interoperability\n- Standards\n- Deployment\n- Scalability\n- Trade-offs associated with service-based systems",
    correctAnswers: [
      "Executable services are increasingly replacing traditional CBSE approaches because service-oriented systems resolve many of the interoperability limitations that plagued earlier component standards.\n\n**Interoperability** was a chronic failure of traditional CBSE environments. Technologies such as COM, CORBA CCM, and Enterprise Java Beans introduced fragmented, incompatible ecosystems. Components built under one standard frequently could not communicate with components built under another — even when they performed equivalent functions. This fragmentation made large-scale integration prohibitively expensive.\n\nModern service-oriented approaches improve interoperability because services communicate through widely adopted **open standards** and network protocols. This enables distributed systems across hospitals, insurers, and laboratories to exchange information without requiring shared runtime environments or compatible binary formats.\n\nServices also offer significant **deployment** advantages. They are managed by providers and accessed remotely, reducing installation complexity and maintenance overhead for consumers. MedSys Global's regional hospitals can integrate new capabilities without local installation or configuration — they simply invoke the service.\n\n**Scalability** is another major advantage. Cloud-hosted services allow resources to be dynamically allocated in response to fluctuating hospital demand — expanding during peak periods and contracting during low-utilisation windows without infrastructure investment.\n\nHowever, service-based systems introduce important **trade-offs**:\n- Network latency increases response times compared to locally invoked components\n- Performance may degrade under high-volume transaction scenarios\n- Distributed communication introduces new attack surfaces and security risks\n- Availability becomes dependent on network reliability and provider uptime\n- Loss of direct control over component internals may complicate compliance validation\n\nDespite these trade-offs, modern enterprises favour service-oriented architectures because interoperability and scalability outweigh performance costs in most healthcare integration scenarios. The historical lesson from CBSE fragmentation is that open, network-accessible standards ultimately displace proprietary component ecosystems.",
    ],
    markingGuide: `| Assessment Area | Marks |
|---|---|
| Explains interoperability issues with traditional CBSE | 4 |
| Discusses standards (COM, CORBA, EJB context) | 3 |
| Explains deployment advantages | 3 |
| Explains scalability benefits | 2 |
| Evaluates trade-offs critically | 2 |
| Integrated critical analysis | 1 |
| **Total** | **15** |

**Common weaknesses:** Simply listing cloud advantages without explaining *why services emerged historically* as a response to CBSE fragmentation. Omitting the trade-offs section entirely.`,
    points: 15,
    image: {
        src: "/images/ITSEA_W10_Q10.png",
        alt: "Timeline infographic illustrating the evolution from traditional enterprise component models such as COM and CORBA toward cloud-based microservices and distributed healthcare services.",
        caption: "Evolution of enterprise component technologies from tightly coupled component standards to interoperable cloud-based service architectures."
        }
  },

  // ─── QUESTION 3 — CBSE Processes & Organisational Reuse ─────────────────────

  {
    id: "ITSEA_W10_Q11",
    type: "multiple-choice",
    tags: ["software processes", "system design"],
    sectionLabel: "3.1",
    text: "MedSys Global develops a patient-record component originally designed for one hospital, then generalises it so it can be reused across all hospitals internationally.\n\nWhich CBSE process does this represent?",
    options: [
      "CBSE with reuse",
      "Additive composition",
      "CBSE for reuse",
      "Sequential integration",
    ],
    correctAnswers: ["CBSE for reuse"],
    points: 3,
    explanation:
      "**CBSE for reuse** is the process of developing or generalising components *with the explicit intention* of making them reusable in future systems. It involves abstracting domain-specific details, stabilising interfaces, and ensuring the component functions correctly across varied deployment contexts. This is distinct from **CBSE with reuse**, which describes *using* existing components to build a new system.",
  },

  {
    id: "ITSEA_W10_Q12",
    type: "open-ended",
    tags: ["software processes"],
    sectionLabel: "3.2",
    text: "State the CBSE process concerned with developing new systems using existing reusable components.\n\n**Answer in three words or fewer.**",
    correctAnswers: ["CBSE with reuse", "cbse with reuse"],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 0,
    },
    explanation:
      "**CBSE with reuse** describes the process of constructing a new system by selecting, evaluating, and assembling existing reusable components rather than developing from scratch. It requires identifying suitable components, adapting requirements to match available capabilities, and integrating components through defined interfaces.",
  },

  {
    id: "ITSEA_W10_Q13",
    type: "multiple-choice",
    tags: ["validation & verification", "risk management"],
    sectionLabel: "3.3",
    text: "During procurement, MedSys Global discovers that a third-party pharmacy component performs undocumented background network activity.\n\nWhich CBSE concern is MOST relevant here?",
    options: [
      "Sequential dependency",
      "Validation risk",
      "Parameter composition",
      "Additive scalability",
    ],
    correctAnswers: ["Validation risk"],
    points: 3,
    explanation:
      "**Validation risk** arises when component specifications are incomplete or misleading — making it impossible to fully verify that a component behaves as expected before deployment. Undocumented background network activity is precisely this kind of hidden behaviour: the component's true behaviour cannot be inferred from its documentation, creating security and compliance exposure in a regulated healthcare environment.",
  },

  {
    id: "ITSEA_W10_Q14",
    type: "fill-in-the-blank",
    tags: ["requirements analysis", "system design"],
    sectionLabel: "3.4",
    text: "A reusable component is most likely to succeed when associated with a stable domain ___.",
    blanks: [
      {
        id: "b1",
        options: ["abstraction", "interface", "deployment", "middleware"],
        correctAnswer: "abstraction",
      },
    ],
    explanation:
      "Reusable components succeed when they are anchored to stable **domain abstractions** — conceptual models of a business area (e.g., patient records, medication dispensing) that evolve slowly and remain consistent across different system implementations. Components tied to volatile, implementation-specific details are far harder to reuse reliably.",
  },

  {
    id: "ITSEA_W10_Q15",
    type: "show-answer",
    tags: ["requirements analysis", "software processes", "managerial impact"],
    sectionLabel: "3.5",
    text: "The data science and architecture teams disagree about whether MedSys Global should adapt its requirements to match available reusable components.\n\nCritically discuss the trade-offs involved in modifying system requirements to accommodate reusable components during **CBSE with reuse**.",
    correctAnswers: [
      "CBSE with reuse requires balancing ideal organisational requirements against the practical capabilities of available reusable components — a tension that has both technical and strategic dimensions.\n\n**Advantages of adapting requirements** are real and significant. Leveraging existing components reduces development time and engineering costs, which is particularly valuable in large healthcare environments with tight deployment timelines. Mature components may also improve reliability because they have already been validated through extensive real-world production use across comparable systems.\n\nHowever, **modifying requirements introduces strategic risks** that cannot be dismissed. Organisations may unconsciously constrain their business processes to fit the limitations of available software rather than the other way around. In healthcare systems, this risk is acute: compromises to patient workflows, regulatory compliance requirements, or operational flexibility could have direct clinical and legal consequences.\n\n**Validation concerns** add further complexity. Component specifications may not fully describe runtime behaviour, making it difficult to assess hidden functionality, performance characteristics, or security risks. A component that appears to satisfy requirements based on documentation alone may behave differently under real workloads — and incomplete specs leave organisations exposed.\n\n**Dependency management** is also a strategic concern. Selecting components based on short-term availability rather than long-term architectural alignment can create rigidity and vendor dependence that undermines future system evolution. When an organisation shapes its requirements around a vendor's component, it implicitly accepts the vendor's roadmap, pricing, and support lifecycle.\n\nEffective CBSE with reuse therefore requires:\n- Iterative requirement refinement rather than one-time adaptation\n- Repeated component evaluation against evolving needs\n- Explicit trade-off analysis and governance sign-off\n- Alignment mechanisms that ensure technical reuse decisions support — not contradict — strategic business objectives\n\nThe most successful organisations treat component reuse as a *strategic trade-off* to be consciously managed, not an automatic efficiency to be assumed.",
    ],
    markingGuide: `| Assessment Area | Marks |
|---|---|
| Explains advantages of reuse (speed, reliability) | 4 |
| Discusses requirement trade-offs and strategic risks | 4 |
| Evaluates validation and specification concerns | 3 |
| Discusses dependency and vendor-lock risks | 2 |
| Critical synthesis and governance recommendations | 2 |
| **Total** | **15** |

**Common weaknesses:** Discussing only the technical advantages of reuse without addressing *organisational and strategic* consequences. Failing to connect requirement adaptation to healthcare-specific compliance and workflow risks.`,
    points: 15,
  },

  // ─── QUESTION 4 — Component Composition & Interface Compatibility ─────────────

  {
    id: "ITSEA_W10_Q16",
    type: "multiple-choice",
    tags: ["system design", "interfaces & abstract classes"],
    sectionLabel: "4.1",
    text: "A laboratory component sends patient identifiers as integers, while the billing component expects encrypted alphanumeric tokens for the same operation.\n\nWhich incompatibility type is illustrated?",
    options: [
      "Operation incompleteness",
      "Sequential incompatibility",
      "Parameter incompatibility",
      "Hierarchical inconsistency",
    ],
    correctAnswers: ["Parameter incompatibility"],
    points: 3,
    explanation:
      "**Parameter incompatibility** occurs when two components agree on *what* operation to perform but disagree on the *format or type* of the data exchanged. Both components are performing the same conceptual operation (passing a patient identifier), but one uses integers while the other requires encrypted alphanumeric tokens. An adaptor component is typically required to bridge this gap.",
    image: {
        src: "/images/ITSEA_W10_Q16.png",
        alt: "Software interface diagram showing parameter incompatibility between a laboratory component and a billing component, resolved through an adaptor component.",
        caption: "Illustration of parameter incompatibility between independently developed components and the role of adaptor components in interface reconciliation."
        }
    },

  {
    id: "ITSEA_W10_Q17",
    type: "fill-in-the-blank",
    tags: ["system design"],
    sectionLabel: "4.2",
    text: "The process of assembling multiple components to create a complete system is called component ___.",
    blanks: [
      {
        id: "b1",
        options: ["deployment", "integration", "abstraction", "composition"],
        correctAnswer: "composition",
      },
    ],
    explanation:
      "**Component composition** is the process of connecting and assembling components — through their defined interfaces — to produce a functioning system. Composition differs from simple integration: it implies that components interact exclusively through their formal interfaces and that the resulting system's behaviour is a function of the components' individual behaviours and their interaction contracts.",
  },

  {
    id: "ITSEA_W10_Q18",
    type: "multiple-choice",
    tags: ["system design", "software processes"],
    sectionLabel: "4.3",
    text: "A hospital reporting component calls services provided by a central authentication component.\n\nWhich type of component composition is being used?",
    options: [
      "Additive composition",
      "Sequential composition",
      "Hierarchical composition",
      "Parallel composition",
    ],
    correctAnswers: ["Hierarchical composition"],
    points: 3,
    explanation:
      "**Hierarchical composition** occurs when one component depends on and invokes services provided by another component — creating a parent-child service dependency. The reporting component sits above the authentication component in the dependency hierarchy. This differs from **sequential composition** (output of one becomes input of the next) and **additive composition** (combining components to create new aggregate capabilities).",
  },

  {
    id: "ITSEA_W10_Q19",
    type: "open-ended",
    tags: ["system design"],
    sectionLabel: "4.4",
    text: "What specialised software construct is used to reconcile incompatible component interfaces?\n\n**Answer in two words only.**",
    correctAnswers: [
      "Adaptor component",
      "adaptor component",
      "adapter component",
      "Adapter component",
    ],
    points: 2,
    validationOptions: {
      caseSensitive: false,
      tolerance: 10,
      allowPartialMatch: true,
    },
    explanation:
      "An **adaptor component** (also spelled adapter) is a purpose-built component that translates between incompatible interfaces — bridging differences in operation names, parameter formats, protocols, or data representations. Critically, adaptors reconcile incompatibilities *without modifying* the original components, preserving their integrity and reusability.",
  },

  {
    id: "ITSEA_W10_Q20",
    type: "show-answer",
    tags: ["system design", "technological impact", "risk management"],
    sectionLabel: "4.5",
    text: "MedSys Global plans to integrate emergency response systems, insurance platforms, laboratory services, and cloud-hosted patient analytics into a unified ecosystem.\n\nAnalyse the architectural challenges associated with component composition in this environment. Your discussion should include:\n- Composition types\n- Interface incompatibilities\n- Emergent properties\n- Future scalability\n- The role of adaptor components",
    correctAnswers: [
      "Large-scale component composition in a heterogeneous healthcare ecosystem introduces both technical and organisational complexity that extends well beyond individual component quality.\n\n**Composition types** will coexist simultaneously across the MedSys Global architecture:\n- *Sequential composition* governs workflow processing — for example, patient admission triggering lab requests, then billing events in sequence\n- *Hierarchical composition* governs service dependencies — for example, the reporting component invoking the authentication component before accessing patient records\n- *Additive composition* combines independent capabilities — for example, aggregating emergency, insurance, and analytics data into a unified dashboard\n\nManaging multiple composition models within a single system requires explicit architectural governance to prevent composition conflicts.\n\n**Interface incompatibilities** are inevitable in heterogeneous healthcare environments where components were developed independently over years. Incompatibilities may involve operation naming (different terms for the same action), parameter formats (integers vs. encrypted tokens vs. FHIR identifiers), communication protocols (REST vs. SOAP vs. proprietary), or mismatched required and provided services.\n\n**Adaptor components** become architecturally critical in this context. Adaptors translate interfaces and reconcile incompatibilities without modifying the original components — preserving their tested, validated behaviour. Without adaptors, every integration point would require modifying source components, breaking their reusability and invalidating prior testing.\n\n**Emergent properties** represent one of the most challenging aspects of large-scale composition. When independently developed systems interact, unexpected system-wide behaviours arise that could not be predicted by inspecting any individual component. In MedSys Global's environment, emergent risks include: cascading failures when authentication or middleware layers experience latency, security vulnerabilities at component boundaries, inconsistent transaction handling between lab and billing systems, and performance bottlenecks under high concurrent load.\n\n**Scalability** must be a first-class architectural concern. Composition strategies must accommodate future hospital additions, new insurance integrations, evolving analytics platforms, and changing regulatory compliance requirements — ideally without requiring full architectural redesign. This favours loose coupling, stable interfaces, and middleware-mediated communication over direct component dependencies.\n\nThere is also a strategic trade-off between rapid deployment and long-term maintainability. Poorly designed composition creates hidden coupling that eventually reproduces the tight-coupling problems CBSE was adopted to solve.\n\nEffective composition in this environment therefore requires: explicit governance over interface standards, rigorous pre-integration testing, adaptor component management, middleware coordination, emergent behaviour monitoring, and architectural planning that anticipates future integration rather than reacting to it.",
    ],
    markingGuide: `| Assessment Area | Marks |
|---|---|
| Explains composition types with examples | 4 |
| Discusses interface incompatibilities (types and causes) | 4 |
| Explains adaptor component role | 3 |
| Discusses emergent properties and system-level risks | 2 |
| Evaluates scalability concerns | 1 |
| Integrated critical analysis | 1 |
| **Total** | **15** |

**Common weaknesses:** Defining composition types in isolation without discussing how they coexist. Treating emergent properties as a peripheral concern rather than a primary architectural risk in healthcare systems.`,
    points: 15,
    image: {
        src: "/images/ITSEA_W10_Q20.png",
        alt: "Enterprise healthcare ecosystem architecture showing distributed components, middleware communication, cloud analytics, adaptor components, and interoperable healthcare services.",
        caption: "Distributed healthcare component ecosystem demonstrating middleware coordination, component composition, interoperability challenges, and scalable enterprise integration."
        }
  },
];
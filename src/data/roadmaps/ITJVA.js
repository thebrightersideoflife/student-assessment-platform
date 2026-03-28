// Example roadmap for ITJVA (Introduction to Java).
// Structured to match RoadmapPage expectations: sections -> cards[].

const ITJVA = {
	id: "ITJVA",
	title: "Introduction to Java — Roadmap",
	description: "A suggested learning path covering core Java topics.",
	sections: [
		{
			id: "basics",
			title: "Java Basics",
			cards: [
				{
					id: "syntax",
					title: "Syntax & Structure",
					description: "Learn Java file structure, classes, methods, variables, and basic program flow.",
					resource: { url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/", label: "Oracle Java Tutorial" },
					tags: ["beginner", "syntax"],
				},
				{
					id: "types",
					title: "Data Types & Operators",
					description: "Understand primitives, reference types, and common operators used in Java.",
					tags: ["types"],
				},
			],
		},
		{
			id: "oop",
			title: "Object-Oriented Programming",
			cards: [
				{
					id: "classes",
					title: "Classes & Objects",
					description: "Design classes, instantiate objects, and work with constructors and methods.",
					tags: ["oop"],
				},
				{
					id: "inheritance",
					title: "Inheritance & Interfaces",
					description: "Use inheritance for code reuse and interfaces for contracts between types.",
					tags: ["oop", "design"],
				},
			],
		},
	],
	highlight: {
		label: "Exam Tip",
		text: "Practice writing small programs repeatedly; focus on problem decomposition before coding.",
	},
	footerLines: [
		"This roadmap is a suggested study path — adapt it to your course schedule.",
	],
};

export default ITJVA;

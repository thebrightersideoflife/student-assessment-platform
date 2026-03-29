// Refactored roadmap with original rich content mapped into structured format

const ITJVA = {
	id: "ITJVA",
	title: "ITJVA – Accelerated Java Learning Roadmap",
	description:
		"A focused, assessment-aligned resource guide designed to help you master Java, Object-Oriented Programming, GUIs, Databases, and Testing efficiently.",

	sections: [
		{
			id: "fundamentals",
			title: "1. Java Fundamentals (Weeks 1–2)",
			cards: [
				{
					id: "intro-java",
					title: "Beginner-Friendly Java Introduction",
					description:
						"Learn Java syntax, variables, operators, control flow, and basic program structure with a beginner-friendly explanation style.",
					resource: {
						url: "https://www.youtube.com/watch?v=hoqLi6RmSMs",
						label: "Watch on YouTube",
					},
					tags: ["Syntax", "Variables", "Loops", "Conditionals"],
				},
				{
					id: "w3schools-java",
					title: "W3Schools – Java Tutorial",
					description:
						"Reinforce core Java concepts with concise explanations, runnable examples, and practice exercises ideal for coursework and revision.",
					resource: {
						url: "https://www.w3schools.com/java/default.asp",
						label: "Visit W3Schools",
					},
					tags: ["Practice", "Exercises", "Reference"],
				},
			],
		},

		{
			id: "oop",
			title: "2. Object-Oriented Programming Mastery (Weeks 2–3)",
			cards: [
				{
					id: "neso-oop",
					title: "Neso Academy – OOP in Java",
					description:
						"A deep-dive series covering classes, objects, methods, constructors, inheritance, polymorphism, and UML-to-code relationships.",
					resource: {
						url: "https://www.youtube.com/watch?v=W-D71ZeMixQ&list=PLBlnK6fEyqRiwWLbSXKFtdGV8OVqr9dZr",
						label: "Watch the Playlist",
					},
					tags: ["OOP", "Classes", "UML", "Design"],
				},
			],
		},

		{
			id: "problem-solving",
			title: "3. Problem Solving & Critical Thinking",
			cards: [
				{
					id: "java-exercises",
					title: "Java Problem-Solving Exercises",
					description:
						"Strengthen logical reasoning, algorithmic thinking, and problem-to-code translation – essential for assessments and real-world development.",
					resource: {
						url: "https://www.youtube.com/watch?v=1T1KYNM9TTk&list=PLvQSG8B7sh6lJEXbVQMpQUX39NHtry0hi",
						label: "Watch Exercises Playlist",
					},
					tags: ["Algorithms", "Logic", "Problem Solving"],
				},
			],
		},

		{
			id: "collections-gui",
			title: "4. Arrays, ArrayLists & GUI Development (Weeks 4–5)",
			cards: [
				{
					id: "collections-gui",
					title: "Collections & GUI Design",
					description:
						"Learn data storage with arrays and ArrayLists and build interactive user interfaces using JavaFX and event handling.",
					tags: ["Arrays", "ArrayList", "JavaFX", "Event Handling"],
				},
			],
		},

		{
			id: "databases-testing",
			title: "5. Databases, Files & Testing (Weeks 6–8)",
			cards: [
				{
					id: "data-persistence",
					title: "Data Persistence & Quality Assurance",
					description:
						"Covers file handling, JDBC database connectivity, exception handling, testing strategies, and technical documentation.",
					resource: {
						url: "https://www.w3schools.com/java/",
						label: "W3Schools – Advanced Java Topics",
					},
					tags: ["JDBC", "Files", "Testing", "Documentation"],
				},
			],
		},
	],

	highlight: {
		label: "Efficiency Principle",
		text:
			"Every concept should immediately strengthen Project 1 or assessment performance. If it doesn't, deprioritise it.",
	},

	footerLines: [
		"ITJVA – Introduction to Java",
		"Accelerated learning roadmap",
	],
};

export default ITJVA;
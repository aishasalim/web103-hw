// seed.js
const pool = require('./db');

const tips = [
    {
        title: "Conduct Market Research",
        text: "Understand your target audience by conducting thorough market research.",
        category: "Market Research",
        image: "/images/market-research.jpg",
        submittedBy: "Alice"
    },
    {
        title: "Brainstorm Business Ideas",
        text: "Explore different business ideas to find your niche in the market.",
        category: "Business Models",
        image: "/images/brainstorm.jpg",
        submittedBy: "Bob"
    },
    {
        title: "Develop a Minimum Viable Product",
        text: "Create an MVP to test your product's viability in the market.",
        category: "Product Development",
        image: "/images/mvp.jpg",
        submittedBy: "Carol"
    },
    {
        title: "Build a Strong Sales Team",
        text: "Hire and train a sales team to effectively sell your product.",
        category: "Sales",
        image: "/images/sales-team.jpg",
        submittedBy: "Dave"
    },
    {
        title: "Secure Funding for Your Startup",
        text: "Explore various funding options like angel investors, venture capitalists, or crowdfunding.",
        category: "Funding",
        image: "/images/funding.jpg",
        submittedBy: "Eve"
    }
];

const seedDatabase = async () => {
    try {
        for (const tip of tips) {
            const query = `
                INSERT INTO tips (title, text, category, image, submitted_by)
                VALUES ($1, $2, $3, $4, $5)
            `;
            const values = [tip.title, tip.text, tip.category, tip.image, tip.submittedBy];
            await pool.query(query, values);
        }
        console.log("Tips seeded successfully!");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        pool.end();
    }
};

seedDatabase();

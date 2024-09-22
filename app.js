// app.js

const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const tips = [
    {
      id: 1,
      title: "Conduct Market Research",
      text: "Understand your target audience by conducting thorough market research.",
      category: "Market Research",
      image: "/images/market-research.jpg",
      submittedBy: "Alice"
    },
    {
      id: 2,
      title: "Brainstorm Business Ideas",
      text: "Explore different business ideas to find your niche in the market.",
      category: "Business Models",
      image: "/images/brainstorm.jpg",
      submittedBy: "Bob"
    },
    {
      id: 3,
      title: "Develop a Minimum Viable Product",
      text: "Create an MVP to test your product's viability in the market.",
      category: "Product Development",
      image: "/images/mvp.jpg",
      submittedBy: "Carol"
    },
    {
      id: 4,
      title: "Build a Strong Sales Team",
      text: "Hire and train a sales team to effectively sell your product.",
      category: "Sales",
      image: "/images/sales-team.jpg",
      submittedBy: "Dave"
    },
    {
      id: 5,
      title: "Secure Funding for Your Startup",
      text: "Explore various funding options like angel investors, venture capitalists, or crowdfunding.",
      category: "Funding",
      image: "/images/funding.jpg",
      submittedBy: "Eve"
    }
  ];
  
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index', { tips });
  });

app.get('/tips/:id', (req, res) => {
    const tip = tips.find(t => t.id === parseInt(req.params.id));
    if (tip) {
      res.render('detail', { tip });
    } else {
      res.status(404).render('404');
    }
  });
   
app.use((req, res) => {
    res.status(404).render('404');
  });
  
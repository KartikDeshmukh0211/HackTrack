const sampleProblems = [
  {
    title: "AI-Powered Chatbot for Mental Health Support",
    description:
      "Mental health issues are on the rise, and many individuals hesitate to seek help due to stigma or financial constraints. This project aims to develop an AI-powered chatbot capable of providing emotional support, self-help exercises, and early mental health intervention. The chatbot should use NLP for understanding user emotions and suggest professional help when necessary. Privacy, security, and ethical considerations must be strictly maintained.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qQkoyE9ZnwrzxOD72AdsEelKDX7FaDiswQ&s",
    posted_by: "Ministry of Health & Family Welfare (Government)",
    category: "Healthcare",
  },
  {
    title: "Smart Traffic Management System Using AI",
    description:
      "Traffic congestion leads to increased pollution, wasted fuel, and longer commute times. This challenge requires an AI-based traffic management system that analyzes real-time traffic data from IoT sensors and GPS devices. The system should optimize traffic lights, suggest alternative routes, and prioritize emergency vehicles to enhance city mobility.",
    image:
      "https://media.licdn.com/dms/image/D5612AQFkL3H46Mt72A/article-cover_image-shrink_600_2000/0/1719006899476?e=2147483647&v=beta&t=f_lIHUNcqG4BZNjyJ5Caf5R7hSC9mE7SiqqJHfaa1p4",
    posted_by: "John Doe (User)",
    category: "Smart Cities",
  },
  {
    title: "Blockchain-Based Land Registry System",
    description:
      "Traditional land registry systems are prone to fraud, inefficiency, and corruption. This project focuses on developing a blockchain-based land registry that ensures secure, transparent, and immutable records of land ownership. The system should facilitate digital verification, property transactions, and smart contracts for automated legal processes.",
    image:
      "https://media.licdn.com/dms/image/v2/D4E12AQHYqJ7XST4iXA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1667329647112?e=2147483647&v=beta&t=nMH5Jb6W3pMYfkXCc146iExNXDz-j92jfvhYcBxbGRM",
    posted_by: "Ministry of Urban Development (Government)",
    category: "Blockchain",
  },
  {
    title: "AI-Based Resume Shortlisting System",
    description:
      "Recruiters struggle with the time-consuming process of manually screening thousands of resumes. This challenge is to build an AI-driven resume screening system that analyzes job applications, extracts key skills, and ranks candidates based on qualifications. The goal is to reduce bias and enhance recruitment efficiency.",
    image:
      "https://cdn.prod.website-files.com/64d03d94c73469cb85a2d02f/64d03d94c73469cb85a2d3ca_shutterstock_1279483576.png",
    posted_by: "Alice Smith (User)",
    category: "Human Resources",
  },
  {
    title: "Virtual Reality Museum for Cultural Heritage",
    description:
      "Many historical sites and artifacts are inaccessible due to geographical barriers or preservation concerns. This project involves developing a Virtual Reality (VR) museum where users can explore cultural heritage, artifacts, and historical events in an immersive 3D environment. Features like AI-powered tour guides, interactive storytelling, and multi-language support can enhance learning experiences.",
    image:
      "https://www.museumnext.com/wp-content/uploads/2024/12/metaverse_museums.jpg",
    posted_by: "Indian Heritage Society (Government)",
    category: "AR/VR",
  },
  {
    title: "AI-Powered Personalized Learning Assistant",
    description:
      "Students have different learning styles and speeds, yet traditional education is often one-size-fits-all. This project involves an AI-powered learning assistant that tracks student progress, identifies weaknesses, and recommends personalized study materials. Features like gamification, adaptive quizzes, and real-time feedback can make learning more effective and engaging.",
    image:
      "https://elearningindustry.com/wp-content/uploads/2023/06/Shutterstock_2287315871.jpg",
    posted_by: "Google Developers (User)",
    category: "Education",
  },
  {
    title: "Smart Waste Management System",
    description:
      "Urban waste management is inefficient, leading to overflowing garbage bins and environmental pollution. This challenge requires an IoT-enabled smart waste management system where smart bins detect fill levels, optimize collection routes, and promote waste segregation. AI analytics can predict waste trends and improve sustainability efforts.",
    image:
      "https://psiborg.in/wp-content/uploads/2024/01/Garbage-Bin-monitoring-3.webp",
    posted_by: "Green Earth Initiative (User)",
    category: "Environment",
  },
  {
    title: "AI-Powered Fake News Detection System",
    description:
      "Fake news is spreading rapidly on social media, influencing public opinion and causing misinformation. This project aims to build an AI-powered system that detects fake news using NLP, deep learning, and fact-checking techniques. The system should provide real-time verification and alert users about potentially misleading content.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlvciQmQP1ZTW1KjE6d4ckPUIUh-zgDzLSA&s",
    posted_by: "Digital Journalism Association (Government)",
    category: "Media & Communication",
  },
  {
    title: "AI-Based Wildlife Poaching Detection System",
    description:
      "Illegal wildlife poaching is endangering many species, particularly in remote forests where manual surveillance is difficult. This project involves using drones, thermal imaging, and AI-powered image recognition to detect poaching activities and alert authorities in real time.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5iK0q0VCngGj6PhaKnVAAf13-Rs_TE2yNpw&s",
    posted_by: "Wildlife Conservation Trust (Government)",
    category: "Conservation",
  },
  {
    title: "Smart Water Management System",
    description:
      "Water scarcity is a global issue, worsened by inefficient usage and distribution. This challenge requires a smart water management system that monitors consumption using IoT sensors, detects leaks, and suggests conservation methods. AI-powered insights can help authorities implement better policies for water sustainability.",
    image:
      "https://development.asia/sites/default/files/explainer/smart-water-mngt-system-01.jpg",
    posted_by: "Global Water Alliance (User)",
    category: "Sustainability",
  },
  {
    title: "AI-Powered Legal Document Analyzer",
    description:
      "Legal professionals, businesses, and individuals often struggle with reading and interpreting complex legal documents, contracts, and agreements. These documents are typically filled with legal jargon, making it difficult to understand crucial clauses, potential risks, and obligations. This project aims to build an AI-driven legal document analyzer that scans, categorizes, and summarizes key points in contracts. It should highlight risky clauses, identify missing important sections, and provide simple explanations for non-legal experts. This tool will not only save time but also help avoid costly legal mistakes by ensuring proper contract understanding.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQHthl6Xx3FXmg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1722859426449?e=2147483647&v=beta&t=4GZyTRuLDVZUXuVfb_YM6_bGZtBku3mK9EnpUrV4IUE",
    posted_by: "Ministry of Law & Justice (Government)",
    category: "Legal Tech",
  },
  {
    title: "IoT-Based Smart Irrigation System",
    description:
      "Agriculture is one of the largest consumers of freshwater, yet a significant amount of water is wasted due to inefficient irrigation techniques. Traditional irrigation systems either overwater or underwater crops, leading to reduced yields and soil degradation. This project involves developing an IoT-enabled smart irrigation system that uses real-time data from soil moisture sensors, weather forecasts, and crop requirements to automate irrigation schedules. The system should optimize water usage, notify farmers about potential drought risks, and provide insights into soil health, ensuring sustainable farming practices.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vI1HAUq7KIK0nhe9Y334IZQtPWj6ssjhPQ&s",
    posted_by: "Agricultural Research Council (Government)",
    category: "Agriculture",
  },
  {
    title: "AI-Driven Personalized Career Counseling",
    description:
      "With rapidly changing job markets, students and professionals often find it challenging to choose the right career path. Many struggle due to a lack of guidance, industry insights, or knowledge of required skills. This project proposes an AI-powered career counseling platform that analyzes a user's interests, skills, educational background, and industry trends to provide personalized career suggestions. The platform should also recommend relevant online courses, internships, and job opportunities, helping individuals make informed career decisions and bridging the gap between education and employment.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQG5XlWiK2Dt7A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721173733276?e=2147483647&v=beta&t=aA-HvQlB4UijTHjoPYCsLld7h_Fxz20upH4a5M9ZiVc",
    posted_by: "Future Jobs Initiative (User)",
    category: "Education",
  },
  {
    title: "Smart Energy Consumption Tracker",
    description:
      "Many households and businesses waste electricity due to a lack of real-time energy usage monitoring. High electricity bills and excessive power consumption contribute to financial and environmental concerns. This project aims to create a smart energy tracking system that provides real-time insights into power consumption patterns. It should identify energy-intensive appliances, suggest ways to reduce power wastage, and provide alerts for unusual consumption spikes. Additionally, the system can offer recommendations for switching to energy-efficient alternatives and integrating renewable energy sources.",
    image: "https://www.energyly.com/assets/images/video/analytics.png",
    posted_by: "Renewable Energy Council (Government)",
    category: "Sustainability",
  },
  {
    title: "AI-Based Resume Screening System",
    description:
      "Recruiters and HR teams face significant challenges in screening thousands of resumes for job openings. Manually filtering candidates is time-consuming and often leads to biased selections. This project involves developing an AI-powered resume screening system that can analyze job descriptions and match the most relevant resumes based on qualifications, skills, and experience. The system should rank candidates, highlight discrepancies in resumes, and provide fair evaluations to ensure an efficient and unbiased hiring process.",
    image:
      "https://cdn.prod.website-files.com/64d03d94c73469cb85a2d02f/64d03d94c73469cb85a2d3ca_shutterstock_1279483576.png",
    posted_by: "Tech Recruiters Inc. (User)",
    category: "Human Resources",
  },
  {
    title: "AI-Driven Personalized Financial Advisor",
    description:
      "Many individuals lack financial literacy and struggle with making informed decisions about savings, investments, and budgeting. This project proposes an AI-driven financial advisory tool that analyzes an individual's income, expenses, financial goals, and market trends to offer personalized financial guidance. The system should suggest investment options, track spending habits, alert users about potential financial risks, and help them achieve financial stability.",
    image:
      "https://mitsloan.mit.edu/sites/default/files/styles/article_header/public/2024-04/ai-financial-advisor_0.jpg?h=d11f454f&itok=bielWAjm",
    posted_by: "Financial Literacy Foundation (User)",
    category: "Finance",
  },
  {
    title: "Crowdsourced Road Condition Reporting System",
    description:
      "Road maintenance authorities often struggle to identify and repair potholes and damaged roads on time, leading to accidents, increased vehicle maintenance costs, and traffic congestion. This project aims to develop a crowdsourced platform where users can report poor road conditions by uploading geotagged images of potholes, cracks, or missing street signs. Authorities can use this data to prioritize repairs, allocate budgets efficiently, and enhance road safety.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2nIPQAGfmBmHwWEg3CjicApyQExPkg4SlA&s",
    posted_by: "Ministry of Transport (Government)",
    category: "Smart Cities",
  },
  {
    title: "AI-Powered Virtual Interior Designer",
    description:
      "Many homeowners and businesses struggle with space optimization and interior design choices. This project involves creating an AI-powered virtual interior designer that can analyze room dimensions, furniture placement, and lighting conditions to provide design suggestions. Users can upload photos of their spaces, and the system will generate 3D visualizations with recommended layouts, color palettes, and furniture arrangements, making interior designing accessible and cost-effective.",
    image:
      "https://planner5d.com/assets/images/landing-seo/room-planner-tool/intro_pic_mobile_2@2x.webp",
    posted_by: "Smart Home Solutions (User)",
    category: "Home Improvement",
  },
  {
    title: "Real-Time Air Quality Monitoring App",
    description:
      "Air pollution is a growing global concern, yet many people lack access to real-time air quality data. This project proposes the development of a mobile application that integrates with IoT-based air quality sensors to provide live updates on pollution levels, hazardous gas concentrations, and health risks. The app should offer location-based pollution forecasts, suggest protective measures, and notify users when air quality drops to dangerous levels.",
    image: "https://www.aqi.in/media/pages/app/hero-mockup-light.webp",
    posted_by: "Environmental Protection Agency (Government)",
    category: "Environment",
  },
  {
    title: "AI-Powered Customer Support Chatbot",
    description:
      "Companies receive thousands of customer inquiries daily, which can overwhelm customer support teams. This project involves developing an AI-powered chatbot that understands user queries, provides instant solutions, and escalates unresolved issues to human agents. The chatbot should integrate with company databases, analyze customer sentiment, and provide multilingual support to enhance user experience.",
    image:
      "https://www.chatbot.com/home__scanning-ai.978c40d39a7ec222ec08dab825570a4dda2c68ef4840b50c11c30228fc19af44.png",
    posted_by: "E-Commerce Association (User)",
    category: "Business",
  },
  {
    title: "AI-Powered Personalized Book Recommendation System",
    description:
      "Finding books that match a reader's interests can be challenging. This project proposes developing an AI-driven book recommendation engine that analyzes user preferences, past reading history, and popular trends to suggest books. The system should also provide personalized reading challenges, community discussions, and genre-based recommendations.",
    image:
      "https://www.solulab.com/wp-content/uploads/2024/10/AI-Powered-Recommendation-System.jpg",
    posted_by: "Book Lovers Community (User)",
    category: "Entertainment",
  },
  {
    title: "AI-Based Personalized Sleep Coach",
    description:
      "Millions of people suffer from sleep disorders caused by stress, poor habits, or medical conditions. This project involves creating an AI-powered sleep monitoring and coaching system that tracks sleep patterns, analyzes disturbances, and suggests lifestyle changes to improve sleep quality. The system should integrate with smart devices and provide tailored bedtime routines for better sleep hygiene.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBrGBzzqXvBepaQ0dxIJTZfcz34FCuxgXWOQ&s",
    posted_by: "Sleep Research Institute (User)",
    category: "Health & Wellness",
  },
];

module.exports = sampleProblems;

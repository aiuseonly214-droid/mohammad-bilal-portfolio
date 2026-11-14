import {
  Profile,
  WebsiteSettings,
  EducationRecord,
  TechnicalSkill,
  SoftSkill,
  Project,
  Certification,
  Achievement,
  Experience,
  ResearchPublication,
  CommunicationMilestone,
  EventItem,
  GalleryMedia,
  CareerGoal,
  ResumeDocument,
  SocialLink,
  ContactMessage,
  MediaAsset
} from '@/types/database';

export const initialProfile: Profile = {
  id: '00000000-0000-0000-0000-000000000001',
  full_name: 'Mohammad Bilal',
  headline: 'Aspiring Data Analyst | Fresher | BCA Graduate',
  short_intro: 'Motivated BCA graduate and aspiring Data Analyst with strong hands-on skills in SQL, Microsoft Power BI, Advanced Excel, and Python. Seeking entry-level Data Analyst, MIS Executive, or Junior BI roles.',
  bio: 'Hello, I am Mohammad Bilal, a recent graduate with a passion for numbers, problem-solving, and data storytelling. During my academic journey and personal projects, I developed practical skills in writing SQL queries, building Power BI dashboards, cleaning raw datasets using Excel & Python, and extracting meaningful business insights. I am eager to begin my career as an entry-level Data Analyst, contribute to real-world projects, and continuously learn from experienced team members.',
  personal_introduction: 'Dedicated BCA graduate with a structured analytical mindset, quick learning ability, and a strong drive to solve practical business problems through data.',
  career_interests: 'Data Analysis, Business Intelligence, MIS Reporting, SQL Querying, Dashboard Design, and Data Visualization.',
  professional_philosophy: 'Clear data leads to confident decisions. I focus on accuracy, neat documentation, and continuous daily improvement.',
  personal_strengths: 'Analytical problem solving, attention to detail, strong self-discipline, and eagerness to learn new tools quickly.',
  learning_mindset: 'Continuously upskilling through online courses, hands-on practice datasets on Kaggle, and building real-world projects.',
  future_ambitions: 'To grow into a dependable Data Analyst and contribute to impactful business intelligence solutions for modern teams.',
  profile_photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  email: 'mohammad.bilal.analytics@example.com',
  phone: '+91 98765 43210',
  location: 'India',
  desired_roles: ['Data Analyst Intern', 'Junior Data Analyst', 'MIS Executive', 'Business Intelligence Trainee'],
  rotating_headlines: [
    'Aspiring Data Analyst',
    'BCA Graduate & Quick Learner',
    'Power BI & SQL Enthusiast',
    'Problem Solver',
    'Open to Entry-Level Roles'
  ],
  primary_technical_skills: ['SQL', 'Power BI', 'Advanced Excel', 'Python', 'Data Cleaning', 'Tableau'],
  updated_at: new Date().toISOString()
};

export const initialSettings: WebsiteSettings = {
  id: 'current',
  website_title: 'Mohammad Bilal — Personal Brand & Professional Portfolio CMS',
  website_description: 'Official professional portfolio and dynamic personal brand of Mohammad Bilal.',
  seo_keywords: ['Mohammad Bilal', 'Data Analyst', 'Business Intelligence', 'SQL Projects', 'Power BI Dashboards', 'Python Analytics'],
  footer_text: 'Built with precision, high performance and verifiable evidence.',
  copyright_text: '© Mohammad Bilal. All rights reserved.',
  contact_email: 'mohammad.bilal.analytics@example.com',
  contact_phone: '+91 98765 43210',
  whatsapp_number: '+919876543210',
  is_contact_form_active: true,
  updated_at: new Date().toISOString()
};

export const initialEducation: EducationRecord[] = [
  {
    id: 'edu-1',
    qualification: 'Bachelor of Computer Applications (BCA)',
    institution_name: 'Apex Institute of Technology & Management',
    course_stream: 'Computer Science & Data Fundamentals',
    board_university: 'State University',
    start_year: 2021,
    completion_year: 2024,
    grade_percentage_cgpa: '8.4 CGPA',
    location: 'India',
    description: 'Specialized coursework in Database Management Systems (DBMS), Structured Query Language, Python Programming, Statistics, and Software Engineering.',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'edu-2',
    qualification: 'Higher Secondary Certificate (12th Grade)',
    institution_name: 'Model Senior Secondary School',
    course_stream: 'Science & Mathematics',
    board_university: 'Central Board of Secondary Education (CBSE)',
    start_year: 2019,
    completion_year: 2021,
    grade_percentage_cgpa: '86%',
    location: 'India',
    description: 'Strong foundation in Advanced Mathematics, Physics, Chemistry, and Computer Science fundamentals.',
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialSkills: TechnicalSkill[] = [
  {
    id: 'skill-1',
    skill_name: 'SQL & Relational Databases',
    category: 'SQL and Databases',
    proficiency_level: 'Advanced',
    proficiency_percentage: 90,
    duration_experience: '2+ years',
    description: 'Complex queries, CTEs, Window functions, Subqueries, Indexing, and Schema Design.',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-2',
    skill_name: 'Power BI & DAX Scripting',
    category: 'Power BI',
    proficiency_level: 'Proficient',
    proficiency_percentage: 85,
    duration_experience: '1.5 years',
    description: 'Interactive dashboard design, DAX calculated measures, data modeling (Star Schema), Power Query ETL.',
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-3',
    skill_name: 'Python for Data Analytics',
    category: 'Python',
    proficiency_level: 'Intermediate',
    proficiency_percentage: 80,
    duration_experience: '2 years',
    description: 'Pandas, NumPy, Matplotlib, Seaborn for data wrangling, cleaning, and exploratory data analysis.',
    display_order: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-4',
    skill_name: 'Advanced Microsoft Excel',
    category: 'Microsoft Excel',
    proficiency_level: 'Advanced',
    proficiency_percentage: 90,
    duration_experience: '3 years',
    description: 'XLOOKUP, Pivot Tables, Power Pivot, Nested Formulas, Data Validation, What-If Analysis.',
    display_order: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-5',
    skill_name: 'Tableau Visualizations',
    category: 'Tableau',
    proficiency_level: 'Intermediate',
    proficiency_percentage: 75,
    duration_experience: '1 year',
    description: 'Storytelling through data, visual analytics, interactive filters, dashboard publishing.',
    display_order: 5,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-6',
    skill_name: 'Git & GitHub Version Control',
    category: 'Development Tools',
    proficiency_level: 'Proficient',
    proficiency_percentage: 85,
    duration_experience: '2 years',
    description: 'Branch management, pull requests, automated workflow tracking, collaborative development.',
    display_order: 6,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-7',
    skill_name: 'Modern Web Development',
    category: 'Web Development',
    proficiency_level: 'Intermediate',
    proficiency_percentage: 75,
    duration_experience: '1.5 years',
    description: 'Next.js, TypeScript, Tailwind CSS, REST APIs for building intuitive analytics interfaces.',
    display_order: 7,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'skill-8',
    skill_name: 'AI Tools & Prompt Engineering',
    category: 'AI Tools',
    proficiency_level: 'Proficient',
    proficiency_percentage: 85,
    duration_experience: '1 year',
    description: 'Harnessing LLM workflows for rapid code analysis, query optimization, and documentation.',
    display_order: 8,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialSoftSkills: SoftSkill[] = [
  {
    id: 'soft-1',
    title: 'Analytical & Critical Thinking',
    description: 'Ability to dissect multi-layered business queries into structured, testable hypotheses.',
    real_life_evidence: 'Designed root-cause diagnostic dashboards during university capstone project identifying a 14% operational bottleneck.',
    associated_achievement: 'Best Capstone Analytical Solution Award',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'soft-2',
    title: 'Effective Communication & Storytelling',
    description: 'Translating complex data metrics and statistical nuances into clear, actionable executive insights.',
    real_life_evidence: 'Delivered weekly analytical presentations to faculty and peer cohorts with zero jargon barrier.',
    associated_achievement: 'Lead Presenter in Annual Symposium',
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'soft-3',
    title: 'Collaboration & Team Leadership',
    description: 'Fostering a positive team atmosphere with active peer code reviews and shared accountability.',
    real_life_evidence: 'Led a 4-person team in university hackathon, delivering the final product 3 hours ahead of deadline.',
    associated_achievement: 'Team Lead Recognition Certificate',
    display_order: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'soft-4',
    title: 'Adaptability & Rapid Learning',
    description: 'Constantly learning new frameworks, libraries, and analytical tooling with rigorous discipline.',
    real_life_evidence: 'Independently mastered Power BI and DAX scripting in under 6 weeks to complete industry project requirements.',
    associated_achievement: 'Certified Fast-Track Completion',
    display_order: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'e-commerce-sales-performance-dashboard',
    title: 'Executive E-Commerce Sales & Profitability Analytics',
    short_description: 'End-to-end business intelligence dashboard analyzing multi-year retail transactions across regions, product categories, and customer cohorts.',
    detailed_description: 'Comprehensive analytics pipeline starting with raw relational transactional records, cleaning missing values, modeling into Star Schema, and delivering actionable executive KPIs in Power BI.',
    category: 'Power BI Dashboards',
    problem_statement: 'Retail management faced opaque sales attribution, unclear return rates across regional hubs, and delayed profit margin reporting.',
    objectives: 'To build a unified automated dashboard tracking gross margins, customer retention, return rates, and shipping turnaround times.',
    technologies_used: ['Power BI', 'DAX', 'SQL', 'Power Query', 'Star Schema'],
    tools_frameworks: ['Power BI Desktop', 'PostgreSQL', 'Microsoft Excel'],
    key_features: [
      'Dynamic month-over-month sales comparison',
      'Customer segment churn risk indicator',
      'Interactive regional heatmaps',
      'Product category profitability matrix'
    ],
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
    ],
    github_url: 'https://github.com/mohammad-bilal/ecommerce-sales-analytics',
    live_demo_url: 'https://powerbi.microsoft.com',
    start_date: 'Jan 2024',
    completion_date: 'Mar 2024',
    status: 'Completed',
    key_learnings: 'Mastered advanced DAX filtering contexts, time-intelligence calculations, and dimensional modeling.',
    future_improvements: 'Plan to integrate automated daily scheduled data refresh and direct alerting via webhook.',
    display_order: 1,
    is_featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-2',
    slug: 'financial-fraud-detection-exploratory-analysis',
    title: 'Banking Transaction Fraud Detection & Exploratory Data Analysis',
    short_description: 'Python-based statistical analysis and risk scoring system identifying anomalous patterns across 200,000+ synthetic financial records.',
    detailed_description: 'Executed rigorous data preprocessing, handling severe class imbalance with SMOTE techniques, feature engineering on transaction velocity, and visual exploratory analysis using Seaborn.',
    category: 'Data Analytics',
    problem_statement: 'Detecting high-frequency micro-transactions and anomalous account deviations before chargeback liabilities occur.',
    objectives: 'Engineer behavioral features and generate a transparent risk score matrix with high precision and recall.',
    technologies_used: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Scikit-Learn', 'Jupyter'],
    tools_frameworks: ['VS Code', 'Git', 'Jupyter Lab'],
    key_features: [
      'Transaction velocity anomaly detection',
      'Class-imbalance evaluation using Precision-Recall curves',
      'Correlation heatmap of account risk variables',
      'Automated outlier detection script'
    ],
    thumbnail_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80'
    ],
    github_url: 'https://github.com/mohammad-bilal/fraud-detection-eda',
    start_date: 'Oct 2023',
    completion_date: 'Dec 2023',
    status: 'Completed',
    key_learnings: 'Gained deep understanding of financial distributions, skewness correction, and fraud indicator thresholds.',
    future_improvements: 'Integrate a real-time REST API endpoint for instantaneous stream score prediction.',
    display_order: 2,
    is_featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'proj-3',
    slug: 'hospital-patient-flow-sql-optimization',
    title: 'Healthcare Patient Flow & Resource Utilization Database System',
    short_description: 'Relational PostgreSQL schema architecture and complex analytical queries monitoring bed occupancy, doctor rosters, and emergency admission bottlenecks.',
    detailed_description: 'Created normalized 3NF schemas, partitioned transaction tables by admission year, and developed indexed views reducing reporting query latency by 68%.',
    category: 'SQL Projects',
    problem_statement: 'Hospital administration suffered from slow reporting queries and inaccurate real-time bed capacity estimates during peak seasonal surges.',
    objectives: 'Design an optimized SQL database with materialized views and parameterized stored procedures for real-time reporting.',
    technologies_used: ['PostgreSQL', 'Complex SQL', 'Window Functions', 'CTEs', 'Database Indexing'],
    tools_frameworks: ['pgAdmin', 'DBeaver', 'PostgreSQL 15'],
    key_features: [
      'Average wait time tracking by medical specialty',
      'Window function calculation for consecutive bed occupancy',
      'Optimized composite indices reducing table scans',
      'Automated error handling with SQL transactions'
    ],
    thumbnail_url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop&q=80'
    ],
    github_url: 'https://github.com/mohammad-bilal/hospital-patient-flow-sql',
    start_date: 'Apr 2024',
    completion_date: 'May 2024',
    status: 'Completed',
    key_learnings: 'Learned database query execution plan analysis (EXPLAIN ANALYZE) and optimal index placement.',
    future_improvements: 'Implement continuous CDC (Change Data Capture) replication for downstream data lake storage.',
    display_order: 3,
    is_featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialCertifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Microsoft Certified: Power BI Data Analyst Associate',
    issuing_organisation: 'Microsoft',
    issue_date: 'June 2024',
    expiry_date: 'June 2026',
    credential_id: 'MS-PL300-884920',
    verification_url: 'https://learn.microsoft.com/credentials',
    description: 'Validated expertise in data preparation, data modeling, visual analytics, and deployment of enterprise BI reports.',
    category: 'Business Intelligence',
    display_order: 1,
    is_featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'cert-2',
    title: 'Google Data Analytics Professional Certificate',
    issuing_organisation: 'Google / Coursera',
    issue_date: 'February 2024',
    credential_id: 'GOOG-DA-992103',
    verification_url: 'https://www.coursera.org/verify/professional-cert',
    description: 'Rigorous 8-course specialization covering data cleaning, analysis with R and SQL, visualization in Tableau, and case study synthesis.',
    category: 'Data Analytics',
    display_order: 2,
    is_featured: true,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'cert-3',
    title: 'SQL for Data Science & Advanced Querying',
    issuing_organisation: 'University of California, Davis / Coursera',
    issue_date: 'November 2023',
    credential_id: 'UCD-SQL-448102',
    verification_url: 'https://www.coursera.org',
    description: 'In-depth mastery of SQL syntax, multi-table joins, subqueries, string parsing, and analytical window functions.',
    category: 'Databases',
    display_order: 3,
    is_featured: false,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '1st Place — Annual Inter-Collegiate Data Hackathon',
    category: 'Hackathon & Competition',
    awarding_organisation: 'Apex Institute',
    event_name: 'Apex DataThon 2024',
    date: 'March 2024',
    description: 'Engineered the highest accuracy customer segmentation and revenue projection model among 35 competing collegiate teams.',
    recognition_details: 'Awarded trophy, official certificate of excellence, and cash prize for outstanding technical execution.',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ach-2',
    title: 'Academic Excellence Award in Computer Applications',
    category: 'Academic Honor',
    awarding_organisation: 'State University Academic Council',
    event_name: 'Annual Convocation & Honors',
    date: 'December 2023',
    description: 'Recognized for securing top 5% academic standing in core Database Systems and Algorithmic Thinking examinations.',
    recognition_details: 'Dean’s List Certificate of Academic Distinction.',
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    organisation: 'InsightTech Analytics Labs',
    designation: 'Data Analyst Intern',
    employment_type: 'Internship',
    start_date: 'January 2024',
    end_date: 'June 2024',
    is_current: false,
    responsibilities: '• Cleaned, validated, and normalized over 500,000 raw sales and supply chain records using Python and SQL.\n• Created 8 interactive executive Power BI dashboards delivered to senior leadership for monthly operational reviews.\n• Automated recurring weekly Excel reporting workflows using Power Query, eliminating 6 hours of manual data entry per cycle.\n• Collaborated with backend engineers to test SQL query response times across test staging databases.',
    skills_developed: ['Power BI', 'SQL Server', 'Python (Pandas)', 'Power Query', 'Data Verification', 'Executive Reporting'],
    major_contributions: 'Streamlined automated reporting pipeline reducing client discrepancy ticket resolution time by 30%.',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialResearch: ResearchPublication[] = [
  {
    id: 'res-1',
    title: 'Comparative Performance Benchmarking of Indexing Strategies in High-Throughput Relational Databases',
    abstract: 'An empirical analysis comparing B-Tree, Hash, and BRIN indexing topologies across skewed distribution datasets in PostgreSQL, assessing write amplification versus query acceleration.',
    research_area: 'Database Systems & Data Architecture',
    authors: ['Mohammad Bilal', 'Dr. A. K. Sharma'],
    publication_or_conference: 'International Journal of Modern Computing & Informatics',
    submission_status: 'Submitted',
    publication_date: 'Expected Q4 2024',
    description: 'Independent undergraduate research exploring storage-performance trade-offs in high-velocity analytical databases.',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialCommunication: CommunicationMilestone[] = [
  {
    id: 'comm-1',
    milestone_title: 'Overcoming Language Hesitation & English Fluency Milestone',
    milestone_type: 'English Journey',
    event_name: 'Toastmasters & College Debating Club',
    date: '2022 - 2023',
    description: 'Embarking on a deliberate, daily discipline to transform spoken English into a natural strength for professional business communication.',
    key_learning: 'Consistency and active speaking practice build effortless executive presence.',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'comm-2',
    milestone_title: 'Keynote Student Presenter: Demystifying Data Analytics',
    milestone_type: 'Public Speaking',
    event_name: 'Tech Horizon Youth Summit',
    date: 'April 2024',
    description: 'Delivered a 25-minute presentation explaining how modern retail leverages SQL and BI dashboards to an audience of 150+ students and faculty.',
    key_learning: 'Simplifying technical depth without losing credibility is the true hallmark of effective communication.',
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialEvents: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Hands-on Masterclass: Cloud Data Warehousing with BigQuery & SQL',
    category: 'Technical Workshops',
    organisation: 'Google Developer Student Clubs',
    date: 'February 2024',
    venue: 'Auditorium Hall, Apex Campus',
    description: 'Intensive 2-day hands-on workshop building partitioned analytical tables and executing serverless SQL queries on public big data repositories.',
    participation_type: 'Participant',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ev-2',
    title: 'Organizer: Campus Tech Fair & Data Analytics Showcase',
    category: 'College Events',
    organisation: 'Department of Computer Science',
    date: 'November 2023',
    venue: 'Main Exhibition Ground',
    description: 'Coordinated technical logistics, team registrations, and visual dashboard displays for over 20 student exhibition booths.',
    participation_type: 'Organizer',
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialGallery: GalleryMedia[] = [
  {
    id: 'gal-1',
    title: 'Receiving 1st Place Trophy at Inter-Collegiate DataThon',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=80',
    event_category: 'Competitions',
    caption: 'Presentation and award ceremony at the Apex DataThon 2024.',
    upload_date: '2024-03-20',
    is_featured: true,
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gal-2',
    title: 'Live Technical Workshop on Power BI Dashboards',
    media_type: 'image',
    media_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=80',
    event_category: 'Workshops',
    caption: 'Conducting an interactive dashboard session for junior student cohorts.',
    upload_date: '2024-02-12',
    is_featured: true,
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialCareerGoals: CareerGoal[] = [
  {
    id: 'goal-1',
    category: 'Desired Job Roles',
    title: 'Data Analyst / Junior Business Intelligence Specialist',
    description: 'Seeking an impactful role within a data-driven enterprise where I can apply analytical rigor, SQL modeling, and dashboard development.',
    target_timeline: 'Immediate',
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'goal-2',
    category: 'Desired Job Roles',
    title: 'MIS & Reporting Analyst',
    description: 'Contributing to operational clarity by designing robust management information systems and automated business metric trackers.',
    target_timeline: 'Immediate',
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'goal-3',
    category: 'Technologies Currently Learning',
    title: 'Cloud Data Warehousing (Snowflake & dbt)',
    description: 'Deepening capabilities in modern cloud data warehousing, SQL transformations with dbt, and automated data testing.',
    target_timeline: 'Q3 - Q4 2024',
    display_order: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'goal-4',
    category: 'Future Goals',
    title: 'Enterprise Analytics Engineering',
    description: 'Growing towards end-to-end analytics engineering, building scalable semantic layers, and contributing to strategic data architecture.',
    target_timeline: '2025 - 2026',
    display_order: 4,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialResumes: ResumeDocument[] = [
  {
    id: 'res-doc-1',
    title: 'Mohammad Bilal — Data Analyst Resume (Comprehensive)',
    target_role: 'Data Analyst',
    description: 'Tailored for Data Analyst and Business Intelligence Analyst positions, highlighting SQL, Power BI, Python, and statistical modeling achievements.',
    file_url: '/documents/Mohammad_Bilal_Data_Analyst_Resume.pdf',
    file_size: '180 KB',
    upload_date: '2024-06-15',
    is_active: true,
    is_featured: true,
    display_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'res-doc-2',
    title: 'Mohammad Bilal — MIS & Reporting Executive Resume',
    target_role: 'MIS Executive / Reporting Analyst',
    description: 'Targeted for MIS, Operations Reporting, and Business Analytics roles emphasizing Advanced Excel, Power Query, and SQL automation.',
    file_url: '/documents/Mohammad_Bilal_MIS_Resume.pdf',
    file_size: '165 KB',
    upload_date: '2024-06-15',
    is_active: true,
    is_featured: false,
    display_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialSocialLinks: SocialLink[] = [
  {
    id: 'soc-1',
    platform: 'LinkedIn',
    custom_label: 'LinkedIn Profile',
    url: 'https://linkedin.com/in/mohammad-bilal-analytics',
    icon: 'linkedin',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'soc-2',
    platform: 'GitHub',
    custom_label: 'GitHub Repositories',
    url: 'https://github.com/mohammad-bilal',
    icon: 'github',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'soc-3',
    platform: 'Email',
    custom_label: 'Direct Email',
    url: 'mailto:mohammad.bilal.analytics@example.com',
    icon: 'mail',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'soc-4',
    platform: 'WhatsApp',
    custom_label: 'WhatsApp Contact',
    url: 'https://wa.me/919876543210',
    icon: 'message-square',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const initialMessages: ContactMessage[] = [];
export const initialMediaAssets: MediaAsset[] = [];


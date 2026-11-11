-- =========================================================================
-- SEED DATA FOR MOHAMMAD BILAL PORTFOLIO & CMS
-- =========================================================================

-- Seed Profile
INSERT INTO public.profiles (
  full_name, headline, short_intro, bio, 
  personal_introduction, career_interests, professional_philosophy, 
  personal_strengths, learning_mindset, future_ambitions, 
  profile_photo_url, email, phone, location, 
  desired_roles, rotating_headlines, primary_technical_skills
) VALUES (
  'Mohammad Bilal',
  'Aspiring Data Analyst | Business Intelligence & SQL Specialist',
  'Passionate about transforming raw data into actionable business intelligence through rigorous analytical thinking, SQL modeling, and interactive dashboards.',
  'Welcome to my professional portfolio. I am Mohammad Bilal, focused on data analytics, business intelligence, database architecture, and performance-driven problem solving. I combine academic rigor with practical hands-on data modeling to help organizations make data-informed strategic decisions.',
  'Dedicated technologist and analytics enthusiast with a strong foundation in database querying, data cleaning, and statistical reporting.',
  'Data Analytics, Business Intelligence, Data Warehousing, SQL Optimization, ETL Pipelines, Machine Learning foundations.',
  'Data is only as valuable as the decisions it empowers. I believe in clarity, accuracy, and reproducible analytical methodologies.',
  'Analytical mindset, disciplined problem decomposition, fast technical learner, high attention to data integrity.',
  'Committed to daily incremental improvement through structured problem solving and active real-world project development.',
  'To build scalable analytics frameworks and lead data-informed decision making across forward-looking global organizations.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  'mohammad.bilal.analytics@example.com',
  '+91 98765 43210',
  'India',
  ARRAY['Aspiring Data Analyst', 'Business Intelligence Analyst', 'MIS Executive', 'Junior Database Developer'],
  ARRAY['Aspiring Data Analyst', 'Business Intelligence Enthusiast', 'Technology Learner', 'Problem Solver', 'Continuous Learner'],
  ARRAY['SQL', 'Python', 'Power BI', 'Advanced Excel', 'Data Modeling', 'Tableau']
) ON CONFLICT DO NOTHING;

-- Seed Settings
INSERT INTO public.website_settings (
  id, website_title, website_description, seo_keywords,
  footer_text, copyright_text, contact_email, is_contact_form_active
) VALUES (
  'current',
  'Mohammad Bilal — Personal Brand & Professional Portfolio CMS',
  'Explore the professional portfolio, data analytics projects, technical skills, certifications and academic profile of Mohammad Bilal.',
  ARRAY['Mohammad Bilal', 'Data Analyst', 'Business Intelligence', 'SQL Projects', 'Power BI Dashboards', 'Python Analytics'],
  'Empowering intelligent decisions through precision analytics, reproducible data pipelines, and continuous learning.',
  '© Mohammad Bilal. All rights reserved.',
  'mohammad.bilal.analytics@example.com',
  true
) ON CONFLICT (id) DO UPDATE SET website_title = EXCLUDED.website_title;

-- Seed Academic Profile
INSERT INTO public.education (qualification, institution_name, course_stream, board_university, start_year, completion_year, grade_percentage_cgpa, location, description, display_order, is_published)
VALUES 
('Bachelor of Computer Applications (BCA)', 'Apex Institute of Technology & Management', 'Computer Science & Data Fundamentals', 'State University', 2021, 2024, '8.4 CGPA', 'India', 'Specialized coursework in Database Management Systems (DBMS), Structured Query Language, Python Programming, Statistics, and Software Engineering.', 1, true),
('Higher Secondary Certificate (12th Grade)', 'Model Senior Secondary School', 'Science & Mathematics', 'Central Board of Secondary Education', 2019, 2021, '86%', 'India', 'Strong foundation in Advanced Mathematics, Physics, Chemistry, and Computer Science fundamentals.', 2, true);

-- Seed Technical Skills
INSERT INTO public.technical_skills (skill_name, category, proficiency_level, proficiency_percentage, duration_experience, description, display_order, is_published)
VALUES
('SQL & Relational Databases', 'SQL and Databases', 'Advanced', 90, '2+ years', 'Complex queries, CTEs, Window functions, Subqueries, Indexing, and Schema Design.', 1, true),
('Power BI & DAX', 'Power BI', 'Proficient', 85, '1.5 years', 'Interactive dashboard design, DAX calculated measures, data modeling (Star Schema), Power Query ETL.', 2, true),
('Python for Data Analysis', 'Python', 'Intermediate', 80, '2 years', 'Pandas, NumPy, Matplotlib, Seaborn for data wrangling, cleaning, and exploratory data analysis.', 3, true),
('Advanced Microsoft Excel', 'Microsoft Excel', 'Advanced', 90, '3 years', 'XLOOKUP, Pivot Tables, Power Pivot, Nested Formulas, Data Validation, What-If Analysis.', 4, true),
('Tableau Visualizations', 'Tableau', 'Intermediate', 75, '1 year', 'Storytelling through data, visual analytics, interactive filters, dashboard publishing.', 5, true),
('Git & GitHub Version Control', 'Development Tools', 'Proficient', 85, '2 years', 'Branch management, pull requests, automated workflow tracking, collaborative development.', 6, true),
('Modern Web Technologies', 'Web Development', 'Intermediate', 70, '1 year', 'Next.js, TypeScript, Tailwind CSS, REST APIs for building intuitive analytics interfaces.', 7, true),
('AI & Prompt Engineering', 'AI Tools', 'Proficient', 85, '1 year', 'Harnessing LLM workflows for rapid code analysis, query optimization, and documentation.', 8, true);

-- Seed Soft Skills
INSERT INTO public.soft_skills (title, description, real_life_evidence, associated_achievement, display_order, is_published)
VALUES
('Analytical & Critical Thinking', 'Ability to dissect multi-layered business queries into structured, testable hypotheses.', 'Designed root-cause diagnostic dashboards during university capstone project identifying a 14% operational bottleneck.', 'Best Capstone Analytical Solution Award', 1, true),
('Effective Communication & Storytelling', 'Translating complex data metrics and statistical nuances into clear, actionable executive insights.', 'Delivered weekly analytical presentations to faculty and peer cohorts with zero jargon barrier.', 'Lead Presenter in Annual Symposium', 2, true),
('Collaboration & Team Leadership', 'Fostering a positive team atmosphere with active peer code reviews and shared accountability.', 'Led a 4-person team in university hackathon, delivering the final product 3 hours ahead of deadline.', 'Team Lead Recognition Certificate', 3, true),
('Adaptability & Rapid Learning', 'Constantly learning new frameworks, libraries, and analytical tooling with rigorous discipline.', 'Independently mastered Power BI and DAX scripting in under 6 weeks to complete industry project requirements.', 'Certified Fast-Track Completion', 4, true);

-- Seed Projects
INSERT INTO public.projects (
  slug, title, short_description, detailed_description, category, 
  problem_statement, objectives, technologies_used, tools_frameworks, 
  key_features, thumbnail_url, screenshots, github_url, live_demo_url, 
  start_date, completion_date, status, key_learnings, future_improvements, 
  display_order, is_featured, is_published
) VALUES
(
  'e-commerce-sales-performance-dashboard',
  'Executive E-Commerce Sales & Profitability Analytics',
  'End-to-end business intelligence dashboard analyzing multi-year retail transactions across regions, product categories, and customer cohorts.',
  'Comprehensive analytics pipeline starting with raw relational transactional records, cleaning missing values, modeling into Star Schema, and delivering actionable executive KPIs in Power BI.',
  'Power BI Dashboards',
  'Retail management faced opaque sales attribution, unclear return rates across regional hubs, and delayed profit margin reporting.',
  'To build a unified automated dashboard tracking gross margins, customer retention, return rates, and shipping turnaround times.',
  ARRAY['Power BI', 'DAX', 'SQL', 'Power Query', 'Star Schema'],
  ARRAY['Power BI Desktop', 'PostgreSQL', 'Excel'],
  ARRAY['Dynamic month-over-month sales comparison', 'Customer segment churn risk indicator', 'Interactive regional heatmaps', 'Product category profitability matrix'],
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'],
  'https://github.com/mohammad-bilal/ecommerce-sales-analytics',
  'https://powerbi.microsoft.com',
  'Jan 2024',
  'Mar 2024',
  'Completed',
  'Mastered advanced DAX filtering contexts, time-intelligence calculations, and dimensional modeling.',
  'Plan to integrate automated daily scheduled data refresh and direct alerting via webhook.',
  1,
  true,
  true
),
(
  'financial-fraud-detection-exploratory-analysis',
  'Banking Transaction Fraud Detection & Exploratory Data Analysis',
  'Python-based statistical analysis and risk scoring system identifying anomalous patterns across 200,000+ synthetic financial records.',
  'Executed rigorous data preprocessing, handling severe class imbalance with SMOTE techniques, feature engineering on transaction velocity, and visual exploratory analysis using Seaborn.',
  'Data Analytics',
  'Detecting high-frequency micro-transactions and anomalous account deviations before chargeback liabilities occur.',
  'Engineer behavioral features and generate a transparent risk score matrix with high precision and recall.',
  ARRAY['Python', 'Pandas', 'NumPy', 'Seaborn', 'Scikit-Learn', 'Jupyter'],
  ARRAY['VS Code', 'Git', 'Jupyter Lab'],
  ARRAY['Transaction velocity anomaly detection', 'Class-imbalance evaluation using Precision-Recall curves', 'Correlation heatmap of account risk variables', 'Automated outlier detection script'],
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80'],
  'https://github.com/mohammad-bilal/fraud-detection-eda',
  '',
  'Oct 2023',
  'Dec 2023',
  'Completed',
  'Gained deep understanding of financial distributions, skewness correction, and fraud indicator thresholds.',
  'Integrate a real-time REST API endpoint for instantaneous stream score prediction.',
  2,
  true,
  true
),
(
  'hospital-patient-flow-sql-optimization',
  'Healthcare Patient Flow & Resource Utilization Database System',
  'Relational PostgreSQL schema architecture and complex analytical queries monitoring bed occupancy, doctor rosters, and emergency admission bottlenecks.',
  'Created normalized 3NF schemas, partitioned transaction tables by admission year, and developed indexed views reducing reporting query latency by 68%.',
  'SQL Projects',
  'Hospital administration suffered from slow reporting queries and inaccurate real-time bed capacity estimates during peak seasonal surges.',
  'Design an optimized SQL database with materialized views and parameterized stored procedures for real-time reporting.',
  ARRAY['PostgreSQL', 'Complex SQL', 'Window Functions', 'CTEs', 'Database Indexing'],
  ARRAY['pgAdmin', 'DBeaver', 'PostgreSQL 15'],
  ARRAY['Average wait time tracking by medical specialty', 'Window function calculation for consecutive bed occupancy', 'Optimized composite indices reducing table scans', 'Automated error handling with SQL transactions'],
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80',
  ARRAY['https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop&q=80'],
  'https://github.com/mohammad-bilal/hospital-patient-flow-sql',
  '',
  'Apr 2024',
  'May 2024',
  'Completed',
  'Learned database query execution plan analysis (EXPLAIN ANALYZE) and optimal index placement.',
  'Implement continuous CDC (Change Data Capture) replication for downstream data lake storage.',
  3,
  true,
  true
);

-- Seed Certifications
INSERT INTO public.certifications (
  title, issuing_organisation, issue_date, expiry_date, credential_id, 
  verification_url, description, category, display_order, is_featured, is_published
) VALUES
(
  'Microsoft Certified: Power BI Data Analyst Associate',
  'Microsoft',
  'June 2024',
  'June 2026',
  'MS-PL300-884920',
  'https://learn.microsoft.com/credentials',
  'Validated expertise in data preparation, data modeling, visual analytics, and deployment of enterprise BI reports.',
  'Business Intelligence',
  1,
  true,
  true
),
(
  'Google Data Analytics Professional Certificate',
  'Google / Coursera',
  'February 2024',
  '',
  'GOOG-DA-992103',
  'https://www.coursera.org/verify/professional-cert',
  'Rigorous 8-course specialization covering data cleaning, analysis with R and SQL, visualization in Tableau, and case study synthesis.',
  'Data Analytics',
  2,
  true,
  true
),
(
  'SQL for Data Science & Advanced Querying',
  'University of California, Davis / Coursera',
  'November 2023',
  '',
  'UCD-SQL-448102',
  'https://www.coursera.org',
  'In-depth mastery of SQL syntax, multi-table joins, subqueries, string parsing, and analytical window functions.',
  'Databases',
  3,
  false,
  true
);

-- Seed Achievements
INSERT INTO public.achievements (
  title, category, awarding_organisation, event_name, date, 
  description, recognition_details, display_order, is_published
) VALUES
(
  '1st Place — Annual Inter-Collegiate Data Hackathon',
  'Hackathon & Competition',
  'Apex Institute',
  'Apex DataThon 2024',
  'March 2024',
  'Engineered the highest accuracy customer segmentation and revenue projection model among 35 competing collegiate teams.',
  'Awarded trophy, official certificate of excellence, and cash prize for outstanding technical execution.',
  1,
  true
),
(
  'Academic Excellence Award in Computer Applications',
  'Academic Honor',
  'State University Academic Council',
  'Annual Convocation & Honors',
  'December 2023',
  'Recognized for securing top 5% academic standing in core Database Systems and Algorithmic Thinking examinations.',
  'Dean’s List Certificate of Academic Distinction.',
  2,
  true
);

-- Seed Professional Experience
INSERT INTO public.experiences (
  organisation, designation, employment_type, start_date, end_date, 
  is_current, responsibilities, skills_developed, major_contributions, 
  display_order, is_published
) VALUES
(
  'InsightTech Analytics Labs',
  'Data Analyst Intern',
  'Internship',
  'January 2024',
  'June 2024',
  false,
  '• Cleaned, validated, and normalized over 500,000 raw sales and supply chain records using Python and SQL.
• Created 8 interactive executive Power BI dashboards delivered to senior leadership for monthly operational reviews.
• Automated recurring weekly Excel reporting workflows using Power Query, eliminating 6 hours of manual data entry per cycle.
• Collaborated with backend engineers to test SQL query response times across test staging databases.',
  ARRAY['Power BI', 'SQL Server', 'Python (Pandas)', 'Power Query', 'Data Verification', 'Executive Reporting'],
  'Streamlined automated reporting pipeline reducing client discrepancy ticket resolution time by 30%.',
  1,
  true
);

-- Seed Career Goals
INSERT INTO public.career_goals (category, title, description, target_timeline, display_order, is_published)
VALUES
('Desired Job Roles', 'Data Analyst / Junior Business Intelligence Specialist', 'Seeking an impactful role within a data-driven enterprise where I can apply analytical rigor, SQL modeling, and dashboard development.', 'Immediate', 1, true),
('Desired Job Roles', 'MIS & Reporting Analyst', 'Contributing to operational clarity by designing robust management information systems and automated business metric trackers.', 'Immediate', 2, true),
('Technologies Currently Learning', 'Advanced Snowflake & DBT', 'Deepening capabilities in modern cloud data warehousing, SQL transformations with dbt, and automated data testing.', 'Q3 - Q4 2024', 3, true),
('Future Goals', 'Enterprise Analytics Engineering', 'Growing towards end-to-end analytics engineering, building scalable semantic layers, and contributing to strategic data architecture.', '2025 - 2026', 4, true);

-- Seed Communication Journey
INSERT INTO public.communication_journey (
  milestone_title, milestone_type, event_name, date, description, key_learning, display_order, is_published
) VALUES
(
  'Overcoming Language Hesitation & English Fluency Milestone',
  'English Journey',
  'Toastmasters & College Debating Club',
  '2022 - 2023',
  'Embarking on a deliberate, daily discipline to transform spoken English into a natural strength for professional business communication.',
  'Consistency and active speaking practice build effortless executive presence.',
  1,
  true
),
(
  'Keynote Student Presenter: Demystifying Data Analytics',
  'Public Speaking',
  'Tech Horizon Youth Summit',
  'April 2024',
  'Delivered a 25-minute presentation explaining how modern retail leverages SQL and BI dashboards to an audience of 150+ students and faculty.',
  'Simplifying technical depth without losing credibility is the true hallmark of effective communication.',
  2,
  true
);

-- Seed Events & Workshops
INSERT INTO public.events (
  title, category, organisation, date, venue, description, participation_type, display_order, is_published
) VALUES
(
  'Hands-on Masterclass: Cloud Data Warehousing with BigQuery & SQL',
  'Technical Workshops',
  'Google Developer Student Clubs',
  'February 2024',
  'Auditorium Hall, Apex Campus',
  'Intensive 2-day hands-on workshop building partitioned analytical tables and executing serverless SQL queries on public big data repositories.',
  'Participant',
  1,
  true
),
(
  'Organizer: Campus Tech Fair & Data Analytics Showcase',
  'College Events',
  'Department of Computer Science',
  'November 2023',
  'Main Exhibition Ground',
  'Coordinated technical logistics, team registrations, and visual dashboard displays for over 20 student exhibition booths.',
  'Organizer',
  2,
  true
);

-- Seed Resumes
INSERT INTO public.resumes (
  title, target_role, description, file_url, file_size, upload_date, is_active, is_featured, display_order, is_published
) VALUES
(
  'Mohammad Bilal — Data Analyst Resume (Comprehensive)',
  'Data Analyst',
  'Tailored for Data Analyst and Business Intelligence Analyst positions, highlighting SQL, Power BI, Python, and statistical modeling achievements.',
  '/documents/Mohammad_Bilal_Data_Analyst_Resume.pdf',
  '180 KB',
  '2024-06-15',
  true,
  true,
  1,
  true
),
(
  'Mohammad Bilal — MIS & Reporting Executive Resume',
  'MIS Executive / Reporting Analyst',
  'Targeted for MIS, Operations Reporting, and Business Analytics roles emphasizing Advanced Excel, Power Query, and SQL automation.',
  '/documents/Mohammad_Bilal_MIS_Resume.pdf',
  '165 KB',
  '2024-06-15',
  true,
  false,
  2,
  true
);

-- Seed Dynamic Social Links
INSERT INTO public.social_links (platform, custom_label, url, icon, display_order, is_active)
VALUES
('LinkedIn', 'LinkedIn Profile', 'https://linkedin.com/in/mohammad-bilal-analytics', 'linkedin', 1, true),
('GitHub', 'GitHub Repositories', 'https://github.com/mohammad-bilal', 'github', 2, true),
('Email', 'Direct Email', 'mailto:mohammad.bilal.analytics@example.com', 'mail', 3, true),
('WhatsApp', 'WhatsApp Contact', 'https://wa.me/919876543210', 'message-square', 4, true);


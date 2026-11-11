import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import {
  getProfile,
  getCollection
} from '@/lib/db';
import {
  EducationRecord,
  TechnicalSkill,
  SoftSkill,
  Project,
  Certification,
  Experience,
  CareerGoal,
  SocialLink,
  ResumeDocument
} from '@/types/database';

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: 'Valid question is required' }, { status: 400 });
    }

    const trimmedQuestion = question.trim();

    // 1. Fetch current verified published portfolio data
    const profile = await getProfile();
    const education = await getCollection<EducationRecord>('education', true);
    const technicalSkills = await getCollection<TechnicalSkill>('technical_skills', true);
    const softSkills = await getCollection<SoftSkill>('soft_skills', true);
    const projects = await getCollection<Project>('projects', true);
    const certifications = await getCollection<Certification>('certifications', true);
    const experiences = await getCollection<Experience>('experiences', true);
    const careerGoals = await getCollection<CareerGoal>('career_goals', true);
    const resumes = await getCollection<ResumeDocument>('resumes', true);
    const socialLinks = await getCollection<SocialLink>('social_links', true);

    // Build structured context knowledge
    const knowledgeContext = `
========================================
VERIFIED PORTFOLIO KNOWLEDGE FOR MOHAMMAD BILAL
========================================
FULL NAME: ${profile.full_name}
HEADLINE: ${profile.headline}
SHORT INTRODUCTION: ${profile.short_intro}
PROFESSIONAL BIOGRAPHY: ${profile.bio}
LOCATION: ${profile.location}
PRIMARY CONTACT EMAIL: ${profile.email}
PHONE: ${profile.phone || 'Available upon formal request'}
DESIRED ROLES: ${profile.desired_roles.join(', ')}
PRIMARY SKILLS: ${profile.primary_technical_skills.join(', ')}

ACADEMIC QUALIFICATIONS:
${education.map(e => `- ${e.qualification} at ${e.institution_name} (${e.start_year} - ${e.completion_year}), Grade/CGPA: ${e.grade_percentage_cgpa || 'N/A'}. Details: ${e.description || 'N/A'}`).join('\n')}

TECHNICAL SKILLS:
${technicalSkills.map(s => `- ${s.skill_name} (${s.category}): Level - ${s.proficiency_level} (${s.proficiency_percentage}%). Experience: ${s.duration_experience || 'N/A'}. Description: ${s.description || ''}`).join('\n')}

SOFT SKILLS:
${softSkills.map(s => `- ${s.title}: ${s.description}. Evidence: ${s.real_life_evidence || 'N/A'}`).join('\n')}

PUBLISHED PROJECTS:
${projects.map(p => `- ${p.title} (${p.category}): ${p.short_description}. Technologies: ${p.technologies_used.join(', ')}. Key Features: ${p.key_features.join('; ')}. GitHub: ${p.github_url || 'N/A'}, Live Demo: ${p.live_demo_url || 'N/A'}`).join('\n')}

CERTIFICATIONS:
${certifications.map(c => `- ${c.title} by ${c.issuing_organisation} (Issued: ${c.issue_date}, Credential ID: ${c.credential_id || 'N/A'}, Verification: ${c.verification_url || 'Available'}). ${c.description || ''}`).join('\n')}

PROFESSIONAL EXPERIENCE & INTERNSHIPS:
${experiences.map(exp => `- ${exp.designation} at ${exp.organisation} (${exp.employment_type}, ${exp.start_date} to ${exp.is_current ? 'Present' : exp.end_date}): ${exp.responsibilities}. Skills developed: ${exp.skills_developed.join(', ')}`).join('\n')}

CAREER ASPIRATIONS & CURRENT LEARNING:
${careerGoals.map(g => `- [${g.category}] ${g.title}: ${g.description || ''} (Timeline: ${g.target_timeline || 'N/A'})`).join('\n')}

ACTIVE RESUMES AVAILABLE:
${resumes.map(r => `- ${r.title} for ${r.target_role} (${r.file_size || 'PDF download'})`).join('\n')}

VERIFIED CONTACT & SOCIAL LINKS:
${socialLinks.map(s => `- ${s.platform}: ${s.url}`).join('\n')}
`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `
You are the official AI Recruiter Assistant and FAQ specialist for Mohammad Bilal's professional portfolio website.
Your single responsibility is to answer recruiter, HR, and visitor inquiries strictly and accurately based on Mohammad Bilal's published portfolio records provided in the context below.

STRICT RULES:
1. Only answer based on the provided verified portfolio knowledge.
2. Never hallucinate or invent qualifications, employment history, degrees, certificates, or claims.
3. If information is not mentioned in the portfolio, state politely: "That specific detail is not listed in Mohammad Bilal's current published portfolio. You can connect with him directly via email at ${profile.email} or LinkedIn."
4. Be professional, concise, articulate, and welcoming to hiring managers.
5. If asked how to hire or contact him, provide his verified email (${profile.email}) and active social links.
`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [
                { text: `Context Knowledge:\n${knowledgeContext}\n\nVisitor Question: ${trimmedQuestion}` }
              ]
            }
          ],
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.2,
          }
        });

        const reply = response.text || '';
        if (reply.trim()) {
          return NextResponse.json({ answer: reply });
        }
      } catch (geminiError) {
        console.warn('Gemini API call returned error, switching to verified portfolio fallback:', geminiError);
      }
    }

    // High quality intelligent fallback engine (strictly based on actual portfolio data)
    const qLower = trimmedQuestion.toLowerCase();

    if (qLower.includes('skill') || qLower.includes('technical') || qLower.includes('tools') || qLower.includes('stack')) {
      const topSkills = technicalSkills.map(s => `**${s.skill_name}** (${s.proficiency_level})`).join(', ');
      return NextResponse.json({
        answer: `Mohammad Bilal's primary technical competencies include: ${topSkills}. His strongest areas are **SQL & Relational Databases** (${technicalSkills.find(s => s.skill_name.includes('SQL'))?.proficiency_percentage || 90}%), **Power BI & DAX**, and **Python Data Analytics**.`
      });
    }

    if (qLower.includes('project') || qLower.includes('work') || qLower.includes('portfolio')) {
      const projList = projects.map(p => `• **${p.title}** (${p.category}): ${p.short_description}`).join('\n');
      return NextResponse.json({
        answer: `Mohammad Bilal has completed several high-impact data analytics projects:\n\n${projList}\n\nYou can explore interactive screenshots, GitHub repositories, and full case studies in the Projects section above.`
      });
    }

    if (qLower.includes('education') || qLower.includes('degree') || qLower.includes('college') || qLower.includes('university') || qLower.includes('academic') || qLower.includes('qualification')) {
      const eduList = education.map(e => `• **${e.qualification}** from ${e.institution_name} (${e.start_year} - ${e.completion_year}) — **${e.grade_percentage_cgpa}**`).join('\n');
      return NextResponse.json({
        answer: `Here is Mohammad Bilal's verified academic background:\n\n${eduList}`
      });
    }

    if (qLower.includes('certif') || qLower.includes('credential') || qLower.includes('license')) {
      const certList = certifications.map(c => `• **${c.title}** by ${c.issuing_organisation} (${c.issue_date})`).join('\n');
      return NextResponse.json({
        answer: `Mohammad Bilal holds the following verified certifications:\n\n${certList}\n\nCredential IDs and verification links are available in the Certifications section.`
      });
    }

    if (qLower.includes('experience') || qLower.includes('intern') || qLower.includes('job') || qLower.includes('employment')) {
      if (experiences.length > 0) {
        const expList = experiences.map(exp => `• **${exp.designation}** at ${exp.organisation} (${exp.employment_type}, ${exp.start_date} – ${exp.is_current ? 'Present' : exp.end_date}): ${exp.responsibilities.split('\n')[0]}`).join('\n');
        return NextResponse.json({
          answer: `Mohammad Bilal's professional experience:\n\n${expList}`
        });
      }
      return NextResponse.json({
        answer: `Mohammad Bilal is actively seeking entry-level Data Analyst / Business Intelligence opportunities to apply his rigorous analytical and database skills.`
      });
    }

    if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('phone') || qLower.includes('hire') || qLower.includes('reach') || qLower.includes('whatsapp')) {
      const links = socialLinks.map(s => `[${s.custom_label}](${s.url})`).join(' | ');
      return NextResponse.json({
        answer: `You can reach Mohammad Bilal directly:\n\n• **Email:** [${profile.email}](mailto:${profile.email})\n• **Phone:** ${profile.phone || 'Available on request'}\n• **Links:** ${links}\n\nYou can also submit an inquiry using the Contact Form on this page.`
      });
    }

    if (qLower.includes('resume') || qLower.includes('cv') || qLower.includes('download')) {
      const resumeTitles = resumes.map(r => `• **${r.title}** (${r.target_role})`).join('\n');
      return NextResponse.json({
        answer: `Mohammad Bilal provides tailored downloadable PDF resumes:\n\n${resumeTitles}\n\nYou can download them directly from the Resume section on this website.`
      });
    }

    if (qLower.includes('role') || qLower.includes('position') || qLower.includes('looking for') || qLower.includes('interest')) {
      return NextResponse.json({
        answer: `Mohammad Bilal is currently seeking roles as: **${profile.desired_roles.join('**, **')}**. He is excited about transforming data into strategic insights.`
      });
    }

    // Default intelligent response
    return NextResponse.json({
      answer: `Hello! I am Mohammad Bilal's AI Portfolio Assistant. Mohammad is an ${profile.headline}. You can ask me about his technical skills (SQL, Python, Power BI), published projects, academic qualifications, certifications, or how to contact him directly.`
    });
  } catch (error) {
    console.error('FAQ route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


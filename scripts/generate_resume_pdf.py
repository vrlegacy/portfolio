import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT

def create_resume():
    output_path = os.path.join(os.path.dirname(__file__), "../public/resume.pdf")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 0.5 inch margins = 36 pt
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )
    
    styles = getSampleStyleSheet()
    
    # Clean typography styles matching reference LaTeX design
    title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#111111')
    )
    
    contact_style = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#222222')
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=14,
        textColor=colors.HexColor('#111111'),
        spaceBefore=8,
        spaceAfter=2
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#222222')
    )
    
    right_style = ParagraphStyle(
        'RightTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#222222')
    )
    
    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        leftIndent=12,
        firstLineIndent=-8,
        textColor=colors.HexColor('#222222'),
        spaceAfter=1.5
    )

    story = []
    
    # HEADER
    story.append(Paragraph("<b>Vishwas Rudramurthy</b>", title_style))
    story.append(Spacer(1, 4))
    contact_line = (
        'Bengaluru, India &nbsp;|&nbsp; '
        '<a href="mailto:vishwasrudramurthy.26@gmail.com" color="#0056b3"><u>vishwasrudramurthy.26@gmail.com</u></a> &nbsp;|&nbsp; '
        '<a href="https://www.linkedin.com/in/vr26/" color="#0056b3"><u>linkedin.com/in/vr26</u></a> &nbsp;|&nbsp; '
        '<a href="https://github.com/vrlegacy" color="#0056b3"><u>github.com/vrlegacy</u></a> &nbsp;|&nbsp; '
        '<a href="https://buildwithvr.pages.dev" color="#0056b3"><u>buildwithvr.pages.dev</u></a>'
    )
    story.append(Paragraph(contact_line, contact_style))
    story.append(Spacer(1, 4))
    
    # SUMMARY
    story.append(Paragraph("Summary", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=5))
    summary_text = (
        "Passionate FullStack and AI developer with strong expertise in Python, FastAPI, React, Next.js, and AI workflow automation. "
        "Specializing in building end-to-end web platforms, orchestrating multi-agent LLM workflows (n8n, Gemini, Ollama/Gemma), and delivering "
        "clean, maintainable backend architectures with high computational efficiency."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))
    
    # TECHNICAL SKILLS (ALL SKILLS INCLUDED)
    story.append(Paragraph("Technical Skills", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=5))
    skills = [
        "<b>Languages:</b> Python, JavaScript, TypeScript, SQL, HTML5/CSS3",
        "<b>Backend:</b> FastAPI, REST APIs, Node.js, Express.js, OAuth2/JWT Auth, RBAC, SQLAlchemy",
        "<b>Databases:</b> PostgreSQL, MongoDB Atlas, SQLite, Supabase",
        "<b>AI &amp; Automation:</b> Google Gemini API, Ollama / Gemma, n8n Workflows, LiveKit WebRTC, Sarvam AI, OCR Processing, LangChain, Natural NLP",
        "<b>Frontend:</b> React.js, Next.js, TypeScript, Tailwind CSS, Radix UI, Redux, Vite",
        "<b>Tools &amp; Cloud:</b> Git, GitHub, Docker, Supabase, AWS, Cloudinary, Postman, Linux"
    ]
    for s in skills:
        story.append(Paragraph(s, body_style))
        story.append(Spacer(1, 2))
    story.append(Spacer(1, 4))
    
    # Helper for 2-column header rows matching LaTeX \experience & \project macros
    def make_row(left_p1, right_p1, left_p2=None, right_p2=None):
        table_data = []
        p_left1 = Paragraph(left_p1, body_style)
        p_right1 = Paragraph(right_p1, right_style)
        table_data.append([p_left1, p_right1])
        
        if left_p2 or right_p2:
            p_left2 = Paragraph(left_p2 or '', ParagraphStyle('ItalLeft', parent=body_style, fontName='Helvetica-Oblique'))
            p_right2 = Paragraph(right_p2 or '', ParagraphStyle('ItalRight', parent=right_style, fontName='Helvetica-Oblique'))
            table_data.append([p_left2, p_right2])
            
        t = Table(table_data, colWidths=[380, 160])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('PADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ]))
        return t

    # EXPERIENCE
    story.append(Paragraph("Experience", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=5))
    
    # Exp 1
    story.append(make_row("<b>Full Stack Developer Intern</b>", "Apr 2026 – Present", "<i>Sirpi Products and Services Pvt. Ltd.</i>", "<i>Bengaluru, India</i>"))
    story.append(Spacer(1, 2))
    exp1_bullets = [
        "Architecting scalable REST APIs and asynchronous backend microservices using Python and FastAPI.",
        "Developing interactive React user interface components with TypeScript and Tailwind CSS.",
        "Optimizing database queries, caching strategies, and third-party service integration pipelines."
    ]
    for b in exp1_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))
    
    # Exp 2
    story.append(make_row("<b>Full Stack Intern</b>", "Aug 2025 – Dec 2025", "<i>Infosys Springboard</i>", "<i>Remote</i>"))
    story.append(Spacer(1, 2))
    exp2_bullets = [
        "Led a team of 6 developers in architecting and delivering Civix, a digital civic engagement web platform.",
        "Designed secure Node.js/Express REST backend with JWT authentication and pending user authorization queues.",
        "Integrated OpenStreetMap geolocation API, Cloudinary media pipelines, and Natural NLP sentiment analysis.",
        "Managed GitHub team branching strategies, sprint task allocation, and daily code reviews."
    ]
    for b in exp2_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))
    
    # PROJECTS (4-5 SUMMARY BULLETS PER PROJECT)
    story.append(Paragraph("Projects", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=5))
    
    # Proj 1
    story.append(make_row(
        "<b>TalentPulse AI | Real-Time Voice Interview Platform</b>",
        "<a href='https://github.com/vrlegacy/talentpulse-ai' color='#0056b3'><u>GitHub</u></a>",
        "<i>FastAPI, React, LiveKit, Sarvam AI, n8n, Supabase, Python</i>",
        ""
    ))
    story.append(Spacer(1, 2))
    p1_bullets = [
        "Built live voice interview room using LiveKit Agents and Sarvam AI voice synthesis over WebRTC.",
        "Implemented conversation state management to sequence questions, retain context, and handle session reconnections.",
        "Automated resume-based question generation, candidate email workflows, and LLM transcript scoring via n8n.",
        "Engineered asynchronous FastAPI outbox worker to guarantee reliable event delivery during network interruptions.",
        "Created recruiter analytics dashboard displaying candidate rankings, transcribed audio, and readiness reports."
    ]
    for b in p1_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))
    
    # Proj 2
    story.append(make_row(
        "<b>TriGo Trip Planner | Conversational AI Travel Assistant</b>",
        "<a href='https://github.com/vrlegacy/trigo-travel-planenr' color='#0056b3'><u>GitHub</u></a> &nbsp;|&nbsp; <a href='https://vishwas-n8n-frontend.slicearrow.com/' color='#0056b3'><u>Live</u></a>",
        "<i>n8n, Google Gemini, Gemma, OpenTripMap, OpenRouteService, TypeScript, REST API</i>",
        ""
    ))
    story.append(Spacer(1, 2))
    p2_bullets = [
        "Constructed multi-step n8n automation workflows connecting Google Gemini and Gemma models.",
        "Integrated OpenTripMap for point-of-interest discovery and OpenRouteService for distance/duration calculations.",
        "Designed structured JSON itinerary engine generating multi-day travel timelines and budget estimates.",
        "Built interactive conversational React frontend interface featuring multi-turn chat session memory.",
        "Implemented API failover handlers and rate-limiting fallbacks across external geospatial and AI endpoints."
    ]
    for b in p2_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))

    # Proj 3
    story.append(make_row(
        "<b>Civix | Digital Civic Engagement Platform</b>",
        "<a href='https://github.com/vrlegacy/civix-frontend' color='#0056b3'><u>GitHub</u></a> &nbsp;|&nbsp; <a href='https://civix-zeta.vercel.app/' color='#0056b3'><u>Live</u></a>",
        "<i>React.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, Cloudinary, OpenStreetMap, Natural NLP</i>",
        ""
    ))
    story.append(Spacer(1, 2))
    p3_bullets = [
        "Led team of 6 developers in architecting digital civic engagement platform bridging citizens and authorities.",
        "Designed Express.js & MongoDB REST API with JWT authentication, request validation, and role-based access.",
        "Integrated OpenStreetMap geolocation API for location tagging and Cloudinary for media storage.",
        "Implemented digital petitions, polls, and Natural NLP sentiment analysis on citizen feedback.",
        "Configured automated deployment workflows and continuous integration test suites."
    ]
    for b in p3_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))

    # Proj 4
    story.append(make_row(
        "<b>FinOCR | Financial OCR &amp; Spend Analytics</b>",
        "<a href='https://github.com/vrlegacy/fin_ocr_frontend' color='#0056b3'><u>GitHub</u></a> &nbsp;|&nbsp; <a href='https://fin-ocr-frontend.pages.dev/' color='#0056b3'><u>Live</u></a>",
        "<i>Python, FastAPI, Gemma (Ollama), Gemini API, Auth0, Supabase, React.js, TypeScript, Vite</i>",
        ""
    ))
    story.append(Spacer(1, 2))
    p4_bullets = [
        "Engineered FastAPI REST backend and React/Vite spend analytics dashboard with Supabase cloud storage.",
        "Integrated local Gemma models on Ollama alongside Gemini API for structured receipt text extraction.",
        "Designed PostgreSQL tables with SQLAlchemy relationships and cascading constraints for data integrity.",
        "Implemented Auth0 authentication, transaction auditing workflows, and spending analytics visualizations.",
        "Developed custom image contrast preprocessing routines to maximize OCR accuracy on low-quality receipts."
    ]
    for b in p4_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))

    # Proj 5
    story.append(make_row(
        "<b>GitHub Repo Explainer | AI Codebase Summarizer</b>",
        "<a href='https://github.com/vrlegacy/github-repo-explainer' color='#0056b3'><u>GitHub</u></a>",
        "<i>Python, FastAPI, Gemini API, GitHub REST API, React.js, TypeScript, Tailwind CSS</i>",
        ""
    ))
    story.append(Spacer(1, 2))
    p5_bullets = [
        "Developed automated codebase documentation tool parsing public and private GitHub repositories via GitHub REST API.",
        "Engineered token-aware code chunking pipeline in Python and FastAPI to format source files for LLM context limits.",
        "Integrated Google Gemini API to generate structured architectural overviews, API breakdowns, and file summaries.",
        "Built interactive React & Tailwind CSS frontend allowing developers to navigate codebase trees with AI insights.",
        "Implemented background async caching for parsed repository trees to optimize repeated AI requests."
    ]
    for b in p5_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))

    # Proj 6
    story.append(make_row(
        "<b>Candidate Readiness Workflow | AI Resume Fit Analyzer</b>",
        "<a href='https://github.com/vrlegacy/candidate-readiness-workflow' color='#0056b3'><u>GitHub</u></a>",
        "<i>n8n, Python, FastAPI, Tesseract OCR, Gemini API, Supabase</i>",
        ""
    ))
    story.append(Spacer(1, 2))
    p6_bullets = [
        "Constructed automated document processing pipeline parsing uploaded PDF resumes using OCR extraction.",
        "Integrated Gemini LLM scoring models to calculate candidate fit percentages against job descriptions.",
        "Automated interview question generation and missing skill recommendations via n8n workflows.",
        "Engineered Supabase cloud database schema to store candidate scorecards and recruiter evaluation histories.",
        "Designed responsive evaluation dashboard displaying visual fit metrics and recruiter summary reports."
    ]
    for b in p6_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))

    # Proj 7
    story.append(make_row(
        "<b>Diabetic Retinopathy Detection | Deep Learning Diagnostic</b>",
        "<a href='https://github.com/vrlegacy/diabetic-detection-system' color='#0056b3'><u>GitHub</u></a>",
        "<i>Python, Flask, Deep Learning, CNN, CLAHE, OpenCV, Pandas, NumPy</i>",
        ""
    ))
    story.append(Spacer(1, 2))
    p7_bullets = [
        "Developed deep learning diagnostic application automating severity grading of diabetic retinopathy from retinal fundus images.",
        "Built Convolutional Neural Network (CNN) architecture trained on fundus image datasets for multi-class classification.",
        "Applied CLAHE (Contrast Limited Adaptive Histogram Equalization) and OpenCV preprocessing to enhance microaneurysm visibility.",
        "Built lightweight Flask web application for medical professionals to upload fundus images and receive instant predictions.",
        "Evaluated model performance using ROC-AUC curves, confusion matrices, and cross-validation techniques."
    ]
    for b in p7_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))

    # LEADERSHIP & ACHIEVEMENTS
    story.append(Paragraph("Leadership &amp; Key Highlights", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=5))
    achievements = [
        "<b>Infosys Springboard Project Lead:</b> Directed team of 6 engineers across 5 agile development sprints to ship Civix platform.",
        "<b>Open-Source Developer:</b> Architected 15+ automated n8n AI workflows and 25+ open-source repositories on GitHub.",
        "<b>Academic Academic Record:</b> Maintained 8.2/10 CGPA in B.E. Artificial Intelligence & Machine Learning at RRCE."
    ]
    for a in achievements:
        story.append(Paragraph(f"• {a}", bullet_style))
    story.append(Spacer(1, 5))

    # EDUCATION
    story.append(Paragraph("Education", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=5))
    story.append(make_row(
        "<b>Rajarajeshwari College of Engineering</b>",
        "Sept 2022 – June 2026",
        "B.E. in Artificial Intelligence and Machine Learning",
        "<b>CGPA: 8.2/10</b>"
    ))
    
    doc.build(story)
    print("PDF generated successfully at:", output_path)

if __name__ == '__main__':
    create_resume()

import sys
import os
import json
import argparse

def generate_pdf(data, out_path):
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER, TA_RIGHT

    doc = SimpleDocTemplate(
        out_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )
    
    styles = getSampleStyleSheet()
    
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
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#111111'),
        spaceBefore=7,
        spaceAfter=2
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        textColor=colors.HexColor('#222222')
    )
    
    right_style = ParagraphStyle(
        'RightTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#222222')
    )
    
    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        leftIndent=12,
        firstLineIndent=-8,
        textColor=colors.HexColor('#222222'),
        spaceAfter=1.5
    )

    story = []
    
    # HEADER
    story.append(Paragraph("<b>Vishwas Rudramurthy</b>", title_style))
    story.append(Spacer(1, 3))
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
    summary_text = data.get('summary', (
        "Full-Stack Engineer building scalable web platforms with Python (FastAPI), React, and Next.js. "
        "Experienced in designing clean REST APIs, handling database migrations and optimization in PostgreSQL and MongoDB, "
        "and connecting modern UI components with multi-agent AI workflows."
    ))
    story.append(Paragraph("Summary", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=4))
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))
    
    # TECHNICAL SKILLS
    story.append(Paragraph("Technical Skills", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=4))
    skills = data.get('skills', [
        "<b>Languages:</b> Python, JavaScript, TypeScript, SQL, HTML5/CSS3",
        "<b>Backend &amp; APIs:</b> FastAPI, REST APIs, Node.js, Express.js, OAuth2/JWT Auth, RBAC, SQLAlchemy",
        "<b>Databases:</b> PostgreSQL, MongoDB Atlas, SQLite, Supabase",
        "<b>AI &amp; Automation:</b> Google Gemini API, Ollama / Gemma, n8n Workflows, LiveKit WebRTC, Sarvam AI, OCR Processing, LangChain, Natural NLP",
        "<b>Frontend &amp; UI:</b> React.js, Next.js, TypeScript, Tailwind CSS, Radix UI, Redux, Vite",
        "<b>Cloud &amp; Tools:</b> Git &amp; GitHub, Docker, Supabase, AWS, Cloudinary, Postman, Linux"
    ])
    for s in skills:
        story.append(Paragraph(s, body_style))
        story.append(Spacer(1, 1.5))
    story.append(Spacer(1, 4))
    
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
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=4))
    
    # Exp 1
    story.append(make_row("<b>Full Stack Developer Intern</b>", "Apr 2026 – Present", "<i>Sirpi Products and Services Pvt. Ltd.</i>", "<i>Bengaluru, India</i>"))
    story.append(Spacer(1, 1.5))
    exp1_bullets = [
        "Architecting scalable REST APIs and asynchronous backend microservices using Python and FastAPI.",
        "Developing interactive React user interface components with TypeScript and Tailwind CSS.",
        "Optimizing database queries, caching strategies, and third-party service integration pipelines."
    ]
    for b in exp1_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 4))
    
    # Exp 2
    story.append(make_row("<b>Full Stack Intern</b>", "Aug 2025 – Dec 2025", "<i>Infosys Springboard</i>", "<i>Remote</i>"))
    story.append(Spacer(1, 1.5))
    exp2_bullets = [
        "Led a team of 6 developers in architecting and delivering Civix, a digital civic engagement web platform.",
        "Designed secure Node.js/Express REST backend with JWT authentication and pending user authorization queues.",
        "Integrated OpenStreetMap geolocation API, Cloudinary media pipelines, and Natural NLP sentiment analysis.",
        "Managed GitHub team branching strategies, sprint task allocation, and daily code reviews."
    ]
    for b in exp2_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 4))
    
    # PROJECTS (DYNAMICALLY INCLUDED BASED ON SELECTION)
    projects = data.get('projects', [])
    if projects:
        story.append(Paragraph("Projects", section_heading))
        story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=4))
        
        for p in projects:
            link_html = f"<a href='{p.get('link', '')}' color='#0056b3'><u>GitHub</u></a>" if p.get('link') else ""
            story.append(make_row(
                f"<b>{p['title']}</b>",
                link_html,
                f"<i>{p.get('tech', '')}</i>",
                ""
            ))
            story.append(Spacer(1, 1.5))
            for b in p.get('bullets', []):
                story.append(Paragraph(f"• {b}", bullet_style))
            story.append(Spacer(1, 4))

    # EDUCATION
    story.append(Paragraph("Education", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#111111'), spaceBefore=1, spaceAfter=4))
    story.append(make_row(
        "<b>Rajarajeshwari College of Engineering</b>",
        "Sept 2022 – June 2026",
        "B.E. in Artificial Intelligence and Machine Learning",
        "<b>CGPA: 8.2/10</b>"
    ))
    
    doc.build(story)

def generate_tex(data, out_path):
    summary = data.get('summary', '')
    skills_lines = data.get('skills', [])
    projects = data.get('projects', [])
    
    formatted_skills = "\n".join([f"\\textbf{{{s.split(':')[0]}:}} {s.split(':')[1]}" if ':' in s else s for s in skills_lines])

    project_tex_blocks = []
    for p in projects:
        title = p['title'].replace('&', '\\&')
        link = p.get('link', '')
        tech = p.get('tech', '').replace('&', '\\&')
        bullets_tex = "\n".join([f"  \\item {b}" for b in p.get('bullets', [])])
        
        block = f"""\\project{{{title}}}{{{link}}}{{{tech}}}
\\begin{{itemize}}
{bullets_tex}
\\end{{itemize}}"""
        project_tex_blocks.append(block)
        
    projects_tex = "\n\n".join(project_tex_blocks)

    tex_content = f"""\\documentclass[a4paper,10pt]{{article}}

\\usepackage[left=0.65in,right=0.65in,top=0.5in,bottom=0.5in]{{geometry}}
\\usepackage[T1]{{fontenc}}
\\usepackage[utf8]{{inputenc}}
\\usepackage[scaled=0.96]{{helvet}}
\\renewcommand{{\\familydefault}}{{\\sfdefault}}
\\usepackage{{microtype}}
\\usepackage{{enumitem}}
\\usepackage{{titlesec}}
\\usepackage{{needspace}}
\\usepackage[hidelinks]{{hyperref}}

\\input{{glyphtounicode}}
\\pdfgentounicode=1

\\pagestyle{{empty}}
\\setlength{{\\parindent}}{{0pt}}
\\setlength{{\\parskip}}{{0pt}}
\\urlstyle{{same}}
\\raggedright

\\titleformat{{\\section}}{{\\large\\bfseries}}{{}}{{0em}}{{}}[\\titlerule]
\\titlespacing*{{\\section}}{{0pt}}{{8pt}}{{4pt}}

\\setlist[itemize]{{
  leftmargin=1.15em,
  topsep=2pt,
  itemsep=2pt,
  parsep=0pt,
  partopsep=0pt,
  label=\\textbullet
}}

\\newcommand{{\\experience}}[4]{{%
  \\needspace{{5\\baselineskip}}
  \\textbf{{#1}}\\hfill #2\\\\
  \\textit{{#3}}\\hfill \\textit{{#4}}\\par
}}

\\newcommand{{\\project}}[3]{{%
  \\needspace{{5\\baselineskip}}
  \\textbf{{#1}}\\hfill #2\\\\
  {{\\small\\textit{{#3}}}}\\par
}}

\\begin{{document}}

\\begin{{center}}
  {{\\Huge \\textbf{{Vishwas Rudramurthy}}}}\\\\ [3pt]
  {{\\small Bengaluru, India \\, | \\, \\href{{mailto:vishwasrudramurthy.26@gmail.com}}{{vishwasrudramurthy.26@gmail.com}} \\, | \\, \\href{{https://www.linkedin.com/in/vr26/}}{{linkedin.com/in/vr26}} \\, | \\, \\href{{https://github.com/vrlegacy}}{{github.com/vrlegacy}} \\, | \\, \\href{{https://buildwithvr.pages.dev}}{{buildwithvr.pages.dev}}}}
\\end{{center}}

\\section*{{SUMMARY}}
{summary}

\\section*{{TECHNICAL SKILLS}}
{formatted_skills}

\\section*{{EXPERIENCE}}
\\experience{{Full Stack Developer Intern}}{{Apr 2026 -- Present}}{{Sirpi Products and Services Pvt. Ltd.}}{{Bengaluru, India}}
\\begin{{itemize}}
  \\item Architecting scalable REST APIs and asynchronous backend microservices using Python and FastAPI.
  \\item Developing interactive React user interface components with TypeScript and Tailwind CSS.
  \\item Optimizing database queries, caching strategies, and third-party service integration pipelines.
\\end{{itemize}}

\\experience{{Full Stack Intern}}{{Aug 2025 -- Dec 2025}}{{Infosys Springboard}}{{Remote}}
\\begin{{itemize}}
  \\item Led a team of 6 developers in architecting and delivering Civix, a digital civic engagement web platform.
  \\item Designed secure Node.js/Express REST backend with JWT authentication and pending user authorization queues.
  \\item Integrated OpenStreetMap geolocation API, Cloudinary media pipelines, and Natural NLP sentiment analysis.
  \\item Managed GitHub team branching strategies, sprint task allocation, and daily code reviews.
\\end{{itemize}}

\\section*{{PROJECTS}}
{projects_tex}

\\section*{{EDUCATION}}
\\experience{{Rajarajeshwari College of Engineering}}{{Sept 2022 -- June 2026}}{{B.E. in Artificial Intelligence and Machine Learning}}{{CGPA: 8.2/10}}

\\end{{document}}
"""
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(tex_content)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True, help='Path to input JSON file')
    parser.add_argument('--output', required=True, help='Path to output file')
    parser.add_argument('--format', choices=['pdf', 'tex'], default='pdf', help='Output format')
    args = parser.parse_args()

    with open(args.input, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if args.format == 'pdf':
        generate_pdf(data, args.output)
    else:
        generate_tex(data, args.output)

if __name__ == '__main__':
    main()

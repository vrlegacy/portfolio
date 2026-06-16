import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'vishwasrudramurthy.26@gmail.com',
    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Vishwas, I am reaching out to you because...',
    oldPortfolio: '',
    upworkProfile: '',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/vrlegacy' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/vr26/' },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'Material UI',
            icon: '/logo/mui.svg',
        },
    ],
    backend: [
        {
            name: 'FastAPI',
            icon: '/logo/fastapi.svg',
        },
        {
            name: 'Flask',
            icon: '/logo/flask.svg',
        },
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
    ],
    database: [
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Civix',
        slug: 'civix',
        year: 2025,
        description: `
      Civix is a citizen engagement platform that enables users to create polls, petitions, and complaints. It bridges the gap between citizens and local authorities by providing a structured, interactive, and transparent way to raise issues and gauge public opinion. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🗳️ Engagement Tools: Petitions, polls, and complaint registration system</li>
        <li>📂 Media Uploads: Image uploads for complaints via Cloudinary integration</li>
        <li>🗺️ Location-based: Interactive mapping features through OpenStreetMap</li>
        <li>⚡ Fully Responsive: Built with modern components and React layout design</li>
      </ul>
      `,
        role: `
      Full Stack Developer <br/>
      Developed the end-to-end user flows and integrations:
      <ul>
        <li>✅ Cloud Database: Integrated MongoDB Atlas for secure, cloud-based data storage and management</li>
        <li>🎨 Interactive Map: Added location-based features using OpenStreetMap</li>
        <li>📂 Asset Upload: Configured secure media upload pipelines with Cloudinary</li>
        <li>💻 Frontend: Developed responsive, component-based user interfaces with React</li>
      </ul>
      `,
        techStack: [
            'React.js',
            'MongoDB',
            'Cloudinary',
            'OpenStreetMap',
            'Node.js',
            'Express.js'
        ],
        thumbnail: '/projects/thumbnail/devLinks.jpg',
        longThumbnail: '/projects/long/devLinks.jpg',
        images: [
            '/projects/images/devLinks-1.png',
            '/projects/images/devLinks-2.png',
            '/projects/images/devLinks-3.png',
        ],
        sourceCode: 'https://github.com/Vishwas-Rudramurthy/Civix',
    },
    {
        title: 'Diabetic Retinopathy Detection System',
        slug: 'diabetic-retinopathy-detection',
        year: 2025,
        description: `
      An AI-powered medical imaging solution designed for automated detection and classification of Diabetic Retinopathy severity from retinal fundus images. It helps improve screening workflows and clinical diagnostic efficiency. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>👁️ Severe Detection: Predefined CNN model trained for classifying DR severity levels</li>
        <li>🧪 Image Preprocessing: Specialized pipelines including CLAHE, normalization, resizing, and noise reduction</li>
        <li>🖥️ Diagnostic Dashboard: Simple, clean web interface for uploading images and viewing model outputs</li>
      </ul>
      `,
        role: `
      AI & Full Stack Developer <br/>
      Engineered the model preprocessing pipeline and web application:
      <ul>
        <li>🧠 Model Training: Implemented Convolutional Neural Networks (CNN) using Deep Learning frameworks</li>
        <li>⚙️ Preprocessing: Built advanced image preprocessing workflows (CLAHE and normalization) to maximize feature resolution</li>
        <li>🌐 Web Application: Developed the web portal backend using Python and Flask to serve model inferences</li>
      </ul>
      `,
        techStack: [
            'Python',
            'Flask',
            'Deep Learning',
            'CNN',
            'CLAHE',
            'OpenCV',
            'Pandas',
            'NumPy'
        ],
        thumbnail: '/projects/thumbnail/resume-roaster.jpg',
        longThumbnail: '/projects/long/resume-roaster.jpg',
        images: [
            '/projects/images/resume-roaster-1.png',
            '/projects/images/resume-roaster-2.png',
            '/projects/images/resume-roaster-3.png',
        ],
        sourceCode: 'https://github.com/Vishwas-Rudramurthy/Diabetic-Retinopathy-Detection',
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Full Stack Developer Intern (On-site)',
        company: 'Sirpi Products and Services Pvt. Ltd., Bengaluru',
        duration: 'Apr 2026 - Present',
    },
    {
        title: 'Full Stack Intern (Remote)',
        company: 'Infosys Springboard',
        duration: 'Aug 2025 - Dec 2025',
    },
];

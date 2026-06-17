import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'vishwasrudramurthy.26@gmail.com',
    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Vishwas, I am reaching out to you because...',
    oldPortfolio: '',
    upworkProfile: '',
    web3formsAccessKey: '901eaa6f-86af-4742-a295-650d772a4455', // Get a free key at https://web3forms.com/
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
      Civix is a modern digital civic engagement platform built as a collaborative team project under the Infosys Springboard internship program. I led a team of 6 developers, directing the system architecture and leading the backend implementation. The application enables citizens to create petitions, organize public polls, and raise local complaints, fostering transparency and active communication between communities and authorities. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🗳️ Engagement Tools: Modular systems for launching petitions, casting votes in polls, and registering complaints.</li>
        <li>📂 Rich Media: Secure image uploads for visual complaint proof integrated using Cloudinary.</li>
        <li>🗺️ Live Mapping: Geographic coordinates visualization and location tagging via OpenStreetMap.</li>
        <li>⚡ Modern Layout: Fully responsive, component-driven user interface built with React.</li>
      </ul>
      `,
        role: `
      Team Lead & Backend Developer <br/>
      Coordinated a team of 6 members under Infosys Springboard while architecting the application backend:
      <ul>
        <li>✅ Backend Engineering: Designed robust API endpoints and database models using Node.js, Express, and MongoDB.</li>
        <li>✅ Leadership: Guided Git branching strategies, distributed code responsibilities, and held sprint check-ins for 6 developers.</li>
        <li>✅ Service Integrations: Programmed Cloudinary media pipelines and OpenStreetMap logic.</li>
        <li>✅ Database Setup: Deployed and configured cloud collections on MongoDB Atlas.</li>
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
            //project images to be added here 
        ],
        sourceCode: 'https://github.com/vrlegacy/Civix-Digital-Civic-Engagement-Petition-Platform',
    },
    {
        title: 'Diabetic Retinopathy Detection System',
        slug: 'diabetic-retinopathy-detection',
        year: 2025,
        description: `
      An advanced AI-powered medical diagnostic application engineered to automate the detection and grading of diabetic retinopathy from retinal fundus images. By automating severity classification, the system streamlines screening workflows to support ophthalmologists in clinical decision-making. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>👁️ Severity Grading: Convolutional Neural Network (CNN) model trained to categorize DR stages.</li>
        <li>🧪 Advanced Preprocessing: Customized image pipelines leveraging CLAHE, resizing, and normalization to enhance feature resolution.</li>
        <li>🖥️ Diagnostic Dashboard: A clean, intuitive web portal for uploading retinal images and displaying immediate model predictions.</li>
      </ul>
      `,
        role: `
      AI & Full Stack Developer <br/>
      Engineered the neural network pipelines, image preprocessing algorithms, and web interface:
      <ul>
        <li>🧠 Model Training: Designed and trained CNN models for high-accuracy retinal classification.</li>
        <li>⚙️ Preprocessing: Built customized CLAHE and noise-filtering algorithms to optimize retinal vessel contrast.</li>
        <li>🌐 Web Application: Developed the full web service backend using Python and Flask to deliver model inferences.</li>
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
           //  project images added to be here
        ],
        sourceCode: 'https://github.com/vrlegacy/Diabetic-retinopathy-detection-using-machine-learning-concept',
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

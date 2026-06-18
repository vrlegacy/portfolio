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
      Civix is a full-stack digital civic engagement platform designed to bridge the gap between citizens, volunteers, and local authorities. Developed as a collaborative team project under the Infosys Springboard internship program, the system features a robust, role-based user hierarchy with a responsive React frontend and a secure Express/MongoDB REST API. <br/> <br/>
      
      <strong>🌟 Core Platform Features:</strong>
      <ul>
        <li><strong>Interactive Citizen Dashboard:</strong> A unified home page displaying live engagement stats, active complaints, petition status, and local polls.</li>
        <li><strong>Role-Based Portals:</strong> Dedicated user dashboards customized for <strong>Citizens</strong>, <strong>Volunteers</strong>, and <strong>Administrators/Officials</strong> with strict JWT-based request authorization.</li>
        <li><strong>Smart Geolocation & Mapping:</strong> Real-time location detection and interactive OpenStreetMap integration (via Leaflet) to select precise coordinates and addresses for signups and complaint submissions.</li>
        <li><strong>Complaints Management:</strong> Citizens can report community issues with category tags and photos (featuring client-side image compression before uploading to Cloudinary). Admins can assign complaints to volunteers for on-the-ground review.</li>
        <li><strong>Petitions Engine:</strong> Initiate and sign petitions with visual progress bars tracking signature goals, single-signature enforcement, official timelines, and status logs.</li>
        <li><strong>Live Polls & Surveys:</strong> Vote in geographic-targeted polls with real-time charts displaying vote distributions.</li>
        <li><strong>Visual Reports & Sentiment Analytics:</strong> Beautiful graphs tracking civic activity and NLP-based sentiment analysis of community feedback powered by the <code>natural</code> library.</li>
      </ul>
      `,
        role: `
      <strong>Team Lead & Full Stack Developer (Backend focus)</strong> <br/>
      I led a team of 6 developers under the Infosys Springboard internship program, directing the system architecture and leading the backend implementation:
      <ul>
        <li><strong>Backend Architecture:</strong> Designed a robust, secure REST API using Node.js, Express, and MongoDB, complete with JWT auth, token blacklisting, and a pending-user verification queue.</li>
        <li><strong>Media & Mapping Integrations:</strong> Configured secure media pipelines with Cloudinary, integrated OpenStreetMap geocoding, and built SMTP mail services using Nodemailer.</li>
        <li><strong>NLP Sentiment & Analytics:</strong> Implemented a sentiment analysis engine using the Node <code>natural</code> library to evaluate positive/negative/neutral feedback from citizen reports.</li>
        <li><strong>Team Leadership:</strong> Managed Git branching strategies, delegated responsibilities, conducted code reviews, and orchestrated sprint check-ins for the development team.</li>
      </ul>
      `,
        techStack: [
            'React.js',
            'TypeScript',
            'Tailwind CSS',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Cloudinary',
            'OpenStreetMap',
            'Recharts',
            'Natural NLP'
        ],
        thumbnail: '/projects/images/civix-home.png',
        longThumbnail: '/projects/images/civix-home.png',
        images: [
            '/projects/images/civix-home.png',
            '/projects/images/civix-dashboard.png',
        ],
        sourceCode: 'https://github.com/vrlegacy/Civix-Digital-Civic-Engagement-Petition-Platform',
        liveUrl: 'https://civix-zeta.vercel.app/',
        video: 'https://drive.google.com/file/d/1uhYGms1CHXoL4E4Js9MHp-OCbBMd6e3g/preview',
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

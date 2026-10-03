export type Next_Page_Url = string;

export type Variant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'no-color';

export type ProjectStatus = 'completed' | 'ongoing' | 'planning';

export interface IProject {
    title: string;
    year: number;
    summary: string;
    type?: string;
    status?: ProjectStatus;
    highlight?: string;
    featured?: boolean;
    description: string;
    role: string;
    techStack: string[];
    thumbnail?: string;
    longThumbnail?: string;
    images?: string[];
    slug: string;
    liveUrl?: string;
    sourceCode?: string;
    sourceCodeBackend?: string;
    video?: string;
}

export interface IExperience {
    id: string;
    title: string;
    company: string;
    location: string;
    duration: string;
    period: string;
    description: string;
    highlights: string[];
    skills: string[];
}

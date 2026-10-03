import Hero from './_components/Hero';
import Stats from './_components/Stats';
import About from './_components/About';
import Skills from './_components/Skills';
import ExperienceTimeline from './_components/ExperienceTimeline';
import FeaturedProjects from './_components/FeaturedProjects';
import CaseStudiesTable from './_components/CaseStudiesTable';
import ResumeSection from './_components/ResumeSection';
import ContactSection from './_components/ContactSection';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <Stats />
            <About />
            <Skills />
            <ExperienceTimeline />
            <FeaturedProjects />
            <CaseStudiesTable />
            <ResumeSection />
            <ContactSection />
        </main>
    );
}

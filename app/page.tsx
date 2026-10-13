import Hero from './_components/Hero';
import About from './_components/About';
import Skills from './_components/Skills';
import ExperienceTimeline from './_components/ExperienceTimeline';
import FeaturedProjects from './_components/FeaturedProjects';
import ResumeSection from './_components/ResumeSection';
import ContactSection from './_components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="wrap">
      <Hero />
      <About />
      <Skills />
      <ExperienceTimeline />
      <FeaturedProjects />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

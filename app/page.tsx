import Hero from "@/components/Hero";
import IntroSections from "@/components/Introsections";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import MagneticButton from "@/components/MagneticButton";
import { projects } from "@/data/projects";
import FeaturedWork from "@/components/FeaturedWork";
import HomeGallery from "@/components/HomeGallery";
import HomeContact from "@/components/HomeContact";




export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Introduction: statement + bio with "See more" → /about */}
      <IntroSections />
      <HomeGallery />
      <FeaturedWork projects={featured} />
      <HomeContact />
      

      {/* Featured Work */}
      {/* <section className="border-t border-[var(--line)] py-8">
        <div className="section-pad">
          <SectionHeading eyebrow="Selected Projects" title="Featured Work" />
        </div>

        <div className="section-pad divide-y divide-[var(--line)]">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              reversed={i % 2 === 1}
            />
          ))}
        </div>

        <div className="section-pad flex justify-center pb-24 pt-8">
          <MagneticButton href="/portfolio" variant="outline">
            View Full Portfolio
          </MagneticButton>
        </div>
      </section> */}
    </>
  );
}
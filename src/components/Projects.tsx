import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
  title: string
  description: string
  tech: string[]
  image: string
  link: string
}

const projects: Project[] = [
  {
    title: "BookStore Project",
    description: "A modern e-commerce platform for books done for CSCI 4050",
    tech: ["Javascript", "Flask", "PostgreSQL", "HTML/CSS"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
    link: "https://github.com/apar2021/CSCI4050Project"
  },
  {
    title: "SoundSync",
    description: "Web platform designed to help musicians find their perfect bandmates ",
    tech: ["OpenAI API", "MongoDB", "React", "Flask"],
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "https://github.com/apar2021/UGAHacksX"
  },
  {
    title: "FFPS",
    description: "Analytics dashboard for social media management",
    tech: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    link: "#"
  }
]

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl bg-card"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        whileHover={{
          rotateY: 10,
          rotateX: 5,
          scale: 1.05
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="p-6 relative">
          <h3 className="text-xl font-semibold text-primary mb-2">
            {project.title}
          </h3>
          <p className="text-foreground/80 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
          <motion.a
            href={project.link}
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            whileHover={{ x: 5 }}
          >
            View Project →
          </motion.a>
        </div>
        <motion.div
          className="absolute inset-0 bg-primary/5 pointer-events-none rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <section className="py-20 bg-background/50 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore some of my recent work showcasing my expertise in AI, 
            Cybersecurity and Data Science.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 
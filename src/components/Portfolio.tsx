'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown, GitlabIcon as GitHub, Linkedin, Mail, Calendar, ExternalLink, Phone } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import * as THREE from 'three'

// Define a Project type
type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.8])

  const projects: Project[] = [
    {
      title: 'HabitHeap — Hackathon Winner',
      description: 'Built a gamified habit-tracking iOS app for computer science students using Swift and MVVM architecture. Implemented Apple Vision and CoreLocation for real-time task verification and developed persistent state management to maintain user progress across sessions. Sponsored by Amazon, Klaviyo & Whoop.',
      tech: ['Swift', 'MVVM', 'Apple Vision', 'CoreLocation', 'iOS'],
    },
    {
      title: 'PropertyPurpose',
      description: 'Deployed Real Estate web app using VPC with subnet separation, placing EC2 backend in public subnet and RDS database in private subnet for enhanced security. Integrated API Gateway for RESTful endpoints, and AWS S3 for image storage with automated uploads. Utilized AWS Cognito for authentication and created custom middleware with role-based access control.',
      tech: ['Node.js', 'Express.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'AWS'],
      link: 'https://main.d19lrmdt5o1evc.amplifyapp.com/',
    },
    {
      title: 'Disrupt: The Fintech Initiative (Co-Director)',
      description: 'Led hands-on workshops teaching students how to use tools like SQL, Docker, and Python. Networked with guests and invited people from various companies (Claim, Toast, Fidelity, etc.) to present.',
      tech: ['SQL', 'Docker', 'Python', 'Leadership', 'Workshops'],
    },
    {
      title: 'FUSE Filesystem',
      description: 'Created a 1MB custom FUSE filesystem in C with core file operations (create, read, write, delete, rename). Implemented nested directories and support for files up to 500KB in size using indirect block addressing.',
      tech: ['C', 'Linux Kernel', 'FUSE'],
    },
    {
      title: 'FinovaAI',
      description: 'Engineered a full-stack financial AI assistant with 500+ chat conversations stored in a PostgreSQL database. Integrated OpenAI, Yahoo Finance, and Wikipedia APIs for real-time market analysis and financial insights.',
      tech: ['Angular.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'OpenAI'],
    },
    {
      title: 'CO-OP CONNECT',
      description: 'Designed a web app to help students find affordable housing and connect them with other students nearby. Implemented the backend using a MySQL database and created a REST API with Python + Flask as a data accessing layer. Built a UI with heatmaps and querying capabilities using the Streamlit framework and realistic Mockaroo-generated data.',
      tech: ['Python', 'Flask', 'MySQL', 'REST API', 'Streamlit'],
    },
    {
      title: 'Phi Delta Theta — Web Lead',
      description: 'Integrated MongoDB with the frontend to efficiently manage and display member information. Collaborated in an Agile environment, leading weekly stand-ups and resolving blockers with team members.',
      tech: ['MongoDB', 'Agile', 'Web Development'],
    },
    {
      title: 'Personal Website',
      description: "Created this website to showcase my skills, experiences, and who I am. Implemented interactive animations with Framer Motion. Leveraged TypeScript for type safety and scalability, and utilized Three.js's PerspectiveCamera for 3D particle effects.",
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    },
  ];

  const skills = [
    {
      category: 'Languages',
      items: ['Java', 'Go', 'Ruby', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'C', 'C++', 'Bash'],
    },
    {
      category: 'Backend & Data',
      items: ['Spring Boot', 'Node.js', 'Ruby on Rails', 'Express.js', 'gRPC', 'PostgreSQL', 'Redis', 'Kafka'],
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['GCP', 'AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'Helm', 'GitHub Actions', 'Jenkins'],
    },
    {
      category: 'Security & Observability',
      items: ['IAM', 'RBAC', 'OAuth 2.0', 'Google SecOps', 'New Relic', 'Splunk', 'OpenTelemetry'],
    },
  ];

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 5000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffffff,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    camera.position.z = 3

    const animate = () => {
      requestAnimationFrame(animate)
      particlesMesh.rotation.y += 0.001
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80
      
      if (sectionId === 'projects' || sectionId === 'education') {
        const elementBottom = element.getBoundingClientRect().bottom + window.pageYOffset
        window.scrollTo({
          top: elementBottom - window.innerHeight,
          behavior: 'smooth'
        })
      } else {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navHeight
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'skills', 'projects', 'education', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (section === 'projects' || section === 'education') {
            return rect.bottom >= 0 && rect.bottom <= window.innerHeight
          }
          return rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-cosmic-dark text-white overflow-hidden relative">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50" />
      <div className="floating-dots opacity-30" />
      <div className="floating-dots opacity-20" style={{ animationDelay: '-3s' }} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-dark/10 to-cosmic-dark/20" />

      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-dark/90 backdrop-blur-sm">
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="container mx-auto px-6 py-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">Tej Chakravarthy</span>
              <div className="space-x-4">
                {['Home', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm text-white hover:text-cosmic-glow transition-colors
                             border-b-2 border-transparent hover:border-cosmic-accent"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </nav>

        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <section id="home" className="min-h-screen flex items-center justify-center relative">
                <div className="text-center z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
                    className="mb-4"
                  >
                    <TypeAnimation
                      sequence={[
                        'Tej Chakravarthy',
                        1000,
                        'Software Engineer',
                        1000,
                        'Take2 Co-Founder',
                        1000,
                      ]}
                      wrapper="h1"
                      speed={1}
                      className="text-6xl font-bold text-white"
                      repeat={Infinity}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="flex justify-center space-x-4"
                  >
                    {[
                      { href: "https://github.com/Tejchak", icon: GitHub },
                      { href: "https://www.linkedin.com/in/tejchakravarthy/", icon: Linkedin },
                      { href: "mailto:tejchak04@gmail.com", icon: Mail }
                    ].map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-cosmic-primary text-cosmic-light rounded-full 
                                  hover:bg-cosmic-accent transition-all duration-300
                                  border border-transparent hover:border-cosmic-glow"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <item.icon size={24} />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
                <motion.div
                  className="absolute inset-0 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  transition={{ duration: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient-x" />
                </motion.div>
              </section>

              <section id="experience" className="py-20 bg-cosmic-dark/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl font-bold mb-8 text-white">Experience</h2>
                    <div className="relative">
                      <div className="hidden sm:block absolute left-32 md:left-40 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cosmic-accent/70 via-cosmic-accent/30 to-transparent" />
                      <div className="space-y-10">
                      {[
                        {
                          title: 'Software Engineering Intern, Infrastructure Security',
                          company: 'Shopify | New York, NY',
                          date: 'June 2026 – August 2026',
                          description: 'Leading Shopify\'s multi-cloud migration to YugabyteDB, expanding infrastructure from GCP to AWS and Azure. Authored Terraform-based SCPs and Azure policies blocking public firewalls, exposed RDS instances, and unauthorized external identities. Built a Google SecOps dashboard to detect service accounts with 30+ days of unused PCI data access, then automated pruning via a scheduled script, removing access from 150+ accounts and cutting attack surface by 80%. Eliminated public IP exposure across 41 Cloud SQL instances via VPC or Cloud SQL Auth Proxy, then shipped an org-wide policy permanently denying public IPs.',
                        },
                        {
                          title: 'Backend Software Engineering Co-op',
                          company: 'Priceline.com | New York, NY',
                          date: 'June 2025 – December 2025',
                          description: 'Built a ghost booking detection system using Kafka consumers to reconcile booking state mismatches between Priceline\'s Java services and 3rd-party systems, automatically canceling 1000+ reservations/month. Migrated heavy batch processing workloads to Google Cloud Spanner and addressed performance bottlenecks by using Google Bigtable for large-scale lookup patterns with Spring Boot. Deployed booking services to GKE, sustaining 99.95% uptime while processing 2B+ events daily.',
                        },
                        {
                          title: 'Software Engineering Co-Founder',
                          company: 'Take2 Movies and Shows | Remote',
                          date: 'May 2025 – Present',
                          description: 'Architected and deployed a full-stack social media app using React Native frontend and Node.js backend, now live on the iOS App Store with 500+ active users. Redesigned backend into containerized microservices on Cloud Run, enabling independent service scaling and reducing peak infrastructure costs by 30%. Optimized follower feed loading with a paginated caching strategy, cutting feed load times from 2.3s to 250ms. Migrated notification and feed-update workflows to Cloud Functions, reducing workflow failures by 38% through automated retries and idempotent event handling.',
                          link: 'https://apps.apple.com/us/app/take2-movies-shows/id6737178731',
                        },
                        {
                          title: 'Teaching Assistant (Algorithms and Data)',
                          company: 'Northeastern University | Boston, MA',
                          date: 'September 2024 – May 2025',
                          description: 'Guided students through complex topics relating to graph theory, recurrence, logic, and sorting algorithms. Led labs for groups of 20 students and developed review sessions to reinforce key concepts in Python.',
                        },
                      ].map((job, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 md:gap-8"
                        >
                          <div className="sm:w-32 md:w-40 sm:flex-shrink-0 relative sm:text-right sm:pt-2 sm:pr-5">
                            <span className="text-sm font-semibold text-cosmic-glow">{job.date}</span>
                            <div className="hidden sm:block absolute right-0 top-1.5 translate-x-1/2 w-4 h-4
                                      rounded-full bg-cosmic-accent ring-4 ring-cosmic-dark
                                      shadow-[0_0_12px_rgba(156,195,228,0.7)]" />
                          </div>
                          <div className="flex-1 bg-black/40 p-6 rounded-lg
                                    shadow-[0_0_20px_rgba(127,179,213,0.15)]
                                    hover:shadow-[0_0_25px_rgba(127,179,213,0.25)]
                                    backdrop-blur-sm
                                    border border-cosmic-accent/20
                                    hover:border-cosmic-accent/40
                                    hover:transform hover:scale-[1.02]
                                    transition-all duration-300">
                            <h3 className="text-2xl font-semibold mb-2 text-white">{job.company}</h3>
                            <p className="text-cosmic-accent mb-4">{job.title}</p>
                            <p className="text-white/90 mb-4">{job.description}</p>
                            {job.link && (
                              <motion.a
                                href={job.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-1
                                         bg-cosmic-primary/20 text-cosmic-light
                                         hover:bg-cosmic-primary/30
                                         border border-cosmic-accent/40
                                         hover:border-cosmic-accent
                                         rounded-md transition-all duration-300
                                         text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <ExternalLink size={16} />
                                View App
                              </motion.a>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              <section id="skills" className="py-20 bg-cosmic-dark/30 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl font-bold mb-8 text-white">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {skills.map((group, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="bg-black/40 p-6 rounded-lg
                                    shadow-[0_0_20px_rgba(127,179,213,0.15)]
                                    hover:shadow-[0_0_25px_rgba(127,179,213,0.25)]
                                    backdrop-blur-sm
                                    border border-cosmic-accent/20
                                    hover:border-cosmic-accent/40"
                        >
                          <h3 className="text-xl font-semibold mb-4 text-cosmic-accent">{group.category}</h3>
                          <div className="flex flex-wrap gap-2">
                            {group.items.map((item, itemIndex) => (
                              <span
                                key={itemIndex}
                                className="bg-cosmic-primary/20 text-cosmic-light px-2 py-1 rounded-md
                                         border border-cosmic-accent/20 text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              <section id="projects" className="py-20 bg-cosmic-dark/30 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl font-bold mb-8 text-white">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {projects.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.6 }}
                          className="bg-black/40 p-6 rounded-lg
                                    shadow-[0_0_20px_rgba(127,179,213,0.15)]
                                    hover:shadow-[0_0_25px_rgba(127,179,213,0.25)]
                                    backdrop-blur-sm
                                    border border-cosmic-accent/20
                                    hover:border-cosmic-accent/40 
                                    hover:transform hover:scale-[1.02]"
                        >
                          <h3 className="text-2xl font-semibold mb-2 text-white">{project.title}</h3>
                          <p className="mb-4 text-white/90">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.tech.map((tech, techIndex) => (
                              <span key={techIndex} 
                                    className="bg-cosmic-primary/20 text-cosmic-light px-2 py-1 rounded-md
                                             border border-cosmic-accent/20 text-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.link && (
                            <motion.a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-1
                                       bg-cosmic-primary/20 text-cosmic-light
                                       hover:bg-cosmic-primary/30 
                                       border border-cosmic-accent/40
                                       hover:border-cosmic-accent 
                                       rounded-md transition-all duration-300
                                       text-sm font-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ExternalLink size={16} />
                              Live Demo
                            </motion.a>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              <section id="education" className="py-20 bg-cosmic-dark/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl font-bold mb-8 text-white">Education</h2>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6 }}
                      className="bg-black/40 p-6 rounded-lg
                                shadow-[0_0_20px_rgba(127,179,213,0.15)]
                                hover:shadow-[0_0_25px_rgba(127,179,213,0.25)]
                                backdrop-blur-sm
                                border border-cosmic-accent/20
                                hover:border-cosmic-accent/40 
                                hover:transform hover:scale-[1.02]"
                    >
                      <h3 className="text-2xl font-semibold mb-2 text-white">Northeastern University</h3>
                      <p className="text-cosmic-accent mb-2">Khoury College of Computer Sciences, Boston, MA</p>
                      <p className="text-sm text-white/70 mb-4">September 2023 – Present | Expected: May 2027</p>
                      <p className="text-white/90">Bachelor of Science in Computer Science | GPA: 3.9/4.0</p>
                      <p className="mt-2 text-white/90">
                        Honors: 3x Hackathon Winner, 6x Dean&apos;s List, Khoury College of Computer Sciences Academic Scholarship
                      </p>
                      <p className="mt-2 text-white/90">
                        Relevant Coursework: Object-Oriented Design, Algorithms, Machine Learning, Computer Systems, Databases
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <section id="contact" className="py-20 bg-cosmic-dark/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl font-bold mb-8 text-white">Let's Connect</h2>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5 }}
                      className="bg-black/40 p-6 rounded-lg
                                shadow-[0_0_20px_rgba(127,179,213,0.15)]
                                hover:shadow-[0_0_25px_rgba(127,179,213,0.25)]
                                backdrop-blur-sm
                                border border-cosmic-accent/20
                                hover:border-cosmic-accent/40 
                                hover:transform hover:scale-[1.02]"
                    >
                      <p className="text-xl mb-8 text-white">
                        I'm always excited to connect with fellow developers, potential collaborators, 
                        and industry professionals. Whether you have a question, want to discuss a project, 
                        or just want to say hello, feel free to reach out!
                      </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                      {[
                        { href: "mailto:tejchak04@gmail.com", icon: Mail, text: "Email Me" },
                        { href: "tel:+18607098364", icon: Phone, text: "(860) 709-8364" },
                        { href: "https://www.linkedin.com/in/tejchakravarthy/", icon: Linkedin, text: "Connect on LinkedIn" },
                        { href: "https://github.com/Tejchak", icon: GitHub, text: "Check My GitHub" },
                        { href: "https://outlook.office.com/bookwithme/user/c74682626214455abcbf8db28ad004f9@northeastern.edu?anonymous&ep=plink", 
                          icon: Calendar, text: "Schedule a Meeting" }
                      ].map((item, index) => (
                        <motion.a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center justify-center gap-3 
                                    bg-black/40 p-4 rounded-lg group
                                    shadow-[0_0_20px_rgba(127,179,213,0.15)]
                                    hover:shadow-[0_0_25px_rgba(127,179,213,0.25)]
                                    backdrop-blur-sm
                                    border border-cosmic-accent/20
                                    hover:border-cosmic-accent/40 
                                    transition-all duration-300
                                    hover:transform hover:scale-[1.02]"
                        >
                          <item.icon className="text-cosmic-light group-hover:text-cosmic-glow" />
                          <span className="text-white">{item.text}</span>
                        </motion.a>
                      ))}
                    </div>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <footer className="bg-cosmic-dark/90 backdrop-blur-md text-white py-12">
                <div className="container mx-auto px-6">
                  <motion.div
                    className="flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false }}
                  >
                    <motion.p
                      className="text-cosmic-light/70 text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: false }}
                    >
                      &copy; {new Date().getFullYear()} Tej Chakravarthy. All rights reserved.
                    </motion.p>
                  </motion.div>
                </div>
              </footer>

              {/* Scroll Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed bottom-8 right-8 z-50"
              >
                <motion.button
                  onClick={() => scrollToSection(activeSection === 'home' ? 'experience' : 'home')}
                  className="bg-cosmic-primary text-cosmic-light p-3 rounded-full shadow-lg 
                            hover:bg-cosmic-accent transition-all duration-300
                            border border-transparent hover:border-cosmic-glow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronDown className={activeSection === 'home' ? '' : 'transform rotate-180'} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

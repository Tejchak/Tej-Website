'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown, GitlabIcon as GitHub, Linkedin, Mail, Calendar, ExternalLink } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import * as THREE from 'three'

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.8])

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
      const sections = ['home', 'experience', 'projects', 'education', 'contact']
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
                {['Home', 'Experience', 'Projects', 'Education', 'Contact'].map((item, index) => (
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
                        'Problem Solver',
                        1000,
                      ]}
                      wrapper="h1"
                      speed={1}
                      className="text-6xl font-bold text-white"
                      repeat={Infinity}
                    />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-xl mb-8 text-white/80"
                  >
                    Computer Science Student & Aspiring Software Engineer
                  </motion.p>
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
                    <div className="space-y-8">
                      {[
                        {
                          title: 'Software Engineering Co-op (Backend)',
                          company: 'Priceline.com',
                          date: 'June 2025 - Present',
                          description: 'Developing customer identity microservices using Java Spring framework and integrating with Okta authentication APIs to streamline user identity management. Leading migration initiatives from legacy authentication systems to modern cloud-based (GKE) solutions.',
                        },
                        {
                          title: 'Teaching Assistant',
                          company: 'Northeastern University',
                          date: 'Sept 2024 - Present',
                          description: 'Guide students through complex topics relating to graph theory, recurrence, logic, and sorting algorithms in office hours. Lead Java-based labs for groups of 20 students and develop review sessions to reinforce key concepts. Grade student exams and collobarate with faculty to refine course material and address common student challenges',
                        },
                        {
                          title: 'Software Engineer Intern',
                          company: 'Take2',
                          date: 'May 2024 - Aug 2024',
                          description: 'Integrated key frontend features for a mobile app using React-Native, including profiles, posts, followers, and infinite pages. Enhanced backend functionality with Firebase NoSQL to support CRUD operations on user lists and increase scalability. Optimized client-server communication through pagination, API batch updates, lazy loading, and caching resulting in a 30% reduction in network latency.',
                        },
                        {
                          title: 'Graphic Design and Social Media Intern',
                          company: 'FOR THE GOOD FIGHT INC',
                          date: 'May 2023 - Aug 2023',
                          description: 'Designed and prototyped engaging graphic designs for an e-commerce apparel store using Canva. Colloborated with team to maintain consistent and effective brand representation online (Instagram, Pinterest, Etsy).',
                        },
                      ].map((job, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
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
                          <h3 className="text-2xl font-semibold mb-2 text-white">{job.title}</h3>
                          <p className="text-cosmic-accent mb-2">{job.company}</p>
                          <p className="text-sm text-white/70 mb-4">{job.date}</p>
                          <p className="text-white/90">{job.description}</p>
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
                      {[
                        {
                          title: 'FUSE Filesystem',
                          description: 'Created a 1MB custom FUSE filesystem in C with core file operations (create, read, write, delete, rename), nested directories, and support for files up to 500KB in size using indirect block addressing. Designed a bitmap-based block allocation system with 4KB blocks, supporting 100+ small files.',
                          tech: ['C', 'Linux Kernel', 'FUSE', 'File Systems'],
                        },
                        {
                          title: 'FinovaAI',
                          description: 'Deployed an AI web app with OpenAI, Wikipedia, and Yahoo Finance APIs for NLP, data retrieval, and market analysis. Designed a PostgreSQL database to store chat history and used Supabase for User Authentication.',
                          tech: [ 'Supabase', 'SQL', 'Langflow', 'OpenAI', 'Yahoo Finance', 'Next.js', 'React'],
                          link: 'https://tej-ai.vercel.app/'
                        },
                        {
                          title: 'CO-OP CONNECT',
                          description: 'Designed a web app to help students find affordable housing and to connect them with other students nearby. Implemented the backend using a MySQL database, and created a REST API with Python + Flask as a data accessing layer. Built a UI with heatmaps and querying capabilities using the Streamlit framework and realistic Mockaroo-generated data.',
                          tech: ['Python', 'Flask', 'MySQL', 'Rest API', 'Streamlit'],
                        },
                        {
                          title: 'DISRUPT NEU',
                          description: 'Led an 8-week venture teaching students to prototype fintech products, culminating with a chance to win $5,000 in a pitch to investors. Introduced students to the fintech world, walking them through idea creation, idea validation, prototyping, and presentation. Networked with guest speakers and invited people from various companies (Claim, Toast, Fidelity, etc) to come present.',
                          tech: ['Market Research', 'Product Development', 'Pitch Presentation', 'Leadership'],
                        },
                      ].map((project, index) => (
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
                      <p className="text-cosmic-accent mb-2">Khoury College of Computer Sciences</p>
                      <p className="text-sm text-white/70 mb-4">Sept 2023 - May 2027</p>
                      <p className="text-white/90">Major: Computer Science | GPA: 3.91 | Dean's List</p>
                      <p className="mt-2 text-white/90">
                      Relevant Coursework: Object Oriented Design, Algorithms and Data, Computer Systems, Machine Learning and Data Mining, Database Design, Discrete Structures, Foundations of Cybersecurity
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {[
                        { href: "mailto:tejchak04@gmail.com", icon: Mail, text: "Email Me" },
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

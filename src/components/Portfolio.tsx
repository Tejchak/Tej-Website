'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown, GitlabIcon as GitHub, Linkedin, Mail, Calendar } from 'lucide-react'
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
    <div className="min-h-screen animated-gradient text-white overflow-hidden relative">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50" />
      <div className="floating-dots opacity-30" />
      <div className="floating-dots opacity-20" style={{ animationDelay: '-3s' }} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />

      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="container mx-auto px-6 py-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">Tej Chakravarthy</span>
              <div className="space-x-4">
                {['Home', 'Experience', 'Projects', 'Education', 'Contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-sm text-gray-300 hover:text-blue-400 transition-colors"
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
                      className="text-6xl font-bold"
                      repeat={Infinity}
                    />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-xl mb-8"
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
                      { href: "https://github.com/yourgithub", icon: GitHub },
                      { href: "https://www.linkedin.com/in/tej-chakravarthy-3b37132a2/", icon: Linkedin },
                      { href: "mailto:tejchak04@gmail.com", icon: Mail }
                    ].map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
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

              <section id="experience" className="py-20 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <h2 className="text-4xl font-bold mb-8">Experience</h2>
                    <div className="space-y-8">
                      {[
                        {
                          title: 'Co-Founder',
                          company: 'Take Two (Startup Social Media App)',
                          date: 'June 2024 - Present',
                          description: 'Engineered E2E development of a cross-platform social media app for movie enthusiasts.',
                        },
                        {
                          title: 'Graphic Design and Social Media Intern',
                          company: 'FOR THE GOOD FIGHT INC',
                          date: 'May 2023 - Aug 2023',
                          description: 'Developed visually appealing graphic designs for an e-commerce apparel store.',
                        },
                        {
                          title: 'Teaching Assistant',
                          company: 'Northeastern University',
                          date: 'Sept 2024 - Present',
                          description: 'Guided students through complex computer science problems and assisted in course material refinement.',
                        },
                      ].map((job, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                          <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                          <p className="text-blue-400 mb-2">{job.company}</p>
                          <p className="text-sm text-gray-400 mb-4">{job.date}</p>
                          <p>{job.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              <section id="projects" className="py-20 bg-black/30 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <h2 className="text-4xl font-bold mb-8">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        {
                          title: 'CO-OP CONNECT',
                          description: 'Created a web app to help students find affordable housing and connect with others in those areas.',
                          tech: ['Python', 'Flask', 'MySQL', 'Streamlit'],
                        },
                        {
                          title: 'FINNOVATE',
                          description: 'Developed a fintech product for budgeting and managing credit scores.',
                          tech: ['Market Research', 'Product Development', 'Pitch Presentation'],
                        },
                      ].map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          viewport={{ once: true }}
                          className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                        >
                          <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                          <p className="mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, techIndex) => (
                              <span key={techIndex} className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>

              <section id="education" className="py-20 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <h2 className="text-4xl font-bold mb-8">Education</h2>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <h3 className="text-2xl font-semibold mb-2">Northeastern University</h3>
                      <p className="text-blue-400 mb-2">Khoury College of Computer Sciences</p>
                      <p className="text-sm text-gray-400 mb-4">Sept 2023 - May 2027</p>
                      <p>Major: Computer Science | GPA: 3.92 | Dean's List</p>
                      <p className="mt-2">
                        Relevant Coursework: Discrete Structures, Foundations of Cybersecurity, Object Oriented Design, Algorithms and Data
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <section id="contact" className="py-20 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-gray-800/50 p-8 rounded-lg shadow-lg backdrop-blur-sm"
                    >
                      <p className="text-xl mb-8">
                        I'm always excited to connect with fellow developers, potential collaborators, 
                        and industry professionals. Whether you have a question, want to discuss a project, 
                        or just want to say hello, feel free to reach out!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.a
                          href="mailto:tejchak04@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 bg-gray-700/50 hover:bg-gray-600/50 
                            transition-colors p-4 rounded-lg group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Mail className="text-blue-400 group-hover:text-blue-300" />
                          <span>Email Me</span>
                        </motion.a>
                        
                        <motion.a
                          href="https://www.linkedin.com/in/tej-chakravarthy-3b37132a2/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 bg-gray-700/50 hover:bg-gray-600/50 
                            transition-colors p-4 rounded-lg group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Linkedin className="text-blue-400 group-hover:text-blue-300" />
                          <span>Connect on LinkedIn</span>
                        </motion.a>

                        <motion.a
                          href="https://outlook.office.com/bookwithme/user/c74682626214455abcbf8db28ad004f9@northeastern.edu?anonymous&ep=plink"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 bg-gray-700/50 hover:bg-gray-600/50 
                            transition-colors p-4 rounded-lg group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Calendar className="text-blue-400 group-hover:text-blue-300" />
                          <span>Schedule a Meeting</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              <footer className="bg-black/40 backdrop-blur-md text-center py-6">
                <p>&copy; 2024 Tej Chakravarthy. All rights reserved.</p>
              </footer>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="fixed bottom-8 right-8 z-50"
              >
                <motion.button
                  onClick={() => scrollToSection('home')}
                  className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronDown className="transform rotate-180" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

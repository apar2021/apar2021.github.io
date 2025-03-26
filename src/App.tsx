import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CTFWriteups from './components/CTFWriteups'
import PageTransition from './components/PageTransition'
import CTFWriteupDetail from './components/CTFWriteupDetail'

const FloatingBackground = () => {
  return (
    <Canvas className="absolute top-0 left-0 z-0">
      <ambientLight intensity={1} />
      <directionalLight position={[2, 1, 1]} />
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#ff69b4"
          attach="material"
          distort={0.6}
          speed={1.5}
          roughness={0}
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  )
}

const Navigation = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Projects', path: '/projects', icon: '🚀' },
    { name: 'CTF Writeups', path: '/ctf-writeups', icon: '🔐' },
    { name: 'Contact', path: '/contact', icon: '✉️' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold"
        >
          <Link 
            to="/" 
            className="hover:opacity-80 transition-opacity bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          >
            Aparna
          </Link>
        </motion.h1>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                onHoverStart={() => setIsHovered(item.path)}
                onHoverEnd={() => setIsHovered(null)}
                className="relative"
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-foreground/80 hover:text-primary transition-colors flex items-center gap-2 ${
                    location.pathname === item.path ? 'text-primary' : ''
                  }`}
                >
                  {item.name}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: isHovered === item.path || location.pathname === item.path ? 1 : 0,
                      scale: isHovered === item.path || location.pathname === item.path ? 1 : 0.5
                    }}
                    className="text-sm"
                  >
                    {item.icon}
                  </motion.span>
                </motion.span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-[1.15rem] left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

const HeroSection = () => {
  const roles = [
    "Full Stack Developer",
    "Security Researcher",
    "CTF Enthusiast",
    "Problem Solver"
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center space-y-8 max-w-4xl"
      >
        <motion.div variants={item} className="space-y-4">
          <h2 className="text-2xl md:text-3xl text-primary/80 font-light">
            Hello, I'm
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Aparna
          </h1>
          <h2 className="text-2xl md:text-3xl text-primary/80 font-medium">
            CTF & Hackathon Enthusiast
          </h2>
        </motion.div>

        <motion.div 
          variants={item}
          className="relative h-20"
        >
          <AnimatePresence mode="wait">
            {roles.map((role, index) => (
              <motion.h2
                key={role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full text-3xl md:text-4xl font-semibold text-foreground/80"
                style={{
                  display: index === Math.floor((Date.now() / 2000) % roles.length) ? 'block' : 'none'
                }}
              >
                {role}
              </motion.h2>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          variants={item}
          className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting beautiful & functional web experiences with a focus on security,
          performance, and user experience.
        </motion.p>

        <motion.div
          variants={item}
          className="flex gap-4 justify-center items-center pt-8"
        >
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-primary/50 transition-shadow"
            >
              View My Work
            </motion.button>
          </Link>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors"
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="flex gap-6 justify-center pt-12"
        >
          {[
            { icon: "🎯", text: "Problem Solving" },
            { icon: "🔒", text: "Security First" },
            { icon: "✨", text: "Creative Design" },
          ].map((skill) => (
            <motion.div
              key={skill.text}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-2xl">{skill.icon}</span>
              <span className="text-sm text-foreground/60">{skill.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-primary/60 text-2xl cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary text-xl"
          >
            Loading 3D elements...
          </motion.div>
        </div>
      }>
        <FloatingBackground />
      </Suspense>
      <div className="relative z-10">
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ctf-writeups" element={<CTFWriteups />} />
          <Route path="/ctf-writeups/:id" element={<CTFWriteupDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

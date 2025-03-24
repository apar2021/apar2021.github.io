import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text3D, Center } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Suspense } from 'react'

const FloatingText = () => {
  return (
    <Canvas className="h-[400px]">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Center>
        <Suspense fallback={null}>
          <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
          >
            {`< / >`}
            <meshNormalMaterial />
          </Text3D>
        </Suspense>
      </Center>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  )
}

const About = () => {
  const roles = [
    "Full Stack Developer",
    "Security Researcher",
    "CTF Enthusiast",
    "Code Artist"
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
    <section className="min-h-screen py-20 bg-background relative">
      {/* Hero Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 text-center mb-20"
      >
        <motion.div variants={item} className="space-y-4 mb-8">
          <h2 className="text-2xl md:text-3xl text-primary/80 font-light">
            Hello, I'm
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Aparna
          </h1>
        </motion.div>

        <motion.div variants={item} className="relative h-20 mb-8">
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

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20">
          <motion.div
            variants={item}
            className="space-y-6 text-left"
          >
            <h3 className="text-3xl font-bold text-primary">About Me</h3>
            <p className="text-lg text-foreground/80 leading-relaxed">
              I'm a passionate full-stack developer with a strong focus on cybersecurity
              and CTF challenges. My journey in tech started with a curiosity for
              understanding how things work, which naturally led me into the world of
              security research and ethical hacking.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              When I'm not coding or solving CTF challenges, I enjoy sharing my
              knowledge through detailed writeups and contributing to the security
              community.
            </p>
            <div className="flex gap-4 pt-6">
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium shadow-lg hover:shadow-primary/50 transition-shadow"
                >
                  View Projects
                </motion.button>
              </Link>
              <Link to="/ctf-writeups">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors"
                >
                  Read CTF Writeups
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="relative h-[400px] bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl p-8"
          >
            <FloatingText />
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { icon: "🔒", title: "Security", items: ["Penetration Testing", "CTF", "Web Security"] },
            { icon: "💻", title: "Development", items: ["React", "Node.js", "Python"] },
            { icon: "🛠️", title: "Tools", items: ["Burp Suite", "Wireshark", "IDA Pro"] },
            { icon: "🎯", title: "Interests", items: ["Reverse Engineering", "Binary Exploitation", "Web3 Security"] },
          ].map((skill) => (
            <motion.div
              key={skill.title}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl bg-card hover:shadow-lg transition-shadow"
            >
              <span className="text-3xl mb-4 block">{skill.icon}</span>
              <h4 className="text-lg font-semibold text-primary mb-2">{skill.title}</h4>
              <ul className="text-sm text-foreground/60 space-y-1">
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About 
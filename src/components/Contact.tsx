import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useState } from 'react'

const FloatingOrb = () => {
  return (
    <Canvas className="absolute inset-0">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <Sphere args={[1, 32, 32]} scale={1.5}>
        <MeshDistortMaterial
          color="#ff69b4"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section className="min-h-screen py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px]"
          >
            <FloatingOrb />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </motion.div>

              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </motion.div>

              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-6 py-4 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg hover:shadow-primary/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
    </section>
  )
}

export default Contact 
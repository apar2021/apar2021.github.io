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
    id: 'gdb-challenge-eax-register',
    title: "GDB Challenge: Finding the EAX Register Value",
    category: "Binary",
    difficulty: "Easy",
    date: "2024-03-20",
    description: "A step-by-step guide to using GDB to inspect register values in a binary program, specifically focusing on finding the EAX register value at the end of the main function.",
    tags: ["GDB", "Assembly", "Debugging", "Binary Analysis"],
    content: [
      {
        title: "Initial Setup",
        content: "The challenge requires using GDB to inspect the value of the EAX register at the end of the main function. This is a fundamental exercise in binary analysis and debugging.",
        code: "gdb ./challenge"
      },
      {
        title: "Setting Breakpoints",
        content: "The key to solving this challenge is identifying the correct location to set a breakpoint. We need to analyze the program's functions and determine where the main function ends.",
        code: "info functions"
      },
      {
        title: "Function Analysis",
        content: "By examining the program's functions, we can identify the main function and its structure. This helps us understand where to place our breakpoint for maximum effectiveness."
      },
      {
        title: "Disassembling Main",
        content: "Using GDB's disassembly capabilities, we can examine the main function's instructions in detail. This reveals the program's execution flow and helps us identify the optimal breakpoint location.",
        code: "disassemble main"
      },
      {
        title: "Register Inspection",
        content: "Once we've set the breakpoint at the appropriate location, we can run the program and inspect the EAX register's value when execution stops. This reveals the flag or solution we're looking for.",
        code: "info registers eax"
      }
    ],
    takeaways: [
      "Understanding GDB's basic commands is crucial for binary analysis",
      "Proper breakpoint placement is essential for effective debugging",
      "Register inspection is a fundamental skill in binary exploitation",
      "Function analysis helps in understanding program flow",
      "Disassembly skills are key to binary challenges"
    ]
  },
  {
    id: 'forensics-challenge-verify',
    title: "Forensics Challenge: Verify",
    category: "Forensics",
    difficulty: "Medium",
    date: "2024-03-21",
    description: "A forensics challenge involving the analysis of multiple images to verify and extract hidden information.",
    tags: ["Forensics", "Image Analysis", "Steganography", "Verification"],
    content: [
      {
        title: "Initial Analysis",
        content: "The challenge presented multiple images that needed to be analyzed for hidden information. The key was to verify the authenticity and extract any concealed data from these images.",
        code: "file image1.png\nfile image2.png\nfile image3.png\nfile image4.png\nfile image5.png"
      },
      {
        title: "Image Verification",
        content: "Each image was subjected to various forensics tools to verify its integrity and identify any potential hidden data. This included checking file metadata, analyzing pixel patterns, and looking for steganographic techniques."
      },
      {
        title: "Data Extraction",
        content: "Using specialized forensics tools, we extracted and analyzed the hidden information from each image. The process involved combining data from multiple images to reconstruct the complete solution.",
        code: "steghide extract -sf image1.png\nbinwalk image2.png\nstrings image3.png"
      },
      {
        title: "Verification Process",
        content: "The verification process required cross-referencing data across all images to ensure consistency and authenticity. This helped identify any potential red herrings or false leads."
      },
      {
        title: "Solution Reconstruction",
        content: "By piecing together the verified information from all images, we were able to reconstruct the complete solution and obtain the flag."
      }
    ],
    takeaways: [
      "Multiple images often contain complementary information",
      "Verification is crucial in forensics challenges",
      "Cross-referencing data helps identify authentic information",
      "Understanding steganographic techniques is essential",
      "Patience and systematic analysis are key to forensics challenges"
    ]
  },
  {
    id: 'signal-analysis-unknown-object',
    title: "Task 1 - NSA Codebreaker Challenge 2023",
    category: "Forensics",
    difficulty: "Medium",
    date: "2024-03-22",
    description: "A forensics challenge involving the analysis of signal data from US Coast Guard and NSA databases to identify matching records based on geographic coordinates and timestamps.",
    tags: ["Forensics", "Database Analysis", "Signal Processing", "SQLite", "Metadata Analysis"],
    content: [
      {
        title: "Challenge Overview",
        content: "The US Coast Guard recorded an unregistered signal over 30 nautical miles away from the continental US (OCONUS). The task involves analyzing NSA databases to find matching records that could help identify the object's location.",
        code: "Files provided:\n- USCG.log (signal metadata)\n- database.db (NSA signal database)"
      },
      {
        title: "Requirements Analysis",
        content: "The solution needed to meet specific criteria:\n- Geographic coordinates within 1/100th of a degree\n- Record timestamps no more than 10 minutes apart\n- Multiple corresponding entries from the NSA database"
      },
      {
        title: "Database Structure",
        content: "The NSA database contained five tables:\n- audio_object\n- event\n- location\n- sqlite_sequence\n- timestamp",
        code: "sqlite3 database.db\n.tables"
      },
      {
        title: "Analysis Process",
        content: "Using SQLite, we analyzed the database to find records matching the criteria. The process involved:\n1. Parsing the USCG.log file for signal metadata\n2. Querying the NSA database for matching records\n3. Filtering results based on geographic coordinates and timestamps"
      },
      {
        title: "Solution Approach",
        content: "The solution required simultaneous analysis of multiple tables to identify records that met all criteria. The final answer consisted of database record IDs that matched the specified parameters."
      }
    ],
    takeaways: [
      "Understanding database structure is crucial for forensics analysis",
      "Multiple data sources need to be correlated for complete analysis",
      "Geographic and temporal data require precise matching criteria",
      "SQLite is a powerful tool for database forensics",
      "Attention to detail is essential when working with multiple parameters"
    ]
  },
  {
    id: 'hardware-analysis-firmware-extract',
    title: "Task 2 - NSA Codebreaker Challenge 2023",
    category: "Hardware",
    difficulty: "Hard",
    date: "2024-03-22",
    description: "A hardware analysis challenge involving the identification of GPIO pins and UART functionality on an embedded device, requiring datasheet analysis and pin mapping.",
    tags: ["Hardware", "GPIO", "UART", "Datasheet Analysis", "Embedded Systems"],
    content: [
      {
        title: "Challenge Overview",
        content: "After identifying an unknown device with a collection array, analysis revealed a hobbyist computer with non-responsive common ports. The device features a 40-pin GPIO header and an additional 20-pin header, with low-voltage activity indicating potential data communication capabilities.",
        code: "Files provided:\n- pinout.svg (GPIO pin mapping)\n- cpu.jpg (device CPU image)\n- boot_prompt.log (HDMI output)"
      },
      {
        title: "Device Analysis",
        content: "Key observations:\n- Device has a 40-pin GPIO header plus 20-pin header\n- Common data and visual ports are non-responsive\n- Only HDMI shows boot prompt output\n- Physical pins show low-voltage activity\n- Device resembles a popular hobbyist computer"
      },
      {
        title: "Pin Mapping Analysis",
        content: "The pinout.svg file provided crucial information:\n- Two voltage types: 3.3V (gold/tan) and 5V (red)\n- Physical pin labels (P1, P60, etc.)\n- GPIO header configuration",
        code: "Note: Dark mode must be disabled to view physical pin labels in pinout.svg"
      },
      {
        title: "Solution Requirements",
        content: "The challenge required identifying:\n1. Physical pin number for GPIO header power\n2. Physical pin number for board grounding\n3. Physical pin number for UART transmit function\n4. Physical pin number for UART receive function"
      },
      {
        title: "Problem Solving Approach",
        content: "The solution involved:\n1. Identifying the device from the pinout diagram\n2. Using process of elimination for grounding pins\n3. Finding corresponding pinout diagram for device grounding\n4. Analyzing device responses for correct pin identification\n5. Mapping UART functionality to specific pins"
      }
    ],
    takeaways: [
      "Understanding GPIO pin mapping is crucial for hardware analysis",
      "Device identification through visual inspection is important",
      "Datasheet analysis is essential for hardware challenges",
      "Process of elimination can be effective for pin identification",
      "Attention to device responses helps validate solutions"
    ]
  },
  {
    id: 'firmware-analysis-decryption',
    title: "Task 3 - NSA Codebreaker Challenge 2023",
    category: "Firmware",
    difficulty: "Hard",
    date: "2024-03-22",
    description: "A firmware analysis challenge involving U-Boot bootloader analysis, kernel decryption, and QEMU emulation to find a secret decryption key.",
    tags: ["Firmware", "U-Boot", "QEMU", "Emulation", "Device Tree", "Decryption"],
    content: [
      {
        title: "Challenge Overview",
        content: "After establishing UART communication with the device, we obtained a firmware dump. Analysis revealed an encrypted kernel and a second-stage bootloader responsible for decryption. The challenge involves finding the secret key used to decrypt the kernel.",
        code: "Files provided:\n- u-boot.bin (U-Boot program loader)\n- device_tree.dtb (Device tree blob)\n- cbc_qemu_aarch64-source.tar.bz2 (Docker source)\n- cbc_qemu_aarch64-image.tar.bz2 (Pre-built Docker image)"
      },
      {
        title: "Initial Analysis",
        content: "Key observations:\n- Kernel appears to be encrypted\n- Second-stage bootloader handles decryption\n- Second UART present but inactive\n- Device tree file available for analysis"
      },
      {
        title: "Environment Setup",
        content: "The challenge required setting up a QEMU environment:\n1. Using provided Docker container for QEMU/aarch64\n2. Building from source or using pre-built image\n3. Loading the U-Boot binary and device tree",
        code: "docker load -i cbc_qemu_aarch64-image.tar.bz2\ndtc -I dtb -O dts device_tree.dtb"
      },
      {
        title: "Bootloader Analysis",
        content: "The solution involved:\n1. Booting the QEMU emulator for Raspberry Pi\n2. Accessing the U-Boot bootloader environment\n3. Examining environment variables\n4. Reading memory at locations specified by bootloader env vars"
      },
      {
        title: "Solution Approach",
        content: "The decryption key was found by:\n1. Parsing through bootloader environment variables\n2. Identifying memory locations containing key information\n3. Reading memory at designated locations\n4. Extracting the decryption key from the environment"
      }
    ],
    takeaways: [
      "Understanding bootloader environments is crucial for firmware analysis",
      "QEMU emulation is essential for firmware testing",
      "Device tree analysis helps understand hardware configuration",
      "Environment variables often contain critical information",
      "Memory inspection is key to finding hidden data"
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
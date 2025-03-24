import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { writeups } from './CTFWriteups'; // We'll export the writeups data

const CTFWriteupDetail = () => {
  const { id } = useParams();
  const writeup = writeups.find(w => w.id === id);

  if (!writeup) {
    return (
      <div className="min-h-screen py-32 px-4 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Writeup Not Found</h1>
          <Link to="/ctf-writeups" className="text-primary hover:underline">
            ← Back to Writeups
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-32 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            to="/ctf-writeups"
            className="text-primary hover:underline inline-flex items-center gap-2 mb-8"
          >
            ← Back to Writeups
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              writeup.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
              writeup.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
              'bg-red-500/10 text-red-500'
            }`}>
              {writeup.difficulty}
            </span>
            <span className="text-sm text-foreground/60">{writeup.date}</span>
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              {writeup.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-primary mb-4">
            {writeup.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {writeup.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <h2>Challenge Description</h2>
          <p>{writeup.description}</p>

          {writeup.content.map((section, index) => (
            <div key={index} className="mb-8">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
              {section.code && (
                <pre className="bg-card p-4 rounded-lg overflow-x-auto">
                  <code>{section.code}</code>
                </pre>
              )}
            </div>
          ))}

          <h2>Key Takeaways</h2>
          <ul>
            {writeup.takeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default CTFWriteupDetail; 
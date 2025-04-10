import { motion } from "framer-motion";

const stats = [
  { value: "250+", label: "Pro Players on Our Team" },
  { value: "15,000+", label: "Students Coached" },
  { value: "85%", label: "Rank Improvement Rate" }
];

export default function Statistics() {
  return (
    <section className="py-16 bg-[#111111] px-4 md:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="text-4xl font-bold text-primary mb-2">{stat.value}</h2>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

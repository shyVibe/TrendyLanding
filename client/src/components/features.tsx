import { motion } from "framer-motion";
import { Zap, BarChart3, Cloud, Clock, Users, ClipboardList } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Targeted Lead Generation",
    description: "Attract high-quality leads that match your ideal customer profile."
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: "Conversion Optimization",
    description: "Turn visitors into customers with data-driven optimization strategies."
  },
  {
    icon: <Cloud className="h-10 w-10" />,
    title: "Cloud Analytics",
    description: "Gain deep insights with our advanced analytics platform."
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "Automation Tools",
    description: "Save time and resources with powerful workflow automation."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Customer Segmentation",
    description: "Target specific audiences with personalized messaging."
  },
  {
    icon: <ClipboardList className="h-10 w-10" />,
    title: "Campaign Management",
    description: "Create, manage and optimize all your marketing campaigns."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features to Drive Growth
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our comprehensive solution provides everything you need to accelerate business results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-[#111111] p-8 rounded-lg hover:shadow-xl transition border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

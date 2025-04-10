import { motion } from "framer-motion";
import { Zap, Target, Cpu, Gamepad2, Users, Trophy, Swords } from "lucide-react";

const features = [
  {
    icon: <Gamepad2 className="h-10 w-10" />,
    title: "Game-Specific Coaching",
    description: "Expert coaching for popular games including League of Legends, Valorant, CS:GO, Dota 2, and more."
  },
  {
    icon: <Target className="h-10 w-10" />,
    title: "Skill Assessment",
    description: "Detailed analysis of your gameplay with personalized feedback to identify improvement areas."
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Live 1-on-1 Sessions",
    description: "Real-time coaching with pro players who provide immediate feedback during your matches."
  },
  {
    icon: <Cpu className="h-10 w-10" />,
    title: "Strategy Development",
    description: "Learn advanced tactics, meta strategies, and decision-making skills to outplay your opponents."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Team Coaching",
    description: "Group coaching for your entire team focusing on coordination, communication, and synergy."
  },
  {
    icon: <Trophy className="h-10 w-10" />,
    title: "Tournament Preparation",
    description: "Specialized coaching programs to prepare you for competitive tournaments and leagues."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Elite Coaching Services
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our professional coaching services are designed to help you master your game and climb the ranks.
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

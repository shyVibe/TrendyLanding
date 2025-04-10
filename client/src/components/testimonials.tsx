import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    content: "After just 10 coaching sessions, I climbed from Silver to Platinum in League of Legends. My coach identified critical mistakes in my gameplay that I never realized I was making. The improvement has been incredible!",
    name: "Alex Chen",
    title: "League of Legends Player",
    stars: 5
  },
  {
    content: "Our team had been stuck in the same rank for months. The team coaching sessions completely transformed our coordination and strategy. We qualified for our first regional tournament last month!",
    name: "Emma Rodriguez",
    title: "Valorant Team Captain",
    stars: 5
  },
  {
    content: "I went from hardstuck Gold to Diamond in just 6 weeks with EsportsCoaching. My coach's personalized aim training routine and positioning tips completely changed my Overwatch gameplay!",
    name: "Marcus Johnson",
    title: "Overwatch Player",
    stars: 5
  },
  {
    content: "The macro game insights I learned from my Dota 2 coach were eye-opening. My map awareness and decision-making improved dramatically, and I finally broke through to Immortal rank.",
    name: "Sophia Park",
    title: "Dota 2 Player",
    stars: 5
  },
  {
    content: "As a CS:GO player struggling with consistency, my coach helped me develop a proper practice routine. My K/D ratio improved by 30% and I've finally achieved Global Elite status.",
    name: "David Thompson",
    title: "CS:GO Player",
    stars: 5
  },
  {
    content: "I was skeptical about coaching for mobile games, but my Wild Rift coach completely changed my perspective. Made it to Challenger with their lane control and objective timing strategies.",
    name: "Olivia Williams",
    title: "Wild Rift Player",
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-[#111111] px-4 md:px-0">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from players who have transformed their gameplay and climbed the ranks with our coaching.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-black border-gray-800">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-800 flex items-center justify-center">
                      <svg 
                        className="h-10 w-10 text-gray-400" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <div className="flex mb-2">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-300 mb-4">{testimonial.content}</p>
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* AdSense container - medium rectangle format */}
        <div className="ad-container w-full h-64 max-w-xs mx-auto relative border border-white/10 rounded-lg bg-slate-800/30 flex justify-center items-center">
          <div className="text-gray-400 text-sm absolute -top-2.5 bg-black px-2">
            Advertisement
          </div>
        </div>
      </div>
    </section>
  );
}

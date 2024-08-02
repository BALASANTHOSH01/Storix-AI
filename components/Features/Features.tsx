import React from "react";
import {
  BarChart,
  User,
  Shield,
  Link2,
  Layers,
  Headphones,
} from "lucide-react";

const features = [
  {
    title: "Real-Time Analytics",
    description:
      "Gain insights into your data with our real-time analytics. Monitor performance metrics, track user engagement, and make data-driven decisions instantly.",
    points: [
      "Live data updates",
      "Customizable dashboards",
      "Detailed reports",
    ],
    icon: <BarChart className="w-10 h-10 text-green-500 mb-4" />,
  },
  {
    title: "High Security",
    description:
      "Security is our top priority. Our platform employs state-of-the-art security measures to ensure your data is safe and protected from any threats.",
    points: [
      "End-to-end encryption",
      "Regular security audits",
      "Compliance with industry standards",
    ],
    icon: <Shield className="w-10 h-10 text-red-500 mb-4" />,
  },
  {
    title: "Seamless Integration",
    description:
      "Integrate our platform with your existing tools and workflows effortlessly. Our APIs and connectors ensure smooth and efficient integration.",
    points: [
      "API support",
      "Third-party integrations",
      "Automation capabilities",
    ],
    icon: <Link2 className="w-10 h-10 text-yellow-500 mb-4" />,
  },
  {
    title: "Scalable Infrastructure",
    description:
      "Our platform is built on a scalable infrastructure, ensuring it can handle any amount of data and user load without compromising on performance.",
    points: ["Cloud-based", "High availability", "Load balancing"],
    icon: <Layers className="w-10 h-10 text-teal-500 mb-4" />,
  },
  {
    title: "Comprehensive Support",
    description:
      "We offer comprehensive support to help you get the most out of our platform. Our support team is always ready to assist you with any issues or questions.",
    points: [
      "24/7 customer support",
      "Extensive documentation",
      "Community forums",
    ],
    icon: <Headphones className="w-10 h-10 text-purple-500 mb-4" />,
  },
];

const Features = () => {
  return (
    <div className="p-16  lg:p-0 relative overflow-hidden bg-white dark:bg-[#121212]" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className=" flex flex-col items-center justify-center pb-10">
          <h2 className="text-5xl font-extrabold text-center my-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Features</h2>
          <p className=" max-w-[70%] text-center text-sm text-slate-500">
            Discover the key features that make our platform stand out. Explore
            how each feature enhances your experience and delivers unmatched
            value.
          </p>
        </div>
        <p></p>
        <div className="flex gap-6 flex-wrap items-stretch lg:flex-col lg:items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card border border-slate-300 dark:border-slate-500 flex flex-col items-start justify-between p-8 rounded-md shadow-sm w-[25%] lg:w-[90%] flex-grow flex-shrink relative bg-transparent"
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
              <div className="shiny-line"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

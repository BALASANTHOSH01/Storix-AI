import React from 'react';
import { Package, User, Smartphone, Image, Database } from 'lucide-react';

const features = [
  {
    title: 'Pantry and Inventory Management',
    description: 'Efficiently manage your pantry and inventory with features tailored to keep track of items, quantities, and storage locations.',
    icon: <Package className="w-10 h-10 text-green-500 mb-4" />,
  },
  {
    title: 'User-Specific Data Display',
    description: 'Personalized experience with user-specific data display, ensuring each user sees only their relevant information.',
    icon: <User className="w-10 h-10 text-blue-500 mb-4" />,
  },
  {
    title: 'Responsive Design',
    description: 'Built with Next.js and Tailwind CSS, the app provides a seamless experience across all devices, with responsive design and a hamburger menu for small screens.',
    icon: <Smartphone className="w-10 h-10 text-red-500 mb-4" />,
  },
  {
    title: 'Image and Information Handling',
    description: 'Easily manage item images with fallbacks and tooltips, ensuring a comprehensive view of your inventory.',
    icon: <Image className="w-10 h-10 text-yellow-500 mb-4" />,
  },
  {
    title: 'Firestore Integration',
    description: 'Securely store and manage user data with Firestore, allowing users to join the waitlist without requiring authentication.',
    icon: <Database className="w-10 h-10 text-teal-500 mb-4" />,
  },
];

const Features = () => {
  return (
    <div className="p-16 lg:p-0 relative overflow-hidden" id='features'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-center mb-12">Features</h2>
        <div className="flex gap-6 flex-wrap items-stretch lg:flex-col lg:items-center">
          {features.map((feature, index) => (
            <div key={index} className="feature-card border border-slate-500 flex flex-col items-start justify-between p-8 rounded-md shadow-sm w-[25%] lg:w-[90%] flex-grow flex-shrink relative bg-transparent">
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

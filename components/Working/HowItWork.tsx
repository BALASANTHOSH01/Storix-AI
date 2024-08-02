import React from 'react';
import { Box, List, CheckCircle, Clipboard, MessageSquareCode , User } from 'lucide-react';
import Link from 'next/link';

const steps = [
 
  {
    title: 'Monitor Inventory',
    description: 'Track the quantities of each item in real-time. Receive notifications when items are running low or nearing expiration.',
    icon: <MessageSquareCode className="w-12 h-12 text-red-500 mb-4" />,
  },
  {
    title: 'Manage Recipes and Shopping Lists',
    description: 'Use your pantry inventory to manage recipes and create shopping lists. Plan meals based on available ingredients and get suggestions for items to buy.',
    icon: <CheckCircle className="w-12 h-12 text-orange-500 mb-4" />,
  },
  {
    title: 'Share with Collaborators',
    description: 'Collaborate with family or housemates by sharing the pantry management system. Everyone can view and update the inventory as needed.',
    icon: <User className="w-12 h-12 text-teal-500 mb-4" />,
  },
  {
    title: 'Add Your Pantry Items',
    description: 'Begin by adding the items in your pantry to the StorixAi system. Input details like item name, quantity, and expiration date.',
    icon: <Clipboard className="w-12 h-12 text-blue-500 mb-4" />,
  },
  {
    title: 'Organize and Categorize',
    description: 'Organize your items into categories for better management. Create categories based on types, storage locations, or other criteria.',
    icon: <Box className="w-12 h-12 text-green-500 mb-4" />,
  },
];

const HowItWorks = () => {
  return (
    <div className=" lg:p-8 p-16" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">How Storix AI Works</h2>
        <p className="text-center mb-12 text-lg text-gray-500">Efficiently manage your pantry with these simple steps.</p>
        <div className="flex gap-6 flex-wrap-reverse items-stretch lg:flex-col lg:items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="feature-card border border-slate-300 dark:border-slate-500 flex flex-col items-start justify-between p-8 rounded-md shadow-sm w-[25%] lg:w-[90%] flex-grow flex-shrink relative bg-transparent"
            >
              {step.icon}
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
              <div className="shiny-line"></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
  <Link 
    href="/auth" 
    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition duration-300"
  >
    Start managing your pantry effortlessly with Storix AI today!
  </Link>
</div>

      </div>
    </div>
  );
};

export default HowItWorks;

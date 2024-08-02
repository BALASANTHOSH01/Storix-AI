import React from 'react';

const useCases = [
  {
    title: 'Family Home Management',
    description: 'Organize pantry items, track expiry dates, and reduce food waste.',
    backgroundImage: 'https://img.freepik.com/free-photo/front-view-family-playing-videogame_23-2150573868.jpg?t=st=1722587295~exp=1722590895~hmac=ac4e8a4d569c2a823ded499c0298c59c2dc9a80bbad3c1f4a7cc04ca74f3cee8&w=826',
  },
  {
    title: 'Shared Living Spaces',
    description: 'Coordinate grocery shopping and meal planning in shared spaces.',
    backgroundImage: 'https://images.pexels.com/photos/5158946/pexels-photo-5158946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
  },
  {
    title: 'Meal Planning',
    description: 'Create shopping lists and find recipes based on available ingredients.',
    backgroundImage: 'https://images.pexels.com/photos/4551571/pexels-photo-4551571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
  },
  {
    title: 'Small Businesses',
    description: 'Track stock levels and manage inventory efficiently.',
    backgroundImage: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
  },
  {
    title: 'Minimalist Lifestyle',
    description: 'Maintain a streamlined inventory and avoid clutter.',
    backgroundImage: 'https://images.pexels.com/photos/920384/pexels-photo-920384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
  },
];

const UseCases = () => {
  return (
    <div className="relative lg:p-8 p-16 bg-white dark:bg-[#121212]" id="use-cases">
      <div className="max-w-7xl mx-auto lg:px-4 sm:px-6 px-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-br from-blue-600 to-violet-600 bg-clip-text text-transparent">Use Cases</h2>
        <p className="text-center mb-12 text-lg text-gray-600">Discover how StorixAi simplifies your pantry management.</p>
        <div className="marquee-container">
          <div className="marquee-content animate-marquee">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="marquee-item text-center"
                style={{ backgroundImage: `url(${useCase.backgroundImage})`, backgroundSize: 'cover' }}
              >
                <div className="overlay">
                  <h3 className="text-xl font-semibold mb-4 text-white">{useCase.title}</h3>
                  <p className="text-white">{useCase.description}</p>
                </div>
              </div>
            ))}
            {/* Duplicate the items for continuous scrolling effect */}
            {useCases.map((useCase, index) => (
              <div
                key={index + useCases.length}
                className="marquee-item text-center"
                style={{ backgroundImage: `url(${useCase.backgroundImage})`, backgroundSize: 'cover' }}
              >
                <div className="overlay">
                  <h3 className="text-xl font-semibold mb-4 text-white">{useCase.title}</h3>
                  <p className="text-white">{useCase.description}</p>
                </div>
              </div>
            ))}
           
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-white dark:from-[#121212]"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-white dark:from-[#121212]"></div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;

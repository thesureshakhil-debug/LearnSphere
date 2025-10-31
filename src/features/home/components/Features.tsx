const Features = () => {
  const features = [
    {
      title: 'Interactive Courses',
      description: 'Engage with multimedia content, videos, and interactive quizzes.',
      icon: '🎓',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed progress analytics.',
      icon: '📊',
    },
    {
      title: 'Expert Instructors',
      description: 'Learn from industry professionals and experienced educators.',
      icon: '👨‍🏫',
    },
    {
      title: 'Flexible Learning',
      description: 'Study at your own pace, anytime and anywhere.',
      icon: '⏰',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Why Choose LearnSphere?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
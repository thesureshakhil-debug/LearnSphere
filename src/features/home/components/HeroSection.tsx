import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { useStore } from '../../../store';

const HeroSection = () => {
  const { isAuthenticated, user } = useStore();

  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to LearnSphere
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your gateway to interactive learning. Access courses, track progress, 
          and achieve your educational goals with our comprehensive platform.
        </p>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <p className="text-lg mb-4">
                Hello, {user?.name}! 👋
              </p>
              <div className="space-x-4">
                <Link to="/courses">
                  <Button size="lg" variant="secondary">
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="text-white border-white">
                    My Dashboard
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg" variant="secondary">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-white border-white">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
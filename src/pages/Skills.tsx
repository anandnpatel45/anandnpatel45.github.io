import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from '../utils/scrollWithOffset'
import { useEffect } from 'react';
import SkillCards from '../components/SkillCards';



export default function Skills() {
  
  const location = useLocation();

  useEffect(() => {
    
    if (location.hash === '#top') {
      const topElement = document.getElementById('top');
      if (topElement) {
        console.log("Found the top element. Scrolling to it.");
        topElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn("The 'top' element was not found.");
      }
    }
  }, [location.hash]);

  return (
    <>
      <div id="top" className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 pb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Skills & Expertise</h1>

              <SkillCards />
            </div>
          </div>
          {/* Now the Back to Home button stays aligned with the card */}
<div className="mt-8 mb-8">
  <HashLink smooth scroll={scrollWithOffset}
    to="/#skills_preview"
    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
  >
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back to Home
  </HashLink>
</div>
</div> {/* close max-w-4xl */}
</div> {/* close top section */}
      
    </>
  );
}

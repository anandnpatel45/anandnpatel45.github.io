import { ArrowRight, User, GraduationCap, FolderGit2, BookText, Code, ArrowLeft } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { useEffect, useState } from 'react';
import ProjectsPreview from '../components/ProjectsPreview'; // adjust path as needed
import { scrollWithOffset } from '../utils/scrollWithOffset'



type Skill = {
  name: string;
  color: string;
  value: number;
};
type ProfessionalAchievement = {
  value: number;
  label: string;
};
type Publication = {
  title: string;
  authors: string;
  conference: string;
  year: number | null;
  abstract: string;
  link: string;
  kind: string;
};

export default function Home() {
  const [skillsData, setSkillsData] = useState<Record<string, Skill[]>>({}); // ✅ Moved here
  const [achievements, setAchievements] = useState<ProfessionalAchievement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);
  

  useEffect(() => {
    setIsVisible(true);
    
    // ✅ Fetching skills JSON here
    fetch('/Media/Skills.json')
      .then((res) => res.json())
      .then((data) => {
    const entries = Object.entries(data).slice(0, 3); // Get first 3 sections
    const trimmedData = Object.fromEntries(entries);  // Convert back to object

    setSkillsData(trimmedData);
  })
      .catch((err) => console.error('Failed to load skills data:', err));
    
      fetch('/Media/ProfessionalAchievements.json')
        .then((res) => res.json())
        .then((data) => setAchievements(data))
        .catch((err) => console.error('Failed to load professional achievements:', err));

    }, []);

  const [latestPublicationTitle, setLatestPublicationTitle] = useState<string>('');

  useEffect(() => {
    fetch('/Media/Publications.json')
      .then((res) => res.json())
      .then((data: Publication[]) => {
        if (!Array.isArray(data)) return;

        setPublications(data);

        const latestYear = Math.max(...data.map((pub) => pub.year ?? 0));
        const latestPub = data.find((pub) => pub.year === latestYear);

        if (latestPub) {
          setLatestPublicationTitle(latestPub.title);
        }
      })
      .catch((err) => console.error('Failed to load publications:', err));
  }, []);
 

  const introText = "Hello, I'm";
  const words = introText.split(' ');

  const journalPublicationsCount = publications.filter(
      (pub) => pub.kind === 'Journal Publications'
    ).length;

    const conferencePublicationsCount = publications.filter(
      (pub) => pub.kind === "Conference Publications"
    ).length;

  return (
    <div id="top" className="min-h-screen dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-pattern opacity-40"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-element floating-element-1"></div>
          <div className="floating-element floating-element-2"></div>
          <div className="floating-element floating-element-3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Photo with Animation */}
            {/* <div className="order-1 lg:order-2 transform hover:scale-105 transition-all duration-500">
              <div className="relative z-20">
                <div className="w-[250px] h-[250px] md:w-[390px] md:h-[390px] rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl mx-auto lg:ml-[-20px] animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=800&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div> */}
            <div className="order-2 lg:order-1 transform hover:scale-105 transition-all duration-500">
  <div className="relative z-100">
    <div className="w-[250px] h-[330px] md:w-[340px] md:h-[444px] rounded-full border-8 border-white shadow-lg overflow-hidden mx-auto animate-float lg:ml-[100px]">
      <img
        src="/Media/Profile.jpg" // Profile should have a aspect ratio less than 3:4. The images needs to be longer than 4:3 calculation to accomodate for the animations. 
        alt="Profile"
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
      />
    </div>
  </div>
</div>


            {/* Text Content with Animations */}
            <div className="order-1 lg:order-2 text-center lg:text-left lg:-ml-20">
              <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight animate-slide-in">
                  {words.map((word, index) => (
                    <span key={index} className="hero-word mr-4">
                      {word}
                    </span>
                  ))}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-text hero-word md:text-8xl" >
                    Anand Patel
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 animate-type">
                  Researcher • Engineer •  Lifelong Learner
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <HashLink smooth scroll={scrollWithOffset}
                    to="/projects"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    View My Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </HashLink>
                  <HashLink smooth scroll={scrollWithOffset} to="#contact"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-gray-700 dark:text-white border-2 border-gray-700 dark:border-white rounded-full hover:bg-gray-700 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
                  >
                    Contact Me
                  </HashLink>
                </div>

                <div className="mt-8 inline-flex max-w-full items-center gap-3 rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800/90">
                  <GraduationCap aria-hidden="true" className="h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">PhD Candidate in Mechanical Engineering</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Rutgers University</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Previews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {/* About Preview */}
        <section className="group relative transform hover:-translate-y-2 transition-all duration-300">
          <div  id="about_preview" className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">About Me</h2>
              </div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Where machines meet models — I explore, engineer, and evolve systems for tomorrow's manufacturing ...
                {/* Passionate mechanical engineer with a focus on creating impactful solutions... */}
              </p>
              <HashLink smooth scroll={scrollWithOffset}
                to="/about"
                className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Learn more about me
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </HashLink>
            </div>
          </div>
        </section>

        {/* Projects Preview */}
        <ProjectsPreview />

        {/* Publications Preview */}
        <section className="group relative transform hover:-translate-y-2 transition-all duration-300">
          <div id="publications_preview" className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center">
                <BookText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">Publications</h2>
              </div>
              <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Latest Publication</h3>
                <p className="text-gray-600 dark:text-gray-300">
  {latestPublicationTitle || 'Loading latest publication...'} . . .
</p>
              </div>
              <HashLink smooth scroll={scrollWithOffset}
                to="/publications"
                className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                View all publications
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </HashLink>
            </div>
          </div>
        </section>

        {/* Education Preview */}
        <section className="group relative transform hover:-translate-y-2 transition-all duration-300">
          <div id="education_preview" className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">Education</h2>
              </div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Engineer and researcher shaped by mechanical systems, now reimagining them through data and learning ...
              </p>
              <HashLink smooth scroll={scrollWithOffset}
                to="/education"
                className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                View my educational background
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </HashLink>
            </div>
          </div>
        </section>

        {/* Skills Preview */}
        <section className="group relative transform hover:-translate-y-2 transition-all duration-300">
  <div id="skills_preview" className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
    <div className="p-8">
      <div className="flex items-center mb-6">
        <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">Skills</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white capitalize">
              {category}
            </h3>
            <div className="relative">
              <svg className="w-full" viewBox="0 0 100 100">
                {skills.map((skill, index) => {
                  // Calculate the total value of all skills in the category
                  const totalValue = skills.reduce((sum, skill) => sum + skill.value, 0);
                  if (totalValue === 0) return null;  // Avoid division by zero

                  // Calculate start and end angles based on the skill values
                  const startAngle = (skills.slice(0, index).reduce((sum, s) => sum + s.value, 0) * 360) / totalValue;
                  const endAngle = ((skills.slice(0, index + 1).reduce((sum, s) => sum + s.value, 0)) * 360) / totalValue;

                  // Compute the x and y coordinates for the arc
                  const x1 = 50 - 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 - 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 - 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 - 40 * Math.sin((endAngle * Math.PI) / 180);
                  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

                  return (
                    <path
                      key={skill.name}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={skill.color}
                      className={`transition-all duration-300 transform ${hoveredSkill === skill.name ? 'scale-110' : ''}`}
                      style={{
                        transformOrigin: '50% 50%', // Ensures the scaling happens from the center
                      }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    />
                  );
                })}
                <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
              </svg>
            </div>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center justify-between text-sm p-2 rounded-lg transition-colors duration-300 ${
                    hoveredSkill === skill.name
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <HashLink smooth scroll={scrollWithOffset}
        to="/skills"
        className="mt-8 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
      >
        See detailed skills
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
      </HashLink>
    </div>
  </div>
</section>

{/* Professional Achievements */}
<section className="group relative transform hover:-translate-y-2 transition-all duration-300">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Professional Achievements
      </h2>
      
      <div className="flex flex-wrap justify-center gap-8">

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{journalPublicationsCount}</div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">Journal Publications</div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{conferencePublicationsCount}</div>
          <div className="text-gray-600 dark:text-gray-300 mt-2">Conference Publications</div>
        </div>
        {achievements.map((achievement, index) => (
          <div
            key={achievement.label}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {achievement.value}
            </div>
            <div className="text-gray-600 dark:text-gray-300 mt-2">
              {achievement.label}
            </div>
          </div>
        ))}
      </div>


    </div>
  </div>
  
</section>

      </div>
      
    </div>
  );
}
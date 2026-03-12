import { ArrowLeft } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from '../utils/scrollWithOffset'
// import ScrollToTop from '../components/ScrollToTop';
import { useEffect, useRef, useState } from 'react';

/* ─── Slugify helper ───────────────────────────────── */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/* ─── Timeline component (reads JSON from /public/Media) ─── */
function LearningTimeline() {
  const [timeline, setTimeline] = useState<
    { year: string; skill: string; project: { label: string } }[]
  >([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 1. fetch the JSON once
  useEffect(() => {
    fetch('/Media/Learning_table.json')
      .then((res) => res.json())
      .then(setTimeline)
      .catch((err) => console.error('Failed to load timeline', err));
  }, []);

  // 2. reveal the table as soon as data arrives
  useEffect(() => {
    if (timeline.length && wrapperRef.current) {
      wrapperRef.current.classList.add('opacity-100', 'translate-y-1');
      wrapperRef.current.classList.remove('opacity-0', 'translate-y-8');
    }
  }, [timeline]);

  if (!timeline.length) return null;

  return (
    <div
      ref={wrapperRef}
      className="overflow-x-auto mb-6 fade-in opacity-0 translate-y-8 transition duration-700"
    >
      <div className="w-[90%] mx-auto">
       <table className="w-full table-fixed min-w-[28rem] text-left border-collapse rounded-lg bg-white/70 dark:bg-slate-800/60 backdrop-blur">
  <colgroup>
    <col className="w-[70px]" />
    <col className="w-[30%]" />
    <col className="w-[60%]" />
  </colgroup>

  <thead>
  <tr className="bg-gray-200 dark:bg-gray-700 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">
    <th className="w-[70px] py-2 px-4 text-center align-middle rounded-tl-lg">
      Year
    </th>
    <th className="py-2 px-2 sm:px-4 whitespace-normal break-normal">
      Concept I Learned
    </th>
    <th className="py-2 px-2 sm:px-4 whitespace-normal break-normal rounded-tr-lg">
      Project
    </th>
  </tr>
</thead>

  {/* add divide-y for row lines */}
  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
    {timeline.map(({ year, skill, projects }) => (
      // add hover:bg… + transition for smooth effect
      <tr
        key={year}
        className="hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
      >
        <td className="text-center align-middle py-2 dark:text-gray-200">{year}</td>
        <td className="py-2 dark:text-gray-200">{skill}</td>
        <td className="py-2 dark:text-gray-200">
          {projects.map((proj, i) => {
            const slug = slugify(proj.label);
            const content =
              proj.label === 'Yet to be published . . .'
                ? proj.label
                : (
                  <HashLink smooth scroll={scrollWithOffset}
                    to={`/projects#${slug}`}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {proj.label}
                  </HashLink>
                );

            return (
              <span key={i}>
                {content}
                {i < projects.length - 1 && ', '}
              </span>
            );
          })}
        </td>
      </tr>
    ))}
  </tbody>

  <tfoot>
    <tr className="bg-gray-200 dark:bg-gray-700">
      <td className="w-[70px] h-[6px] p-0 rounded-bl-lg"></td>
      <td className="w-[30%] h-[6px] p-0"></td>
      <td className="w-[60%] h-[6px] p-0 rounded-br-lg"></td>
    </tr>
  </tfoot>
</table>

      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────── */
export default function About() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.fade-in');

    const revealOnScroll = () => {
      for (const el of reveals) {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 50;

        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('opacity-100', 'translate-y-1');
          el.classList.remove('opacity-0', 'translate-y-8');
        }
      }
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <>
      <div
        id="top"
        className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-20 transition-colors duration-300"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden transform transition duration-500 fade-in opacity-0 translate-y-8">
            <div className="p-10 pb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight border-b-2 border-blue-500 pb-1">
                About Me
              </h1>

              <div className="prose max-w-none dark:prose-invert mt-2">
                {/* ————————— ORIGINAL CONTENT ————————— */}
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-1 indent-12 text-justify fade-in opacity-0 translate-y-8 transition duration-700">
                  I am a researcher and engineer working at the intersection of manufacturing and machine learning. Over time, my intellectual journey has shifted from mastering established frameworks to engaging with the uncertainty that lies beyond them. Curiosity now serves less as a tool for acquiring knowledge and more as a compass for navigating questions whose answers are not yet fully formed. It shapes how I approach problems, build systems, and contribute to the evolving landscape of intelligent manufacturing.
                </p>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-1 indent-12 text-justify fade-in opacity-0 translate-y-8 transition duration-700">
                  Technical progress, however, is only part of the pursuit. Equally important is the continual refinement of the person behind the work. Periods of doubt or intellectual fatigue often call for reflection — a pause to reconnect with a sense of purpose beyond immediate outcomes. In that space, grounded by faith and introspection, I regain the clarity to continue the work with patience, discipline, and perspective.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-3 border-l-4 border-blue-500 pl-4 fade-in opacity-0 translate-y-8 transition duration-700">
                  Research Interests
                </h2>
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-6 fade-in opacity-0 translate-y-8 transition duration-700">
                  <ul className="list-disc pl-12">
                    <li>Resilience in manufacturing</li>
                    <li>Intelligent manufacturing systems</li>
                    <li>Knowledge curation in manufacturing</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-3 border-l-4 border-blue-500 pl-4 fade-in opacity-0 translate-y-8 transition duration-700">
                  From Ideas to Innovation: My story
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-3 indent-12 text-justify fade-in opacity-0 translate-y-8 transition duration-700">
                 My journey began with a strong focus on mastering established knowledge, but over time it gradually expanded toward exploration. I came to appreciate that learning does not end with understanding what is already known; it also involves engaging with questions that are still unfolding. This shift — from structured learning toward a more exploratory approach — has influenced how I think about research, how I approach problems, and how I continue to grow as a researcher.
                </p>

                {/* ———— TIMELINE TABLE (now data‑driven) ———— */}
                <LearningTimeline />

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-3 border-l-4 border-blue-500 pl-4 fade-in opacity-0 translate-y-8 transition duration-700">
                  Exploring Life
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-1 indent-12 text-justify fade-in opacity-0 translate-y-8 transition duration-700">
                  Outside my technical work, I am drawn to spirituality and the broader questions surrounding purpose and meaning. I volunteer in youth-oriented initiatives and seminars, contributing to areas such as planning, logistics, creative design, and outreach. These experiences offer a meaningful opportunity to engage with communities and contribute beyond the academic and technical sphere.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 indent-12 text-justify fade-in opacity-0 translate-y-8 transition duration-700">
                  In quieter moments, I enjoy films, occasional reading — particularly youth literature and spiritual writing — and have recently begun exploring sports. I find that curiosity beyond the lab often brings balance and perspective to the work within it.
                </p>

                <div className="mt-8 mb-4 p-6 bg-blue-100 dark:bg-blue-900/40 rounded-xl shadow-inner fade-in opacity-0 translate-y-8 transition duration-700">
                  <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                    Core Values
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                    <li className="text-blue-900 dark:text-blue-100 text-lg">
                        🎯&nbsp;&nbsp; Purpose-driven mindset
                      </li>
                      <li className="text-blue-900 dark:text-blue-100 text-lg">
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            padding: '0.2em',
                            transform: 'scale(0.8)',
                            transformOrigin: 'center center',
                            fontSize: '1.2em',
                          }}
                          >
                          🛡️
                        </span>&nbsp;&nbsp; Integrity & humility
                      </li>
                      <li className="text-blue-900 dark:text-blue-100 text-lg flex items-center">

                        <svg className="w-8 h-8 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path fill="#3E96ED" d="M449 199C439 208 429 216 419 225 403 239 387 253 371 268 364 274 357 281 349 287 334 301 319 315 302 328 287 339 264 337 250 323 231 305 214 287 196 269 195 268 193 267 192 266 182 274 172 283 162 291 150 302 138 313 124 324 116 330 108 337 100 344 88 355 75 366 62 376 60 378 59 380 56 382 49 386 36 387 29 380 21 372 19 362 25 353 29 347 35 342 40 337 46 332 52 327 58 322 69 313 80 304 91 294 99 288 106 281 114 274 125 265 136 256 147 246 154 241 160 235 167 229 184 217 209 220 223 235 241 253 258 270 276 288 279 290 280 290 283 288 297 275 312 262 326 249 333 243 340 237 347 230 361 218 375 206 389 193 397 187 404 180 412 172 424 172 434 172 445 172 448 172 449 176 449 184 449 191 449 199Z"/>
                          <path fill="#004FAC" d="M449 199C449 191 449 184 449 176 449 173 448 172 445 172 434 172 424 172 412 172 396 172 380 172 363 172 351 172 342 163 342 151 342 140 351 129 363 129 397 129 431 129 466 129 471 129 475 130 479 130 483 131 487 136 490 140 490 145 491 149 492 154 492 182 492 210 492 239 492 248 483 258 467 257 457 256 449 248 449 237 449 225 449 212 449 199Z"/>
                          <path fill="#368FE7" d="M492 153C491 149 491 145 490 140 491 144 491 149 492 153ZM479 130C475 130 471 129 466 129 470 129 474 129 479 130ZM488 137C486 136 485 134 483 132 485 133 486 135 488 137ZM490 140C489 139 489 138 488 137 489 138 489 139 490 140ZM480 131C480 131 480 131 479 130 480 130 480 130 480 131ZM483 132C482 132 482 132 481 131 482 131 482 131 483 132Z"/>
                        </svg> 
                        &nbsp;&nbsp;&nbsp; Excellence & continuous improvement
                      </li>
                      <li className="text-blue-900 dark:text-blue-100 text-lg">
                        🤝&nbsp;&nbsp; Contribution & collaboration
                      </li>


                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back button + ScrollTop (unchanged) */}
      <div className="bg-gray-50 dark:bg-dark-bg py-8 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <HashLink smooth scroll={scrollWithOffset}
            to="/#about_preview"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition duration-300"
          >
            <ArrowLeft className="w-4 h-8 mr-2" />
            Back to Home
          </HashLink>
        </div>
      </div>
      {/* <ScrollToTop /> */}
    </>
  );
}

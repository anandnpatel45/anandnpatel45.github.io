import { Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const categories = [
  { source: 'Ways I contribute', title: 'Ways I contribute', palette: 'border-t-violet-700 from-violet-50 dark:from-violet-950 text-violet-800 dark:text-violet-200', highlight: 'bg-violet-700', examples: ['Purpose-driven mindset', 'Flexibility', 'Quick learning'] },
  { source: 'Technologies', title: 'Engineering Software', iconPath: 'M4 7h16v13H4z M8 7V4h8v3 M4 12h16 M10 12v3h4v-3', palette: 'border-t-sky-700 from-sky-50 dark:from-sky-950 text-sky-800 dark:text-sky-200', highlight: 'bg-sky-700', examples: ['COMSOL Multiphysics', 'Autodesk Fusion 360', 'LabVIEW'] },
  { source: 'Smart Companions', title: 'Smart Companions', iconPath: 'M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z', palette: 'border-t-fuchsia-700 from-fuchsia-50 dark:from-fuchsia-950 text-fuchsia-800 dark:text-fuchsia-200', highlight: 'bg-fuchsia-700', examples: ['ChatGPT', 'NotebookLM', 'Claude'] },
  { source: 'Language of Logic', title: 'Programming', iconPath: 'M8 6l-6 6 6 6 M16 6l6 6-6 6 M14 4l-4 16', palette: 'border-t-indigo-700 from-indigo-50 dark:from-indigo-950 text-indigo-800 dark:text-indigo-200' },
  { source: 'Rythms of Work', title: 'Research & Productivity Tools', iconPath: 'M4 5h16v14H4z M8 9h8 M8 13h8 M8 16h4', palette: 'border-t-amber-700 from-amber-50 dark:from-amber-950 text-amber-800 dark:text-amber-200' },
  { source: 'Languages', title: 'Languages', iconPath: 'M3 5h12 M9 3v2 M6 5c0 5 3 8 7 10 M13 5c-1 5-4 8-9 10 M14 21l4-9 4 9 M16 18h4', palette: 'border-t-rose-700 from-rose-50 dark:from-rose-950 text-rose-800 dark:text-rose-200' },
]

export default function SkillCards({ preview = false }: { preview?: boolean }) {
  const [skills, setSkills] = useState<Record<string, { name: string }[]>>({})

  useEffect(() => {
    if (preview) return
    fetch('/Media/Skills.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load skills')
        return response.json()
      })
      .then(setSkills)
      .catch(console.error)
  }, [preview])

  const Heading = preview ? 'h3' : 'h2'
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map(({ source, title, iconPath, palette, highlight, examples }) => {
        const items = preview ? examples : skills[source]?.map(({ name }) => name)
        if (!items?.length) return null

        return (
          <section key={title} className={`rounded-2xl border border-gray-200 border-t-[3px] bg-gradient-to-br to-white p-5 shadow-sm dark:border-x-gray-700 dark:border-b-gray-700 dark:to-dark-card ${palette}`}>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/80 ring-1 ring-current/10 dark:bg-gray-800">
                {iconPath ? (
                  <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={iconPath} />
                  </svg>
                ) : <Users size={21} aria-hidden="true" />}
              </span>
              <Heading className="font-semibold text-gray-900 dark:text-white">{title}</Heading>
            </div>
            <ul className="flex flex-wrap gap-2">
              {items.map((name, index) => (
                <li key={name} className={`rounded-md px-2.5 py-1 text-sm ${preview && index === 0
                  ? `${highlight} font-semibold text-white`
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'}`}>
                  {name}
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

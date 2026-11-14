// src/components/Navbar.tsx
import { useRef, useState } from 'react'
import { Home, User, GraduationCap, FolderGit2, BookText, Code, Mail, Sun, Moon, FileText, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menuLink = 'inline-flex items-center whitespace-nowrap px-3 py-3 text-sm font-medium focus-visible:outline-blue-500 lg:border-b-2 lg:px-1 lg:pt-1 lg:pb-0'
  const inactiveLink = 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hover:border-gray-300 lg:hover:bg-transparent'

  const navItems = [
    { path: '/',           label: 'Home',         icon: Home },
    { path: '/about',      label: 'About Me',     icon: User },
    { path: '/education',  label: 'Education',    icon: GraduationCap },
    { path: '/projects',   label: 'Projects',     icon: FolderGit2 },
    { path: '/publications', label: 'Publications', icon: BookText },
    { path: '/skills',     label: 'Skills',       icon: Code },
  ]

  const handleContactClick = () => {
    setMenuOpen(false)
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      // Scroll so the bottom of #contact hits the bottom of the viewport
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else {
      // Fallback: scroll to absolute bottom of the page
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav aria-label="Main navigation" onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen && menuButton.current?.getClientRects().length) {
        setMenuOpen(false)
        menuButton.current.focus()
      }
    }} className="bg-white dark:bg-dark-card shadow-md fixed w-full top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <button
            type="button"
            ref={menuButton}
            aria-expanded={menuOpen}
            aria-controls="portfolio-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center gap-2 self-center rounded-lg p-2 text-gray-700 dark:text-gray-200 focus-visible:outline-blue-500 lg:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            Menu
          </button>
          <div id="portfolio-navigation" className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto bg-white px-4 py-2 shadow-md dark:bg-dark-card lg:static lg:flex lg:max-h-none lg:flex-row lg:gap-4 lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none dark:lg:bg-transparent`}>
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                aria-current={location.pathname === path ? 'page' : undefined}
                className={`${menuLink} ${
                  location.pathname === path
                    ? 'border-blue-500 text-gray-900 dark:text-white'
                    : inactiveLink
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            ))}

            {/* CV Download stays a normal link */}
            <a
              href="/Media/Anandkumar_CV_latest.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${menuLink} ${inactiveLink}`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Download my CV
            </a>

            {/* Contact Me button: scrolls in-place to bottom */}
            <button
              type="button"
              onClick={handleContactClick}
              className={`${menuLink} ${inactiveLink}`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </button>
          </div>

          <button
            type="button"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  )
}

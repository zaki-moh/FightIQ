import React from 'react'
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'

const Socials = () => {
  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <span className="text-xs font-medium tracking-wide text-white/50">
        Follow
      </span>

      <ul className="flex gap-3 text-lg md:text-xl">
        <li>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/60 hover:text-pink-400 transition-colors"
          >
            <FaInstagram />
          </a>
        </li>

        <li>
          <a
            href="https://github.com/zaki-moh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/60 hover:text-gray-300 transition-colors"
          >
            <FaGithub />
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/zakaria-mohamed-61a89a1b3/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/60 hover:text-blue-400 transition-colors"
          >
            <FaLinkedin />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Socials

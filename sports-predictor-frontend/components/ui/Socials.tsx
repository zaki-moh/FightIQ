import React from 'react'
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex flex-col">
      <div className="font-bold mb-2 tracking-wide text-sm">Follow Us</div>

      <ul className="flex gap-4 text-xl">
        <li>
          <a href="https://www.instagram.com/" target="_blank">
            <FaInstagram className="hover:text-pink-400 transition" />
          </a>
        </li>

        <li>
          <a href="https://githubgithub.com/zaki-moh" target="_blank">
            <FaGithub className="hover:text-gray-400 transition" />
          </a>
        </li>

        <li>
          <a href="https://www.linkedin.com/in/zakaria-mohamed-61a89a1b3/" target="_blank">
            <FaLinkedin className="hover:text-blue-500 transition" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Socials;

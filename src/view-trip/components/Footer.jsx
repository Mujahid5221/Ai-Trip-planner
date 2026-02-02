import React from 'react'
import { Heart, Code, Mail, Github, Linkedin } from 'lucide-react';

function Footer({trip}) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 mt-12 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col items-center gap-4">
          {/* Made with love */}
          <div className="flex items-center text-sm text-gray-500">
            <span>Made with</span>
            <Heart size={16} className="mx-1.5 text-red-500 fill-current" />
            <span>by Mujahid hussain</span>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-gray-400">
            © {currentYear} TrekTailor. All rights reserved.
          </p>
          
          {/* Social links */}
          <div className="flex items-center gap-4 mt-2">
            <a
              href="mailto:mujahidhussain5252520@gmail.com"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://github.com/Mujahid5221"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="www.linkedin.com/in/mujahid-hussain-b47687274"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
          
          {/* Built with */}
          <div className="flex items-center text-xs text-gray-400 mt-4">
            <Code size={14} className="mr-1.5" />
            <span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
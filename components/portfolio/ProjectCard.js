import React from 'react';
import { Github } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="group relative h-full">
      <div className="relative bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 hover:border-[#88C5CC]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#5EEAFF]/10 shadow-xl h-full flex flex-col">
        {project.image && (
          <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center h-56">
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-full object-contain p-2"
            />
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-semibold text-white">{project.name}</h3>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-[#88C5CC]/20 transition-colors duration-300 border border-white/10"
          >
            <Github className="w-5 h-5 text-[#88C5CC]" />
          </a>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-[#0A3D4C]/50 text-[#88C5CC] border border-[#88C5CC]/20"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <ul className="space-y-2 mb-4 flex-1">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="text-sm text-white/70 leading-relaxed flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#88C5CC] mt-2 flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
        
        {project.stats && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            {project.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-lg md:text-xl font-bold text-[#88C5CC]">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
import React from 'react'
import { GraduationCap, MapPin, BookOpen, Award } from 'lucide-react'
import { sound } from '../utils/soundEngine'

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#00f0ff] uppercase tracking-wider">
            <span>[03] // DOSSIER & PROFILE</span>
          </div>
          <h2 className="font-['Syne'] font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            ABOUT DHRUV <span className="text-zinc-600">// 16 Y/O</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-zinc-400 max-w-md">
          Combining student hunger with commercial-grade digital execution from Yamuna Vihar to global standards.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-[#09090f] p-6 sm:p-8 space-y-6">
            {/* Identity Badge */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00f0ff] to-purple-600 p-[2px]">
                <div className="w-full h-full bg-[#09090f] rounded-2xl flex items-center justify-center">
                  <span className="font-['Syne'] font-black text-2xl text-white">D</span>
                </div>
              </div>
              <div>
                <h3 className="font-['Syne'] font-bold text-2xl text-white">Dhruv</h3>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#00f0ff]">
                  <span>Age: 16 Years</span>
                  <span>•</span>
                  <span>Digital Marketer</span>
                </div>
              </div>
            </div>

            {/* Quick Details Table */}
            <div className="space-y-3 font-mono text-xs border-t border-b border-zinc-800 py-4 text-zinc-300">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 flex items-center space-x-1.5">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span>Course</span>
                </span>
                <span className="text-white font-medium">Digital Marketing Program</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-[#00f0ff]" />
                  <span>Academy</span>
                </span>
                <span className="text-white font-semibold">IICS Yamuna Vihar</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Location</span>
                </span>
                <span className="text-zinc-300">Yamuna Vihar, Delhi, India</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span>Key Project</span>
                </span>
                <span className="text-emerald-400 font-semibold">paradisepublicschool.com</span>
              </div>
            </div>

            {/* Ethos Quote */}
            <blockquote className="text-xs text-zinc-400 italic leading-relaxed border-l-2 border-[#00f0ff] pl-3 py-1 font-sans">
              "At 16, I refuse to be just another kid learning theory. I believe in launching real campaigns, writing real code, and bringing verifiable business growth to clients."
            </blockquote>

            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => sound.playChirp()}
                className="w-full block py-3 rounded-xl bg-zinc-800 hover:bg-[#00f0ff] hover:text-black text-white font-mono text-xs font-bold text-center transition-all cursor-pointer"
              >
                LET'S COLLABORATE →
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Philosophy & Curriculum */}
        <div className="lg:col-span-7 space-y-6 font-sans">
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#09090f] space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider">
                THE STORY & INSPIRATION
              </span>
              <h3 className="font-['Syne'] font-bold text-2xl sm:text-3xl text-white">
                Why Combine Cinematic WebGL Experiences with High-Intent Marketing?
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Most agencies produce generic cookie-cutter WordPress websites with bland templates that fail to capture the modern consumer's attention. Rejecting low-effort commodity design, I engineer bespoke digital experiences that fuse pitch-black cinematic atmospheres, real-time 3D WebGL interactions, and algorithmic digital marketing funnels.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Currently studying <strong className="text-purple-300">Digital Marketing at IICS Yamuna Vihar</strong>, I master the science of customer acquisition: Search Engine Optimization (SEO), Meta & Google Paid Ads, Conversion Rate Optimization (CRO), and full-funnel analytics. When applied to real institutions like <strong className="text-white">Paradise Public School</strong>, this hybrid skill set transforms standard digital presence into exponential growth.
              </p>
            </div>

            {/* Skills Matrix Breakdown */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                COMPETENCY MATRIX // 2026 BENCHMARK
              </span>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-300">Local & Technical SEO (Google 3-Pack, Schema)</span>
                    <span className="text-[#00f0ff]">95%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[95%] h-full bg-[#00f0ff]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-300">Meta Ads Manager (CBO, Retargeting, Lookalikes)</span>
                    <span className="text-purple-400">90%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[90%] h-full bg-purple-400" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-300">Google Ads (Search & Performance Max)</span>
                    <span className="text-emerald-400">88%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[88%] h-full bg-emerald-400" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-300">Creative Tech (React, Three.js, Tailwind, WebGL)</span>
                    <span className="text-yellow-400">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Institute Focus Callout */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start space-x-3 text-xs">
              <GraduationCap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-white font-bold block font-mono">
                  IICS (Indian Institute of Computer Science) — Yamuna Vihar
                </span>
                <span className="text-zinc-400 font-sans leading-relaxed block">
                  Engaged in practical, lab-based case studies covering consumer search psychology, ad budget allocation, programmatic landing pages, and multi-channel marketing campaigns.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

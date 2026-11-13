import React, { useState } from 'react'
import { X, ExternalLink, Award, TrendingUp, Cpu, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react'
import { sound } from '../utils/soundEngine'

interface ParadiseCaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ParadiseCaseStudyModal: React.FC<ParadiseCaseStudyModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'marketing' | 'tech' | 'results'>('overview')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#09090f] border border-[#00f0ff]/30 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.15)] flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#0d0d16] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1">
              <img src="/paradise-logo.svg" alt="Paradise Logo" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-['Syne'] font-bold text-white text-base">PARADISE PUBLIC SCHOOL</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  VERIFIED WORK
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-400">
                <a
                  href="https://paradisepublicschool.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#00f0ff] transition-colors inline-flex items-center space-x-1"
                >
                  <span>paradisepublicschool.com</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://paradisepublicschool.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playChirp()}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-all"
            >
              <span>Visit Live Domain</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                sound.hoverBeep()
                onClose()
              }}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 bg-[#08080c] px-6 text-xs font-mono overflow-x-auto">
          {[
            { id: 'overview', label: '01 // OVERVIEW & SCOPE' },
            { id: 'marketing', label: '02 // DIGITAL MARKETING & SEO' },
            { id: 'tech', label: '03 // ARCHITECTURE & ERP' },
            { id: 'results', label: '04 // KEY METRICS & ROAS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.hoverBeep()
                setActiveTab(tab.id as typeof activeTab)
              }}
              className={`py-3 px-4 font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/5'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Hero Banner Preview */}
              <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 space-y-3">
                  <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#00f0ff]">
                    <span>ESTD. 1994</span>
                    <span>•</span>
                    <span>CBSE AFFILIATED #2130842</span>
                  </div>
                  <h3 className="text-2xl font-['Syne'] font-bold text-white tracking-tight">
                    Comprehensive Digital Transformation & Admissions Growth Engine
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Spearheaded by <strong className="text-white">Dhruv (Age 16)</strong>, applying advanced digital marketing methodologies from <strong className="text-purple-300">IICS Yamuna Vihar</strong>. Overhauled the institutional online presence into a high-converting digital portal and multi-platform mobile school ERP.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 bg-zinc-800/80 rounded text-[11px] font-mono text-zinc-300">
                      Role: Lead Digital Strategist & Developer
                    </span>
                    <span className="px-2.5 py-1 bg-[#00f0ff]/10 text-[#00f0ff] rounded text-[11px] font-mono">
                      Target: CBSE K-12 Admissions
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 rounded-lg overflow-hidden border border-zinc-800 relative group">
                  <img
                    src="/paradise-hero.png"
                    alt="Paradise Public School Preview"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Production Live Ecosystem</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Core Objectives */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 space-y-2">
                  <TrendingUp className="w-5 h-5 text-[#00f0ff]" />
                  <div className="text-white font-bold">1. Admissions Funnel</div>
                  <div className="text-zinc-400 font-sans text-xs">
                    Automated lead qualification funnel to capture and convert student inquiries via targeted digital marketing channels.
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 space-y-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <div className="text-white font-bold">2. Digital Platform</div>
                  <div className="text-zinc-400 font-sans text-xs">
                    React 19 web portal + React Native Expo mobile apps for parents, students, teachers, and school administration.
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 space-y-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <div className="text-white font-bold">3. Local SEO Domination</div>
                  <div className="text-zinc-400 font-sans text-xs">
                    Ranked #1 for localized search terms, generating consistent organic inquiries throughout the academic admission cycle.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'marketing' && (
            <div className="space-y-5">
              <div className="border-l-2 border-[#00f0ff] pl-4 py-1">
                <h4 className="font-['Syne'] text-lg font-bold text-white">
                  Strategic Digital Marketing Playbook
                </h4>
                <p className="text-xs text-zinc-400 font-mono">
                  Applied from IICS Yamuna Vihar Digital Marketing Specialization
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0d14] space-y-3">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-white">
                    <span className="w-2 h-2 bg-[#00f0ff] rounded-full" />
                    <span>Technical & Local SEO Domination</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Schema markup (`EducationalOrganization`, `School`, `OpeningHoursSpecification`) for rich search snippets.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Optimized Google Business Profile (GBP) with weekly updates, photos, and high-frequency parent reviews.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Targeted keyword mapping for high-intent queries: "Best CBSE School", "Nursery to 12th admission form", etc.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0d14] space-y-3">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-white">
                    <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>Meta & Performance Ads Campaigns</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Geo-fenced Instagram and Facebook ad campaigns targeting parents aged 26-48 within a 15km perimeter.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>A/B tested creative hooks: Virtual Campus Tour vs. Academic Excellence Highlights vs. Fee Transparency.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>Meta Instant Lead Forms linked via Webhook to automatic WhatsApp admission follow-up sequence.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0d14] space-y-3">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-white">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span>Conversion Rate Optimization (CRO)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Frictionless 3-step digital admission form eliminating redundant paper documents.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Interactive Fee Breakdown calculator providing complete transparent fee schedules instantly.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Floating dynamic WhatsApp counselor chat button with pre-filled academic queries.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-zinc-800 bg-[#0c0d14] space-y-3">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-white">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span>Analytics & Telemetry Tracking</span>
                  </div>
                  <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span>Google Tag Manager & GA4 custom conversion events for form starts, prospectus downloads, and calls.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span>UTM parameter governance across all campaign creatives for granular ROAS calculation.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                      <span>Meta Conversions API (CAPI) server-side tracking to prevent iOS privacy drop-offs.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="border-l-2 border-purple-500 pl-4 py-1">
                <h4 className="font-['Syne'] text-lg font-bold text-white font-sans">
                  Institutional Architecture & Cross-Platform ERP
                </h4>
                <p className="text-xs text-zinc-400">
                  Full-stack engineering supporting 1,500+ students and faculty
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3">
                <div className="text-white font-bold text-sm">System Topology:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-zinc-300">
                  <div className="p-3 bg-black/40 rounded border border-zinc-800">
                    <span className="text-[#00f0ff] font-bold block mb-1">CLIENT ECOSYSTEM</span>
                    • Web: React 19, TypeScript, Vite, Tailwind<br />
                    • Mobile: Expo SDK 57 (iOS & Android native apps)<br />
                    • Core Web Vitals: 99 Performance, 100 SEO
                  </div>
                  <div className="p-3 bg-black/40 rounded border border-zinc-800">
                    <span className="text-purple-400 font-bold block mb-1">BACKEND & DATABASE</span>
                    • Server: Node.js Express API with JWT auth<br />
                    • ORM: Prisma with Normalized PostgreSQL<br />
                    • Multi-Role RBAC: Admin, Accountant, Faculty, Parent, Student
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-[#090a12] space-y-2">
                <div className="text-white font-bold">Key Enterprise Capabilities:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-zinc-400">
                  <div className="p-2 border border-zinc-800 rounded">✓ Fee Collection Ledger</div>
                  <div className="p-2 border border-zinc-800 rounded">✓ Exam Marksheets</div>
                  <div className="p-2 border border-zinc-800 rounded">✓ Live Attendance Register</div>
                  <div className="p-2 border border-zinc-800 rounded">✓ Timetable Scheduler</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                <div className="p-4 rounded-xl border border-[#00f0ff]/30 bg-[#00f0ff]/5 space-y-1">
                  <div className="text-3xl font-['Syne'] font-black text-[#00f0ff]">+340%</div>
                  <div className="text-xs text-zinc-300 font-semibold">Admissions Inquiries</div>
                  <div className="text-[10px] text-zinc-500">Year-over-Year surge</div>
                </div>
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1">
                  <div className="text-3xl font-['Syne'] font-black text-emerald-400">-58%</div>
                  <div className="text-xs text-zinc-300 font-semibold">CPA Reduction</div>
                  <div className="text-[10px] text-zinc-500">Cost-per-enquiry optimized</div>
                </div>
                <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-1">
                  <div className="text-3xl font-['Syne'] font-black text-purple-400">#1</div>
                  <div className="text-xs text-zinc-300 font-semibold">Google Local Pack</div>
                  <div className="text-[10px] text-zinc-500">Target regional radius</div>
                </div>
                <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 space-y-1">
                  <div className="text-3xl font-['Syne'] font-black text-yellow-400">0.4s</div>
                  <div className="text-xs text-zinc-300 font-semibold">Page Load Speed</div>
                  <div className="text-[10px] text-zinc-500">100/100 Core Web Vitals</div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-300 space-y-3">
                <div className="flex items-center space-x-2 text-white font-semibold">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>The Dhruv Impact: Bridging Marketing & Code</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  "Most digital marketers only deal with ad manager dashboards, and most programmers only write code without understanding cost-per-lead or user acquisition funnels. Building and marketing paradisepublicschool.com at age 16 allowed me to prove that combining deep technical SEO, performant modern web architecture, and aggressive Meta/Google Ad strategies delivers exponential institutional growth."
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono text-zinc-500 border-t border-zinc-800">
                  <span>Dhruv • Digital Marketing Student @ IICS Yamuna Vihar</span>
                  <a
                    href="https://paradisepublicschool.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00f0ff] hover:underline flex items-center space-x-1"
                  >
                    <span>Inspect Live Site</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#0d0d16] border-t border-zinc-800 flex items-center justify-between font-mono text-xs">
          <span className="text-zinc-500">
            PRODUCED BY DHRUV (AGE 16) // IICS YAMUNA VIHAR
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                sound.hoverBeep()
                onClose()
              }}
              className="px-4 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href="https://paradisepublicschool.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playChirp()}
              className="px-4 py-1.5 rounded-lg bg-[#00f0ff] text-black font-semibold hover:bg-white transition-colors flex items-center space-x-1.5"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

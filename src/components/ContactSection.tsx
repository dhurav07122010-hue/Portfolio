import React, { useState } from 'react'
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react'
import { sound } from '../utils/soundEngine'

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'digital-marketing',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    sound.playChirp()
    setFormSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#00f0ff] uppercase tracking-wider">
            <span>[04] // COMMENCE TRANSMISSION</span>
          </div>
          <h2 className="font-['Syne'] font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            INITIATE <span className="text-[#00f0ff]">PROJECT</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-zinc-400 max-w-md">
          Available for digital marketing campaigns, institutional SEO overhauls, and next-gen web platforms.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#09090f] space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-500 uppercase">DIRECT COORDINATES</span>
              <h3 className="font-['Syne'] font-bold text-2xl text-white">Let’s Build Impact</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Whether you need a school admissions surge like <strong className="text-white">Paradise Public School</strong>, high-converting Meta and Google ads, or an immersive WebGL website, send a message directly.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs text-zinc-300">
              <a
                href="mailto:dhruv@paradisepublicschool.com"
                onMouseEnter={() => sound.hoverBeep()}
                className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-[#00f0ff] flex items-center space-x-3 transition-colors group block"
              >
                <Mail className="w-4 h-4 text-[#00f0ff] group-hover:scale-110 transition-transform" />
                <div className="truncate">
                  <div className="text-[10px] text-zinc-500">ELECTRONIC MAIL</div>
                  <div className="text-white group-hover:text-[#00f0ff] transition-colors">
                    dhruv.marketing.pro@gmail.com
                  </div>
                </div>
              </a>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-zinc-500">BASE LOCATION</div>
                  <div className="text-white">Yamuna Vihar, Delhi 110053, India</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center space-x-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-[10px] text-zinc-500">TRAINING GROUND</div>
                  <div className="text-purple-300">IICS Yamuna Vihar (Digital Marketing)</div>
                </div>
              </div>
            </div>

            {/* Live Client Reference Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>FLAGSHIP REFERENCE</span>
                <span>VERIFIED</span>
              </div>
              <div className="font-semibold text-white text-sm">Paradise Public School</div>
              <p className="text-[11px] text-zinc-400 font-sans">
                Explore the production portal and mobile ecosystem live at{' '}
                <a
                  href="https://paradisepublicschool.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#00f0ff] hover:underline"
                >
                  paradisepublicschool.com
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: High-Tech Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#09090f] shadow-2xl relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 rounded-full blur-2xl pointer-events-none" />

            {formSubmitted ? (
              <div className="py-16 text-center space-y-4 font-mono animate-[fadeIn_0.3s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-['Syne'] font-bold text-2xl text-white">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto font-sans leading-relaxed">
                  Thank you for reaching out, <strong className="text-white">{formData.name}</strong>. Dhruv will analyze your inquiry and reply via <span className="text-[#00f0ff]">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    sound.hoverBeep()
                    setFormSubmitted(false)
                    setFormData({ name: '', email: '', projectType: 'digital-marketing', message: '' })
                  }}
                  className="px-5 py-2.5 rounded-lg border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white hover:border-[#00f0ff] transition-colors cursor-pointer"
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                <div className="flex items-center space-x-2 text-zinc-400 pb-2 border-b border-zinc-800">
                  <MessageSquare className="w-4 h-4 text-[#00f0ff]" />
                  <span className="text-white font-bold">PROJECT INQUIRY FORM</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-zinc-400 block text-[11px]">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] font-sans text-sm transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 block text-[11px]">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] font-sans text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 block text-[11px]">PRIMARY OBJECTIVE</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white focus:outline-none focus:border-[#00f0ff] font-sans text-sm transition-colors"
                  >
                    <option value="digital-marketing">Digital Marketing & Meta/Google Ads Funnel</option>
                    <option value="local-seo">Local SEO Domination & Google 3-Pack</option>
                    <option value="school-erp">School/Institutional Web Platform & ERP</option>
                    <option value="webgl-website">Cinematic 3D WebGL Interactive Website</option>
                    <option value="consultation">Marketing Consultation / Audit</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 block text-[11px]">PROJECT BRIEF OR INQUIRY</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell Dhruv about your goals, timeline, or current challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] font-sans text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => sound.hoverBeep()}
                  className="w-full py-3.5 rounded-xl bg-[#00f0ff] text-black font-bold font-mono tracking-wider hover:bg-white hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>SEND TRANSMISSION</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-12 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
        <div className="flex items-center space-x-2">
          <span className="font-['Syne'] font-bold text-white text-sm">DHURAV</span>
          <span>© 2026 // ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center space-x-4 text-[11px]">
          <span>AGE: 16</span>
          <span>•</span>
          <span>IICS YAMUNA VIHAR</span>
          <span>•</span>
          <a
            href="https://paradisepublicschool.com"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-[#00f0ff] transition-colors"
          >
            PARADISEPUBLICSHOOL.COM
          </a>
        </div>

        <div className="text-[10px] text-zinc-600">
          ENGINEERED & CRAFTED BY DHURAV
        </div>
      </footer>
    </section>
  )
}

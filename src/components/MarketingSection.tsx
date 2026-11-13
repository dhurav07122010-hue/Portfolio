import React from 'react'
import { Target, BarChart3, Search, Zap } from 'lucide-react'
import { TiltCard } from './TiltCard'
import { ScrambleText } from './ScrambleText'

export const MarketingSection: React.FC = () => {
  return (
    <section id="marketing" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 space-y-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 font-mono text-xs text-purple-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>[02] // STRATEGIC METHODOLOGY</span>
          </div>
          <h2 className="font-['Syne'] font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            <ScrambleText text="DIGITAL MARKETING" /> <span className="text-[#00f0ff]">&</span> GROWTH
          </h2>
        </div>
        <div className="font-mono text-xs text-zinc-400 max-w-md">
          Curriculum & practical applications developed while pursuing the Digital Marketing Course at{' '}
          <strong className="text-white">IICS Yamuna Vihar</strong>.
        </div>
      </div>

      {/* 4 Pillars Grid with 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pillar 1 */}
        <TiltCard
          intensity={14}
          className="p-6 rounded-2xl border border-zinc-800/80 bg-[#09090f] space-y-4 hover:border-[#00f0ff]/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-['Syne'] font-bold text-xl text-white group-hover:text-[#00f0ff] transition-colors">
            Meta & Google Ads
          </h3>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Data-driven paid customer acquisition across Meta Ads Manager and Google Ads. Campaign Budget Optimization (CBO), creative fatigue mitigation, dynamic ads, and high-converting retargeting loops.
          </p>
          <div className="pt-2 font-mono text-[11px] text-zinc-500 space-y-1 border-t border-zinc-800/60">
            <div>• ROAS Scaling Strategy</div>
            <div>• Lookalike & Custom Audiences</div>
            <div>• Server-Side CAPI Implementation</div>
          </div>
        </TiltCard>

        {/* Pillar 2 */}
        <TiltCard
          intensity={14}
          className="p-6 rounded-2xl border border-zinc-800/80 bg-[#09090f] space-y-4 hover:border-purple-500/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="font-['Syne'] font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
            Technical & Local SEO
          </h3>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Rank #1 on Google without burning money on paid ads. Specialized in Local 3-Pack Google Maps rankings, structured schema markup, page speed optimization, and search intent keyword clusters.
          </p>
          <div className="pt-2 font-mono text-[11px] text-zinc-500 space-y-1 border-t border-zinc-800/60">
            <div>• Google Business Profile Mastery</div>
            <div>• Core Web Vitals (Sub-500ms)</div>
            <div>• Entity-First Content Architecture</div>
          </div>
        </TiltCard>

        {/* Pillar 3 */}
        <TiltCard
          intensity={14}
          className="p-6 rounded-2xl border border-zinc-800/80 bg-[#09090f] space-y-4 hover:border-emerald-500/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-['Syne'] font-bold text-xl text-white group-hover:text-emerald-300 transition-colors">
            Conversion Rate (CRO)
          </h3>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Traffic is meaningless if it doesn't convert. Blending cinematic UI with psychological triggers, friction-free forms, instant WhatsApp lead routing, and behavioral A/B testing.
          </p>
          <div className="pt-2 font-mono text-[11px] text-zinc-500 space-y-1 border-t border-zinc-800/60">
            <div>• 3-Step Frictionless Lead Forms</div>
            <div>• WhatsApp Direct API Routing</div>
            <div>• Heatmap & Scroll Analytics</div>
          </div>
        </TiltCard>

        {/* Pillar 4 */}
        <TiltCard
          intensity={14}
          className="p-6 rounded-2xl border border-zinc-800/80 bg-[#09090f] space-y-4 hover:border-yellow-500/50 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-['Syne'] font-bold text-xl text-white group-hover:text-yellow-300 transition-colors">
            GA4 & Attribution
          </h3>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed">
            Deep telemetry tracking. Custom Google Tag Manager triggers, Google Analytics 4 event mapping, multi-touch attribution models, and live client dashboards for crystal-clear ROI measurement.
          </p>
          <div className="pt-2 font-mono text-[11px] text-zinc-500 space-y-1 border-t border-zinc-800/60">
            <div>• GTM Custom DataLayer</div>
            <div>• Cross-Domain Telemetry</div>
            <div>• UTM Parameter Governance</div>
          </div>
        </TiltCard>
      </div>

      {/* Strategic Institutional Marketing Callout */}
      <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#09090f] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
            <span>IICS YAMUNA VIHAR PRACTICAL CURRICULUM</span>
          </div>
          <h4 className="font-['Syne'] font-bold text-xl sm:text-2xl text-white">
            From Search Intent to Admissions & Revenue
          </h4>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed font-sans">
            Every campaign framework is designed with end-to-end attribution: from keyword research and ad creative testing to landing page conversion rate optimization and CRM synchronization.
          </p>
        </div>

        <div className="flex items-center space-x-6 font-mono text-center shrink-0">
          <div className="space-y-0.5">
            <div className="text-2xl font-['Syne'] font-black text-[#00f0ff]">ROAS 4.2x</div>
            <div className="text-[10px] text-zinc-500 uppercase">Paid Target</div>
          </div>
          <div className="w-[1px] h-8 bg-zinc-800" />
          <div className="space-y-0.5">
            <div className="text-2xl font-['Syne'] font-black text-emerald-400">99.8%</div>
            <div className="text-[10px] text-zinc-500 uppercase">CAPI Reliability</div>
          </div>
        </div>
      </div>
    </section>
  )
}

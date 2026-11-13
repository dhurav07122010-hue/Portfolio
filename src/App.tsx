import React, { useState, useEffect } from 'react'
import { ThreeCanvas } from './components/ThreeCanvas'
import { HoverParticleCanvas } from './components/HoverParticleCanvas'
import { CustomCursor } from './components/CustomCursor'
import { PortfolioFrame } from './components/PortfolioFrame'
import { PortfolioMenuOverlay } from './components/PortfolioMenuOverlay'
import { HeroSection } from './components/HeroSection'
import { WorkSection } from './components/WorkSection'
import { InteractiveLabSection } from './components/InteractiveLabSection'
import { MarketingSection } from './components/MarketingSection'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { TerminalModal } from './components/TerminalModal'
import { ParadiseCaseStudyModal } from './components/ParadiseCaseStudyModal'
import { ProjectFrontPageModal } from './components/ProjectFrontPageModal'
import { KineticMarquee } from './components/KineticMarquee'
import { ScrollHUD } from './components/ScrollHUD'
import { VelocityScrollContainer } from './components/VelocityScrollContainer'
import { scrollEngine } from './utils/scrollEngine'

export const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isParadiseModalOpen, setIsParadiseModalOpen] = useState(false)
  const [isFrontPageModalOpen, setIsFrontPageModalOpen] = useState(false)
  const [frontPageProjectId, setFrontPageProjectId] = useState('paradise')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Initialize Lenis Momentum Smooth Scroll Engine
  useEffect(() => {
    scrollEngine.init()
  }, [])

  const handleOpenTerminal = () => {
    setIsTerminalOpen(true)
  }

  const handleCloseTerminal = () => {
    setIsTerminalOpen(false)
  }

  const handleOpenParadiseModal = () => {
    setIsParadiseModalOpen(true)
  }

  const handleCloseParadiseModal = () => {
    setIsParadiseModalOpen(false)
  }

  const handleOpenFrontPageModal = (projectId: string = 'paradise') => {
    setFrontPageProjectId(projectId)
    setIsFrontPageModalOpen(true)
  }

  const handleCloseFrontPageModal = () => {
    setIsFrontPageModalOpen(false)
  }

  const handleOpenMenu = () => {
    setIsMenuOpen(true)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  const handleTerminalSelectProject = (slug: string) => {
    if (slug === 'paradise') {
      setIsTerminalOpen(false)
      setIsParadiseModalOpen(true)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#e4e4e7] overflow-x-hidden selection:bg-[#00f0ff] selection:text-black">
      {/* Cinematic CRT Scanlines and Laser Scanner Beam */}
      <div className="scanlines-overlay pointer-events-none" />
      <div className="laser-beam pointer-events-none" />

      {/* 3D WebGL Canvas Background (Spine Trajectory, Flythrough & Warp) */}
      <ThreeCanvas />

      {/* Interactive Cursor Hover Particle Canvas */}
      <HoverParticleCanvas />

      {/* Trailing Custom Cursor & Shockwave Ripples */}
      <CustomCursor />

      {/* Hybrid Scroll HUD Progress Tracker on Right Rail */}
      <ScrollHUD />

      {/* 4-Corner Frame & Perimeter HUD */}
      <PortfolioFrame
        onOpenMenu={handleOpenMenu}
        onOpenTerminal={handleOpenTerminal}
      />

      {/* Main Content Sections wrapped in Momentum Velocity-Skew Container */}
      <VelocityScrollContainer className="relative z-10 space-y-8">
        <HeroSection
          onOpenParadiseModal={handleOpenParadiseModal}
          onOpenTerminal={handleOpenTerminal}
          onCheckWork={() => handleOpenFrontPageModal('paradise')}
        />

        {/* Endless Kinetic Marquee 1 */}
        <KineticMarquee
          items={[
            'DHURAV // AGE 16',
            'PARADISEPUBLICSHOOL.COM',
            '+340% ADMISSION INQUIRIES',
            'DIGITAL MARKETING SPECIALIST',
            'IICS YAMUNA VIHAR',
            '3D KINETIC SPINE ENGINE',
            'LOCAL 3-PACK SEO',
            'META & GOOGLE PERFORMANCE ADS',
          ]}
        />

        {/* Part 01: Selected Work & Live Front Page Browser */}
        <WorkSection
          onOpenParadiseModal={handleOpenParadiseModal}
          onOpenFrontPageModal={handleOpenFrontPageModal}
        />

        {/* Part 02: Interactive 3D Cyber Lab, Audio Synthesizer & Web Vitals (Different Stuff!) */}
        <InteractiveLabSection />

        {/* Reverse Kinetic Marquee 2 */}
        <KineticMarquee
          reverse={true}
          items={[
            '100/100 CORE WEB VITALS',
            'IICS YAMUNA VIHAR',
            'GROWTH ARCHITECT // DHURAV',
            'PARADISE PUBLIC SCHOOL',
            '3D SPINE VERTICAL TRACK',
            'CONVERSION RATE OPTIMIZATION',
            '0.4S PAGE LOAD LATENCY',
          ]}
        />

        {/* Part 03: Performance Digital Marketing Engine */}
        <MarketingSection />

        {/* Part 04: Profile & Academic Dossier */}
        <AboutSection />

        {/* Part 05: Direct Transmission & Contact */}
        <ContactSection />
      </VelocityScrollContainer>

      {/* Fullscreen Overlay Menu */}
      <PortfolioMenuOverlay
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onOpenParadiseModal={handleOpenParadiseModal}
        onOpenTerminal={handleOpenTerminal}
      />

      {/* Interactive HUD Command Terminal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={handleCloseTerminal}
        onSelectProject={handleTerminalSelectProject}
      />

      {/* Detailed Paradise Public School Case Study Modal */}
      <ParadiseCaseStudyModal
        isOpen={isParadiseModalOpen}
        onClose={handleCloseParadiseModal}
      />

      {/* Interactive Project Front Page Inspection Modal */}
      <ProjectFrontPageModal
        isOpen={isFrontPageModalOpen}
        onClose={handleCloseFrontPageModal}
        initialProjectId={frontPageProjectId}
      />
    </div>
  )
}

export default App

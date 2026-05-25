import StatusBar from '@/components/StatusBar'
import Hero from '@/components/Hero'
import MissionNarrative from '@/components/MissionNarrative'
import MissionCards from '@/components/MissionCards'
import Capabilities from '@/components/Capabilities'
import CompanyTicker from '@/components/CompanyTicker'
import Brief from '@/components/Brief'

export default function Home() {
  return (
    <>
      <StatusBar />

      <main>
        <Hero />
        <MissionNarrative />
        <MissionCards />
        <Capabilities />
        <CompanyTicker />
        <Brief />
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: 'var(--space-5) 2rem',
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        <span>© 2026 Launch Control Labs</span>
        <span>Los Angeles, CA</span>
      </footer>
    </>
  )
}

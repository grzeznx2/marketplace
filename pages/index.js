import { Navbar, Footer } from '@components/common'

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />
        </div>
        <Footer />
      </div>
    </div>
  )
}

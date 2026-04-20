/* === HomePage.jsx - Trang chủ ===
 * Gồm: Hero banner + Giới thiệu + Điểm nổi bật + CTA.
 */
import Hero from '../components/home/Hero'
import Intro from '../components/home/Intro'
import Highlights from '../components/home/Highlights'
import CTA from '../components/home/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Highlights />
      <CTA />
    </>
  )
}

/* === HomePage.jsx - Trang chủ ===
 * Gồm: Hero banner + Giới thiệu + Điểm nổi bật + CTA.
 */
import Hero from '../components/home/Hero'
import Stats from '../components/home/Stats'
import Highlights from '../components/home/Highlights'
import CTA from '../components/home/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Highlights />
      <CTA />
    </>
  )
}

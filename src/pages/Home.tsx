import { getProductsByCategory } from '../data/products'
import HeroCarousel from '../components/home/HeroCarousel'
import BenefitsStrip from '../components/home/BenefitsStrip'
import CategoryGrid from '../components/home/CategoryGrid'
import KitsCarousel from '../components/home/KitsCarousel'
import ProductRail from '../components/home/ProductRail'
import AboutSection from '../components/home/AboutSection'
import BlogPreview from '../components/home/BlogPreview'
import InstagramStrip from '../components/home/InstagramStrip'
import NewsletterSignup from '../components/home/NewsletterSignup'
import CouponPopup from '../components/home/CouponPopup'

export default function Home() {
  const newArrivals = getProductsByCategory('lancamentos')
  const bestSellers = getProductsByCategory('mais-vendidos')

  return (
    <>
      <HeroCarousel />
      <BenefitsStrip />
      <CategoryGrid />
      <KitsCarousel />
      <ProductRail eyebrow="Novidades" title="Lançamentos" products={newArrivals} />
      <ProductRail eyebrow="Preferidos" title="Mais Vendidos" products={bestSellers} tinted />
      <AboutSection />
      <BlogPreview />
      <InstagramStrip />
      <NewsletterSignup />
      <CouponPopup />
    </>
  )
}

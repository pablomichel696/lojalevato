import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import AnnounceBar from './components/layout/AnnounceBar'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import CartDrawer from './components/layout/CartDrawer'
import ScrollToTop from './components/layout/ScrollToTop'
import PageTransition from './components/layout/PageTransition'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import PolicyPage from './pages/PolicyPage'
import NotFound from './pages/NotFound'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/loja" element={<PageTransition><Catalog fixedSlug="toda-loja" /></PageTransition>} />
        <Route path="/categoria/:slug" element={<PageTransition><Catalog /></PageTransition>} />
        <Route path="/combos" element={<PageTransition><Catalog fixedSlug="combos" /></PageTransition>} />
        <Route path="/mais-vendidos" element={<PageTransition><Catalog fixedSlug="mais-vendidos" /></PageTransition>} />
        <Route path="/lancamentos" element={<PageTransition><Catalog fixedSlug="lancamentos" /></PageTransition>} />
        <Route path="/promocoes" element={<PageTransition><Catalog fixedSlug="promocoes" /></PageTransition>} />
        <Route path="/linha-premium" element={<PageTransition><Catalog fixedSlug="linha-premium" /></PageTransition>} />
        <Route path="/produto/:slug" element={<PageTransition><Product /></PageTransition>} />
        <Route path="/carrinho" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/sobre" element={<PageTransition><About /></PageTransition>} />
        <Route path="/politica-de-trocas" element={<PageTransition><PolicyPage /></PageTransition>} />
        <Route path="/politica-de-privacidade" element={<PageTransition><PolicyPage /></PageTransition>} />
        <Route path="/politica-de-entrega" element={<PageTransition><PolicyPage /></PageTransition>} />
        <Route path="/404" element={<PageTransition><NotFound /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <AnnounceBar />
      <Header />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer />
    </div>
  )
}

export default App

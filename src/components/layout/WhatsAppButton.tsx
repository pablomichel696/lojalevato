import { motion } from 'framer-motion'
import { whatsappLink } from '../../lib/config'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink('Olá, quero saber mais sobre os produtos Levato')}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale conosco no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft sm:bottom-6"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.34 4.95L2 22l5.28-1.39a9.87 9.87 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.79 14a1.7 1.7 0 0 1-.44.7c-.63.6-1.85.94-2.6.94a2 2 0 0 1-.32-.02c-1.2-.13-4.05-1.35-6.2-3.5-2.16-2.16-3.38-5.01-3.5-6.2a1.9 1.9 0 0 1-.02-.32c0-.75.34-1.97.94-2.6a1.7 1.7 0 0 1 .7-.44c.16-.05.33-.05.5-.02.22.05.42.16.57.38l1.13 1.86c.15.24.18.53.09.8-.09.27-.29.5-.55.63-.32.16-.44.55-.28.87.43.87 1.09 1.7 1.87 2.48.78.78 1.6 1.44 2.48 1.87.32.16.71.04.87-.28.13-.26.36-.46.63-.55.27-.09.56-.06.8.09l1.86 1.13c.22.15.33.35.38.57.03.17.03.34-.02.5Z" />
      </svg>
    </motion.a>
  )
}

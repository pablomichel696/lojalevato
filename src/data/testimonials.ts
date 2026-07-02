export type Testimonial = {
  id: string
  author: string
  handle: string
  quote: string
}

export const testimonials: Testimonial[] = [
  { id: '1', author: 'Mariana Souza', handle: '@marisouza', quote: 'Amei a experiência de compra, chegou super rápido e bem embalado!' },
  { id: '2', author: 'Carlos Eduardo', handle: '@cadu.fit', quote: 'Uso o combo de fitness há 2 meses, virou parte da minha rotina de treino.' },
  { id: '3', author: 'Fernanda Lima', handle: '@ferlima', quote: 'Atendimento pelo WhatsApp foi muito atencioso, tirou todas as minhas dúvidas.' },
  { id: '4', author: 'Roberto Alves', handle: '@robertoalves', quote: 'Site fácil de navegar pelo celular, comprei em menos de 2 minutos.' },
]

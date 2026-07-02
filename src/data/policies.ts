export type Policy = {
  slug: string
  title: string
  updatedAt: string
  sections: { heading: string; body: string }[]
}

export const policies: Policy[] = [
  {
    slug: 'politica-de-trocas',
    title: 'Política de Trocas e Devoluções',
    updatedAt: '2026-06-01',
    sections: [
      {
        heading: 'Prazo para solicitação',
        body: 'Você pode solicitar troca ou devolução em até 7 dias corridos após o recebimento do produto, conforme o Código de Defesa do Consumidor (direito de arrependimento).',
      },
      {
        heading: 'Condições do produto',
        body: 'Por se tratar de suplementos alimentares, só aceitamos devolução de produtos com lacre intacto e embalagem original, sem sinais de violação, exceto em casos de defeito ou avaria comprovada.',
      },
      {
        heading: 'Como solicitar',
        body: 'Entre em contato pelo WhatsApp ou e-mail informando o número do pedido. Nossa equipe irá orientar os próximos passos, incluindo o envio de etiqueta de devolução quando aplicável.',
      },
      {
        heading: 'Reembolso',
        body: 'Após recebermos e validarmos o produto devolvido, o reembolso é processado em até 10 dias úteis, no mesmo meio de pagamento utilizado na compra.',
      },
    ],
  },
  {
    slug: 'politica-de-privacidade',
    title: 'Política de Privacidade',
    updatedAt: '2026-06-01',
    sections: [
      {
        heading: 'Dados coletados',
        body: 'Coletamos apenas os dados necessários para processar seu pedido: nome, e-mail, telefone e endereço de entrega, além de dados de navegação para melhorar sua experiência no site.',
      },
      {
        heading: 'Uso dos dados',
        body: 'Seus dados são utilizados exclusivamente para processar pedidos, comunicação sobre o status da compra e, mediante seu consentimento, envio de ofertas e novidades por e-mail ou WhatsApp.',
      },
      {
        heading: 'Compartilhamento',
        body: 'Não vendemos seus dados a terceiros. Compartilhamos informações apenas com parceiros essenciais à operação (transportadoras, meios de pagamento) e conforme exigido por lei.',
      },
      {
        heading: 'Seus direitos (LGPD)',
        body: 'Você pode solicitar a qualquer momento a exclusão, correção ou exportação dos seus dados, entrando em contato pelo e-mail contato@levato.com.br.',
      },
    ],
  },
  {
    slug: 'politica-de-entrega',
    title: 'Política de Entrega',
    updatedAt: '2026-06-01',
    sections: [
      {
        heading: 'Prazos de entrega',
        body: 'O prazo estimado de entrega é de 3 a 10 dias úteis, variando conforme a região de destino, exibido no checkout antes da finalização da compra.',
      },
      {
        heading: 'Frete grátis',
        body: 'Compras acima de R$ 199 têm frete grátis para todo o Brasil. Abaixo desse valor, o frete é calculado automaticamente pelo CEP informado no checkout.',
      },
      {
        heading: 'Rastreamento',
        body: 'Assim que o pedido é despachado, você recebe o código de rastreamento por e-mail e WhatsApp para acompanhar cada etapa da entrega.',
      },
      {
        heading: 'Pedido não entregue',
        body: 'Caso o pedido não seja entregue dentro do prazo estimado, entre em contato com nosso atendimento para verificarmos o status junto à transportadora.',
      },
    ],
  },
]

export function getPolicyBySlug(slug: string) {
  return policies.find((p) => p.slug === slug)
}

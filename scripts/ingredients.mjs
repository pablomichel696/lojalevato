// Base de conhecimento de ingredientes -> composição + benefício (frases
// seguras para ANVISA: "auxilia/contribui", sem promessa de cura).
// Usada pelo import-wix.mjs e pelo enrich-products.mjs.

export const asciiLower = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const uniq = (arr) => [...new Set(arr)]

// keys: trechos (em minúsculo, sem acento) que aparecem no nome do produto.
export const INGREDIENTS = [
  { keys: ['curcuma'], name: 'Cúrcuma', benefit: 'Cúrcuma com ação antioxidante e conforto para as articulações' },
  { keys: ['gengibre'], name: 'Gengibre', benefit: 'Gengibre que auxilia a digestão e tem ação antioxidante' },
  { keys: ['pimenta preta', 'pimenta-preta'], name: 'Pimenta Preta', benefit: 'Pimenta preta que potencializa a absorção da cúrcuma' },
  { keys: ['cafeina'], name: 'Cafeína', benefit: 'Cafeína que auxilia a disposição e o foco' },
  { keys: ['guarana'], name: 'Guaraná', benefit: 'Guaraná, estimulante natural que auxilia a energia' },
  { keys: ['maca'], name: 'Maca Peruana', benefit: 'Maca peruana que auxilia a disposição e o vigor' },
  { keys: ['creatina'], name: 'Creatina', benefit: 'Creatina que auxilia o desempenho físico e a força' },
  { keys: ['ashwagandha'], name: 'Ashwagandha', benefit: 'Ashwagandha, erva adaptógena que auxilia no equilíbrio do estresse' },
  { keys: ['moringa'], name: 'Moringa', benefit: 'Moringa, rica em antioxidantes e nutrientes' },
  { keys: ['tribul'], name: 'Tribulus Terrestris', benefit: 'Tribulus que auxilia a disposição e o vigor' },
  { keys: ['uxi amarelo'], name: 'Uxi Amarelo', benefit: 'Uxi amarelo, tradicional no bem-estar feminino' },
  { keys: ['colagen', 'colageno'], name: 'Colágeno', benefit: 'Colágeno que contribui para pele, unhas, cabelos e articulações' },
  { keys: ['garra do diabo'], name: 'Garra do Diabo', benefit: 'Garra do diabo que auxilia o conforto das articulações' },
  { keys: ['amora'], name: 'Amora', benefit: 'Amora, tradicional no bem-estar do climatério' },
  { keys: ['isoflavona'], name: 'Isoflavona de Soja', benefit: 'Isoflavona que apoia o equilíbrio hormonal feminino' },
  { keys: ['unha de gato'], name: 'Unha de Gato', benefit: 'Unha de gato com ação antioxidante e de suporte imunológico' },
  { keys: ['levedo'], name: 'Levedo de Cerveja', benefit: 'Levedo de cerveja, fonte de vitaminas do complexo B' },
  { keys: ['cha verde'], name: 'Chá Verde', benefit: 'Chá verde com ação antioxidante e termogênica leve' },
  { keys: ['valeriana'], name: 'Valeriana', benefit: 'Valeriana que auxilia no relaxamento e no sono' },
  { keys: ['passiflora'], name: 'Passiflora', benefit: 'Passiflora que auxilia no relaxamento' },
  { keys: ['camomila'], name: 'Camomila', benefit: 'Camomila, calmante e digestiva' },
  { keys: ['semente de abobora'], name: 'Semente de Abóbora', benefit: 'Semente de abóbora, tradicional no apoio à próstata' },
  { keys: ['saw palmetto'], name: 'Saw Palmetto', benefit: 'Saw palmetto que apoia a saúde da próstata' },
  { keys: ['quebra pedra', 'quebra-pedra'], name: 'Quebra-Pedra', benefit: 'Quebra-pedra, tradicionalmente usada como diurético' },
  { keys: ['b12'], name: 'Vitamina B12', benefit: 'Vitamina B12 que contribui para a energia e o sistema nervoso' },
  { keys: ['vitamina c'], name: 'Vitamina C', benefit: 'Vitamina C com ação antioxidante e suporte imunológico' },
  { keys: ['castanha da india'], name: 'Castanha-da-Índia', benefit: 'Castanha-da-índia que auxilia a circulação e as pernas pesadas' },
  { keys: ['omega'], name: 'Ômega 3', benefit: 'Ômega 3 que auxilia a saúde cardiovascular e cerebral' },
  { keys: ['glucomannan', 'glucomanan'], name: 'Glucomannan', benefit: 'Glucomannan, fibra que auxilia a saciedade' },
  { keys: ['psyllium'], name: 'Psyllium', benefit: 'Psyllium, fibra que auxilia o intestino e a saciedade' },
  { keys: ['espinheira santa'], name: 'Espinheira-Santa', benefit: 'Espinheira-santa que auxilia o conforto digestivo' },
  { keys: ['melao de sao caetano'], name: 'Melão de São Caetano', benefit: 'Melão de são caetano que auxilia o metabolismo do açúcar' },
  { keys: ['babosa', 'aloe'], name: 'Babosa (Aloe Vera)', benefit: 'Babosa que auxilia o conforto digestivo' },
  { keys: ['ginkgo'], name: 'Ginkgo Biloba', benefit: 'Ginkgo biloba que auxilia a circulação e a memória' },
  { keys: ['barbatimao'], name: 'Barbatimão', benefit: 'Barbatimão, tradicional no bem-estar feminino' },
  { keys: ['ora pro nobis', 'ora com', 'ora-pro'], name: 'Ora-pro-nóbis', benefit: 'Ora-pro-nóbis, rica em proteínas, fibras e ferro' },
  { keys: ['acido hialuronico', 'hialuronico'], name: 'Ácido Hialurônico', benefit: 'Ácido hialurônico que contribui para a hidratação da pele' },
  { keys: ['sucupira'], name: 'Sucupira', benefit: 'Sucupira, tradicional no conforto articular' },
  { keys: ['ginseng'], name: 'Ginseng', benefit: 'Ginseng que auxilia a disposição e a energia' },
  { keys: ['chlorella'], name: 'Chlorella', benefit: 'Chlorella que auxilia a desintoxicação natural' },
  { keys: ['noz da india', 'nozes da india'], name: 'Noz da Índia', benefit: 'Noz da Índia, usada tradicionalmente em rotinas de emagrecimento' },
]

// Benefícios por categoria (fallback quando não há ingredientes reconhecidos).
export const CATEGORY_BENEFITS = {
  emagrecedores: ['Auxilia no processo de emagrecimento', 'Ajuda no controle do apetite', 'Complementa dieta e exercícios'],
  desintoxicantes: ['Apoia a desintoxicação natural do organismo', 'Auxilia na eliminação de líquidos', 'Sensação de leveza no dia a dia'],
  diuretico: ['Auxilia na eliminação do excesso de líquidos', 'Contribui para reduzir o inchaço', 'Fórmula natural'],
  calmante: ['Auxilia no relaxamento', 'Favorece uma boa noite de sono', 'Ajuda em momentos de rotina agitada'],
  'saude-feminina': ['Apoia o equilíbrio hormonal feminino', 'Contribui para o bem-estar no ciclo', 'Fórmula natural'],
  'estimulantes-sexuais': ['Auxilia a disposição física', 'Contribui para o vigor', 'Fórmula tradicional'],
  fitness: ['Auxilia o desempenho no treino', 'Contribui para a energia e disposição', 'Ideal para a rotina fitness'],
  'pre-treino': ['Auxilia o desempenho no treino', 'Contribui para a resistência', 'Energia para o treino'],
  termogenico: ['Ação termogênica', 'Auxilia o gasto calórico no treino', 'Combina com exercícios'],
  'beleza-saude': ['Contribui para pele, unhas e cabelos', 'Ação de suporte à beleza', 'Fórmula natural'],
  'anti-inflamatorio': ['Ação antioxidante', 'Auxilia o bem-estar das articulações', 'Fórmula concentrada'],
  'articulacoes-dores': ['Auxilia a saúde das articulações', 'Contribui para a mobilidade', 'Fórmula de suporte'],
  'circulacao-sanguinea': ['Contribui para a circulação', 'Ação antioxidante', 'Auxilia as pernas pesadas'],
  'refluxo-gastrite': ['Auxilia no conforto digestivo', 'Contribui para o equilíbrio gástrico', 'Fórmula natural'],
  'controle-acucar-diabetes': ['Auxilia o metabolismo do açúcar', 'Contribui para o equilíbrio energético', 'Fórmula natural'],
  'saude-prostata': ['Auxilia a função urinária', 'Contribui para o bem-estar masculino', 'Fórmula natural'],
  imunidade: ['Auxilia o sistema imunológico', 'Ação antioxidante', 'Fórmula natural'],
  'auxilio-intestinal': ['Auxilia o funcionamento intestinal', 'Contribui para a saciedade', 'Fórmula com fibras'],
  'bem-estar': ['Apoia o bem-estar no dia a dia', 'Fórmula 100% natural', 'Rotina prática'],
}

const TEA_BLEND = ['Chá branco', 'Chá verde', 'Carqueja', 'Cavalinha', 'Chá de bugre', 'Sene', 'Hortelã', 'Centella asiática']
const TEA_BENEFITS = [
  'Auxilia na eliminação do excesso de líquidos',
  'Contribui para reduzir a sensação de inchaço',
  'Favorece o bom funcionamento intestinal',
  'Apoia a desintoxicação natural do organismo',
  '100% natural, sem sabor artificial',
]

/** Recalcula composição + benefícios de um produto com base em nome/categoria. */
export function enrichProduct(product) {
  const n = asciiLower(product.name || '')

  // Chás: blend de ervas + benefícios diurético/digestivo/depurativo.
  if (product.kind === 'pouch') {
    const comp = [...TEA_BLEND]
    if (/noz(es)? da india/.test(n) && !comp.includes('Noz da Índia')) comp.splice(1, 0, 'Noz da Índia')
    return { composition: comp, benefits: [...TEA_BENEFITS] }
  }

  const found = INGREDIENTS.filter((ing) => ing.keys.some((k) => n.includes(k)))
  const composition = uniq(found.map((f) => f.name))
  let benefits = uniq(found.map((f) => f.benefit))

  const primary = (product.categorySlugs || []).find((c) => CATEGORY_BENEFITS[c]) || 'bem-estar'
  if (benefits.length < 3) benefits = uniq([...benefits, ...CATEGORY_BENEFITS[primary]])

  return {
    composition: composition.length ? composition : (product.composition?.length ? product.composition : ['Ingredientes naturais selecionados']),
    benefits: benefits.slice(0, 5),
  }
}

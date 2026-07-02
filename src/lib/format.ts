export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatInstallments(value: number, maxInstallments = 3): string {
  const perInstallment = value / maxInstallments
  return `${maxInstallments}x de ${formatPrice(perInstallment)} sem juros`
}

export function discountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

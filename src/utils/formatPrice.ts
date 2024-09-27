export default function formatPrice(price: number) {
  const formattedPrice = price.toLocaleString();
  return `${formattedPrice} SYP`;
}

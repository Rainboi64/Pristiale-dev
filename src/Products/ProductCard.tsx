export default function ProductCard({ product }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full rounded-t-lg object-cover"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
        <p className="mt-2 text-lg font-bold text-indigo-600">
          ${product.price}
        </p>
      </div>
    </div>
  );
}

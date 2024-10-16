export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="mt-6 flex space-x-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`rounded-lg px-4 py-2 ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

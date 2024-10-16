import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductGallery from "./ProductGallery";
import SearchBar from "./SearchBar";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const products = [
    {
      id: 1,
      name: 'Emperor Fragrance',
      description: 'Luxury perfume',
      price: 150,
      category: 'Fragrance',
      image: '/path-to-image.jpg',
    },
    {
      id: 2,
      name: 'Empress Dress',
      description: 'Elegant dress',
      price: 300,
      category: 'Clothing',
      image: '/path-to-image.jpg',
    },
    // More products here...
  ];

  const categories = ['All', 'Fragrance', 'Clothing', 'Accessories'];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((product) =>
      selectedCategory === 'All' ? true : product.category === selectedCategory,
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold">Luxury Products</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductGallery products={filteredProducts} />
    </div>
  );
}

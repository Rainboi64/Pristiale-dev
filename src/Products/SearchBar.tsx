import { useState } from 'react';

export default function SearchBar({ setSearchQuery }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative mt-6">
      <input
        type="text"
        placeholder="Search Products"
        value={inputValue}
        onChange={handleSearch}
        className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

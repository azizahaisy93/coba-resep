
import React, { useState } from 'react';
import { TrashIcon } from './icons/TrashIcon';

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
  onClearIngredients: () => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onAddIngredient, onRemoveIngredient, onClearIngredients }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAdd = () => {
    if (currentIngredient.trim()) {
      onAddIngredient(currentIngredient.trim().toLowerCase());
      setCurrentIngredient('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Contoh: ayam, bawang, kecap"
          className="flex-grow w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow"
        />
        <button
          onClick={handleAdd}
          className="bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-colors"
        >
          +
        </button>
      </div>

      <div className="mt-4 min-h-[100px] bg-slate-50 p-3 rounded-lg border border-dashed">
        {ingredients.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {ingredients.map(ing => (
              <span key={ing} className="flex items-center bg-green-200 text-green-800 text-sm font-medium px-3 py-1 rounded-full animate-fade-in">
                {ing}
                <button onClick={() => onRemoveIngredient(ing)} className="ml-2 text-green-600 hover:text-green-800 focus:outline-none">
                  &times;
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center text-sm py-8">Bahan-bahan Anda akan muncul di sini.</p>
        )}
      </div>

      {ingredients.length > 0 && (
         <button 
          onClick={onClearIngredients} 
          className="text-sm text-slate-500 hover:text-red-600 hover:underline transition-colors mt-2 flex items-center gap-1"
        >
          <TrashIcon className="h-4 w-4" />
          Bersihkan Semua
        </button>
      )}
    </div>
  );
};

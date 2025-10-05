
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface RecipeDisplayProps {
  recipe: string;
  isLoading: boolean;
  error: string | null;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, isLoading, error }) => {
  const formatRecipe = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(3)}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold mb-3 text-orange-600">{line.substring(2)}</h2>;
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
      }
      if (line.trim().match(/^\d+\./)) {
        return <li key={index} className="ml-5 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
      }
      return <p key={index} className="mb-2">{line}</p>;
    });
  };
  
  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">Resep Ajaib Anda</h2>
      <div className="bg-slate-50 p-4 rounded-lg min-h-[300px] max-h-[500px] overflow-y-auto prose prose-sm">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <LoadingSpinner />
            <p className="mt-2 text-center">Sedang mencari inspirasi di dapur ajaib... <br/> Mohon tunggu sebentar!</p>
          </div>
        )}
        {error && <p className="text-red-500 text-center my-auto">{error}</p>}
        {!isLoading && !error && !recipe && (
          <div className="flex items-center justify-center h-full">
            <p className="text-slate-400 text-center">Resep Anda akan muncul di sini setelah dibuat.</p>
          </div>
        )}
        {recipe && <div>{formatRecipe(recipe)}</div>}
      </div>
    </div>
  );
};

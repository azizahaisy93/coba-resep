
import React from 'react';
import { ChefHatIcon } from './icons/ChefHatIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
        <div className="flex justify-center items-center gap-4">
            <ChefHatIcon className="h-12 w-12 text-orange-500" />
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">
                Generator Resep AI
            </h1>
        </div>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Bingung mau masak apa? Masukkan bahan-bahan yang Anda punya dan biarkan AI kami menciptakan resep lezat untuk Anda!
        </p>
    </header>
  );
};

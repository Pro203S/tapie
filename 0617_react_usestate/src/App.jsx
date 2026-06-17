// import { useState } from "react";
import ProductCard from './components/ProductCard';

export default function App() {
  return (
    <div className="app">
        <h1>오늘의 추천 상품</h1>

        <ProductCard />
        <ProductCard />
        <ProductCard />
    </div>
  );
}
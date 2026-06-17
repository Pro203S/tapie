import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

export default function App() {
  // eslint-disable-next-line react-hooks/immutability
  document.body.style.margin = "0";

  const [products, setProducts] = useState([
    {
      "id": 1,
      "title": "200 고양이",
      "price": 200,
      "imgUrl": "https://http.cat/200"
    },
    {
      "id": 2,
      "title": "204 고양이",
      "price": 204,
      "imgUrl": "https://http.cat/204"
    }
  ])

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh", margin: 0 }}>
      <Header />
      <div style={{ padding: 20, flex: 1 }}>
        <h1>신상</h1>

        <table>
          <tbody>
            <tr>
              {products.map(v => <ProductCard key={v.id}
                title={v.title}
                price={v.price}
                imgUrl={v.imgUrl}
              />)}
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
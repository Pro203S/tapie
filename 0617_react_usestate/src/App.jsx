import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  // eslint-disable-next-line react-hooks/immutability
  document.body.style.margin = "0";
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh", margin: 0 }}>
      <Header />
      <div style={{ padding: 20, flex: 1 }}>
        <h1>신상</h1>

        <table>
          <tbody>
            <tr>
              <ProductCard
                title="200 고양이 이미지"
                imgUrl="https://http.cat/200"
                price={200}
              />
              <ProductCard
                title="204 고양이 이미지"
                imgUrl="https://http.cat/204"
                price={204}
              />
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
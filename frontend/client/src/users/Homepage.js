// import "./index.css";
import Hero from "./Hero";
// import SectionMenuAndMenuContainer from "./pages/SectionMenuAndMenuContainer";
import MenuContainer from "./pages/MenuContainer";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { Marque } from "./components/Marquee";

function Homepage() {
  return (
    <div className="App">
      <Hero />
      {/* <SectionMenuAndMenuContainer /> */}
      <MenuContainer />
      <Marque />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default Homepage;

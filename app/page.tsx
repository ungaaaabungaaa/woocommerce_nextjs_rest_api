import { AppleCardsCarouselDemo } from "./component/apple-cards-carousel";
import { ImagesSliderDemo } from "./component/ImagesSliderDemo";
import FeaturedProducts from "./component/featuredproducts";
import { WobbleCardDemo } from "./component/wobble-card";
import { TabsDemo } from "./component/tabs";
import ProductCarousel from "./component/ ProductCarousel";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <ImagesSliderDemo></ImagesSliderDemo>
      <br></br>
      <AppleCardsCarouselDemo></AppleCardsCarouselDemo>
      <br></br>
      <FeaturedProducts></FeaturedProducts>
      <br></br>
      <WobbleCardDemo></WobbleCardDemo>
      <br></br>
      <ProductCarousel></ProductCarousel>
      <br></br>
    </section>
  );
}

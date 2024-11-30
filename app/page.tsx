import { AppleCardsCarouselDemo } from "./component/apple-cards-carousel";
import { ImagesSliderDemo } from "./component/ImagesSliderDemo";
import FeaturedProducts from "./component/featuredproducts";
import { WobbleCardDemo } from "./component/wobble-card";
import ProductCarousel from "./component/ ProductCarousel";
import InstagramGallery from "./component/instagram-gallery";


// Nav Bar Mega Menu
// Homepage More Project Cards 
// ShopPage Categories with Simple Sorthing Filters 
// View Product Page Single 
// view Vairation Product 
// Add cart Vairation Product 



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
     <InstagramGallery></InstagramGallery>
      <br></br>
    </section>
  );
}

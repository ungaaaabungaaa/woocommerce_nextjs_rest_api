import { AppleCardsCarouselDemo } from "./component/apple-cards-carousel";
import { ImagesSliderDemo } from "./component/ImagesSliderDemo";
import FeaturedProducts from "./component/featuredproducts";
import { WobbleCardDemo } from "./component/wobble-card";
import ProductCarousel from "./component/ ProductCarousel";
import InstagramGallery from "./component/instagram-gallery";
import PromoCard from "./component/promocard";
import { ProductPromoCard } from "./component/productpromocard";
import HeroBanner from "./component/hero-banner";
import ProductCarouselCategories from "./component/ ProductCarouselCategories";

export default function Home() {
  
  
  
  
  return (
    <section className="flex flex-col items-center justify-center bg-black text-white dark:bg-white dark:text-black">
      <ImagesSliderDemo></ImagesSliderDemo>
      <br></br>
      <AppleCardsCarouselDemo></AppleCardsCarouselDemo>
      <br></br>
      <PromoCard></PromoCard>
      <br></br>
      <FeaturedProducts></FeaturedProducts>
      <br></br>
        <div className="container mx-auto grid gap-6 p-6 md:grid-cols-2">
        <ProductPromoCard
          title="Heritage"
          discount="22"
          imageUrl="https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnRzfGVufDB8MHwwfHx8MA%3D%3D"
        />
        <ProductPromoCard
          title="Headwear"
          discount="40"
          imageUrl="https://images.unsplash.com/photo-1575396565848-e8031f12ce2a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHdlYXJ8ZW58MHwwfDB8fHww"
        />
      </div>
      <ProductCarouselCategories category="accessories" ></ProductCarouselCategories>
      <br></br>
      <ProductCarouselCategories category="core" ></ProductCarouselCategories>
      <br></br>
      <WobbleCardDemo></WobbleCardDemo>
      <br></br>
      <ProductCarousel></ProductCarousel>      
      <br></br>
      <InstagramGallery></InstagramGallery>
      <br></br>
      <HeroBanner></HeroBanner>
    </section>
  );
}

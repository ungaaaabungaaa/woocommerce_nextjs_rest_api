import { AppleCardsCarouselDemo } from "./component/apple-cards-carousel";
import { ImagesSliderDemo } from "./component/ImagesSliderDemo";
import FeaturedProducts from "./component/featuredproducts";
import { WobbleCardDemo } from "./component/wobble-card";
import ProductCarousel from "./component/ ProductCarousel";
import InstagramGallery from "./component/instagram-gallery";
import { ProductPromoCard } from "./component/productpromocard";
import HeroBanner from "./component/hero-banner";
import ProductCarouselCategories from "./component/ ProductCarouselCategories";

export default function Home() {
  // 1.  Add in loading skeltons for better user experience & Fix Loading Times
  // 3.  Fix overflows add ripples loading for making it as loading the ui
  // 4.  Make the Side cart look good & Remove the Quanity From it
  // 5.  Make the filters color look simiar to the manunited
  // 6.  On back cache the result so noo need to make again api cal
  // ⁠7.  Footer Exactly
  // ⁠⁠8.  Header Gaps Same
  // 9.  Fix the apple card alignments
  // ⁠10.⁠ Alignments Match
  // ⁠⁠11. Gallery Clone
  // 12 make the cards same sizes as the apple cards
  // ⁠13. text - diffrent shades for descriotion and hightlights
  // ⁠⁠14. make the search grid one single products

  return (
    <section className="flex flex-col items-center justify-center bg-black text-white dark:bg-white dark:text-black">
      <ImagesSliderDemo></ImagesSliderDemo>
      <AppleCardsCarouselDemo></AppleCardsCarouselDemo>
      <ProductCarousel></ProductCarousel>
      <br></br>
      <div className="container mx-auto grid gap-6 py-4 md:grid-cols-2">
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
      <ProductCarouselCategories category="accessories"></ProductCarouselCategories>
      <ProductCarouselCategories category="core"></ProductCarouselCategories>
      <WobbleCardDemo></WobbleCardDemo>
      <ProductCarouselCategories category="footwear"></ProductCarouselCategories>
      <InstagramGallery></InstagramGallery>
      <br></br>
      {/* <HeroBanner></HeroBanner> */}
    </section>
  );
}

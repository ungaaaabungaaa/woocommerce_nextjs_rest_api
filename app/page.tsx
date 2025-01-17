import { AppleCardsCarouselDemo } from "./component/apple-cards-carousel";
import { ImagesSliderDemo } from "./component/ImagesSliderDemo";
import { WobbleCardDemo } from "./component/wobble-card";
import ProductCarousel from "./component/ ProductCarousel";
import InstagramGallery from "./component/instagram-gallery";
import { ProductPromoCard } from "./component/productpromocard";
import ProductCarouselCategories from "./component/ ProductCarouselCategories";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center bg-black text-white dark:bg-white dark:text-black">
      <ImagesSliderDemo></ImagesSliderDemo>
      <AppleCardsCarouselDemo></AppleCardsCarouselDemo>
      <ProductCarousel></ProductCarousel>
      <br></br>
      <div className="container mx-auto grid gap-4 py-4 md:grid-cols-2 w-full max-w-7xl">
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
    </section>
  );

  // if user authenticated take them to authenticated checkout route
  // autofill in the checkout if user authenticated
  // wishlist routes setup & Implementation https://clothvillage.com/wp-json/custom/v1/wishlist?ids=352,350,349, Store Data , Retrive Data , Show Data thats all

  // variation selections colors
  // on hover add border - b
  // add in the heart icon for the cards & console log the on clicked added to the cart
  // Site icon size increaser
  // alignments
  // pop up icons
  // font updates
}

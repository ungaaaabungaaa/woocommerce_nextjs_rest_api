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
    </section>
  );

  // Add In View Orders
  // view Order Page
  // autofill in the checkout if user authenticated
  // variation selections colors
  // on hover add border - b
  // add in the heart icon for the cards & console log the on clicked added to the cart
  // pop up icons
  // Site icon size increaser
  // filter button same as the manunited
  // alignments
  // font updates
  // wishlist routes setup & Implementation
}

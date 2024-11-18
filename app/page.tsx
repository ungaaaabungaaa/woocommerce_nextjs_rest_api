import { AppleCardsCarouselDemo } from "./component/apple-cards-carousel";
import { ImagesSliderDemo } from "./component/ImagesSliderDemo";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <ImagesSliderDemo></ImagesSliderDemo>
      <br></br>
      <AppleCardsCarouselDemo></AppleCardsCarouselDemo>
      <br></br>
    </section>
  );
}

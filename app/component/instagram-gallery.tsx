import Image from "next/image";
import { Instagram } from "lucide-react";
import { Button } from "@nextui-org/button";

interface InstagramPost {
  id: string;
  imageUrl: string;
  link: string;
}

const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1649239609980-854cc2116f42?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhc2hpb24lMjBnaXJsfGVufDB8fDB8fHww",
    link: "#",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1659946257669-14a805bdbdb1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGZhc2hpb24lMjBnaXJsfGVufDB8fDB8fHww",
    link: "#",
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1655119373888-1bce2223555a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGZhc2hpb24lMjBnaXJsfGVufDB8fDB8fHww",
    link: "#",
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1695469956732-642c7f6f5ecc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGZhc2hpb24lMjBnaXJsfGVufDB8fDB8fHww",
    link: "#",
  },
];

export default function InstagramGallery() {
  return (
    <section className="w-full py-4 max-w-7xl">
      <div className="container mx-auto px-0">
        {" "}
        {/* Adjust padding */}
        <h2 className="text-3xl font-bold text-center mb-8">
          @Universal_Studio
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {" "}
          {/* Remove gap */}
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              className="relative aspect-square group overflow-hidden"
            >
              <Image
                src={post.imageUrl}
                alt="Instagram post"
                className="object-cover w-full h-full group-hover:opacity-50 transition-opacity duration-300"
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                <Instagram className="w-8 h-8 text-white dark:text-black" />
              </div>
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button className="bg-white text-black dark:text-white dark:bg-black rounded-full ">
            SHOP INSTAGRAM
          </Button>
        </div>
      </div>
    </section>
  );
}

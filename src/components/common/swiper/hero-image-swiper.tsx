'use client';

import { ImageType } from '@/types/products';
import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

type PropsType = {
  images: ImageType[];
  alt: string;
};

export default function HeroImageSwiper({ images, alt }: PropsType) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="image-swiper-wrapper w-full max-w-full min-w-0 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        loop
        slidesPerView={1}
        speed={1000}
        autoplay={{
          delay: 5000,
        }}
        className="image-swiper-main w-full max-w-full min-w-0 overflow-hidden"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="w-full">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={image.image_url}
                alt="商品画像"
                fill
                sizes="(max-width: 768px) 80vw, 50vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

'use client';

import { ImageType } from '@/types/products';
import Image from 'next/image';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

type PropsType = {
  images: ImageType[];
};

export default function ImageSwiper({ images }: PropsType) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="image-swiper-wrapper w-full max-w-full min-w-0 overflow-hidden">
      <Swiper
        modules={[Thumbs]}
        loop={images.length > 1}
        spaceBetween={16}
        slidesPerView={1}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
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
      <Swiper
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        className="image-swiper-thumbs mt-3 !w-full max-w-full min-w-0"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden border">
              <Image
                src={image.image_url}
                alt="商品サムネイル"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

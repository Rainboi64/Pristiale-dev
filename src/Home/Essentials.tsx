import GalleryItem from '../components/GalleryItem/GalleryItem.tsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel.tsx';
import { Tables } from '@/lib/database.types.ts';
import { cn } from '@/lib/utils.ts';
import supabase from '@/utils/supabase.ts';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Essentials() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const [products, setProducts] = useState<Tables<'products'>[]>([]);
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('collection', '1');
    if (!data) {
      return;
    }

    const len = data.length;
    const multiplier = 2;
    let copy: Tables<'products'>[] = data;

    if (len < 5) {
      copy = Array.from(new Array(len * multiplier)).map(
        (_, i) => data[i % len],
      );
    }

    setProducts(copy);
  }

  const [t, { language }] = useTranslation();

  return (
    <div
      className={cn(
        'mb-12 flex w-screen flex-col items-center justify-evenly gap-4 bg-white p-4',
        language === 'en' ? 'bebas-neue-regular' : 'alexandria',
      )}
    >
      <p className={cn('text-center text-6xl text-background')}>
        {t('collections.mensEssentials')}
      </p>
      <p className="text-center text-xl text-background">
        {t('collections.mensEssentialsDescription')}
      </p>
      <Carousel
        className="gap-2 p-2"
        opts={{
          align: 'center',
          loop: true,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {products.map((product, i) => (
            <CarouselItem className="flex justify-center md:basis-1/5">
              <GalleryItem key={i} product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

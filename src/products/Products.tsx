import NavigationBar from '@/components/NavigationBar/NavigationBar';
import ProductItem from '@/components/Product/ProductItem';
import { Tables } from '@/lib/database.types';
import { cn } from '@/lib/utils';
import supabase from '@/utils/supabase';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Products() {
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
    <div className="h-screen w-screen overflow-auto overflow-x-hidden bg-white">
      <NavigationBar />
      <div className="flex">
        <div className="bebas-neue-regular flex flex-col gap-12 px-6 py-12 lg:px-32 ">
          <h1
            className={cn(
              'w-full text-5xl text-black',
              language === 'en' ? '' : 'alexandria text-end',
            )}
          >
            {t('menu.allProducts')}
          </h1>
          <div className="grid justify-items-center gap-2 md:grid-cols-3">
            {Array.from(new Array(3)).map(() =>
              products.map((product, i) => (
                <ProductItem key={i} product={product} />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

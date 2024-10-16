import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import formatPrice from '@/utils/formatPrice';
import supabase from '@/utils/supabase';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/lib/database.types';
import pristiale from '../../assets/images/statue.svg';
import NavigationBar from '../NavigationBar/NavigationBar';
import { useTranslation } from 'react-i18next';

export default function ProductPage() {
  const params = useParams();

  const [selectedItem, setSelectedItem] = useState<string>();
  const [items, setItems] = useState<Tables<'items'>[]>([]);
  const [product, setProduct] = useState<Tables<'products'>>();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
  }, [params]);

  async function getItems() {
    if (!params['productId']) {
      throw { message: 'product not found' };
    }

    const { data: product } = await supabase
      .from('products')
      .select()
      .eq('id', params['productId']);

    if (!product?.[0]) {
      throw { message: 'product not found' };
    }

    setProduct(product[0]);

    const { data } = await supabase
      .from('items')
      .select('*')
      .eq('product', params['productId']);

    if (!data) {
      throw { message: 'product not found' };
    }

    setItems(data);
  }

  async function addToCart() {
    if (!product) {
      return;
    }

    const item = items.find((x) => x.id === Number(selectedItem));
    const response = await supabase.auth.getUser();
    if (!response) {
      return;
    }

    const { user } = response.data;

    if (!user || !item) {
      navigate('/login');
      return;
    }

    await supabase.from('cart-items').insert({
      item: item.id,
      name: product.name,
      price: item.price,
      profile: user.id,
    });

    toast({
      title: 'Added to cart',
      description: `Added ${product.name} to cart successfully.`,
    });
  }

  const { t } = useTranslation();

  return (
    <>
      <NavigationBar />
      {product ? (
        <div className="flex h-screen flex-row flex-wrap items-center overflow-y-auto bg-white text-black">
          <div className="bebas-neue-regular disable-scroll mx-auto flex w-full max-w-md flex-wrap items-center overflow-y-auto p-2">
            <video
              src={product?.preview ?? ''}
              muted
              autoPlay
              loop
              playsInline
              poster={product?.thumbnail ?? ''}
              unselectable={'on'}
              controls={false}
              disablePictureInPicture={true}
              //@ts-expect-error
              onPointerDown={(event) => event.target.pause()}
              //@ts-expect-error
              onPointerUp={(event) => event.target.play()}
              className="flex-shrink rounded-xl"
            />
          </div>
          <div className="bebas-neue-regular mx-auto flex w-full max-w-md flex-col justify-center gap-4 p-4">
            <div>
              <p className="text-center text-5xl">{product?.name}</p>
              <p className="text-center text-lg">BY PRISTIALE</p>
            </div>
            <p className="self-start text-3xl">{product?.description}</p>
            <p className="self-start text-2xl">
              {formatPrice(product?.price ?? 0)}
            </p>
            <Select
              value={selectedItem}
              onValueChange={(e) => setSelectedItem(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('products.size')} />
              </SelectTrigger>
              <SelectContent>
                {items.map((x) => (
                  <SelectItem
                    key={x.id}
                    value={x.id.toString()}
                    disabled={x.quantity < 1}
                  >
                    <p className="bebas-neue-regular">{x.feature}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button disabled={!selectedItem} onClick={addToCart}>
              {t('products.addToCart')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-screen flex-col text-balance bg-white text-center">
          <div className="helvetica flex flex-1 flex-col items-center justify-center gap-4 text-lg">
            <img src={pristiale} width={500} className="animate-pulse p-12" />
          </div>
        </div>
      )}
    </>
  );
}

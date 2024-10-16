import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Tables } from '@/lib/database.types';
import formatPrice from '@/utils/formatPrice';
import supabase from '@/utils/supabase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function ItemDrawer(props: { product: Tables<'products'> }) {
  const { product } = props;
  const [selectedItem, setSelectedItem] = useState<string>();
  const [items, setItems] = useState<Tables<'items'>[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    const { data } = await supabase
      .from('items')
      .select('*')
      .eq('product', product.id);

    if (!data) {
      return;
    }

    setItems(data);
  }

  async function addToCart() {
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

  return (
    <>
      <div className="bebas-neue-regular mx-auto w-full max-w-md p-4">
        <DrawerHeader>
          <DrawerTitle className="text-center text-5xl">
            {product.name}
          </DrawerTitle>
          <DrawerDescription className="text-center text-lg">
            BY PRISTIALE
          </DrawerDescription>
        </DrawerHeader>
      </div>
      <div className="bebas-neue-regular disable-scroll mx-auto h-full w-full max-w-md flex-wrap overflow-y-auto">
        <div className="flex flex-col items-center justify-center gap-4 p-4 pb-0">
          <video
            src={product.preview ?? ''}
            muted
            autoPlay
            loop
            playsInline
            poster={product.thumbnail ?? ''}
            unselectable={'on'}
            controls={false}
            disablePictureInPicture={true}
            //@ts-expect-error
            onPointerDown={(event) => event.target.pause()}
            //@ts-expect-error
            onPointerUp={(event) => event.target.play()}
            className="flex-shrink"
          />
          <p className="self-start text-3xl">{product.description}</p>
          <p className="self-start text-2xl">{formatPrice(product.price)}</p>
          <Select
            value={selectedItem}
            onValueChange={(e) => setSelectedItem(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Size" />
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
        </div>

        <DrawerFooter>
          <Button disabled={!selectedItem} onClick={addToCart}>
            Add to cart
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </>
  );
}

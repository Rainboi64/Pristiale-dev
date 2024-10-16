import { Separator } from '@radix-ui/react-select';
import { map, sumBy } from 'lodash';
import { Button } from '../ui/button';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import supabase from '@/utils/supabase';
import { useState } from 'react';
import { Tables } from '@/lib/database.types';
import CartItem from './CartItem';
import formatPrice from '@/utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CartSheet() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState<Tables<'cart-items'>[]>([]);
  const navigate = useNavigate();

  async function getItems() {
    const response = await supabase.auth.getUser();

    if (!response) {
      setLoggedIn(false);
      return;
    }

    const { user } = response.data;

    if (!user) {
      setLoggedIn(false);
      return;
    }

    setLoggedIn(true);
    const { data } = await supabase
      .from('cart-items')
      .select('*')
      .eq('profile', user.id)
      .is('order-id', null);

    if (!data) {
      return;
    }

    setItems(data);
  }

  const { t } = useTranslation();

  return (
    <SheetContent
      className="helvetica flex min-h-full w-screen flex-col"
      onFocus={getItems}
    >
      <SheetHeader>
        <SheetTitle>{t('cart.yourCart')}</SheetTitle>
      </SheetHeader>

      {loggedIn ? (
        <>
          <SheetDescription className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {map(items, (item, i) => (
                <CartItem key={i} cartItem={item} refetch={getItems} />
              ))}
            </div>
          </SheetDescription>
          <div className="sticky bottom-0 bg-inherit">
            <Separator />
            <div className="flex items-center justify-between p-3">
              <div className="bebas-neue-regular text-2xl font-medium leading-none text-foreground">
                {t('cart.total')}
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {formatPrice(sumBy(items, (item) => item.price))}
              </p>
            </div>
            <Button
              className="w-full"
              disabled={!items.length}
              onClick={() => navigate('/checkout')}
            >
              {t('cart.continueToCheckout')}
            </Button>
          </div>
        </>
      ) : null}
    </SheetContent>
  );
}

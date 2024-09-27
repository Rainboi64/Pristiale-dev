import { Tables } from '@/lib/database.types';
import formatPrice from '@/utils/formatPrice';
import supabase from '@/utils/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

export default function CartItem(props: {
  cartItem: Tables<'cart-items'>;
  refetch: () => void;
}) {
  const { cartItem, refetch } = props;
  const deleteItem = async () => {
    await supabase.from('cart-items').delete().eq('id', cartItem.id);
    toast({
      title: 'Removed to cart',
      description: `Removed ${cartItem.name} to cart successfully.`,
    });
    refetch();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <a
          className={
            'flex select-none items-center justify-between space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
          }
        >
          <div className="bebas-neue-regular text-2xl font-medium leading-none text-foreground">
            {cartItem?.name}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {formatPrice(cartItem.price)}
          </p>
        </a>
      </AlertDialogTrigger>
      <AlertDialogContent className="helvetica">
        <AlertDialogHeader>
          <AlertDialogTitle>Remove item from cart?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove item from cart, "{cartItem.name}"
            will be removed from your cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteItem}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

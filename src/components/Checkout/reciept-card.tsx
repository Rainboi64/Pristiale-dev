import { Separator } from '@radix-ui/react-select';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tables } from '@/lib/database.types';
import { useMemo } from 'react';
import { groupBy, map } from 'lodash';
import formatPrice from '@/utils/formatPrice';
import { User } from '@supabase/supabase-js';
import { Skeleton } from '../ui/skeleton';

export default function RecieptCard(props: {
  shipping: number;
  shippingInformation: string;
  phoneNumber: string;
  canContinue: boolean;
  items: Tables<'cart-items'>[];
  total: number;
  subTotal: number;
  tax: number;
  user?: User;
  onSubmit: () => void;
}) {
  const {
    shipping,
    shippingInformation,
    phoneNumber,
    canContinue,
    items,
    user,
    total,
    tax,
    subTotal,
    onSubmit,
  } = props;

  const groupedByProductItem = useMemo(
    () => groupBy(items, (item) => item.item),
    [items],
  );

  return (
    <Card
      className="overflow-hidden"
      x-chunk="An order details card with order details, shipping information, customer information and payment information."
    >
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Your Cart
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          {items ? (
            <ul className="grid gap-3">
              {map(groupedByProductItem, (items) => (
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {items[0].name} x <span>{items.length}</span>
                  </span>
                  <span>{formatPrice(items[0].price * items.length)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          )}
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subTotal)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>~ {formatPrice(shipping)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatPrice(tax)}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{formatPrice(total)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{shippingInformation}</span>
            </address>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          {user ? (
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Customer</dt>
                <dd>
                  {`${user?.user_metadata.firstName}  ${user?.user_metadata.lastName}`}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href="mailto:">{user?.email}</a>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>
                  <a href="tel:">{phoneNumber}</a>
                </dd>
              </div>
            </dl>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!canContinue} onClick={onSubmit}>
          Finalize Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}

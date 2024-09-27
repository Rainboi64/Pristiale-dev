import { UserIcon } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '../ui/label';
import RecieptCard from './reciept-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useEffect, useMemo, useState } from 'react';
import { Tables } from '@/lib/database.types';
import supabase from '@/utils/supabase';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import logo from '../../assets/images/pristiale.svg';
import { Checkbox } from '../ui/checkbox';
import { Skeleton } from '../ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { sumBy } from 'lodash';
import { User } from '@supabase/supabase-js';

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const [governorates, setGovernorates] = useState<Tables<'governorates'>[]>();
  const [terms, setTerms] = useState(false);
  const [items, setItems] = useState<Tables<'cart-items'>[]>([]);
  const [selectedGovernorateId, setSelectedGovernorateId] = useState<string>();
  const selectedGovernorate = useMemo(
    () => governorates?.find((x) => x.id == Number(selectedGovernorateId)),
    [governorates, selectedGovernorateId],
  );
  const [shippingInformation, setShippingInformation] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [additionalOptions, setAdditionalOptions] = useState('');
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);

    const response = await supabase.auth.getUser();

    if (!response) {
      navigate('/login');
      return;
    }

    const { user } = response.data;

    if (!user) {
      navigate('/login');
      return;
    }

    setUser(user);

    const { data, error } = await supabase.from('governorates').select('*');

    if (!data || error) {
      toast({
        title: 'Connection Error',
        description: `There seems to be an issue with fetching data from the server, please check your connection.`,
      });
      return;
    }

    setGovernorates(data);

    const { data: items, error: itemsError } = await supabase
      .from('cart-items')
      .select()
      .is('order-id', null)
      .eq('profile', user.id);

    if (!items || itemsError) {
      toast({
        title: 'Connection Error',
        description: `There seems to be an issue with fetching data from the server, please check your connection.`,
      });
      return;
    }

    setItems(items);
    setLoading(false);
  };

  const subtotal = useMemo(() => sumBy(items, (item) => item.price), [items]);
  const taxRate = 0;

  const tax = useMemo(() => subtotal * taxRate, [subtotal]);

  const total = useMemo(
    () => subtotal + tax + (selectedGovernorate?.fee ?? 0),
    [subtotal, tax, selectedGovernorate?.fee],
  );

  const canContinue = useMemo(
    () =>
      !loading &&
      !!selectedGovernorateId &&
      !!contactPhone &&
      !!shippingInformation &&
      !!total &&
      !!subtotal &&
      terms,
    [
      loading,
      selectedGovernorateId,
      contactPhone,
      shippingInformation,
      total,
      subtotal,
      terms,
    ],
  );

  const submit = async () => {
    if (!canContinue) {
      return;
    }

    const order = await supabase
      .from('orders')
      .insert({
        total,
        tax,
        subtotal,
        status: 'awaiting-aproval',
        'shipping-address': shippingInformation,
        'shipping-fee': selectedGovernorate?.fee ?? 0,
        'tax-rate': taxRate,
        'shipping-to': Number(selectedGovernorateId),
        'extra-shipping-info': additionalOptions,
        profile: user!.id,
      })
      .select('*')
      .single();

    if (!order || order.error) {
      toast({
        title: 'Order Error',
        description: `There seems to be an issue with submitting your order data to the server, please check your connection.`,
      });
      return;
    }

    const { data } = order;

    const promises = await Promise.all(
      items.map((x) =>
        supabase
          .from('cart-items')
          .update({ 'order-id': data.id })
          .eq('id', x.id),
      ),
    );

    if (promises.find((x) => x.error)) {
      toast({
        title: 'Order Error',
        description: `There seems to be an issue with submitting your order data to the server, please check your connection.`,
      });
      return;
    }
    navigate('/thank-you');
  };

  return (
    <div className="helvetica flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="#">Cart</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="#">Checkout</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <UserIcon
              width={36}
              height={36}
              className="overflow-hidden rounded-full p-2"
            />
          </Button>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <img src={logo}></img>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-8"
                x-chunk="A card for an orders dashboard with a description and a button to create a new order."
              >
                <CardHeader className="pb-3">
                  <CardTitle>Contact us</CardTitle>
                  <CardDescription className=" text-balance leading-relaxed">
                    Pristiale's team is available to answer your questions, and
                    help you with your orders.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Go to contact page</Button>
                </CardFooter>
              </Card>

              <Card className="sm:col-span-4">
                <CardHeader className="pb-3">
                  <CardTitle>Billing, and Delivery</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Please verify your billing information before submitting.
                  </CardDescription>
                </CardHeader>
                {loading ? (
                  <CardContent className="flex flex-col gap-4">
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="flex flex-col gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="governorate">Ship to</Label>
                      <Select
                        value={selectedGovernorateId}
                        onValueChange={setSelectedGovernorateId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Governorate" />
                        </SelectTrigger>
                        <SelectContent className="helvetica">
                          {governorates?.map((x) => (
                            <SelectItem value={x.id.toString()}>
                              {x.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="address">Address:</Label>
                      <Textarea
                        value={shippingInformation}
                        onChange={(x) => setShippingInformation(x.target.value)}
                      />
                    </div>

                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="contact-phone">Contact Phone:</Label>
                      <Input
                        type="tel"
                        value={contactPhone}
                        onChange={(x) => setContactPhone(x.target.value)}
                      />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="payment-method">Payment method</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Cash" />
                        </SelectTrigger>
                        <SelectContent className="helvetica">
                          <SelectItem value={'cash'}>Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="items-top flex space-x-2">
                      <Checkbox
                        id="terms1"
                        checked={terms}
                        onCheckedChange={(e) => setTerms(e as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept terms and conditions
                        </label>
                        <p className="text-sm text-muted-foreground">
                          You agree to our Terms of Service and Privacy Policy.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card className="sm:col-span-4">
                <CardHeader className="pb-3">
                  <CardTitle>Packaging Instructions</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Do you have specific instructions for packaging, handling,
                    or billing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="additional-order-instructions">
                      Order Instructions:
                    </Label>
                    <Textarea
                      placeholder="Optional"
                      value={additionalOptions}
                      onChange={(x) => setAdditionalOptions(x.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div>
            <RecieptCard
              shipping={selectedGovernorate?.fee ?? 0}
              shippingInformation={shippingInformation}
              phoneNumber={contactPhone}
              canContinue={canContinue}
              items={items}
              total={total}
              subTotal={subtotal}
              tax={tax}
              user={user}
              onSubmit={submit}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import {
  CreditCard,
  Languages,
  Settings,
  User,
} from 'lucide-react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Tables } from '@/lib/database.types';
import supabase from '@/utils/supabase';
import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import formatPrice from '@/utils/formatPrice';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);

  const [products, setProducts] = React.useState<Tables<'products'>[]>([]);
  React.useEffect(() => {
    getProducts();
  }, []);

  const [t, { language }] = useTranslation();

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

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const switchLanguage = React.useCallback(() => {
    if (language === 'en') {
      i18next.changeLanguage('ar');
    } else {
      i18next.changeLanguage('en');
    }

    setOpen(false);
  }, [language, i18next, setOpen]);

  const navigate = useNavigate();

  return (
    <>
      <Button variant={'ghost'} onClick={() => setOpen(true)}>
        <MagnifyingGlassIcon />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          className={cn(language === 'en' ? 'helvetica' : 'tajawal-medium')}
          placeholder={t('menu.typeToSearch')}
        />
        <CommandList
          className={cn(language === 'en' ? 'helvetica' : 'tajawal-medium')}
        >
          <CommandEmpty>{t('menu.noResults')}</CommandEmpty>
          <CommandGroup heading={t('menu.items')}>
            {products.map((product) => (
              <CommandItem
                onSelect={() => {
                  navigate('/product/' + product.id);
                  setOpen(false);
                }}
              >
                <div className="bebas-neue-regular flex items-center justify-center gap-4">
                  <img
                    src={product.thumbnail ?? ''}
                    width={128}
                    height={128}
                    alt="thumbnail"
                    className="rounded"
                  />
                  <div>
                    <p className="text-2xl lg:text-4xl">{product.name}</p>
                    <p className="text-lg text-muted-foreground lg:text-xl">
                      {product.description}
                    </p>
                    <p className="text-lg text-muted-foreground lg:text-xl">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t('menu.settings')}>
            <CommandItem onSelect={switchLanguage}>
              <Languages className="mr-2 h-4 w-4" />
              <span>{t('menu.switchLanguage')}</span>
            </CommandItem>
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t('menu.profile')}</span>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>{t('menu.billing')}</span>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t('menu.settings')}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

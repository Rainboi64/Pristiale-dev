import { useState } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tables } from '@/lib/database.types';
import formatPrice from '@/utils/formatPrice';
import ItemDrawer from './ItemDrawer';
import { Button } from '../ui/button';
import { HeartIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import pristiale from '../../assets/images/statue-white.svg';

function ProductItem(props: { product: Tables<'products'>; variant?: 'big' }) {
  const { product } = props;
  const [focused, setFocused] = useState(false);
  const [t, { language }] = useTranslation();

  return (
    <Drawer shouldScaleBackground>
      <DrawerContent className="max-h-full overflow-hidden ">
        <ItemDrawer product={product} />
      </DrawerContent>
      <DrawerTrigger asChild>
        <div className="bebas-neue-regular flex flex-col gap-0 overflow-clip rounded ">
          <div className="flex-1">
            <HoverVideoPlayer
              muted
              unselectable="on"
              focused={focused}
              className="w"
              onHoverStart={() => setFocused(true)}
              onHoverEnd={() => setFocused(false)}
              videoSrc={product.preview ?? ''}
              controls={false}
              loadingOverlayWrapperClassName="flex justify-center items-center"
              loadingOverlay={
                <img
                  src={pristiale}
                  width={200}
                  className="animate-pulse stroke-white p-12"
                />
              }
              pausedOverlay={
                <>
                  <div className="absolute right-5 top-5">
                    <div className="flex items-center justify-center">
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={(e) => e.preventDefault()}
                      >
                        <HeartIcon />
                      </Button>
                    </div>
                  </div>
                  <img
                    src={product.thumbnail ?? ''}
                    alt="thumbnail"
                    className="h-full object-contain"
                  />
                </>
              }
              hoverOverlay={
                <>
                  <div className="absolute right-5 top-5">
                    <div className="flex items-center justify-center ">
                      <Button
                        variant={'ghost'}
                        size={'icon'}
                        onClick={(e) => e.preventDefault()}
                      >
                        <HeartIcon />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-5 w-full slide-in-from-top-3">
                    <div className="flex items-center justify-center text-3xl shadow-inner">
                      <p
                        className={cn(
                          language === 'en'
                            ? 'bebas-neue-regular'
                            : 'alexandria',
                        )}
                      >
                        {t('products.clickToPreview')}
                      </p>
                    </div>
                  </div>
                </>
              }
            />
          </div>
          <div className="bebas-neue-regular flex w-full flex-1 flex-row justify-end p-4 py-6 text-black ">
            <div className="flex-1">
              <p className="text-3xl">{product.name}</p>
              <p className="text-md">{product.description}</p>
            </div>
            <div className=" justify-center">
              <p className="text-2xl">{formatPrice(product.price)}</p>
            </div>
          </div>
        </div>
      </DrawerTrigger>
    </Drawer>
  );
}

export default ProductItem;

import { useState } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import { Tables } from '@/lib/database.types';
import formatPrice from '@/utils/formatPrice';
import ItemDrawer from './ItemDrawer';

function GalleryItem(props: { product: Tables<'products'> }) {
  const { product } = props;
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <Drawer shouldScaleBackground>
        <DrawerContent className="max-h-full overflow-hidden">
          <ItemDrawer product={product} />
        </DrawerContent>
        <DrawerTrigger asChild>
          <HoverVideoPlayer
            muted
            unselectable="on"
            className="overflow-clip rounded-xl"
            focused={focused}
            onHoverStart={() => setFocused(true)}
            onHoverEnd={() => setFocused(false)}
            videoSrc={product.preview ?? ''}
            pausedOverlay={
              <img
                src={product.thumbnail ?? ''}
                alt="thumbnail"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            }
            videoClassName="h-[400px]"
            hoverOverlay={
              <div className="flex h-full w-full flex-col items-center justify-end p-12">
                <p className="bebas-neue-regular text-center text-2xl shadow-inner">
                  {product.name}
                </p>
                <p className="bebas-neue-regular text-center text-sm shadow-inner">
                  {product.description}
                </p>
                <p className="bebas-neue-regular text-md text-center shadow-inner">
                  {formatPrice(product.price)}
                </p>
              </div>
            }
          />
        </DrawerTrigger>
      </Drawer>
    </div>
  );
}

export default GalleryItem;

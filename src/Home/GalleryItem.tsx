import { useState } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function GalleryItem(props: {
  video: string;
  thumbnail: string;
  title: string;
  subTitle: string;
  price: string;
}) {
  const { video, thumbnail, title, subTitle, price } = props;
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <Drawer shouldScaleBackground>
        <DrawerContent className="max-h-full overflow-hidden">
          <div className="bebas-neue-regular mx-auto w-full max-w-md p-4">
            <DrawerHeader>
              <DrawerTitle className="text-center text-5xl">
                {title}
              </DrawerTitle>
              <DrawerDescription className="text-center text-lg">
                BY PRISTIALE
              </DrawerDescription>
            </DrawerHeader>
          </div>
          <div className="bebas-neue-regular disable-scroll mx-auto h-full w-full max-w-md flex-wrap overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-4 p-4 pb-0">
              <video
                src={video}
                muted
                autoPlay
                loop
                poster={thumbnail}
                unselectable={'on'}
                disablePictureInPicture={true}
                //@ts-expect-error
                onPointerDown={(event) => event.target.pause()}
                //@ts-expect-error
                onPointerUp={(event) => event.target.play()}
                className="flex-shrink"
              />
              <p className="self-start text-3xl">{subTitle}</p>
              <p className="self-start text-2xl">{price}</p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs" disabled>
                    <p className="bebas-neue-regular">XS</p>
                  </SelectItem>
                  <SelectItem value="s" disabled>
                    <p className="bebas-neue-regular">S</p>
                  </SelectItem>
                  <SelectItem value="m" disabled>
                    <p className="bebas-neue-regular">M</p>
                  </SelectItem>
                  <SelectItem value="lg" disabled>
                    <p className="bebas-neue-regular">LG</p>
                  </SelectItem>
                  <SelectItem value="xl" disabled>
                    <p className="bebas-neue-regular">XL</p>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DrawerFooter>
              <Button disabled>Out of stock</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
        <DrawerTrigger asChild>
          <HoverVideoPlayer
            muted
            unselectable="on"
            className="overflow-clip rounded-xl"
            focused={focused}
            onHoverStart={() => setFocused(true)}
            onHoverEnd={() => setFocused(false)}
            videoSrc={video}
            pausedOverlay={
              <img
                src={thumbnail}
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
                  {title}
                </p>
                <p className="bebas-neue-regular text-center text-sm shadow-inner">
                  {subTitle}
                </p>
                <p className="bebas-neue-regular text-md text-center shadow-inner">
                  {price}
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

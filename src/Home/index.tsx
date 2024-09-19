import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import logo from '../assets/images/pristiale.svg';
import augustus from '../assets/videos/augustus.mp4';
import { Button } from '@/components/ui/button.tsx';

import theOriginalVideo from '@/assets/images/classics/the-original/preview.mp4';
import theOriginalThumbnail from '@/assets/images/classics/the-original/thumbnail.png';

import tailoredPantsVideo from '@/assets/images/classics/tailored-pants/preview.mp4';
import tailoredPantsThumbnail from '@/assets/images/classics/tailored-pants/thumbnail.jpeg';

import poloSweaterThumbnail from '@/assets/images/classics/polo-sweater/thumbnail.png';
import poloSweaterVideo from '@/assets/images/classics/polo-sweater/preview.mp4';

import GalleryItem from './GalleryItem.tsx';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel.tsx';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { renderer, animate } from './background.ts';

var intervalRewind: NodeJS.Timeout;
export default function App() {
  const [iframeOpacity, setIframeOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(1 - scrollY / 500, 0);
      setIframeOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.getElementById('background')!.appendChild(renderer.domElement);
  });

  useEffect(() => {
    if (iframeOpacity < 0.1) {
      renderer.setAnimationLoop(null);
    } else {
      renderer.setAnimationLoop(animate);
    }
  }, [iframeOpacity]);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex h-[100vh] items-center justify-center">
          <>
            <div
              title="background"
              className={styles.background}
              id="background"
              style={{
                opacity: iframeOpacity,
                transition: 'opacity 0.3s ease',
              }}
            />
            <div className="m-[auto] flex max-w-[50%] flex-col items-center justify-center">
              <img
                alt="pristiale logo"
                src={logo}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </>
        </div>

        <div className="mb-12 flex w-screen flex-col items-center justify-evenly gap-4 bg-white p-4">
          <p className="bebas-neue-regular text-center text-6xl text-background">
            Men's Essentials Collection
          </p>
          <p className="bebas-neue-regular text-center text-2xl text-background">
            Clean, Elegant, and Ambitious. Timeless Essentials Redefined by
            Pristiale
          </p>
          <Carousel
            className="gap-2 p-2"
            opts={{
              align: 'center',
              loop: true,
            }}
            plugins={[plugin.current]}
          >
            <CarouselContent>
              {Array.from(new Array(3)).map(() => (
                <>
                  <CarouselItem className="flex justify-center md:basis-1/5">
                    <GalleryItem
                      video={theOriginalVideo}
                      thumbnail={theOriginalThumbnail}
                      title={'The Original'}
                      subTitle={
                        '100% natural cotton, anything but a normal t-shirt.'
                      }
                      price={'410,000 SYP'}
                    />
                  </CarouselItem>
                  <CarouselItem className="flex justify-center md:basis-1/5">
                    <GalleryItem
                      video={tailoredPantsVideo}
                      thumbnail={tailoredPantsThumbnail}
                      title={'Serpent Trousers'}
                      subTitle={'100% Lenin Pleated Trousers'}
                      price={'902,000 SYP'}
                    />
                  </CarouselItem>
                  <CarouselItem className="flex justify-center md:basis-1/5">
                    <GalleryItem
                      video={poloSweaterVideo}
                      thumbnail={poloSweaterThumbnail}
                      title={'Cashmere Polo Sweater'}
                      subTitle={'100% Cashmere Polo Zipper Sweater'}
                      price={'1,200,500 SYP'}
                    />
                  </CarouselItem>
                </>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="flex w-screen flex-1 flex-row flex-wrap justify-evenly py-12">
          <video
            src={augustus}
            muted
            className="h-[60vh] max-w-[750px] content-center overflow-x-hidden text-white"
            style={{
              transition: 'transform 0.1s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(event) => {
              let x = event.target as HTMLVideoElement;
              clearInterval(intervalRewind);
              x.play();
            }}
            onMouseLeave={function (event) {
              let x = event.target as HTMLVideoElement;
              intervalRewind = setInterval(function () {
                x.playbackRate = 1.0;
                if (x.currentTime === 0) {
                  clearInterval(intervalRewind);
                  x.pause();
                } else {
                  x.currentTime += -0.1;
                }
              }, 30);
            }}
          />
          <div className="flex flex-col items-center justify-center">
            <p className={styles.title + ' text-[75px] lg:text-[115px]'}>
              Augustus
            </p>
            <p className={styles.subtitle}>limited pieces</p>

            <p className="items-center pt-4 text-justify">ORDER NOW</p>
            <div className="flex flex-row items-center gap-1">
              <Button variant="link">30ML</Button>/
              <Button variant="link">50ML</Button>/
              <Button variant="link">120ML</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p style={{ fontSize: 50, textAlign: 'center' }}>
            THE GENISIS COLLECTION
          </p>
          <p
            style={{
              fontSize: 14,
              textAlign: 'center',
              maxWidth: '50%',
            }}
          >
            Inspired by Augustus, the founder of the Roman Empire and its first
            emperor. Augustus represents leadership, vision, and the drive to
            build something great. This scent is for the natural leader who
            commands attention and inspires others.
          </p>
          <div className="flex w-screen flex-col items-center justify-center bg-white p-8">
            <Button variant="link" className="text-green text-2xl text-black">
              Foretell and order now.
            </Button>
            <p className="text-black">or</p>
            <Button variant="link" className="text-green text-2xl text-black">
              Buy as a gift.
            </Button>
          </div>
        </div>
        <div className="flex flex-row">
          <div className={styles.textContainer}>
            <div>SAGE</div>
            <div>JUNIPER</div>
            <div>CEDARWOOD</div>
            <div>AMBER</div>
            <div>INCENSE</div>
          </div>
        </div>
        <div className="flex w-screen flex-col items-center justify-center bg-white p-8">
          <p className="max-w-[50vw] text-center font-mono text-sm text-black">
            Copyright Notice © 2024 Pristiale All rights reserved. All content,
            including but not limited to text, graphics, logos, images, and
            designs, is the property of Pristiale and its affiliated brands. Any
            reproduction, distribution, or use of the materials without express
            written permission from Pristiale is strictly prohibited.
            Unauthorized use may result in legal action. For inquiries regarding
            permissions or licensing, please contact our team at
            legal@pristiale.com
          </p>
        </div>
      </div>
    </>
  );
}

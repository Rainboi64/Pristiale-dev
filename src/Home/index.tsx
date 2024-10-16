import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import logo from '../assets/images/pristiale.svg';
import augustus from '../assets/videos/augustus.mp4';
import { Button } from '@/components/ui/button.tsx';
import { renderer, animate } from './background.ts';
import { Link } from 'react-router-dom';
import Essentials from './Essentials.tsx';
import NavigationBar from '@/components/NavigationBar/NavigationBar.tsx';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils.ts';

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

  const [t, { language }] = useTranslation();

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
            <div className="alexandria m-[auto] flex max-w-[50%] flex-col items-center justify-center text-[700%]">
              <img
                alt="pristiale logo"
                src={logo}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </>
        </div>

        <NavigationBar />
        <Essentials />

        <div className="flex w-screen flex-1 flex-row flex-wrap justify-evenly py-12">
          <video
            controls={false}
            src={augustus}
            muted
            playsInline
            className={
              'h-[60vh] max-w-[750px] content-center overflow-x-hidden text-white'
            }
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
          <div className={cn('flex flex-col items-center justify-center')}>
            <p
              className={cn(
                styles.title,
                ' text-[75px] lg:text-[115px]',
                language === 'ar' ? 'alexandria' : '',
              )}
            >
              {t('perfumes.augustus')}
            </p>
            <p className={styles.subtitle}>{t('common.limitedPieces')}</p>

            <p className="items-center pt-4 text-justify">
              {t('common.orderNow')}
            </p>
            <div className="flex flex-row items-center gap-1">
              <Button variant="link">30ML</Button>/
              <Button variant="link">50ML</Button>/
              <Button variant="link">120ML</Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'flex flex-col items-center gap-4',
            language === 'ar' ? 'kufam' : '',
          )}
        >
          <p style={{ fontSize: 50, textAlign: 'center' }}>
            {t('collections.genesisCollection')}
          </p>
          <p
            style={{
              fontSize: 14,
              textAlign: 'center',
              maxWidth: '50%',
            }}
          >
            {t('collections.genesisCollectionDescription')}
          </p>
          <div
            className={
              'flex w-screen flex-col items-center justify-center bg-white p-8'
            }
          >
            <Link to="/test">
              <Button variant="link" className="text-green text-2xl text-black">
                {t('common.personalizeAPerfume')}
              </Button>
            </Link>
            <p className="text-black">{t('common.or')}</p>
            <Link to="/login">
              <Button variant="link" className="text-green text-2xl text-black">
                {t('common.buyAsAGift')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-row">
          <div className={styles.textContainer}>
            <div>{t('perfumes.sage')}</div>
            <div>{t('perfumes.juniper')}</div>
            <div>{t('perfumes.cedarwood')}</div>
            <div>{t('perfumes.amber')}</div>
            <div>{t('perfumes.incense')}</div>
          </div>
        </div>

        <div
          className={cn(
            'flex w-screen flex-col items-center justify-center bg-white p-8',
          )}
        >
          <p
            className={cn(
              'max-w-[50vw] text-center text-sm text-black',
              language === 'ar' ? 'tajawal-regular' : 'font-mono',
            )}
          >
            {t('common.copyright')}
          </p>
        </div>
      </div>
    </>
  );
}

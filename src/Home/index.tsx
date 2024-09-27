import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import logo from '../assets/images/pristiale.svg';
import augustus from '../assets/videos/augustus.mp4';
import { Button } from '@/components/ui/button.tsx';
import { renderer, animate } from './background.ts';
import { Link } from 'react-router-dom';
import Essentials from './Essentials.tsx';
import NavigationBar from '@/components/NavigationBar/NavigationBar.tsx';

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
            <Link to="/test">
              <Button variant="link" className="text-green text-2xl text-black">
                Personalize a perfume.
              </Button>
            </Link>
            <p className="text-black">or</p>
            <Link to="/login">
              <Button variant="link" className="text-green text-2xl text-black">
                Buy as a gift.
              </Button>
            </Link>
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

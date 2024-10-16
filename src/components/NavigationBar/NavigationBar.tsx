import React, { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';
import statue from '../../assets/images/statue-white.svg';
import logo from '../../assets/images/pristiale.svg';
import styles from '../../Home/Home.module.scss';
import { AvatarIcon, BackpackIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger } from '../ui/sheet';
import { Link } from 'react-router-dom';
import CartSheet from './CartSheet';
import supabase from '@/utils/supabase';
import { User } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import { LanguagesIcon } from 'lucide-react';
import i18next from 'i18next';

const components: { title: string; description: string }[] = [
  {
    title: 'Aurelius',
    description:
      'Inspired by Marcus Aurelius, the philosopher-king known for his wisdom and stoic demeanor. Aurelius is a scent that embodies calm introspection and inner strength, perfect for those who seek balance and clarity in life.',
  },
  {
    title: 'Caligula',
    description:
      'Named after Caligula, the controversial emperor known for his erratic behavior and audacity. This fragrance is for those who embrace their wild side and aren’t afraid to stand out, a scent that challenges norms and defies expectations.',
  },
  {
    title: 'Augustus',
    description:
      ' Inspired by Augustus, the founder of the Roman Empire and its first emperor. Augustus represents leadership, vision, and the drive to build something great. This scent is for the natural leader who commands attention and inspires others.',
  },
  {
    title: 'Livia',
    description:
      'Inspired by Livia Drusilla, the wife of Augustus and one of the most powerful women in Roman history. Livia is known for her elegance, intelligence, and subtle influence on Roman politics.',
  },
  {
    title: 'Theodora',
    description:
      'Named after Theodora, the Byzantine empress who rose from humble beginnings to become one of the most powerful women in the empire. Theodora is remembered for her intelligence, charisma, and determination. This scent is for those who are driven and unafraid to make their mark on the world.',
  },
  {
    title: 'Helena',
    description:
      ' Inspired by Helena, the mother of Constantine the Great and a significant figure in early Christianity. Helena is known for her piety, compassion, and wisdom. This fragrance is for those who value spirituality and kindness, embodying a deep sense of inner peace.',
  },
];

const arComponents: { title: string; description: string }[] = [
  {
    title: 'أوريليوس',
    description:
      'مستوحى من ماركوس أوريليوس، الملك الفيلسوف المعروف بحكمته وهدوئه الرزين. أوريليوس هو عطر يجسد التأمل الهادئ والقوة الداخلية، مثالي لأولئك الذين يسعون لتحقيق التوازن والوضوح في الحياة.',
  },
  {
    title: 'كاليغولا',
    description:
      'سُمي على اسم كاليغولا، الإمبراطور المثير للجدل المعروف بسلوكه المتقلب وجرأته. هذا العطر مخصص لأولئك الذين يحتضنون جانبهم الجامح ولا يخشون التميز، وهو عطر يتحدى الأعراف ويتجاوز التوقعات.',
  },
  {
    title: 'أغسطس',
    description:
      'مستوحى من أغسطس، مؤسس الإمبراطورية الرومانية وأول إمبراطور لها. يمثل أغسطس القيادة والرؤية والدافع لبناء شيء عظيم. هذا العطر مخصص للقائد الطبيعي الذي يجذب الانتباه ويلهم الآخرين.',
  },
  {
    title: 'ليفيا',
    description:
      'مستوحى من ليفيا دروسيلا، زوجة أغسطس وإحدى أقوى النساء في التاريخ الروماني. ليفيا معروفة بأناقتها وذكائها وتأثيرها الخفي على السياسة الرومانية.',
  },
  {
    title: 'ثيودورا',
    description:
      'سُمي على اسم ثيودورا، الإمبراطورة البيزنطية التي ارتقت من أصول متواضعة لتصبح واحدة من أقوى النساء في الإمبراطورية. ثيودورا معروفة بذكائها وجاذبيتها وإصرارها. هذا العطر مخصص لأولئك الذين يملكون العزيمة ولا يخشون ترك بصمتهم على العالم.',
  },
  {
    title: 'هيلينا',
    description:
      'مستوحى من هيلينا، والدة قسطنطين الكبير وشخصية بارزة في المسيحية المبكرة. هيلينا معروفة بتقواها وتعاطفها وحكمتها. هذا العطر مخصص لأولئك الذين يقدرون الروحانية واللطف، ويجسد شعورًا عميقًا بالسلام الداخلي.',
  },
];
export default function NavigationBar() {
  const [t, { language }] = useTranslation();

  const [user, setUser] = useState<User>();
  const fetchData = async () => {
    const response = await supabase.auth.getUser();
    if (!response) {
      return;
    }

    const { user } = response.data;
    if (!user) {
      return;
    }
    setUser(user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={cn(
        'helvetica sticky top-0 z-10 flex w-screen bg-black p-2',
        language === 'en' ? 'helvetica' : 'tajawal-medium',
      )}
    >
      <div className="flex flex-1  items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {t('menu.collections')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.35fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full select-none flex-col items-center justify-center rounded-md  py-2"
                        href="/"
                      >
                        <img src={statue} height={128} width={128} />
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/" title={t('menu.essentialsCollection')}>
                    {t('menu.essentialsCollectionSubtitle')}
                  </ListItem>
                  <ListItem href="/" title={t('menu.newSeason')}>
                    {t('menu.newSeasonSubtitle')}
                  </ListItem>
                  <ListItem href="/" title={t('menu.allItems')}>
                    {t('menu.allItemsSubtitle')}
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {t('menu.perfumes')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-[.75fr_1fr] ">
                  <li className="overflow-hidden lg:col-span-2 ">
                    <NavigationMenuLink asChild href="/test">
                      <a
                        className=" flex w-full select-none flex-col items-center justify-end rounded-md p-6 no-underline outline-none hover:bg-accent"
                        href="/"
                      >
                        <p
                          className={cn(
                            'line-clamp-2 text-sm leading-snug text-muted-foreground',
                            language === 'ar'
                              ? 'alexandria'
                              : 'bebas-neue-regular',
                          )}
                        >
                          {t('menu.takeATest')}
                        </p>
                        <p
                          className={cn(
                            styles.title,
                            'text-nowrap text-2xl',
                            language === 'ar'
                              ? 'alexandria'
                              : 'bebas-neue-regular',
                          )}
                        >
                          {t('menu.personalizeAPerfume')}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>

                  {(language === 'ar' ? arComponents : components).map(
                    (component) => (
                      <ListItem key={component.title} title={component.title}>
                        {component.description}
                      </ListItem>
                    ),
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <img
          width={64}
          height={64}
          alt="pristiale logo"
          className="max-sm:hidden"
          src={logo}
        />
      </div>
      <div className="flex flex-1 items-center  justify-center ">
        <Sheet>
          <SheetTrigger>
            {user ? (
              <Button variant={'ghost'}>
                <BackpackIcon />
              </Button>
            ) : null}
          </SheetTrigger>
          <CartSheet />
        </Sheet>
        {user ? null : (
          <Link to={'/login'}>
            <Button variant={'ghost'}>
              <AvatarIcon />
            </Button>
          </Link>
        )}
        <Button
          variant={'ghost'}
          onClick={
            language === 'en'
              ? () => {
                  i18next.changeLanguage('ar');
                }
              : () => {
                  i18next.changeLanguage('en');
                }
          }
        >
          <LanguagesIcon className="p-1" />
        </Button>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

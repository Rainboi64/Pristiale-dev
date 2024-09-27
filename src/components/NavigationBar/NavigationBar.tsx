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

export default function NavigationBar() {
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
    <div className="helvetica sticky top-0 z-10 flex w-screen bg-black p-2">
      <div className="flex flex-1  items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
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
                  <ListItem href="/" title="Essentials Collection">
                    Timeless classics, reintroduced by pristiale.
                  </ListItem>
                  <ListItem href="/" title="New Season">
                    Newest peices designed for the new season by pristiale.
                  </ListItem>
                  <ListItem href="/" title="All Items">
                    Browse pristiale's store for desginer goods.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Perfumes</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-[.75fr_1fr] ">
                  <li className="overflow-hidden lg:col-span-2 ">
                    <NavigationMenuLink asChild href="/test">
                      <a
                        className=" flex w-full select-none flex-col items-center justify-end rounded-md p-6 no-underline outline-none hover:bg-accent"
                        href="/"
                      >
                        <p className="alexandria line-clamp-2 text-sm leading-snug text-muted-foreground">
                          اجر الاختبار
                        </p>
                        <p
                          className={cn(
                            styles.title,
                            'alexandria text-nowrap text-2xl',
                          )}
                        >
                          انشئ العطر الخاص بك
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>

                  {components.map((component) => (
                    <ListItem key={component.title} title={component.title}>
                      {component.description}
                    </ListItem>
                  ))}
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
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { buttonMsg } from '@/constants/messages';
import { routes } from '@/constants/routes';
import { cn } from '@/lib/utils';
import {
  ChevronRight,
  ClipboardList,
  Fingerprint,
  Heart,
  MapPin,
  UserCircle2,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { label: buttonMsg.toUserInfo, icon: UserCircle2, href: routes.mypageUserInfo },
  { label: buttonMsg.toAddressList, icon: MapPin, href: routes.mypageAddressList },
  { label: buttonMsg.toFavoriteProducts, icon: Heart, href: routes.mypageFavoriteProducts },
  { label: buttonMsg.toPaymentMethods, icon: Wallet, href: routes.mypagePaymentMethods },
  { label: buttonMsg.toOrderHistory, icon: ClipboardList, href: routes.mypageOrderHistory },
  {
    label: buttonMsg.toPasskeyAuthSetup,
    icon: Fingerprint,
    href: routes.mypagePasskeyAuthSetup,
  },
];

const MypageMenuList = () => {
  return (
    <Card className="w-full py-0">
      <ul className="border-b-0">
        {menuItems.map((item, index: number) => {
          const isLast = index === menuItems.length - 1;

          return (
            <li key={item.label} className={cn(!isLast && 'border-b')}>
              <Button
                type="button"
                className="text-default hover:text-foreground flex h-[52px] w-full items-center justify-between gap-3 bg-white px-4 py-3.5 text-left transition-colors hover:bg-white hover:opacity-65"
                asChild
              >
                <Link href={item.href}>
                  <span className="flex items-center gap-3 text-sm">
                    <item.icon className="text-foreground size-5" aria-hidden="true" />
                    {item.label}
                  </span>
                  <ChevronRight
                    className="text-muted-foreground size-4 shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default MypageMenuList;

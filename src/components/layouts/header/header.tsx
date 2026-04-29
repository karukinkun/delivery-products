'use client';
import { authStore } from '@/lib/store/authStore';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  return (
    <header className="h-[120px]">
      <div className="h-[80px]">
        <div className="mx-auto flex items-center justify-between px-4 sm:px-6 md:px-6 lg:max-w-[1024px] lg:px-4">
          <h1 className="relative flex items-center">
            <Link href="/" className="block text-center">
              <div className="relative h-[70px] w-[140px]">
                <Image
                  fill
                  className="object-contain"
                  src="/icon_logo.svg"
                  alt="サービスロゴ"
                  priority
                />
              </div>
            </Link>
          </h1>
          <ul className="flex items-center justify-end">
            <li className="mr-3">
              {isAuthenticated ? (
                <Link href="/login" className="block text-center">
                  <Image
                    className="m-auto h-[29px] w-[26px]"
                    src="/icon_user.svg"
                    alt="マイページ"
                    width={26}
                    height={29}
                  />
                  <span className="block pt-1 text-[0.8rem] text-gray-400">マイページ</span>
                </Link>
              ) : (
                <Link href="/login" className="block text-center">
                  <Image
                    className="m-auto h-[29px] w-[26px]"
                    src="/icon_login.svg"
                    alt="ログイン"
                    width={26}
                    height={29}
                  />
                  <span className="block pt-1 text-[0.8rem] text-gray-400">ログイン</span>
                </Link>
              )}
            </li>
            <li>
              <Link href="/cart" className="block text-center">
                <Image
                  className="m-auto h-[29px] w-[26px]"
                  src="/icon_cart.svg"
                  alt="カートを見る"
                  width={26}
                  height={29}
                />
                <span className="block pt-1 text-[0.8rem] text-gray-400">カート</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

// コンポーネントをデフォルトエクスポートする必要がある
export default Header;

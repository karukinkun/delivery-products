import Image from 'next/image';
import Link from 'next/link';

const logoImageWidth = 200;
const logoImageHeight = 70;

const Header = () => {
  return (
    <header className="h-[120px]">
      <div className="h-[80px]">
        <div className="mx-auto flex max-w-[1024px] items-center justify-between">
          <h1 className="flex items-center">
            <Link href="/" className="block text-center">
              <Image
                width={logoImageWidth}
                height={logoImageHeight}
                src="/icon_logo.svg"
                alt="サービスロゴ"
                priority
                className={`h-auto w-[${logoImageWidth}px]`}
              />
            </Link>
          </h1>
          <ul className="flex items-center justify-end">
            <li className="mr-3">
              <Link href="/login" className="block text-center">
                <Image
                  className="m-auto h-[29px] w-[26px]"
                  src="/icon_login.svg"
                  alt="ログインする"
                  width={26}
                  height={29}
                />
              </Link>
              <span className="block pt-1 text-[0.8rem] text-gray-400">ログイン</span>
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
              </Link>
              <span className="block pt-1 text-[0.8rem] text-gray-400">カート</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

// コンポーネントをデフォルトエクスポートする必要がある
export default Header;

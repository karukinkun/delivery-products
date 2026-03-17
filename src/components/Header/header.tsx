import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className="h-[120px]">
      <div className="h-[80px]">
        <div className="flex items-center justify-between max-w-[1080px] mx-auto">
          <h1 className="h-[80px] flex items-center">
            <Image
              className="block"
              // 画像のソースパス
              src="/logo.svg"
              // 画像の代替テキスト
              alt="logo image"
              // 画像の幅
              width={182}
              // 画像の高さ
              height={42}
              // 優先的に読み込むように設定
              priority
            />
          </h1>
          <ul className="flex items-center justify-end">
            <li className="mr-3">
              <Link href="/" className="block text-center">
                <Image
                  className="m-auto"
                  // 画像のソースパス
                  src="/icon_cart.svg"
                  // 画像の代替テキスト
                  alt="logo image"
                  // 画像の幅
                  width={26}
                  // 画像の高さ
                  height={29}
                  // 優先的に読み込むように設定
                  priority
                />
              </Link>
              <span className="block pt-1 text-[0.8rem] text-gray-400">ログイン</span>
            </li>
            <li>
              <Link href="/" className="block text-center">
                <Image
                  className="m-auto"
                  // 画像のソースパス
                  src="/icon_cart.svg"
                  // 画像の代替テキスト
                  alt="logo image"
                  // 画像の幅
                  width={26}
                  // 画像の高さ
                  height={29}
                  // 優先的に読み込むように設定
                  priority
                />
              </Link>
              <span className="block pt-1 text-[0.8rem] text-gray-400">ログイン</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

// コンポーネントをデフォルトエクスポートする必要がある
export default Header;

import LoginPage from '@/app/login/page';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">
            <div>aaa</div>
            <LoginPage />
          </Link>
        </li>
      </ul>
    </div>
  );
}

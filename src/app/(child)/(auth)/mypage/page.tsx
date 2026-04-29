'use client';

import MypageMenuList from '@/app/(child)/(auth)/mypage/_components/mypage-menu-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { routes } from '@/constants/routes';
import { getUserClientApi } from '@/lib/api/users';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MyPage = () => {
  const router = useRouter();
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['currentUser'], // キャッシュキー
    queryFn: getUserClientApi,
    staleTime: 30_000, // 30秒ごとにキャッシュを更新
  });

  if (isPending) {
    return <div>読み込み中...</div>;
  }

  if (isError) {
    setTimeout(() => {
      router.replace(routes.login);
    }, 3000);

    return (
      <div>
        ユーザー情報の取得に失敗しました
        <br />
        自動でログインページに切り替わります。
      </div>
    );
  }

  // queryClient.invalidateQueries({ queryKey: ['currentUser'] });

  return (
    <div className="w-full">
      <h1 className="mb-6 text-center text-2xl font-bold">
        {user.last_name} {user.first_name} 様
      </h1>
      <div className="mb-16">
        <div className="text-1xl mb-4 text-center">現在の会員ランク</div>
        <div className="relative mx-auto aspect-square w-[140px] overflow-hidden">
          <Image
            src={user.rank.image_url}
            alt="会員ランク画像"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cove"
            priority
          />
        </div>
        <div className="text-1xl mb-4 text-center">
          あなたのポイント倍率は
          <span className="text-primary text-2xl font-bold">{user.rank.point_rate}倍</span>です。
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <h1 className="text-sm font-bold">クーポン数</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-bold">5 枚</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <h1 className="text-sm font-bold">ポイント数</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-bold">{user.points} ポイント</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-4">
        <MypageMenuList />
      </div>
    </div>
  );
};

export default MyPage;

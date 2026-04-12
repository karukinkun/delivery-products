import { Amplify } from 'aws-amplify';

const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID?.trim() ?? '';
const userPoolClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID?.trim() ?? '';

// 下記のように直代入すると正常動作する
// const userPoolId = 'ap-northeast-3_RAQ9tY8FM';
// const userPoolClientId = '4g2s1s8sp4a0le8oo1aa93kjbf';

console.log('userPoolId, userPoolClientId');
console.log(userPoolId, userPoolClientId);

if (userPoolId && userPoolClientId) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
      },
    },
  });
} else if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console -- 未設定時に原因を特定しやすくする
  console.error(
    '[Amplify] Cognito の環境変数が空です。.env に設定し、pnpm dev を再起動してください。\n' +
      'NEXT_PUBLIC_COGNITO_USER_POOL_ID（例: ap-northeast-3_xxxx）\n' +
      'NEXT_PUBLIC_COGNITO_CLIENT_ID（アプリクライアント ID）',
  );
}

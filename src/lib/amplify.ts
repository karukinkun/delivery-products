import { Amplify } from 'aws-amplify';

const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID?.trim() ?? '';
const userPoolClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID?.trim() ?? '';

if (userPoolId && userPoolClientId) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
      },
    },
  });

  console.log('[Amplify] Cognito の環境変数が設定されています。', userPoolId, userPoolClientId);
} else if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console -- 未設定時に原因を特定しやすくする
  console.error(
    '[Amplify] Cognito の環境変数が空です。.env に設定し、pnpm dev を再起動してください。\n' +
      'NEXT_PUBLIC_COGNITO_USER_POOL_ID（例: ap-northeast-3_xxxx）\n' +
      'NEXT_PUBLIC_COGNITO_CLIENT_ID（アプリクライアント ID）',
  );
}

import { account, OAuthProvider } from '@/lib/appwrite';

export const handleOAuthLogin = () => {
  account.createOAuth2Session({
    provider: OAuthProvider.Google,
    success: import.meta.env.VITE_OAUTH_SUCCESS_URL,
  });
};

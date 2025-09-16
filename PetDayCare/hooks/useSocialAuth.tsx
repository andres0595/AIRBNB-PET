import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { useEffect } from "react";
import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth(onSuccess: (token: string) => void) {
  const { androidClientId } = Constants.expoConfig?.extra || {};
  const { webClientId } = Constants.expoConfig?.extra || {};
  const [request, response, promptAsync] = Google.useAuthRequest({
    //expoClientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
    //iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: androidClientId,
    webClientId: webClientId,
  });
  useEffect(() => {
    if (response?.type === "success") {
      const token = response.authentication?.idToken;
      if (token) onSuccess(token);
    }
  }, [response]);
  return { promptAsync };
}
export function useFacebookAuth(onSuccess: (token: string) => void) {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID!,
  });
  useEffect(() => {
    if (response?.type === "success") {
      const token = response.authentication?.accessToken;
      if (token) onSuccess(token);
    }
  }, [response]);
  return { promptAsync };
}

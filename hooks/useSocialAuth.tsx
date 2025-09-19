import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth(onSuccess: (token: string) => void) {
  const { androidClientId, iosClientId, webClientId } =
    Constants.expoConfig?.extra || {};

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
    iosClientId,
    webClientId, // usado en Expo Go o web
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

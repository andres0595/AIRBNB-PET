import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthLayoutProps {
  children: React.ReactNode;
  contentStyle?: ViewStyle;
}

export default function AuthLayout({
  children,
  contentStyle,
}: AuthLayoutProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = (e: any) => {
      const h = e.endCoordinates ? e.endCoordinates.height : 0;
      setKeyboardHeight(h);
    };
    const onHide = () => setKeyboardHeight(0);

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={[
          {
            flexGrow: 1,
            paddingBottom: keyboardHeight > 0 ? keyboardHeight + 20 : 20,
          },
          contentStyle,
        ]}
        enableOnAndroid
        extraScrollHeight={Platform.OS === "android" ? 100 : 20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

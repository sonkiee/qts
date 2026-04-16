import { AdmobConfig } from "@/config/admob";
import { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : AdmobConfig.interstitial;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

export const useInterstitialAd = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        if (Platform.OS === "ios") {
          // Prevent the close button from being unreachable by hiding the status bar on iOS
          StatusBar.setHidden(true);
        }
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false); // Reset loaded state when the ad is closed
        interstitial.load();
        if (Platform.OS === "ios") {
          StatusBar.setHidden(false);
        }
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
    };
  }, []);

  // No advert ready to show yet
  //   if (!loaded) {
  //     return null;
  //   }

  const showInterstitialAd = () => {
    if (!loaded) {
      interstitial.load(); // Attempt to load the ad if it's not loaded yet
      console.log("Ad not loaded yet");
      return; // silently ignore
    }

    try {
      interstitial.show();
    } catch (error) {
      console.log("Error showing interstitial ad:", error);
      // Handle the error, e.g., by showing a fallback UI or retrying
    }
  };

  return { showInterstitialAd, loaded };
};

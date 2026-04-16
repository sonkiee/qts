import { AdmobConfig } from "@/config/admob";
import { useEffect, useRef, useState } from "react";
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.REWARDED : AdmobConfig.rewardedAd;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

export const useRewardedAd = () => {
  const [loaded, setLoaded] = useState(false);

  // store callback safely per show
  const rewardCallback = useRef<null | (() => void)>(null);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);

        if (rewardCallback.current) {
          rewardCallback.current();
          rewardCallback.current = null;
        }

        setLoaded(false); // Reset loaded state when reward is earned
        rewarded.load(); // Load the next ad
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // No advert ready to show yet
  //   if (!loaded) {
  //     return null;
  //   }

  const showRewardedAd = (onEarned?: () => void) => {
    if (!loaded) {
      rewarded.load(); // Try loading again if not loaded
      console.log("Rewarded ad not loaded yet, loading...");
      return;
    }

    rewardCallback.current = onEarned ?? null;

    try {
      rewarded.show();
    } catch (error) {
      console.error("Failed to show rewarded ad", error);
    }
  };

  return { showRewardedAd, loaded };
};

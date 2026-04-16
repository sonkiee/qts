import { AdmobConfig } from "@/config/admob";
import { useRef } from "react";
import { Platform } from "react-native";
import {
  BannerAdSize,
  BannerAd as BannerAdsProp,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : AdmobConfig.banner;

export const BannerAd = () => {
  const bannerRef = useRef<BannerAdsProp>(null);

  useForeground(() => Platform.OS === "android" && bannerRef.current?.load());
  return (
    <BannerAdsProp
      ref={bannerRef}
      unitId={adUnitId}
      size={BannerAdSize.BANNER}
      //   requestOptions={{
      //     requestNonPersonalizedAdsOnly: true,
      //   }}
    />
  );
};

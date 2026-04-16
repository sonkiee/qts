import { Platform } from "react-native";

export const AdmobConfig = {
  banner: Platform.select({
    ios: "",
    android: "ca-app-pub-9176654196604776/9028496759",
    default: "ca-app-pub-9176654196604776/9028496759",
  }),
  interstitial: Platform.select({
    ios: "",
    android: "ca-app-pub-9176654196604776/1237424618",
    default: "ca-app-pub-9176654196604776/1237424618",
  }),
  rewardedAd: Platform.select({
    ios: "",
    android: "ca-app-pub-9176654196604776/5719595105",
    default: "ca-app-pub-9176654196604776/5719595105",
  }),
};

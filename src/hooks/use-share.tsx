import { Share } from "react-native";

export const useShare = () => {
  const shareQuote = async (quote: string) => {
    try {
      await Share.share({
        message: quote,
      });
    } catch (error) {
      console.error("Error sharing quote:", error);
    }
  };

  return { shareQuote };
};

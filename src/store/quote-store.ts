import { quotes } from "@/constants/quotes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type QuoteStore = {
  quotes: string[];
  liked: string[];

  index: number;

  quote: string;

  nextQuote: () => void;
  prevQuote: () => void;

  toggleLike: (quote: string) => void;

  isLiked: (quote: string) => boolean;

  setIndex: (index: number) => void;
  //   currentQuote: string;
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      quotes,
      index: 0,
      quote: quotes[0],

      liked: [],

      isLiked: (quote) => get().liked.includes(quote),

      toggleLike: (quote) => {
        const { liked } = get();

        const updated = liked.includes(quote)
          ? liked.filter((q) => q !== quote)
          : [...liked, quote];

        set({ liked: updated });
      },

      setIndex: (i) =>
        set({
          index: i,
          quote: quotes[i],
        }),

      nextQuote: () => {
        const { index, quotes } = get();
        const nextIndex = (index + 1) % quotes.length;

        set({
          index: nextIndex,
          quote: quotes[nextIndex],
        });
      },

      prevQuote: () => {
        const { index, quotes } = get();
        const prevIndex = (index - 1 + quotes.length) % quotes.length;

        set({
          index: prevIndex,
          quote: quotes[prevIndex],
        });
      },
    }),
    {
      name: "quote-store",
      storage: createJSONStorage(() => AsyncStorage), // or any other storage mechanism
    },
  ),
);

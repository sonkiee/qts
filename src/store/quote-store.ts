import { quotes } from "@/constants/quotes";
import { shuffleArray } from "@/utils/shuffle";
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

  // ---- Rewarded Ad logic ----
  canGoBack: () => boolean;
  unlockPrev: () => void;
};

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => {
      const shuffledQuotes = shuffleArray(quotes); // You can shuffle the quotes here if needed

      return {
        quotes: shuffledQuotes,
        index: 0,
        quote: shuffledQuotes[0],

        liked: [],

        isLiked: (quote) => get().liked.includes(quote),

        toggleLike: (quote) => {
          const { liked } = get();

          const updated = liked.includes(quote)
            ? liked.filter((q) => q !== quote)
            : [...liked, quote];

          set({ liked: updated });
        },

        canGoBack: () => {
          const { index } = get();
          return index > 0;
        },

        unlockPrev: () => {
          const { index, quotes } = get();
          // unlock all previous quotes (allow going back fully)
          set({ index: quotes.length - 1, quote: quotes[quotes.length - 1] });
          // optional: you could also implement a separate "unlockedHistory" array if you want fine-grained control
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
      };
    },
    {
      name: "quote-store",
      storage: createJSONStorage(() => AsyncStorage), // or any other storage mechanism
    },
  ),
);

import create from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

type UserPreferences = {
  prefersSound: boolean;
  toggleSoundPreference(newVal?: boolean): void;

  theme: Theme;
  toggleTheme(newTheme?: Theme): void;
};

export const usePersistedStore = create<UserPreferences>(
  persist(
    (set, get) => ({
      prefersSound: true,
      theme: (localStorage.theme as Theme) ?? 'light',

      toggleSoundPreference: function (newVal?: boolean) {
        set((state) => ({
          ...state,
          prefersSound: newVal ?? !state.prefersSound,
        }));
      },

      toggleTheme: function (newTheme?: Theme) {
        const theme = newTheme ?? get().theme === 'dark' ? 'light' : 'dark';

        if (theme === 'light') {
          document.querySelector('html')?.classList.remove('dark');
          localStorage.theme = 'light';
        } else {
          document.querySelector('html')?.classList.add('dark');
          localStorage.theme = 'dark';
        }

        set((state) => ({
          ...state,
          theme,
        }));
      },
    }),
    {
      name: 'spesql-preferences',
    }
  )
);

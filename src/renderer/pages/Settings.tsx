import React from 'react';
import BackButton from '../components/buttons/BackButton';
import shallow from 'zustand/shallow';
import { usePersistedStore } from '../../stores/persisted';
import { Heading, Radio } from '@flmnh-mgcl/ui';

// use the component in your app!

export default function Settings() {
  const {
    toggleSoundPreference,
    prefersSound,
    theme,
    toggleTheme,
  } = usePersistedStore(
    (state) => ({
      toggleSoundPreference: state.toggleSoundPreference,
      prefersSound: state.prefersSound,
      theme: state.theme,
      toggleTheme: state.toggleTheme,
    }),
    shallow
  );

  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        <BackButton to="/home" />
      </div>

      <div className="h-screen flex items-center">
        <div className="mx-auto w-full max-w-lg py-8 px-10 bg-white dark:bg-dark-700   shadow rounded-lg">
          <Heading className="pb-2.5">Settings</Heading>

          <div className="flex flex-row space-x-4 items-center">
            <Radio
              label="Mute Notifications"
              onChange={() => toggleSoundPreference()}
              checked={!prefersSound}
            />

            <Radio
              label="Dark Theme"
              onChange={() => toggleTheme()}
              checked={theme === 'dark'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

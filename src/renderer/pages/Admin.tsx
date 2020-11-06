import React, { useEffect } from 'react';
import Heading from '../components/ui/Heading';
import Text from '../components/ui/Text';
import { useStore } from '../../stores';
import shallow from 'zustand/shallow';
import BackButton from '../components/buttons/BackButton';

import adminBanner from '../assets/svg/admin_banner.svg';

export default function Admin() {
  const { user } = useStore((state) => ({ user: state.user }), shallow);

  useEffect(() => {
    if (!user || user.accessRole !== 'admin') {
      throw new Error("WOAH! Now that's not allowed!");
    }
  }, [user]);

  return (
    <div className="relative h-screen flex justify-center p-4">
      <div className="absolute top-4 left-4">
        <BackButton to="/home" />
      </div>

      <div className="flex flex-col text-center space-y-4 mt-4">
        <Heading size="massive" tag="h2" className="mb-3">
          Welcome, @{user?.username}
        </Heading>

        <img className="mt-4 object-scale-down h-60 mb-3" src={adminBanner} />

        <Text>Below are the available resources you can manage</Text>
      </div>
    </div>
  );
}

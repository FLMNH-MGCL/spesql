import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';
import Text from '../components/ui/Text';

import fourohfour from '../assets/svg/fourohfour.svg';

export default function Lost() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <img src={fourohfour} />

        <div className="flex flex-col text-center space-y-4 mt-4">
          <Heading size="massive" tag="h2">
            Woah there!
          </Heading>
          <Text>
            Not sure how you got here, but no worries! You can click that button
            down below to go back!
          </Text>

          <div>
            <Button variant="danger" onClick={() => navigate('/home')}>
              Take me home!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

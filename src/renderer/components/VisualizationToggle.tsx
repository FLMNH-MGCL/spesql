import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Switch } from '@flmnh-mgcl/ui';

export default function VisualizationToggle() {
  const location = useLocation();
  const navigate = useNavigate();

  function toggle() {
    if (location.pathname === '/home') {
      navigate('/home/visualization');
    } else {
      navigate('/home');
    }
  }

  return (
    <div className="flex space-x-2 items-center dark:text-dark-200">
      <p>Table</p>
      <Switch
        enabled={location.pathname === '/home/visualization'}
        onToggle={toggle}
      />
      <p>Charts</p>
    </div>
  );
}

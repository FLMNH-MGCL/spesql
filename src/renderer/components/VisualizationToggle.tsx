import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Switch from './ui/Switch';

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
    <div className="flex space-x-2 items-center">
      <p>Table</p>
      <Switch
        enabled={location.pathname === '/home/visualization'}
        onToggle={toggle}
      />
      <p>Charts</p>
    </div>
  );
}

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Switch from './ui/Switch';

export default function VisualizationToggle() {
  const location = useLocation();
  const navigate = useNavigate();

  function toggle() {
    if (location.pathname === '/') {
      navigate('visualization');
    } else {
      navigate('/');
    }
  }

  return (
    <div className="flex space-x-2 items-center">
      <p>Table</p>
      <Switch
        enabled={location.pathname === '/visualization'}
        onToggle={toggle}
      />
      <p>Charts</p>
    </div>
  );
}

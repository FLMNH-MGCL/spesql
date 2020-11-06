import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/buttons/BackButton';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex justify-center p-4">
      <div className="absolute top-4 left-4">
        <BackButton to="/home" />
      </div>
    </div>
  );
}

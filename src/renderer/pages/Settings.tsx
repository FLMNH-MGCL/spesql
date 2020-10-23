import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/home')}>go home</button>
    </div>
  );
}

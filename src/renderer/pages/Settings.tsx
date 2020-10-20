import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  // navigate("/");
  return (
    <div>
      <button onClick={() => navigate('..')}>go home</button>
    </div>
  );
}

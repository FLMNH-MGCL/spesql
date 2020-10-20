import React, { FormEvent } from 'react';
import flmnhLogo from '../assets/flmnhLogo.png';
import Heading from '../components/ui/Heading';

export default function SignIn() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <div className="max-w-xl justify-center">
      <Heading>Welcome to SpeSQL!</Heading>
      <img src={flmnhLogo} />
      <p>
        The database management application for the Florida Museum of Natural
        History
      </p>

      <div>
        Don't have an account? You can{' '}
        <a href="mailto:kawahara@flmnh.ufl.edu">request</a> one here.
      </div>

      <form onSubmit={handleSubmit}>yo</form>
    </div>
  );
}

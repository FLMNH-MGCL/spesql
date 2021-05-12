import React, { ComponentProps } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useStore } from '../../stores';
import { PropsOf } from '../types';
import shallow from 'zustand/shallow';

function RouteElement({ element }: ComponentProps<typeof Route>) {
  const { user } = useStore((state) => ({ user: state.user }), shallow);

  console.log(user);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  // allowed to go to route
  return element ?? null;
}

export default function AuthRoute({ element, path }: PropsOf<typeof Route>) {
  return <Route path={path} element={<RouteElement element={element} />} />;
}

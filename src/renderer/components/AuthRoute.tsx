import React, { ComponentProps } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useMst } from '../../models';
import { PropsOf } from '../types';

function RouteElement({ element }: ComponentProps<typeof Route>) {
  const store = useMst();

  const { user } = store.session;

  // not logged in
  // if (!user) {
  //   return <Navigate to="/signin" />;
  // }

  // allowed to go to route
  return element ?? null;
}

export default function AuthRoute({ element, path }: PropsOf<typeof Route>) {
  return <Route path={path} element={<RouteElement element={element} />} />;
}

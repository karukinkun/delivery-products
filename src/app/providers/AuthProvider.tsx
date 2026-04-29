'use client';

import '@/lib/amplify';

import { authStore } from '@/lib/store/authStore';
import { getCurrentUser } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const setAuthChecking = authStore((state) => state.setAuthChecking);
  const setAuthenticated = authStore((state) => state.setAuthenticated);
  const setUnauthenticated = authStore((state) => state.setUnauthenticated);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      setAuthChecking();

      try {
        const user = await getCurrentUser();

        if (!isMounted) return;

        setAuthenticated(user);
      } catch {
        if (!isMounted) return;

        setUnauthenticated();
      }
    };

    void checkAuth();

    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          void checkAuth();
          return;

        case 'signedOut':
          setUnauthenticated();
          return;

        case 'tokenRefresh':
          void checkAuth();
          return;

        case 'tokenRefresh_failure':
          setUnauthenticated();
          return;

        default:
          return;
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [setAuthChecking, setAuthenticated, setUnauthenticated]);

  return <>{children}</>;
};

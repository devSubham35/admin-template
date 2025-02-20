import { useRouter } from 'next/router';
import React, { useEffect, ComponentType } from 'react';
import { isAuthenticated } from './isAuthenticated';

const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const auth = isAuthenticated;

    useEffect(() => {
      if (!auth) {
        router.push('/');
      }
    }, [auth, router]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };

  return WithAuth;
};

export default withAuth;

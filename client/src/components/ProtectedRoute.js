import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import history from '../history';

const ProtectedRoute = ({ component, ...rest }) => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      history.replace('/login');
    } else if (user && !user.isAdmin) {
      history.goBack();
    }
  }, [user]);

  return <Route {...rest} component={component} />;
};

export default ProtectedRoute;

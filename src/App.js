import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from './components/loaders';

const WelcomeApp = lazy(() => import('./containers/welcome'));
const HomeApp = lazy(() => import('./containers/home'));

export default function App() {
  const session = useSelector((state) => state.session);

  const isAuthenticated = !!((session.authToken && session.authToken.length !== 0));
  return (
    <Router>
      <Suspense fallback={<Loader isLoading />}>
        <Routes>
          <Route
            exact
            path="/auth"
            element={() => {
              if (isAuthenticated) {
                return (
                  <Navigate to="/" />
                );
              }
              return (
                <WelcomeApp />
              );
            }}
          />
          <Route
            path="/"
            element={() => {
              if (!isAuthenticated) {
                return (
                  <Navigate to="/auth" exact />
                );
              }
              return (
                <HomeApp />
              );
            }}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import { Loader } from '../../components/loaders';

const UserView = lazy(() => import('./views/user'));
const SearchPatientsView = lazy(() => import('./views/searchPatients'));
const SearchPhysiciansView = lazy(() => import('./views/searchPhysicians'));

export default function UserApp(props) {
  const session = useSelector((s) => s.session);

  return (
    <Suspense fallback={<Loader isLoading />}>
      <Routes>
        <Route
          path={props.match.path}
          exact
          render={(props) => {
            if (session.isPhysician) {
              return (
                <SearchPatientsView {...props} session={session} />
              );
            }
            return (
              <SearchPhysiciansView {...props} session={session} />
            );
          }}
        />
        <Route
          path={`${props.match.path}/:username`}
          render={(props) => (
            <UserView
              {...props}
              key={props.match.params.username}
              username={props.match.params.username}
              session={session}
            />
          )}
        />
      </Routes>
    </Suspense>
  );
}

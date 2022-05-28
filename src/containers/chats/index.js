import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Loader } from '../../components/loaders';

const ChatView = lazy(() => import('./views/chatView'));

export default function ChatApp(props) {
  const session = useSelector((s) => s.session);

  return (
    <Suspense fallback={<Loader isLoading />}>
      <Routes>
        <Route
          path={`${props.match.path}/:id`}
          render={(props) => (
            <ChatView
              {...props}
              id={props.match.params.id}
              session={session}
            />
          )}
        />
      </Routes>
    </Suspense>
  );
}

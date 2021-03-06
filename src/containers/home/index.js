import React, { Suspense, lazy } from 'react';
import MediaQuery from 'react-responsive';
import { Route, Routes } from 'react-router-dom';
import { Col, FluidContainer, Row } from '../../components/layout';
import { Loader } from '../../components/loaders';

import SideBar, { ModalSideBar } from './sideBar';

const DashboardApp = lazy(() => import('../dashboard'));
const UserApp = lazy(() => import('../users'));
const AppointmentApp = lazy(() => import('../appointments'));
const ChatApp = lazy(() => import('../chats'));
const SettingsApp = lazy(() => import('../settings'));
const HelpCenterApp = lazy(() => import('../help'));
const ContactApp = lazy(() => import('../contact'));

function ContentSection(props) {

  return (
    <Suspense fallback={<Loader isLoading />}>
      <Routes>
        <Route 
          path='/'
          exact="true"
          element={<DashboardApp />}
        />
        <Route
          path= '/users'
          element={<UserApp />}
        />
        <Route
          path= '/appointments'
          element={<AppointmentApp />}
        />
        <Route
          path= '/chats'
          element={<ChatApp />}
        />
        <Route
          path= '/settings'
          element={<SettingsApp />}
        />
        <Route      
          path = '/help'
          element={<HelpCenterApp />}
        />
        <Route
          path= '/contact'
          element={<ContactApp />}
        />


      </Routes>
    </Suspense>
  );
}

export default function HomeApp(props) {
  async function autoRemoveModal(matches) {
    if (matches) {
      const { body } = document;
      if (body !== null) {
        body.classList.remove('modal-open');
      }

      const modalBackdrops = document.getElementsByClassName('modal-backdrop');
      for (const modalBackdrop of modalBackdrops) {
        modalBackdrop.remove();
      }
    }
  }

  return (
    <FluidContainer className="h-100">
      <Row className="h-100">
        <MediaQuery maxWidth={767}>
          <ModalSideBar id="sideBar01" />
        </MediaQuery>
        <MediaQuery minWidth={768} onChange={autoRemoveModal}>
          <SideBar className="col col-md-3 col-xl-2 h-100" />
        </MediaQuery>
        <Col className="col-md-9 col-xl-10 h-100 overflow-y">
          <ContentSection />
        </Col>
      </Row>
    </FluidContainer>
  );
}

import FullWidthHeightLayout from '@src/layout/FullWidthHeightLayout';
import SidebarWithHeader from '@src/layout/sidebarLayout/SidebarLayout';
import NotLoginGuard from '@src/pages/guard/NotLoginGuard';
import RequiredLoginGuard from '@src/pages/guard/RequiredLoginGuard';
import HomePage from '@src/pages/HomePage';
import LoginPage from '@src/pages/LoginPage';
import ConcertCreatePage from '@src/pages/myPages/concertCreatePage/ConcertCreatePage';
import ConcertListPage from '@src/pages/myPages/concertListPage/ConcertListPage';
import ConcertAdminPage from '@src/pages/myPages/concertsPages/ConcertAdminPage';
import EditMyPage from '@src/pages/myPages/editMyInfoPage/EditMyPage';
import MyPage from '@src/pages/myPages/myPageHome/MyPage';
import Page404 from '@src/pages/Page404';
import SignPage from '@src/pages/SignPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ConcertDetailPage from './myPages/concertDetailPages/concertDetailPage/ConcertDetailPage';
import GoodsPage from './myPages/concertDetailPages/concertGoodsListPage/GoodsPage';
import TicketListPage from './myPages/concertDetailPages/concertTicketListPage/TicketListPage';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FullWidthHeightLayout />}>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />
          {/* Login & Sign */}
          <Route path="/" element={<NotLoginGuard />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="sign" element={<SignPage />} />
          </Route>
          {/* Required Login Pages */}
          <Route path="/my" element={<RequiredLoginGuard />}>
            <Route element={<SidebarWithHeader />}>
              <Route index element={<MyPage />} />
              <Route path="concerts" element={<ConcertListPage />} />
              <Route path="create" element={<ConcertCreatePage />} />
              <Route path="edit" element={<EditMyPage />} />
              <Route path="concerts/:concertId">
                <Route index element={<ConcertDetailPage />} />
                <Route path="goods" element={<GoodsPage />} />
                <Route path="tickets" element={<TicketListPage />} />
              </Route>
            </Route>
            <Route path="concerts/:concertId/admin/:ticketId" element={<ConcertAdminPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;

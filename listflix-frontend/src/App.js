import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // обновляем импорт
import { observer } from 'mobx-react-lite';
import Navbar from './components/Navbar';

const HomePage = lazy(() => import('./pages/HomePage'));
const ListsPage = lazy(() => import('./pages/ListsPage'));
const ListContentPage = lazy(() => import('./pages/ListContentPage'));
const SubscriptionsPage = lazy(() => import('./pages/SubscriptionsPage'));

const App = observer(() => (
  <Router>
    <Navbar />
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>  
        <Route path="/" element={<HomePage />} />  
        <Route path="/lists" element={<ListsPage />} />  
        <Route path="/lists/:id" element={<ListContentPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />  
      </Routes>
    </Suspense>
  </Router>
));

export default App;

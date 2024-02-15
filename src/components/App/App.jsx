import '../App/App.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from '../Navbar/Navbar.jsx';

const Home = lazy(() => import('../../pages/Home/Home.jsx'));
const NotFound = lazy(() => import('../NotFound/NotFound.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews.jsx'));

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <BrowserRouter>
          <Navbar />
          <hr />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  );
};

export default App;

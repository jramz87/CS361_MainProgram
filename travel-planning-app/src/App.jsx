import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TravelApp from './components/TravelApp'; // defines layout
import HomePage from './pages/HomePage';
import Clients from './pages/Clients';
import Itineraries from './pages/Itineraries';
import ShareTrips from './pages/ShareTrips';
import Weather from './pages/Weather';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TravelApp />}>
          <Route index element={<HomePage />} />
          <Route path="clients" element={<Clients />} />
          <Route path="itineraries" element={<Itineraries />} />
          <Route path="share-trips" element={<ShareTrips />} />
          <Route path="weather" element={<Weather />} />
          <Route path="activities" element={<Activities />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import ListView from "./pages/ListView";
import GalleryView from "./pages/GalleryView";
import DetailView from "./pages/DetailView";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <nav className="navbar">
        <div className="nav-content">
          <Link className="brand" to="/">
            Pokédex
          </Link>

          <div className="nav-links">
            <Link to="/">List View</Link>
            <Link to="/gallery">Gallery View</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/pokemon/:id" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
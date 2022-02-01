import './App.css';
import Header from './components/Header/Header';
import Meme from './components/Meme/Meme';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import GeneratedMeme from './components/GenratedMeme/GeneratedMeme';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/meme" element={<GeneratedMeme />} />
            <Route path="/" element={<Meme />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;

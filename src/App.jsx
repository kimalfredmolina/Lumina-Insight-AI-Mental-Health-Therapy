import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import ChatbotPage from './components/ChatbotPage';
import Description from './components/Description';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen">
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
        
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Description />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/bot" element={<ChatbotPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

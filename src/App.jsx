import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import ChatbotPage from './components/ChatbotPage';

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        
        <Routes>
          <Route path="/" element={
            <div id="home">
              <Home />
            </div>
          } />
          <Route path="/bot" element={<ChatbotPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

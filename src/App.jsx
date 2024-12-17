import Home from "./components/Home";

const App = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="relative z-10">       
        <div id="home">
          <Home />
        </div>
      </div>
    </div>
  );
};

export default App;

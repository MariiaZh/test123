import MainContent from "./components/mainContent/MainContent.js";
import SideBar from "./components/sideBar/SideBar.js";
import ModalAdd from "./components/modalAdd/ModalAdd.js";
import ModalAuth from "./components/modalAuth/ModalAuth.js";
import "./App.css";

const App = () => {
    return (
        <>
            <ModalAuth />
            <ModalAdd />
            <div className="app">
                <MainContent />
                <SideBar />
            </div>
        </>
    );
};

export default App;

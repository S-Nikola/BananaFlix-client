import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";

import Container from "react-bootstrap/Container";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { GlobalProvider } from './context/GlobalContext';
import { BrowserRouter } from 'react-router-dom';

// Main component (will eventually use all the others)
const BananaFlixApplication = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Container>
          <MainView />
        </Container>
      </GlobalProvider>
    </BrowserRouter>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<BananaFlixApplication />);

import React from "react";
import { createRoot } from "react-dom/client";
import { AppProvider, useApp } from "./AppProvider.jsx";
import Header from "./src/components/header.jsx";
import Footer from "./src/components/footer.jsx";
import { Toaster, ErrorState } from "./src/components/components.jsx";
import Home from "./src/pages/Home.jsx";
import Rooms from "./src/pages/Rooms.jsx";
import RoomDetails from "./src/pages/RoomDetails.jsx";
import Booking from "./src/pages/Booking.jsx";
import Confirmation from "./src/pages/Confirmation.jsx";
import Admin from "./src/pages/Admin.jsx";

function Router() {
  const { route } = useApp();
  switch (route.name) {
    case "/rooms":
      return <Rooms key="rooms" />;
    case "/room/:id":
      return <RoomDetails key={`room-${route.params.id}`} id={route.params.id} />;
    case "/booking/:id":
      return <Booking key={`booking-${route.params.id}`} id={route.params.id} />;
    case "/confirmation/:ref":
      return <Confirmation key={`conf-${route.params.ref}`} refId={route.params.ref} />;
    case "/admin":
      return <Admin key="admin" />;
    default:
      return <Home key="home" />;
  }
}

class Boundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App error", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <ErrorState 
            title="Something went wrong" 
            text="An unexpected error occurred. Try refreshing the page." 
          />
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <AppProvider>
      <Header />
      <main id="main">
        <Boundary>
          <Router />
        </Boundary>
      </main>
      <Footer />
      <Toaster />
    </AppProvider>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
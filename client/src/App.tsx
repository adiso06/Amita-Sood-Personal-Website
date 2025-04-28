import { Switch, Route, useLocation } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import Testimonials from "@/pages/Testimonials";
import Areas from "@/pages/Areas";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ErrorBoundary>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/properties" component={Properties} />
            <Route path="/properties/:id" component={PropertyDetail} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/areas" component={Areas} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/admin">
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            </Route>
            <Route component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;

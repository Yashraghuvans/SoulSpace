import NavBar from "./Components/NavBar";
import Main from "./Components/Main";
import DashboardPreviewSection from "./Components/DashboardPreviewSection";
import Cards from "./Components/Cards";
import Services from "./Components/Services";
import Footer from "./Components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface text-text">
      <NavBar />
      <Main />
      <DashboardPreviewSection />
      <Cards />
      <Services />
      <Footer />
    </div>
  );
}

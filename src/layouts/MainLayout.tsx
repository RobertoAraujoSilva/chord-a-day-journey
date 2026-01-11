import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProgressProvider } from "@/contexts/ProgressContext";

const MainLayout = () => {
  return (
    <ProgressProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <Header />
        <main className="container mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 3xl:px-32 py-8 2xl:py-12 3xl:py-16">
          <Outlet />
        </main>
      </div>
    </ProgressProvider>
  );
};

export default MainLayout;

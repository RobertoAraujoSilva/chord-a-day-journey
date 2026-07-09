import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProgressProvider } from "@/contexts/ProgressContext";

const MainLayout = () => {
  return (
    <ProgressProvider>
      <div className="min-h-screen bg-noir text-foreground">
        <Header />
        <main className="container mx-auto px-4 md:px-8 lg:px-16 2xl:px-24 3xl:px-32 py-8 2xl:py-12 3xl:py-16">
          <Outlet />
        </main>
        <footer className="border-t border-border/60 mt-16 py-8 text-center text-xs text-muted-foreground">
          <span className="font-display text-gold text-sm tracking-wide">Chord a Day Journey</span>
          <span className="mx-2 opacity-40">·</span>
          <span>Crafted for the daily player</span>
        </footer>
      </div>
    </ProgressProvider>
  );
};

export default MainLayout;

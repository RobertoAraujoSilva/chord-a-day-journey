import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { I18nProvider } from "./i18n/context";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import IntroLesson from "./pages/IntroLesson";
import Lesson from "./pages/Lesson";
import BonusLesson from "./pages/BonusLesson";
import Slideshow from "./pages/Slideshow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/intro" element={<IntroLesson />} />
            <Route path="/lesson/:day" element={<Lesson />} />
            <Route path="/bonus" element={<BonusLesson />} />
            <Route path="/slideshow" element={<Slideshow />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;

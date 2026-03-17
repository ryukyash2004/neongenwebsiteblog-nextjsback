import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import FooterBar from "./components/FooterBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import { AccessibilityMenu } from "./components/accessibilityMenu";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Move BrowserRouter to wrap all UI components */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Footers and Menus are now safely inside the Router */}
        <FooterBar />
        <Footer />
        <AccessibilityMenu />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
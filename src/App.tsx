import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import RetailerDashboard from "./pages/RetailerDashboard";
import SalesRegistration from "./pages/SalesRegistration";
import IndustryDashboard from "./pages/IndustryDashboard";
import Insights from "./pages/Insights";
import TradeConnect from "./pages/TradeConnect";
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
          <Route path="/sales-registration" element={<SalesRegistration />} />
          <Route path="/industry-dashboard" element={<IndustryDashboard />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/trade-connect" element={<TradeConnect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

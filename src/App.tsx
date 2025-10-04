import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import CustomerMaster from "./pages/master/CustomerMaster";
import AccountMaster from "./pages/master/AccountMaster";
import ProductMaster from "./pages/master/ProductMaster";
import VendorMaster from "./pages/master/VendorMaster";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/master/customers" element={<CustomerMaster />} />
                  <Route path="/master/accounts" element={<AccountMaster />} />
                  <Route path="/master/products" element={<ProductMaster />} />
                  <Route path="/master/vendors" element={<VendorMaster />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { ReactNode } from "react";
import  Footer  from "@/components/Footer";
import  Header  from "@/components/Header";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <>{children}</>
      <Footer />
    </main>
  );
};

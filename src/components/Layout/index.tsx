import { ReactNode } from "react";
import  Footer  from "@/components/Footer";
import  Header  from "@/components/Header";
import Nav from "../Nav";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <Nav/>
      <>{children}</>
      <Footer />
    </main>
  );
};

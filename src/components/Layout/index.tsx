import { ReactNode } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <>{children}</>
      <Footer />
    </main>
  );
};

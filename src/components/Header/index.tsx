import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <section className="container mx-auto py-12 text-center border-b">
      <div>
        <Link href="#">
          Teste - Visie Padrões Web
        </Link>

      </div>
    </section>
  );
};

import Link from "next/link";

export default function Footer(){
  return (
    <footer className="container mx-auto">
      <div className="text-center border-t py-8">
        <h3 className="text-xl">Teste executado por André Augusto Zaguette fernandes</h3>
        <small>{new Date().getFullYear()}</small>
      </div>
    </footer>
  );
};

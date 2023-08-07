import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

export default function Nav() {
  const { favIds, laterIds } = useAppContext();


  return (
    <nav className="flex bg-gray-800 text-white p-4 justify-around border-solid border-b-2 border-b-white">
      <Link href="/" className="hover:text-gray-300">
        Página inicial
      </Link>
      <Link href="/categoria/desenvolvimento-pessoal" className="hover:text-gray-300">
        Desenvolvimento Pessoal
      </Link>
      <Link href="/categoria/estrategia-e-gestao" className="hover:text-gray-300">
        Estratégia e Gestão
      </Link>
      <Link href="/categoria/gestao-de-pessoas" className="hover:text-gray-300">
        Gestão de Pessoas
      </Link>
      <Link href={`/ler-depois?itemsId=${laterIds}`}>
        Ler depois
      </Link>
      <Link href={`/favoritos?itemsId=${favIds}`} className="hover:text-gray-300">
        Favoritos
      </Link>
      <Link href="/anotacoes" className="hover:text-gray-300">
        Anotações
      </Link>
    </nav>
  );
};

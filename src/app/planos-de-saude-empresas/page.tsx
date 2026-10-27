import { PaginaPerfil, metadataPerfil } from "@/components/paginas/pagina-perfil";

export const metadata = metadataPerfil("empresa");

export default function Pagina() {
  return <PaginaPerfil id="empresa" />;
}

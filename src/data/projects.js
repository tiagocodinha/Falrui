// Projetos listados em www.falrui.pt/portfolio-1/ (out. 2026).
// Nome, localização e imagem vêm do site atual da FALRUI.
// "tipo" é uma classificação provisória feita a partir do nome — A CONFIRMAR PELA FALRUI.
// Campos opcionais (só aparecem no cartão quando preenchidos): solucao, ano, descricao, alt.
// Para usar fotografias próprias, substituir "img" por um caminho local (ex.: /img/projetos/x.jpg).
const U = 'https://www.falrui.pt/wp-content/uploads/';

export const tipos = ['Edifícios', 'Hotelaria', 'Comércio', 'Escolas e equipamentos'];

export const projects = [
  { slug: 'miramar-ii-lote-8', nome: 'Edifício Miramar II Lote 8', local: 'Vila Nova de Gaia', tipo: 'Edifícios', img: U + '2025/06/Miramar-scaled.jpg' },
  { slug: 'troia', nome: 'Tróia', local: 'Tróia', tipo: 'Edifícios', img: U + '2025/06/Troia-scaled.jpg' },
  { slug: 'sunset-views', nome: 'Edifício Sunset Views', local: 'Nazaré', tipo: 'Edifícios', img: U + '2025/06/Sunsetviews-scaled.jpg' },
  { slug: 'casal-ribeiro', nome: 'Edifício Casal Ribeiro', local: 'Lisboa', tipo: 'Edifícios', img: U + '2025/06/EDCasalribeiro-scaled.jpg' },
  { slug: 'novo-banco', nome: 'Edifício Novo Banco', local: 'Lisboa', tipo: 'Edifícios', img: U + '2025/06/Novobanco1-scaled.jpg' },
  { slug: 'estoril-woods', nome: 'Estoril Woods', local: 'Estoril', tipo: 'Edifícios', img: U + '2025/06/Livramento-scaled.jpg' },
  { slug: 'pharmacia', nome: 'Edifício Pharmacia', local: 'Porto', tipo: 'Edifícios', img: U + '2025/06/Edificio-Pharmacia1-scaled.jpg' },
  { slug: 'centro-dia-matos-cheirinhos', nome: 'Centro de dia de Matos Cheirinhos', local: 'Cascais', tipo: 'Escolas e equipamentos', img: U + '2025/06/Centro-de-dia-de-Matos-Cheirinhos-scaled.jpg' },
  { slug: 'cascais', nome: 'Cascais', local: 'Cascais', tipo: 'Edifícios', img: U + '2025/06/cascais2-scaled.jpg' },
  { slug: 'biblioteca-jose-soares', nome: 'Biblioteca Municipal José Soares', local: 'Nazaré', tipo: 'Escolas e equipamentos', img: U + '2025/06/biblioteca1.png' },
  { slug: 'aldi', nome: 'Aldi', local: 'Vários locais', tipo: 'Comércio', img: U + '2023/10/aldi1.png' },
  { slug: 'park-atlantico', nome: 'Condomínio Park Atlântico', local: 'Nazaré', tipo: 'Edifícios', img: U + '2023/10/parkatlantico3-capa-1.webp' },
  { slug: 'moinho-de-vento', nome: 'Moinho de Vento', local: 'Nazaré', tipo: 'Edifícios', img: U + '2023/10/moinho1-1.webp' },
  { slug: 'edificio-rotunda', nome: 'Edifício Rotunda', local: 'São Martinho do Porto', tipo: 'Edifícios', img: U + '2023/10/rotunda1-2.webp' },
  { slug: 'crowne-plaza-porto', nome: 'Crowne Plaza Porto', local: 'Porto', tipo: 'Hotelaria', img: U + '2023/10/CrownePlaza1.webp' },
  { slug: 'albergaria-mar-bravo', nome: 'Albergaria Mar Bravo', local: 'Nazaré', tipo: 'Hotelaria', img: U + '2023/10/marbravo1-2.webp' },
  { slug: 'lidl', nome: 'Lidl', local: 'Vários locais', tipo: 'Comércio', img: U + '2023/10/lidl1-1.webp' },
  { slug: 'esad', nome: 'ESAD – Escola Superior de Artes e Design', local: 'Caldas da Rainha', tipo: 'Escolas e equipamentos', img: U + '2023/10/esad1-1.webp' },
];

// Projetos em destaque na página inicial (por slug). O primeiro aparece maior:
// usar fotografias com 1600px ou mais de largura (as de 2023/10 do site atual têm só 640px).
export const featured = ['troia', 'novo-banco', 'estoril-woods', 'casal-ribeiro', 'sunset-views'];

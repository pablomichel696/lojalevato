# Fotos de produtos

Coloque aqui as fotos reais dos produtos (JPG ou, de preferência, WebP para
carregar mais rápido no celular). O site usa o caminho `/products/<arquivo>`.

## Super Chá Monjaro

As 5 fotos da galeria foram baixadas da loja levato.com.br e salvas como
`monjaro-1.jpg` … `monjaro-5.jpg` (na ordem em que aparecem na página do
produto). Para trocar por outras, basta substituir os arquivos mantendo os
mesmos nomes, ou editar a lista `images` do produto em `src/data/products.ts`.

Enquanto um arquivo referenciado não existir, o site mostra automaticamente uma
ilustração de sachê no lugar — nunca aparece imagem quebrada.

Dica: para converter para WebP e reduzir o tamanho, use https://squoosh.app
(alvo ~1000px de largura, qualidade 75%).

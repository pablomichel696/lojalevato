# Fotos de produtos

As imagens aqui são baixadas automaticamente da loja levato.com.br pelo script
`scripts/import-wix.mjs`, com o padrão `<slug-do-produto>-1.jpg`, `-2.jpg`, etc.
(a `-1` é a capa). O site usa o caminho `/products/<arquivo>`.

## Reimportar / atualizar o catálogo

Para atualizar preços, descrições e imagens a partir da loja Wix:

```
node scripts/import-wix.mjs
```

O script regenera `src/data/products.ts`, baixa as fotos que ainda não existem
e pula cosméticos/maquiagem. Imagens já baixadas não são baixadas de novo.

Se um arquivo referenciado não existir, o site mostra automaticamente uma
ilustração (frasco ou sachê) no lugar — nunca aparece imagem quebrada.

Dica: para converter para WebP e reduzir o tamanho, use https://squoosh.app.

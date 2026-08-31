# Farol Digital — portfólio cívico

Vitrine com quatro demonstrações frontend para mandatos e campanhas. Todos os nomes, números, imagens e registros são fictícios. Os formulários não enviam nem armazenam dados.

## Executar

```bash
npm install
npm run dev
```

O Vite exibe uma URL local e outra da rede. Com notebook e celular na mesma rede, abra a URL `Network` no telefone. Para conferir a versão final:

```bash
npm run build
npm run preview
```

## Rotas

- `/` — vitrine Farol Digital
- `/gabinete-aberto` — portal público de mandato
- `/radar-do-bairro` — registro e acompanhamento de demandas
- `/mobiliza-litoral` — landing page e funil de participação
- `/mapa-de-atuacao` — dashboard territorial agregado

O `vercel.json` já redireciona acessos diretos para o Vue Router. Para publicar na Vercel, importe o repositório, use `npm run build` e o diretório `dist`.

## Roteiro para a apresentação

1. Abra a vitrine e diga: “Eu trouxe quatro exemplos do que uma equipe pode colocar no ar para se aproximar das pessoas e organizar o trabalho.”
2. Pergunte: “Hoje o maior problema é mostrar entregas, organizar demandas ou mobilizar pessoas?”
3. Abra somente os dois demos mais relacionados à resposta.
4. No Radar, faça um registro completo; no Mobiliza, percorra o formulário; no Dashboard, troque o período.
5. Termine com: “Qual destes faria mais diferença para a equipe nos próximos 30 dias?”

## Referência comercial

| Oferta | Inclui | Valor sugerido |
| --- | --- | ---: |
| Presença Express | Landing page, links, WhatsApp, publicação e 2 revisões | R$ 1.490 |
| Mandato Digital | Portal de até 7 seções, agenda e prestação de contas | R$ 2.990 |
| Mobilização | Landing, funil e integrações simples | R$ 4.900 |
| Sistema sob medida | Diagnóstico, arquitetura e proposta específica | Diagnóstico de R$ 790; projeto a partir de R$ 8.900 |
| Manutenção essencial | Hospedagem assistida e até 1 hora de alterações | R$ 190/mês |

Condições recomendadas: 50% na contratação, 50% antes da publicação, duas rodadas de revisão e domínio/serviços externos pagos pelo cliente. Mudanças de escopo recebem orçamento separado; urgências eleitorais podem ter adicional de 30%.

Antes de contratar com campanha, partido ou órgão público, valide emissão fiscal, origem do recurso e documentação com a contabilidade. Não ofereça rastreamento individual de votos, perfil de opinião política, enquetes ou disparos em massa.

## Stack

Vue 3, TypeScript, Vite, Vue Router, Vuetify, Tailwind CSS e QRCode Vue. A fotografia foi gerada especificamente para o projeto e representa uma personagem fictícia.

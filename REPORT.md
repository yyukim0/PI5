1. Introdução e Diretrizes Estruturais
Este documento apresenta a fundamentação arquitetural para a organização e montagem dos componentes visuais e lógicos do sistema frontend do grupo PokeAmigos. O objetivo central da nossa abordagem foi estabelecer uma estrutura limpa e modularizada, utilizando os padrões do React para garantir a escalabilidade da interface e a fácil manutenção do código.

A padronização foi adotada para separar a lógica de navegação (Páginas) da lógica de apresentação (Componentes Reutilizáveis), garantindo que a equipe compreendesse com clareza o fluxo de dados do ecossistema e a comunicação com a API REST.

2. Organização Arquitetural baseada no Fluxo da Aplicação
A divisão e o agrupamento dos arquivos refletem rigorosamente a separação de responsabilidades entre as rotas acessadas pelo usuário e as peças de interface de usuário (UI). Essa organização dita a forma como os arquivos foram distribuídos na árvore do projeto:
/src (Raiz do Código)
├── components/                # Peças de UI isoladas e reutilizáveis
│   ├── GameCard.jsx           # Renderização de card de partida
│   ├── Navbar.jsx             # Navegação e controle de tema global
│   ├── PlayerSelect.jsx       # Regras de negócio de troca de jogadores e tokens
│   └── WinnerBanner.jsx       # Componente visual para status de fim de jogo
│
├── pages/                     # Páginas orquestradoras das rotas
│   ├── HomePage.jsx           # Apresentação do projeto e CTAs
│   ├── BattlePage.jsx         # Formulários para criação e conexão a partidas
│   ├── WatchListPage.jsx      # Listagem geral do ecossistema
│   └── WatchGamePage.jsx      # Visualização e renderização do tabuleiro em tempo real
│
└── services/
    └── api.js                 # Centralização de configurações do Axios/Fetch

3. Motivações para a Criação e Montagem dos Componentes
A decisão de isolar e montar os componentes dessa forma justifica-se pelos seguintes fatores técnicos de engenharia de software e padrões do ecossistema React:

3.1. Isolamento das Regras de Negócio e Injeção de Dependência
O componente PlayerSelect foi criado para centralizar a lista de IAs disponíveis e suas respectivas credenciais (tokens).

Por que montar de forma isolada: Ao invés de repetir a lista de jogadores em várias telas, este componente encapsula a lógica de alterar o token global da aplicação (api.setToken) assim que um jogador é selecionado. O componente adapta seu próprio visual dependendo de onde é renderizado (variantes watchlist ou arena), garantindo máxima reutilização sem acoplamento.

3.2. Orquestração de Estados nas Páginas
As páginas foram estruturadas para atuar como "controladores". Elas gerenciam o estado local (useState), ciclos de vida (useEffect) e fazem as chamadas HTTP, repassando os dados mastigados para os componentes visuais.

Por que montar de forma isolada: Em BattlePage.jsx, a página coordena simultaneamente dois formulários distintos (um para criar novas partidas e outro para ingressar via ID), isolando a lógica de validação de submissão da interface crua. Já em WatchGamePage.jsx, o isolamento permite que a página controle exclusivamente a regra de polling (fazendo requisições à API a cada 1 segundo usando setInterval) para atualizar a renderização do tabuleiro dinamicamente sem afetar o resto da aplicação.

3.3. Segregação de Elementos Visuais Puros (GameCard e WinnerBanner)
Esses componentes recebem informações (props) já formatadas e se preocupam apenas com a apresentação (renderização condicional de avatares, fallback para imagens quebradas e links dinâmicos).

Por que montar de forma isolada: Mantém o código das páginas (como a WatchListPage) limpo e legível. Se houver a necessidade de mudar o layout da exibição das partidas ou a forma como a vitória de um bot é anunciada, a modificação é feita apenas nesses pequenos componentes (GameCard.jsx e WinnerBanner.jsx), refletindo automaticamente em toda a aplicação sem risco de quebrar o tráfego de rede ou a lógica de rotas.    
# Funko Pop API: Entrega Contínua com Docker, GitHub Actions e Render

API REST para gerenciar uma coleção de Funko Pops, desenvolvida em **Node.js, Express, TypeScript, Sequelize e PostgreSQL**. Este repositório faz parte da atividade **AT2 da disciplina Integração e Entrega Contínua (IEC)** e demonstra uma esteira completa de CI/CD: a cada push na branch `main`, o código é validado, a imagem Docker é construída e o deploy no Render é disparado por webhook.


## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | Status da aplicação (`{ "status": "ok", "uptime": 120 }`) |
| GET | `/recursos` | Lista todos os Funko Pops |
| GET | `/recursos/:id` | Busca um Funko Pop pelo id |
| POST | `/recursos` | Cadastra um Funko Pop |
| PUT | `/recursos/:id` | Atualiza um Funko Pop |
| DELETE | `/recursos/:id` | Remove um Funko Pop |

Exemplo de corpo para `POST /recursos`:

```json
{
  "personagem": "Jon Snow",
  "casa": "Stark",
  "numeroColecao": 1,
  "preco": 89.9,
  "emEstoque": true
}
```


## Como executar localmente

### Pré-requisitos

- Node.js 20+
- pnpm 9 (`npm i -g pnpm@9`)
- PostgreSQL em execução (local ou em contêiner)

### Sem Docker

```bash
cd backend
pnpm install
cp .env.example .env   # no Windows: copy .env.example .env
pnpm dev
```

A API sobe em `http://localhost:3000`. Teste em `http://localhost:3000/api/health` e veja o Swagger em `http://localhost:3000/api-docs`.

## API em produção

- **URL base:** https://iec-at2-entrega-docker-github-actions.onrender.com
- **Health check:** https://iec-at2-entrega-docker-github-actions.onrender.com/api/health
- **Swagger:** https://iec-at2-entrega-docker-github-actions.onrender.com/api-docs

Para gerar o build de produção:

```bash
pnpm build
node dist/server.js
```

### Com Docker

```bash
docker build -t funkopop-api ./backend
docker run -p 3000:3000 --env-file backend/.env funkopop-api
```

Se o PostgreSQL estiver rodando na sua máquina, use `DB_HOST=host.docker.internal` no `.env`.
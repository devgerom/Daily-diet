# Daily Diet – Projeto Fullstack

Aplicação fullstack de controle de dieta diária. Cada usuário pode registrar suas refeições, acompanhar métricas e visualizar informações sobre sua alimentação. O projeto é composto por dois subprojetos:

- `daily-diet-api` – backend em Node.js (Express + Prisma)
- `daily-diet-web` – frontend em React (Vite + Styled Components)

## Tecnologias

**Backend**
- Node.js
- Express
- Prisma ORM (SQLite)
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv

**Frontend**
- React
- Vite
- React Router DOM
- Axios
- Styled Components

## Funcionalidades

- Cadastro de usuário
- Login com autenticação via JWT
- Registro de refeição (nome, descrição, data/hora, dentro ou fora da dieta)
- Edição e exclusão de refeições
- Listagem de todas as refeições do usuário
- Visualização de uma refeição específica
- Métricas do usuário:
  - Total de refeições
  - Total dentro da dieta
  - Total fora da dieta
  - Melhor sequência de refeições dentro da dieta
- Permissões: cada usuário só visualiza, edita e apaga as próprias refeições

## Como rodar o projeto

Você precisa de **dois terminais** abertos: um para o backend e outro para o frontend.

### 1. Backend (`daily-diet-api`)

```bash
cd daily-diet-api
npm install
Crie o arquivo .env na raiz de daily-diet-api com:

env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta-aqui"
PORT=3333
Rode as migrações do Prisma para criar o banco:

bash
npx prisma migrate dev
Inicie o servidor:

bash
npm run dev
O backend estará disponível em http://localhost:3333.

2. Frontend (daily-diet-web)
Em outro terminal:

bash
cd daily-diet-web
npm install
npm run dev
O frontend estará disponível em http://localhost:5173.

Rotas da API
Usuários
Método	Rota	Descrição
POST	/users/register	Cria um usuário
POST	/users/login	Autentica e retorna token JWT
Refeições (exigem token no header Authorization: Bearer <token>)
Método	Rota	Descrição
POST	/meals	Registra uma refeição
GET	/meals	Lista todas as refeições do usuário
GET	/meals/metrics	Retorna as métricas do usuário
GET	/meals/:id	Retorna uma refeição específica
PUT	/meals/:id	Atualiza uma refeição
DELETE	/meals/:id	Apaga uma refeição
Estrutura do projeto
text
Daily-diet/
├── daily-diet-api/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── app.js
│   └── package.json
├── daily-diet-web/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
Observações
O arquivo .env não é versionado (está no .gitignore). Ao clonar o projeto, crie o seu próprio .env conforme mostrado acima.

O banco de dados SQLite (prisma/dev.db) também não é versionado. Ele é recriado ao rodar npx prisma migrate dev.

Para testar o fluxo completo, cadastre um usuário, faça login e registre refeições. As métricas são calculadas automaticamente pelo backend.
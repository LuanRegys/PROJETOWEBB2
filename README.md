# Jogo de Associação: Termos e Definições

## Descrição

Este projeto é um jogo educativo web que permite criar e jogar jogos de associação entre termos e definições. O usuário pode criar seus próprios jogos, salvá-los no backend, e depois jogar os jogos salvos. O jogo possui funcionalidades como arrastar e soltar termos nas definições corretas, cronômetro, feedback visual e sonoro.

---

## Tecnologias usadas

- **Backend:** Node.js com Express, MongoDB com Mongoose, autenticação com sessões e bcrypt para segurança.
- **Frontend:** HTML, CSS, JavaScript puro.
- **Outros:**  
  - Armazenamento dos jogos no MongoDB.  
  - Controle de sessão para proteger rotas (usuário deve estar logado para criar jogos).  
  - API REST para salvar, listar e buscar jogos.  
  - Sons para feedbacks (correto, errado, fim do jogo).

---

## Estrutura do projeto

```
/meu-projeto
│
├── public/
│   ├── associacao/       # Arquivos do jogo de associação (HTML, CSS, JS, sons)
│   ├── commons.css       # Estilos comuns
│   ├── commons.js        # Scripts comuns
│   └── index.html        # Página inicial (menu)
│
├── models/
│   ├── User.js           # Model do usuário
│   └── Game.js           # Model do jogo
│
├── server.js             # Código principal do backend (Express)
├── package.json
├── .env                  # Variáveis de ambiente (MONGO_URI, SESSION_SECRET, PORT)
└── README.md             # Este arquivo
```

---

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado (versão recomendada >= 14)
- MongoDB acessível (local ou Atlas)
- Git (opcional)

### Passos

1. Clone o repositório (se usar Git):
   ```
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure o arquivo `.env` com suas variáveis:
   ```
   MONGO_URI=sua_string_de_conexao_mongodb
   SESSION_SECRET=uma_chave_secreta_segura
   PORT=3000
   ```

4. Inicie o servidor:
   ```
   node server.js
   ```

5. Abra no navegador:
   ```
   http://localhost:3000
   ```

---

## Funcionalidades principais

- Cadastro e login de usuários.
- Criar novos jogos de associação com título e pares termo-definição.
- Listar jogos criados pelo usuário.
- Listar jogos públicos disponíveis para jogar.
- Jogar jogos com arrastar e soltar, cronômetro, feedback e sons.
- Tornar jogos públicos para compartilhamento.

---

## Explicação do código backend (server.js)

- **Conexão MongoDB:** Usa Mongoose para conectar ao banco e definir modelos.
- **Modelos:** `User` para usuários, `Game` para jogos.
- **Sessão:** Usa `express-session` para manter sessão do usuário.
- **Rotas de usuário:** `/register`, `/login`, `/logout`, `/me`.
- **Rotas de jogos:**  
  - Criar jogo (POST `/games`) — usuário autenticado.  
  - Listar jogos do usuário (GET `/games`) — autenticado.  
  - Listar jogos públicos (GET `/public-games`).  
  - Buscar jogo público pelo ID (GET `/public-games/:id`).  
  - Tornar jogo público (POST `/games/:id/public`) — só dono.
- **Middleware:** `checkAuth` para proteger rotas que precisam de autenticação.
- **Servidor:** roda na porta configurada.

---

## Explicação do código frontend (associacao/script.js)

- Carrega jogos públicos para o dropdown.
- Ao selecionar um jogo, busca os dados do backend e monta o tabuleiro.
- Termos são arrastáveis e definições são áreas de drop.
- Valida se o termo solto corresponde à definição correta.
- Atualiza contadores de acertos e erros, mostra feedback.
- Cronômetro inicia ao começar a jogar.
- Sons são tocados para ações corretas e erradas.
- Possui painel para criar novos pares e salvar o jogo via API.

---

## Como contribuir

1. Faça um fork do projeto.
2. Crie uma branch com sua feature:  
   `git checkout -b minha-nova-feature`
3. Faça commits claros e objetivos.
4. Faça o push para sua branch.
5. Abra um pull request para revisão.

---

## Contato

Para dúvidas, sugestões ou reportar problemas, entre em contato:

- Email: seu.email@exemplo.com  
- GitHub: https://github.com/seu-usuario  

---

## Licença

Este projeto está licenciado sob a Licença MIT — veja o arquivo LICENSE para detalhes.

---

*README gerado com ajuda do ChatGPT*

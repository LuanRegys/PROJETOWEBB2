let gameData = [];
let timeElapsed = 0;
let selectedCards = [];
let matchedCards = 0;
let totalMatches = 0;
let errors = 0;
let gameStarted = false;

const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const feedbackDisplay = document.getElementById("feedback");
const restartBtn = document.getElementById("restart-btn");

const correctSound = new Audio("../sounds/bell.wav");
const wrongSound = new Audio("../sounds/caught.wav");
const flipSound = new Audio("../sounds/select.wav");
const endSound = new Audio('../sounds/win.wav');

let timerInterval = null;

// Função para embaralhar os dados
function shuffleData(data) {
    return data.sort(() => Math.random() - 0.5);
}

// Função para criar o tabuleiro do jogo
function createGameBoard() {
    gameBoard.innerHTML = ''; // Limpar tabuleiro anterior
    const cards = [];

    // Criar cards de termos e definições
    gameData.forEach((item, index) => {
        // Card de Termo
        const cardTerm = createCard(item, "term", index);
        // Card de Definição
        const cardDefinition = createCard(item, "definition", index);

        cards.push(cardTerm);
        cards.push(cardDefinition);
    });

    // Embaralhar os cards e adicioná-los ao tabuleiro
    shuffleData(cards).forEach(card => gameBoard.appendChild(card));
}

// Função para criar um card
function createCard(item, type, index) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.type = type;
    card.dataset.term = item.term;
    card.dataset.definition = item.definition;
    card.textContent = type === "term" ? item.term : item.definition;
    card.addEventListener("click", onCardClick);
    return card;
}

// Função para gerenciar o clique nas cartas
function onCardClick(event) {
    if (!gameStarted) {
        startGame();
    }

    const card = event.target;
    if (selectedCards.length < 2 && !card.classList.contains("selected") && !card.classList.contains("matched")) {
        flipSound.play();
        card.classList.add("selected");
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

// Função para verificar se as cartas selecionadas são um match
function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.type !== card2.dataset.type && card1.dataset.term === card2.dataset.term) {
        correctSound.play();
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards++;
    } else {
        wrongSound.play();
        errors++;
        setTimeout(() => {
            card1.classList.remove("selected");
            card2.classList.remove("selected");
        }, 1000);
    }

    selectedCards = [];
    updateFeedback();
    if (matchedCards === totalMatches) {
        endGame();
        alert(`Parabéns! Você terminou o jogo! Acertos: ${matchedCards} | Erros: ${errors}`);
    }
}

// Função para atualizar o feedback de acertos e erros
function updateFeedback() {
    feedbackDisplay.textContent = `Acertos: ${matchedCards} | Erros: ${errors}`;
}

// Função para iniciar o cronômetro
function startGame() {
    gameStarted = true;
    startTimer();
}

function startTimer() {
    timerDisplay.textContent = '00:00';
    timeElapsed = 0;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeElapsed++;
        const minutes = String(Math.floor(timeElapsed / 60)).padStart(2, '0');
        const seconds = String(timeElapsed % 60).padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

// Função para finalizar o jogo
function endGame() {
    if (timerInterval) clearInterval(timerInterval);
    endSound.play();
    feedbackDisplay.textContent += ` | Tempo final: ${timerDisplay.textContent}`;
}

// Função para reiniciar o jogo
function restartGame() {
    selectedCards = [];
    matchedCards = 0;
    errors = 0;
    gameStarted = false;
    timeElapsed = 0;
    timerDisplay.textContent = `00:00`;
    feedbackDisplay.textContent = '';
    if (timerInterval) clearInterval(timerInterval);

    createGameBoard();
}

restartBtn.addEventListener("click", restartGame);

// Função para pegar parâmetro da URL
function getGameIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('gameId');
}

// Função para carregar dados do jogo do backend
async function carregarDadosDoJogo() {
    const gameId = getGameIdFromUrl();
    if (!gameId) {
        alert('ID do jogo não informado.');
        return;
    }

    try {
        // Se o jogo for público, use /public-games/:id, senão /games/:id com credenciais
        const res = await fetch(`/public-games/${gameId}`); // ou `/games/${gameId}`, dependendo do backend
        if (!res.ok) throw new Error('Jogo não encontrado');
        const game = await res.json();

        // game.data deve conter os pares {term, definition}
        gameData = game.data;
        totalMatches = gameData.length;
        matchedCards = 0;
        errors = 0;
        gameStarted = false;
        timeElapsed = 0;
        timerDisplay.textContent = `00:00`;
        feedbackDisplay.textContent = '';

        createGameBoard();
    } catch (err) {
        alert('Erro ao carregar o jogo: ' + err.message);
    }
}

// Carregar o jogo ao abrir a página
window.addEventListener('load', carregarDadosDoJogo);

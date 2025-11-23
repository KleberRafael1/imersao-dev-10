let cardContainer = document.querySelector('.card-container');
let dados = [];

async function iniciarBusca() {
    // 1. Captura o valor digitado no input
    let termo = document.querySelector('input').value.toLowerCase().trim();

    // 2. Carrega o JSON apenas uma vez
    if (dados.length === 0) {
        let resposta = await fetch('data.json');
        dados = await resposta.json();
    }

    // 3. Filtra os resultados
     let resultados = dados.filter(item =>
    item.nome.toLowerCase() === termo
    );


    // 4. Renderiza somente os resultados filtrados
    renderizarCards(resultados);
}

function renderizarCards(lista) {
    // Limpa o container antes de adicionar novos cards
    cardContainer.innerHTML = "";

    // Se não encontrar nada, exibe mensagem
    if (lista.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    // Cria os cards
    for (let dado of lista) {
        let article = document.createElement('article');
        article.classList.add('card');
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano:</strong> ${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba Mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

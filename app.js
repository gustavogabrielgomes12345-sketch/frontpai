const produtos = [
    { id: 1, nome: "Burger Dev Supremo", preco: 34.90, categoria: "lanches", restrito: false, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=800&fit=crop" },
    { id: 2, nome: "Pizza Code Calabresa", preco: 45.00, categoria: "lanches", restrito: true, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=800&fit=crop" },
    { id: 3, nome: "Refrigerante JS", preco: 7.00, categoria: "bebidas", restrito: false, img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=1200&h=800&fit=crop" },
    { id: 4, nome: "Suco Natural HTML", preco: 9.50, categoria: "bebidas", restrito: false, img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=1200&h=800&fit=crop" },
    { id: 5, nome: "Brownie CSS com Sorvete", preco: 18.00, categoria: "sobremesas", restrito: true, img: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=1200&h=800&fit=crop" },
    { id: 6, nome: "Cachorro-Quente StackOverflow", preco: 22.90, categoria: "lanches", restrito: false, img: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=1200&h=800&fit=crop" },
    { id: 7, nome: "Combo Batata Cyberpunk", preco: 14.50, categoria: "lanches", restrito: false, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200&h=800&fit=crop" },
    { id: 8, nome: "Sanduíche Python Open-Source", preco: 28.00, categoria: "lanches", restrito: true, img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&h=800&fit=crop" },
    { id: 9, nome: "Nuggets Git Commit (6 un.)", preco: 16.90, categoria: "lanches", restrito: true, img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=1200&h=800&fit=crop" },
    { id: 10, nome: "Café Expresso Double Shot", preco: 8.00, categoria: "bebidas", restrito: false, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&h=800&fit=crop" },
    { id: 11, nome: "Energy Drink RedBoot", preco: 12.00, categoria: "bebidas", restrito: false, img: "EN.jpg" },
    { id: 12, nome: "Milkshake C++ de Baunilha", preco: 16.50, categoria: "bebidas", restrito: true, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1200&h=800&fit=crop" },
    { id: 13, nome: "Donut C# com Confeitos", preco: 10.00, categoria: "sobremesas", restrito: true, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200&h=800&fit=crop" },
    { id: 14, nome: "Waffle GitHub Octocat", preco: 21.90, categoria: "sobremesas", restrito: true, img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&h=800&fit=crop" },
    { id: 15, nome: "Salada de Frutas Clean Code", preco: 13.00, categoria: "sobremesas", restrito: false, img: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=1200&h=800&fit=crop" }
];

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let categoriaAtiva = localStorage.getItem('categoriaAtiva') || 'todos';


function renderizarCardapio(listaProdutos) {
    const container = document.getElementById('vitrine-pratos');
    container.innerHTML = ""; 

    listaProdutos.forEach(produto => {
        const jaFavorito = favoritos.includes(produto.id);
        const iconeCoracao = jaFavorito ? "bi-heart-fill text-danger" : "bi-heart";

        const cardHTML = `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <img src="${produto.img}" class="card-img-top" alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text text-success fw-bold">R$ ${produto.preco.toFixed(2)}</p>
                        ${produto.restrito ? '<span class="badge bg-warning text-dark mb-2">Contém Glúten/Lactose</span>' : '<span class="badge bg-success mb-2">Sem Glúten/Lactose</span>'}
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-between align-items-center">
                        <button class="btn btn-sm btn-danger" onclick="adicionarAoCarrinho(${produto.id})">
                            <i class="bi bi-plus-lg"></i> Adicionar
                        </button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="alternarFavorito(${produto.id})">
                            <i class="bi ${iconeCoracao}"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}


function atualizarTela() {
    let listaFiltrada = [...produtos];

    if (categoriaAtiva !== 'todos') {
        listaFiltrada = listaFiltrada.filter(p => p.categoria === categoriaAtiva);
    }

    const switchAtivo = document.getElementById('switchRestricao').checked;
    if (switchAtivo) {
        listaFiltrada = listaFiltrada.filter(p => p.restrito === false);
    }

    listaFiltrada.sort((a, b) => {
        const aFavorito = favoritos.includes(a.id) ? 1 : 0;
        const bFavorito = favoritos.includes(b.id) ? 1 : 0;
        return bFavorito - aFavorito; 
    });

    renderizarCardapio(listaFiltrada);
}





function filtrarCategoria(categoria) {
categoriaAtiva = categoria; 

    const botoes = {
        'todos': document.getElementById('btn-todos'),
        'lanches': document.getElementById('btn-lanches'),
        'bebidas': document.getElementById('btn-bebidas'),
        'sobremesas': document.getElementById('btn-sobremesas')
    };

    Object.keys(botoes).forEach(chave => {
        if (botoes[chave]) {
            botoes[chave].classList.remove('btn-danger');
            botoes[chave].classList.add('btn-outline-danger');
        }
    });

    if (botoes[categoria]) {
        botoes[categoria].classList.remove('btn-outline-danger');
        botoes[categoria].classList.add('btn-danger');
    }

    atualizarTela();
}

function filtrarRestricoes() {
    atualizarTela(); 
}

function alternarFavorito(id) {
    const index = favoritos.indexOf(id);
    if (index === -1) {
        favoritos.push(id); 
    } else {
        favoritos.splice(index, 1); 
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    atualizarTela(); 
}


function adicionarAoCarrinho(id) {
    const itemNoCarrinho = carrinho.find(item => item.id === id);

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += 1;
    } else {
        const produtoOriginal = produtos.find(p => p.id === id);
        carrinho.push({ ...produtoOriginal, quantidade: 1 });
    }

    salvarEAtualizarCarrinho();
}

function salvarEAtualizarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarBadgeCarrinho();
    renderizarItensCarrinho();
}

function atualizarBadgeCarrinho() {
    const badge = document.getElementById('badge-carrinho');
    if (badge) {
        const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
        badge.innerText = totalItens;
    }
}


function renderizarItensCarrinho() {
    const listaHtml = document.getElementById('itens-carrinho');
    const totalHtml = document.getElementById('total-carrinho');
    if (!listaHtml || !totalHtml) return;
    
    listaHtml.innerHTML = "";
    let valorTotal = 0;

    if (carrinho.length === 0) {
        listaHtml.innerHTML = `<li class="list-group-item text-center text-muted py-3">Carrinho vazio</li>`;
    } else {
        carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            valorTotal += subtotal;

            listaHtml.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="my-0 fw-bold">${item.nome}</h6>
                        <small class="text-muted">Qtd: ${item.quantidade} x R$ ${item.preco.toFixed(2)}</small>
                    </div>
                    <div class="text-end">
                        <span class="text-dark fw-bold d-block mb-1">R$ ${subtotal.toFixed(2)}</span>
                        <button class="btn btn-sm btn-outline-danger py-0 px-1" onclick="removerDoCarrinho(${index})"><i class="bi bi-trash"></i></button>
                    </div>
                </li>
            `;
        });
    }
    totalHtml.innerText = `R$ ${valorTotal.toFixed(2)}`;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarEAtualizarCarrinho();
}


document.addEventListener("DOMContentLoaded", () => {
    atualizarTela(); 
    atualizarBadgeCarrinho();

    const modalElement = document.getElementById('modalCarrinho');
    if (modalElement) {
        modalElement.addEventListener('show.bs.modal', renderizarItensCarrinho);
    }
});


document.addEventListener('click', function (evento) {
   
    const botao = evento.target.closest('[data-bs-target="#modalCarrinho"]');
    if (botao) {
        evento.preventDefault();
      
        const elementoModal = document.getElementById('modalCarrinho');
        if (elementoModal) {
            
            const meuModal = new bootstrap.Modal(elementoModal);
            meuModal.show();
        }
    }
});
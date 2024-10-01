document.addEventListener('DOMContentLoaded', () => {
    // Elementos da tela
    const initialScreen = document.getElementById('initialScreen');
    const clientLoginScreen = document.getElementById('clientLoginScreen');
    const registerScreen = document.getElementById('registerScreen');
    const adminLoginScreen = document.getElementById('adminLoginScreen');
    const clientScreen = document.getElementById('clientScreen');
    const adminScreen = document.getElementById('adminScreen');
    const historyScreen = document.getElementById('historyScreen');

    // Botões
    const clientBtn = document.querySelector('.button-container button:nth-child(1)');
    const adminBtn = document.querySelector('.button-container button:nth-child(2)');
    const backToInitialBtn = document.getElementById('backToInitialBtn');
    const backToInitialBtnAdmin = document.getElementById('backToInitialBtnAdmin');
    const goToRegisterBtn = document.getElementById('goToRegisterBtn');
    const backToClientLoginBtn = document.getElementById('backToClientLoginBtn');
    const logoutClient = document.getElementById('logoutClient');
    const logoutAdmin = document.getElementById('logoutAdmin');
    const saveListBtn = document.getElementById('saveListBtn');
    const viewHistoryBtn = document.getElementById('viewHistoryBtn');
    const shareListBtn = document.getElementById('shareListBtn');
    const backToClientBtn = document.getElementById('backToClientBtn');

    // Formulários
    const registerForm = document.getElementById('registerForm');
    const clientLoginForm = document.getElementById('clientLoginForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminAddItemForm = document.getElementById('adminAddItemForm');
    const addItemForm = document.getElementById('addItemForm');

    // Outras variáveis
    const shoppingList = document.getElementById('shoppingList');
    const recommendations = document.getElementById('recommendations');
    const productsList = document.getElementById('productsList');

    let clients = JSON.parse(localStorage.getItem('clients')) || [];
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let currentList = [];
    let shoppingHistory = JSON.parse(localStorage.getItem('shoppingHistory')) || [];

    // Função para alternar as telas corretamente
    function showScreen(screen) {
        const screens = [
            initialScreen, clientLoginScreen, registerScreen, 
            adminLoginScreen, clientScreen, adminScreen, historyScreen
        ];
        screens.forEach(s => s.classList.add('hidden'));
        screen.classList.remove('hidden');
    }

    // Exemplo de como alternar entre as telas
    clientBtn.addEventListener('click', () => showScreen(clientLoginScreen));
    adminBtn.addEventListener('click', () => showScreen(adminLoginScreen));
    backToInitialBtn.addEventListener('click', () => showScreen(initialScreen));
    backToInitialBtnAdmin.addEventListener('click', () => showScreen(initialScreen));
    goToRegisterBtn.addEventListener('click', () => showScreen(registerScreen));
    backToClientLoginBtn.addEventListener('click', () => showScreen(clientLoginScreen));
    logoutClient.addEventListener('click', () => showScreen(initialScreen));
    logoutAdmin.addEventListener('click', () => showScreen(initialScreen));
    backToClientBtn.addEventListener('click', () => showScreen(clientScreen));

    // Função para exibir as recomendações
    function displayRecommendations() {
        const popularItems = {
            "Frutas": ["Banana", "Maçã", "Laranja", "Manga"],
            "Verduras e Legumes": ["Alface", "Tomate", "Cenoura", "Brócolis"],
            "Carnes": ["Frango", "Carne Bovina", "Peixe", "Porco"],
            "Laticínios": ["Leite", "Queijo", "Iogurte", "Manteiga"],
            "Padaria": ["Pão", "Croissant", "Bolo", "Torrada"],
            "Bebidas": ["Água", "Refrigerante", "Suco", "Cerveja"],
            "Limpeza": ["Detergente", "Sabão em Pó", "Água Sanitária", "Esponja"],
            "Higiene Pessoal": ["Shampoo", "Sabonete", "Pasta de Dente", "Desodorante"]
        };

        recommendations.innerHTML = '<h3>Recomendações para você</h3>';
        Object.keys(popularItems).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-recommendation');
            categoryDiv.innerHTML = `<h4>${category}</h4>`;
            popularItems[category].forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item-recommendation');
                itemDiv.textContent = item;
                itemDiv.addEventListener('click', () => {
                    currentList.push({ name: item, quantity: 1, category });
                    updateShoppingList();
                });
                categoryDiv.appendChild(itemDiv);
            });
            recommendations.appendChild(categoryDiv);
        });
    }

    // Atualiza a lista de compras
    function updateShoppingList() {
        shoppingList.innerHTML = '';
        currentList.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.quantity}x ${item.name} (${item.category})`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Remover';
            deleteBtn.addEventListener('click', () => {
                currentList.splice(index, 1);
                updateShoppingList();
            });
            li.appendChild(deleteBtn);

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => {
                const newQuantity = prompt('Digite a nova quantidade:', item.quantity);
                if (newQuantity && !isNaN(newQuantity)) {
                    currentList[index].quantity = parseInt(newQuantity, 10);
                    updateShoppingList();
                }
            });
            li.appendChild(editBtn);

            shoppingList.appendChild(li);
        });
        displayRecommendations();
    }

    // Exibe produtos
    function displayProducts() {
        productsList.innerHTML = '';
        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - R$${product.price.toFixed(2)} (${product.category})`;
            productsList.appendChild(listItem);
        });
    }

    // Cadastro de cliente
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const clientName = document.getElementById('clientName').value.trim();
        const clientEmail = document.getElementById('clientEmail').value.trim();
        const clientPassword = document.getElementById('clientPassword').value.trim();

        if (!clientName || !clientEmail || !clientPassword) {
            alert('Todos os campos são obrigatórios!');
            return;
        }

        if (clients.find(c => c.email === clientEmail)) {
            alert('E-mail já cadastrado!');
            return;
        }

        const client = { name: clientName, email: clientEmail, password: clientPassword };
        clients.push(client);
        localStorage.setItem('clients', JSON.stringify(clients));
        alert('Cadastro realizado com sucesso!');
        showScreen(clientLoginScreen);
    });

    // Login de cliente
    clientLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const loginEmail = document.getElementById('loginEmail').value.trim();
        const loginPassword = document.getElementById('loginPassword').value.trim();

        const client = clients.find(c => c.email === loginEmail && c.password === loginPassword);

        if (client) {
            alert('Login realizado com sucesso!');
            showScreen(clientScreen);
        } else {
            alert('Email ou senha incorretos!');
        }
    });

    // Login de administrador
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const adminUser = document.getElementById('adminUser').value.trim();
        const adminPassword = document.getElementById('adminPassword').value.trim();

        if (adminUser === 'Guilherme' && adminPassword === 'Guil050504') {
            alert('Login de administrador bem-sucedido!');
            showScreen(adminScreen);
            displayProducts();
        } else {
            alert('Usuário ou senha de administrador incorretos!');
        }
    });

    // Adicionar produto (admin)
    adminAddItemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const itemName = document.getElementById('adminItemName').value.trim();
        const itemPrice = parseFloat(document.getElementById('adminItemPrice').value.trim());
        const itemCategory = document.getElementById('adminItemCategory').value.trim();

        if (!itemName || isNaN(itemPrice) || !itemCategory) {
            alert('Todos os campos são obrigatórios e o preço deve ser um número válido!');
            return;
        }

        const product = { name: itemName, price: itemPrice, category: itemCategory };
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        alert('Produto adicionado com sucesso!');
        displayProducts();
    });

    // Salvar lista de compras
    saveListBtn.addEventListener('click', () => {
        shoppingHistory.push(currentList);
        localStorage.setItem('shoppingHistory', JSON.stringify(shoppingHistory));
        alert('Lista de compras salva com sucesso!');
        currentList = [];
        updateShoppingList();
    });

    // Visualizar histórico de compras
    viewHistoryBtn.addEventListener('click', () => {
        showScreen(historyScreen);
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        shoppingHistory.forEach((list, index) => {
            const li = document.createElement('li');
            li.textContent = `Compra ${index + 1}: ${list.map(item => `${item.quantity}x ${item.name}`).join(', ')}`;
            historyList.appendChild(li);
        });
    });

    // Compartilhar lista de compras
    shareListBtn.addEventListener('click', () => {
        const shareText = currentList.map(item => `${item.quantity}x ${item.name}`).join(', ');
        alert(`Sua lista de compras: ${shareText}`);
    });

    // Inicializa a tela inicial
    showScreen(initialScreen);
});

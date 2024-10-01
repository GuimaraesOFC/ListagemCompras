// cypress/integration/compras.spec.js

describe('Salvar e Visualizar Histórico de Compras', () => {
  // Antes de cada teste, logamos como um cliente
  beforeEach(() => {
      cy.loginAsClient(); // Função personalizada para fazer login como cliente
  });

  it('Deve salvar a lista de compras', () => {
      // Preenche o campo de item
      cy.get('input[name="item"]').type('Banana'); // Insere "Banana"
      
      // Preenche o campo de quantidade
      cy.get('input[name="quantidade"]').type('2'); // Insere "2"
      
      // Adiciona o item à lista
      cy.get('button[id="addItemBtn"]').click(); // Clica no botão para adicionar o item
      
      // Salva a lista de compras
      cy.get('button[id="saveListBtn"]').click(); // Clica no botão para salvar a lista

      // Verifica se a mensagem de sucesso aparece
      cy.contains('Lista de compras salva com sucesso!').should('be.visible');
  });

  it('Deve visualizar o histórico de compras', () => {
      // Clica no botão para visualizar o histórico
      cy.get('button[id="viewHistoryBtn"]').click();

      // Verifica se a seção de histórico de compras está visível
      cy.contains('Histórico de Compras').should('be.visible');
      
      // Verifica se a lista salva aparece no histórico
      cy.contains('2x Banana').should('be.visible'); // Verifica se "2x Banana" está no histórico
  });

  it('Deve mostrar mensagem de erro se o campo de item estiver vazio', () => {
      // Tenta salvar a lista sem preencher o campo de item
      cy.get('button[id="saveListBtn"]').click();
      
      // Verifica se a mensagem de erro aparece
      cy.contains('O campo item é obrigatório').should('be.visible');
  });

  it('Deve permitir editar um item da lista de compras', () => {
      // Preenche o campo de item e quantidade
      cy.get('input[name="item"]').type('Banana');
      cy.get('input[name="quantidade"]').type('2');
      cy.get('button[id="addItemBtn"]').click(); // Adiciona o item
      cy.get('button[id="saveListBtn"]').click(); // Salva a lista

      // Clica no botão para editar o item
      cy.get('button[id="editItemBtn"]').click(); // Supondo que esse botão exista
      cy.get('input[name="item"]').clear().type('Maçã'); // Altera o nome do item
      cy.get('button[id="saveListBtn"]').click(); // Salva a lista editada
      
      // Verifica se a mensagem de sucesso aparece
      cy.contains('Lista de compras salva com sucesso!').should('be.visible');
      
      // Verifica se a nova lista aparece no histórico
      cy.get('button[id="viewHistoryBtn"]').click();
      cy.contains('2x Maçã').should('be.visible'); // Verifica se "2x Maçã" está no histórico
  });

  it('Deve permitir excluir um item da lista de compras', () => {
      // Preenche o campo de item e quantidade
      cy.get('input[name="item"]').type('Banana');
      cy.get('input[name="quantidade"]').type('2');
      cy.get('button[id="addItemBtn"]').click(); // Adiciona o item
      cy.get('button[id="saveListBtn"]').click(); // Salva a lista

      // Clica no botão para excluir o item
      cy.get('button[id="deleteItemBtn"]').click(); // Supondo que esse botão exista
      cy.get('button[id="saveListBtn"]').click(); // Salva a lista novamente
      
      // Verifica se a mensagem de sucesso aparece
      cy.contains('Lista de compras salva com sucesso!').should('be.visible');

      // Verifica se o item excluído não aparece no histórico
      cy.get('button[id="viewHistoryBtn"]').click();
      cy.contains('2x Banana').should('not.exist'); // Verifica se "2x Banana" não está no histórico
  });
});

describe('Testes de Login de Cliente', () => {
  beforeEach(() => {
      cy.visit('http://127.0.0.1:5500'); // Substitua pelo seu endereço local
  });

  it('Deve permitir que o cliente faça login com sucesso', () => {
      // Acessa a tela de login do cliente
      cy.contains('Entrar como Cliente').click();
      cy.get('#loginEmail').type('cliente@example.com');
      cy.get('#loginPassword').type('senha123');
      cy.contains('Entrar').click();

      // Verifica se a tela do cliente foi carregada
      cy.get('#clientScreen').should('be.visible');
  });

  it('Deve redirecionar para tela de cadastro de cliente', () => {
      cy.contains('Entrar como Cliente').click();
      cy.contains('Criar Conta').click();
      cy.get('#registerScreen').should('be.visible');
  });

  it('Deve permitir que o cliente crie uma conta', () => {
      cy.contains('Entrar como Cliente').click();
      cy.contains('Criar Conta').click();

      // Preenche o formulário de cadastro
      cy.get('#clientName').type('Novo Cliente');
      cy.get('#clientEmail').type('novocliente@example.com');
      cy.get('#clientPassword').type('senha123');
      cy.contains('Cadastrar').click();

      // Verifica se redirecionou para a tela de login
      cy.get('#clientLoginScreen').should('be.visible');
  });
});

describe('Testes do Sistema de Lista de Compras', () => {
  beforeEach(() => {
      cy.visit('http://localhost:5500'); // Certifique-se de que o servidor esteja rodando na porta correta
  });

  it('Deve permitir que um novo cliente crie uma conta', () => {
      // Força o clique no botão "Entrar como Cliente" mesmo que esteja invisível
      cy.get('button').contains('Entrar como Cliente').click({force: true});

      // Clique no botão "Criar Conta" para exibir a tela de cadastro
      cy.get('button').contains('Criar Conta').click({force: true});

      // Preencher o formulário de cadastro
      cy.get('input#clientName').type('Cliente Teste');
      cy.get('input#clientEmail').type('cliente.teste@example.com');
      cy.get('input#clientPassword').type('senha123');
      
      // Clicar no botão de cadastro
      cy.get('button').contains('Cadastrar').click({force: true});

      // Verificar se voltou para a tela de login
      cy.get('h1').contains('Login do Cliente').should('be.visible');
  });
});

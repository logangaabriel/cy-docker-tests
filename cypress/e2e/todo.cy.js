describe('To-Do App', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  context('Initial Display', () => {
    it('should display two default todo items', () => {
      cy.get('.todo-list li').should('have.length', 2)

      cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
      cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
    })
  })

  context('Adding Tasks', () => {
    it('should allow adding a new todo item', () => {
      const newItem = 'Feed the cat'

      cy.get('[data-test=new-todo]')
        .type(`${newItem}{enter}`)

      cy.get('.todo-list li')
        .should('have.length', 3)
        .last()
        .should('have.text', newItem)
    })

    it('should not allow adding an empty todo item', () => {
      cy.get('[data-test=new-todo]')
        .type('{enter}')

      cy.get('.todo-list li').should('have.length', 2)
    })
  })

  context('Completing Tasks', () => {
    it('should allow marking a todo item as completed', () => {
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()

      cy.contains('Pay electric bill')
        .parents('li')
        .should('have.class', 'completed')
    })
  })

  context('With Completed Tasks', () => {
    beforeEach(() => {
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    it('should filter to show only uncompleted tasks', () => {
      cy.contains('Active').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog')

      cy.contains('Pay electric bill')
        .should('not.exist')
    })

    it('should filter to show only completed tasks', () => {
      cy.contains('Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill')

      cy.contains('Walk the dog')
        .should('not.exist')
    })

    it('should allow deleting all completed tasks', () => {
      cy.contains('Clear completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')

      cy.contains('Clear completed')
        .should('not.exist')
    })
  })
})

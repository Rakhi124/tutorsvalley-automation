// cypress/pages/questionsPage.js
import questionData from '../fixtures/question.json'
import tutor from '../fixtures/tutorCredentials.json'
export function createQuestion() {
  const questionText = questionData.questionText
  const topicText = questionData.topicText

  cy.loginAsTutorUI(tutor.email,tutor.password);
 
     cy.verifyToken();
 
    // ===== Without Logout (same session) =====
    cy.visit('/tutor');
    cy.handleConsentModalIfPresent();
 

  // expose for later use
  cy.wrap(questionText).as('questionText')

  // ⭐ Open sidebar
  cy.get('button.sidebar-toggle-btn', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true })

  cy.wait(2000)

  // ⭐ Go to Questions page
  cy.contains('a', 'Questions', { timeout: 10000 })
    .scrollIntoView()
    .click({ force: true })

  cy.wait(2000)
  cy.url().should('include', '/tutor/questions')

  // ⭐ Add Question
  cy.contains('button', 'Add Question')
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true })

  cy.url().should('include', '/tutor/add-question')

  // ---------- syllabus ----------
  cy.get('#syllabus')
    .find('option')
    .not('[value=""]')
    .should('have.length.greaterThan', 0)
    .then($options => {
      const idx = Math.floor(Math.random() * $options.length)
      const value = $options[idx].value
      const text  = $options[idx].innerText.trim()

      cy.wrap(text).as('syllabusText')

      cy.get('#syllabus')
        .select(value)
        .should('have.value', value)
    })

  // exam board (if needed)
  cy.get('@syllabusText').then(syl => {
    const syllabus = syl.trim().toLowerCase()

    if (syllabus === 'gcse' || syllabus === 'a level') {
      cy.get('#board', { timeout: 10000 })
        .should('be.visible')
        .find('option')
        .not('[value=""]')
        .then($opts => {
          const index = Math.floor(Math.random() * $opts.length)
          const randomValue = $opts[index].value

          cy.get('#board')
            .select(randomValue)
            .should('have.value', randomValue)
        })
    }
  })

  // ---------- course ----------
  cy.get('#course').should('not.be.disabled')
  cy.get('#course')
    .find('option')
    .not('[value=""]')
    .should('have.length.greaterThan', 0)
    .then($options => {
      const idx = Math.floor(Math.random() * $options.length)
      const value = $options[idx].value
      const text  = $options[idx].innerText.trim()

      cy.wrap(text).as('courseText')

      cy.get('#course')
        .select(value)
        .should('have.value', value)
    })

  // ---------- year ----------
  cy.get('#year').should('not.be.disabled')
  cy.get('#year')
    .find('option')
    .not('[value=""]')
    .should('have.length.greaterThan', 0)
    .then($options => {
      const idx = Math.floor(Math.random() * $options.length)
      const value = $options[idx].value

      cy.get('#year')
        .select(value)
        .should('have.value', value)
    })

  // Question Text
  cy.get('#question').type(questionText, { force: true })

  // Options from fixture
  cy.get('#option_A').type(questionData.options.A)
  cy.get('#option_B').type(questionData.options.B)
  cy.get('#option_C').type(questionData.options.C)
  cy.get('#option_D').type(questionData.options.D)

  // Correct Answer
  cy.get('#answer_B').first().check({ force: true })

  // Scroll + topic
  cy.window().scrollTo('top')
  cy.wait(500)
  cy.get('#topic').type(topicText, { force: true })

  // Save
  cy.contains('button', 'Save')
    .scrollIntoView()
    .click({ force: true })

  cy.contains(questionData.messages.create, { timeout: 15000 })
    .should('be.visible')

  cy.wait(3000)
  cy.go('back')
  cy.url().should('include', '/tutor/questions')

  cy.wait(2000)
  cy.get('table tbody tr', { timeout: 15000 })
    .should('have.length.at.least', 1)
}

export function editCreatedQuestion() {
  cy.get('@questionText').then(q => {
    cy.get('@syllabusText').then(syl => {
      cy.get('@courseText').then(course => {

        const expectedQuestion   = q.toLowerCase()
        const expectedSyllabus   = syl.toLowerCase().trim()
        const expectedCourse     = course.toLowerCase().trim()
        const updatedQuestionText = `${q}${questionData.updatedSuffix}`

        cy.wrap(updatedQuestionText).as('updatedQuestionText')

        // 1) Find the created row and click Edit
        cy.get('table tbody tr', { timeout: 15000 }).then($rows => {
          const matchingRow = $rows.toArray().find(row => {
            const text = row.innerText.toLowerCase()
            return (
              text.includes(expectedQuestion) &&
              text.includes(expectedSyllabus) &&
              text.includes(expectedCourse)
            )
          })

          expect(matchingRow, 'row with created question').to.not.be.undefined

          cy.wrap(matchingRow)
            .find('i.bi.bi-pencil-square')
            .should('be.visible')
            .click({ force: true })
        })

        // 2) On edit page – update ONLY question text
        cy.url().should('include', '/tutor/edit-question')
        cy.wait(3000)

        cy.get('#question')
          .clear()
          .type(updatedQuestionText, { force: true })

        cy.wait(2000)

        cy.window().scrollTo('top')
        cy.wait(500)

        cy.contains('button', 'Save')
          .scrollIntoView()
          .click({ force: true })

        cy.contains(questionData.messages.edit, { timeout: 15000 })
          .should('be.visible')

        cy.wait(3000)

        // 3) Back to list – verify updated text and reopen
        cy.go('back')
        cy.url().should('include', '/tutor/questions')

        cy.get('table tbody tr', { timeout: 15000 }).then($rows => {
          const updatedRow = $rows.toArray().find(row =>
            row.innerText.toLowerCase().includes(updatedQuestionText.toLowerCase())
          )

          expect(updatedRow, 'row with UPDATED question').to.not.be.undefined

          cy.wrap(updatedRow)
            .find('i.bi.bi-pencil-square')
            .should('be.visible')
            .click({ force: true })
        })

        // 4) Final check on edit page
        cy.url().should('include', '/tutor/edit-question')
        cy.get('#question').should('have.value', updatedQuestionText)
        cy.wait(2000)
      })
    })
  })
}

export function deleteCreatedQuestion() {
  cy.get('@updatedQuestionText').then(updatedQ => {
    cy.get('@syllabusText').then(syl => {
      cy.get('@courseText').then(course => {

        const expectedQuestion = updatedQ.toLowerCase()
        const expectedSyllabus = syl.toLowerCase().trim()
        const expectedCourse   = course.toLowerCase().trim()

        // ensure on list page
        cy.go('back')
        cy.url().should('include', '/tutor/questions')

        // 1) Find the UPDATED row and click delete icon
        cy.get('table tbody tr', { timeout: 15000 }).then($rows => {
          const matchingRow = $rows.toArray().find(row => {
            const text = row.innerText.toLowerCase()
            return (
              text.includes(expectedQuestion) &&
              text.includes(expectedSyllabus) &&
              text.includes(expectedCourse)
            )
          })

          expect(matchingRow, 'row with UPDATED question to DELETE')
            .to.not.be.undefined

          cy.wrap(matchingRow)
            .find('i.bi.bi-trash')
            .should('be.visible')
            .click({ force: true })
        })

        cy.wait(2000)

        // 2) Delete Question modal
        cy.contains('.modal-title', 'Delete Question', { timeout: 10000 })
          .should('be.visible')

        cy.get('#modal-btn-0')
          .should('be.visible')
          .click()

        // 3) Success + modal close
        cy.contains(questionData.messages.delete, { timeout: 15000 })
          .should('be.visible')

        cy.wait(2000)
        cy.get('#modal-btn-0').should('not.exist')

        // 4) Verify row is gone
        cy.get('table tbody tr', { timeout: 15000 }).then($rows => {
          const stillExists = $rows.toArray().some(row => {
            const text = row.innerText.toLowerCase()
            return (
              text.includes(expectedQuestion) &&
              text.includes(expectedSyllabus) &&
              text.includes(expectedCourse)
            )
          })

          expect(stillExists, 'row should be deleted').to.be.false
        })
      })
    })
  })
}

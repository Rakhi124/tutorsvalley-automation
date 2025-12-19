class AssignStudentsPage {

  // ----------------------------------------------------
  // QUIZ CARD → Click first "+ Assign Students" button
  // ----------------------------------------------------
  clickFirstAssignStudentsButton() {
    cy.get('.mainCard').each(($card) => {
      const assignBtn = $card.find('button.assign_btn');

      if (assignBtn.length > 0) {
        const quizTitle = $card.find('h5').text().trim();
        cy.log("Quiz with +Assign Students → " + quizTitle);

        cy.wrap(assignBtn).click({ force: true });
        return false; // stop loop
      }
    });
  }

  


  // ----------------------------------------------------
  // QUIZ CARD → Click Assign Students in FIRST card
  // ----------------------------------------------------
  getQuizCards() {
    return cy.get('.mainCard');
  }

  clickAssignStudentsInFirstCard() {
    this.getQuizCards()
      .first()
      .find('button.assign_btn')
      .click({ force: true });
  }
clickAssignStudentsButton() 
{ cy.contains('button.assign_btn', '+ Assign Students') .should('be.visible') .click({ force: true }); }
  // ----------------------------------------------------
  // STUDENT SELECTION METHODS
  // ----------------------------------------------------


  clickAssignStudentsForQuiz(validSearch) {
  cy.contains('.mainCard', validSearch).should('be.visible').then(() => {
    cy.contains('button', '+ Assign Students')
      .should('be.visible') .click({ force: true });
  });
}
verifyAssignStudentModalOpen() {
  cy.get("#AssignStudentModal")
    .should("exist")
    .and("have.class", "show");



}









listStudentsForSpecificCard() {
  // Find the card with the matching title
  cy.get('.modal .student-list .student-card', { timeout: 10000 })
    .should('have.length.greaterThan', 0)
    .each(($card, index) => {
      const name = $card.find('h5').text().trim();
      const status = $card.find('.assignText').text().trim();
      cy.log(`Student ${index + 1}: ${name} - ${status}`);
    });
}
clickAssignStudentsForQuiz(quizTitle) {
  cy.contains('.mainCard', quizTitle)
    .within(() => { cy.contains('button', '+ Assign Students') .click({ force: true }); });
}



closeAssignStudentModal() 
{ cy.get('.btn-close').should('be.visible').click({ force: true }); }

loadStudentList() {
  return cy.get('.student-list .student-card:visible');
}








  // ✅ Click submit without selecting any student
  clickSubmitWithoutSelectingStudent() {
    cy.get('#submit-btn')
      .should('be.visible')
      .click({ force: true });
  }

  // ✅ Search input
  getSearchInput() {
  return cy.get('#AssignStudentModal input.searchInput')
    .eq(0)  
    .scrollIntoView()
    .should('be.visible');
}

  // ✅ Student card by name
  getStudentCard(studentName) {
  return cy.contains('.student-card', studentName).eq(0)  
    .scrollIntoView()
    .should('be.visible');
  }

  // ✅ Add/remove circle inside student card
  // ✅ Add/remove circle inside student card
getSelectCircle(studentName) {
  return this.getStudentCard(studentName)
    .find('#addRemoveQuestion').eq(0)  
    .should('be.visible');
}


 

  // ✅ Verify toast message for missing student selection
  verifySelectStudentToast() {
    cy.get('.Toastify__toast-body')
      .should('contain.text', 'Please select at least one student.');
  }

  






verifySuccessAndClickOk() {
  cy.get('.Toastify__toast-body', { timeout: 10000 })
  .should('be.visible')
  .and('contain.text', 'Selected Students are Successfully Added!');

  cy.get('.modal-content .modal-footer')
    .contains('button', 'OK')
    .click({ force: true });
}


assignStudentsFlow() {
  cy.get('.student-list .student-card').then(($rows) => {
    let assigned = 0;
    let unassigned = 0;

    // Count assigned and unassigned students
    $rows.each((i, row) => {
      const status = Cypress.$(row).find('.assignText').text().trim();
      if (status === 'Assigned') assigned++;
      if (status === '+ Assign') unassigned++;
    });

    cy.log(`Assigned: ${assigned}`);
    cy.log(`Unassigned: ${unassigned}`);

    // Check if "All Students Assigned" message is visible
    cy.get('body').then(($body) => {
      const headerText = $body
        .find('.modalTableHeader1 span.text-success')
        .text()
        .trim();

      if (headerText === 'All Students Assigned') {
        cy.log('All students assigned — clicking Cancel');

        cy.get('.modal-footer')
          .contains('button', 'Cancel')
          .click({ force: true });

        return; // stop further execution
      }

      // If unassigned > 0, click the radio button of the first unassigned student
      if (unassigned > 0) {
        cy.get('.student-list .student-card').each(($row) => {
          const status = Cypress.$($row).find('.assignText').text().trim();

          if (status === '+ Assign') {
            cy.wrap($row)
              .find('#addRemoveQuestion')
              .click({ force: true });

            return false; // stop after clicking one
          }
        });

        // Click Submit button
        cy.get('.modal-footer')
          .contains('button', 'Submit')
          .click({ force: true });

        // Verify success message
        cy.get('.modal-content .modal-body p')
          .should('contain.text', 'Selected Students are  Successfully Added!');

        // Click OK button
        cy.get('.modal-content .modal-footer')
          .contains('button', 'OK')
          .click({ force: true });
      }
    });
  });
}













  

}

export default AssignStudentsPage;

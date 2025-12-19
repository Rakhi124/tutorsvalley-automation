



class QuizPage {

  // ---------- SELECTORS ----------
  elements = {
    agreeBtn: () => cy.get('#modal-btn-0'),
    hamMenu: () => cy.get('button.sidebar-toggle-btn'),
    quizMenu: () => cy.get('#root a[href="/tutor/quiz"]'),

    closeModalBtn: () =>cy.get('.modal.show button').first(),
    quizCountText: () => cy.get('.quiz_count'),
    quizCards: () => cy.get('.quiz-card'),
    assignBtn: () => cy.get('button.assign_btn'),
    searchInput: () => cy.get('input[placeholder="Search Quiz..."]')
  
    
  };

  handlePopups() {
  cy.get('body').then(($body) => {

    // Handle Agree button popup
    if ($body.find('#modal-btn-0').length > 0) {
      cy.get('#modal-btn-0').click({ force: true });
    }

    // Handle Close Modal popup
    if ($body.find('.modal.show button').length > 0) {
      cy.get('.modal.show button').first().click({ force: true });
    }

  });
}

  openMenu() { 
  cy.get('body').then(($body) => { if ($body.find('button.sidebar-toggle-btn').length > 0) 
    { cy.get('button.sidebar-toggle-btn').click({ force: true }); } }); }















  // ---------- ACTION METHODS ----------
  clickAgreeButton() {
  this.elements.agreeBtn()
    .should('exist')
    .click({ force: true });
  }

  openMenu() {
    this.elements.hamMenu()
      .should('exist')
      .click({ force: true });
  }

  

  
  

  clickQuizMenu() {
    

   cy.contains('a.nav-link', 'Quiz').click({ force: true });


  // cy.get('i.bi-journal-medical')
  // .parents('a')
  // .click({ force: true });
}

clickCloseModal() {
  this.elements.closeModalBtn()
    .should("be.visible")
    .click({ force: true });
}

open() {
    cy.get('input[placeholder="Date"]').click({ force: true });
  }

  

  selectDay(day, month, year) {

  // 1. Open the datepicker
  cy.get('input[placeholder="Date"]').click({ force: true });

  // 2. Navigate to the correct month & year
  cy.get('.react-datepicker__current-month').then(($header) => {
    const current = $header.text().trim(); // e.g., "December 2025"
    const target = `${month} ${year}`;

    if (current === target) return; // already on correct month/year

    function navigate() {
      cy.get('.react-datepicker__current-month').then(($h) => {
        const currentText = $h.text().trim();

        if (currentText === target) return;

        // If current year/month is before target → click next
        cy.get('.react-datepicker__navigation--next').click({ force: true });

        navigate();
      });
    }

    navigate();
  });

  // 3. Select the day
  const formatted = String(day).padStart(2, '0');

  cy.get(`.react-datepicker__day--0${formatted}`)
    .not('.react-datepicker__day--outside-month')
    .click({ force: true });
}






    
  closeCalendar() {
    cy.get('body').click(0, 0); // click outside to close
  }
   
assertNoDataFound(){ 
  cy.contains(/no data found/i).should('be.visible'); 

 }







searchQuiz(text) 
{ 
  //cy.get('body').click(0, 0);
  this.elements.searchInput() 
  .scrollIntoView() 
  .should('be.visible') 
  .click({ force: true }) .clear({ force: true }) .type(text, { delay: 50,force: true }); }
StudentAssignment()
{cy.get('#card_boby button.text-white').click();}
  

  assertNoQuizResults() 
  { 
    cy.contains(/no.*found/i).should('be.visible');
  }

  

 
}

export default  QuizPage;

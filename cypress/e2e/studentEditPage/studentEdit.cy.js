// Put everything needed to create the login session in this setup function
const loginSetup = () => {
  // 1. Visit login page
  cy.visit('https://beta.tutorsvalley.com/login');

  // 2. Login
  cy.get("input[placeholder='enter your email address']") //Username
    .type('ninimariamvarghese+232@techversantinfotech.com');

  cy.get("input[placeholder='enter your password']") //Password
    .type('Tech@Valley01');

  cy.get('.landing-btn.button-wrapper.landing-no-arrow.w-100').click(); //Submit button

  // 3. Agree modal
  cy.get('div.modal-dialog', { timeout: 10000 }).should('be.visible');
  cy.get('#modal-btn-0').click();
  cy.wait(3000);

  // 4. Hover & click Profile
  cy.get('#user-dropdown').trigger('mouseover');
  cy.get('.dropdown-item').first().click();

  // 5. Click Edit Profile
  cy.get('#root div.student-profile-header-banner-content button.dashboard-btn')
    .click();
};

describe('TutorsValley Login', () => {

  // Runs before EVERY test
  beforeEach(() => {
    // 👉 First time: runs loginSetup() and saves "loginSession"
    // 👉 Next tests: restores the session (usually doesn’t re-run loginSetup)
    cy.session('loginSession', loginSetup);

    // After session is ready, directly open edit profile page
    cy.visit('https://beta.tutorsvalley.com/student/editprofile');
  });

    it('Verify the user redirect to profile edit page', () => {
    cy.url().should('include', '/student/editprofile');
    // add more assertions here if needed
  });
  
  //  Verify the user is on profile edit page
  it('Verify the user redirect to profile edit page', () => {  
  cy.get('#efname').should('be.visible').click()
  });
 
  //  Verify the user can enter First name and last name
  it('Verify the user Enter First name', () => {
  cy.wait(5000)
  cy.get("#efname")      // Change First name
  .should('be.visible')
  .clear()             // remove content
  .type('Demo');       // Type the new content
  });
 
 // Clear show error when First Name is empty
  it('Should show error when First Name is empty', () => {
  cy.wait(5000)
  cy.get('#efname').clear();  // Clear the First Name field
  cy.get('button[class="dashboard-btn false"]').click() // Click the Submit button
  // Assert validation message    
  cy.contains('This field is required.').should('be.visible');
  
  });
 
  //Change Last name
  it('Verify the user Enter Last name and last name', () => {
  cy.wait(5000)  
  cy.get("#elname")
  .should('be.visible')
  .clear()              //  This is the correct command to remove content
  .type('Student')
  })
 
  // Clear Last name and click submit button
  it('Should show error when Last Name is empty', () => {
    cy.wait(5000)
  cy.get('#elname').clear()  // Clear the First Name field
  cy.get('button[class="dashboard-btn false"]').click() // Click the Submit button
  // Assert validation message
  cy.contains('This field is required.', { timeout: 10000 }).should('be.visible')
  })
 
 //Upload profile image
 it.only('Verify the Upload image functionality', () => {
  cy.wait(5000)
  cy.get('#upload').selectFile('cypress/fixtures/Profileimage2.jpg', { force: true })
 })
 
//Invalid image upload
  it.only('Verify the Upload invalid image size', () => {
  cy.wait(5000)  
  cy.get('input[type="file"]').selectFile('cypress/fixtures/InvalidImageSize.jpg', { force: true })
  cy.get('.text-danger').should('be.visible')
  .and('contain', 'Image must be at least 500KB in size and no more than 2MB.')
 });
 
  //Click radio button
  it('Verify the user can select Gender', () => {
  cy.wait(5000)  
  cy.get('#Bio_details div:nth-child(1) > label.form-check-label').click()
  cy.get('#Bio_details input[value="Male"]').check()
  });
 
  //Email ID edit
  it('Verify the user can edit email ID', () => {
  cy.get('input[id="eemail"]')
  .clear()
  .type('ninimariamvarghese+233new@techversantinfotech.com')
  })
 
  //Invalid email ID or Email Validation
  it('Verify the user can invalid validation', () => {
    cy.wait(5000)
  cy.get('input[id="eemail"]').clear()
  .type('ninimariamvarghese+233techversantinfotech')
  cy.get('button[class="dashboard-btn false"]').click()
  //cy.contains('Invalid email address').should('be.visible')
  cy.contains('Invalid email address', { timeout: 10000 }).should('be.visible')
  })
 

   before(() => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('t.$_Tawk.i18next is not a function')) {
        return false;
      }
      return true;
    });
  });

  //Selecting nationality from dropdown
  it('Verify the user can select nationality name from the dropdown', () => {
  cy.get('.student-profile-bio').find('#rfs-btn').eq(0).click();  
  cy.contains('li', 'Argentina').click({ force: true })   // select item
  cy.get('#rfs-btn').should('contain', 'Argentina')
  })
 
//Searching and selecting nationality from dropdown
it('Verify the user can search and select nationality name from the dropdown', () => {
cy.get('.student-profile-bio').find('#rfs-btn').eq(0).click();
cy.get('.ReactFlagsSelect-module_filterBox__3m8EU').type('Argentina')
cy.contains('li', 'Argentina').click();
});
 
// Selecting country from dropdown
it('Verify the user can select country name from the dropdown', () => {
cy.wait(10000) // open dropdown
cy.get('div:nth-child(4) [data-testid="rfs-btn"]').click();
cy.get('#rfs-AR span.ReactFlagsSelect-module_selectOptionValue__vS99-').click();
})
 
//Searching and selecting country from dropdown
it('Verify the user can search and select Country name from the dropdown', () => {
cy.wait(10000) // open dropdown
cy.get('div:nth-child(4) [data-testid="rfs-btn"]').click();
cy.get('[data-testid="rfs"] [name="rfs-q"]').click();
cy.get('[data-testid="rfs"] [name="rfs-q"]').type('Arge');
cy.get('#rfs-AR span.ReactFlagsSelect-module_label__27pw9').click();
});
 
//Enter new phone number  
it('Verify the user can enter new phone number', () => {
cy.wait(10000)
cy.get('[name="ephone"]').click();
cy.get('[name="ephone"]').clear();
cy.get('[name="ephone"]').type('8943534709');
cy.get('#Bio_details div:nth-child(4) div.col-md-4').click();
});

//Mobile number field validation 1
it('Veify the empty mobile field validation', () => {
cy.wait(5000)
cy.get('#Bio_details div.student-profile-bio > div:nth-child(4)').click();
cy.get('[name="ephone"]').clear();
cy.get('#root button.false').click();
cy.contains('This field is required.', { timeout: 10000 }).should('be.visible')
});
 
//Mobile number field validation 2
it('Verify the Invalid mobile number format validation', () => {
cy.wait(5000)
cy.get('[name="ephone"]').click();
cy.get('[name="ephone"]').clear();
cy.get('[name="ephone"]').type('@#$%gdbhgf');
cy.get('#root button.false').click();
cy.get('#Bio_details div:nth-child(4) div.col-md-4').click();
cy.contains('Phone number must contain only digits.', { timeout: 10000 }).should('be.visible')
});
 
//Edit parent/guardian name
it('Verify the user can Edit parent/guardian name', () => {
cy.wait(5000)
cy.get('[name="epname"]').click();
cy.get('[name="epname"]').clear();
cy.get('[name="epname"]').type('TestDemo');
cy.get('#Bio_details div:nth-child(6) h5').click();
});
 
//Empty parent/guardian name field validation
it('Verify the Empty parent/guardian name field validation', () => {
cy.wait(5000)
cy.get('#Bio_details div:nth-child(7) > div:nth-child(1)').click();
cy.get('[name="epname"]').clear();
cy.get('#root button.false').click();
cy.contains('This field is required.', { timeout: 10000 }).should('be.visible')
});
 
//Empty email field validation
it('Verify the empty email field validation', () => {
cy.wait(5000)
cy.get('[name="epemail"]').click();
cy.get('[name="epemail"]').clear();
cy.get('#root button.false').click();
cy.contains('Email field is required.', { timeout: 10000 }).should('be.visible')
});
 
//Invalid email field validation
it('Verify the invalid email field validation', () => {
cy.wait(5000)
cy.get('[name="epemail"]').click();
cy.get('[name="epemail"]').clear();
cy.get('[name="epemail"]').type('testatgmaildotcom');
cy.get('#root button.false').click();
cy.contains('Invalid email address.', { timeout: 10000 }).should('be.visible')
});

//Enter new email ID
it('Verify the user can new  enter email field validation', () => {
cy.wait(5000)
cy.get('[name="epemail"]').click();
cy.get('[name="epemail"]').clear();
cy.get('[name="epemail"]').type('demostudent@gmail.com');
});
 
//select country code from the dropdown
it('Verify the user can select country code from the dropdown', () => {
cy.wait(5000)
cy.get('#eparentcountry [data-testid="rfs-btn"]').click();
cy.get('#rfs-AR span.ReactFlagsSelect-module_label__27pw9').click();
});
 
//search and select country code from the dropdown
it('Verify the user can search and select country code from the dropdown', () => {
cy.get('#eparentcountry').click();
cy.get('#eparentcountry', { timeout: 10000 })
    .should('be.visible')
    .type('91');
cy.contains('span', '91').click({ force: true });
});

//Add new parent number
it('Verify the user can add new phone number', () => {
cy.get('[name="ephone"]').click();
cy.get('[name="ephone"]').clear();
cy.get('[name="ephone"]').type('8943534709');
});

//Remove parent number and try to save
it('Verify the user can remove parent number and try to save', () => {
cy.wait(5000)
cy.get('#Bio_details div.student-profile-bio > div:nth-child(4)').click();
cy.get('[name="ephone"]').clear();
cy.get('#root button.false').click();
cy.contains('This field is required.', { timeout: 10000 }).should('be.visible')
});

//Invalid parent number and try to save
it('Verify the user can invalid parent number and try to save', () => {
cy.wait(5000)
cy.get('[name="ephone"]').click();
cy.get('[name="ephone"]').clear();
cy.get('[name="ephone"]').type('@#$%gdbhgf');
cy.get('#root button.false').click();
cy.get('#Bio_details div:nth-child(4) div.col-md-4').click();
cy.contains('Phone number must contain only digits.', { timeout: 10000 }).should('be.visible')
});

//Select Grade/Course
it('Verify the user can Select Grade/Course', () => {
cy.scrollTo('bottom');
cy.wait(5000)  
cy.get('#Bio_details div:nth-child(1) > div.select-label > div.select__control > div.select__value-container > div.select__input-container').click();
cy.get('#react-select-5-option-6').click();
});

//Select Grade/Course
it('Verify the user can Select Grade/Course', () => {
cy.scrollTo('bottom');
cy.wait(5000)  
cy.get('#Bio_details div:nth-child(1) > div.select-label > div.select__control > div.select__value-container > div.select__input-container').click();
cy.get('#react-select-5-option-6').click();
});

//Select Year ID
it('Verify the user can Select Year ID', () => {
cy.scrollTo('bottom');
cy.wait(5000)  
cy.get('#Bio_details div:nth-child(2) > div.select-label > div.select__control > div.select__value-container > div.select__input-container').click();
cy.contains('Year 3 (age 7 - 8)').click();
});

//Select Subject
it('Verify the user can Select Subject', () => {
cy.scrollTo('bottom');
cy.wait(5000)  
cy.get('#Bio_details div.select__value-container--is-multi div.select__input-container').click();
cy.get('#react-select-4-option-0').click();
});

//Verify the user can move to profile page without updating
  it('Verify the user can move to profile page without updating', () => {
  cy.wait(5000)
  const oldValue = 'Test'
  const newValue = 'Demo'
  cy.get("#efname").should('be.visible').clear().type(newValue)
  cy.scrollTo('topRight')
  cy.get(".btn-edit-profile").click()  
  // Verify old value is still shown on profile page
   cy.get('.text-center.text-break')
  .should('be.visible')
  .and('contain.text', oldValue)

});

//Verify the user can save data with valid input
it('Verify the user can save data with valid input', () => {
  cy.wait(5000)
  const oldValue = 'Test'
  const newValue = 'Demo'
  cy.get("#efname").should('be.visible').clear().type(newValue)
  cy.scrollTo('topRight')
  cy.get('button[class="dashboard-btn false"]').click() 
  // Verify old value is still shown on profile page
   cy.get('.text-center.text-break')
  .should('be.visible')
  .and('contain.text', newValue)
}); 




  
});


 
 
 
 
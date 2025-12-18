class StudentChangePassword {

    studentChangePassword (currentPassword, newPassword, confirmPassword)  {
        cy.get('button[id="user-dropdown"]').trigger('mouseover'); // Navigate to change password page
        cy.wait(1000);
        cy.get('span.menu_link').contains('Change Password').click();  // Click on change password link from dropdown list
        cy.wait(1000); 
        cy.get('input[name="cPwd"]').type(currentPassword); // Type current password
        cy.get('input[name="nPwd"]').type(newPassword); // Type new password
        cy.get('input[name="rPwd"]').type(confirmPassword); // Type confirm password 
        cy.get('form > div:nth-child(1) > i').click();
        cy.get('form > div:nth-child(2) > i').click();
        cy.get('form > div:nth-child(3) > i').click();
        cy.get('form > div:nth-child(1) > i').click();
        cy.get('form > div:nth-child(2) > i').click();
        cy.get('form > div:nth-child(3) > i').click();
        cy.get('button[class="dashboard-btn mt-3 btn btn-primary"]').contains('Change Password').click(); // click on change password button
      };
    }
      export default new StudentChangePassword();


  
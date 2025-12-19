const { homeworkPage } = require("../pages/homework/homework");

describe('Negative - Homework Management', function () {
    beforeEach(function () {
        cy.fixture('tutorLoginCredentials').as('creds');
        cy.fixture('validateAttachment').as('validateAttachment');
    });

    beforeEach(function () {
        this.validateAttachment = this.validateAttachment.map((item) => {
            item.name = item.name + new Date().getTime();
            return item;
        });
        cy.loginAsTutor(this.creds.email, this.creds.password);
    });

    // Verify the mandatory fields
    it('Verify the mandatory fields in the homework form', function () {
        homeworkPage.clickAddHomeworkButton();
        homeworkPage.modalShouldBeVisible();
        homeworkPage.clickAddButtonInForm();
        homeworkPage.assertValidationMessage('Please enter homework title', 0);
        homeworkPage.assertValidationMessage('Please enter description', 1);
        homeworkPage.assertValidationMessage('Please attach a file', 2);
        homeworkPage.clickCloseButton();
    })

    // Last uploaded file cannot be removed - at least one file is required
    it('should not allow removing the last uploaded file', function () {
        homeworkPage.addHomework(this.validateAttachment[0]);
        homeworkPage.clickViewAttachment(this.validateAttachment[0].name);
        homeworkPage.deleteAttachmentsUntilOneRemains(this.validateAttachment[0].file.length);
    })

    // File size exceeds 10MB limit
    it.only('should show error when uploading file larger than 10MB', function () {
        homeworkPage.uploadOversizedFile('cypress/fixtures/docs/oversized-file.pdf');
        homeworkPage.assertFileSizeError('File size must be under 10 MB');
    })

})
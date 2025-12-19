// Page Object Model for the Homework section

class HomeworkPage {

    // ==================== ELEMENT GETTERS ====================

    getSidebarToggleButton() {
        return cy.get('.sidebar-toggle-section button[type="button"]').first();
    }

    getHomeworkMenuItem() {
        return cy.get('.nav-item .menu_link').contains('Homework');
    }

    getAddHomeworkButton() {
        return cy.get('.date-select-box button').contains('Add Homework +');
    }

    getHomeworkNameInput() {
        return cy.get('input[name="homework"]');
    }

    getHomeworkDescriptionEditor() {
        return cy.get('.ql-editor p');
    }

    getFileUploadInput() {
        return cy.get('#fileInput');
    }

    getAddButtonInForm() {
        return cy.get('div.d-flex button').contains('Add');
    }

    getModal() {
        return cy.get('.modal-content');
    }

    getCloseButton() {
        return cy.get('button[aria-label="Close"]');
    }

    getDeleteButton(position) {
        return cy.get('.table-action-btns i.bi-trash').eq(position);
    }

    getConfirmDeleteButton() {
        return cy.get('.modal-content .btn-outline-danger').contains('Yes');
    }

    getCancelDeleteButton() {
        return cy.get('.modal-content .btn-outline-secondary').contains('No');
    }

    getToastMessage() {
        return cy.get('.Toastify__toast');
    }

      getValidationElements(){
        return cy.get('span.text-danger');
    }

    getValidationMessage(position) {
        return cy.get('span.text-danger').eq(position);
    }

  
    getUploadedFilePills() {
        return cy.get('.homework-add-pills');
    }

    getRemoveFileIcon() {
        return cy.get('.homework-add-pills .bi-x-circle-fill');
    }

    getTableRows() {
        return cy.get('table tbody tr');
    }

    // ==================== NAVIGATION ====================

    navigateToHomework() {
        this.getSidebarToggleButton().click();
        this.getHomeworkMenuItem().click();
    }

    // ==================== CLICK ACTIONS ====================

    clickAddHomeworkButton() {
        this.getAddHomeworkButton().click();
    }

    clickAddButtonInForm() {
        this.getAddButtonInForm().click();
    }

    clickCloseButton() {
        this.getCloseButton().click();
    }

    // ==================== MODAL ASSERTIONS ====================

    modalShouldBeVisible() {
        this.getModal().should('be.visible');
    }

    modalShouldBeClosed() {
        this.getModal().should('not.be.visible');
    }

    // ==================== VALIDATION ASSERTIONS ====================

    assertValidationMessage(message, position) {
        this.getValidationMessage(position).should('contain', message);
    }

    // ==================== HOMEWORK ACTIONS ====================

    checkAddedHomeworkInList(homework) {
        this.getTableRows().should('contain', homework.name);
    }

    addHomework(homework) {
        this.clickAddHomeworkButton();
        this.getHomeworkNameInput().type(homework.name);
        this.getHomeworkDescriptionEditor().type(homework.description);

        if (homework.file) {
            this.getFileUploadInput().selectFile(homework.file, { force: true }); // input file has display:none.
        }

        this.clickAddButtonInForm();
        this.getToastMessage().should('contain.text', 'Homework Added successfully');
    }

    deleteNonSubmittedHomework(position) {
        this.getDeleteButton(position).click();
        this.getConfirmDeleteButton().click();
        this.getToastMessage().should('contain.text', 'Homework successfully deleted');
    }

    deleteSubmittedHomework(position) {
        this.getDeleteButton(position).click();
        this.getToastMessage().should('contain.text', 'Homework cannot be deleted');
    }

    async cancelDelete() {
        const $rows = await this.getTableRows();
        if ($rows.length > 0) {
            this.getDeleteButton(0).click();
            this.getCancelDeleteButton().click();
            this.modalShouldBeClosed();
        }
    }

    // ==================== FILE UPLOAD ACTIONS ====================

    uploadFiles(files) {
        this.clickAddHomeworkButton();
        this.getFileUploadInput().selectFile(files, { force: true });
    }

    // Click view attachment button for a homework by name
    clickViewAttachment(homeworkName) {
        cy.get('table tbody tr')
            .contains('td', homeworkName)
            .parent('tr')
            .find('.btn-outline-success')
            .click();
    }

    // ==================== ATTACHMENT MODAL ACTIONS ====================

    // Verify attachment modal is visible
    attachmentModalShouldBeVisible() {
        cy.get('.modal-dialog').should('be.visible');
    }

    // Get attachment rows in modal
    getAttachmentRows() {
        return cy.get('.modal-dialog table tbody tr');
    }

    // Get attachment count
    getAttachmentCount() {
        return this.getAttachmentRows().its('length');
    }

    // Delete attachment by row position (0-based)
    deleteAttachmentByPosition(position) {
        this.getAttachmentRows()
            .eq(position)
            .find('.btn-outline-danger')
            .click();
    }

    // Delete all attachments except the last one
    deleteAttachmentsUntilOneRemains(expectedCount) {
        this.attachmentModalShouldBeVisible();
        
        // Verify initial count
        this.getAttachmentRows().should('have.length', expectedCount);

        // Delete files until only 1 remains
        for (let i = 0; i < expectedCount - 1; i++) {
            this.deleteAttachmentByPosition(0);
            this.getConfirmDeleteButton().click();
            this.getAttachmentRows().should('have.length', expectedCount - 1 - i);
        }

        // Verify last one cannot be deleted (only 1 remains)
        this.getAttachmentRows().should('have.length', 1);

        // Try to delete the last one - should show error
        this.deleteAttachmentByPosition(0);
        this.getToastMessage().should('contain.text', 'One attachment is mandatory, so you cannot remove the final file.');
    }

    uploadAndVerifyFiles(fileObjects) {
        const filePaths = fileObjects.map(file => file.value);
        this.uploadFiles(filePaths);

        // Verify each file is displayed
        fileObjects.forEach(file => {
            this.getUploadedFilePills().should('contain', file.name);
        });

        // Verify count matches
        this.getUploadedFilePills().should('have.length', fileObjects.length);
    }

    uploadAndRemoveFirstFile(fileObjects) {
        const filePaths = fileObjects.map(file => {
            return file.value;
        }); 
        // since the file path only acdepts ["upload/sample-1.pad", "upload/sample-2.pdf", "upload/sample-3.pdf"]
        this.uploadFiles(filePaths);

        this.getRemoveFileIcon().first().click();
        this.getRemoveFileIcon().should('have.length', fileObjects.length - 1);
    }

    // Upload different file types and verify they are uploaded
    uploadDifferentFileTypes(filesObject) {
        const filePaths = Object.values(filesObject);
        this.uploadFiles(filePaths);

        // Verify count matches
        this.getUploadedFilePills().should('have.length', filePaths.length);
    }


    // Upload file larger than allowed size
    uploadOversizedFile(filePath) {
        this.clickAddHomeworkButton();
        this.getFileUploadInput().selectFile(filePath, { force: true });
    }

    // Assert file size error message
    assertFileSizeError(errorMessage) {
        this.getValidationElements()
            .contains(errorMessage)
            .scrollIntoView()
            .should('have.contain', errorMessage);
    }

    // ==================== API HELPERS ====================

    interceptHomeworkApi() {
        cy.intercept('POST', '**/tutor/homework').as('getHomework');
    }

    waitForHomeworkApi() {
        return cy.wait('@getHomework');
    }

    findHomeworkIndex(homeworkArray, isSubmitted) {
        let index 
        for (let i = 0; i < homeworkArray.length; i++) {
            if (homeworkArray[i].student_homework_submitted === isSubmitted) {
                index = i;
                break;
            }
        }
        return index;
    }

    async deleteHomeworkBySubmissionStatus(isSubmitted) {
        const response = await this.waitForHomeworkApi();
        expect(response.response.statusCode).to.eq(200);

        const homeworkArray = response.response.body.data.data;
        const index = this.findHomeworkIndex(homeworkArray, isSubmitted);

        if (index !== undefined) {
            if (isSubmitted) {
                this.deleteSubmittedHomework(index);
            } else {
                this.deleteNonSubmittedHomework(index);
            }
            this.checkIfGivenHomeworkIsDeleted(homeworkArray[index].title);
        }
    }

    checkIfGivenHomeworkIsDeleted(homeworkName) {
        this.getTableRows().should('not.contain', homeworkName);
    }
}

export const homeworkPage = new HomeworkPage();

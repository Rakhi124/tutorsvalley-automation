import { homeworkPage } from "../pages/homework/homework";

describe('Positive - Homework Management', function () {

    beforeEach(function () {
        cy.fixture('tutorLoginCredentials').as('creds');
        cy.fixture('homeworkData').as('data');
        cy.fixture('multipleFileUpload').as('files');
        cy.fixture('uploadDifferentFiles').as('differentFiles');
    });

    beforeEach(function () {
        this.data = this.data.map((item) => {
            item.name = item.name + new Date().getTime();
            return item;
        });
        cy.loginAsTutor(this.creds.email, this.creds.password);
    });

    //Create Homework
    it('should create multiple homeworks successfully', function () {
        for (let index = 0; index < this.data.length; index++) {
            homeworkPage.addHomework(this.data[index]);
            cy.wait(1000); // Small delay between creations
        }
    });

    //Delete non submitted Homework
    it.only('should delete non-submitted homeworks', function () {
        homeworkPage.interceptHomeworkApi();
        homeworkPage.deleteHomeworkBySubmissionStatus(false);
    });

    //Delete submitted Homework
    it('should delete submitted homeworks', async function () {
        homeworkPage.interceptHomeworkApi();
        await homeworkPage.deleteHomeworkBySubmissionStatus(true);
    });

    // Cancel the deletion 
    it('should cancel on clicking delete', function () {
        homeworkPage.cancelDelete();
    });

    it("upload multiple files & verify if its uploaded correctly", function () {
        homeworkPage.uploadAndVerifyFiles(this.files);
    })

    it("upload files & check if remove works correctly", function () {
        homeworkPage.uploadAndRemoveFirstFile(this.files);
    })

    it("upload different file types (pdf, mp4, doc, docx, xls, xlsx) & verify", function () {
        homeworkPage.uploadDifferentFileTypes(this.differentFiles);
    })

});
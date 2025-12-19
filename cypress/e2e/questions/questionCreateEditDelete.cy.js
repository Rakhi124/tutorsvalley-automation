import {
  createQuestion,
  editCreatedQuestion,
  deleteCreatedQuestion,
} from '../../pages/questionsPage'; // adjust path if needed
 
describe('Tutor Create Questions Flow', () => {
 

  it('should create, edit and delete a question', () => {

    createQuestion();
    editCreatedQuestion();
    deleteCreatedQuestion();
  });
 
});
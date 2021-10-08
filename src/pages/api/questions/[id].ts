import questions from "../QuestionsData";

export default function questionsId(req: any, res: any) {
  const selectedId = +req.query.id;

  const theQuestion = questions.filter(
    (question) => question.id === selectedId
  );

  if (theQuestion.length === 1) {
    const selectedQuestion = theQuestion[0].shuffleAnswers();
    const obj = selectedQuestion.answerWhit(0).toObject();
    res.status(200).json(selectedQuestion.toObject());
  } else {
    res.status(204).send();
  }
}

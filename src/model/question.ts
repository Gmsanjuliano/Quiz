import { shuffle } from "../functions/arrays";
import AnswerModel from "./answer";

export default class QuestionModel {
  #id: number;
  #title: string;
  #answers: AnswerModel[];
  #gotIt: boolean;

  constructor(
    id: number,
    title: string,
    answers: AnswerModel[],
    gotIt = false
  ) {
    this.#id = id;
    this.#title = title;
    this.#answers = answers;
    this.#gotIt = gotIt;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get answers() {
    return this.#answers;
  }

  get gotIt() {
    return this.#gotIt;
  }

  get unAnswered() {
    return !this.answered;
  }

  get answered() {
    for (let answer of this.#answers) {
      if (answer.revealed) return true;
    }
    return false;
  }

  answerWhit(index: number): QuestionModel {
    const gotIt = this.#answers[index]?.correct;
    const answers = this.#answers.map((answer, i) => {
      const selectedAnswer = index === i;
      const mayReveal = selectedAnswer || answer.correct;
      return mayReveal ? answer.reveal() : answer;
    });
    return new QuestionModel(this.id, this.title, answers, gotIt);
  }

  shuffleAnswers(): QuestionModel {
    let shuffledAnswers = shuffle(this.#answers);
    return new QuestionModel(
      this.#id,
      this.#title,
      shuffledAnswers,
      this.#gotIt
    );
  }

  static createUsingObject(obj: QuestionModel): QuestionModel {
    const answers = obj.answers.map((ans) =>
      AnswerModel.createUsingObject(ans)
    );
    return new QuestionModel(obj.id, obj.title, answers, obj.gotIt);
  }

  toObject() {
    return {
      id: this.#id,
      title: this.#title,
      answered: this.answered,
      gotIt: this.#gotIt,
      answers: this.#answers.map((ans) => ans.toObject()),
    };
  }
}

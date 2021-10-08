import { shuffle } from "../../../functions/arrays";
import questions from "../QuestionsData";

export default function quiz(req: any, res: any) {
  const ids = questions.map((question) => question.id);
  res.status(200).json(shuffle(ids));
}

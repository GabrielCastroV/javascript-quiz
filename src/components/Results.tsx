import { useQuestionsStore } from "../store/questions"

export const Results = () => {
    const questions = useQuestionsStore(state => state.questions)

    const correct = questions?.filter(question => question.isCorrectUserAnswer === true).length
    const incorrect = questions?.filter(question => question.isCorrectUserAnswer === false).length   
    return (
        <p>✅Correctas {correct}  |  ❌Incorrectas {incorrect}</p>
    )
}
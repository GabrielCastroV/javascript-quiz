import { create } from "zustand";

import { type Question } from "../types";
import confetti from 'canvas-confetti'

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestion: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void;
    goPreviousQuestion: () => void;
}

export const useQuestionsStore = create<State>((set, get)=>{
    return {
        questions: [],
        currentQuestion: 0, // posicion del array de questions ^^

        fetchQuestion: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()

            const questions = json.sort(()=> Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()

            const newQuestion = structuredClone(questions);
            const questionIndex = newQuestion.findIndex(q => q.id === questionId)
            const questionInfo = newQuestion[questionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
            if (isCorrectUserAnswer) confetti()
            
            newQuestion[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex,
            }
            set({ questions: newQuestion })
        },

        goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
                set({ currentQuestion: nextQuestion })
            }
        },
        goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;

            if (previousQuestion >= 0) {
                set({ currentQuestion: previousQuestion })
            }
        }
    }
})
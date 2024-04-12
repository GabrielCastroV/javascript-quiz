import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useQuestionsStore } from "../store/questions"
import { type Question as QuestionType } from "../types";
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs' 
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    const getBackgroundColor = (index:number) => {
        const { correctAnswer, userSelectedAnswer } = info

        if (userSelectedAnswer == null) return 'transparent'

        if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

        if (index === correctAnswer) return 'green'


        if (index === userSelectedAnswer) return 'red'

        return 'transparent'
    }
    return (
        <Card variant="outlined" sx={{textAlign: 'left', p: 2}}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter language='javascript' style={tomorrowNight} >
                {info.code}
            </SyntaxHighlighter>

            <List sx={{bgcolor: '#333'}} disablePadding>
                {info.answers.map((answer, index)=> (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton disabled={info.userSelectedAnswer != null}
                         onClick={createHandleClick(index)}
                        sx={{backgroundColor: getBackgroundColor(index)}}>
                            <ListItemText>
                                {answer}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestions = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

    const questionInfo = questions[currentQuestions]
    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestions === 0}>
                    <ArrowBackIosNew/>
                </IconButton>

                {currentQuestions + 1} / {questions.length}

                <IconButton onClick={goNextQuestion} disabled={currentQuestions >= questions.length - 1}>
                    <ArrowForwardIos/>
                </IconButton>
            </Stack>
            <Question info={questionInfo}/>
        </>
    )
}
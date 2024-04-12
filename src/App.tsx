import { Container, Stack, Typography } from '@mui/material';
import './App.css';
import { JavascriptLogo } from './components/JavascriptLogo';
import { Start } from './components/Start';
import { useQuestionsStore } from './store/questions';
import { Game } from './components/Game';
import { Text } from './components/Text';
import { Results } from './components/Results';

function App() {
  const questions = useQuestionsStore(state => state.questions)

  return (
    <main>
      <Container >
        <Stack direction='row' gap={2} justifyContent='center' alignItems='center' className='title'>
          <JavascriptLogo/>
          <Typography className='text' maxWidth='sm' fontSize='xx-large' >
              Javascript Quiz   
          </Typography>
        </Stack>
      </Container>
      {questions.length === 0 && <Text/>}
      
      {questions.length === 0 && <Start/>}
      {questions.length > 0 && <Game/>}
      {questions.every(q => q.userSelectedAnswer != null) && questions.length > 0 && <Results/>}
      
    </main>
  )
}

export default App

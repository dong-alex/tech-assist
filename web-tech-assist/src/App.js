import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import useGoogleService from "./api/services";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const App = () => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswer1, setWrongAnswer1] = useState("");
  const [wrongAnswer2, setWrongAnswer2] = useState("");
  const [wrongAnswer3, setWrongAnswer3] = useState("");
  const { getTest } = useGoogleService();

  useEffect(() => {
    console.log(question);
  }, [question]);

  const handleSubmitQuestion = (event) => {
    console.log(question, correctAnswer);

    if (question && correctAnswer && wrongAnswer1 && wrongAnswer2 && wrongAnswer3) {
      console.log("VALID");
      // api call submitQuestion(question, correctAnswer, wrongAnswer1 ....)
      getTest();
    } else {
      console.log("INVALID");
    }
  };

  const handleQuestionChange = event => {
    setQuestion(event.target.value);
  };

  const handleCorrectAnswerChange = event => {
    setCorrectAnswer(event.target.value);
  };

  const handleWrongAnswer1 = event => {
    setWrongAnswer1(event.target.value);
  };

  const handleWrongAnswer2 = event => {
    setWrongAnswer2(event.target.value);
  };

  const handleWrongAnswer3 = event => {
    setWrongAnswer3(event.target.value);
  };

  return (
    <Container>
      <TextField
        required
        label="Question"
        helperText="Enter a question"
        value={question}
        onChange={handleQuestionChange}
      />
      <TextField
        required
        label="Correct Answer"
        helperText="Enter the correct answer"
        value={correctAnswer}
        onChange={handleCorrectAnswerChange}
      />
      <TextField
        required
        label="Wrong Answer"
        helperText="Enter an incorrect answer"
        value={wrongAnswer1}
        onChange={handleWrongAnswer1}
      />
      <TextField
        required
        label="Wrong Answer"
        helperText="Enter an incorrect answer"
        value={wrongAnswer2}
        onChange={handleWrongAnswer2}
      />
      <TextField
        required
        label="Wrong Answer"
        helperText="Enter an incorrect answer"
        value={wrongAnswer3}
        onChange={handleWrongAnswer3}
      />
      <Button onClick={handleSubmitQuestion}>Submit</Button>
    </Container>
  );
};

export default App;

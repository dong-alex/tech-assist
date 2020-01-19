import React from 'react';
import useGoogleServices from "./api/services";
import main from "./api/test";

const App = () => {
  // const {translateSpeechToText } = useGoogleServices();

  const handleSpeech = () => {
    // translateSpeechToText();
    main()
  };

  return (<button onClick={handleSpeech}>
    Hello World
  </button>)
}

export default App;

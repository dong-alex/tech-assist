import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "./config";

const useGoogleService = () => {

  const submitQuestion = async (question, correct, wrong1, wrong2, wrong3) => {

  };

  const getTest = async () => {
    axios.get(BASE_URL).then((response) => {
      console.log(response.data);
    });
  }

  return {
    getTest
  };
};

export default useGoogleService;

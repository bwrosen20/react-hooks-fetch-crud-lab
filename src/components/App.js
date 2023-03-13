import React, {useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions]=useState([])
  const URL="http://localhost:4000/questions"

  useEffect(()=>{
    fetch (URL)
    .then((r)=>r.json())
    .then((questions)=>setQuestions(questions))
  },[])

  function onDeleteQuestion(deletedQuestion){
      const updatedQuestions=questions.filter((question)=>question.id!==deletedQuestion.id)
      setQuestions(updatedQuestions)
      console.log("I updated the state")
  }


  function handleNewQuestion(newQuestion){
    setQuestions([...questions,newQuestion])
  }


  
  


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={handleNewQuestion}/> : <QuestionList questions={questions} onDeleteQuestion={onDeleteQuestion}/>}
    </main>
  );
}

export default App;

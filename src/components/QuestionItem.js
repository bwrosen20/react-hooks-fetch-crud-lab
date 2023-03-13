import React, {useState} from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [updatedIndex,setUpdatedIndex]=useState(correctIndex)


  function handleDeleteClick(){

    fetch(`http://localhost:4000/questions/${question.id}`,{
    method:"DELETE",
  })

    .then((r)=>r.json())
    .then(()=>onDeleteQuestion(question))


}

function handleUpdate(event){

  fetch (`http://localhost:4000/questions/${question.id}`,{
    method:"PATCH",
    headers:{
        "Content-Type": "application/json",
    },
    body:JSON.stringify({
      correctIndex:parseInt(event.target.value),
    })

  })
      .then((r)=>r.json())
      .then(()=>setUpdatedIndex(updatedIndex))
  
}




  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>

  ));


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={updatedIndex} onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

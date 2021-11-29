import React, {useState} from 'react'
import Question from "./Question";
function EditQuestions(props){

    //questions를 받아올지 log days를 받아올지?
    const [questions, setQuestions] = useState(props.questions)

    return (
        <div className="EditQ">
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h3>Edit Questions</h3>
                <button>+</button>
            </div>
            {questions? questions.map((question)=>
                <li style={{listStyle: "none",padding: "5px"}}>
                    <Question qText = {question.qText}
                              qType = {question.qType}
                              qDate = {question.qDate}
                              qChoices = {question.qChoices}
                              editMode = {true}
                    />
                </li>
            ):<></>}
            <button>Save</button>
        </div>
    );
}
export default EditQuestions
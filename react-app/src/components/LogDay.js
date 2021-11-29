import React, {useState} from 'react'
import Question from "./Question";

function LogDay(props){
    const [questions, setQuestions] = useState(props.questions);
    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <button>{"<"}</button>
                <Question></Question>
                <button>{">"}</button>
            </div>

        </div>
    );
}
export default LogDay

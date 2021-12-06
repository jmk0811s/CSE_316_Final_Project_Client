import React, {useState, useEffect} from 'react'
import Question from "./Question";

function LogDay(props) {
    const [questions, setQuestions] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setQuestions(props.questions);
    }, [props]);

    const dateToString = (date) => {
        return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
    }

    const next = () => {
        setDate(new Date(date.setDate(date.getDate() + 1)));
    }

    const prev = () => {
        setDate(new Date(date.setDate(date.getDate() - 1)));
    }


    return (
        <div>
            <div className="LogSelectionBar" style={{display: "flex", justifyContent: "space-between"}}>
                <button onClick={prev}>
                    <h2>{"<"}</h2>
                </button>
                <h2>
                    {dateToString(date)}
                </h2>
                <button onClick={next}>
                    <h2>{">"}</h2>
                </button>
            </div>
            <div>
                {
                    questions ?
                        questions.map((question) =>
                            <li style={{listStyle: "none",padding: "5px"}}>
                                <Question
                                    type = {question.type}
                                    header = {question.header}
                                    mdate = {question.mdate}
                                    editMode = {false}
                                />
                            </li>
                        ) : <></>
                }
            </div>
            <div className="SubmitButton" >
                <button>Submit</button>
            </div>
        </div>
    );
}
export default LogDay
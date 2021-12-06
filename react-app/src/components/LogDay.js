import React, {useState, useEffect} from 'react'
import Question from "./Question";

function LogDay(props) {
    const [questions, setQuestions] = useState([props.questions]);
    const [responses, setResponses] = useState([props.responses]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setQuestions(props.questions);
        setResponses(props.responses);
        console.log(responses.filter(() => true));
    }, [props]);

    const dateToString = (date) => {
        return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
    }

    const next = () => {
        let temp = new Date(date);
        temp.setDate(temp.getDate() + 1);
        if (temp - new Date() < 0) {
            setDate(temp);
        }
    }

    const prev = () => {
        let temp = new Date(date);
        temp.setDate(temp.getDate() - 1);
        setDate(temp);
    }

    const handleSubmit = () => {

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
            {
                questions ?
                    questions.filter((question) => question.status !== 'DELETED').map((question) =>
                        <li className="QuestionList" style={{listStyle: "none", padding: "5px"}}>
                            <Question
                                editMode={false}
                                type={question.type}
                                header={question.header}
                                choices={question.choices}
                                mdate={question.mdate}
                                nanoid={question.nanoid}
                                questions={questions}
                                setQuestions={setQuestions}
                                responses={responses}
                                questionId={question._id}
                                setResponses={setResponses}
                                date={date}
                            />
                        </li>
                    )
                    : <></>
            }
            <div className="SubmitButton" >
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
export default LogDay
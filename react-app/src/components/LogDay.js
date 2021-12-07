import React, {useState, useEffect} from 'react'
import Question from "./Question";
import {
    getResponsesAPIMethod,
    createResponseAPIMethod
} from "../api/client";

function LogDay(props) {
    const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setQuestions(props.questions);
        setResponses(props.responses);
    }, [props]);

    useEffect(() => {
        console.log("@@@res");
        console.log(responses);

    }, [responses]);

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
        console.log(responses);
        getResponsesAPIMethod().then((dbResponses) => {
            for (let i = 0; i < responses.length; i++) {
                if (responses[i].status === 'ADDED') {
                    if (responses[i].response.text === '' && responses[i].response.number === null && responses[i].response.boolean === null && responses[i].response.multiple_choice.length === 0) {
                        responses[i].status = '';
                        console.log("empty response");
                    }
                    else {
                        console.log("response added");
                        responses[i].status = '';
                        createResponseAPIMethod(responses[i]);
                    }
                }
                /*
                else {
                    if (responses[i].response.text === '' && responses[i].response.number === null && responses[i].response.boolean === null && responses[i].response.multiple_choice.length === 0) {
                        responses[i].status = '';
                        console.log("empty response");
                    }
                    else {
                        console.log("response added");
                        responses[i].status = '';
                        createResponseAPIMethod(responses[i]);
                        console.log("response updated");
                        let newResponse = {
                            _id: dbQuestions[j]._id,
                            type: questions[i].type,
                            header: questions[i].header,
                            choices: questions[i].choices,
                            mdate: questions[i].mdate,
                            nanoid: questions[i].nanoid,
                            creator: questions[i].creator
                        }
                    }
                }

                 */
                /*
                for (let j = 0; j < dbResponses.length; j++) {
                    if (dbQuestions[j].nanoid === questions[i].nanoid) {
                        if (questions[i].status === 'DELETED' && dbQuestions[j]._id !== undefined) {
                            console.log("response deleted");
                            deleteQuestionByIdAPIMethod(dbQuestions[j]._id);
                        }
                        else {
                            console.log("response updated");
                            let newQuestion = {
                                _id: dbQuestions[j]._id,
                                type: questions[i].type,
                                header: questions[i].header,
                                choices: questions[i].choices,
                                mdate: questions[i].mdate,
                                nanoid: questions[i].nanoid,
                                creator: questions[i].creator
                            }
                            updateQuestionAPIMethod(newQuestion);
                        }
                    }
                }

                 */
            }
        });
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
                        <li className="question-wrapper" style={{listStyle: "none", padding: "5px"}}>
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
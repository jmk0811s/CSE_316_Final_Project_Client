import React, {useState, useEffect} from 'react'
import Question from "./Question";
import {
    getResponsesAPIMethod,
    createResponseAPIMethod,
    deleteResponseByIdAPIMethod,
    updateResponseAPIMethod,
    getQuestionsAPIMethod
} from "../api/client";

import {dateToString, sortByDate} from "../utils/HelperFunctions";

function LogDay(props) {
    const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        getQuestionsAPIMethod().then((questions) => {
            setQuestions(sortByDate(questions));
        });
        getResponsesAPIMethod().then((responses) => {
            setResponses(responses);
        });
    }, [props, date]);

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
        getResponsesAPIMethod().then((dbResponses) => {
            console.log(dbResponses);
            for (let i = 0; i < responses.length; i++) {
                if (responses[i].status === 'ADDED') { //newly added response
                    responses[i].status = '';
                    console.log("to be added: ");
                    console.log(responses[i]);
                    createResponseAPIMethod(responses[i]);
                }
                else if (responses[i].status === 'UPDATED') { //updated response
                    responses[i].status = '';
                    for (let j = 0; j < dbResponses.length; j++) {
                        if (dbResponses[j].question === responses[i].question) {
                            let dbDate = dateToString(new Date(dbResponses[j].date));
                            let localDate = dateToString(new Date(responses[i].date));
                            if (dbDate === localDate) {
                                updateResponseAPIMethod(responses[i]);
                            }
                        }
                    }
                }
                if (responses[i].response.text === '' && responses[i].response.number === null && responses[i].response.boolean === null && responses[i].response.multiple_choice == 0) {
                    //empty response
                    console.log("empty response deleted");
                    deleteResponseByIdAPIMethod(responses[i]._id);
                }
            }
        })
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
                                readOnly={false}
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
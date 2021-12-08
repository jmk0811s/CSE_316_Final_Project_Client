import React, {useState, useEffect} from 'react'
import Question from "./Question";
import {
    getResponsesAPIMethod,
    createResponseAPIMethod,
    deleteResponseByIdAPIMethod,
    updateResponseAPIMethod
} from "../api/client";

function LogDay(props) {
    const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        setQuestions(props.questions);
        setResponses(props.responses);
        setDate(date);
        //console.log(date);
    }, [props, date]);

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
                //console.log(responses[i].response);
                //console.log("A: " + responses[i].date);
                //console.log("B: " + date);
                console.log(responses[i].date === date || responses[i].date.toString().split('T')[0] === date.toISOString().split('T')[0]);
                if (true) {
                    if (responses[i].status === 'ADDED') {
                        if (responses[i].response.text === '' && responses[i].response.number === null && responses[i].response.boolean === null && responses[i].response.multiple_choice.length === 0) {
                            responses[i].status = 'DELETED'; // @
                            console.log("empty response");
                        } else {
                            console.log("response added");
                            responses[i].status = '';
                            createResponseAPIMethod(responses[i]);
                        }
                    }
                    for (let j = 0; j < dbResponses.length; j++) {
                        //console.log("A: " + dbResponses[j].date);
                        //console.log("B: " + responses[i].date);
                        //console.log(responses[i].nanoid);
                        //console.log(dbResponses[j].date === responses[i].date);


                        let dbDate = dateToString(new Date(dbResponses[j].date));
                        let localDate = dateToString(new Date(responses[i].date));
                        //console.log(dbDate);
                        //console.log(localDate);

                        let bool = dbDate === localDate;
                        //console.log("bool: " + bool);

                        if (dbResponses[j].question === responses[i].question && bool) {
                            if (responses[i].response.text === '' && responses[i].response.number === null && responses[i].response.boolean === null && responses[i].response.multiple_choice.length === 0) {
                                responses[i].status = 'DELETED'; // @
                                //console.log(responses);
                                console.log("empty response 2");
                                deleteResponseByIdAPIMethod(dbResponses[j]._id);
                            }
                            else {
                                console.log("response updated");
                                //console.log(responses[i].response);
                                let newResponse = {
                                    _id: dbResponses[j]._id,
                                    response: responses[i].response,
                                    date: dbResponses[j].date,
                                    nanoid: responses[i].nanoid,
                                    question: responses[i].question,
                                    creator: responses[i].creator
                                }
                                //console.log(newResponse);
                                updateResponseAPIMethod(newResponse);
                            }
                        }
                    }
                }
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
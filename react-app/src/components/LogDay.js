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
import {nanoid} from "nanoid";

function LogDay(props) {
    const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);
    const [dbResponses, setDBResponses] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        getQuestionsAPIMethod().then((questions) => {
            setQuestions(sortByDate(questions));
        });
        getResponsesAPIMethod().then((responses) => {
            setResponses(responses);
            setDBResponses(responses);
        });
        //console.log("useEffect in LogDay");
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
        console.log("DB responses: ");
        console.log(dbResponses);
        console.log("local responses: ");
        console.log(responses);

        for (let i = 0; i < responses.length; i++) {
            if (responses[i].status === 'ADDED') { //newly added response
                responses[i].status = '';
                console.log("ADDED");
                //console.log(responses[i]);
                createResponseAPIMethod(responses[i]);
            }
            else if (responses[i].status === 'UPDATED' || true) { //updated response
                responses[i].status = '';
                for (let j = 0; j < dbResponses.length; j++) {
                    if (dbResponses[j].question === responses[i].question) {
                        let dbDate = dateToString(new Date(dbResponses[j].date));
                        let localDate = dateToString(new Date(responses[i].date));
                        if (dbDate === localDate) {
                            console.log("@@@@@@ match found @@@@@@");
                            console.log(responses[i]);
                            updateResponseAPIMethod(responses[i]);
                            break;
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
    }

    const addResponse = (res, type, index, choices, currResponse, questionId) => {
        let newChoiceList = [];
        if (type === 'MultipleChoice') {
            for (let i = 0; i < choices.length; i++) {
                if (index === i) {
                    newChoiceList.push(true);
                }
                else {
                    newChoiceList.push(false);
                }
            }
        }
        let id = nanoid();
        let newResponse = {
            response: {
                text: type === 'Text' ? res+="" : '',
                number: type === 'Number' ? res*=1 : null,
                boolean: type === 'Boolean' ? JSON.parse(res) : null,
                multiple_choice: type === 'MultipleChoice' ? newChoiceList : []
            },
            date: date,
            nanoid: id,
            question: questionId,
            status: 'ADDED'
        }
        let newResponses = [];
        for (let i = 0; i < responses.length; i++) {
            newResponses.push(responses[i]);
        }
        newResponses.push(newResponse);
        setResponses(newResponses);
    }

    const updateResponse = (res, type, index, choices, currResponse, questionId) => {
        let oldResponse = currResponse;
        if (oldResponse === undefined) {
            addResponse(res, type, index, choices, currResponse, questionId);
            console.log("response added");
            return;
        }
        console.log("response updated");
        let newChoiceList = [];
        if (type === 'MultipleChoice') {
            for (let i = 0; i < choices.length; i++) {
                if (index === i) {
                    newChoiceList.push(true);
                }
                else {
                    newChoiceList.push(false);
                }
            }
        }
        let id = nanoid();
        let newResponse = {
            _id: oldResponse._id,
            response: {
                text: type === 'Text' ? res+="" : '',
                number: type === 'Number' ? res*=1 : null,
                boolean: type === 'Boolean' ? JSON.parse(res) : null,
                multiple_choice: type === 'MultipleChoice' ? newChoiceList : []
            },
            date: date,
            nanoid: id,
            question: questionId,
            status: 'UPDATED' //keep disappearing
        }
        let newResponses = [];
        for (let i = 0; i < responses.length; i++) {
            if (responses[i].question === oldResponse.question) {
                //newResponse.status = 'UPDATED';
                newResponse.nanoid = responses[i].nanoid;
                console.log("@@@ found @@@");
                console.log(newResponse);
                newResponses.push(newResponse);
            }
            else {
                newResponses.push(responses[i]);
            }
        }
        setResponses(newResponses);
        console.log(newResponse);
        console.log(newResponses);
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
                                updateResponse={updateResponse}
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
import React from 'react'
import {useState, useEffect} from 'react'
import ViewByQuestion from "./ViewByQuestion";
import ViewByDate from "./ViewByDate";

import {
    getQuestionsAPIMethod,
    getResponsesAPIMethod
} from "../api/client";

function ViewData(){
    const [questions, setQuestions] = useState();
    const [responses, setResponses] = useState();
    const [showViewByDate, setShowViewByDate] = useState(false);
    const [showViewByQuestion, setShowViewByQuestion] = useState(false);

    useEffect(() => {
        console.log('useEffect API')
        getQuestionsAPIMethod().then((questions) => {
            setQuestions(questions);
        });
        getResponsesAPIMethod().then((responses) => {
            console.log(responses)
            setResponses(responses);
        });
    }, []);

    useEffect(()=>{
        setQuestions(questions);
        setResponses(responses);
    },[questions, responses])

    return(
        <div>
            <div className={'viewMode'} style={{marginBottom:"60px"}}>
                <button onClick={() => setShowViewByDate(false)}>
                    <h3>ViewByQuestion</h3>
                </button>
                <button onClick={() => setShowViewByDate(true)}>
                    <h3>ViewByDate</h3>
                </button>
            </div>
            {
                showViewByDate ?
                    <div>
                        <ViewByDate
                            questions={questions}
                            responses={responses}
                        />
                    </div>
                    :
                    <div>
                        <ViewByQuestion
                            questions={questions}
                            responses={responses}
                        />
                    </div>
            }
        </div>
    )
}
export default ViewData
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
        getQuestionsAPIMethod().then((questions) => {
            setQuestions(questions);
        });
        getResponsesAPIMethod().then((responses) => {
            setResponses(responses);
        });
    }, []);

    return(
        <div>
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
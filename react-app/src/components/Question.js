import React, {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';

function Question(props) {
    const [editMode, setEditMode] = useState(props.editMode);
    const [type, setType] = useState(props.type);
    const [header, setHeader] = useState(props.header);
    const [choices, setChoices] = useState(props.choices);
    const [mdate, setMDate] = useState(props.mdate);
    const [nanoId, setNanoId] = useState(props.nanoid);
    const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);
    const [currResponse, setCurrResponse] = useState();
    const [questionId, setQuestionId] = useState(props.questionId);
    const [date, setDate] = useState(props.date);

    useEffect(() => {
        setDate(props.date);
        setEditMode(props.editMode);
        setType(props.type);
        setChoices(props.choices);
        setHeader(props.header);
        setMDate(props.mdate);
        setNanoId(props.nanoid);
        setQuestions(props.questions);
        setResponses(props.responses);
        setQuestionId(props.questionId);
    }, [props]);

    useEffect(() => {
        console.log(date);
    }, [date]);

    useEffect(() => {
        //console.log(responses.length !== 0 && responses[0].question === questionId);
        //console.log(responses.length !== 0 ? responses[0].date : 0);
        //console.log(props.date);
        let res = responses.filter((res) =>
            res.question === questionId &&
            (
                res.date === date
                ||
                res.date.toString().split('T')[0] === props.date.toISOString().split('T')[0]
            )
        )
        setCurrResponse(res);
    }, [responses, props.date]);

    const updateQuestions = (newValue, field) => {
        let newQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].nanoid === nanoId) {
                let newQuestion = {
                    type: field === 'type' ? newValue : type,
                    header: field === 'header' ? newValue : header,
                    choices: field === 'multiple_choice' ? newValue : choices,
                    mdate: mdate,
                    nanoid: nanoId,
                    status: questions[i].status
                }
                console.log(newQuestion);
                newQuestions.push(newQuestion);
            }
            else {
                newQuestions.push(questions[i]);
            }
        }
        props.setQuestions(newQuestions);
        //console.log("updated@");
    }

    const updateChoice = (e, index) => {
        let newChoices = [];
        for (let i = 0; i < 3; i++) {
            if (index == i) {
                newChoices[i] = e.target.value;
            }
            else {
                newChoices.push(choices[i]);
            }
        }
        updateQuestions(newChoices, 'multiple_choice');
    }

    const updateResponse = (res, type, index) => {
        //console.log("res");
        //console.log(res);
        //console.log(index);
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

        let oldResponse = currResponse[0];
        console.log("oldResponse");
        console.log(oldResponse);
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
            status: ''
        }
        let newResponses = [];
        if (oldResponse === undefined) { // If there is no response, create a new one
            console.log("res added");
            newResponse.status = 'ADDED';
            for (let i = 0; i < responses.length; i++) {
                newResponses.push(responses[i]);
            }
            newResponses.push(newResponse);
            props.setResponses(newResponses);
        }
        else { // If there is a response, update it
            console.log("res NOT added but updated");
            for (let i = 0; i < responses.length; i++) {
                if (responses[i] === oldResponse) {
                    //console.log("new");
                    //console.log(newResponse);
                    newResponses.push(newResponse);
                }
                else {
                    newResponses.push(responses[i]);
                }
            }
            //console.log("@@@newResponses");
            //console.log(newResponses);
            props.setResponses(newResponses);
        }
        console.log(newResponses);
    }

    return (
        editMode ?
            //Edit mode
            <div className="Question">
                <div className="question-header">
                    <input // question header
                        type="text"
                        name="header"
                        value={header}
                        placeholder={"Header"}
                        onChange={(e) => {setHeader(e.target.value);updateQuestions(e.target.value, 'header');}}/>
                </div>
                <select // dropdown question type selection menu
                    value={type}
                    onChange={(e) => {setType(e.target.value);updateQuestions(e.target.value, 'type');}}
                    className="dropdown">
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                    <option value="Boolean">Boolean</option>
                    <option value="MultipleChoice">Multiple Choice</option>
                </select>
                {
                    type === 'MultipleChoice' ?
                        <div className="radio-wrapper1" style={{margin:"10px"}}>
                            <div className="radio-wrapper2">
                                <div className="radio-wrapper3">
                                    <label><input type="radio" name="radio" value="true" checked={false}/>
                                        <input type="text" name="text" value={choices[0]} placeholder="new choice" onChange={(e) => updateChoice(e, 0)}/>
                                    </label>
                                    <div className="radio-wrapper3">
                                        <label><input type="radio" name="radio" value="true" checked={false}/>
                                            <input type="text" name="text" value={choices[1]} placeholder="new choice" onChange={(e) => updateChoice(e, 1)}/>
                                        </label>
                                    </div>
                                    <div className="radio-wrapper3">
                                        <label><input type="radio" name="radio" value="true" checked={false}/>
                                            <input type="text" name="text" value={choices[2]} placeholder="new choice" onChange={(e) => updateChoice(e, 2)}/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
                <button onClick={() => props.deleteQuestion(nanoId)} style={{background: "transparent", border: "none"}}>
                    <span  className="material-icons">delete_outline</span>
                </button>
            </div>
            :
            // Answer mode
            <div className="Question">
                <div className="question-header">
                    <input
                        type="text"
                        name="header"
                        value={header}
                        placeholder={"Header"}
                    />
                </div>
                {
                    type == "Text" ?
                        //Text type
                        <div className="question-response">
                            <input
                                type="text"
                                name="answer"
                                value={currResponse !== undefined && currResponse.length !== 0 ? currResponse[0].response.text : ''}
                                placeholder={"Response"}
                                onChange={(e) => updateResponse(e.target.value, 'Text')}
                            />
                        </div>
                        :
                        type == "Number" ?
                            //Number type
                            <div className="question-response">
                                <input
                                    type="number"
                                    name="answer"
                                    value={currResponse !== undefined && currResponse.length !== 0 ? currResponse[0].response.number : ''}
                                    placeholder={"Response"}
                                    onChange={(e) => updateResponse(e.target.value, 'Number')}
                                />
                            </div>
                            :
                            type == "Boolean" ?
                                //Boolean type
                                <div className="question-response">
                                    <div className="radio-wrapper">
                                        <label><input
                                            type="radio"
                                            name={nanoId}
                                            value="true"
                                            checked={currResponse !== undefined && currResponse.length !== 0 && currResponse[0].response.boolean ? currResponse[0].response.boolean : null}
                                            onChange={(e) => updateResponse(e.target.value, 'Boolean')}
                                        />true</label>
                                        <label><input
                                            type="radio"
                                            name={nanoId}
                                            value="false"
                                            checked={currResponse !== undefined && currResponse.length !== 0 && !currResponse[0].response.boolean ? !currResponse[0].response.boolean : null}
                                            onChange={(e) => updateResponse(e.target.value, 'Boolean')}
                                        />false</label>
                                    </div>
                                </div>
                                :
                                type == "MultipleChoice" ?
                                    //MultipleChoice type
                                    <div className="radio-wrapper1" style={{margin:"10px"}}>
                                        <div className="radio-wrapper2">
                                            {
                                                choices.map((choice, i) =>
                                                    <div className="radio-wrapper3">
                                                        <label><input
                                                            type="radio"
                                                            name={nanoId}
                                                            value="true"
                                                            checked={currResponse !== undefined && currResponse.length !== 0 && currResponse[0].response.multiple_choice ? currResponse[0].response.multiple_choice[i] : null}
                                                            onChange={(e) => updateResponse(e.target.value, 'MultipleChoice', i)}
                                                        />
                                                            <input type="text" name="text" value={choice} placeholder="new choice"/>
                                                        </label>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    :
                                    null
                }
            </div>
    );
}
export default Question
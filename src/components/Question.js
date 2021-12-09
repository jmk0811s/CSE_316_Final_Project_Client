import React, {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import {getQuestionsAPIMethod, getResponsesAPIMethod} from "../api/client";
import {dateToString, sortByDate} from "../utils/HelperFunctions";

function Question(props) {
    const [readOnly, setReadOnly] = useState(false);
    const [editMode, setEditMode] = useState(props.editMode);
    const [type, setType] = useState(props.type);
    const [header, setHeader] = useState(props.header);
    const [choices, setChoices] = useState(props.choices);
    //const [mdate, setMDate] = useState(props.mdate);
    const [nanoId, setNanoId] = useState(props.nanoid);
    //const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);
    const [currResponse, setCurrResponse] = useState();
    const [questionId, setQuestionId] = useState(props.questionId);
    const [date, setDate] = useState(props.date);
    const [index, setIndex] = useState(props.index);

    useEffect(() => {
        setDate(props.date);
        setEditMode(props.editMode);
        setType(props.type);
        setChoices(props.choices);
        setHeader(props.header);
        //setMDate(props.mdate);
        setNanoId(props.nanoid);
        //setQuestions(props.questions);
        setResponses(props.responses);
        setQuestionId(props.questionId);
        setReadOnly(props.readOnly);
        setIndex(props.index);
        //console.log(currResponse);
    }, [props]);

    useEffect(() => {
        //console.log(responses.length !== 0 && responses[0].question === questionId);
        //console.log(responses.length !== 0 ? responses[0].date : 0);
        //console.log(props.date);
        let res = responses.filter((res) =>
            res.question === questionId &&
            (
                res.date === date
                ||
                dateToString(new Date(res.date)) === dateToString(new Date(props.date))
                //res.date.toString().split('T')[0] === props.date.toISOString().split('T')[0]
            )
        )
        setCurrResponse(res);
    }, [responses, props.date]);

    const updateChoice = (e, i) => {
        let newChoices = [];
        console.log("old cho");
        console.log(choices);
        for (let j = 0; j < 3; j++) {
            if (i === j) {
                newChoices.push(e.target.value);
            }
            else {
                newChoices.push(choices[j]);
            }
        }
        console.log("new cho");
        console.log(newChoices);
        props.updateQuestion(newChoices, 'multiple_choice', index);
    }

    return (
        readOnly ?
            //Read-only mode (view data)
            <div className="Question" style={{marginBottom:"50px"}}>
                <h3 style={{margin:0}}>{header}</h3>
                {
                    type == "Text" ?
                        //Text type
                        <div className="question-response">
                            <input
                                type="text"
                                name="answer"
                                value={currResponse !== undefined && currResponse.length !== 0 ? currResponse[0].response.text : ''}
                                placeholder={"Response"}
                            />
                        </div>
                        :
                        type == "Number" ?
                            //Number type
                            <div className="question-response">
                                <input
                                    style={{width: '150px'}}
                                    type="number"
                                    name="answer"
                                    value={currResponse !== undefined && currResponse.length !== 0 ? currResponse[0].response.number : ''}
                                    placeholder={"Response"}
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
                                        />true</label>
                                        <label><input
                                            type="radio"
                                            name={nanoId}
                                            value="false"
                                            checked={currResponse !== undefined && currResponse.length !== 0 && !currResponse[0].response.boolean ? !currResponse[0].response.boolean : null}
                                        />false</label>
                                    </div>
                                </div>
                                :
                                type == "MultipleChoice" ?
                                    //MultipleChoice type
                                    <div className="radio-wrapper2">
                                        {
                                            choices.map((choice, i) =>
                                                <div className="radio-wrapper3" style={{display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
                                                    <input
                                                        style={{margin: "0", padding: '0'}}
                                                        type="radio"
                                                        name={nanoId}
                                                        value="true"
                                                        checked={currResponse !== undefined && currResponse.length !== 0 && currResponse[0].response.multiple_choice ? currResponse[0].response.multiple_choice[i] : null}
                                                    />
                                                    <p style={{margin: "0", paddingLeft: '10px'}}>{choice}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                    :
                                    null
                }
            </div>
            :
            editMode ?
                //Edit mode
                <div className="Question">
                    <div className="question-header">
                        <input // question header
                            type="text"
                            style={{height: "30px"}}
                            name="header"
                            value={header}
                            placeholder={"Header"}
                            onChange={(e) => {setHeader(e.target.value); props.updateQuestion(e.target.value, 'header', index);}}/>
                    </div>
                    <div className="selectAndDelete" >
                        <select // dropdown question type selection menu
                            value={type}
                            style={{height: "30px"}}
                            onChange={(e) => {setType(e.target.value); props.updateQuestion(e.target.value, 'type', index);}}
                            className="dropdown">
                            <option value="Text">Text</option>
                            <option value="Number">Number</option>
                            <option value="Boolean">Boolean</option>
                            <option value="MultipleChoice">Multiple Choice</option>
                        </select>
                        <button onClick={() => props.deleteQuestion(nanoId)} style={{background: "transparent", border: "none", padding: "0px"}}>
                            <span  className="material-icons">delete_outline</span>
                        </button>
                    </div>

                    {
                        type === 'MultipleChoice' ?
                            <div className="radio-wrapper1">
                                <label>
                                    <input type="radio" name="radio" value="true" checked={false} style={{margin:0}}/>
                                    <input className="radio-input" style={{borderRight: 'none', borderLeft: 'none', borderTop: 'none', borderRadius: 0}} type="text" name="text" value={choices[0]} placeholder="new choice" onChange={(e) => updateChoice(e, 0)}/>
                                </label>
                                <label>
                                    <input type="radio" name="radio" value="true" checked={false} style={{margin:0}}/>
                                    <input className="radio-input" style={{borderRight: 'none', borderLeft: 'none', borderTop: 'none', borderRadius: 0}} type="text" name="text" value={choices[1]} placeholder="new choice" onChange={(e) => updateChoice(e, 1)}/>
                                </label>
                                <label>
                                    <input type="radio" name="radio" value="true" checked={false} style={{margin:0}}/>
                                    <input className="radio-input" style={{borderRight: 'none', borderLeft: 'none', borderTop: 'none', borderRadius: 0}} type="text" name="text" value={choices[2]} placeholder="new choice" onChange={(e) => updateChoice(e, 2)}/>
                                </label>
                            </div>
                            :
                            null
                    }

                </div>
                :
                // Answer mode
                <div className="Question">
                    <h3 style={{margin:0}}>{header}</h3>
                    {
                        type == "Text" ?
                            //Text type
                            <div className="question-response">
                                <input
                                    type="text"
                                    name="answer"
                                    value={currResponse !== undefined && currResponse.length !== 0 ? currResponse[0].response.text : ''}
                                    placeholder={"Response"}
                                    onChange={(e) => {props.updateResponse(e.target.value, 'Text', index, choices, currResponse[0], questionId)}}
                                />
                            </div>
                            :
                            type == "Number" ?
                                //Number type
                                <div className="question-response">
                                    <input
                                        style={{width: '150px'}}
                                        type="number"
                                        name="answer"
                                        value={currResponse !== undefined && currResponse.length !== 0 ? currResponse[0].response.number : ''}
                                        placeholder={"Response"}
                                        onChange={(e) => {props.updateResponse(e.target.value, 'Number', index, choices, currResponse[0], questionId)}}
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
                                                onChange={(e) => {props.updateResponse(e.target.value, 'Boolean', index, choices, currResponse[0], questionId)}}
                                            />true</label>
                                            <label><input
                                                type="radio"
                                                name={nanoId}
                                                value="false"
                                                checked={currResponse !== undefined && currResponse.length !== 0 && !currResponse[0].response.boolean ? !currResponse[0].response.boolean : null}
                                                onChange={(e) => {props.updateResponse(e.target.value, 'Boolean', index, choices, currResponse[0], questionId)}}
                                            />false</label>
                                        </div>
                                    </div>
                                    :
                                    type == "MultipleChoice" ?
                                        //MultipleChoice type
                                        <div className="radio-wrapper2">
                                            {
                                                choices.map((choice, i) =>
                                                    <div className="radio-wrapper3" style={{display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
                                                        <input
                                                            style={{margin: "0", padding: '0'}}
                                                            type="radio"
                                                            name={nanoId}
                                                            value="true"
                                                            checked={currResponse !== undefined && currResponse.length !== 0 && currResponse[0].response.multiple_choice ? currResponse[0].response.multiple_choice[i] : null}
                                                            onChange={(e) => {props.updateResponse(e.target.value, 'MultipleChoice', i, choices, currResponse[0], questionId)}}
                                                        />
                                                        <p style={{margin: "0", paddingLeft: '10px'}}>{choice}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        :
                                        null
                    }
                </div>
    );
}
export default Question
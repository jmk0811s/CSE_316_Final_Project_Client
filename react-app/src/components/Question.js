import React, {useState, useEffect} from 'react'

function Question(props) {
    const [editMode, setEditMode] = useState(props.editMode);
    const [type, setType] = useState(props.type);
    const [header, setHeader] = useState(props.header);
    const [choices, setChoices] = useState(props.choices);
    const [mdate, setMDate] = useState(props.mdate);
    const [nanoid, setNanoid] = useState(props.nanoid);
    const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);
    const [questionId, setQuestionId] = useState(props.questionId);
    const [date, setDate] = useState(props.date);

    useEffect(() => {
        setEditMode(props.editMode);
        setType(props.type);
        setChoices(props.choices);
        setHeader(props.header);
        setMDate(props.mdate);
        setNanoid(props.nanoid);
        setQuestions(props.questions);
        setResponses(props.responses);
        setQuestionId(props.questionId);
        setDate(props.date);
    }, [props]);

    useEffect(() => {
        console.log(responses);
    }, [responses]);

    const updateQuestions = (newValue, field) => {
        let newQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].nanoid === nanoid) {
                let newQuestion = {
                    type: field === 'type' ? newValue : type,
                    header: field === 'header' ? newValue : header,
                    choices: field === 'multiple_choice' ? newValue : choices,
                    mdate: mdate,
                    nanoid: nanoid,
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

    const addChoice = () => {
        choices.push("");
        updateQuestions(choices, 'multiple_choice');
    }

    const deleteChoice = (index) => {
        let newChoices = [];
        for (let i = 0; i < choices.length; i++) {
            if (index !== i) {
                newChoices.push(choices[i]);
            }
        }
        updateQuestions(newChoices, 'multiple_choice');
    }

    const updateChoice = (e, index) => {
        let newChoices = [];
        for (let i = 0; i < choices.length; i++) {
            if (index == i) {
                newChoices[i] = e.target.value;
            }
            else {
                newChoices.push(choices[i]);
            }
        }
        updateQuestions(newChoices, 'multiple_choice');
    }

    const updateResponse = (res, type) => {
        let oldResponse = responses.find((res) => res.question === questionId && res.date === date);
        let newResponse = {
            response: {
                text: type === 'Text' ? res : '',
                number: type === 'Number' ? res : null,
                boolean: type === 'Boolean' ? res : null,
                multiple_choice: type === 'MultipleChoice' ? res : []
            },
            date: props.date,
            question: props.questionId,
            status: 'ADDED'
        }
        let newResponses = [];
        if (oldResponse === undefined) { // If there is no response, create a new one
            for (let i = 0; i < responses.length; i++) {
                newResponses.push(responses[i]);
            }
            newResponses.push(newResponse);
            props.setResponses(newResponses);
        }
        else { // If there is a response, update it
            for (let i = 0; i < responses.length; i++) {
                if (responses[i] === oldResponse) {
                    newResponses.push(newResponse);
                }
                else {
                    newResponses.push(responses[i]);
                }
            }
            props.setResponses(newResponses);
        }
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
                            <button onClick={addChoice} style={{background: "transparent", border: "none"}}>
                                <span  className="material-icons">add_circle_outline</span>
                            </button>
                            <div className="radio-wrapper2">
                                {
                                    choices.map((choice, i) =>
                                        <div className="radio-wrapper3">
                                            <label><input type="radio" name="radio" value="true" checked={false}/>
                                                <input type="text" name="text" value={choice} placeholder="new choice" onChange={(e) => updateChoice(e, i)}/>
                                            </label>
                                            <button onClick={() => deleteChoice(i)} style={{background: "transparent", border: "none"}}>
                                                <span  className="material-icons">delete_outline</span>
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        :
                        null
                }
                <button onClick={() => props.deleteQuestion(nanoid)} style={{background: "transparent", border: "none"}}>
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
                        onChange={(e) => setHeader(e.target.value)}/>
                </div>
                {
                    type == "Text" ?
                        //Text type
                        <div className="question-response">
                            <input
                                type="text"
                                name="answer"
                                value={responses.filter((res) => res.question === questionId && res.date === date).text}
                                placeholder={"Response"}
                                onChange={(e) => updateResponse(e.target.value, 'Text')}
                            />
                        </div>
                        :
                        type == "Number" ?
                            //Number type
                            <div className="question-response">
                                <input
                                    type="text"
                                    name="answer"
                                    value={responses.filter((res) => res.question === questionId && res.date === date).number}
                                    placeholder={"Response"}
                                    onChange={(e) => updateResponse(e.target.value, 'Text')}
                                />
                            </div>
                            :
                            type == "Boolean" ?
                                //Boolean type
                                <div className="question-response">
                                    <div className="radio-wrapper">
                                        <label><input type="radio" name="radio" value="true" checked={true}/>true</label>
                                        <label><input type="radio" name="radio" value="false" checked={false}/>false</label>
                                    </div>
                                </div>
                                :
                                type == "MultipleChoice" ?
                                    //MultipleChoice type
                                    <div className="question-response">
                                        <div className="radio-wrapper">

                                        </div>
                                    </div>
                                    :
                                    null
                }
            </div>
    );
}
export default Question
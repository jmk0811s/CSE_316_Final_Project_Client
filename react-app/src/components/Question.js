import React, {useState, useEffect} from 'react'

function Question(props) {
    const [editMode, setEditMode] = useState(props.editMode);
    const [type, setType] = useState(props.type);
    const [header, setHeader] = useState(props.header);
    const [mdate, setMDate] = useState(props.mdate);
    const [nanoid, setNanoid] = useState(props.nanoid);
    const [questions, setQuestions] = useState(props.questions);
    const [responses, setResponses] = useState(props.responses);
    const [index, setIndex] = useState(props.index);

    useEffect(() => {
        setEditMode(props.editMode);
        setType(props.type);
        setHeader(props.header);
        setMDate(props.mdate);
        setNanoid(props.nanoid);
        setQuestions(props.questions);
        setResponses(props.responses);
        setIndex(props.index);
    }, [props]);

    useEffect(() => {
        //console.log(responses);
    }, [props.responses]);

    const handleChange = (newValue, field) => {
        let newQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].nanoid === nanoid) {
                let newQuestion = {
                    type: field === 'type' ? newValue : type,
                    header: field === 'header' ? newValue : header,
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
        console.log("updated@");
    }

    const addChoice = () => {

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
                        onChange={(e) => {setHeader(e.target.value);handleChange(e.target.value, 'header');}}/>
                </div>
                <select // dropdown question type selection menu
                    value={type}
                    onChange={(e) => {setType(e.target.value);handleChange(e.target.value, 'type');}}
                    className="dropdown">
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                    <option value="Boolean">Boolean</option>
                    <option value="MultipleChoice">Multiple Choice</option>
                </select>
                {
                    type === 'MultipleChoice' ?
                        <div className="wrapper">
                            <label><input type="radio" name="radio" value="true" checked={false}/>test</label>
                            <button onClick={addChoice} style={{background: "transparent", border: "none"}}>
                                <span  className="material-icons">add_circle_outline</span>
                            </button>
                        </div>
                        :
                        null
                }
                <button onClick={() => props.deleteQuestion(nanoid)} style={{background: "transparent", border: "none"}}>
                    <span  className="material-icons">delete_outline</span>
                </button>
            </div>
            :
            <div></div>
        /*
            // Read mode
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
                        <div className="question-answer">
                            <input
                                type="text"
                                name="answer"
                                value={responses.filter((res) => res.question === nanoid)}
                                placeholder={"Answer"}
                                onChange={(e) => setAnswerText(e.target.value)}/>
                        </div>
                        :
                        type == "Number" ?
                            //Number type
                            <div className="question-answer">
                                <input
                                    type="text"
                                    name="answer"
                                    value={answerNumber}
                                    onChange={(e) => setAnswerNumber(e.target.value)}/>
                            </div>
                            :
                            type == "Boolean" ?
                                //Boolean type
                                <div className="question-answer">
                                    <div className="radio-wrapper">
                                        <label><input type="radio" name="radio" value="true" checked={answerBoolean}/>true</label>
                                        <label><input type="radio" name="radio" value="false" checked={!answerBoolean}/>false</label>
                                    </div>
                                </div>
                                :
                                type == "MultipleChoice" ?
                                    //MultipleChoice type
                                    <div className="question-answer">
                                        <div className="radio-wrapper">

                                        </div>
                                    </div>
                                    :
                                    null
                }
            </div>

         */
    );
}
export default Question
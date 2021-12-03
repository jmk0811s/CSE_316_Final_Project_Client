import React, {useState, useEffect} from 'react'

function Question(props){
    const [questionType, setQuestionType] =useState();
    const [questionHeader, setQuestionHeader] =useState();
    const [questionAnswer, setQuestionAnswer] =useState();
    const [questionDate, setQuestionDate] =useState();
    const [editMode, setEditMode] = useState(props.editMode);
    const [multipleChoices, setMultipleChoices] = useState(props.qChoices);

    useEffect(() => {
        setQuestionType(props.type);
        setQuestionHeader(props.header);
        setQuestionAnswer(props.answer);
        setQuestionDate(props.date);
        setEditMode(props.editMode);
        console.log("Type: " + questionType);
        console.log("Header: " + questionHeader);
    }, [props]);

    const handleSelect = (prop)=> (e) => {
        if(prop == "qType"){
            setQuestionType(e.target.value)
        }
        else if(prop == "qText"){
            setQuestionHeader(e.target.value)
        }

    }

    return (
        editMode ?
            //edit mode
            <div className="Question">

            </div>
            :
            //read-only mode
            <div className="Question">
                <div className="question-header">
                    {questionHeader}
                </div>
                {
                    questionType == "Text" ?
                        //Text type
                        <div className="question-answer">
                            {questionAnswer.text}
                        </div>
                        :
                        questionType == "Number" ?
                            //Number type
                            <div className="question-answer">
                                <input
                                    type="text"
                                    value={questionAnswer.number}
                                ></input>
                            </div>
                            :
                            questionType == "Boolean" ?
                                //Boolean type
                                <div className="question-answer">
                                    <div className="radio-wrapper">
                                        <label><input type="radio" name="radio" value="true" checked={questionAnswer.boolean}/>true</label>
                                        <label><input type="radio" name="radio" value="false" checked={!questionAnswer.boolean}/>false</label>
                                    </div>
                                </div>
                                :
                                questionType == "MultipleChoice" ?
                                    //MultipleChoice type
                                    <div className="question-answer">
                                        <div className="radio-wrapper">
                                            
                                        </div>
                                    </div>
                                    :
                                    null
                }
            </div>



        /*
        (editMode?
            (<div className="Question">
                <form>
                    <input type="text"
                           value={questionHeader}
                           onChange={handleSelect("qText")}></input>
                </form>
                <div style={{display: "flex",justifyContent: "space-between"}}>
                    <select onChange={handleSelect("qType")} value={questionType}>
                        <option value="number">number</option>
                        <option value="boolean">boolean</option>
                        <option value="text">text</option>
                        <option value="multiple">multiple choice</option>
                        {}
                    </select>

                    <button style={{background:"transparent", border: "none"}}>
                        <span className="material-icons">delete_outline</span>
                    </button>
                </div>
            </div>):
            (<div className="Question">
                {questionHeader}
                <div></div>
                {questionType === 'number'?
                    <form>
                        <input type ='number'></input>
                    </form> :
                    questionType === 'boolean'?
                        <form>
                            <input type="radio" id="true"
                                    name="tfRadio"></input>
                            <label for="true">True</label>
                            <input type="radio" id="false"
                                    name="tfRadio" value="False"></input>
                            <label for="false">False</label>
                        </form> :
                        questionType === 'text'?
                            <form>
                                <input type = 'text'></input>
                            </form> :
                            <form>
                                {multipleChoices? multipleChoices.map((choice)=>
                                    <React.Fragment>
                                        <input type="radio" id="multipleChoices" name="mcRadio"></input>
                                        <label htmlFor="multipleChoices">{choice}</label>
                                    </React.Fragment>
                                ):<></>}
                            </form>
                }
            </div>)
        )


         */
    );
}
export default Question
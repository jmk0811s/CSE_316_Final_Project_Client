import React, {useState} from 'react'

function Question(props){

    const [questionDate, setQuestionDate] =useState(props.qDate);
    const [questionText, setQuestionText] =useState(props.qText);
    const [questionType, setQuestionType] =useState(props.qType);
    const [editMode, setEditMode] = useState(props.editMode);
    const [multipleChoices, setMultipleChoices] = useState(props.qChoices);

    const handleSelect = (prop)=> (e) => {
        if(prop == "qType"){
            setQuestionType(e.target.value)
        }
        else if(prop == "qText"){
            setQuestionText(e.target.value)
        }

    }

    console.log(questionType);

    return(editMode?
            (<div className="Question">
                <form>
                    <input type="text"
                           value={questionText}
                           onChange={handleSelect("qText")}></input>
                </form>
                <div style={{display: "flex",justifyContent: "space-between"}}>
                    <select onChange={handleSelect("qType")} value={questionType}>
                        <option value="number">number</option>
                        <option value="boolean">boolean</option>
                        <option value="text">text</option>
                        <option value="multiple">multiple choice</option>
                        {/* select 함에 따라 question 의 state 이 바뀌도록*/}
                    </select>

                    {/*if option 4 -> multiple choice 쓸 수 있는 input fields들 */}

                    <button style={{background:"transparent", border: "none"}}>
                        <span className="material-icons">delete_outline</span>
                    </button>
                </div>
            </div>):
            (<div className="Question">
                {questionText}
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

    );
}
export default Question
import React, {useState} from 'react'

function Question(props){

    const [questionDate, setQuestionDate] =useState(props.qDate);
    const [questionText, setQuestionText] =useState(props.qText);
    const [questionType, setQuestionType] =useState(props.qType);
    const [editMode, setEditMode] = useState(true);
    const [multipleChoices, setMultipleChoices] = useState();

    const handleSelect = (prop)=> (e) => {
        if(prop == "qType"){
            setQuestionType(e.target.value)
        }
        else if(prop == "qText"){
            setQuestionText(e.target.value)
        }

    }

    return(editMode?
            (<div className="Question">
                <form>
                    <input type="text"
                           value={questionText}
                           onChange={handleSelect("qText")}></input>
                </form>
                <div style={{display: "flex",justifyContent: "space-between"}}>
                    <select onChange={handleSelect("qType")} value={questionType}>
                        <option value="1">number</option>
                        <option value="2">boolean</option>
                        <option value="3">text</option>
                        <option value="4">multiple choice</option>
                    </select>
                    <button>trash</button>
                </div>
            </div>):
            (<div className="Question">
                {questionText}
                {/*{questionType == '1'? <input type ='text'></input> :*/}
                {/*    questionType == '2'? <input>type=</input>*/}
                {/*}*/}
            </div>)

    );
}
export default Question
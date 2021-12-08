import React, {useState, useEffect} from 'react';
import {
    CartesianGrid,
    Line,
    BarChart,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
    Bar
} from "recharts";
function ViewByQuestion(props){
    const [responses, setResponses] = useState(props.responses);
    const [questions, setQuestions] = useState(props.questions);

    const [textQuestion, setTextQuestion] = useState();
    const [textResponses, setTextResponses] = useState();
    const [textResponsesIndex, setTextResponsesIndex] = useState(0);
    //newly added
    const [textQuestionIndex, setTextQuestionIndex] = useState(0);
    const [currTextResponses, setCurrTextResponses] = useState();


    const [numberQuestion, setNumberQuestion] = useState();
    const [numberResponses, setNumberResponses] = useState();
    //newly added
    const [numberQuestionIndex, setNumberQuestionIndex] = useState(0);
    const [currNumberResponses, setCurrNumberResponses] = useState();

    const [booleanQuestion, setBooleanQuestion] = useState();
    const [booleanResponses, setBooleanResponses] = useState();
    const [booleanQuestionIndex, setBooleanQuestionIndex] = useState(0);
    const [currBooleanResponses, setCurrBooleanResponses] = useState();

    useEffect(()=>{
        setQuestions(props.questions);
        setResponses(props.responses);
        if(props.questions){
            setTextQuestion(filterOnly(props.questions, "textQuestion"))
            setNumberQuestion(filterOnly(props.questions, "numberQuestion"))
            setBooleanQuestion(filterOnly(props.questions, "booleanQuestion"))
        }
        if(props.responses){
            setTextResponses(sortByDate(filterOnly(props.responses, "textResponse")));
            setNumberResponses(sortByDate2(filterOnly(props.responses, "numberResponse")));
            setBooleanResponses(sortByDate2(filterOnly(props.responses, "booleanResponse")));
        }
    },[props.responses, props.questions])

    useEffect(()=>{
        if(textQuestion){
            if(textQuestion[textQuestionIndex] && textResponses){
                setCurrTextResponses(filterById(textResponses, textQuestion[textQuestionIndex]._id));
            }
        }
    },[textResponses, textQuestion])

    useEffect(()=>{
        if(numberQuestion){
            if(numberQuestion[numberQuestionIndex]&& numberResponses){
                setCurrNumberResponses(filterById(numberResponses, numberQuestion[numberQuestionIndex]._id));
            }
        }
    },[numberResponses, numberQuestion])

    useEffect(()=>{
        console.log('useEffect')
        if(booleanQuestion){
            // console.log('PASS1')
            // console.log(booleanQuestion)
            // console.log(booleanQuestion[booleanQuestionIndex])
            if(booleanQuestion[booleanQuestionIndex] && booleanResponses){
                setCurrBooleanResponses(boolDataGen()); //here
                // console.log('PASS2')
            }
        }
    },[booleanResponses,booleanQuestion,booleanQuestionIndex])

    // console.log(currTextResponses)
    // console.log(currNumberResponses)
    // console.log(numberQuestion)

    //최신날짜 = 0번째
    const sortByDate = (list) => {
        return list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    //오래된거 = 0 번째
    const sortByDate2 = (list) => {
        return list.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    const filterOnly = (list, prop) => {
        if(prop === "textResponse"){
            return list.filter(r=> r.response.text !== "");
        }
        else if(prop === "textQuestion"){
            return list.filter(r=> r.type === "Text");
        }
        else if(prop === "numberResponse"){
            return list.filter(r=> r.response.number !== null);
        }
        else if(prop === "numberQuestion"){
            return list.filter(r=> r.type === "Number");
        }
        else if(prop === "booleanResponse"){
            return list.filter(r=> r.response.boolean !== null);
        }
        else if(prop === "booleanQuestion"){
            return list.filter(r=> r.type === "Boolean");
        }
    }
    const filterById = (list, id) => {
        return list.filter(r=> r.question===id);
    }

    const boolDataGen = () =>{
        let t = 0;
        let f = 0;
        let curr = filterById(booleanResponses, booleanQuestion[booleanQuestionIndex]._id);
        curr.map((r)=>{
            if(r.response.boolean){
                t++;
            }
            else{
                f++;
            }
        })
        console.log(t);
        console.log(f);
        let temp = [{
            "name": booleanQuestion[booleanQuestionIndex].header,
            "True": t,
            "False": f
        }]
        return temp;
    }


    // let sortedList;
    //---------------for testing---------------------
    // if(responses){
    //     let sortedList = sortByDate(responses);
    //     console.log(sortedList)
    //     console.log(sortedList[textQuestionsIndex].date)
    // }

    const dateToString = (date) => {
        return date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
    }

    const prev = (prop)=> ()=>{
        if(prop==='date'){
            if(textResponsesIndex < currTextResponses.length-1){
                setTextResponsesIndex(textResponsesIndex+1);
            }
        }
        else if(prop === 'question'){
            if(textQuestionIndex < textQuestion.length-1){
                setCurrTextResponses(filterById(textResponses, textQuestion[textQuestionIndex+1]._id));
                console.log(textQuestionIndex)
                setTextQuestionIndex(textQuestionIndex+1)
                console.log(textQuestionIndex)
                setTextResponsesIndex(0);
            }
        }
        else if(prop === 'number'){
            if(numberQuestionIndex < numberQuestion.length-1){
                setCurrNumberResponses(filterById(numberResponses, numberQuestion[numberQuestionIndex+1]._id));
                setNumberQuestionIndex(numberQuestionIndex+1)
            }
        }
        else if(prop === 'boolean'){
            if(booleanQuestionIndex < booleanQuestion.length-1){
                setBooleanQuestionIndex(booleanQuestionIndex+1);
            }
        }
    }
    const next = (prop)=>()=> {
        if(prop==='date'){
            if(textResponsesIndex>0){
                setTextResponsesIndex(textResponsesIndex-1);
            }
        }
        else if(prop === 'question'){
            if(textQuestionIndex >0){
                setCurrTextResponses(filterById(textResponses, textQuestion[textQuestionIndex-1]._id));
                console.log(textQuestionIndex)
                setTextQuestionIndex(textQuestionIndex-1)
                console.log(textQuestionIndex)
                setTextResponsesIndex(0);
            }
        }
        else if(prop === 'number'){
            if(numberQuestionIndex >0){
                setCurrNumberResponses(filterById(numberResponses, numberQuestion[numberQuestionIndex-1]._id));
                setNumberQuestionIndex(numberQuestionIndex-1);
            }
        }
        else if(prop === 'boolean'){
            if(booleanQuestionIndex >0){
                setBooleanQuestionIndex(booleanQuestionIndex-1);
            }
        }
    }

    // console.log(responses)
    // console.log(textResponses)
    // console.log(questions)
    // console.log(numberQuestion)
    // console.log(numberResponses)
    // console.log(textQuestion)
    console.log(booleanQuestion)
    console.log(booleanResponses)
    console.log(currBooleanResponses)
    console.log(currBooleanResponses[0])





    return (
      <div className="ViewByQuestion">
          <h1>View by Question</h1>

          {/*text questions*/}
          <div className="ViewDataH1">
              <h1>Text type responses</h1>
          </div>
          <div className="TextQuestionData">
              <div className="LogSelectionBar" style={{textAlign: 'center'}}>
                  <h2>
                      {/*{textResponses? (textResponses[textResponsesIndex]?textResponses[textResponsesIndex].date:"") : ""}*/}
                      {currTextResponses? (currTextResponses[textResponsesIndex]?dateToString(new Date(currTextResponses[textResponsesIndex].date)):"") : ""}
                  </h2>
              </div>
              <div className="TextQuestionDataView" style={{marginBottom: 0}}>
                  <div className="LogSelectionBar" style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
                      <button onClick={prev('question')}>
                          <h2>{"<"}</h2>
                      </button>
                      <h2>{textQuestion? (textQuestion[textQuestionIndex]?textQuestion[textQuestionIndex].header:""): ""}</h2>
                      <button onClick={next('question')}>
                          <h2>{">"}</h2>
                      </button>
                  </div>
                  <div className="LogSelectionBar" style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
                      <button onClick={prev('date')}>
                          <h2>{"<"}</h2>
                      </button>
                      <p>{currTextResponses? (currTextResponses[textResponsesIndex]? currTextResponses[textResponsesIndex].response.text:""): ""}</p>
                      <button onClick={next('date')}>
                          <h2>{">"}</h2>
                      </button>
                  </div>
              </div>
          </div>

          {/*Number Questions*/}
          <div className="ViewDataH1">
              <h1>Numeric type responses</h1>
          </div>

          <div className="NumberQuestionData">
              <h2>{numberQuestion? (numberQuestion[numberQuestionIndex]? numberQuestion[numberQuestionIndex].header:""): ""}</h2>

              <div className="LogSelectionBar" style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
                  <button onClick={prev('number')}>
                      <h2>{"<"}</h2>
                  </button>
                  <ResponsiveContainer width="100%" height={400}>
                      <LineChart
                          width={900}
                          height={400}
                          data={currNumberResponses? currNumberResponses : []}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                          <XAxis dataKey="date" />
                          <YAxis dataKey="response.number"/>
                          <Tooltip />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Line type="monotone" dataKey="response.number" stroke="#8884d8"  />
                      </LineChart>
                  </ResponsiveContainer>
                  <button onClick={next('number')}>
                      <h2>{">"}</h2>
                  </button>
              </div>


          </div>

          {/*Boolean Questions*/}

          <div className="ViewDataH1">
              <h1>Boolean type responses</h1>
          </div>
          <div className="BooleanQuestionData">
              <h2>{booleanQuestion? (booleanQuestion[booleanQuestionIndex]? booleanQuestion[booleanQuestionIndex].header: ""): ""}</h2>
              <div className="LogSelectionBar" style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
                  <button onClick={prev('boolean')}>
                      <h2>{"<"}</h2>
                  </button>
                  <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                          width={730}
                          height={250}
                          data={currBooleanResponses?currBooleanResponses: []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="True" fill="#8884d8" />
                          <Bar dataKey="False" fill="#82ca9d" />
                      </BarChart>
                  </ResponsiveContainer>
                  <button onClick={next('boolean')}>
                      <h2>{">"}</h2>
                  </button>
              </div>
          </div>






      </div>
    );
}
export default ViewByQuestion
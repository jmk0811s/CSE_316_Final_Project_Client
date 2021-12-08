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

    //newly added
    const [multipleQuestion, setMultipleQuestion] = useState();
    const [multipleResponses, setMultipleResponses] = useState();
    const [multipleQuestionIndex, setMultipleQuestionIndex] = useState(0);
    const [currMultipleResponses, setCurrMultipleResponses] = useState();


    useEffect(()=>{
        setQuestions(props.questions);
        setResponses(props.responses);
        if(props.questions){
            setTextQuestion(filterOnly(props.questions, "textQuestion"))
            setNumberQuestion(filterOnly(props.questions, "numberQuestion"))
            setBooleanQuestion(filterOnly(props.questions, "booleanQuestion"))
            //newly added
            setMultipleQuestion(filterOnly(props.questions, 'multipleQuestion'))
        }
        if(props.responses){
            setTextResponses(sortByDate(filterOnly(props.responses, "textResponse")));
            setNumberResponses(sortByDate2(filterOnly(props.responses, "numberResponse")));
            setBooleanResponses(sortByDate2(filterOnly(props.responses, "booleanResponse")));
            //newly added
            setMultipleResponses(sortByDate2(filterOnly(props.responses, 'multipleResponse')))
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
        if(booleanQuestion){
            if(booleanQuestion[booleanQuestionIndex] && booleanResponses){
                setCurrBooleanResponses(boolDataGen());
            }
        }
    },[booleanResponses,booleanQuestion,booleanQuestionIndex])

    useEffect(()=>{
        if(multipleQuestion){
            if(multipleQuestion[multipleQuestionIndex] && multipleResponses){
                setCurrMultipleResponses(multDataGen());
            }
        }
    }, [multipleResponses,multipleQuestion, multipleQuestionIndex])

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

        //newly added
        else if(prop === "multipleResponse"){
            return list.filter(r=> r.response.multiple_choice.length !== 0);
        }
        else if(prop === "multipleQuestion"){
            return list.filter(r=> r.type === "MultipleChoice");
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

    const multDataGen = () =>{
        let c1 = 0;
        let c2 = 0;
        let c3 = 0;

        let curr = filterById(multipleResponses, multipleQuestion[multipleQuestionIndex]._id);
        curr.map((r)=>{
            if(r.response.multiple_choice[0]){
                c1++;
            }
            else if(r.response.multiple_choice[1]){
                c2++;
            }
            else{
                c3++;
            }
        })
        let t1 = multipleQuestion[multipleQuestionIndex].choices[0];
        let t2 = multipleQuestion[multipleQuestionIndex].choices[1];
        let t3 = multipleQuestion[multipleQuestionIndex].choices[2];
        let temp = [{
            "name": multipleQuestion[multipleQuestionIndex].header,
            "choice 1" : c1,
            "choice 2" : c2,
            "choice 3" : c3
        }]
        return temp;
    }
    console.log(multipleQuestion);
    console.log(multipleResponses);

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
        else if(prop === 'multiple'){
            if(multipleQuestionIndex < multipleQuestion.length-1){
                setMultipleQuestionIndex(multipleQuestionIndex+1);
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
        else if(prop === 'multiple'){
            if(multipleQuestionIndex >0){
                setMultipleQuestionIndex(multipleQuestionIndex-1);
            }
        }
    }

    // console.log(responses)
    // console.log(textResponses)
    // console.log(questions)
    // console.log(numberQuestion)
    // console.log(numberResponses)
    // console.log(textQuestion)
    // console.log(booleanQuestion)
    // console.log(booleanResponses)
    // console.log(currBooleanResponses)
    //console.log(currBooleanResponses[0])





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

          <div className="ViewDataH1">
              <h1>Multiple Choice type responses</h1>
          </div>
          <div className="MultipleChoiceQuestionData">
              <h2>{multipleQuestion? (multipleQuestion[multipleQuestionIndex]? multipleQuestion[multipleQuestionIndex].header: ""): ""}</h2>
              <div className="LogSelectionBar" style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
                  <button onClick={prev('multiple')}>
                      <h2>{"<"}</h2>
                  </button>
                  <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                          width={730}
                          height={250}
                          data={currMultipleResponses?currMultipleResponses: []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="choice 1" name = {multipleQuestion? (multipleQuestion[multipleQuestionIndex]? multipleQuestion[multipleQuestionIndex].choices[0]:""): "" } fill="#8884d8" />
                          <Bar dataKey="choice 2" name = {multipleQuestion? (multipleQuestion[multipleQuestionIndex]? multipleQuestion[multipleQuestionIndex].choices[1]:""): "" } fill="#82ca9d" />
                          <Bar dataKey="choice 3" name = {multipleQuestion? (multipleQuestion[multipleQuestionIndex]? multipleQuestion[multipleQuestionIndex].choices[2]:""): "" } fill="#ffc658" />
                      </BarChart>
                  </ResponsiveContainer>
                  <button onClick={next('multiple')}>
                      <h2>{">"}</h2>
                  </button>
              </div>
          </div>






      </div>
    );
}
export default ViewByQuestion
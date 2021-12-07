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

    const [numberQuestion, setNumberQuestion] = useState();
    const [numberResponses, setNumberResponses] = useState();

    const [booleanQuestion, setBooleanQuestion] = useState();
    const [booleanResponses, setBooleanResponses] = useState();

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
    const prev = ()=>{
        if(textResponsesIndex < textResponses.length-1){
            setTextResponsesIndex(textResponsesIndex+1);
        }
    }
    const next = ()=>{
        if(textResponsesIndex>0){
            setTextResponsesIndex(textResponsesIndex-1);
        }
    }

    console.log(responses)
    // console.log(textResponses)
    console.log(questions)
    // console.log(textQuestion)
    // console.log(numberResponses)
    console.log(booleanResponses)





    return (
      <div className="ViewByQuestion">
          <h1>View by Question</h1>

          {/*text questions*/}
          <div className="ViewDataH1">
              <h1>Text type responses</h1>
          </div>
          <div className="TextQuestionData">
              <div className="LogSelectionBar" style={{display: "flex", flexDirection: 'row',justifyContent: "space-between"}}>
                  <button onClick={prev}>
                      <h2>{"<"}</h2>
                  </button>
                  <h2>
                      {textResponses? textResponses[textResponsesIndex].date : ""}
                  </h2>
                  <button onClick={next}>
                      <h2>{">"}</h2>
                  </button>
              </div>
              <div className="TextQuestionDataView" style={{marginBottom: 0}}>
                  <h2>{textQuestion? textQuestion[0].header: ""}</h2>
                  <p>{textResponses? textResponses[textResponsesIndex].response.text: ""}</p>
              </div>
          </div>

          {/*Number Questions*/}
          <div className="ViewDataH1">
              <h1>Numeric type responses</h1>
          </div>

          <div className="NumberQuestionData">
              <h2>{numberQuestion? numberQuestion[0].header: ""}</h2>

              <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                      width={900}
                      height={400}
                      data={numberResponses? numberResponses : []}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                      <XAxis dataKey="date" />
                      <YAxis dataKey="response.number"/>
                      <Tooltip />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Line type="monotone" dataKey="response.number" stroke="#8884d8"  />
                  </LineChart>
              </ResponsiveContainer>

          </div>

          {/*Boolean Questions*/}

          <div className="ViewDataH1">
              <h1>Boolean type responses</h1>
          </div>
          <div className="BooleanQuestionData">
              <h2>{booleanQuestion? booleanQuestion[0].header: ""}</h2>
              <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                      width={730}
                      height={250}
                      data={booleanResponses?booleanResponses: []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="response.boolean" fill="#8884d8" />
                      <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
              </ResponsiveContainer>

          </div>






      </div>
    );
}
export default ViewByQuestion
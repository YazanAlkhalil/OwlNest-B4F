import React, { useState } from 'react'
import Question from './Question';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import FormDialog from './AddAnswersDialog';
import { useNavigate, useParams } from 'react-router-dom';


function CreateQuiz({submit,getDetails}) {
    const [quizName, setQuizName] = useState('')
    const [total, setTotal] = useState('')
    const [questions, setQuestions] = useState([])
    const {id} = useParams()
    const unitId = localStorage.getItem('unitId')

    async function sendQuiz(){
        const res = await fetch(`http://localhost:5000/api/trainer/courses/${id}/units/${unitId}/lessons/quiz`,{
            
            method:"POST",
            credentials:'include',
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify({
                title:quizName,
                quiz:{
                    grade:total,
                    questions
                }
            })
        })
        const data = await res.json()
        if(!res.ok)
            toast.error(data.msg)
        else{
            
            toast.success('Quiz added successfully')
            getDetails()
            submit()
        }
        
    }
    
    const addQuestion = (question) => {
        setQuestions([...questions, question]);
    };
    function updateQuestionData(index, updatedQuestionData) {
        const tempQuestionData = [...questions];
        tempQuestionData[index] = updatedQuestionData;
        setQuestions(tempQuestionData);
    }
    function deleteQuestion(id) {
        if (questions.length > 1) {
            const tempQuestionData = [...questions];
            const index = tempQuestionData.findIndex((q) => q.id === id);
            tempQuestionData.splice(index, 1);
            setQuestions(tempQuestionData);
        }
        else {
            toast.error('There should be at least one question')
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='flex'>
                <div className="flex w-min items-center border-b border-primary-500 py-2">
                    <input value={quizName} onChange={e => setQuizName(e.target.value)} className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Quiz name" aria-label="quiz name" />
                </div>
                <div className="flex w-min items-center border-b border-primary-500 py-2">
                    <input value={total} onChange={e => setTotal(e.target.value)} className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="Total Grades" aria-label="total grade" />
                </div>
            </div>
            <FormDialog
                question={
                    {
                        id: uuidv4(),
                        text: "",
                        grade: "",
                        answers: [
                            {
                                id: uuidv4(),
                                text: "",
                                isCorrect: false,
                                feedback: ""
                            },
                            {
                                id: uuidv4(),
                                text: "",
                                isCorrect: false,
                                feedback: ""
                            },
                        ]
                    }
                }
                addQuestion={(question) => addQuestion(question)}
            />
            {questions && questions.map((question, index) => (
                <Question
                    key={question.id}
                    questionData={question}
                    updateQuestionData={(updatedQuestionData) => {
                        
                        updateQuestionData(index, updatedQuestionData)
                    }}
                    deleteQuestion={() => deleteQuestion(question.id)}
                />
            ))}
            <div className='flex justify-end mt-10'>
                <button onClick={submit} className='btn-inner mr-2'>Cancel</button>
                <button onClick={sendQuiz} className='btn-inner'>Save</button>
            </div>
        </div>
    );
};



export default CreateQuiz

import React , { useState, useRef, useEffect }from 'react'
import ViewUsers from './ViewUsers'

const AddUsers = () => {
    const [details, setDetails]  = useState({ Name : " ", userName : " ", editIndex : -1, isDisabled : true})
    const [list, setList] = useState([])
    const[isDisabled, setIsDisabled] = useState(true);
    const nameRef = useRef();

    useEffect(
      () => {
         if(details.editIndex === -1){
            if(details.Name.trim().length !== 0  && details.userName.trim().length !== 0){
               setIsDisabled(false)
            }
            else 
            setIsDisabled(true)
         }
     },[details.Name, details.userName]
      
    )

    const submitHandler = (e) =>{
        e.preventDefault();
    
       if(details.Name.trim().length !== 0  && details.userName.trim().length !== 0) {
          
        if(details.editIndex === -1 ){
            setList([...list,{...details, Name : details.Name, userName : details.userName}])
            setDetails({...details,Name : ' ', userName:' '})
            setIsDisabled(true)
         } else {
             const newList = list.map((person,index) => {
              if(index === details.editIndex){
                  setDetails({...details, editIndex : -1})
                  return {...person, Name : details.Name, userName : details.userName}
              }
              else{
                  return person;
              }
  
             })
             setDetails({...details,Name : ' ', userName:' ', editIndex : -1})
                setList(newList);
                setIsDisabled(true)
         }
       }
         else {
            alert("enter valid details")
         }
        
    }


    const editHandler = (indexValue) => {

        nameRef.current.focus();
        const TargetObj = list.filter((person, index) => index === indexValue)
        const TargetName = TargetObj.map(person => person.Name);
        const TargetUserName = TargetObj.map(person => person.userName);

       setDetails({...details, Name : TargetName, userName : TargetUserName, editIndex : indexValue})

    }

    const deleteHandler = (indexValue) => {
      const modifiedList = list.filter((person, index) => index !== indexValue)
      setDetails({...details, Name : ' ', userName : ' ' , editIndex : -1});
      setList(modifiedList);
    }
    
     const changeHandler = (e) => {
  
        setDetails({...details, [e.target.name] : e.target.value, editIndex : -1})
     }
  return (
    <div className='main-container'>
       <div className='input-container'>
            <header className='input-header'>Add user</header>
            <form onSubmit={submitHandler} className = 'form-container'>
           
                <div className='input-elements'>
                    <label className='label'>Name</label>
                    <input type = "text"  name = 'Name' value = {details.Name} onChange = {changeHandler}  ref = {nameRef} className = 'text-fields' />
                </div>
                <div className='input-elements'>
                    <label className='label'>Username</label>
                    <input type = "text"  name = 'userName' value = {details.userName} onChange = {changeHandler} className = 'text-fields' />
                </div>
                <div >
                        <button type = 'submit' disabled = {isDisabled} className='submit-btn'>submit</button>
                </div>
            </form>
       </div>

       <ViewUsers editHandler = {editHandler} deleteHandler = {deleteHandler} list = {list}/>
    </div>
  )
}

export default AddUsers
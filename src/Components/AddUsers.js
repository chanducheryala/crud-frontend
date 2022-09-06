import React , { useState, useRef, useEffect}from 'react'
import ViewUsers from './ViewUsers'

const AddUsers = () => {
    const [details, setDetails]  = useState({ Name : " ", userName : " ", editIndex : -1})
    const [list, setList] = useState([])
    const[isDisabled, setIsDisabled] = useState(true); 
    const nameRef = useRef();
    
    
    useEffect(() =>{
        let newName = String(details.Name).trim();
        let newUserName = String(details.userName).trim();
        if(newName.length !== 0  && newUserName.length !== 0) {
             return setIsDisabled(false);
        }else{
            return setIsDisabled(true);
        }   
    },[details.Name, details.userName]
    
    )  
   

    const submitHandler = (e) =>{
        e.preventDefault();
        
        let newName = String(details.Name).trim();
        let newUserName = String(details.userName).trim();
    
       if(newName.length !== 0  && newUserName.length !== 0) {     
          
        if(details.editIndex === -1 ){ 
            setList([...list,{...details, Name : details.Name, userName : details.userName}])
            setDetails({...details,Name : ' ', userName:' '})
            setIsDisabled(true)
            
         } else {      

             const newList = list.map((person,index) => {
              if(index === details.editIndex){
                  return {...person, Name : details.Name, userName : details.userName}
              }
              else{
                  return person;
              }
  
             })
             setDetails({...details,Name : ' ', userName:' ', editIndex : -1})
                setList(newList);
                
         }
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
      setIsDisabled(true);
      setList(modifiedList);
    }
    
     const changeHandler = (e) => {
        setDetails({...details, [e.target.name] : e.target.value})
     }

  return (
    <div className='main-container'>
       <div className='input-container'>
            <header className='input-header'>Add user</header>
            <form onSubmit={submitHandler} className = 'form-container'>
           
                <div className='input-elements'>
                    <label className='label'>Name</label>
                    <input type = "text"  name = 'Name' value = {details.Name} onChange = {changeHandler}  ref = {nameRef}  className = 'text-fields' required/>
                </div>
                <div className='input-elements'>
                    <label className='label'>Username</label>
                    <input type = "text"  name = 'userName' value = {details.userName} onChange = {changeHandler} className = 'text-fields' required/>
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
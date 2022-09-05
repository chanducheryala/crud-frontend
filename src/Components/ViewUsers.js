import React from 'react'

const ViewUsers = ({editHandler,deleteHandler, list}) => {
    
  return (
    <div className='output-container'>
        <div>
            <header className = 'output-header'>View Users</header>
        </div>
        <div className='titles'>
            <header className = 'title-name'>Name</header>
            <header className = 'title-name'>Username</header>
            <header className = 'title-name'>Actions</header>
            
        </div>
        <div className='user-details'>
             {
                list.map((person, index) => {
                    return <div key  = {index}  className='user'>
                              <span className = 'display-name'>{person.Name}</span>
                              <span className = 'display-userName'>{person.userName}</span>
                              <div className='display-btn'>
                                 <button onClick={()=> editHandler(index)} className= 'action-btn' style={{marginRight: '0.2em' , fontWeight: '550', height: '3em'}}>Edit</button>
                                 <button onClick={()=> deleteHandler(index)} className= 'action-btn' style={{fontWeight: '550',height: '3em'}}>Delete</button>
                              </div>
                            
                           </div>
                })
            }
        </div>
        <hr />
    </div>
  )
}

export default ViewUsers
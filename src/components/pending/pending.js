import React, { Component } from 'react'
import './index.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PostAddIcon from '@mui/icons-material/PostAdd';


export default class Pending extends Component {
  state={
    inputValue:'',
    isVisible:false,
 }

inputVisible=()=>{
  this.setState({
    isVisible: !this.state.isVisible
  })
}
addinputValue=(event)=>{
  this.setState({
    inputValue:event.target.value
  })
}

addTask=()=>{
  let a = 'pending'
  let b = "pending"
  this.props.addTask(a, b, this.state.inputValue)
  this.setState({
    inputValue:'',
 })
 this.inputVisible()

}
buttonsOpen=(id)=>{
  let a = 'pending'
  console.log(this.props.isTaskButtonVisible)
 this.props.isTaskButtonVisible(a, id)
}
otherStatus =(id)=>{
  let a = "pending"
this.props.otherStatus(a, id)
}
delTask=(index)=>{
  let a = 'pending'
  this.props.delTask(a, index)

}

  render() {
    const {inputValue, isVisible} = this.state
    const {pending} = this.props;
   return (
      <div  className='row open m-1'>
       <div className='col-md-12 d-flex justify-content-between px-1 py-1'><h6>Pending</h6><MoreHorizIcon color='grey'/>
     </div>
     {isVisible ?
       <div className='input-group w-100' >
         <input className='form-control p-1' value={inputValue} onChange={this.addinputValue}/> 
         <span>
           <button className='btn btn-success btn-sm' onClick={this.addTask}>save</button>
          </span>
        </div>
     :''}
    
     {pending ?
      pending.filter((item)=>item.status==='pending').map((item, index)=>{
         return( 
         <div className='row tasks px-1 mx-1 my-1 w-100' key={index} onClick={()=>this.buttonsOpen(index)}>
            <div className='col-md-12 taskOpen '>{item.name}</div>
            {item.isButtonVisible ? 
            <div>
              <button className='btn btn-info btn-sm' onClick={()=>this.otherStatus(index)}>Send</button>
              <button className='btn btn-danger btn-sm ms-2'onClick={()=>this.delTask(index)}>Del</button>
            </div>
            :''}
         </div>)})
     :''}
     <div className='d-grid gap-2'>
     <button className='btn addCard py-2 px-0 border' onClick={this.inputVisible}> + Добавить карточку <PostAddIcon fontSize="small"  /> </button>


      </div>
      </div>
    )
  }
}

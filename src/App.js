import React, { Component } from 'react'
import Complete from './components/complete/complete';
import Inprog from './components/inprog/inprog';
import Open from './components/open/open';
import Pending from './components/pending/pending';
import './index.css'
import  'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
  state ={
    taskOpen:[],
    pending:[],
    inprog:[],
    complete:[]
   
  }
  addTask = (taskName, status, newTask)=>{
    if(taskName ==='taskOpen'){
       let a = this.state.taskOpen
       a.push({id:a.length, name:newTask, status:status, isButtonVisible:false} )
       this.setState({
         taskOpen:a
       })       
       console.log(this.state.taskOpen)
       localStorage.setItem('taskOpen', JSON.stringify(a))
    }else if(taskName ==='pending'){
       let a = this.state.pending
       a.push({id:a.length, name:newTask, status:status, isButtonVisible:false} )
       this.setState({
         pending:a
       })
      console.log(this.state.pending)
      localStorage.setItem('pending ', JSON.stringify(a))
    }
    else if(taskName==='inprog'){
      let a = this.state.inprog
      a.push({id:a.length, name:newTask, status:status, isButtonVisible:false} )
      this.setState({
        inprog:a
      })
      console.log(this.state.inprog)
      localStorage.setItem('inprog', JSON.stringify(a))
   }
   else if(taskName==='complete'){
      let a = this.state.complete
      a.push({id:a.length, name:newTask, status:status, isButtonVisible:false} )
      this.setState({
         complete:a
    })
      console.log(this.state.complete)
      localStorage.setItem('complete', JSON.stringify(a))
 }
 }
  isTaskButtonVisible=(name, id)=>{
    if(name==='taskOpen'){ 
       let a = JSON.parse(localStorage.getItem('taskOpen'))
      a[id].isButtonVisible = !a[id].isButtonVisible
       this.setState({
        taskOpen:a
       })
       localStorage.setItem('taskOpen', JSON.stringify(a))
    }else if(name==='pending'){
      let a = this.state.pending
      a[id].isButtonVisible = !a[id].isButtonVisible
       this.setState({
        pending:a
       }) 
       localStorage.setItem('pending', JSON.stringify(a))
    } else if(name==='inprog'){
      let a = this.state.inprog
       console.log(a[id].isButtonVisible)
       a[id].isButtonVisible = !a[id].isButtonVisible
       this.setState({
        inprog:a
       }) 
       localStorage.setItem('inprog', JSON.stringify(a))
    } else if(name==='complete'){
      let a = this.state.complete
       console.log(a[id].isButtonVisible)
       a[id].isButtonVisible = !a[id].isButtonVisible
       this.setState({
        complete:a
       })
        localStorage.setItem('complete', JSON.stringify(a))
    }
   }
  otherStatus=(name, index)=>{
    if(name ==='taskOpen'){
        let a = this.state.taskOpen
        a[index].status = 'pending'
        a[index].isButtonVisible = false 
        let b = this.state.pending
         b.push(a[index])  
        a.splice(index, 1);
        this.setState({
          taskOpen:a
        })
        console.log(a)
        localStorage.setItem('taskOpen', JSON.stringify(a))
        localStorage.setItem('pending', JSON.stringify(b))
    }else if(name==="pending"){
      console.log(index)
        let a = this.state.pending
        a[index].status = 'inprog'
        a[index].isButtonVisible = false
        let b = this.state.inprog
        b.push(a[index]) 
        a.splice(index, 1);
        this.setState({
          pending:a,
         })
        localStorage.setItem('pending', JSON.stringify(a))
        localStorage.setItem('inprog', JSON.stringify(b))
    }else if(name==="inprog"){
        let a = this.state.inprog
        a[index].status = 'complete'
        a[index].isButtonVisible = false
        let b = this.state.complete
        b.push(a[index]) 
        a.splice(index , 1);
        this.setState({
           inprog:a,
        })
        localStorage.setItem('inprog', JSON.stringify(a))
        localStorage.setItem('complete', JSON.stringify(b))
  } 
 }
 delTask=(name, id)=>{
    if(name ==='taskOpen'){
         let a = this.state.taskOpen
         console.log(id)
         a.splice(id , 1)
         this.setState({
           taskOpen:a
         })
         localStorage.setItem('taskOpen', JSON.stringify(a))
    }else if(name === 'pending'){
      let a = this.state.pending
         a.splice(id , 1)
         this.setState({
           pending:a
         })
         localStorage.setItem('pending', JSON.stringify(a))
    }else if(name === 'inprog'){
      let a = this.state.inprog
         a.splice(id , 1)
        this.setState({
           inprog:a
         })
         localStorage.setItem('inprog', JSON.stringify(a))
    }
    else if(name === 'complete'){
      let a = this.state.complete
         a.splice(id , 1)
         this.setState({
           complete:a
         })
         localStorage.setItem('complete', JSON.stringify(a))
    }
 }






  componentDidMount(){
    console.log('didMount')
    let a = localStorage.getItem('taskOpen')
    if(a){
      let b = JSON.parse(a)
      this.setState({
        taskOpen:b
      })
    }
    let pendingString = localStorage.getItem('pending')
    if(pendingString){
      let pending = JSON.parse(pendingString)
      this.setState({
        pending
      })
    }
    let inprogString = localStorage.getItem('inprog')
    if(inprogString){
      let inprog = JSON.parse(pendingString)
      this.setState({
        inprog
      })
    }
    let completeString = localStorage.getItem('complete')
    if(completeString){
      let complete = JSON.parse(completeString)
      this.setState({
        complete
      })
    }
  }
  

  render() {
    const {taskOpen, pending, inprog, complete} = this.state;
    return (
      <div className='container main w-75'>
        <div className='row'>
          <div className='col-md-3'><Open  otherStatus ={this.otherStatus} isTaskButtonVisible={this.isTaskButtonVisible} addTask={this.addTask} delTask= {this.delTask} taskOpen={taskOpen}/></div>
          <div  className='col-md-3'><Pending otherStatus ={this.otherStatus} isTaskButtonVisible={this.isTaskButtonVisible} addTask={this.addTask} pending={pending} delTask= {this.delTask}/></div>
          <div  className='col-md-3'><Inprog otherStatus ={this.otherStatus} isTaskButtonVisible={this.isTaskButtonVisible} addTask={this.addTask} inprog={inprog} delTask= {this.delTask}/></div>
          <div  className='col-md-3'><Complete otherStatus ={this.otherStatus} isTaskButtonVisible={this.isTaskButtonVisible} addTask={this.addTask} complete={complete} delTask= {this.delTask}/></div>
        </div>
        
      </div>
    )
  }
}


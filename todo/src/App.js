import React, { Component, } from 'react';
import firebase from './firebase';
import './App.css';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,


};


export default class App extends Component {
  ref = firebase.database().ref()
  constructor() {
    super();
    this.state = {
      value: '',
      nameArray: [],
      key:[]
    }
  }
  senddata() {

    if(this.state.value===''){alert('your value is empty')}
   else{
    this.ref.child("users").push({ value: this.state.value });
    this.setState({ value: "" })
  
  }
   }
  componentDidMount() {
    firebase.database().ref().child('users').on('value', (snapshot) => {
      let key =[]
      console.log(key)
      let data = snapshot.val();
      if (data){ this.setState({ nameArray: Object.values(data) }) 
      for (let i in data){
        key.push(i)
        this.setState({key})
      }
    }
    else{
      this.setState({nameArray:[]})
    }
    })
  }
  edit=(val,ind)=>{
    
this.setState({isEdit: true,currentIndex: val,
  value: ind.value}


)

   
  }
updatedata(){
  let key = this.state.key;
  let ind = this.state.currentIndex
  console.log(this.state.value)
  firebase.database().ref().child(`users/${key[ind]}`).update({
    value : this.state.value
  })
  this.setState({isEdit:false,value:''})
}
dlt(ind){
  let key = this.state.key;
  console.log(ind)
  firebase.database().ref().child(`users/${key[ind]}`).remove()
}
  render() {
    let isEdit= this.state.isEdit
    return (
      <div className='tdo'>
        <AppBar title="Todo List" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <TextField hintText="Enter your today list" floatingLabelText="Todo list" value={this.state.value} onChange={(e) => { this.setState({ value: e.target.value ,}  )  
        }} id="input" />
      {isEdit?<div>     

        <RaisedButton label="Updatetodo" backgroundColor="#13a89e" margin="8" primary={false} style={style} onClick={this.updatedata.bind(this)}  />
<RaisedButton label="Cancle" onClick={()=>{
this.setState({ value: "",isEdit :false })}}/>
</div>
:
        <RaisedButton label="addtodo" backgroundColor="#13a89e" margin="8" primary={false} style={style} onClick={this.senddata.bind(this)} />
        }
        <p> Todo List </p>
        {console.log(this.state.nameArray)}
        <div >{this.state.nameArray.map((val, ind) => {
          return (
            <div key={ind}>
              <li>

                {val.value}
                <RaisedButton label='Edit' primary={true} style={style} onClick={this.edit.bind(this,ind,val)} />
                <RaisedButton label='Delete' secondary={true} style={style} onClick={this.dlt.bind(this,ind)} />

               
              </li>

            </div>
          )





        })}

        </div>






      </div>
    )
  }
}
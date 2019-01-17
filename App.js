
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { AppRegistry, TextInput } from 'react-native';

//CustomComps
import TaskItem from "./components/Task/TaskItem";


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskName: "",
      tasks: [
        {
          'taskType':'quit',
          'taskName':"Task1",
          'startDate':'01.06.2018',
          'breakDate':null
        },
        {
          'taskType':'started',
          'taskName':'Task2',
          'startDate':'01.06.2018',
          'breakDate':null
        },
        {
          'taskType':'quit',
          'taskName':'Task3',
          'startDate':'01.06.2018',
          'breakDate':"'01.01.2019'"
        }
      ]
    };
  }

  onPressHandler = (taskType) => {

    if(this.state.taskName.trim() === ""){return;}
    let taskName = this.state.taskName;
    
    task = {
      'taskType': taskType,
      'taskName': taskName,
      'startDate': Date.now().toString(),
      'breakDate': null
    };

    this.setState(prevState => {

      return {
        tasks: prevState.tasks.concat(task)
      };

    });

    alert(task.taskType + " " + task.taskName + " Task Created!");
  }

  onDeleteHandler = (key) => {
    let newTasks = this.state.tasks;
    newTasks[key].breakDate = Date.now().toString();
    this.setState({tasks: newTasks});
    alert("Task cancelled");
  }

  render() {
    const liveTaskOutput = this.state.tasks.map((task, key) =>(!task.breakDate) && (
      <TaskItem 
      task={task} 
      key={key} 
      taskKey={key}
      onDelete={() => this.onDeleteHandler(key)}
      />
    ));

    
    const deadTaskOutput = this.state.tasks.map((task, key) =>(task.breakDate) && (
      <TaskItem 
      task={task} 
      key={key} 
      taskKey={key}
      onDelete={() => this.onDeleteHandler(key)}
      />
    ));

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>Welcome to the CheckToday!</Text>
          <Text style={styles.instruction}> This is a behaivour control application. Create a daily task from below! You can start by typing your tasks name to the 'Smoking' placeholder</Text>
        </View>
        <View style={styles.row}>
          <TextInput 
          placeholder='Smoking'
          onChangeText={(text) => this.setState({taskName: text})}
          ></TextInput>
          <Text> is the thing i </Text>
          <Button color="lightgreen" title="Quit" onPress={() => this.onPressHandler("quit")}/>
          <Button title="Started" onPress={() => this.onPressHandler("started")}/>
          <Text> from today!</Text>
        </View>
        <Text style={styles.welcome}>Your Recent Tasks</Text>  
        <View style={styles.container}>
          {liveTaskOutput}
        </View>
        <Text style={styles.welcome}>Your Cancelled Tasks</Text>  
        <View style={styles.container}>
          {deadTaskOutput}
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
    top: 0,
    margin: 5,
    padding: 15
  },
  instruction:{
    margin: 25
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    margin: 15,
    padding: 5,
    borderColor: 'lightgreen'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  success: {
    color: 'green'
  },
  danger: {
    color: 'red'
  }
});


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { AppRegistry, TextInput } from 'react-native';



export default class App extends Component {
  state = {
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

  addTaskToState = (taskName, taskType) => {
    task = {
      'taskType':taskType,
      'taskName':taskName,
      'startDate':Date.now(),
      'breakDate':null
    };
    state += task;

  };

  onChangeHandler = (event) => {
    this.state.taskName = event;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>Welcome to the CheckToday!</Text>
          <Text style={styles.instruction}> This is a behaivour control application. Create a daily task from below! You can start by typing your tasks name to the 'Smoking' placeholder</Text>
        </View>
        <View style={styles.row}>
          <TextInput 
          placeholder='Smoking'
          onChangeText={this.onChangeHandler}
          ></TextInput>
          <Text> is the thing i </Text>
          <Button color="lightgreen" title="Quit" />
          <Button colro="lightblue" title="Started" />
          <Text> from today!</Text>
        </View>
        <Text style={styles.welcome}>Your Recent Tasks</Text>        
        {
          this.state.tasks.map(
            function(task){
              if(task.breakDate == null){
                return(<Text style={styles.success}>I {task.taskType} {task.taskName} at {task.startDate} and did not break it untill now!! </Text>);
              }else{
                return(<Text style={styles.danger}>I {task.taskType} {task.taskName} at {task.startDate} and stopped at {task.breakDate} </Text>);
              }
            }
          )
        }
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
    top: 0
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

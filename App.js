
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native';
import { AppRegistry, TextInput } from 'react-native';



export default class App extends Component {
constructor(props){
  super(props);
  this.state = [
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
  ];
};
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Your Recent Tasks</Text>
        {
          this.state.map(
            function(task){
              if(task.breakDate == null){
                return(<Text style={styles.success}>I {task.taskType} {task.taskName} at {task.startDate} and did not break it untill now!! </Text>);
              }else{
                return(<Text style={styles.danger}>I {task.taskType} {task.taskName} at {task.startDate} and stopped at {task.breakDate} </Text>);
              }
            }
          )
        }
        <Text style={styles.welcome}>Create New Task!</Text>
        <View>
          <TextInput placeholder='Smoking'></TextInput>
          <Text> is the thing i </Text>
          <Button color="lightgreen" title="Quit" />
          <Button colro="lightblue" title="Started" />
          <Text> from today!</Text>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    top: 0
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

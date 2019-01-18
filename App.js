
import React, {Component} from 'react';
//React Visual Comps
import { Text, View, Button } from 'react-native';
//React Others
import { Platform, StyleSheet, AppRegistry, TextInput, AsyncStorage } from 'react-native';

//CustomComps
import TaskItem from "./components/Task/TaskItem";


export default class App extends Component {
  constructor(props){

    super(props);
    this.state = {
      taskName: "",
      tasks: []
   
    };  

    this.firstOpeningControl();

  }


  firstOpeningControl = async () => {
    try {
      let userName = await AsyncStorage.getItem('userName');
      if (userName != null) {
        this.setState({isFirst: false});
        this.setState({userName: userName});
      }else{
        this.setState({isFirst: true});
      }
    } catch (error) {
     alert('An error occured reading data. '+ error.toString()); 
    }
  }

  saveTasks = async () => {
    try {
      let stringTasks = JSON.stringify(this.state.tasks);
      alert(stringTasks);
      await AsyncStorage.setItem('tasks', stringTasks);

    } catch (error) {
      alert("An error occured during the save. Here it is: " + error.toString());
    }
  }

  loadTasks = async() => {
    try {

      let tasksToLoad = null;
      await AsyncStorage.getItem('tasks', (error, item) => {tasksToLoad = item});
      tasksToLoad = JSON.parse(tasksToLoad);

      this.setState({tasks: tasksToLoad});

    } catch (error) {
      alert("An error occured during the load. Here it is: " + error.toString());   
    }
  }

  onPressHandler = (taskType) => {

    if(this.state.taskName.trim() === ""){return;}
    let taskName = this.state.taskName;
    
    task = {
      'taskType': taskType,
      'taskName': taskName,
      'startDate': Date.now(),
      'breakDate': null
    };

    this.setState(prevState => {

      return {
        tasks: prevState.tasks.concat(task)
      };

    });

    //this.saveTasks();

    alert(task.taskType + " " + task.taskName + " Task Created!");

  }

  onDeleteHandler = (key) => {
    let newTasks = this.state.tasks;
    newTasks[key].breakDate = Date.now().toString();
    this.setState({tasks: newTasks});

    //this.saveTasks();
    alert("Task cancelled");
  }

  submitName = async () =>{
    this.setState({ isFirst: false });
    try {
      await AsyncStorage.setItem('userName', this.state.userName);  
    } catch (error) {
      alert(error.toString());
    }

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

    const nameInput = ((this.state.isFirst) && (
      <View style={styles.container}>
        <Text>Welcome to the app, {this.state.userName}</Text>
        <TextInput placeholder="Your Name" onChangeText={(text) => {this.setState({userName: text});}} />
        <Button title="is my name" onPress={this.submitName}  />
      </View>
    ) || (
      <View style={styles.container}>
        <Text>Welcome to the app, {this.state.userName}</Text>
        <Button title="this is not me" onPress={() => {this.setState({isFirst: true});}}  />
      </View>
    ) );

    return (
      <View style={styles.container}>
        <View>
          {nameInput}
          <Text style={styles.instruction}> This is a behaivour control application. Create a daily task from below! You can start by typing your tasks name to the 'Smoking' placeholder</Text>
        </View>
        <View style={styles.row}>
          <Button title="Reload" />
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


import React, {Component} from 'react';
//React Visual Comps
import { Text, View, Button, ScrollView } from 'react-native';
//React Others
import { Platform, StyleSheet, AppRegistry, TextInput, AsyncStorage } from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
//CustomComps
import TaskItem from "./components/Task/TaskItem";
import TaskDetail from "./components/Task/TaskDetail";


export default class App extends Component {
  constructor(props){

    super(props);
    this.state = {
      taskName: "",
      tasks: {
        taskObjects: []
      },
      selectedTask: null,
      selectedTaskKey: null,
      modalVisible: false
    };  

    this.firstOpeningControl();
    this.loadTasks();

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
    let tasksToSave = this.state.tasks;
    tasksToSave = JSON.stringify(tasksToSave);

    try {
      await AsyncStorage.setItem('tasks', tasksToSave);
    } catch (error) {
      alert("Error during the save: " + error.toString());
    }
  }

  loadTasks = async() => {
    try {
      let loadedTasks = await AsyncStorage.getItem('tasks');
      if (loadedTasks != null) {
        //Replace old Tasks object with new 
        loadedTasks = JSON.parse(loadedTasks);
        this.setState({tasks: loadedTasks});
      }else{
        //Things to do if no tasks
      }
    } catch (error) {
     alert('An error occured reading data. '+ error.toString()); 
    }
  }

  onPressHandler = (taskType) => {

    //Control if empty
    if(this.state.taskName.trim() === ""){return;}

    //Get typed task name
    let taskName = this.state.taskName;
    
    let task = {
      'taskType': taskType,
      'taskName': taskName,
      'startDate': Date.now(),
      'breakDate': null
    };
    //Get current tasks
    let newTasks = this.state.tasks;

    //Add the new task to array
    newTasks.taskObjects.push(task);

    //Replace old Tasks object with new 
    this.setState({tasks: newTasks});

    //Save tasks to localStorage
    this.saveTasks();

    alert(task.taskType + " " + task.taskName + " Task Created!");

  }

  onItemPressed = (key) => {
    this.setState({selectedTask: this.state.tasks.taskObjects[key]});
    this.setState({selectedTaskKey: key});
    this.setState({modalVisible: true})
  }

  //This probably will be excluded
  submitName = async () =>{
    this.setState({ isFirst: false });
    try {
      await AsyncStorage.setItem('userName', this.state.userName);  
    } catch (error) {
      alert(error.toString());
    }
  }

  //This also is a test method, will keep in for tets purposes
  addTask = () => {
    
    let task = {
      'taskType': "taskType",
      'taskName': "taskName",
      'startDate': Date.now(),
      'breakDate': null
    };

    alert(JSON.stringify(this.state.tasks));

    let newTasks = this.state.tasks;
    newTasks.taskObjects.push(task);

    this.setState({tasks: newTasks});

    alert(JSON.stringify(this.state.tasks));

  }

  closeModal = () => { 
    this.setState({modalVisible: false});
    this.setState({selectedTask: null});
    this.setState({selectedTaskKey: null});
  }

  cancelTask = (key) => {
    let newTasks = this.state.tasks;
    newTasks.taskObjects[key].breakDate = Date.now().toString();
    this.setState({tasks: newTasks});

    this.saveTasks();
    this.closeModal();
  }

  deleteTask = (key) => {
    let newTasks = this.state.tasks;
    newTasks.taskObjects.splice(key);
    this.setState({tasks: newTasks});

    this.saveTasks();
    this.closeModal();
  }

  render() {
    const liveTaskOutput = this.state.tasks.taskObjects.map((task, key) =>(!task.breakDate) && (
      <TaskItem 
      task={task} 
      key={key} 
      taskKey={key}
      onDelete={() => this.onDeleteHandler(key)}
      onItemPressed={() => this.onItemPressed(key)}
      />
    ));

    const deadTaskOutput = this.state.tasks.taskObjects.map((task, key) =>(task.breakDate) && (
      <TaskItem 
      task={task} 
      key={key} 
      taskKey={key}
      onDelete={() => this.onDeleteHandler(key)}
      onItemPressed={() => this.onItemPressed(key)}
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
        <View style={styles.row}>
          <Text style={{margin: 5}}>Welcome to the app, {this.state.userName}</Text>
          <Button title="x" onPress={() => {this.setState({isFirst: true});}} />
        </View>
      </View>
    ) );

    return (
      <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center',
      justifyContent: 'space-between'}}>
        <TaskDetail 
          task = {this.state.selectedTask} 
          taskKey = {this.selectedTaskKey} 
          modalVisible = {this.state.modalVisible}
          closeModal = {this.closeModal}
          onCancel = {() => this.cancelTask(this.state.selectedTaskKey)}
          onDelete = {() => this.deleteTask(this.state.selectedTaskKey)}
          />
        <View>
          {nameInput}
          <Text style={styles.instruction}> <FontAwesome style={{fontSize:50}}>{Icons.instagram}</FontAwesome>This is a behaivour control application. Create a daily task from below! You can start by typing your tasks name to the 'Smoking' placeholder</Text>
        </View>
        <View style={styles.row}>
          <Button title="Add Task" onPress={this.addTask} />
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
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
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

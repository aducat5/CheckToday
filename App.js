
import React, {Component} from 'react';
//React Visual Comps
import { Text, View, Button, ScrollView } from 'react-native';
//React Others
import { Platform, StyleSheet, AppRegistry, TextInput, AsyncStorage } from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import { Icon } from "react-native-elements";

//CustomComps
import TaskItem from "./src/components/Task/TaskItem";
import TaskDetail from "./src/components/Task/TaskDetail";


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

  //start functionsForReduxDispatch
    //set state funx
    setIsFirst = (value) => {this.setState({isFirst: value});};
    setUserName = (value) => {this.setState({userName: value});};
    setTasks = (value) => {this.setState({tasks: value});};
    setSelectedTask = (value) => {this.setState({selectedTask: this.getTasks().taskObjects[value]});};
    setSelectedTaskKey = (value) => {this.setState({selectedTaskKey: value});};
    setModalVisible = (value) => {this.setState({modalVisible: value});};
    setTaskName = (value) => {this.setState({taskName: value});};

    //get state funx
    getTasks = () => {return this.state.tasks;};
    getWrittenTaskName = () => {return this.state.taskName;};
    getIsFirst = () => {return this.state.isFirst};
    getUserName = () => {return this.state.userName};
    getSelectedTask = () => {return this.state.selectedTask}
    getSelectedTaskKey = () => {return this.state.selectedTaskKey};
    getModalVisible = () => {return this.state.modalVisible};

  //end funcitonsForReduxDispatch

  
  firstOpeningControl = async () => {
    try {
      let userName = await AsyncStorage.getItem('userName');
      if (userName != null) {
        this.setIsFirst(false);
        this.setUserName(userName);
      }else{
        this.setIsFirst(true);
      }
    } catch (error) {
     alert('An error occured reading data. '+ error.toString()); 
    }
  }

  saveTasks = async () => {
    let tasksToSave = this.getTasks();
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
        this.setTasks(loadedTasks);
      }else{
        //Things to do if no tasks
      }
    } catch (error) {
     alert('An error occured reading data. '+ error.toString()); 
    }
  }

  addTask = (taskType) => {

    //Control if empty
    if(this.getWrittenTaskName().trim() === ""){return;}

    //Get typed task name
    let taskName = this.getWrittenTaskName().trim();
    
    let task = {
      'taskType': taskType,
      'taskName': taskName,
      'startDate': Date.now(),
      'breakDate': null
    };

    //Get current tasks
    let newTasks = this.getTasks();

    //Add the new task to array
    newTasks.taskObjects.push(task);

    //Replace old Tasks object with new 
    this.setTasks(newTasks);

    //Save tasks to localStorage
    this.saveTasks();

    alert(task.taskType + " " + task.taskName + " Task Created!");

  }

  onItemPressed = (key) => {
    this.setSelectedTask(key);
    this.setSelectedTaskKey(key);
    this.setModalVisible(true);
  }

  //This probably will be excluded
  submitName = async () =>{
    this.setIsFirst(false);
    try {
      await AsyncStorage.setItem('userName', this.state.userName);  
    } catch (error) {
      alert(error.toString());
    }
  }

  //This also is a test method, will keep in for tets purposes
  testMethod = () => {
    
    let task = {
      'taskType': "taskType",
      'taskName': "taskName",
      'startDate': Date.now(),
      'breakDate': null
    };

    let newTasks = this.getTasks();
    newTasks.taskObjects.push(task);

    this.setTasks(newTasks);
  }

  closeModal = () => { 
    this.setModalVisible(false);
    this.setSelectedTask(null);
    this.setSelectedTaskKey(null);
  }

  cancelTask = (key) => {
    let newTasks = this.getTasks();
    newTasks.taskObjects[key].breakDate = Date.now().toString();
    this.setTasks(newTasks);

    this.saveTasks();
    this.closeModal();
  }

  deleteTask = (key) => {
    let newTasks = this.getTasks();
    newTasks.taskObjects.splice(key);
    this.setTasks(newTasks);

    this.saveTasks();
    this.closeModal();
  }

  render() {
    const liveTaskOutput = this.getTasks().taskObjects.map((task, key) =>(!task.breakDate) && (
      <TaskItem 
      task={task} 
      key={key} 
      taskKey={key}
      onDelete={() => this.onDeleteHandler(key)}
      onItemPressed={() => this.onItemPressed(key)}
      />
    ));

    const deadTaskOutput = this.getTasks().taskObjects.map((task, key) =>(task.breakDate) && (
      <TaskItem 
      task={task} 
      key={key} 
      taskKey={key}
      onDelete={() => this.onDeleteHandler(key)}
      onItemPressed={() => this.onItemPressed(key)}
      />
    ));

    const nameInput = ((this.getIsFirst()) && (
      <View style={styles.container}>
        <Text>Welcome to the app, {this.getuse}</Text>
        <TextInput placeholder="Your Name" onChangeText={(text) => {this.setUserName(text);}} />
        <Button title="is my name" onPress={this.submitName}  />
      </View>
    ) || (
      <View style={{flexDirection:'row', alignContent:'space-around', alignItems:'center' }}>
        <Button title="x" onPress={() => {this.setIsFirst(true);}} />
        <Text style={{margin: 5}}>Welcome to the app, {this.getUserName()}</Text>
      </View>
    ) );

    return (
      <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center',
      justifyContent: 'space-between'}}>
        <TaskDetail 
          task = {this.getSelectedTask()} 
          taskKey = {this.getSelectedTaskKey()} 
          modalVisible = {this.getModalVisible()}
          closeModal = {this.closeModal}
          onCancel = {() => this.cancelTask(this.getSelectedTaskKey())}
          onDelete = {() => this.deleteTask(this.getSelectedTaskKey())}
          />
        <View>
          <View style={styles.nameRow} >{nameInput}</View>
          <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:35, alignSelf:'center'}} >
            <Icon name='info' size={80} color='#2E90FF'/>
            <Text>This is a behaivour control application. Create a daily task from below! You can start by typing your tasks name to the 'Smoking' placeholder</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TextInput 
          placeholder='Smoking'
          onChangeText={(text) => this.setTaskName(text)}
          ></TextInput>
          <Text> is the thing i </Text>
          <Button color="lightgreen" title="Quit" onPress={() => this.addTask("quit")}/>
          <Button title="Started" onPress={() => this.addTask("started")}/>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    margin: 15,
    padding: 5,
    borderColor: 'lightgreen'
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    marginLeft: 35,
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

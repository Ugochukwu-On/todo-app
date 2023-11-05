import React, { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import {useCookies} from 'react-cookie'
const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userId = cookies.Email;
  const authToken = cookies.authToken
  const [tasks, setTasks] = useState(null);



  const getData = async () => {
        try {
      const response = await fetch(`http://localhost:3001/todos/get-todo/${userId}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken){
      getData();
    }
  }, []); // The empty dependency array ensures the effect runs once when the component mounts

  // sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken &&<Auth/>}
      {authToken &&
      <>
      <ListHeader listName={'🎄Holiday tick list'} getData={getData} />
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>}
    </div>
  );
};

export default App;

import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  // URL VARIABLE
  const url = "https://dogssshank.herokuapp.com";
  // LIST OF DOGS STATE
  const [dogs, setDogs] = React.useState([]);

  //EMPTY DOG
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }

  //Selected dog state
  const [selectedDog, setSelectedDog] = React.useState(emptyDog)


  // GET LIST OF DOGS FUNCTION
const getDogs = () => {
  fetch(url + "/dog/")
    .then((response) => response.json())
    .then((data) => {
      setDogs(data);
    });
  };
  //useEffect to do initial fetch of dogs
  React.useEffect(() => {
    getDogs()
  }, []);

  //hanldeCreate function for creating new dogs
  const handleCreate = (newDog) => {
    fetch(url + "/dog", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDog),
    }).then(() => {
      getDogs()
    })
  }

 //pass state to function(prop) 
const selectDog = (dog) => {
  setSelectedDog(dog)
}

//function for when dog is update
const handleUpdate = (dog) => {
  fetch(url + "/dog/" + dog._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dog)
  })
  .then(() => {
    getDogs()
  })
}

//Delete a dog
const deleteDog = (dog) => {
  fetch(url + "/dog/" + dog._id, {
    method: "delete",
  }).then(() => {
    // don't need the response from the post but will be using the .then to update the list of dogs
    getDogs();
  });
};

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <Link to="/create">
        <button>Add Dog</button>
      </Link>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} 
          dogs={dogs} 
          selectDog={selectDog}
          deleteDog={deleteDog}/>} 
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;

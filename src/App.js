import React, { Component } from "react";
import $ from "jquery";
import "./App.css";
import "./scss/main.scss";

// function App() {
//   return null;
// return (
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
// );
// }

// export default App;

function SideBar(props) {
  return (
    <div className="side-bar">
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      <label> I have a bike</label>
      <br />
      <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
      <label> I have a car</label>
      <br />
      <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
      <label> I have a boat</label>
      <br />
    </div>
  );
}

function ViewPost(props) {
  return (
    <div className="post-detail">
      <h1>{props.userName}</h1>
      <p>{props.message}</p>
      <img src={props.image} alt="description" />
    </div>
  );
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      photos: []
    };
  }

  componentDidMount() {
    // chamado depois da primeira reenderização
    console.log("DidMount");
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users",
      dataType: "json",
      success: function(resposta) {
        console.log("chamou a resposta");
        console.log(resposta);
        // this.setState({ users: resposta.map(user => user.id) });
        this.setState({ users: resposta.map(user => user) });
        console.log("estado");
        console.log(this.state);
      }.bind(this)
    });

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/photos",
      dataType: "json",
      success: function(resposta) {
        console.log("chamou a imagens");
        console.log(resposta);
        console.log(resposta[0].url);
        // this.setState({ users: resposta.map(user => user.id) });
        this.setState({ photos: resposta.map(({ url }) => url) });
        console.log({ photos: resposta.map(({ url }) => url) });
        console.log("estado");
        console.log(this.state.photos[0].url);
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="main-screen">
        <SideBar />
        <div className="post-view">
          {this.state.users.map(user => {
            return (
              <ViewPost
                key={user.id}
                userName={user.name}
                message={user.email}
                image={this.state.photos[user.id]}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;

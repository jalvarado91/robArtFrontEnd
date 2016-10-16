import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      currentImage: null,
      theImageUrl: '',
      description: null,
      title: null,
      category: null,
      mainColor: null
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var url = this.state.theImageUrl;

    var formData = new URLSearchParams();
    formData.set('img', url);
    var descPromise = fetch('http://localhost:3000/analyze' , {
      method: "POST",
      body: formData
    }).then((response) => {
      return response.json();
    });

    descPromise.then((json) => {
      console.log(json);
      const { critique, data } = json;
      this.setState({
        currentImage: this.state.theImageUrl,
        description: critique.sentence + ". \n " +data.colors.expression.sentence,
        title: critique.title,
        theImageUrl: '',
        category: data.category.name,
        mainColor: data.colors.colors[0].hex
      });
    });
  }

  onUrlChange(e) {
    var val = e.target.value;
    this.setState({
      theImageUrl: val
    });
  }

  render() {
    return (
      <div className="App">
        <img src={this.state.currentImage || ""} className="theImage" />
        <div className="bottomContainer" style={{"borderTop": "6px solid " + this.state.mainColor}}>
          <div className="logo-form">
            <h1>ROB <br/> ART.</h1>
            <div className="form">
              <form onSubmit={this.onSubmit}>
                <input type="text" value={this.state.theImageUrl} onChange={this.onUrlChange} placeholder="Url"/>
                <button type="submit">Baggette</button>
              </form>
            </div>
          </div>
          <div className="description-card">
            <h3>{this.state.title || ""}</h3>
            <small>{this.state.category || ""}</small>
            <p>
              {this.state.description || ""}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

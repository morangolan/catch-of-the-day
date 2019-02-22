import React from "react";
import Header from "./Header";
import Order from "./Order";
import Fish from "./Fish";
import Inventory from "./Inventory";
import base from "../base";
import sampleFishes from "../sample-fishes";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match; //this.props.match.params stores data on the url - the store Named
    //We update the order state via the local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    //We update the fish state via Fire Base
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    }); //check the DB stracture on firebase
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  } //clean base memory every time we're leaving the app to change store

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId, //key
      JSON.stringify(this.state.order) //value
    )
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
  	// 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Update the updated fish
    fishes[key] = updatedFish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
  	// 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Delete the requested fish
    fishes[key] = null;
    // 3. Set the new fishes object to state
    this.setState({ fishes });  	
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder = (key) => {
    // 1. take a copy of state:
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] +1 || 1;
    // 3. call setState to update our state object
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            { Object.keys(this.state.fishes).map(key =>
              <Fish key={key} index={key} fish={ this.state.fishes[key] } addToOrder={this.addToOrder} />) }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory 
        	addFish={this.addFish}
        	updateFish={this.updateFish}
        	deleteFish={this.deleteFish}
        	loadSampleFishes={this.loadSampleFishes} 
        	fishes={this.state.fishes} />
      </div>
    );
  }
}

export default App;

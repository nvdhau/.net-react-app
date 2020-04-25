import React from 'react';
import { connect } from 'react-redux';
import {
  getAllTrips,
} from './thunks';
import { getAllTripsInProgress } from './actions';


class Trips extends React.Component
{
  constructor(props) {
    super(props);

    // this.state = {
    //   trips: {
    //     data: [],
    //     loading: true,
    //   }
    // }
  }

  componentDidMount(){
    // this.populateTripsData();
    this.props.getAllTrips();
  }

  async populateTripsData(){
    try{
      let reponse = await fetch("api/Trips/GetTrips");
      const trips = await reponse.json();
  
      this.setState({trips, loading: false});
    }catch(error){
      console.log(error);
    };
    
  }

  onEditButtonClick = (e) => {
    e.preventDefault();

    const {history} = this.props;

    history.push(`update/${e.target.value}`);
  }

  onDeleteButtonClick = (e) => {
    e.preventDefault();

    const {history} = this.props;

    history.push(`delete/${e.target.value}`);
  }

  renderAllTripsTable(trips){
    return (
      <table className="table table-striped">
        <thead>
          <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Date started</th>
          <th>Date completed</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            trips.map(trip => (
              <tr key={trip.id}>
                <td>{trip.name}</td>
                <td>{trip.description}</td>
                <td>{new Date(trip.dateStarted).toLocaleDateString()}</td>
                <td>{trip.dateCompleted ?
                new Date(trip.dateCompleted).toLocaleDateString()
                : '-'}</td>
                <td>
                  <button 
                  className="btn btn-primary"
                  value={trip.id}
                  onClick={this.onEditButtonClick}
                  >
                    Edit
                  </button>
                  <button 
                  className="btn btn-danger"
                  value={trip.id}
                  onClick={this.onDeleteButtonClick}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  render() {

    console.log("PROPS", this.props)

    let content = this.props.trips.loading 
    ? (
      <em>Loading...</em>
    )
    : (
      this.renderAllTripsTable(this.props.trips.data)
    );

    return (
      <div>
        <h1>All trips</h1>
        <p>Here you can see all trips</p>
        {content}
      </div>
    );
  }
}

// may need 2 functions to pass to connect
const mapStateToProps = state => ({ // the state is the entire Redux state
  // but only need "todos"
  // todos: state.todos, // => the new Component has "todos" as props
  // isLoading: state.isLoading,
  trips: state.trips,
});

// trigger Redux action
const mapDispatchToProps = dispatch => ({
  getAllTrips: () => dispatch(getAllTrips()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trips);


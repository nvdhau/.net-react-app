import React from 'react';

export class Trips extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      loading: true,
    }
  }

  componentDidMount(){
    this.populateTripsData();
  }

  async populateTripsData(){
    let reponse = await fetch("api/Trips/GetTrips");
    const trips = await reponse.json();

    this.setState({trips, loading: false});
  }

  onEditButtonClick = (e) => {
    e.preventDefault();

    const {history} = this.props;

    console.log(e.target.value);

    history.push(`update/${e.target.value}`);
  }

  onDeleteButtonClick = (e) => {
    e.preventDefault();

    console.log(e.target.value);
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

    let content = this.state.loading 
    ? (
      <em>Loading...</em>
    )
    : (
      this.renderAllTripsTable(this.state.trips)
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
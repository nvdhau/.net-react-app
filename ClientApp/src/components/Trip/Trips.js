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
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>-</td>
          </tr>
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
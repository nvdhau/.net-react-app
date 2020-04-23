import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to trips manager!</h1>
        <p>Use this one for manage your trips</p>
        <ul>
          <li>Add a new trip</li>
          <li>Update a trip</li>
          <li>Delete a trip</li>
          <li>View all trips</li>
        </ul>
      </div>
    );
  }
}

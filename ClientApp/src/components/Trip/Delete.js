import React, { Component } from 'react';

export class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      Id: null,
      name: '',
      description: '',
      dateStarted: null,
      dateCompleted: null,
    }
  }

  componentDidMount() {
    // get id from URL, React Router pass the prop match to all child
    const { match } = this.props;
    const { id } = match.params;

    fetch(`api/trips/singletrip/${id}`)
      .then(res => res.json())
      .then(trip => {
        console.log(trip);

        this.setState({
          Id: trip.id,
          name: trip.name,
          description: trip.description,
          dateStarted: trip.dateStarted? new Date(trip.dateStarted).toISOString().slice(0,10) : null,
          dateCompleted: trip.dateCompleted? new Date(trip.dateCompleted).toISOString().slice(0,10) : null,
        });
      });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const {history} = this.props;

    let response = await fetch(`api/trips/DeleteTrip/${this.state.Id}`,{
      method: 'delete'
    });
    // let trip = await response.json();

    history.push('/trips');
  }

  onCancel = () => {
    const {history} = this.props;

    history.push('/trips');
  }

  render() { 
    return ( 
      <div style={{ marginTop: 10 }} >
        <h2>Delete trip confirmation</h2>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{this.state.name}</h4>
            <p className="card-text">{this.state.description}</p>
            <button 
            className="btn btn-secondary"
            onClick={this.onCancel}
            >
              Cancel
            </button>
            <button 
            type="submit"
            className="btn btn-danger"
            onClick={this.onSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';

export class Update extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      Id: null,
      name: '',
      description: '',
      dateStarted: null,
      dateCompleted: null,
    }

    this.onChangeName = this.onChangeName.bind(this);
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

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value
    });
  };

  onChangeDateStarted = (e) => {
    this.setState({
      dateStarted: e.target.value
    });
  };

  onChangeDateCompleted = (e) => {
    this.setState({
      dateCompleted: e.target.value
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const {history} = this.props;

    let tripObj = {
      Id: this.state.Id,
      name: this.state.name,
      description: this.state.description,
      dateStarted: this.state.dateStarted === ''? null : this.state.dateStarted,
      dateCompleted: this.state.dateCompleted === ''? null : this.state.dateCompleted,
    }

    let response = await fetch(`api/trips/UpdateTrip/${this.state.Id}`,{
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'put',
      body: JSON.stringify(tripObj)
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
      <div className="trip-form" >
        <h3>Edit trip</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Trip name:  </label>
                <input 
                  type="text" 
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  />
            </div>
            <div className="form-group">
                <label>Trip description: </label>
                <textarea
                  type="text" 
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
            </div>
            <div className="row">
                <div className="col col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                        <label>Date of start:  </label>
                        <input 
                          type="date" 
                          className="form-control"
                          value={this.state.dateStarted}
                          onChange={this.onChangeDateStarted}
                        />
                    </div>
                </div>
                <div className="col col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label>Date of completion:  </label>
                    <input 
                        type="date" 
                        className="form-control"
                        value={this.state.dateCompleted}
                        onChange={this.onChangeDateCompleted}
                    />
                    </div>
                </div>
            </div>
            
            <div className="form-group">
                <button 
                className="btn btn-danger"
                onSubmit={this.onCancel}
                >
                  Cancel
                </button>
                <button 
                type="submit"
                className="btn btn-success"
                onSubmit={this.onSubmit}
                >
                  Update
                </button>
            </div>
        </form>
      </div>
    );
  }
}
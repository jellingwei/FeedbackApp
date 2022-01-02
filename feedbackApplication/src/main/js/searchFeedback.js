const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class SearchFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      attributes: ['agency', 'contact', 'description', 'email', 'name', 'status'],
      noSearchResult: false,
      showLoader: false,
      errors: {}
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  loadFromServer(contact,email) {
  		client({
              method: 'GET',
              path: "http://localhost:8080/feedbacks?email=" + email + "&contact=" + contact,
              headers: {
                  'Content-Type': 'application/json',
              }
          }).then(response => {
            const entities = response.entity;
            this.setState({feedbacks: entities});
            if (entities.length === 0) {
                this.setState( {noSearchResult: true});
            }
          }, response => {

          }).done(response =>{
            this.setState( {showLoader: false});
          } );
  	}

  	onSearch(contact,email) {
  		if (contact !== this.state.contact &&
  		    email !== this.state.email) {
  		    this.setState( {showLoader: true});
  			this.loadFromServer(contact,email);
  		}
  	}

  handleSearch(e) {
    e.preventDefault();
    this.setState( {noSearchResult: false});
    const contact = ReactDOM.findDOMNode(this.refs.contact_search).value;
    const email = ReactDOM.findDOMNode(this.refs.email_search).value;
    if (/^[0-9]+$/.test(contact)) {
        this.onSearch(contact,email);
    } else {
    }
  }

  render() {
    const results = this.state.feedbacks.map(feedback =>
        <Feedback feedback={feedback}
                  attributes={this.props.attributes}/>
    );

    return (
      <div class = "sm-12 md-8 col">
       <div class = "paper">
        <ul class="breadcrumb border">
        <li><a href="http://localhost:8080/"> Main Page </a></li>
        <li>Search Feedback</li>
        </ul>
        <h2>Search feedback</h2>
        { this.state.noSearchResult ? <div class="alert alert-primary"> No result found</div> : null }
        <form onSubmit={this.handleSearch}>
            <label>
                Contact:
                <input ref="contact_search" defaultValue={this.props.contact} required/>
              </label>
              <br />
              <label>
                Email:
                <input ref="email_search" defaultValue={this.props.email} required/>
              </label>
              <br />
              <button>Search</button>
              { this.state.showLoader ? <div class="loader"></div> : null }
        </form>
        <br />
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Agency</th>
                    <th>Feedback</th>
                    <th>Status</th>
                </tr>
                {results}
            </tbody>
        </table>
    </div></div>
    )
  }
}

class Feedback extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>
				<td>{this.props.feedback.name}</td>
				<td>{this.props.feedback.email}</td>
				<td>{this.props.feedback.contact}</td>
				<td>{this.props.feedback.agency}</td>
				<td>{this.props.feedback.description}</td>
				<td>{this.props.feedback.status}</td>
			</tr>
		)
	}
}

module.exports = SearchFeedback;
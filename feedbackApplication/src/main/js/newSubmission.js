const React = require('react');
const { Redirect } = require('react-router');
const client = require('./client');

class NewSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      contact: '',
      agency: '',
      description: '',
      attributes: ['agency', 'contact', 'description', 'email', 'name'],
      submissionStatus: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  handleChange(key) {
    return function (e) {
      var state = {};
      this.setState({ submissionStatus: "" });
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    //Email
    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    //Contact Number
    if (typeof fields["contact"] !== "undefined") {
        if (fields["contact"].match(/[a-zA-Z]+/)) {
            formIsValid = false;
            errors["contact"] = "Only numbers";
        }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  onCreate(newFeedback) {
    client({
          method: 'POST',
          path: "http://localhost:8080/feedback",
          entity: newFeedback,
          headers: {
              'Content-Type': 'application/json',
          }
      }).then(response => {
        this.setState({ submissionStatus: "Feedback successfully submitted!" });
    }).done(response => {
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.handleValidation())
    {
        const newFeedback = {};
        newFeedback["name"] = this.state.name;
        newFeedback["email"] = this.state.email;
        newFeedback["contact"] = this.state.contact;
        newFeedback["agency"] = this.state.agency;
        newFeedback["description"] = this.state.description;
        this.onCreate(newFeedback);
        //window.location.href = '/';
    }
    else
    {
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class = "sm-12 md-8 col">
        <div class = "paper">
        <ul class="breadcrumb border">
        <li><a href="http://localhost:8080/"> Main Page </a></li>
        <li>Feedback Submission</li>
        </ul>
        <h2> Feedback Submission </h2>
        { this.state.submissionStatus !== ""? <div class="alert alert-success"><SubmissionStatus status={this.state.submissionStatus} /></div> : null}
        <label>
          Name:
          <input ref="name" type="text" value={this.state.name} onChange={this.handleChange('name')} />
        </label>
        <br />
        <label>
          Email*:
          <input ref="email" type="email" value={this.state.email} onChange={this.handleChange('email')} required/>
        </label>
        <span class="ErrorMsg">{this.state.errors["email"]}</span>
        <br />
        <label>
          Contact number*:
          <input ref="contact" type="text" value={this.state.contact} onChange={this.handleChange('contact')} required/>
        </label>
        <span class="ErrorMsg">{this.state.errors["contact"]}</span>
        <br />
        <label>
          Agency Name:
          <input ref="agency" type="text" value={this.state.agency} onChange={this.handleChange('agency')} />
        </label>
        <br />
        <label>
          Feedback*:
          <textarea ref="description" id = "large-input" type="text" value={this.state.description} onChange={this.handleChange('description')} required/>
        </label>
        <br />
        <button> Submit </button>
        </div></div>
      </form>
    );
  }
}

class SubmissionStatus extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<span>{this.props.status}</span>
		)
	}
}
module.exports = NewSubmission;

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const { Link, BrowserRouter, Route, Routes } = require('react-router-dom');
const NewSubmission = require('./newSubmission');
const SearchFeedback = require('./searchFeedback');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
		<div class = "sm-12 md-8 col">
          <div class = "paper">
              <h2> Feedback Application </h2>
              <Link to="/NewSubmission"><button> New Feedback </button></Link>
              <Link to="/SearchFeedback"><button> Search Feedback </button></Link>
          </div>
       </div>

		)
	}
}

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App/>} />
    <Route path="/NewSubmission" element={<NewSubmission/>} />
    <Route path="/SearchFeedback" element={<SearchFeedback/>} />
  </Routes>
  </BrowserRouter>,
	document.getElementById('react')
)

import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.handleSearch(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="searchBar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button className="searchFormButton" type="submit">
            <span className="searchFormButtonLabel">Search</span>
          </button>
          <input
            className="SearchForm-input"
            name="searchImg"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

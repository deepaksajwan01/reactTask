import React, { Component } from 'react'
import axios from 'axios';
import CharacterCard from './CharacterCard'
class Character extends Component {
  constructor(props) {
    super(props)
    this.state = {
      characters: [],
      search: '',
      names: [],
      currentItems: [],
      sortKey: "",
      sortDirection: "asc",
      searchResult: []
    }
  }

  componentDidMount() {
    console.log(this.state)
    axios.get("https://swapi.dev/api/people/")
      .then(response => {
        let names = response.data.results.map(item => {
          return item.name
        })
        console.log("names", names)
        this.setState({
          ...this.state,
          names: names,
          characters: response.data.results,
          currentItems: response.data.results
        })
      })
      .catch(err => {
        console.log(err);
      })
    console.log(this.state)
  }

  handleNameSubmit = (e) => {
    e.preventDefault()
    console.log("search here", this.state.search)
    axios.get(`https://swapi.dev/api/people/?search=${this.state.search}`)
      .then(response => {
        console.log(response.data.results);

        this.setState({
          ...this.state,
          searchResult: response.data.results,
          search: ""
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleDropDown = (e) => {
    if (e.target.value === "All") {
      console.log("all")
      this.setState({
        currentItems: this.state.characters
      })
    }
    else {
      let character = this.state.characters.filter((item) => {
        return item.name === e.target.value
      })
      this.setState({
        currentItems: character
      })
    }
  }

  requestSort = (key) => {
    const { sortDirection } = this.state;
    let sortedData = [...this.state.currentItems].sort((a, b) => {
      const valA = isNaN(Number(a[key])) ? a[key] : Number(a[key]);
      const valB = isNaN(Number(b[key])) ? b[key] : Number(b[key]);


      if (valA < valB) {
        return sortDirection === "asc" ? -1 : 1
      }
      if (valA > valB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    })
    this.setState({
      currentItems: sortedData,
      sortKey: key,
      sortDirection: sortDirection === "asc" ? "dsce" : "asc"
    })
  }

  render() {
    const { characters, currentItems, names, searchResult } = this.state

    return (
      <div>
        <div className="d-flex justify-content-between">
          <h2 className="font-weight-bold">StarWars</h2>
          <div className="d-flex align-items-baseline">
            <p className="d-flex-basis">Filter by Name:</p>
            <select class="form-control" onChange={(e) => this.handleDropDown(e)}>
              <option value="All">All</option>
              {
                names.map((item, index) =>
                  <option key={index}>{item}</option>
                )
              }
            </select>
          </div>
        </div>
        <table className="table table-striped table-bordered mt-3 rounded">
          <thead>
            <tr>
              <th className="sortable" onClick={() => this.requestSort('name')}>Name</th>
              <th className="sortable" onClick={() => this.requestSort('height')}>Height</th>
              <th className="sortable" onClick={() => this.requestSort('mass')}>Mass</th>
              <th className="sortable" onClick={() => this.requestSort('gender')}>Gender</th>
            </tr>
          </thead>
          <tbody>
            {
              currentItems.length > 0 && currentItems.map(row =>
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.height}</td>
                  <td>{row.mass}</td>
                  <td>{row.gender}</td>
                </tr>
              )
            }
          </tbody>
        </table>

        <form onSubmit={(e) => this.handleNameSubmit(e)}>
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="search" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} placeholder="Search by name" />
            <div className="input-group-append">
              <input className="btn btn-primary" value="Search" type="submit" />
            </div>
          </div>
        </form>
        <div className="row">
          {
            searchResult.length > 0 ? searchResult.map(item =>
              <CharacterCard data={item} />
            ) : null
          }
        </div>
      </div>
    );
  }
}


export default Character;

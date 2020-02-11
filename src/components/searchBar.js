import React from "react";
import axios from "axios";
import _ from "lodash";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: null,
      input: "",
      historyItems: []
    };
  }

  fetchCountry(input) {
    _.debounce(
      () =>
        axios
          .get(`https://restcountries-v1.p.rapidapi.com/name/${input}/`, {
            headers: {
              "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
              "x-rapidapi-key":
                "e7a13b1c84msh3be397133917e65p1f183ajsnd44bb511ccd5"
            }
          })
          .then(resposne => {
            this.setState({ countries: resposne.data });
          })
          .catch(err => this.setState({ countries: null })),
      600
    )();
  }

  optionsMapper() {
    if (this.state.countries !== null) {
      return this.state.countries.map(county => {
        return (
          <option
            onClick={() => this.registerHistory(county.name)}
            className="option"
          >
            {county.name}
          </option>
        );
      });
    } else return null;
  }

  registerHistory(countyName) {
    var existingItems = this.state.historyItems;
    var countryTimestampPair = {
      country: countyName,
      time: new Date().toLocaleString()
    };
    existingItems.push(countryTimestampPair);
    this.setState({ historyItems: existingItems });
  }

  historyMapper() {
    return this.state.historyItems.map(item => {
      return (
        <tr className="history_item">
          <td className="history_country">{item.country}</td>

          <td className="history_time">{item.time}</td>
          <td>
            <button
              className="history_remove"
              onClick={() => this.removeFromHistory(item.country)}
            >
              X
            </button>
          </td>
        </tr>
      );
    });
  }

  removeFromHistory(country) {
    var existingHistory = this.state.historyItems;
    var filteredItems = existingHistory.filter(function(ele) {
      return ele.country !== country;
    });
    this.setState({ historyItems: filteredItems });
  }

  render() {
    return (
      <div className="main">
        <input
          className="searchbar"
          type="text"
          value={this.state.input}
          onChange={e => {
            this.setState({ input: e.target.value });
            this.fetchCountry(e.target.value);
          }}
        />
        <div
          style={
            this.state.countries ? { display: "block" } : { display: "none" }
          }
          className="option_wrapper"
        >
          {this.optionsMapper()}
        </div>
        <div className="heading_wrapper">
          <h4>Recent searches</h4>
          <button onClick={() => this.setState({ historyItems: null })}>
            Clear search history
          </button>
        </div>
        {this.state.historyItems ? (
          <table className="history_wrapper">{this.historyMapper()}</table>
        ) : null}
      </div>
    );
  }
}

export default SearchBar;

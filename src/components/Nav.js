import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.setPage(event.target.name);
  }

  render() {
    const pages = this.props.pages;
    let Nav = [];
    pages.forEach( page => {
      if (page.name === this.props.currentPage.name) {
        Nav.push (
          <li className="click" key={page.name}>
            <a name={page.name} className="nav-link active "  onClick={this.onClick}>{page.text}</a>
          </li>
        );
      } else {
        Nav.push (
          <li className="click" key={page.name}>
            <a name={page.name} className="nav-link "  onClick={this.onClick}>{page.text}</a>
          </li>
        );
      }
    }
    );
    return <ul className="nav nav-pills flex-column sidebar">{Nav}</ul>;
  }
}

export default Nav
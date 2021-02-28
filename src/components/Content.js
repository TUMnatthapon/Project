import React, { Component } from 'react';
import '../App.css';
import ScrollArea from 'react-scrollbar'
import 'bootstrap/dist/css/bootstrap.css';
import Nav from './Nav'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'

class Content extends Component {
  constructor(props) {
    super(props);
    const PAGES = [
      {
        name: '0',
        text: 'Face Confirmation',
        component: <Page1 />
      },
      {
        name: '1',
        text: 'Stream Camera',
        component: <Page2 />
      },
      {
        name: '2',
        text: 'Add User',
        component: <Page3 />
      },
      {
        name: '3',
        text: 'Access Control',
        component: <Page4 />
      },
    ];

    this.state = { currentPage: PAGES[0], pages: PAGES };
    this.setPage = this.setPage.bind(this);
  }

  setPage(name) {
    const pages = this.state.pages.slice();
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].name === name) {
        this.setState({ currentPage: pages[i] });
      }
    }
  }

  render() {
    return (
      <div className="body1">
      <div className="body2">
        <div className="row">
          <div className="col-md-2 sidebar center white">
            <Nav setPage={this.setPage} currentPage={this.state.currentPage} pages={this.state.pages} />
            <a className="white" href="/">Logout</a>
          </div>
          <div className="col">
          <ScrollArea className="dis" >
            {this.state.currentPage.component}
          </ScrollArea>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Content
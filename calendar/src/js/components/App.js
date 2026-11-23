import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';
import Eventpage from './Eventpage';
import Infopage from './Infopage';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { DateTime } from "luxon";

class App extends Component {

  constructor(props) {
    super(props);

    // Detect language code from browser and set the state based on it

    this.state = {
      calendar: [],
      loaded: 'loading',
      attempts: 0,
      retries: 5,
      containerId: '',
      lang: 'en',
    }

    this.toggleLocalEvents = this.toggleLocalEvents.bind(this);
    this.toggleOnlineEvents = this.toggleOnlineEvents.bind(this);
    this.toggleCancelledEvents = this.toggleCancelledEvents.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
  }

  fetchretry = async ( url ) => {
    let error;
    let options = {};

    for (let i = 0; i < this.state.retries; i++) {

      this.setState({ loaded: 'loading' });
      this.setState({ attempts: i + 1 });

      if ( i > 0 ) {
        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');
    
        options = {
          method: 'GET',
          headers: myHeaders,
        };
      } else {
        options = {
          method: 'GET',
        };
      }
  
      try {
        
        let response = await fetch(url, options);
  
        if (response.status == 200) {
  
          let caljson = await response.json();
          this.storeCalendar( caljson )

          return true;
        }
      } catch (err) {
        error = err;
        console.log( error );
      }
  
      await new Promise(r => setTimeout(r, 2000));
    }

    console.log( "Retries exhausted" );
    this.setState({ loaded: 'failed' });

  }

  storeCalendar = ( data ) => {

    let sortedcalendar = data.sort(function(a, b) {
      const first = DateTime.fromISO( a['start-date'] + 'T' + a['start-time'], { zone: a['timezone'] } );
      const second = DateTime.fromISO( b['start-date'] + 'T' + b['start-time'], { zone: b['timezone'] } );
      return first.toSeconds() - second.toSeconds();
    });

    for ( var i = 0 ; i < sortedcalendar.length ; i++ ) {
      // sortedcalendar[i]['slug'] = this.slugify( sortedcalendar[i]['host-branch'] ) + '/' + this.slugify( sortedcalendar[i]['start-date'] ) + '/' + this.slugify( sortedcalendar[i]['event-name'] );

      sortedcalendar[i]['start-date-object'] = new Date( sortedcalendar[i]['start-date'] );

      if ( sortedcalendar[i]['end-date'] !== "" ) {
        sortedcalendar[i]['end-date-object'] = new Date( sortedcalendar[i]['end-date'] );
      } else {
        sortedcalendar[i]['end-date-object'] = new Date( sortedcalendar[i]['start-date'] );
      }

    }

    this.setState({ calendar: sortedcalendar });

    this.setState({ loaded: 'done' });
  }

  componentDidMount() {

    this.setState({
      containerId: ReactDOM.findDOMNode(this).parentNode.getAttribute("id"),
      region: ReactDOM.findDOMNode(this).parentNode.getAttribute("region"),
      count: ReactDOM.findDOMNode(this).parentNode.getAttribute("count"),
      group: ReactDOM.findDOMNode(this).parentNode.getAttribute("group"),
      legend: ReactDOM.findDOMNode(this).parentNode.getAttribute("legend"),
      links: ReactDOM.findDOMNode(this).parentNode.getAttribute("links"),
      bidlinks: ReactDOM.findDOMNode(this).parentNode.getAttribute("bidlinks"),
      localevents: ( ReactDOM.findDOMNode(this).parentNode.getAttribute("localevents") === 'none' ? false : true ),
      onlineevents: ( ReactDOM.findDOMNode(this).parentNode.getAttribute("onlineevents") === 'none' ? false : true ),
      cancelledevents: ( ReactDOM.findDOMNode(this).parentNode.getAttribute("cancelledevents") === 'none' ? false : true ),
      progress: ReactDOM.findDOMNode(this).parentNode.getAttribute("progress"),
      lang: ( ReactDOM.findDOMNode(this).parentNode.getAttribute("lang") ? ReactDOM.findDOMNode(this).parentNode.getAttribute("lang") : 'en' ),
      showkingdom: ReactDOM.findDOMNode(this).parentNode.getAttribute("showkingdom"),
    });
    
    let calurl = ReactDOM.findDOMNode(this).parentNode.getAttribute("calurl");

    if ( !calurl ) {
      calurl = 'https://dis.drachenwald.sca.org/data/calendar.json';
    }

    this.fetchretry( calurl );
  }

  render() {
    return (
      <div>
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact
              path='/'
              render={(props) => <Calendar  {...props}
                                            state={this.state}
                                            lang={this.state.lang}
                                            showkingdom={this.state.showkingdom}
                                            toggleLocalEvents={this.toggleLocalEvents}
                                            toggleOnlineEvents={this.toggleOnlineEvents}
                                            toggleCancelledEvents={this.toggleCancelledEvents}
                                            switchLanguage={this.switchLanguage}
                                  />}
            />
            <Route
              path='/info/:event_start/:event_slug'
              render={(props) => <Infopage {...props}
                                            lang={this.state.lang}
                                            calendar={this.state.calendar}
                                            loaded={this.state.loaded}
                                            attempts={this.state.attempts}
                                            switchLanguage={this.switchLanguage}
                                  />}
            />
            <Route
              path='/:event_group/:event_start/:event_slug'
              render={(props) => <Eventpage {...props}
                                            lang={this.state.lang}
                                            calendar={this.state.calendar}
                                            loaded={this.state.loaded}
                                            attempts={this.state.attempts}
                                            switchLanguage={this.switchLanguage}
                                  />}
            />
          </Switch>
        </div>
      </HashRouter>
      </div>
    );
  }

  toggleLocalEvents() {
    this.setState( state => ({
      localevents: !state.localevents
    }));
  }

  toggleOnlineEvents() {
    this.setState( state => ({
      onlineevents: !state.onlineevents
    }));
  }

  toggleCancelledEvents() {
    this.setState( state => ({
      cancelledevents: !state.cancelledevents
    }));
  }

  switchLanguage(newLang) {
    this.setState( state => ({
      lang: newLang
    }));
  }

}

export default App;

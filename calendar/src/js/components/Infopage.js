import React, { Component } from 'react';
import Icon from '@mdi/react';
import {  mdiWeb, mdiFacebook, mdiAlert } from '@mdi/js';

import Langswitcher from './Langswitcher';
import Displaydate from './Displaydate';
import Loadingstatus from './Loadingstatus';

import strings from '../lib/strings.js';

class Infopage extends Component {

  constructor(props) {
    super(props)
    this.childDiv = React.createRef()
  }

  state = {
    slug: null,
  }

  componentDidMount() {
    let eventstart = this.props.match.params.event_start;
    let slug = this.props.match.params.event_slug;
    this.setState({
      slug: 'info/' + eventstart + '/' + slug
    })
    this.handleScroll()
  }

  handleScroll = () => {
    const { index, selected } = this.props
    if (index === selected) {
      this.childDiv.current.scrollIntoView()
    }
  }

  render () {

    let lang = this.props.lang;

    if ( this.props.loaded === 'done' ) {

      let event = this.props.calendar.find(o => o.slug === this.state.slug)

      if ( !event ) {
        return ( <div ref={this.childDiv}><p>{strings[lang]['eventNotFound']}</p></div> );
      }

      let summary = event.summary.split('\n').reduce((total, line, index) => [total, <br key={index}/>, line]);
      let emergencyalert = event['emergency-alert'].split('\n').reduce((total, line, index) => [total, <br key={index}/>, line]);

      // If the viewer's language is the same as the event group's language
      // and the fields here provide a non-english version
      // then we show the non-english version
      // otherwise we show the english version

      if ( lang === event['language'] ) {

        if ( event['summary-ne'] ) {
          summary = event['summary-ne'].split('\n').reduce((total, line, index) => [total, <br key={index}/>, line]);
        }

      }

      // const eventstart = DateTime.fromISO( event['start-date'] + 'T' + event['start-time'], { zone: event['timezone'] } );

      return (
        <div ref={this.childDiv}>
          <div style={{'textAlign': 'center'}}>
            <Langswitcher lang={lang} switchLanguage={this.props.switchLanguage} />
          </div>

          <h1>{event['event-name']}</h1>

          <div>
            {strings[lang]['appliesTo']} <b>{event['host-branch']}</b>{ event.country !== '' ? <span>, <b>{ event.country }</b></span> : null }<br />

            <Displaydate calevent={event} lang={lang} short={false} />
          </div>
          
          <br />

          { event.status.toLowerCase() !== 'cancelled' ? <p>{summary}</p> : <div><h2><Icon size='1.5rem' path={mdiAlert} color='#900' title="Cancelled" /> {strings[lang]['cancelledLong']}</h2><p>{strings[lang]['contactStaff']}</p></div> }

          { event['emergency-alert'] ? <div><h2><Icon size='1.5rem' path={mdiAlert} color='#900' title="Important Info" /> {strings[lang]['importantInfo']}</h2><p>{emergencyalert}</p></div> : null }

          <p>
            { event['website'] ? <><a href={event.website} className="btn btn--primary"><Icon size='1rem' path={mdiWeb} color='#fff' title="Info" /> {strings[lang]['moreInfo']}</a>&nbsp;</> : null }
            { event['facebook'] ? <a href={event.facebook} className="btn btn--primary"><Icon size='1rem' path={mdiFacebook} color='#fff' title="Facebook" /> {strings[lang]['visitFB']}</a> : null }
          </p>

        </div>
      )
      
    } else {
      const status = {
        attempts: this.props.attempts,
        loaded: this.props.loaded,
        lang: lang
      }

      return ( <Loadingstatus status={status} self={this} /> );
    }
    
  }

}

export default Infopage;

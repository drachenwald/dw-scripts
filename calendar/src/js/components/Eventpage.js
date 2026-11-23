import React, { Component } from 'react';
import Icon from '@mdi/react';
import {  mdiCrown, mdiShieldHalfFull, mdiBullseyeArrow, mdiCandle, mdiWeb, mdiFacebook,
          mdiCalendarCheck, mdiCalendarClock, mdiCalendarQuestion, mdiSwordCross, mdiMapMarker,
          mdiAlert, mdiCalendarBlank, mdiWifi, mdiMonitor } from '@mdi/js';

import Langswitcher from './Langswitcher';
import Displaydate from './Displaydate';
import Loadingstatus from './Loadingstatus';
import SectionWithHeader from './SectionWithHeader';

import strings from '../lib/strings.js';


class Eventpage extends Component {

  constructor(props) {
    super(props)
    this.childDiv = React.createRef()
  }

  state = {
    slug: null,
  }

  componentDidMount() {
    let group = this.props.match.params.event_group;
    let eventstart = this.props.match.params.event_start;
    let slug = this.props.match.params.event_slug;
    this.setState({
      slug: group + '/' + eventstart + '/' + slug
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

      let siteaddr = event['site-address'].split('\n').reduce((total, line, index) => [total, <br key={index}/>, line]);
      let emergencyalert = event['emergency-alert'].split('\n').reduce((total, line, index) => [total, <br key={index}/>, line]);

      return (
        <div ref={this.childDiv}>
          <div style={{'textAlign': 'center'}}>
            <Langswitcher lang={lang} switchLanguage={this.props.switchLanguage} />
          </div>

          <h1>{event['event-name']}</h1>

          <div>
            {strings[lang]['hostedBy']} <b>{event['host-branch']}</b>{ event.country !== '' ? <span>, <b>{ event.country }</b></span> : null }<br />

            <Displaydate calevent={event} lang={lang} short={false} />
          </div>
          
          <br />

          { event.status.toLowerCase() !== 'cancelled'
            ?
              <SectionWithHeader item={lang === event['language'] && event['summary-ne'] ? event['summary-ne'] : event['summary'] } />
            :
              <div><h2><Icon size='1.5rem' path={mdiAlert} color='#900' title="Cancelled" /> {strings[lang]['cancelledLong']}</h2><p>{strings[lang]['contactStaff']}</p></div>
          }

          { event['emergency-alert'] ? <div><h2><Icon size='1.5rem' path={mdiAlert} color='#900' title="Important Info" /> {strings[lang]['importantInfo']}</h2><p>{emergencyalert}</p></div> : null }

          <p>
            { event['progress'].toLowerCase() === 'king' ? <span><Icon size='1rem' path={mdiCrown} title={strings[lang]['kingPresent']} /> {strings[lang]['kingPresent']}<br /></span> : null }
            { event['progress'].toLowerCase() === 'queen' ? <span><Icon size='1rem' path={mdiCrown} title={strings[lang]['queenPresent']} /> {strings[lang]['queenPresent']}<br /></span> : null }
            { event['progress'].toLowerCase() === 'both' ? <span><Icon size='1rem' path={mdiCrown} title={strings[lang]['kingAndQueenPresent']} /> {strings[lang]['kingAndQueenPresent']}<br /></span> : null }

            { event['progress-nordmark'] && event['progress-nordmark'].toLowerCase() === 'prince' ? <span><Icon size='1rem' path={mdiCrown} title={strings[lang]['princeNordmarkPresent']} /> {strings[lang]['princeNordmarkPresent']}<br /></span> : null }
            { event['progress-nordmark'] && event['progress-nordmark'].toLowerCase() === 'princess' ? <span><Icon size='1rem' path={mdiCrown} title={strings[lang]['princessNordmarkPresent']} /> {strings[lang]['princessNordmarkPresent']}<br /></span> : null }
            { event['progress-nordmark'] && event['progress-nordmark'].toLowerCase() === 'both' ? <span><Icon size='1rem' path={mdiCrown} title={strings[lang]['princeAndPrincessNordmarkPresent']} /> {strings[lang]['princeAndPrincessNordmarkPresent']}<br /></span> : null }

            { event['progress-id'].toLowerCase() === 'prince' ? <span><Icon size='1rem' path={mdiCrown} title={strings[lang]['princeIdPresent']} /> {strings[lang]['princeIdPresent']}<br /></span> : null }
            { event['progress-id'].toLowerCase() === 'princess' ? <span><Icon size='1rem' path={mdiCrown} title={strings[lang]['princessIdPresent']} /> {strings[lang]['princessIdPresent']}<br /></span> : null }
            { event['progress-id'].toLowerCase() === 'both' ? <span><Icon size='1rem' path={mdiCrown} title={strings[lang]['princeAndPrincessIdPresent']} /> {strings[lang]['princeAndPrincessIdPresent']}<br /></span> : null }

            { event['activities'].indexOf( 'Heavy Fighting' ) !== -1 ? <span><Icon size='1rem' path={mdiShieldHalfFull} title={strings[lang]['heavy']} /> {strings[lang]['heavyScheduled']}<br /></span> : null }
            { event['activities'].indexOf( 'Fencing' ) !== -1 ? <span><Icon size='1rem' path={mdiSwordCross} title={strings[lang]['fencing']} /> {strings[lang]['fencingScheduled']}<br /></span> : null }

            { event['activities'].indexOf( 'Archery' ) !== -1 ? <span><Icon size='1rem' path={mdiBullseyeArrow} title={strings[lang]['archery']} /> {strings[lang]['archeryScheduled']}<br /></span> : null }

            { event['activities'].indexOf( 'Dancing' ) !== -1 ? <span><Icon size='1rem' path={mdiCandle} title={strings[lang]['dancing']} /> {strings[lang]['dancingScheduled']}<br /></span> : null }
            { event['activities'].indexOf( 'A&S' ) !== -1 ? <span><Icon size='1rem' path={mdiCandle} title={strings[lang]['artsci']} /> {strings[lang]['artsciScheduled']}<br /></span> : null }
          </p>

          { event['site-address'] ? <div><h2>{strings[lang]['siteAddress']}</h2><p>{siteaddr}</p><p><a href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(siteaddr)}  className="btn btn--primary"><Icon size='1rem' path={mdiMapMarker} color='#fff' title={strings[lang]['viewMap']} />{strings[lang]['viewMap']}</a></p></div> : null }

          <SectionWithHeader title={strings[lang]['siteInfo']} item={lang === event['language'] && event['site-info-ne'] ? event['site-info-ne'] : event['site-info'] } />
          <SectionWithHeader title={strings[lang]['cost']} item={lang === event['language'] && event['cost-ne'] ? event['cost-ne'] : event['cost'] } />
          <SectionWithHeader title={strings[lang]['reservation']} item={lang === event['language'] && event['reservation-info-ne'] ? event['reservation-info-ne'] : event['reservation-info'] } />
          <SectionWithHeader title={strings[lang]['payment']} item={lang === event['language'] && event['payment-ne'] ? event['payment-ne'] : event['payment'] } />


          { event['event-steward'] && !event['event-steward-email'] ? <div><h2>{strings[lang]['eventSteward']}</h2> <p>{event['event-steward']}</p></div> : null }
          { event['event-steward'] && event['event-steward-email'] ? <div><h2>{strings[lang]['eventSteward']}</h2> <p>{event['event-steward']} (<a href={'mailto:' + event['event-steward-email']}>{event['event-steward-email']}</a>)</p></div> : null }

          { event['vc-url'] && event['vc-url'].search('zoom.us') !== -1 ? <p><a href={event['vc-url']} className="btn btn--primary"><Icon size='1rem' path={mdiMonitor} color='#fff' title="Video conference" /> {strings[lang]['joinOnline']}</a></p> : null }
          { event['vc-url'] && event['vc-url'].search('zoom.us') === -1 ? <p><a href={event['vc-url']} className="btn btn--primary"><Icon size='1rem' path={mdiWeb} color='#fff' title="Website" /> {strings[lang]['visitWebsite']}</a></p> : null }
          { event['pwinfo'] ? <p><b>{strings[lang]['pwInfo']}:</b> {event['pwinfo']}</p> : null }


          <p>
            { event['website'] ? <><a href={event.website} className="btn btn--primary"><Icon size='1rem' path={mdiWeb} color='#fff' title="Website" /> {strings[lang]['visitWebsite']}</a>&nbsp;</> : null }
            { event['facebook'] ? <a href={event.facebook} className="btn btn--primary"><Icon size='1rem' path={mdiFacebook} color='#fff' title="Facebook" /> {strings[lang]['visitFB']}</a> : null }
          </p>

          <p>
            { event['process-status'] === 'published' ? <span><Icon size='1rem' path={mdiCalendarCheck} /> {strings[lang]['chronOfficial']}</span> : null }
            { event['process-status'] === 'updated' ? <span><Icon size='1rem' path={mdiCalendarCheck} /> {strings[lang]['chronUpdated']}</span> : null }
            { event['process-status'] === 'pending' ? <span><Icon size='1rem' path={mdiCalendarClock} /> {strings[lang]['chronPending']}</span> : null }
            { event['process-status'] === 'incomplete' && event['status'].toLowerCase() !== 'local' ? <span><Icon size='1rem' path={mdiCalendarQuestion} /> {strings[lang]['chronUnofficial']}</span> : null }
            { event['process-status'] === 'incomplete' && event['status'].toLowerCase() === 'local' ? <span><Icon size='1rem' path={mdiCalendarBlank} /> {strings[lang]['chronLocal']}</span> : null }
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

export default Eventpage;

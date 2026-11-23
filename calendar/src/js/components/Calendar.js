import React from 'react';
import Icon from '@mdi/react'
import { mdiCrown, mdiShieldHalfFull, mdiBullseyeArrow, mdiCandle, mdiSwordCross, mdiAlert, mdiWifi, mdiInformation } from '@mdi/js'

import Eventlink from './Eventlink';
import Langswitcher from './Langswitcher';
import Displaydate from './Displaydate';
import Loadingstatus from './Loadingstatus';

import strings from '../lib/strings.js';

const Calendar = ({state, lang, showkingdom, toggleLocalEvents, toggleCancelledEvents, switchLanguage}) => {

  let calendarList = '';

  if ( !state.links ) {
    state.links = 'canonical';
  }

  if ( !state.progress ) {
    state.progress = "drachenwald";
  }

  if ( state.loaded === 'done' ) {
    
    calendarList = state.calendar.map( calevent => {

      let nowdate = new Date();

      let computeDate = calevent['end-date-object'].setDate( calevent['end-date-object'].getDate() + 1);
      let thingDate = calevent['end-date-object'].setDate( calevent['end-date-object'].getDate() - 1);

      if ( nowdate > computeDate ) {
        return false;
      }

      // If this is a kingdom event
      if ( calevent.type === 'kingdom event' ) {
        // AND we don't show all kingdom events
        if ( !showkingdom ) {
          // AND this is a kingdom event out of region
          if ( state.region && ( calevent.region.toLowerCase() !== state.region.toLowerCase() ) ) {
            // then suppress this event
            return false;
          }
        }
      } else {
        // if this is any other kind of out of region event, suppress it
        if ( state.region && ( calevent.region.toLowerCase() !== state.region.toLowerCase() ) ) {
          return false;
        }
      }

      if ( !state.localevents && ( calevent.status.toLowerCase() === 'local' ) ) {
        return false;
      }

      const grouplist = ( state.group ? state.group.toLowerCase().split(',') : [] ).map(string => string.trim());

      if ( grouplist.length > 0 && !grouplist.includes( calevent['host-branch'].toLowerCase() ) ) {
        return false;
      }

      let progressicons
      
      if ( state.progress === 'id' ) {
        progressicons = (
          <span>
            { calevent['progress-id'].toLowerCase() === 'prince' ? <span><Icon size='1.5rem' path={mdiCrown} title={strings[lang]['princeIdPresent']} /></span> : null }
            { calevent['progress-id'].toLowerCase() === 'princess' ? <span><Icon size='1.5rem' path={mdiCrown} title={strings[lang]['princessIdPresent']} /></span> : null }
            { calevent['progress-id'].toLowerCase() === 'both' ? <span><Icon size='1.5rem' path={mdiCrown} title={strings[lang]['princeAndPrincessIdPresent']} /></span> : null }
          </span>
        )
      } else if ( state.progress === 'nordmark' ) {
        progressicons = (
          <span>
            { calevent['progress-nordmark'].toLowerCase() === 'prince' ? <span><Icon size='1.5rem' path={mdiCrown} title={strings[lang]['princeNordmarkPresent']} /></span> : null }
            { calevent['progress-nordmark'].toLowerCase() === 'princess' ? <span><Icon size='1.5rem' path={mdiCrown} title={strings[lang]['princeNordmarkPresent']} /></span> : null }
            { calevent['progress-nordmark'].toLowerCase() === 'both' ? <span><Icon size='1.5rem' path={mdiCrown} title={strings[lang]['princeNordmarkPresent']} /></span> : null }
          </span>
        )
      } else {
        progressicons = (
          <span>
            { calevent['progress'].toLowerCase() === 'king' ? <span><Icon size='1.5rem' path={mdiCrown} title={strings[lang]['kingPresent']} /></span> : null }
            { calevent['progress'].toLowerCase() === 'queen' ? <span><Icon size='1.5rem' path={mdiCrown} title={strings[lang]['queenPresent']} /></span> : null }
            { calevent['progress'].toLowerCase() === 'both' ? <span><Icon size='1.5rem' path={mdiCrown} title={strings[lang]['kingAndQueenPresent']} /></span> : null }
          </span>
        )
      }

      let icons = (
        <div>
          {progressicons}
          { calevent['type'] === 'other' ? <span><Icon size='1.5rem' path={mdiInformation} title={strings[lang]['informational']} /></span> : null }
          { calevent['activities'].indexOf( 'Heavy Fighting' ) !== -1 ? <span><Icon size='1.5rem' path={mdiShieldHalfFull} title={strings[lang]['heavy']} /></span> : null }
          { calevent['activities'].indexOf( 'Fencing' ) !== -1 ? <span><Icon size='1.5rem' path={mdiSwordCross} title={strings[lang]['fencing']} /></span> : null }

          { calevent['activities'].indexOf( 'Archery' ) !== -1 ? <span><Icon size='1.5rem' path={mdiBullseyeArrow} title={strings[lang]['archery']} /></span> : null }

          { calevent['activities'].indexOf( 'Dancing' ) !== -1 || calevent['activities'].indexOf( 'A&S' ) !== -1 ? <span><Icon size='1.5rem' path={mdiCandle} title={strings[lang]['artsci']} /></span> : <span></span> }
          
          { calevent['status'].toLowerCase() === 'online' ? <span><Icon size='1.5rem' path={mdiWifi} title={strings[lang]['online']} /></span> : null }

          { calevent['emergency-alert'] !== '' ? <Eventlink calevent={calevent} links={state.links}><Icon size='1.5rem' path={mdiAlert} color='#900' title={strings[lang]['importantInfo']} /></Eventlink> : null }
          
          <br />
        </div> )

      let eventbg = { 'backgroundColor': '#eeeeee' };
      let eventfg = {};

      if ( calevent['process-status'] === "published" ) {
        eventbg = { 'backgroundColor': '#ffffff' };
      }

      if ( calevent.status.toLowerCase() === 'cancelled' ) {
        if ( state.cancelledevents ) {
          eventbg = { 'backgroundColor': '#eeeeee' };
          eventfg = { 'color': '#666666',
                      'textDecoration': 'line-through'
                    };
          icons = (
            <div>
              <span style={{'backgroundColor': '#eeeeee'}}>
                <Eventlink calevent={calevent} links={state.links}><span><Icon size='1.5rem' path={mdiAlert} color='#900' title={strings[lang]['importantInfo']} /><b> {strings[lang]['cancelled']}</b></span></Eventlink>
              </span>
            </div>
          );
        } else {
          return null;
        }
      }

      let geoloc = null;

      if ( calevent['country'] && calevent['town'] ) {
        geoloc = '(' + calevent['town'] + ', ' + calevent['country'] + ')'
      } else if (  calevent['country'] ) {
        geoloc = '(' + calevent['country'] + ')'
      }

      return (
          <tr key={calevent.slug} style={eventbg}>
            <td data-label={strings[lang]['date']} style={eventfg}><Displaydate calevent={calevent} lang={lang} short={true} /></td>
            <td data-label={strings[lang]['group']} style={eventfg}><div>{calevent['host-branch']}{ geoloc ? <><br />{ geoloc }</> : null }</div></td>
            <td data-label={strings[lang]['event']} style={eventfg}><Eventlink calevent={calevent} links={state.links}>{calevent['event-name']}</Eventlink></td>
            <td data-label={strings[lang]['info']}>{icons}</td>
          </tr>
      )
    }).filter(function(v) { return !!v; });

    if ( state.count ) {
      calendarList = calendarList.slice( 0 , Number(state.count) );
    }

    let linkstobidlist = ( state.bidlinks
      ?
        <p style={{'textAlign': 'center'}}>
          <a href="https://drachenwald.sca.org/events/bidlist/" className="btn btn--primary">{strings[lang]['bidList']}</a>{' '}
          <a href="https://drachenwald.sca.org/events/calendar-add/" className="btn btn--primary">{strings[lang]['addEvent']}</a>{' '}
          <a href="https://drachenwald.sca.org/events/pastevents/" className="btn btn--primary">{strings[lang]['pastEvents']}</a>
        </p>
      :
        null
    )

    const localToggleButton = (
      <div style={{'textAlign': 'center'}}>
        <button className="btn btn--primary" onClick={toggleLocalEvents}>
          { state.localevents ? strings[lang]['hideLocal'] : strings[lang]['showLocal'] }
        </button>
      </div>
    )

    const anyCancelled = state.calendar.some( (e) => (e['process-status'].toLowerCase() === 'cancelled')  );

    console.log(anyCancelled)

    const cancelToggleButton = (
      <div style={{'textAlign': 'center', 'fontSize': 'medium'}}>
        { anyCancelled
          ?
            <button className="btn btn--primary" onClick={toggleCancelledEvents}>
              { state.cancelledevents ? strings[lang]['hideCancelled'] : strings[lang]['showCancelled'] }
            </button>
          :
            null
        }
        <Langswitcher lang={lang} switchLanguage={switchLanguage} />
      </div>
    )

    return (
      <div>

        <p>
          {strings[lang]['foo']}
        </p>

        { state.legend ?
            <p className="notice">
              <Icon size='1rem' path={mdiCrown} /> {strings[lang]['royaltyPresent']} | <Icon size='1rem' path={mdiWifi} /> {strings[lang]['online']} | <Icon size='1rem' path={mdiInformation} /> {strings[lang]['informational']}<br />
              <Icon size='1rem' path={mdiShieldHalfFull} /> {strings[lang]['heavy']} | <Icon size='1rem' path={mdiSwordCross} /> {strings[lang]['fencing']} | <Icon size='1rem' path={mdiBullseyeArrow} /> {strings[lang]['archery']} | <Icon size='1rem' path={mdiCandle} /> {strings[lang]['artsci']}<br />
              {strings[lang]['eventsApprovedByChronicler']}
            </p>
            : null
        }

        <table style={{'captionSide': 'top'}}>
          <caption>
            <h3>{strings[lang]['upcomingEvents']}</h3>
            { state.legend ? <>{cancelToggleButton}</> : null }
          </caption>

          <thead>
            <tr valign="top">
              <th scope="col">
                <h3>{strings[lang]['date']}</h3>
              </th>
              <th scope="col">
                <h3>{strings[lang]['group']}</h3>
              </th>
              <th scope="col">
                <h3>{strings[lang]['event']}</h3>
              </th>
              <th scope="col">
                <h3>{strings[lang]['info']}</h3> 
              </th>
            </tr>
          </thead>

          <tbody>
            {calendarList}
          </tbody>
        </table>

        {linkstobidlist}

      </div>
    )
    
  } else {
    return ( <Loadingstatus status={state} /> );
  }

}

export default Calendar;

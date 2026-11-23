import React, { useState } from 'react';
import { DateTime } from "luxon";

const Displaydate = ({calevent, lang, short }) => {

  const [showTZs, setShowTZs] = useState(false);

  if ( !calevent['timezone'] ){
    calevent['timezone'] = 'Europe/Stockholm';
  }

  const eventstart = DateTime.fromISO( calevent['start-date'] + 'T' + calevent['start-time'], { zone: calevent['timezone'] } );
  const usertimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if ( calevent['status'].toLowerCase() === 'online' && !short) {
    return (
      <>
        <br />
        <b>Start time:</b><br />
        { eventstart.setLocale(lang).setZone(usertimezone).toFormat('dd LLL yyyy HH:mm') } { usertimezone }<br />
        { calevent['timezone'] !== usertimezone
          ?
            ( <>{eventstart.setLocale(lang).toFormat('dd LLL yyyy HH:mm')} {calevent['timezone']}<br /></> )
          :
            null
        }

        { showTZs
          ?
            (
              <>
                <button className="btn btn--primary" onClick={() => setShowTZs(!showTZs)}>Hide other timezones</button>
                <div className="notice">
                  { eventstart.setLocale(lang).setZone('America/Los_Angeles').toFormat('dd LLL yyyy HH:mm') } Los Angeles, Vancouver<br />
                  { eventstart.setLocale(lang).setZone('America/New_York').toFormat('dd LLL yyyy HH:mm') } New York, Toronto<br />
                  { eventstart.setLocale(lang).setZone('UTC').toFormat('dd LLL yyyy HH:mm') } UTC, Reykjavík<br />
                  { eventstart.setLocale(lang).setZone('Europe/Dublin').toFormat('dd LLL yyyy HH:mm') } Dublin, London<br />
                  { eventstart.setLocale(lang).setZone('Europe/Stockholm').toFormat('dd LLL yyyy HH:mm') } Amsterdam, Stockholm<br />
                  { eventstart.setLocale(lang).setZone('Africa/Johannesburg').toFormat('dd LLL yyyy HH:mm') } Cape Town, Johannesburg<br />
                  { eventstart.setLocale(lang).setZone('Europe/Helsinki').toFormat('dd LLL yyyy HH:mm') } Helsinki, Sofia<br />
                </div>
              </>
            )
          :
            (
              <>
                <button className="btn btn--primary" onClick={() => setShowTZs(!showTZs)}>Show other timezones</button>
              </>
            )
        }
      </>
    );
  } else if ( calevent['status'].toLowerCase() === 'online' && short && calevent['start-date'] === calevent['end-date'] ) {
    return DateTime.fromISO( calevent['start-date'] + 'T' + calevent['start-time'], { zone: calevent['timezone'] } ).setZone(Intl.DateTimeFormat().resolvedOptions().timeZone).setLocale(lang).toFormat("dd LLL yyyy, HH:mm");
  } else if ( calevent['start-date-object'].toLocaleString(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: calevent['timezone'] } )
              === calevent['end-date-object'].toLocaleString(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: calevent['timezone'] } )
            ) {
    return calevent['start-date-object'].toLocaleString(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: calevent['timezone'] });
  } else if ( calevent['start-date-object'].toLocaleString(lang, { month: 'short', year: 'numeric', timeZone: calevent['timezone'] } )
              === calevent['end-date-object'].toLocaleString(lang, { month: 'short', year: 'numeric', timeZone: calevent['timezone'] } )
            ) {
    return calevent['start-date-object'].toLocaleString(lang, { day: 'numeric', timeZone: calevent['timezone'] }) + "–" + calevent['end-date-object'].toLocaleString(lang, { day: 'numeric', timeZone: calevent['timezone'] } ) + ' ' + calevent['end-date-object'].toLocaleString(lang, { month: 'short', timeZone: calevent['timezone'] } ) + ' ' + calevent['end-date-object'].toLocaleString(lang, { year: 'numeric', timeZone: calevent['timezone'] });
  } else if ( calevent['start-date-object'].toLocaleString(lang, { year: 'numeric', timeZone: calevent['timezone'] })
              === calevent['end-date-object'].toLocaleString(lang, { year: 'numeric', timeZone: calevent['timezone'] })
            ) {
    return calevent['start-date-object'].toLocaleString(lang, { day: 'numeric', month: 'short', timeZone: calevent['timezone'] }) + " – " + calevent['end-date-object'].toLocaleString(lang, { day: 'numeric', month: 'short', timeZone: calevent['timezone'] } ) + ' ' + calevent['end-date-object'].toLocaleString(lang, { year: 'numeric', timeZone: calevent['timezone'] });
  } else {
    return calevent['start-date-object'].toLocaleString(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: calevent['timezone'] }) + " – " + calevent['end-date-object'].toLocaleString(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: calevent['timezone'] });
  }

}

export default Displaydate;
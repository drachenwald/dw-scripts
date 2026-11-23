import React from 'react';
import { Link } from 'react-router-dom';

const Eventlink = ({calevent , links , children}) => {
  if ( links === 'local' ) {
    return ( <Link to={'/' + calevent.slug}>{children}</Link> );
  } else if ( links === 'none' ) {
    return ( <span>{children}</span> );
  } else {
    return ( <a href={"https://drachenwald.sca.org/events/calendar/#/" + calevent.slug}>{children}</a> );
  }
}

export default Eventlink;

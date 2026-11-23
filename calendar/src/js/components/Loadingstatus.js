import React from 'react';
import Icon, { Stack } from '@mdi/react'

import { mdiOrbit, mdiCloseCircle, mdiNumeric0, mdiNumeric1, mdiNumeric2, mdiNumeric3, mdiNumeric4, mdiNumeric5 } from '@mdi/js'

import strings from '../lib/strings.js';


const Loadingstatus = ({status, self}) => {

  if ( status.loaded === 'loading' ) {

    const iconlist = [ mdiNumeric0, mdiNumeric1, mdiNumeric2, mdiNumeric3, mdiNumeric4, mdiNumeric5 ];

    const attempticon = iconlist[ status.attempts ];
    return (
      <div ref={self ? self.childDiv : null} style={{'textAlign': 'center'}}>
        {strings[status.lang]['loadingAttempt']} {status.attempts}<br />
        <Stack size='2.5rem'>
          <Icon path={mdiOrbit} spin />
          <Icon path={attempticon} color='#ccc' />
        </Stack>
      </div>
    );

  }

  return (
    <div ref={self ? self.childDiv : null} style={{'textAlign': 'center'}}>
      {strings[status.lang]['loadFailed']}<br />
      <Icon size='2.5rem' path={mdiCloseCircle} />
    </div>
  );

}

export default Loadingstatus;
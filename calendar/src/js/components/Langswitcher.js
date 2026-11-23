import React from 'react';

const Langswitcher = ({lang, switchLanguage}) => {

  const langlist = ['de','en','fi','sv']

  const buttonlist = langlist.map( langcode => {
    return ( langcode === lang
      ?
      <span key={'langSwitcher-'+langcode}>&nbsp;<button className="btn btn--inverse" disabled>{langcode.toUpperCase()}</button></span>
      :
      <span key={'langSwitcher-'+langcode}>&nbsp;<button className="btn btn--primary" onClick={(e) => switchLanguage(langcode, e)}>{langcode.toUpperCase()}</button></span>
    )
  });

  return (
    <span>
      {buttonlist}
    </span>
  );

}

export default Langswitcher;
const REGNUMURL = 'https://dis.drachenwald.sca.org/data/regnum-officers-box.json';

const OFFICETITLES = {
  'en': [
    { slug: 'seneschal', title: 'Seneschal', desc: "The Seneschal is the chair of the group." },
    { slug: 'exchequer', title: 'Exchequer', desc: "The Exchequer manages the finances of the group." },
    { slug: 'chatelaine', title: 'Chatelaine', desc: "The Castellan, also known as the Chatelaine, is responsible for assisting newcomers find their way in the group. They are here to help, so don't be afraid to ask!" },
    { slug: 'moas', title: 'Minister of Arts and Sciences', desc: "The Minister of Arts and Sciences of the group oversees arts and sciences within the group." },
    { slug: 'herald', title: 'Herald', desc: "The Herald oversees activities including researching names and devices, and also heralding at important events." },
    { slug: 'armoured-combat-marshal', title: 'Armoured Combat Marshal', desc: "The Armoured Combat Marhsal oversees all aspects of armoured combat in the group." },
    { slug: 'archery-thrown-marshal', title: 'Archery Marshal', desc: "The Archery Marshal of the group oversees archery activities within the group." },
    { slug: 'fencing-marshal', title: 'Fencing Marshal', desc: "The Fencing Marshal oversees all aspects of fencing combat in the group." },
    { slug: 'chronicler', title: 'Chronicler', desc: "The Chronicler is responsible for the group's publications." },
    { slug: 'signet', title: 'Signet Clerk', desc: "The Signet is an officer whose responsibility is coordinating the production of those scrolls given out with awards." },
    { slug: 'webminister', title: 'Web Minister', desc: "The Web Minister is responsible for the group's website." },
    { slug: 'socialmedia', title: 'Social Media Minister', desc: "The Social Media Minister is responsible for the group's social media presence." }
  ],
  'fi': [
    { slug: 'seneschal', title: 'Vouti', desc: "Vouti on ryhmän puheenjohtaja." },
    { slug: 'exchequer', title: 'Rahainvartija', desc: "Rahainvartija huolehtii ryhmän taloudesta." },
    { slug: 'chatelaine', title: 'Kastellaani', desc: "Kastellaani toivottaa uudet jäsenet tervetulleiksi. Häneltä voi aina kysyä apua." },
    { slug: 'moas', title: 'Tiede- ja taideneuvos', desc: "Tiede- ja taideneuvos auttaa kaikissa käden taitoihin ja tutkimukseen liittyvissä asioissa." },
    { slug: 'herald', title: 'Airut', desc: "Airut vastaa nimiin ja vaakunoihin liittyvistä asioista sekä toimii hallitsijoiden apuna hoveissa." },
    { slug: 'armoured-combat-marshal', title: 'Marski', desc: "Marskin vastuulla on kaikki taistelutoiminta ja sen turvallisuus." },
    { slug: 'archery-thrown-marshal', title: 'Jousikapteeni', desc: "Jousikapteeni vastaa jousiammunnasta." },
    { slug: 'fencing-marshal', title: 'Kalpamarski', desc: "Kalpamarski huolehtii kalpamiekkailusta." },
    { slug: 'chronicler', title: 'Kronikoitsija', desc: "Kronikoitaija tekee uutislehden ja vastaa muistakin julkaisuista." },
    { slug: 'signet', title: 'Kirjuri', desc: "Kirjuri koordinoi, että hovissa annettavat aateliskirjeet ja vastaavat dokumentit tehdään ja tuodaan paikalle." },
    { slug: 'webminister', title: 'Web-vastaava', desc: "Web-vastaava huolehtii ryhmän webbisivuista." },
    { slug: 'socialmedia', title: 'Somevastaava', desc: "Somevastaava huolehtii ryhmän sosiaalisen median näkyvyydestä." }
  ],
  'sv': [
    { slug: 'seneschal', title: 'Drots', desc: "Drotsen är en grupps ordförande." },
    { slug: 'exchequer', title: 'Skattmästare', desc: "Skattmästaren ansvarar för gruppens ekonomi." },
    { slug: 'chatelaine', title: 'Kastellan', desc: "Kastellanen, även känd som Chatelanen, ansvarar för att välkomna nya medlemmar i en grupp. De finns där för att hjälpa till, så var inte rädd för att fråga om saker!" },
    { slug: 'moas', title: 'Konst- och vetenskapsminister', desc: "En konst-och vetenskapsminister ansvarar konst och vetenskap i en grupp." },
    { slug: 'herald', title: 'Härold', desc: "Härolden ansvarar för aktiviteter som inkluderar forska kring namn och vapensköldar, och även som utropare vid viktiga evenemang." },
    { slug: 'armoured-combat-marshal', title: 'Fightingmarsk', desc: "Fightingmarsken ansvarar för allt som har att göra med heavy fighting i en grupp." },
    { slug: 'archery-thrown-marshal', title: 'Bågskyttemarsk', desc: "Bågskyttemarsken ansvarar för bågskytteaktiviteter i gruppen." },
    { slug: 'fencing-marshal', title: 'Fäktmarsk', desc: "Fäktmarsken ansvarar för allt som har att göra med fäktning i en grupp." },
    { slug: 'chronicler', title: 'Krönikör', desc: "Krönikören ansvarar för gruppens publikationer." },
    { slug: 'signet', title: 'Präntare', desc: "Präntaren är ett ämbete som ansvarar för att koordinera produktionen av skrollor till utmärkelser." },
    { slug: 'webminister', title: 'Webbminister', desc: "Webbministern ansvarar för gruppens webbsajt." },
    { slug: 'socialmedia', title: 'Socialamediaminister', desc: "Socialamediaministern ansvarar för gruppens närvaro på sociala medier." }
  ]
}

const ERRORS = {
  'en': {
    'not-filled': 'This office is not currently filled',
    'none-listed': 'No officers listed for this group',
    'none-show': 'No officers to show'
  },
  'fi': {
    'not-filled': 'Tätä virkaa ei ole tällä hetkellä täytetty',
    'none-listed': 'Tällä ryhmällä ei ole virkailijalistaa',
    'none-show': 'Ei näytettäviä virkailijoita'
  },
  'sv': {
    'not-filled': 'Detta ämbete är vakant.',
    'none-listed': 'Ingen officer finns listad för denna grupp.',
    'none-show': 'Ingen officer finns listad.'
  }
}

let regnum = {};

function findOfficer( group, office, regnum ) {
  return ( regnum.find( officer => (
    officer.group === group && officer.office === office && officer.role_type === 'officer'
  )) )
}

function renderOfficer( officer, role, compact, withdesc ) {

  if ( compact ) {
    return `
        ${role.title}: <b>${officer.scaname}</b>
        ${ officer.mundanename ? `(${officer.mundanename})` : '' }
        ${ officer.pronouns ? `<span class="text-muted">${officer.pronouns}</span>` : '' }
        ${ officer.email ? `<span><a href="mailto:${officer.email}">${officer.email}</a></span>` : '' }
      <br />
    `
  } else {
    return `
      <div class="officer">
        <h3>${role.title}</h3>
        <b>${officer.scaname}</b>
        ${ officer.mundanename ? `(${officer.mundanename})` : '' }
        ${ officer.pronouns ? `<span class="text-muted">${officer.pronouns}</span>` : '' }
        ${ officer.email ? `<br />Contact: <a href="mailto:${officer.email}">${officer.email}</a>` : '' }
        ${ withdesc && role.desc ? `<br />${ role.desc }<br />` : '' }
      </div>
      <br />
    `
  }
  
}

function updatePage() {

  const officerdivlist = document.getElementsByClassName('dw-live-officers');

  for ( const officerdiv of officerdivlist ) {

    const lang = officerdiv.getAttribute('lang')
    const compact = ( officerdiv.hasAttribute('display') ? officerdiv.getAttribute('display').toLowerCase() === 'compact' : false )
    const withdesc = ( officerdiv.hasAttribute('display') ? officerdiv.getAttribute('display').toLowerCase() === 'withdesc' : false )

    if ( officerdiv.hasAttribute('group') && officerdiv.hasAttribute('office') ) {

      const group = officerdiv.getAttribute('group')
      const office = officerdiv.getAttribute('office')
      const officer = findOfficer( group, office, regnum )

      const role = OFFICETITLES[lang].find( row => row.slug === office )

      if ( officer ) {
        officerdiv.innerHTML = renderOfficer(officer, role, compact, withdesc);
      } else {
        officerdiv.innerHTML = ERRORS[lang]['not-filled']
      }

    } else if ( officerdiv.hasAttribute('group') ) {

      const group = officerdiv.getAttribute('group')

      const officerlist = regnum.filter( officer => (
        officer.group === group && officer.role_type === 'officer'
      ))

      let renderhtml = '';

      for ( const role of OFFICETITLES[lang] ) {

        const officer = officerlist.find( officer => officer.office === role.slug )

        if ( officer ) {
          renderhtml += renderOfficer( officer, role, compact, withdesc )
        }
      }

      if ( renderhtml ) {
        officerdiv.innerHTML = renderhtml;
      } else {
        officerdiv.innerHTML = ERRORS[lang]['none-listed']
      }

    } else {
      officerdiv.innerHTML = ERRORS[lang]['none-show']
    }

  }

}

fetch( REGNUMURL )
  .then((response) => response.json())
  .then((data) => {
    regnum = data;
    updatePage();
  });

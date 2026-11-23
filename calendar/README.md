# Drachenwald Events Calendar

This is the events calendar for the Kingdom of Drachenwald in the SCA.
It is a Javascript application that reads the current event information
from a JSON file and renders it.

We use React and React Router to generate separate pages for each event.
The URLs for these pages are persistent, until the event passes and is
removed from the calendar, or unless the date, group or event name are
changed.

If you run an official website for a group in Drachenwald, you are welcome
to load the calendar into your own website, either as a substitute for 
your group's existing calendar, or alongside it. You can use the settings
below to show only events that are of interest to your group.

## To embed the calendar

The minimal code to include the calendar is:

```html
<div id="calendar"></div>
<script type="text/javascript" src="https://scripts.drachenwald.sca.org/calendar/v3.0/calendar.js"></script>
```

You may use additional parameters to customise the display of the calendar.
For example:

```html
<div id="calendar"
     legend="true"
     region="insulae draconis"
     progress="id"
     links="local"></div>
<script type="text/javascript" src="https://scripts.drachenwald.sca.org/calendar/v3.0/calendar.js"></script>
```

This will display the calendar:
- with the legend and language switcher buttons
- for events taking place in Insuale Draconis
- including progress information for the Coronet of Insulae Draconis
- and open event pages on the same website, rather than linking out to the Drachenwald website.

## Parameters

You may add these parameters inside the `<div>` tag to customise the display.

`region`: Show only events in this region. May be one of `Aarnimetsä`, `Central`, `Insulae Draconis`,
`Nordmark`. Default: show all events.

`count`: Show only this many events. Default: show all events.

`legend`: When `legend="true"`, show the icon legend and language buttons. Default: do not show.

`links`: When `links="local"`, this will open event page links within the current webpage, instead
of linking out to the Drachenwald website. For this to work well, the page with the calendar script
should have as little additional text as possible. Default: link out to Drachenwald.

`bidlinks`: When `bidlinks="true"`, show the links to the Drachenwald bid list and the form to add
an event to the calendar. Default: do not show.

`localevents`: When `localevents="none"`, suppress display of events that are marked as local (i.e.
not for publication in the Dragon's Tale.) Default: show all events.

`onlineevents`: When `onlineevents="none"`, suppress display of events that are marked as online.
Default: show all events.

`cancelledevents`: When `cancelledevents="none"`, suppress display of events that are marked as cancelled.
Default: show all events. (If `legend="true"`, the button to toggle this setting will be displayed to the
user.)

`progress`: May be `id`. On the main calendar page, the crown symbol will denote events
attended by the Coronet of this principality. Event pages show all attending royals known to the Kingdom calendar. Other regions are not supported at this time.
Default: show the progress of the King and Queen.

`lang`: May be `de`, `en`, `fi` or `sv`. Will show the calendar in this language and, where available,
event text will be presented in this langauge. Default: `en`.

`showkingdom`: Only applies if `region` is set. If `region` is set and `showkingdom="true"`, this will
show Kingdom events in the calendar even if they occur outside of region. Default: follow region setting.

## Styling

We don't include any CSS with the calendar. This helps it fit in more closely with the style
of your own website. The elements do use some common classes which, if you wish, you may
define in your own stylesheets.

Buttons are defined with the classes `btn`, and either `btn--primary` if active or `btn--inverse` if
disabled.

The legend and timezone box are defined with class `notice`.

The main calendar table does not have a class assigned, but will of course inherit the styling
you apply to `<table>` elements in your own stylesheets.

## Contact

If you have questions or requests, please contact the Drachenwald Kingdom Webminister:
webminister@drachenwald.sca.org.

The Drachenwald webminister would be happy to help any Chronclers or Webministers who wish to add their Principality or Baronial Progress, or to integrate their group's calendar with the Kingdom calendar.

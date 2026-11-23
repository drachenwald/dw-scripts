FROM nginx:1.31-alpine-slim
COPY calendar/dist/calendar.js /usr/share/nginx/html/calendar/v3.0/
COPY calendar/dist/calendar.js.br /usr/share/nginx/html/calendar/v3.0/
COPY calendar/dist/calendar.js.gz /usr/share/nginx/html/calendar/v3.0/
COPY calendar/dist/calendar.js.LICENSE.txt /usr/share/nginx/html/calendar/v3.0/
COPY calendar/dist/test.html /usr/share/nginx/html/calendar/v3.0/
COPY regnum/regnum-fetch.js /usr/share/nginx/html/regnum/

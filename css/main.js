const mainCSS = () => `
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu400:wght@400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Sofia+Sans+Semi+Condensed:wght@400;500;600&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Kurale&display=swap');

body:has(.dtf-scriptWindow, .dialog) {
  overflow: hidden;
}

:is(.scrollLite, .scrollMid)::-webkit-scrollbar-thumb {
  background-color: rgb(189 164 164);
}
:is(.scrollLite, .scrollMid)::-webkit-scrollbar-corner {
  background-color: unset;
}
.scrollLite::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
.scrollMid::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

ul.itemsList {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3px 0;
  padding: 0;
  margin: 0;
}
ul.itemsList li {
  display: flex;
  gap: 0 5px;
}
ul.itemsList li .buttons {
  display: flex;
  gap: 0 5px;
}
ul.itemsList li::marker {
  font-size: 0;
}

li.texter {
  word-break: break-all;
  overflow: auto;
  max-height: 30%;
}

.mask {
  display: flex;
  padding: 3px;
  background-color: rgb(0,0,0);
}
.mask .attach {
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}

.cont {
  display: flex;
  gap: 5px 5px;
  min-width: 0;
}

.texter {
  word-break: break-all;
  max-height: 30%;
  overflow: auto;
}

.positive {
  font-weight: 600;
  color: rgb(123 239 154);
}
.negative {
  font-weight: 600;
  color: rgb(233 82 101);
}



.hor {
  flex-direction: row !important;
}
.ver {
  flex-direction: column !important;
}

.point {
  cursor: pointer;
}
.point:hover {
  filter: brightness(0.5);
}

label {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  gap: 0 5px;
  width: max-content;
  font-size: 15px;
  font-family: 'Sofia Sans Semi Condensed', sans-serif;
  font-family: 'Roboto Condensed', sans-serif;
  font-family: 'Raleway', sans-serif;
  font-family: 'Kurale', serif;
  font-weight: 500;
}
label.cont {
  gap: 5px 0;
  width: unset;
}
label.iList {
  flex-direction: column;
}


ul.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 15px;
  padding: 7px;
  margin: 0;
  max-width: 100%;
  min-height: 20px;
  box-shadow: inset 0 0 1px 0px rgb(0,0,0);
}
ul.flex li {
  display: flex;
  gap: 0 5px;
  padding: 2px;
  border-radius: 2px;
  box-shadow: 0 0 2px 0 rgb(0,0,0);
}
ul.flex li .value {
  min-width: 20px;
  outline: none;
}
ul.flex li .buttons {
  display: flex;
  gap: 0 5px;
}
ul.flex li .buttons .del {
  display: flex;
  border: 1px solid rgb(0,0,0);
  border-radius: 50%;
  padding: 3px;
  margin: auto;
  font-weight: 600;
  line-height: 0;
  aspect-ratio: 1/1;
  align-items: center;
  justify-content: center;
  background-color: rgb(0,0,0);
  color: rgb(223 98 161);
}
ul.flex li::marker {
  font-size: 0;
}






.flex {
  display: flex;
}
.grid {
  display: grid;
}

.flex :is(.fList) {
  display: flex;
  flex-wrap: wrap;
  gap: 5px 5px;
}

.hor {
  flex-direction: row !important;
}
.ver {
  flex-direction: column !important;
}

.full {
  flex-grow: 1;
}
.items2 {
  flex-basis: 49%;
}
.nl {
  flex-basis: 100%;
}
`

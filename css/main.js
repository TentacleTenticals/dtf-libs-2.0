const mainCSS = () => `
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu400:wght@400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Sofia+Sans+Semi+Condensed:wght@400;500;600&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Kurale&display=swap');

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

label.discord {
  display: flex;
  flex-direction: column;
}
label.discord ul {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3px 0;
  padding: 0;
  margin: 0;
  border-left: 4px solid rgb(221 83 83);
  padding: 2px 0 5px 8px;
}
label.discord li {
  display: flex;
  white-space: pre-line;
}
label.discord li::before {
  display: block;
  content: '';
  width: 3px;
  height: 3px;
  background-color: rgb(213 133 133);
  border-radius: 50%;
}
label.discord li::marker {
  font-size: 0;
}


ul.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 15px;
  padding: 0 3px 0 3px;
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

.loading {
  display: flex;
  position: relative;
  width: 50%;
  aspect-ratio: 1/1;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.loading .anim {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: repeating-linear-gradient(45deg, rgb(199 65 173) 50%, transparent);
  animation: 3s infinite linear roundRotate;
  animation-fill-mode: forwards;
  mask: radial-gradient(transparent 67%, rgb(0,0,0) 0%);
  -webkit-mask: radial-gradient(transparent 67%, rgb(0,0,0) 0%);
}
.loading .text {
  position: absolute;
  z-index: 1;
}

@keyframes roundRotate {
  from {
    rotate: 0deg;
  }

  to {
    rotate: 360deg;
  }
}

.hor {
  flex-direction: row !important;
}
.ver {
  flex-direction: column !important;
}

.halfL {
  flex-basis: 50%;
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

.fs10px {
  font-size: 10px;
}
`

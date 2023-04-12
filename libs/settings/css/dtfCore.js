let dtfCoreCSS = `
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Teko&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:ital,wght@0,400;1,400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@800&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sofia+Sans+Semi+Condensed:wght@400;500;600;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@400;500;600;700&display=swap');

.dtf-window :is(input, select) {
  outline: none;
}

.dtf-window .container.px label::before {
  display: inline;
  content: 'px';
  color: rgb(167 167 167);
  margin: 0 4px 0 0;
  font-size: 10px;
}

.dtf-window.commentsPreviewer {
  width: 100%;
}
.dtf-window.commentsPreviewer .preview {
  color: rgb(255 255 255);
  padding: 0 3px 3px 3px;
}

.dtf-scriptWindow input {
  outline: none;
}

.dtf-scriptWindow input[type="checkbox"] {
  padding: unset;
  margin: unset;
}

.dtf-scriptWindow input[type="color"] {
  aspect-ratio: 1/1;
  cursor: pointer;
}

.dtf-scriptWindow form {
  display: flex;
  flex-direction: column;
  gap: 6px 0;
}

.dtf-scriptWindow legend {
  width: max-content;
  font-weight: 500;
  font-size: 17px;
  font-family: 'Roboto Flex', sans-serif;
  font-family: 'Philosopher', sans-serif;
  font-family: 'Golos Text', sans-serif;
  font-family: 'Inter', sans-serif;
  font-family: 'Nunito Sans', sans-serif;
  font-family: 'Mulish', sans-serif;
  font-family: 'Sofia Sans Semi Condensed', sans-serif;
  font-weight: 600;
}
.dtf-scriptWindow .info {
  padding: 5px;
  font-size: 12px;
  font-family: 'Roboto Flex', sans-serif;
  font-family: 'Philosopher', sans-serif;
  font-family: 'Golos Text', sans-serif;
  font-family: 'Inter', sans-serif;
  font-family: 'Nunito Sans', sans-serif;
  font-family: 'Mulish', sans-serif;
  font-family: 'Sofia Sans Semi Condensed', sans-serif;
  font-weight: 500;
  border-radius: 2px;
  box-shadow: inset 0 0 3px 1px rgb(157 157 157);
}
.dtf-scriptWindow .input-label {
  font-size: 13px;
  position: relative;
  top: -2px;
  font-family: 'Golos Text', sans-serif;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-family: 'Nunito Sans', sans-serif;
  font-family: 'Mulish', sans-serif;
  font-family: 'Sofia Sans Semi Condensed', sans-serif;
  font-family: 'Philosopher', sans-serif;
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 500;
}
.dtf-scriptWindow .container :is(label) {
  font-size: 13px;
  position: relative;
  top: -2px;
  font-family: 'Golos Text', sans-serif;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-family: 'Nunito Sans', sans-serif;
  font-family: 'Mulish', sans-serif;
  font-family: 'Sofia Sans Semi Condensed', sans-serif;
  font-family: 'Philosopher', sans-serif;
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 500;
}
.dtf-scriptWindow .container {
  display: flex;
  gap: 0 5px;
}

.dtf-scriptWindow fieldset.flex {
  display: flex;
  flex-direction: column;
}
.dtf-scriptWindow fieldset.grid .list {
  display: grid;
  grid-template-columns: repeat(2, max-content);
}

.dtf-scriptWindow ul.discordText {
  display: flex;
  flex-direction: column;
  border-left: 4px solid rgb(185 59 59);
  border-radius: 3px;
  padding: 0 0 0 10px;
  margin: 0 0 0 2px;
  font-size: 13px;
  font-weight: 400;
  font-family: 'Mulish', sans-serif;
  gap: 8px 0;
  box-shadow: 0 0 3px 0px rgb(0 0 0);
}
.dtf-scriptWindow ul.discordText.alert {
  background-color: rgb(249 207 207);
  color: rgb(0 0 0);
  font-weight: 700;
}
.dtf-scriptWindow ul.discordText.info {
  background-color: rgb(139 215 172);
  color: rgb(0 0 0);
  font-weight: 700;
}
.dtf-scriptWindow li {
  white-space: pre-line;
}
.dtf-scriptWindow ul.discordText li::marker {
  font-size: 0;
}

ul.liveList {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px 10px;
}
ul.liveList.vertical {
  flex-direction: column;
  gap: 8px 0;
}

.liveList li {
  border-radius: 2px;
  padding: 0 0 0 3px;
  box-shadow: 0 0 2px 1px rgb(255 255 255);
}
.liveList li::marker {
  font-size: 0;
}

.liveList .cont {
  padding: 0 4px 0 2px;
  display: flex;
  width: max-content;
  gap: 0 10px;
}
ul.liveList.vertical .cont {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
}

ul.liveList.vertical~label {
  text-orientation: upright;
  writing-mode: vertical-rl;
  letter-spacing: -3px;
}

.liveList .value {
  min-width: 40px;
  outline: none;
}

.liveList .contB {
  display: flex;
}
.liveList .btn {
  display: inline-block;
  background-color: rgb(255 255 255);
  color: rgb(0 0 0);
  border: unset;
  border-radius: 50%;
  font-size: 10px;
  margin: auto;
  padding: 0 3px 0 4px;
  box-shadow: 0 0 1px 1px rgb(223 94 153);
}

.ui-autocomplete {
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  color: white;
  font-size: 10px;
  max-height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
  border-radius: 3px;
  box-shadow: 0px 0px 2px 0px white;
}

.ui-autocomplete li::marker {
  font-size: 0px;
  padding: unset;
  margin: unset;
}
.ui-autocomplete .ui-menu-item {
  font-size: 12px;
  color: rgb(255, 255, 255);
  margin: unset;
  padding: unset;
  cursor: pointer;
}
.ui-autocomplete .ui-menu-item:hover {
  color: red;
}

.ui-helper-hidden-accessible {
  display: none;
}

.ui-menu {
  list-style: none;
  padding: 3px;
  margin: 0;
  display: block;
  outline: 0;
}

.ui-front {
  z-index: 100;
}
`;

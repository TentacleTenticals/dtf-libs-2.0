let mainCSS = `
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Play&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500&display=swap');
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

:is(.site-header-container, .comments_updates_rail).hidden {
  display: none;
}
.layout__right-column {
  z-index: 0;
}

.comment-form {
  display: flex;
  flex-direction: column;
}

.content_editable {
  outline: none;
  min-height: 100px;
}

.container.px label::before {
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

.dtf-albumBuilder.container {
  display: flex;
  flex-direction: column;
}

.dtf-markdownPanel {
  width: 100%;
  position: relative;
  background-color: black;
  padding: 2px 1px 2px 1px;
  display: flex;
  gap: 0 0;
}
.dtf-markdownPanel .button {
  background-color: rgb(37 54 72);
  /* background-image: repeating-linear-gradient(180deg, rgb(37 54 72), rgb(56 56 56) 100%); */
  color: rgb(255, 255, 255);
  /* margin: 1px; */
  padding: 0 3px 0 3px;
  text-align: center;
  font-family: 'Fira Sans Condensed';
  min-width: 20px;
  border-radius: 2px;
  margin: 2px;
  border: unset;
  box-shadow: inset 0 0 3px 0px rgb(255 255 255);
  cursor: pointer;
}
.dtf-markdownPanel .button:hover {
  background-color: rgb(80 80 80);
}

.typeList .groupType {
  text-align: center;
  color: rgb(197 197 197);
  font-size: 13px;
  padding: 3px 0px 3px 0px;
  margin-top: 5px;
  border: 1px solid rgb(70 70 70);
  font-family: 'Raleway', sans-serif;
}
.typeList .groupType .title {
  cursor: pointer;
}

:is(.emojiPicker .groupList, .dtf-albumBuilder form, .album .list, .album
    .mask.picked, .gifSearcher .list, .ui-autocomplete)::-webkit-scrollbar {
  width: 17px;
  background: unset;
}
:is(.emojiPicker .groupList, .dtf-albumBuilder form, .album .list, .album
    .mask.picked, .gifSearcher
    .list, .ui-autocomplete)::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}
:is(.emojiPicker .groupList, .dtf-albumBuilder form, .album .list, .album
    .mask.picked, .ui-autocomplete)::-webkit-scrollbar-track-piece {
  background-color: unset;
  border: 3px solid rgba(155, 105, 105, 0);
  border-radius: 0px;
  width: 1px;
  height: 1px;
}
:is(.emojiPicker .groupList, .dtf-albumBuilder form, .album .list, .album
    .mask.picked, .gifSearcher
    .list, .ui-autocomplete)::-webkit-scrollbar-thumb {
  border: 5px solid transparent;
  border-radius: 18px;
  box-shadow: inset 0px 0px 0px 1px rgb(41 206 145 / 12%),
    inset 0px 0px 5px 1px rgb(135 185 249 / 60%),
    inset 0px 0px 0px 1px rgb(41 206 145 / 12%);
}
:is(.emojiPicker .groupList, .dtf-albumBuilder form, .album .list, .album
    .mask.picked, .gifSearcher
    .list, .ui-autocomplete)::-webkit-scrollbar-corner {
  background-color: unset;
}

.buttonPanel button {
  display: inline-flex;
  width: max-content;
  height: max-content;
  min-width: 15px;
  background-color: rgb(0 0 0);
  color: rgb(255 255 255);
  line-height: normal;
  padding: unset;
  aspect-ratio: 1/1;
  border: unset;
  border-radius: 50%;
  box-shadow: 0 0 2px 1px rgb(255 255 255);
  cursor: pointer;
}
.buttonPanel button .label {
  margin: auto;
  font-size: 10px;
}

.dtf-previewer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: black;
  color: white;
  z-index: 1;
}

.search {
  margin: auto;
  background-color: black;
  color: white;
  border: unset;
  box-shadow: inset 0px 0px 3px 1px rgb(117 49 120);
  border-radius: 3px;
  outline: none;
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
html .ui-autocomplete {
  /* height: 250px; */
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

.dtf-window {
  display: flex;
  position: absolute;
  flex-direction: column;
  width: max-content;
  background-color: black;
  top: 100%;
  padding: 3px;
  margin: 5px 0 0 0;
  border-radius: 2px;
  box-shadow: 0px 0px 3px 0px rgb(0 0 0);
  z-index: 15;
}
.dtf-window .header {
  text-align: center;
  color: rgb(255, 255, 255);
  background-color: rgb(54 43 43);
  border-radius: 2px;
  margin: 0 0 5px 0;
  box-shadow: inset 0px 0px 2px 0px rgb(173 171 171);
  cursor: pointer;
}
.dtf-window .header .label {
  font-size: 13px;
  font-family: 'Chakra Petch', sans-serif;
  letter-spacing: 0.5px;
}
.dtf-window .header .label::before {
  display: inline-block;
  content: '';
  color: black;
  top: -4px;
  left: -10px;
  width: 20%;
  height: 1px;
  position: relative;
  box-shadow: 0px 0px 1px 1px rgb(185 0 87);
}
.dtf-window .header .label::after {
  display: inline-block;
  content: '';
  color: black;
  top: -4px;
  right: -10px;
  width: 20%;
  height: 1px;
  position: relative;
  box-shadow: 0px 0px 1px 1px rgb(185 0 87);
}
`;

const ctxMenuCss = () => `
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:wght@400;500;600&display=swap');

.contextMenu {
  display: flex;
  flex-direction: column;
  gap: 5px 0;
  position: absolute;
  width: max-content;
  background-color: rgb(40,40,40);
  box-shadow: 0 0 1px 1px rgb(0,0,0);
  z-index: 1000;
}
.contextMenu>.header {
  padding: 0 3px 0 3px;
  font-size: 13px;
  text-align: center;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-family: 'Fira Sans Extra Condensed', sans-serif;
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
}

.contextMenu .list {
  display: flex;
  flex-direction: column;
  gap: 3px 3px;
  padding: 0 3px 3px 3px;
}

.contextMenu .list button {
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
  border: unset;
  width: 100%;
  border-radius: 2px;
  box-shadow: inset 0 0 3px 0 rgb(255,255,255);
  cursor: pointer;
}

.contextMenu .separator {
  font-size: 12px;
  background-color: rgb(205 178 219);
  color: rgb(0,0,0);
  text-align: center;
  border-radius: 2px;
}

.contextMenu .list .sub {
  display: flex;
  position: relative;
  background-color: rgb(0,0,0);
  color: rgb(255,255,255);
  border-radius: 2px;
  justify-content: center;
  box-shadow: inset 0 0 3px 0 rgb(255,255,255);
}
.contextMenu .list .sub .header {
  display: flex;
  align-items: center;
  gap: 0 3px;
  font-size: 12px;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-family: 'Fira Sans Extra Condensed', sans-serif;
}
.contextMenu .list .sub .header::after {
  display: flex;
  align-items: center;
  justify-content: center;
  content: '↞︎';
  transform: scale(-1, 1);
  font-size: 16px;
  aspect-ratio: 1/1;
  line-height: 0;
  margin: auto;
  border-radius: 50%;
}
.contextMenu .list .sub .subList {
  display: none;
  position: absolute;
  left: 100%;
}
.contextMenu .list .sub:hover .subList {
  display: flex;
}
.contextMenu .list .sub:hover .list {
  display: flex;
  flex-direction: column;
  padding: 3px 3px 3px 3px;
  margin: -3px 0 0 3px;
  background-color: rgb(200,0,0);
}

`;

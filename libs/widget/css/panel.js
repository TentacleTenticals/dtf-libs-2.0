const widgetCss = () => `
.widget {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    flex-direction: row;
    position: fixed;
    top: 60px;
    min-width: 20.5%;
    gap: 0 0;
    z-index: 20;
    background-color: rgb(0 0 0);
    border-radius: 0 0 9px 0;
    box-shadow: 0px 1px 3px 0px rgb(0 0 0);
  }
  .widget:hover {
    border-radius: unset;
  }

  .widget.showing {
    border-radius: unset;
  }
  .widget.showing .wList {
    display: flex;
  }
  .widget.showing .widgetPanel>.header {
    background-color: rgb(137 97 114);
    color: rgb(255 255 255);
  }

  .widget:hover .wList {
    display: flex;
  }

  .widget .wList {
    display: none;
    flex-direction: column;
    flex-grow: 1;
    gap: 3px 3px;
  }

  .widgetPanel {
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    padding: 0 0 0 0;
    border-radius: 2px;
    box-shadow: 0 0 1px 1px rgb(0,0,0);
  }
  .widgetPanel .header {
    display: flex;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    justify-content: center;
  }
  .widget .widgetPanel>.list {
    display: none;
  }
  .widget .widgetPanel:hover>.list {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 4px;
  }

  .widgetPanel .w-btn {
    display: flex;
    background-color: rgb(50,50,50);
    aspect-ratio: 1/1;
    margin: auto;
    padding: 2px;
    border-radius: 2px;
    box-shadow: 0 0 4px 0px rgb(255,255,255);
    align-items: center;
  }

  .widgetPanel .w-btn.active {
    box-shadow: inset 0 0 6px 0px rgb(140 192 231);
  }

  .widget .w-item {
    display: flex;
    flex-direction: column;
    background-color: rgb(53 53 53);
    color: rgb(255,255,255);
    padding: 2px;
  }
  .widget .w-item>.header {
    background-color: rgb(107 63 82);
    color: rgb(255 255 255);
    margin-bottom: 5px;
    padding: 0 2px 0 2px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }

  .widget .w-item .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 7px 8px;
    max-height: 90px;
    padding: 3px 2px 2px 2px;
    overflow: auto;
  }

  .w-btn {
    cursor: pointer;
  }

  .w-item.hidden {
    display: none;
  }
`

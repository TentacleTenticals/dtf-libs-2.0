const initMenu = {};
function SettingsOpenerItem(name, id, initMenu, cfg, dat){
    new El().Div({
      path: document.getElementById('DTF-scriptSettingsOpener').children[1],
      cName: 'container',
      id: `stg-DTF-${id}`,
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'scriptName',
          text: name
        });

        new El().Button({
          path: m,
          text: '🔧\uFE0E',
          cName: 'main',
          disabled: !initMenu.setSettings && true,
          onclick: () => {
            if(initMenu.setSettings) new SettingsMenu(initMenu.setSettings, cfg);
          }
        });

        new El().Button({
          path: m,
          text: '💾\uFE0E',
          cName: 'main',
          disabled: initMenu.setData ? false : true,
          onclick: () => {
            if(initMenu.setData) new DataMenu(initMenu.setData, dat);
          }
        });

        new El().Button({
          path: m,
          text: '❓\uFE0E',
          cName: 'main',
          disabled: initMenu.setInfo ? false : true,
          onclick: () => {
            if(initMenu.setInfo) new InfoMenu(initMenu.setInfo, cfg);
          }
        });
      }
    });
  };

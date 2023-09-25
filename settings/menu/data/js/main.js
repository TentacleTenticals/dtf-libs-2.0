class DataMenu {
  constructor(func, cfg, dat){
    if(document.getElementById('DTF-scriptData')) return;
    new El().Div({
      path: document.body,
      cName: 'dtf-scriptWindow data scrollMid',
      id: 'DTF-scriptData',
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          text: `Данные ${defaultCfg['scriptInfo'].name}`,
          onclick: () => {
            m.remove();
          }
        });

        this.form=new El().Form({
          path: m,
          cName: 'scrollMid',
          name: 'data',
          rtn: true
        });

        new El().Button({
          path: this.form,
          text: 'Сохранить данные',
          onclick: () => {
            new Db().settingsUpdater(dbGen(defaultCfg['scriptInfo']), new Db().getSettings(document.querySelectorAll(`div[id=DTF-scriptData] fieldset`), true), false);
            this.main.remove();
          }
        });
        
        this.dataActions = new El().Field({
          path: this.form,
          cName: 'textInfo',
          dontRead: true,
          groupName: 'data actions',
          legend: `Управление сохранёнными данными`,
          rtn: []
        });

        new El().Button({
          path: this.dataActions,
          text: 'Бэкап настроек в файл',
          title: 'Сохранение настроек в .txt файл',
          onclick: () => {
            function backupSettingsToFile(data, filename, type) {
              let file = new Blob([data], {type: type});
              if(window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, filename);
              else{
                var a = document.createElement("a"),
                url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
              }
            };
            backupSettingsToFile(JSON.stringify(cfg, null, 2), `${defaultCfg['scriptInfo'].name} ${new Date()} (бэкап настроек).txt`, 'text/plain');
          }
        });
      }
    });

    if(func) func(this.form, cfg, dat);
  }
};

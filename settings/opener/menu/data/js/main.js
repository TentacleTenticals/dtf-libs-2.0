class DataMenu {
  constructor(func){
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
          name: 'data',
          rtn: true
        });
        if(func) func(this.form, sData);
        
        this.dataActions = new El().Field({
          path: this.form,
          cName: 'textInfo hide',
          dontRead: true,
          groupName: 'data actions',
          legend: `Управление сохранёнными данными`,
          rtn: []
        });

        new El().Button({
          path: this.dataActions.children[1],
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
            backupSettingsToFile(JSON.stringify(mainCfg, null, 2), `${defaultCfg.scriptInfo.name} ${new Date()} (бэкап настроек).txt`, 'text/plain');
          }
        });
      }
    });
  }
};

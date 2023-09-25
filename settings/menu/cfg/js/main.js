class SettingsMenu {
  constructor(func, cfg){
    if(document.getElementById('DTF-scriptSettings')) return;
    new El().Div({
      path: document.body,
      cName: 'dtf-scriptWindow settings',
      id: 'DTF-scriptSettings',
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'header',
          text: `Настройки ${defaultCfg['scriptInfo'].name}`,
          onclick: () => {
            m.remove();
          }
        });

        this.form=new El().Form({
          path: m,
          name: 'settings',
          rtn: true
        });

        new El().Div({
          path: m,
          func: (c) => {
            new El().Button({
              path: c,
              text: 'Сохранить настройки',
              container: true,
              onclick: () => {
        //         console.log('STGLIST', new Db().getSettings(document.querySelectorAll(`div[id=DTF-scriptSettings] fieldset`), false))
        new Db().saveSettings(new Db().getSettings(document.querySelectorAll(`#DTF-scriptSettings fieldset`)));
        // new Db().getSettings(document.querySelectorAll(`#DTF-scriptSettings fieldset`))
               m.remove();
              }
            });

            new El().Button({
              path: c,
              text: 'Сбросить настройки',
              onclick: () => {
                cfg = structuredClone(defaultSettings);
                console.log(`Сброшены настройки, десу.`, cfg);
                this.main.remove();
              }
            });
          }
        });
      }
    });

    if(func) func(this.form, cfg);

    this.dataActions = new El().Field({
      path: this.form,
      cName: 'textInfo',
      dontRead: true,
      groupName: 'data actions',
      legend: `Управление сохранёнными данными`,
      rtn: [],
      inputs: {containers:true,
        list:[
        {
          type: 'file',
          name: 'load backup settings',
          title: 'Загрузка настроек из .txt файла',
          accepted: '.txt',
          text: 'Загрузить настройки из бэкапа',
          onchange: (e) => {
            function readSettingsBackup(submit, e){
              let fr = new FileReader();
              let path = e.target;
              fr.onloadend = (e) => {
                // console.log(JSON.parse(e.target.result));
                cfg = JSON.parse(e.target.result);
                console.log(`Настройки успешно восстановлены.`, cfg);
                new Alert({
                  type: 'Settings import',
                  text: 'Настройки успешно импортированы, но не сохранены. Переоткройте окно настроек и удостовертесь в том, что результат вас устраивает, после чего нажмите кнопку сохранения настроек.',
                  timer: 10000
                })
                path.parentNode.children[1].textContent = 'Настройки успешно загружены.';
                submit.disabled = true;
              };
              fr.onerror = (e) => {
                console.log(e);
              };
              fr.readAsText(e.target.files[0]);
            };
            readSettingsBackup(this.submit, e);
          }
        }
      ]}
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
        backupSettingsToFile(JSON.stringify(cfg, null, 2), `${cfg.srciptInfo.scriptName} ${new Date()} (бэкап настроек).txt`, 'text/plain');
      }
    });
  }
};

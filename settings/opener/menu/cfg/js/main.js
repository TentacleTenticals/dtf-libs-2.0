class SettingsMenu {
  constructor(func){
    new El().Div({
      path: document.body,
      cName: 'dtf-scriptWindow settings scrollMid',
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
          cName: 'actions',
          func: (c) => {
            new El().Button({
              path: c,
              text: 'Сохранить настройки',
              onclick: () => {
                new Promise((res, err) => {
                  new Db().saveSettings({cfg:new Db().getSettings(document.querySelectorAll(`#DTF-scriptSettings fieldset`)), res:res, err:err});
                }).then(res => {
                  if(res){
                    m.remove();
                    new Alerter({
                      title: '[Cfg save]',
                      text: `Настройки успешно сохранены!`,
                      timer: 5000
                    });
                  }
                })
              }
            });

            new El().Button({
              path: c,
              text: 'Сбросить настройки',
              onclick: () => {
                mainCfg = structuredClone(defaultSettings);
                console.log(`Сброшены настройки, десу.`, mainCfg);
                this.main.remove();
              }
            });
          }
        });
      }
    });

    if(func) func(this.form, mainCfg);

    this.dataActions = new El().Field({
      path: this.form,
      cName: 'textInfo',
      dontRead: true,
      groupName: 'data actions',
      legend: `Управление сохранёнными данными`,
      rtn: [],
      inputs: {
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
                mainCfg = JSON.parse(e.target.result);
                console.log(`Настройки успешно восстановлены.`, mainCfg);
                // new Alert({
                //   type: 'Settings import',
                //   text: 'Настройки успешно импортированы, но не сохранены. Переоткройте окно настроек и удостовертесь в том, что результат вас устраивает, после чего нажмите кнопку сохранения настроек.',
                //   timer: 10000
                // })
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
        backupSettingsToFile(JSON.stringify(mainCfg, null, 2), `${defaultCfg.scriptInfo.name} ${new Date()} (бэкап настроек).txt`, 'text/plain');
      }
    });
  }
};

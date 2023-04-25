class SettingsMenu {
  constructor(func){
    if(document.getElementById('DTF-scriptSettings')) return;
    this.main=new Div({
      path: document.body,
      cName: 'dtf-scriptWindow settings',
      id: 'DTF-scriptSettings',
      rtn: []
    });

    this.header=new Div({
      path: this.main,
      cName: 'header',
      rtn: [],
      onclick: () => {
        this.main.remove();
      }
    });
    this.label=new Div({
      path: this.header,
      cName: 'label',
      text: `Настройки ${defaultSettings['scriptInfo'].scriptName}`
    });

    this.form=new Form({
      path: this.main,
      name: 'settings',
      rtn: []
    });

    if(func) func(this.form, mainCfg);

    this.dataActions = new Field({
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
                mainCfg = JSON.parse(e.target.result);
                console.log(`Настройки успешно восстановлены.`, mainCfg);
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

    new Button({
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
        backupSettingsToFile(JSON.stringify(mainCfg, null, 2), `${mainCfg.srciptInfo.scriptName} ${new Date()} (бэкап настроек).txt`, 'text/plain');
      }
    });

    this.submit=new Button({
      path: this.form,
      text: 'Сохранить настройки',
      container: true,
      rtn: ['container'],
      onclick: () => {
//         console.log('STGLIST', new Db().getSettings(document.querySelectorAll(`div[id=DTF-scriptSettings] fieldset`), false))
        new Db().settingsUpdater(dbGen(defaultSettings['scriptInfo']), new Db().getSettings(document.querySelectorAll(`div[id=DTF-scriptSettings] fieldset`)), false);
        this.main.remove();
      }
    });
    new Button({
      path: this.submit.container,
      text: 'Сбросить настройки',
      onclick: () => {
        mainCfg = structuredClone(defaultSettings);
        console.log(`Сброшены настройки, десу.`, mainCfg);
        this.main.remove();
      }
    });
  }
};

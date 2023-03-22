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
      rtn: []
    });

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
        backupSettingsToFile(JSON.stringify(cfgMain, null, 2), `${cfgMain.srciptInfo.scriptName} ${new Date()} (бэкап настроек).txt`, 'text/plain');
      }
    })

    this.buttonContainer=document.createElement('div');
    this.buttonContainer.style=`display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: center;
    /* row-gap: 5px; */
    column-gap: 5px;
    margin-top: 3px;`;
    this.form.appendChild(this.buttonContainer);

    this.submit=document.createElement('input');
    this.submit.type='submit';
    this.submit.id='saveSettings';
    this.submit.value='Сохранить настройки';
    this.submit.onclick=() => {
      settingsUpdater(db, getSettings(document.querySelectorAll(`.DTF-scriptSettings list fieldset`)), {firstRun: false});
      this.main.remove();
    }
    this.buttonContainer.appendChild(this.submit);

    this.backToDefault=document.createElement('input');
    this.backToDefault.type='submit';
    this.backToDefault.value='Сбросить настройки';
    this.backToDefault.title='Сбросить к дефолту. Для сохранения настроек, повторно откройте меню и сохраните настройки.'
    this.backToDefault.onclick=() => {
      mainCfg = defaultSettings;
      console.log(`Сброшены настройки, десу.`, mainCfg);
    }
    this.buttonContainer.appendChild(this.backToDefault);
    
    if(func) func(this.form, mainCfg);
  }
};

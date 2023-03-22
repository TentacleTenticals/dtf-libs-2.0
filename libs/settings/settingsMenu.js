class SettingsMenu {
  constructor(func){
    if(document.getElementById('DTF-scriptSettings')) return;
    this.main=document.createElement('div');
    this.main.className='dtf-scriptWindow settings';
    this.main.id='DTF-scriptSettings';
    document.body.appendChild(this.main);

    this.header=document.createElement('div');
    this.header.className='header';
    this.main.appendChild(this.header);

    this.title=document.createElement('div');
    this.title.className='title';
    this.title.textContent=`Настройки ${defaultSettings['scriptInfo'].scriptName}`;
    this.title.style=`
      text-align: center;
      font-weight: 500;
      padding: 5px 0px 0px 0px;`;
    this.header.appendChild(this.title);

    new Button({
      path: this.header,
      text: '❌',
      title: 'Закрыть настройки',
      onclick: () => {
        this.main.remove();
      }
    })

    this.form=document.createElement('form');
    this.form.id='settings';
    this.form.action='';
    this.form.method='dialog';
    this.form.onsubmit=() => {
      // this.main.remove();
    }
    this.main.appendChild(this.form);

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
            readSettingsBackup(this.submit, e);
          }
        }
      ]}
    });

    // this.backupSettings=document.createElement('button');
    // this.backupSettings.className='btn';
    // this.backupSettings.textContent='Бэкап настроек в файл';
    // this.backupSettings.style=`
    //   width: 100%;
    //   box-shadow: 0px 0px 2px 0px black;
    //   cursor: pointer;
    // `;
    // this.backupSettings.onclick=() => {
    //   backupSettingsToFile(JSON.stringify(mainCfg, null, 0), 'DTF feeds settings.txt', 'text/plain');
    // }
    // this.main.appendChild(this.backupSettings);

    new Button({
      path: this.dataActions,
      text: 'Бэкап настроек в файл',
      title: 'Сохранение настроек в .txt файл',
      onclick: () => {
        backupSettingsToFile(JSON.stringify(cfgMain, null, 2), `${cfgMain.srciptInfo.scriptName} ${new Date()} (бэкап настроек).txt`, 'text/plain');
      }
    })

    // this.injectSettingsBackup=document.createElement('button');
    // this.injectSettingsBackup.className='btn';
    // this.injectSettingsBackup.textContent='Бэкап настроек в файл';
    // this.injectSettingsBackup.style=`
    //   width: 100%;
    //   box-shadow: 0px 0px 2px 0px black;
    //   cursor: pointer;
    // `;
    // this.backupSettings.onclick=() => {
    //   readSettingsBackup();
    // }
    // this.main.appendChild(this.injectSettingsBackup);

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
  }
};

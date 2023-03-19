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





class Uploader {
  constructor({path, host, pattern, adder}){
    this.main=document.createElement('div');
    this.main.style=`
    display: grid;
    grid-template-columns: repeat(2, max-content);
    justify-content: start;
    row-gap: 10px;
    column-gap: 5px;`
    path.appendChild(this.main);

    this.checker=document.createElement('div');
    this.checker.className='checker';
    this.main.appendChild(this.checker);

    this.button=document.createElement('div');
    this.button.className='btn';
    this.button.textContent=host;
    this.button.onclick=() => {
      if(this.input.disabled){
        this.input.disabled=false;

        this.adder=document.createElement('div');
        this.adder.id=`${host}Adder`;
        this.adder.tabindex=this.adder.setAttribute('tabindex', '-1');
        this.adder.style=`
          position: absolute;
          background: black;
          color: white;
          margin-top: -65px;`
          this.adder.onblur=() => {
            setTimeout(() => {
              this.adder.remove();
            }, 1000);
          }
        this.main.appendChild(this.adder);
        this.adder.focus();

        this.title=document.createElement('div');
        this.title.textContent=adder.text;
        this.adder.appendChild(this.title);

        this.link=document.createElement('a');
        this.link.href=adder.linkUrl;
        this.link.textContent=adder.linkText;
        this.link.target='_blank';
        this.adder.appendChild(this.link);
      }else{
        this.input.disabled=true;
        if(this.main.querySelector(`div[id=${host}Adder]`)) this.main.querySelector(`div[id=${host}Adder]`).remove();
      }
    }
    this.main.appendChild(this.button);

    this.input=new Input({
      path: path,
      text: `${host} токен`,
      disabled: true,
      pattern: pattern,
      onchange: adder.onchange,
      value: mainCfg['album items upload sites'][host] ? JSON.stringify(mainCfg['album items upload sites'][host]) : '',
      type: 'password'
    })

    if(mainCfg['album items upload sites'][host]){
      this.checker.textContent='✅';
      if(host === 'Imgur'){
        if(mainCfg['album items upload sites'][host].time){
          let time = luxon.DateTime;

          if(time.fromISO(mainCfg['album items upload sites'][host].time).plus({days:20}) > time.local()) this.checker.textContent='✅';

        }
      }
    }
    else
    this.checker.textContent='❌';
  }
}

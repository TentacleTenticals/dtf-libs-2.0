class Db{
  dbGen(i){
    return {
      indexedDB: (window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB),
      name: 'DTF scripts database',
      version: 1,
      store: i,
      key: 'id'
    };
  };
  run(d){
    if(d.mode === 'start'){
      return this.loadSettings(d);
    }else
    if(d.mode === 'restart'){
      return this.loadSettings({...d, restart:true});
    }
  }
  typeOf(t){
    return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
  }
  async loadSettings(o){
    if(db.online){
      return new Odb()[db.online]({
        run: 'find',
        type: 'settings',
        rType: 'object',
        target: 'main',
      }).then(res => {
        // console.log(res);
        if(!res){
          console.log(`[Load Settings] Не найдено сохранённых настроек, загрузка дефолта...`);
          return this.init(o);
        }else{
          console.log(`[Load Settings] Найдены сохранённые настройки, загрузка...`, res.cfg);
          return this.init({...o, settings:res.cfg});
        }
      }).catch(err => console.log(err));
    }else{
      console.log(`[Load Settings] Загрузка локальных настроек...`);
      return this.init(o);
    }
  }
  mergeSettings(defCfg, savCfg){
    let newCfg = structuredClone(defCfg);
    function getType(item){
      return Object.prototype.toString.call(item).slice(8, -1).toLowerCase();
    }
    // console.log('D', defCfg);
    // console.log('N', newCfg);
    function merge(newCfg, savCfg){
      for(var key in savCfg){
        if(key in newCfg){
          {
            if(newCfg[key]){
              if(getType(newCfg[key]) === 'array'){
                // console.log(newCfg[key].length);
                if(newCfg[key].length === 0) newCfg[key] = savCfg[key] ? savCfg[key] : newCfg[key];
              }else
              if(getType(newCfg[key]) === 'object'){
                // console.log(Object.keys(defCfg[key]).length);
                if(Object.keys(newCfg[key]).length === 0) newCfg[key] = savCfg[key] ? savCfg[key] : newCfg[key];
              }
            }
          }
          
          newCfg[key] = typeof newCfg[key] === 'object' && typeof savCfg[key] === 'object' ? merge(newCfg[key], savCfg[key]) : savCfg[key];
        }
      }
      return newCfg;
    }
    merge(newCfg, savCfg);
    console.log('[Settings Merge] Совмещение настроек успешно выполнено', newCfg);
    return newCfg;
  }
  init(o){
    if(!o.restart){
      // let cfg;
      o.settings ? mainCfg = structuredClone(this.mergeSettings(defaultCfg, o.settings)) : mainCfg = structuredClone(defaultCfg);
      OpenerItem(defaultCfg.scriptInfo.name, defaultCfg.scriptInfo.id);
      // console.log(`[Init] Инициализация скрипта успешно выполнена.`);
      o.res({result:'success', process:'init', data:mainCfg});
    }else{
      mainCfg = structuredClone(o.settings);
      // console.log(`[Init] Реинициализация скрипта успешно выполнена.`);
      o.res({result:'success', process:'reInit', data:mainCfg});
    }
    // return new Promise((res, err) => {
    //   if(!c.restart){
    //     c.settings ? mainCfg = this.mergeSettings(defaultCfg, c.settings) : mainCfg = structuredClone(defaultCfg);
    //     OpenerItem(defaultCfg.scriptInfo.name);
    //     // console.log(`[Init] Инициализация скрипта успешно выполнена.`);
    //     res({result:'success', process:'init', data:mainCfg});
    //   }else{
    //     mainCfg = structuredClone(c.settings);
    //     // console.log(`[Init] Реинициализация скрипта успешно выполнена.`);
    //     res({result:'success', process:'reInit', data:mainCfg});
    //   }
    // });
    // console.log('Coin', c);
    // if(!c.restart){
    //   c.settings ? mainCfg = this.mergeSettings(defaultCfg, c.settings) : mainCfg = structuredClone(defaultCfg);
    //   OpenerItem(defaultCfg.scriptInfo.name);
    //   console.log(`[Init] Инициализация скрипта успешно выполнена.`, mainCfg);
    //   if(c.cfg && c.cfg.start) c.cfg.start(mainCfg);
    // }else{
    //   mainCfg = structuredClone(c.settings);
    //   console.log(`[Init] Реинициализация скрипта успешно выполнена.`, mainCfg);
    //   if(c.cfg && c.cfg.restart) c.cfg.restart(mainCfg);
    // }
  };
  getSettings(arr, mode){
    let o;
    if(mode){
      o = structuredClone(mainCfg);
      delete o['script data'];
    }else o = {};
    function getValue(item, i, tag){
      let group;
      function pathCheck(group, value){
        group += `.${item.getAttribute('name')}`;
        let path = group.split('.');
        path.reduce((prev,curr,i)=>{
          if(!prev[curr]){
            if(i+1 === path.length) prev[curr] = value;
            else
            prev[curr] = {};
          }
          return prev[curr];
        }, o[arr[i].getAttribute('groupName')]);
      }
      if(item.parentNode.getAttribute('group') !== null){
        group = item.parentNode.getAttribute('group');
      }
      if(!tag){
        if(item.type === 'checkbox'){
          if(group) pathCheck(group, item.checked);
          else
          o[arr[i].getAttribute('groupName')][item.name] = item.checked;
        }else
        if(item.type.match(/text|url|color|number|password/)){
          if(group) pathCheck(group, item.value);
          else
          o[arr[i].getAttribute('groupName')][item.name] = item.value;
        }
      }else{
        if(item.tagName === 'SELECT'){
          if(group) pathCheck(group, item.value);
          else
          o[arr[i].getAttribute('groupName')][item.name] = item.value;
        }else
        if(item.tagName === 'UL'){
          function getUl(item){
            let ulItems = [];
            for(let li = 0, ul = item.children, len = ul.length; li < len; li++){
              if(item.getAttribute('type') === 'object') ulItems.push(JSON.parse(ul[li].getAttribute('value')));
              else
              if(item.getAttribute('type') === 'string') ulItems.push(ul[li].getAttribute('value'));
            }
            return ulItems;
          }
          if(group) pathCheck(group, getUl(item));
          else
          o[arr[i].getAttribute('groupName')][item.name] = getUl(item);
        }
      }
    }
    for(let i = 0; i < arr.length; i++){
      if(!arr[i].getAttribute('dontread')){
        if(!o[arr[i].getAttribute('groupName')]) o[arr[i].getAttribute('groupName')] = {};
        for(let item = 0, a = arr[i].lastChild.children; item < a.length; item++){
          if(a[item].tagName === 'FORM'){
            for(let fi = 0, form = a[item].children, length = form.length; fi < length; fi++){
              if(form[fi].tagName === 'DIV' && form[fi].className === 'container'){
                getValue(form[fi].children[0], i);
              }
            }
          }
          if(a[item].children[0]){
            if(a[item].children[0].tagName.match(/INPUT/)){
              getValue(a[item].children[0], i);
            }else
            if(a[item].children[0].tagName.match(/SELECT/)){
              getValue(a[item].children[0], i, true);
            }else
            if(a[item].children[0].tagName.match(/UL/)){
              getValue(a[item].children[0], i, true);
            }
          }
        }
      }
    }
    console.log('[Settings Getter] got settings', o);
    const setg = this.mergeSettings(defaultCfg, o);
    return setg;
  }
  saveSettings(o){
    if(db.online){
      console.log(`[Save Settings] Saving to database...`);
      new Odb()[db.online]({
        run: 'addOrUpdate',
        type: 'settings',
        target: 'main',
        db: db,
        data: {id:'main', cfg:o.cfg}
      }).then(db => {
        console.log('Yo', db);
        if(db.status === 201){
          console.log(`Success, settings is added!!!`);
          this.init({settings:o.cfg, restart:true, res:o.res, err:o.err});
        }else
        if(db.status === 204){
          console.log(`Success, settings is updated!!!`);
          this.init({settings:o.cfg, restart:true, res:o.res, err:o.err});
        }
      }).catch(err => console.log(err));
    }else{
      console.log(`[Save Settings] Saved!`);
      this.init({settings:o.cfg, restart:true, res:o.res, err:o.err});
    }
  }
}

const initCfg = {};
class Db{
  run(d){
    if(d.mode === 'start'){
      this.loadSettings(d.cfg);
    }else
    if(d.mode === 'restart'){
      this.loadSettings({...d.cfg, restart:true});
    }
  }
  loadSettings(config){
    // console.log('Loading settings...', config);
    if(db.name){
      new Odb()[db.name]({
        run: 'find',
        type: 'settings',
        target: 1,
        db: db
      }).then(res => {
        console.log(res);
        if(res.length === 0){
          console.log(`There's no saved settings, loading default...`);
          this.init({cfg:config});
        }else{
          console.log(`Founded saved settings, loading...`, res[0].cfg);
          this.init({settings:res[0].cfg, cfg:config});
        }
      }).catch(err => console.log(err));
    }else{
      console.log(`Loading local settings...`);
      this.init({cfg:config});
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
  init(c){
    if(!c.restart){
      c.settings ? mainCfg = this.mergeSettings(defaultCfg, c.settings) : mainCfg = structuredClone(defaultCfg);
      new SettingsOpener({...defaultCfg.scriptInfo});
      console.log(`[Init] Инициализация скрипта успешно выполнена.`, mainCfg);
      if(c.cfg && c.cfg.start) c.cfg.start(mainCfg);
    }else{
      mainCfg = structuredClone(c.settings);
      console.log(`[Init] Реинициализация скрипта успешно выполнена.`, mainCfg);
      if(c.cfg && c.cfg.restart) c.cfg.restart(mainCfg);
    }
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
  saveSettings(cfg){
    if(db.name){
      console.log(`[Save Settings] Saving to database...`);
      new Odb()[db.name]({
        run: 'findOrAdd',
        type: 'settings',
        target: 1,
        db: db,
        data: {cfg:cfg}
      }).then(db => {
        console.log('Yo', db);
        if(db.status === 201){
          console.log(`Success, settings is added!!!`);
          this.init({settings:cfg, restart:true});
        }else
        if(db.status === 204){
          console.log(`Success, settings is updated!!!`);
          this.init({settings:cfg, restart:true});
        }
      }).catch(err => console.log(err));
    }else{
      console.log(`[Save Settings] Saved!`);
      this.init({settings:cfg, restart:true});
    }
  }
}

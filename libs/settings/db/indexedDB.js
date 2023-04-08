let db, obs = {}, mainCfg, initCfg;

function dbGen(i){
  return {
    indexedDB: (window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB),
    name: "DTF scripts database",
    version: 1,
    store: i.storeName,
    key: "uid",
    data: {
      uid: 'settings',
      description: i.storeDesc
    }
  }
};

class Db{
  async connect(i, ver){
    return new Promise((resolve, reject) => {
      var req = indexedDB.open(i.name, ver);
      req.onsuccess = (e) => {
        console.log('[connectDB] Success!');
        i.db = e.target.result;
        if(!i.db.objectStoreNames.contains(i.store)) i.db.close() + reject({status:'fail', type:'no store', ver:ver});
        else
        resolve({status:'success', type:'connect', msg:`[connectDB] Успешно установлено соединение с датабазой.`});
      }
      req.onupgradeneeded = (e) => {
        console.log('[connectDB] Upgrade!');
        i.db = e.target.result;
        i.init = 1;
        if(!i.db.objectStoreNames.contains(i.store)){
          var store = i.db.createObjectStore(i.store, { keyPath: i.key });
          store.transaction.oncomplete = () => {
            resolve({status:'success', type:'key writing', msg:`[createDB] ${i.name}, задача по записи ключа в базу данных успешно завершена.`});
          }
          store.transaction.onerror = (err) => {
            reject({status:'fail', msg:`[createDB] ${i.name}, ${err.request.errorCode}`});
          };
        }else{
          resolve({status:'sucess', msg:'key already here'})
        }
        // resolve({status:'success', type:'create/update', msg:`[connectDB] База данных успешно создана/обновлена до новой версии.`});
      }
      req.onversionchange = (e) => {
        e.target.result.close();
      }
      req.onerror = (e) => {
        console.log('[connectDB] Error!');
        reject({status:'fail', msg:e});
      }
    });
  }
  create(i, data) {
    return new Promise((resolve, reject) => {
      if (!i.init) {
        resolve({status:'fail', type:'init', msg:`[createDB] ${i.name}, база данных не инициализирована.`})
      }
      if (!i.db.objectStoreNames.contains(i.store)) {
        var store = i.db.createObjectStore(i.store, { keyPath: i.key });
        store.transaction.oncomplete = (e) => {
          resolve({status:'success', type:'key writing', msg:`[createDB] ${i.name}, задача по записи ключа в базу данных успешно завершена.`});
        }
        store.transaction.onerror = (event) => {
          reject({status:'fail', msg:`[createDB] ${i.name}, ${event.request.errorCode}`});
        };
      }else{
        resolve({status:'sucess', msg:'key already here'})
      }
        // var trx = i.db.transaction(i.store, "readwrite").objectStore(i.store);
        // // i.data.map(row => trx.add(row));
        // trx.add(data);
    });
  }
  add(i, data){
    return new Promise((resolve, reject) => {
      var trx = i.db.transaction([i.store], "readwrite").objectStore(i.store);
  //     data.map(i => trx.add(i));
      trx.add(data);
      resolve({status:'success', type:'data writing', msg:`[addToDB] ${i.store}, задача по добавлению настроек в базу данных успешно завершена.`});
      trx.onerror = (e) => {
        reject(e);
      }
    });
  };
  async read(i, key){
    return new Promise((resolve, reject) => {
      // console.log(`[readDB] {i}`, i.db.objectStoreNames.contains('DTF-feeds'))
      var trx = i.db.transaction([i.store], "readonly").objectStore(i.store);
      // console.log('TRX', trx)
      trx = trx.get(key);
      trx.onsuccess = (e) => {
        if (!e.target.result) {
          reject({status:'fail', type:'data search', msg:`[readDB] ${i.store}, id:${key} не найден!`});
        }else{
          console.log(`Запись в базе данных ${i.name} по id:${key} успешно найдена.`)
          resolve({status:'success', type:'data search', msg:`Запись в базе данных ${i.name} по id:${key} успешно найдена.`, data:e.target.result});
        }
      }
      trx.onerror = (e) => {
        reject(e, i.store, key);
      }
    });
  }
  update(i, key, update) {
    return new Promise((resolve, reject) => {
      var trx = i.db.transaction([i.store], "readwrite").objectStore(i.store);
      var req = trx.get(key);
      req.onsuccess = (e) => {
        if(e.target.result) {
          // console.log('RES', e.target.result)
          var data = e.target.result;
          Array.from(Object.keys(update)).map((i) => {
            data[i] = update[i];
          });
          var upd = trx.put(data);
          upd.onsuccess = (e) => {
            console.log(upd)
            resolve({status:'success', type:'data update', msg:`[updateDataInDB] ${i.name}, успешно обновлена запись по id:${key}.`});
          }
        }else{
          resolve({status:'fail', type:'data update', msg:`[updateDataInDB] ${i.store}, id:${key} не найден!`});
        }
      }
      trx.onerror = (e) => {
        reject(e);
      }
    });
  }
  delete(i, key) {
    return new Promise((resolve, reject) => {
      var trx = i.db.transaction([i.store], "readwrite").objectStore(i.store);
      var req = trx.delete(key);
      console.log(`[deleteFromDB] ${i.name}, начата попытка удаления записи по id:${key}.`);
      req.onsuccess = () => {
        resolve({status:'success', type:'data deleting', msg:`[delDB] ${i.name}, запись под id:${key} успешно удалена.`});
      }
      trx.onerror = (e) => {
        reject(e);
      }
    });
  }
  async settingsLoader(i, initCfg, cfg) {
    if(!i.indexedDB){
      console.log('Ваш браузер не поддерживает базу данных `indexedDB`, которую использует данный скрипт для хранения настроек.\nБудет использоваться дефолтный список настроек...если вы всё же хотите использовать свои собственные настройки, отредактируйте скрипт, импортировав в него свои настройки.');
      return this.init(false, initCfg, cfg);
    }else
    {
      const res = (await indexedDB.databases()).find(ind => ind.name === i.name);
      if(!res){
        console.log(`[indexedDB] Базы данных ${i.name} не найдено. Будут использованы дефолтные настройки.`);
        return this.init(false, initCfg, cfg);
      }else{
        console.log(`[indexedDB] База данных ${i.name} существует.`);
        this.connect(i, res.version).then(c => {
          this.read(i, i.data.uid).then(res => {
            if(res.status === 'fail' && res.type === 'data search'){
              console.log(`[indexedDB] База данных ${i.name} существует, но нет сохранённых настроек. Будут использованы дефолтные настройки.`);
              this.init(false, initCfg, cfg);
            }else{
              console.log(`[indexedDB] В базе данных ${i.name} найдены сохранённые настройки, загружаю их.`);
              this.init(res.data.settings, initCfg, cfg);
            }
          }).catch((err, s, key) => {
            console.log(err);
            console.log(`[indexedDB] Произошла ошибка, или база данных ${i.name} существует, но нет сохранённых настроек. Будут использованы дефолтные настройки.`);
            this.init(false, initCfg, cfg);
          });
        }).catch(err => {
          if(err.status === 'fail' && err.type === 'no store'){
            this.connect(i, err.ver+1).then(c => {
              this.read(i, i.data.uid).then(res => {
                if(res.status === 'fail'){
                  console.log(`[indexedDB] База данных ${i.name} существует, но нет сохранённых настроек. Будут использованы дефолтные настройки.`);
                  this.init(false, initCfg, cfg);
                }else{
                  console.log(`[indexedDB] В базе данных ${i.name} найдены сохранённые настройки, загружаю их.`);
                  this.init(res.data.settings, initCfg, cfg);
                }
              }).catch((err, s, key) => {
                console.log(err);
                console.log(`[indexedDB] Произошла ошибка, или база данных ${i.name} существует, но нет сохранённых настроек. Будут использованы дефолтные настройки.`);
                this.init(false, initCfg, cfg);
              })
            })
          }else{
            console.log(err);
          }
        })
      }
    }
  }
  getSettings(arr, mode){
    function getValue(item, i, tag){
      // console.log('GROUP', item.parentNode.getAttribute('group'));
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
          return prev[curr]
        }, o[arr[i].getAttribute('groupName')]);
      }
      if(item.parentNode.getAttribute('group') !== null){
        // console.log('GROUP', item.parentNode.getAttribute('group'))
        group = item.parentNode.getAttribute('group');
        // let path = group.split('.');
        // function pathCheck(group, value){
        //   let path = group.split('.');
        //   path.reduce((prev,curr,i)=>{
        //     if(!prev[curr]){
        //       if(i+1 === path.length) prev[curr] = value;
        //       else
        //       prev[curr] = {};
        //     }
        //     return prev[curr]
        //   }, o[arr[i].getAttribute('groupName')]);
        // }
        // if(!o[arr[i].getAttribute('groupName')][group]) o[arr[i].getAttribute('groupName')][group] = {};
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
            for(let li = 0, ul = item.children; li < ul.length; li++){
              // console.log('ULLL: ', ul[li]);
              if(item.getAttribute('type') === 'array') ulItems.push(JSON.parse(ul[li].getAttribute('value')));
              else
              if(item.getAttribute('type') === 'string') ulItems.push(ul[li].getAttribute('value'));
            }
            // console.log('UlItems: ', ulItems);
            return ulItems;
          }
          if(group) pathCheck(group, getUl(item));
          else
          o[arr[i].getAttribute('groupName')][item.name] = getUl(item);
        }
      }
    }
    let o;
    if(mode){
      o = {
        ...mainCfg
      }
    }else o = {
      'script data': mainCfg['script data']
    }
    for(let i = 0; i < arr.length; i++){
      // console.log(arr)
      // if(arr[i].getAttribute('dontread')) console.log('Yox!', arr[i].getAttribute('dontread'));
      // if(!arr[i].getAttribute('dontread')) console.log('Fox!', arr[i].getAttribute('dontread'));
      if(!arr[i].getAttribute('dontread')){
        if(!o[arr[i].getAttribute('groupName')]) o[arr[i].getAttribute('groupName')] = {};
        for(let item = 0, a = arr[i].lastChild.children; item < a.length; item++){
          if(a[item].tagName === 'FORM'){
            // console.log('FORM', a[item].children)
            for(let fi = 0, form = a[item].children, length = form.length; fi < length; fi++){
              // console.log(form[fi]);
              if(form[fi].tagName === 'DIV' && form[fi].className === 'container'){
                console.log(form[fi].children[0]);

                getValue(form[fi].children[0], i);

                // if(form[fi].children[0].type.match(/text|url|number|password/)){
                //   o[arr[i].getAttribute('groupName')][form[fi].children[0].name] = form[fi].children[0].value;
                // }
              }
            }
            // a[item].children[0].forEach(i => {
            //   console.log(i)
            // })
          }
          if(a[item].children[0]){
            // console.log('TYPe', a[item].children[0])
            if(a[item].children[0].tagName.match(/INPUT/)){
              // a[item].children[0].type === 'checkbox' ? o[arr[i].getAttribute('groupName')][a[item].children[0].name] = a[item].children[0].checked : (a[item].children[0].checked ? o[arr[i].getAttribute('groupName')][a[item].children[0].name] = a[item].children[0].value : '');

              getValue(a[item].children[0], i);

              // if(a[item].children[0].type === 'checkbox'){
              //   o[arr[i].getAttribute('groupName')][a[item].children[0].name] = a[item].children[0].checked;
              // }

              // if(a[item].children[0].type === 'password'){
              //   console.log('Pswrd', a[item].children[0].name)
              //   o[arr[i].getAttribute('groupName')][a[item].children[0].name] = a[item].children[0].value;
              // }

              // if(a[item].children[0].type.match(/text|url|number|password/)){
              //   o[arr[i].getAttribute('groupName')][a[item].children[0].name] = a[item].children[0].value;
              // }
            }else
            // getValue(a[item].children[0], i, true);
            // if(a[item].children[0].tagName.match(/SELECT/)){
            //   o[arr[i].getAttribute('groupName')][a[item].children[0].name] = a[item].children[0].value;
            // }
            // if(a[item].children[0].tagName.match(/INPUT|SELECT/)){
            //   o[arr[i].getAttribute('groupName')][a[item].children[0].name] = (a[item].children[0].type === 'checkbox' ? a[item].children[0].checked : (a[item].children[0].checked ? a[item].children[0].value : ''));
            // }
            if(a[item].children[0].tagName.match(/SELECT/)){
              getValue(a[item].children[0], i, true);
            }else
            if(a[item].children[0].tagName.match(/UL/)){
              // console.log('UL: ', a[item].children[0]);
              getValue(a[item].children[0], i, true);
              // let ulItems = [];
              // for(let li = 0, ul = a[item].children[0].children; li < ul.length; li++){
              //   // console.log('ULLL: ', ul[li]);
              //   if(ul[li].getAttribute('value')) ulItems.push(JSON.parse(ul[li].getAttribute('value')));
              //   if(ul[li].getAttribute('string')) ulItems.push(ul[li].getAttribute('string'));
              // }
              // console.log('UlItems: ', ulItems);
              // o[arr[i].getAttribute('groupName')][a[item].children[0].getAttribute('name')] = ulItems;
            }
          }
          // a[item].children[0] ? (a[item].children[0].tagName.match(/INPUT|SELECT/) ? o[arr[i].getAttribute('groupName')][a[item].children[0].name] = (a[item].children[0].type === 'checkbox' ? a[item].children[0].checked : a[item].children[0].value) : '') : '';
        }
      }
    }
    console.log('OO: ', o);
    // this.mergeSettings(defaultSettings, o);
    return o;
  }
  settingsUpdater(i, settings, sfg){
    if(!i.indexedDB){
      console.log('Ваш браузер не поддерживает базу данных `indexedDB`, которую использует данный скрипт для хранения настроек.\nБудет использоваться дефолтный список настроек...если вы всё же хотите использовать свои собственные настройки, отредактируйте скрипт, импортировав в него свои настройки.');
      return
    }else
    {
      this.connect(i)
      .then(() => {
        this.read(i, i.data.uid).then(res => {
          if(res.status === 'success' && res.type === 'data search'){
            console.log(`В базе данных ${i.name} найдены сохранённые настройки. Будет выполнено обновление.`);
            this.update(i, i.data.uid, {...i.data, settings:settings}).then(res => {
              console.log('Upddated', res.status);
              this.init(settings, initCfg, sfg);
            }).catch(err => console.log(err))
          }
        }).catch(err => {
          if(err.status === 'fail'){
            console.log(`База данных ${i.name} существует, но не сохранённые настройки. Будут сохранены новые настройки.`);
            this.connect(i).then(res => {
              this.add(i, {...i.data, settings:settings}).then(res => {
                console.log(res)
                this.init(settings, initCfg, sfg);
              }).catch(err => {
                console.log(err)
              });
            });
          }
        })
      }).catch(err => console.log(err));
    }
  }
  mergeSettings(defCfg, savCfg){
    console.log('D', defCfg);
    let newCfg = defCfg;
    console.log('N', newCfg);
    function merge(newCfg, savCfg){
      for(var key in savCfg){
        if(key in newCfg){
          newCfg[key] = typeof newCfg[key] === 'object' && typeof savCfg[key] === 'object' ? merge(newCfg[key], savCfg[key]) : savCfg[key];
        }
      }
      return newCfg;
    }
    merge(newCfg, savCfg);
    console.log('[Settings Merge] Совмещение настроек успешно выполнено', newCfg);
    return newCfg;
  }
  init(settings, s, cfg){
    settings ? mainCfg = this.mergeSettings(defaultSettings, settings) : mainCfg = defaultSettings;
    new SettingsOpener({...defaultSettings.scriptInfo, settings:s.settings});
    // if(!document.getElementById(`stg-DTF-${s.id}`)) new SettingsItem(s.name, s.id, s.params);
    console.log(`[Init] Инициализация скрипта успешно выполнена.`, mainCfg);
    s.func(cfg);
  };
}


class Obs{
  constructor({target, cfg, mode, check, type, search, name, msg, func}){
    if(!target) return;
    if(mode === 'start'){
      this.callback = (mutationList, o) => {
        for(const mutation of mutationList){
          if(mutation.type === 'childList'){
            // console.log(mutation.target);
            if(check){
              if(!mutation.target.classList.length > 0) return;
              if(!mutation.target.classList.value.match(search)) return;
            }
            if(type){
              func(mutation.target);
            }else{
              for(let i = 0, arr = mutation.addedNodes; i < arr.length; i++){
                func(arr[i]);
              }
            }
          }
        }
      };
      obs[name] = new MutationObserver(this.callback);
      obs[name].observe(target, cfg);
      console.log(`[OBS ${name}] запущен`);
    }else
    if(mode === 'restart'){
      if(obs[name]){
        obs[name].disconnect();
        obs[name].observe(target, cfg);
        console.log(`[OBS ${name}] перезапущен`);
      }
    }
  };
};

class Css{
  styleChecker(name){
    for(let i = 0, arr = document.querySelectorAll(`style`); i < arr.length; i++){
      if(!arr[i].getAttribute('stylename')) continue;
      if(arr[i].getAttribute('stylename') === name) return true;
    }
  }
  constructor(name, css, check){
    if(check && this.styleChecker(name)) return;
    this.main=document.createElement('style');
    this.main.textContent=css;
    if(name) this.main.setAttribute('stylename', name);
    document.body.appendChild(this.main);
  }
};
function onPageLoad(run){
  {
  const log = console.log.bind(console)
  console.log = (...args) => {
    if(Array.isArray(args)){
      if(args[0]){
        if(typeof args[0] === 'string'){
          if(args[0].match(/\[ Air \] Ready.*/)){
            run();
          }
        }
      }
    }
    log(...args);
  }}
};

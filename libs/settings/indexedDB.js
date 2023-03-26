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

function init(settings, s, cfg){
  settings ? mainCfg = mergeSettings(defaultSettings, settings) : mainCfg = defaultSettings;
  new SettingsOpener({...defaultSettings.scriptInfo, settings:s.settings});
  // if(!document.getElementById(`stg-DTF-${s.id}`)) new SettingsItem(s.name, s.id, s.params);
  console.log(`[Init] Инициализация скрипта успешно выполнена.`, mainCfg);
  s.func(cfg);
};

function getSettings(arr, mode){
  function getValue(item, i, tag){
    // console.log('GROUP', item.parentNode.getAttribute('group'));
    let group;
    function pathCheck(group, value){
      group += `.${item.name}`;
      let path = group.split('.');
      // path.push(item.name);
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
      }
    }
  }
  let o;
  if(mode){
    o = {
      ...mainCfg
    }
  }else o = {
    data: mainCfg.data
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
          }
          getValue(a[item].children[0], i, true);
          // if(a[item].children[0].tagName.match(/SELECT/)){
          //   o[arr[i].getAttribute('groupName')][a[item].children[0].name] = a[item].children[0].value;
          // }
          // if(a[item].children[0].tagName.match(/INPUT|SELECT/)){
          //   o[arr[i].getAttribute('groupName')][a[item].children[0].name] = (a[item].children[0].type === 'checkbox' ? a[item].children[0].checked : (a[item].children[0].checked ? a[item].children[0].value : ''));
          // }
          if(a[item].children[0].tagName.match(/UL/)){
            // console.log('UL: ', a[item].children[0]);
            let ulItems = [];
            for(let li = 0, ul = a[item].children[0].children; li < ul.length; li++){
              // console.log('ULLL: ', ul[li]);
              if(ul[li].getAttribute('value')) ulItems.push(JSON.parse(ul[li].getAttribute('value')));
              if(ul[li].getAttribute('string')) ulItems.push(ul[li].getAttribute('string'));
              // let textArr = [];
              // for(let val = 0, values = ul[li].children; val < values.length; val++){
              //   if(values[val].classList.value.match(/value/) && values[val].textContent.length > 1){
              //     textArr.push(values[val].textContent);
              //   }
              // }
              // console.log('TextArr:', textArr);
              // ulItems.push(JSON.parse(`{${textArr}}`));
              // if(ul[li].children[0].textContent.length > 1){
              //   ulItems.push(JSON.parse(`{${ul[li].children[0].textContent}}`));
              // }
            }
            console.log('UlItems: ', ulItems);
            o[arr[i].getAttribute('groupName')][a[item].children[0].getAttribute('name')] = ulItems;
            // console.log('Items: ', ulItems);
            // o[arr[i].getAttribute('groupName')][a[item].children[0].name] = () => {
            //   let ulItems = [];
            //   for(let li = 0, ul = a[item].children[0].children; li < ul.length; li++){
            //     console.log(ul[li]);
            //     ulItems.push(ul[li].textContent);
            //   }
            //   return ulItems;
            // }
            // console.log('UlItems: ', ulItems);
          }
        }
        // a[item].children[0] ? (a[item].children[0].tagName.match(/INPUT|SELECT/) ? o[arr[i].getAttribute('groupName')][a[item].children[0].name] = (a[item].children[0].type === 'checkbox' ? a[item].children[0].checked : a[item].children[0].value) : '') : '';
      }
    }
  }
  console.log('OO: ', o);
  mergeSettings(defaultSettings, o);
  return o;
}

function mergeSettings(defCfg, savCfg){
  let newCfg = defCfg;
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

function mergeSettings1(def, sav){
  function getType(item){
      return Object.prototype.toString.call(item).slice(8, -1).toLowerCase();
  }
  let tg = {};
  for(let item in def){
    if(getType(def[item]).match(/object/)){
      tg[item] = {};
      for(let i2 in def[item]){
        if(getType(def[item][i2]).match(/object/)){
          tg[item][i2] = {};
          for(let i3 in def[item][i2]){
            if(getType(def[item][i3]).match(/object/)){
              tg[item][i2][i3] = {};
            }else
            if(getType(def[item][i2][i3]).match(/string|number|symbol|array|boolean/)){
              sav[item][i2] ? (sav[item][i2][i3] === undefined ? tg[item][i2][i3] = def[item][i2][i3] : tg[item][i2][i3] = sav[item][i2][i3]) : tg[item][i2][i3] = def[item][i2][i3];
            }
          }
        }else
        if(getType(def[item][i2]).match(/string|number|symbol|array|boolean/)){
          sav[item] ? (sav[item][i2] === undefined ? tg[item][i2] = def[item][i2] : tg[item][i2] = sav[item][i2]) : tg[item][i2] = def[item][i2];
        }
      }
    }else
    if(getType(def[item]).match(/string/)){
      sav[item] === undefined ? tg[item] = def[item] : tg[item] = sav[item];
    }
  }
  console.log(`[Settings merge] Настройки успешно совмещены`);
  // new Alert({
  //   type: 'Settings merge',
  //   text: 'Настройки успешно обновлены!',
  //   timer: 1000
  // })
  return tg;
};

async function connectDB(db, resolve, reject) {
  return new Promise((resolve, reject) => {
    var req = indexedDB.open(db.name, db.version);
    req.onsuccess = (ev) => {
      console.log('[connectDB] Success!');
      db.connect = ev.target.result;
      resolve({status:'success', type:'connect', msg:`[connectDB] Успешно установлено соединение с датабазой.`});
    }
    req.onupgradeneeded = (event) => {
      console.log('[connectDB] Upgrade!');
      db.connect = event.target.result;
      db.init = 1;
      if (!db.connect.objectStoreNames.contains(db.store)) {
        var store = db.connect.createObjectStore(db.store, { keyPath: db.key });
        store.transaction.oncomplete = (e) => {
          resolve({status:'success', type:'key writing', msg:`[createDB] ${db.name}, задача по записи ключа в базу данных успешно завершена.`});
        }
        store.transaction.onerror = (event) => {
          reject({status:'fail', msg:`[createDB] ${db.name}, ${event.request.errorCode}`});
        };
      }else{
        resolve({status:'sucess', msg:'key already here'})
      }
      // resolve({status:'success', type:'create/update', msg:`[connectDB] База данных успешно создана/обновлена до новой версии.`});
    }
    req.onerror = (e) => {
      console.log('[connectDB] Error!');
      reject({status:'fail', msg:e});
    }
  });
}
function createDB(db, data) {
  return new Promise((resolve, reject) => {
    if (!db.init) {
      resolve({status:'fail', type:'init', msg:`[createDB] ${db.name}, база данных не инициализирована.`})
    }
    if (!db.connect.objectStoreNames.contains(db.store)) {
      var store = db.connect.createObjectStore(db.store, { keyPath: db.key });
      store.transaction.oncomplete = (e) => {
        resolve({status:'success', type:'key writing', msg:`[createDB] ${db.name}, задача по записи ключа в базу данных успешно завершена.`});
      }
      store.transaction.onerror = (event) => {
        reject({status:'fail', msg:`[createDB] ${db.name}, ${event.request.errorCode}`});
      };
    }else{
      resolve({status:'sucess', msg:'key already here'})
    }
      // var trx = db.connect.transaction(db.store, "readwrite").objectStore(db.store);
      // // db.data.map(row => trx.add(row));
      // trx.add(data);
  });
}
function addToDB(db, data) {
  return new Promise((resolve, reject) => {
    var trx = db.connect.transaction([db.store], "readwrite").objectStore(db.store);
//     data.map(i => trx.add(i));
    trx.add(data);
    resolve({status:'success', type:'data writing', msg:`[addToDB] ${db.store}, задача по добавлению настроек в базу данных успешно завершена.`});
    trx.onerror = (e) => {
      reject(e);
    }
  });
};
async function readDB(db, key) {
  return new Promise((resolve, reject) => {
    var trx = db.connect.transaction([db.store], "readonly").objectStore(db.store);
    trx = trx.get(key);
    trx.onsuccess = (e) => {
      if (!e.target.result) {
        reject({status:'fail', type:'data search', msg:`[readDB] ${db.store}, id:${key} не найден!`});
      }else
      {
        console.log(`Запись в базе данных ${db.name} по id:${key} успешно найдена.`)
        resolve({status:'success', type:'data search', msg:`Запись в базе данных ${db.name} по id:${key} успешно найдена.`, data:e.target.result});
      }
    }
    trx.onerror = (e) => {
      reject(e);
    }
  });
}
function updateDataInDB(db, key, update) {
  return new Promise((resolve, reject) => {
    var trx = db.connect.transaction([db.store], "readwrite").objectStore(db.store);
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
          resolve({status:'success', type:'data update', msg:`[updateDataInDB] ${db.name}, успешно обновлена запись по id:${key}.`});
        }
      }else
      {
        resolve({status:'fail', type:'data update', msg:`[updateDataInDB] ${db.store}, id:${key} не найден!`});
      }
    }
    trx.onerror = (e) => {
      reject(e);
    }
  });
}
function deleteFromDB(db, key) {
  return new Promise((resolve, reject) => {
    var trx = db.connect.transaction([db.store], "readwrite").objectStore(db.store);
    var req = trx.delete(key);
    console.log(`[deleteFromDB] ${db.name}, начата попытка удаления записи по id:${key}.`);
    req.onsuccess = () => {
      resolve({status:'success', type:'data deleting', msg:`[delDB] ${db.name}, запись под id:${key} успешно удалена.`});
    }
    trx.onerror = (e) => {
      reject(e);
    }
  });
}

async function settingsLoader(db, initCfg, cfg) {
  if(!db.indexedDB){
    console.log('Ваш браузер не поддерживает базу данных `indexedDB`, которую использует данный скрипт для хранения настроек.\nБудет использоваться дефолтный список настроек...если вы всё же хотите использовать свои собственные настройки, отредактируйте скрипт, импортировав в него свои настройки.');
    return init(false, initCfg, cfg);
  }else
  {
    if(!(await indexedDB.databases()).map(ind => ind.name).includes(db.name)){
      console.log(`[indexedDB] Базы данных ${db.name} не найдено. Будут использованы дефолтные настройки.`);
        return init(false, initCfg, cfg);
    }else{
      console.log(`[indexedDB] База данных ${db.name} существует. Сейчас я проверю её на наличие сохранённых настроек.`);
      connectDB(db)
      .then(() => {
        readDB(db, db.data.uid).then(res => {
          if(res.status === 'fail'){
            console.log(`[indexedDB] База данных ${db.name} существует, но нет сохранённых настроек. Будут использованы дефолтные настройки.`);
            init(false, initCfg, cfg);
          }else
          {
            console.log(`[indexedDB] В базе данных ${db.name} найдены сохранённые настройки, загружаю их.`);
            init(res.data.settings, initCfg, cfg);
          }
        }).catch(err => {
          console.log(err)
          console.log(`[indexedDB] Произошла ошибка, или база данных ${db.name} существует, но нет сохранённых настроек. Будут использованы дефолтные настройки.`);
          init(false, initCfg, cfg);
        })
      }).catch(err => console.log(err));
    }
  }
}
function settingsUpdater(db, settings, sfg){
  if(!db.indexedDB){
    console.log('Ваш браузер не поддерживает базу данных `indexedDB`, которую использует данный скрипт для хранения настроек.\nБудет использоваться дефолтный список настроек...если вы всё же хотите использовать свои собственные настройки, отредактируйте скрипт, импортировав в него свои настройки.');
    return
  }else
  {
    connectDB(db)
    .then(() => {
      readDB(db, db.data.uid).then(res => {
        if(res.status === 'success' && res.type === 'data search'){
          console.log(`В базе данных ${db.name} найдены сохранённые настройки. Будет выполнено обновление.`);
          updateDataInDB(db, db.data.uid, {...db.data, settings:settings}).then(res => {
            console.log('Upddated', res.status);
            init(settings, initCfg, sfg);
          }).catch(err => console.log(err))
        }
      }).catch(err => {
        if(err.status === 'fail'){
          console.log(`База данных ${db.name} существует, но не сохранённые настройки. Будут сохранены новые настройки.`);
          connectDB(db).then(res => {
            addToDB(db, {...db.data, settings:settings}).then(res => {
              console.log(res)
              init(settings, initCfg, sfg);
            }).catch(err => {
              console.log(err)
            });
          });
        }
      })
    }).catch(err => console.log(err));
  }
};

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
  constructor(name, css){
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

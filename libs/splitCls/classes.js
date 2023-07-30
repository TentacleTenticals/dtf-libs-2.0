class El{
  Div({ path, addBefore, cName, id, text, label, title, attr, name, group, tab, value, valueName, editable, style, onclick, onkeydown, onkeyup, onwheel, onfocus, onblur, onpaste, onmouseenter, onmouseleave, rtn, func }){
    this.main = document.createElement('div');
    if(cName) this.main.className = cName;
    if(id) this.main.id = id;
    if(text) this.main.textContent = text;
    if(title) this.main.title = title;
    if(attr) this.main.setAttribute(attr[0], attr[1]);
    if(name) this.main.setAttribute('name', name);
    if(group) this.main.setAttribute('group', group);
    if(tab) this.main.tabIndex = tab;
    if(editable) this.main.setAttribute('contenteditable', true);
    if(style) this.main.style = style;
    if(onclick) this.main.onclick = onclick;
    if(onkeyup) this.main.onkeyup = onkeyup;
    if(onkeydown) this.main.onkeydown = onkeydown;
    if(onwheel) this.main.onwheel = onwheel;
    if(onfocus) this.main.onfocus = onfocus;
    if(onblur) this.main.onblur = onblur;
    if(onpaste) this.main.onpaste = onpaste;
    if(onmouseenter) this.main.onmouseenter = onmouseenter;
    if(onpointerenter) this.main.onpointerenter = onpointerenter;
    if(label) this.label = new Div({
      path: this.main,
      cName: 'title',
      text: label
    });
    addBefore ? path.insertBefore(this.main, addBefore) : path.appendChild(this.main);

    if(func) func(this.main);
    if(rtn) {
      if(!rtn.length > 0) return this.main;
      this.obj = {};
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    }
  };
  Button({ path, cName, id, text, label, container, style, onclick, disabled, rtn }){
    this.main = document.createElement('button');
    if(container) {
      this.container = new Div({
        path: path,
        cName: typeof container === 'boolean' ? 'container' : container.cName,
        group: container.g,
        rtn: []
      });
    }
    if(cName) this.main.className = cName;
    if(id) this.main.id = id;
    if(text) this.main.textContent = text;
    if(style) this.main.style = style;
    if(onclick) this.main.onclick = onclick;
    if(disabled) this.main.disabled = disabled;
    (container ? this.container : path).appendChild(this.main);

    if(label) this.mainLabel = new Div({
      path: this.main,
      cName: 'label',
      text: label
    });

    if(rtn) {
      if(!rtn.length > 0 && !container) return this.main;
      this.obj = {};
      if(container) this.obj.container = this.container;
      rtn.forEach(e => {
        if(e) this.obj[e] = this[e];
      })
      return this.obj;
    }
  };
  Image({path, cName, url, text, title, scale, style, loading, onclick}){
    this.main=document.createElement('img');
    if(cName) this.main.className=cName;
    if(url) this.main.src=url;
    if(text) this.main.setAttribute('text', text);
    if(title) this.mian.title=title;
    loading ? this.main.loading=loading : this.main.loading='lazy';
    if(style) this.main.style=style;
    if(scale) this.main.style.scale=scale;
    if(onclick) this.main.onclick=onclick;
    path.appendChild(this.main);
  };
  Video({path, cName, url, poster, autoplay, loop, muted, controls, pIp, text, style, preload, onclick, onplay, onpause, onended, rtn}){
    this.main=document.createElement('video');
    if(cName) this.main.className=cName;
    if(url) this.main.src=url;
    if(poster) this.main.poster=poster;
    if(text) this.main.setAttribute('text', text);
    preload ? this.main.preload=preload : this.main.preload='none';
    if(autoplay) this.main.autoplay=autoplay;
    if(muted) this.main.muted=muted;
    if(loop) this.main.loop=loop;
    if(controls) this.main.controls=controls;
    pIp ? this.main.disablePictureInPicture=false : this.main.disablePictureInPicture=true;
    if(style) this.main.style=style;
    if(onclick) this.main.onclick=onclick;
    if(onplay) this.main.onplay=onplay;
    if(onpause) this.main.onpause=onpause;
    if(onended) this.main.onended=onended;
    path.appendChild(this.main);

    if(rtn) {
      if(!rtn.length > 0) return this.main;
      this.obj={};
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    }
  };
  A({path, text, url, cName, id, onclick, rtn}){
    this.main=document.createElement('a');
    if(cName) this.main.className=cName;
    if(id) this.main.id=id;
    if(text) this.main.textContent=text;
    if(url) this.main.href=url;
    this.main.target='_blank';
    if(onclick) this.main.onclick = (e) => {
      e.preventDefault()
      e.stopImmediatePropagation();
      window.open(e.target.href, '_blank');
    }
    path.appendChild(this.main);
    if(rtn) return this.main;
  }
  styleChecker(name){
    for(let i = 0, arr = document.querySelectorAll(`style`); i < arr.length; i++){
      if(!arr[i].getAttribute('stylename')) continue;
      if(arr[i].getAttribute('stylename') === name) return true;
    }
  };
  Css(name, css, check) {
    if(check && this.styleChecker(name)) return;
    this.main = document.createElement('style');
    this.main.textContent = css;
    if(name) this.main.setAttribute('stylename', name);
    document.body.appendChild(this.main);
  };
  Obs({target, cfg, mode, check, type, search, name, msg, func}){
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
  onPageLoad(run){
    {
    const log = console.log.bind(console);
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
};

const obs = {};
class El{
  Div({ path, addBefore, cName, id, text, label, title, attr, name, group, tab, value, valueName, editable, style, onclick, onRclick, onkeydown, onkeyup, onwheel, onfocus, onblur, onpaste, onmouseenter, onmouseleave, focus, rtn, func }){
    const main= document.createElement('div');
    if(cName) main.className = cName;
    if(id) main.id = id;
    if(text) main.textContent = text;
    if(title) main.title = title;
    if(attr) main.setAttribute(attr[0], attr[1]);
    if(name) main.setAttribute('name', name);
    if(group) main.setAttribute('group', group);
    if(tab) main.tabIndex = tab;
    if(editable) main.setAttribute('contenteditable', true);
    if(style) main.style = style;
    if(onclick) main.onmousedown = onclick;
    if(onRclick) main.oncontextmenu = onRclick;
    if(onkeyup) main.onkeyup = onkeyup;
    if(onkeydown) main.onkeydown = onkeydown;
    if(onwheel) main.onwheel = onwheel;
    if(onfocus) main.onfocus = onfocus;
    if(onblur) main.onblur = onblur;
    if(onpaste) main.onpaste = onpaste;
    if(onmouseenter) main.onmouseenter = onmouseenter;
    if(onpointerenter) main.onpointerenter = onpointerenter;
    if(label) this.label = new Div({
      path: main,
      cName: 'title',
      text: label
    });
    addBefore ? path.insertBefore(main, addBefore) : path.appendChild(main);

    if(func) func(main);
    if(rtn) {
      if(!rtn.length > 0) return main;
      this.obj = {};
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    }
    if(focus) main.focus();
  };
  Button({path, cName, id, title, text, label, container, style, onclick, disabled, rtn}){
    const main= document.createElement('button');
    if(container) {
      this.container = new Div({
        path: path,
        cName: typeof container === 'boolean' ? 'container' : container.cName,
        group: container.g,
        rtn: []
      });
    }
    if(cName) main.className = cName;
    if(title) main.title=title;
    if(id) main.id = id;
    if(text) main.textContent = text;
    if(style) main.style = style;
    if(onclick) main.onclick = onclick;
    if(disabled) main.disabled = disabled;
    (container ? this.container : path).appendChild(main);

    if(label) this.mainLabel = new Div({
      path: main,
      cName: 'label',
      text: label
    });

    if(rtn) {
      if(!rtn.length > 0 && !container) return main;
      this.obj = {};
      if(container) this.obj.container = this.container;
      rtn.forEach(e => {
        if(e) this.obj[e] = this[e];
      })
      return this.obj;
    }
  };
  Image({path, cName, url, text, title, scale, style, loading, onclick}){
    const main=document.createElement('img');
    if(cName) main.className=cName;
    if(url) main.src=url;
    if(text) main.setAttribute('text', text);
    if(title) main.title=title;
    loading ? main.loading=loading : main.loading='lazy';
    if(style) main.style=style;
    if(scale) main.style.scale=scale;
    if(onclick) main.onclick=onclick;
    path.appendChild(main);
  };
  Video({path, cName, url, poster, autoplay, loop, muted, controls, pIp, text, style, preload, onclick, onplay, onpause, onended, rtn}){
    const main=document.createElement('video');
    if(cName) main.className=cName;
    if(url) main.src=url;
    if(poster) main.poster=poster;
    if(text) main.setAttribute('text', text);
    preload ? main.preload=preload : main.preload='none';
    if(autoplay) main.autoplay=autoplay;
    if(muted) main.muted=muted;
    if(loop) main.loop=loop;
    if(controls) main.controls=controls;
    pIp ? main.disablePictureInPicture=false : main.disablePictureInPicture=true;
    if(style) main.style=style;
    if(onclick) main.onclick=onclick;
    if(onplay) main.onplay=onplay;
    if(onpause) main.onpause=onpause;
    if(onended) main.onended=onended;
    path.appendChild(main);

    if(rtn) {
      if(!rtn.length > 0) return main;
      this.obj={};
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    }
  };
  A({path, text, url, cName, id, onclick, rtn}){
    const main=document.createElement('a');
    if(cName) main.className=cName;
    if(id) main.id=id;
    if(text) main.textContent=text;
    if(url) main.href=url;
    main.target='_blank';
    if(onclick) main.onclick = (e) => {
      e.preventDefault()
      e.stopImmediatePropagation();
      window.open(e.target.href, '_blank');
    }
    path.appendChild(main);
    if(rtn) return main;
  }

  Input({path, container, type, cName, lName, name, id, text, datalist, label, title, value, autocomplete, list, accepted, pattern, placeholder, min, max, step, checked, disabled, required, auto, onclick, onchange, onfocus, onblur, onpaste, onRclick, onkeydown, onkeyup, style, rtn}){
    if(label) this.l=this.Label({
      path: path,
      cName: lName,
      text: label,
      rtn: true
    });
    const main=document.createElement('input');
    if(cName) main.className=cName;
    if(text) main.textContent=text;
    if(name) main.name=name;
    if(type) main.type=type;
    if(style) main.style=style;
    if(id) main.id=id;
    if(title) main.title=title;
    if(required) main.setAttribute('required', '');
    if(checked) main.checked=checked;
    if(disabled) main.disabled=true;
    if(list) main.setAttribute('list', list);
    if(value) main.value=value;
    autocomplete ? main.autocomplete=autocomplete : main.autocomplete='off';
    if(datalist) main.list=datalist;
    if(accepted) main.accepted=accepted;
    if(pattern) main.pattern=pattern;
    if(placeholder) main.placeholder=placeholder;
    if(min) main.min=min;
    if(max) main.max=max;
    if(step) main.step=step;
    if(auto) main.autocomplete=auto;
    if(onclick) main.onclick=onclick;
    if(onchange) main.onchange=onchange;
    if(onfocus) main.onfocus=onfocus;
    if(onblur) main.onblur=onblur;
    if(onpaste) main.onpaste=onpaste;
    if(onkeydown) main.onkeydown=onkeydown;
    if(onkeyup) main.onkeyup=onkeyup;
    if(onRclick) main.oncontextmenu=onRclick;
    // if(!container) path.appendChild(main);
    // else
    // if(container) this.container.appendChild(main);
    (label ? this.l : path).appendChild(main);

    if(rtn){
      if(!rtn.length > 0 && !container) return main;
      this.obj={};
      if(container) this.obj.container = this.container;
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    };
  }

  Select({path, id, label, body, onchange, onfocus, rtn}){
    if(label) this.l=this.Label({
      path: path,
      text: label,
      rtn: true
    });
    const main=document.createElement('select');
    if(id) main.id=id;
    if(onchange) main.onchange=onchange;
    if(onfocus) main.onfocus=onfocus;
    (label ? this.l : path).appendChild(main);

    if(body) body(main);
  }
  Option({path, value}){
    const main=document.createElement('option');
    main.value=value[0];
    main.textContent=value[1];
    path.appendChild(main);
  }
  Options({path, values}){
    values.forEach(e => {
      this.Option({
        path: path,
        value: e,
      });
    });
  }
  OptGroup({path, label, option, options, rtn}){
    const main=document.createElement('optgroup');
    main.label=label;
    if(option) this.Option({
      path: main,
      text: option
    });
    if(options) options.forEach(e => {
      this.Option({
        path: main,
        value: e[0],
        text: e[1]
      })
    });
    path.appendChild(main);

    if(rtn){
      if(!rtn.length > 0) return main;
      const obj={};
      rtn.forEach(e => {
        if(e) obj[e] = this[e];
      })
      return obj;
    }
  }

  Datalist({path, values, id}){
    const main=document.createElement('datalist');
    main.id=id;
    values.forEach(e => {
      this.Opt(main, e);
    })

    path.appendChild(main);
  }
  Opt(path, value){
    const main=document.createElement('option');
    main.value=value;
    path.appendChild(main);
  }

  List({path, cName, lName, items, type, mode, title, label, focus, canDel, onRclick, btn}){
    const main=document.createElement('ul');
    if(cName) main.className=cName;
    if(type) main.setAttribute('type', type);
    if(onRclick) main.oncontextmenu=onRclick;
    if(mode && mode === 'all') main.onclick = (e) => {
      if(e.target.nodeName !== 'UL') return;
      this.iList({
        path: main,
        mode: mode,
        btn: items && items[0].btn,
        focus: focus,
        canDel: canDel
      });
    }
    

    if(items) items.forEach(e => {
      this.iList({
        path: main,
        cName: e.cName,
        title: e.title,
        text: e.text,
        value: e.value,
        mode: mode,
        btn: e.btn,
        focus: focus,
        canDel: canDel
      })
    })
    if(label) this.Label({
      path: path,
      cName: `list${lName && ` ${lName}`||''}`,
      text: label,
      title: title,
      rtn: true,
      onclick: (e) => {
        e.preventDefault();
      }
    }).appendChild(main);
    else{
      if(title) main.title=title;
      path.appendChild(main);
    }
  }
  iList({path, cName, text, title, value, mode, btn, focus, canDel}){
    const main=document.createElement('li');
    if(mode){
      if(value) main.setAttribute('value', value);
      if(mode.match(/all|delete/)){
        this.Div({
          path: main,
          cName: 'value',
          text: value,
          editable: mode.match(/all|edit/) ? true : false,
          onblur: (e) => {
            if(e.target.textContent) main.setAttribute('value', e.target.textContent);
          },
          onkeydown: (e) => {
            if(e.key === 'Enter'){
              e.preventDefault();
              this.iList({
                path: main.parentNode,
                mode: mode,
                btn: btn,
                focus: focus,
                canDel: canDel
              })
            }
          }
        });
        const buttons=this.Div({
          path: main,
          cName: 'buttons',
          rtn: true
        });
        if(btn) btn(buttons);
        this.Button({
          path: buttons,
          cName: 'del',
          text: 'x',
          onclick: (e) => {
            if(main.parentNode.children.length > 1||canDel) e.currentTarget.parentNode.parentNode.remove();
          }
        });
      }
    }else{
      main.textContent=text;
      if(btn){
        this.Div({
          path: main,
          cName: 'buttons',
          func: (b) => {
            btn.forEach(e => {
              this.Button({
                path: b,
                text: e.text,
                onclick: e.onclick
              })
            })
          }
        });
      }
    }
    if(cName) main.className=cName;
    if(title) main.title=title;
    path.appendChild(main);
    if(focus) main.children[0].focus();
  }

  
  Label({path, cName, text, title, onclick, body, rtn}){
    const main=document.createElement('label');
    if(cName) main.className=cName;
    if(title) main.title=title;
    main.textContent=text;
    if(onclick) main.onclick=onclick;
    path.appendChild(main);

    if(body) body(main);

    if(rtn){
      if(!rtn.length > 0) return main;
      const obj={};
      rtn.forEach(e => {
        if(e) obj[e] = this[e];
      })
      return obj;
    }
  }


  styleChecker(name){
    for(let i = 0, arr = document.querySelectorAll(`style`); i < arr.length; i++){
      if(!arr[i].getAttribute('stylename')) continue;
      if(arr[i].getAttribute('stylename') === name) return true;
    }
  };
  Css(name, css, check) {
    if(check && this.styleChecker(name)) return;
    const main= document.createElement('style');
    main.textContent = css;
    if(name) main.setAttribute('stylename', name);
    document.body.appendChild(main);
  };
  Obs({obs, target, cfg, mode, check, type, search, name, msg, func}){
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
              run({page:'def', status:'ready'});
            }else
            if(args[0].match(/\[Editor in popup\] Ready.*/)){
              run({page:'editor', status:'ready'});
            }else
            if(args[0].match(/\[Editor in popup\] Closed.*/)){
              run({page:'editor', status:'closed'});
            }
          }
        }
      }
      log(...args);
    }}
  };
};

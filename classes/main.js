class El{
  Div(o){
    const main=document.createElement('div');
    if(o.cName) main.className = o.cName;
    if(o.id) main.id = o.id;
    if(o.text) main.textContent = o.text;
    if(o.title) main.title = o.title;
    if(o.attr) main.setAttribute(o.attr[0], o.attr[1]);
    if(o.name) main.setAttribute('name', o.name);
    if(o.group) main.setAttribute('group', o.group);
    if(o.tab) main.tabIndex = o.tab;
    if(o.editable) main.setAttribute('contenteditable', true);
    if(o.style) main.style = o.style;
    if(o.onclick) main.onmousedown = o.onclick;
    if(o.onRclick) main.oncontextmenu = o.onRclick;
    if(o.onkeyup) main.onkeyup = o.onkeyup;
    if(o.onkeydown) main.onkeydown = o.onkeydown;
    if(o.onwheel) main.onwheel = o.onwheel;
    if(o.onfocus) main.onfocus = o.onfocus;
    if(o.onfocusin) main.onfocusin = o.onfocusin;
    if(o.onfocusout) main.onfocusout = o.onfocusout;
    if(o.onblur) main.onblur = o.onblur;
    if(o.onpaste) main.onpaste = o.onpaste;
    if(o.onmouseenter) main.onmouseenter = o.onmouseenter;
    if(o.onpointerenter) main.onpointerenter = o.onpointerenter;
    if(o.label) this.label = new Div({
      path: main,
      cName: 'title',
      text: o.label
    });
    o.addBefore ? o.path.insertBefore(main, o.addBefore) : o.path.appendChild(main);

    if(o.func) o.func(main);
    if(o.focus) main.focus();
    if(o.rtn) return main;
  };
  Button({path, cName, id, title, text, label, container, style, onclick, disabled, rtn}){
    const main= document.createElement('button');
    if(container) {
      this.container = this.Div({
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
    if(onclick) main.onmousedown = onclick;
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
    if(onclick) main.onmousedown=onclick;
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
    if(onclick) main.onmousedown=onclick;
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
    if(onclick) main.onmousedown = (e) => {
      e.preventDefault()
      e.stopImmediatePropagation();
      window.open(e.target.href, '_blank');
    }
    path.appendChild(main);
    if(rtn) return main;
  }

  Input({path, container, type, cName, lName, lAttr, name, id, text, datalist, label, title, value, autocomplete, list, accepted, pattern, placeholder, min, max, step, checked, disabled, required, auto, onclick, onchange, onfocus, onblur, onpaste, onRclick, onkeydown, onkeyup, style, rtn}){
    if(label) this.l=this.Label({
      path: path,
      cName: lName,
      text: label,
      attr: lAttr,
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
    if(onclick) main.onmousedown=onclick;
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

  Select({path, id, name, value, label, lName, lAttr, options, body, onchange, onfocus, rtn}){
    if(label) this.l=this.Label({
      path: path,
      cName: lName,
      text: label,
      attr: lAttr,
      rtn: true
    });
    const main=document.createElement('select');
    if(id) main.id=id;
    if(name) main.name=name;
    if(onchange) main.onchange=onchange;
    if(onfocus) main.onfocus=onfocus;
    if(options) options.forEach(e => {
      this.Option({
        path: main,
        value: e,
      });
    });
    if(value) main.value=value;
    (label ? this.l : path).appendChild(main);

    if(body) body(main);
  }
  Option({path, value}){
    const main=document.createElement('option');
    main.textContent=value[0];
    main.value=value[1];
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

  Tarea(c){
    const main=document.createElement('textarea');
    if(c.name) main.name=c.name;
    if(c.cName) main.className=c.cName;
    if(c.id) main.id=c.id;
    if(c.placeholder) main.placeholder=c.placeholder;
    if(c.rows) main.rows=c.rows;
    if(c.cols) main.cols=c.cols;
    if(c.text) main.textContent=c.text;
    c.path.appendChild(main);
  }

  Dialog(c){
    const main=document.createElement('dialog');
    if(c.name) main.name=c.name;
    if(c.cName) main.className=c.cName;
    if(c.id) main.id=c.id;
    if(c.text) main.textContent=c.text;
    if(c.onclose) main.onclose=c.onclose;
    if(c.func) c.func(main);
    c.path.appendChild(main);
    if(c.show) main.show();
    if(c.showM) main.showModal();
  }

  loading(c){
    const main=this.Div({
      path: c.path,
      cName: 'loading',
      rtn: c.rtn,
      func: (r) => {
        new El().Div({
          path: r,
          cName: 'anim'
        });
        if(c.text) this.Div({
          path: r,
          cName: 'text',
          text: c.text
        });
      }
    });
    if(c.rtn) return main;
  };

  typeOf(target){
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
  }

  List({path, cName, lName, items, name, type, mode, title, label, lAttr, focus, canDel, onRclick, btn}){
    const main=document.createElement('ul');
    if(cName) main.className=cName;
    if(name) main.setAttribute('name', name);
    if(type) main.setAttribute('type', type);
    if(onRclick) main.oncontextmenu=onRclick;
    if(mode && mode === 'all') main.onmousedown = (e) => {
      if(e.target.nodeName !== 'UL') return;
      this.iList({
        path: main,
        mode: mode,
        btn: items && items.lnegth > 0 && items[0].btn,
        focus: focus,
        canDel: canDel
      });
    }
    

    if(items) items.forEach(e => {
      const type = this.typeOf(e);

      if(type === 'string') this.iList({
        path: main,
        value: e,
        mode: mode,
        btn: btn,
        focus: focus,
        canDel: canDel
      })
      else
      if(type === 'object') this.iList({
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
      cName: /*`iList${lName && ` ${lName}`||''}`*/ lName||'iList',
      text: label,
      attr: lAttr,
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
      if(mode.match(/all|d/)){
        this.Div({
          path: main,
          cName: 'value',
          text: value,
          editable: mode.match(/all|e/) ? true : false,
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

  
  Label({path, cName, text, title, attr, onclick, body, rtn}){
    const main=document.createElement('label');
    if(cName) main.className=cName;
    if(title) main.title=title;
    if(text) main.textContent=text;
    if(attr) main.setAttribute(attr[0], attr[1]);
    if(onclick) main.onclick=onclick;
    path.appendChild(main);

    // console.log('ATTR', attr);

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

  Legend({path, text, onclick}){
    const main=document.createElement('legend');
    main.textContent=text;
    if(onclick) main.onmousedown=onclick;
    path.appendChild(main);
  }

  Field({path, groupName, cName, dontRead, legend, info, items, autocfg, inputs, list, select, style, form, func, rtn}){
    const main=document.createElement('fieldset');
    main.groupName=main.setAttribute('groupName', groupName);
    dontRead ? main.setAttribute('dontread', true) : '';
    cName ? main.className=cName : '';
    if(style) main.style=style;
    path.appendChild(main);

    if(legend){
      this.Legend({
        path: main,
        text: legend,
        onclick: () => {
          main.classList.toggle('hide');
        }
      });
    }
    if(info) this.Div({
      path: main,
      cName: 'info',
      text: info
    });
    const iList=this.Div({
      path: main,
      cName: 'fList',
      rtn: []
    });

    if(items) items.forEach(e => {
      if(e.t === 'select') this.Select({
        path: iList,
        label: e.label,
        lName: e.lName,
        name: e.name,
        value: (autocfg && autocfg[0]) ? this.auto(e.group, e.c, e.name, autocfg[0][groupName]) : e.value,
        options: e.options,
        optgroups: e.optgroups,
        lAttr: e.group ? ['group', e.group] : ['group', autocfg && autocfg[1]]
      })
      else
      if(e.t === 'input') this.Input({
        path: iList,
        type: e.type,
        cName: e.cName,
        lName: e.lName,
        name: e.name,
        title: e.title,
        [e.type === 'checkbox' ? 'checked' : 'value']: (autocfg && autocfg[0]) ? this.auto(e.group, autocfg[1], e.name, autocfg[0][groupName]) : e[type],
        accepted: e.accepted,
        number: e.number,
        min: e.min,
        max: e.max,
        step: e.step,
        text: e.text,
        label: e.label,
        iText: e.iText,
        onchange: e.onchange,
        num: e.num,
        lAttr: e.group ? ['group', e.group] : ['group', autocfg && autocfg[1]]
      });
      else
      if(e.t === 'list') this.List({
        path: iList,
        mode: e.mode,
        name: e.name,
        lName: e.lName,
        cName: e.cName,
        type: e.type,
        items: (autocfg && autocfg[0]) ? this.auto(e.group, autocfg[1], e.name, autocfg[0][groupName]) : e.items,
        title: e.title,
        label: e.label,
        focus: e.focus,
        canDel: e.canDel,
        onRclick: e.onRclick,
        lAttr: e.group ? ['group', e.group] : ['group', autocfg && autocfg[1]]
      });
      else
      if(e.t === 'separator') this.Div({
        path: iList,
        cName: 'separator',
        text: e.text
      });
    })

    if(inputs) inputs.list.forEach(e => {
      let type;
      if(e.type === 'checkbox') type = 'checked';
      else type = 'value';
      // console.log(inputs.a ? this.auto(e.group, inputs.c, e.name, inputs.a[groupName]) : e[type]);
      this.Input({
        path: iList,
        type: e.type,
        cName: e.cName,
        lName: e.lName,
        name: e.name,
        title: e.title,
        [type]: inputs.a ? this.auto(e.group, inputs.c, e.name, inputs.a[groupName]) : e[type],
        accepted: e.accepted,
        number: e.number,
        min: e.min,
        max: e.max,
        step: e.step,
        // checked: e.checked,
        text: e.text,
        label: e.label,
        iText: e.iText,
        onchange: e.onchange,
        num: e.num,
        lAttr: e.group ? ['group', e.group] : ['group', inputs.c]
      })
    });
    // get value(){
    //   return getter(mainCfg[test.groupName], this.c.g, this.name)
    // }

    if(select) select.list.forEach(e => {
      this.Select({
        path: iList,
        label: e.label,
        lName: e.lName,
        name: e.name,
        value: select.a ? this.auto(e.group, select.c, e.name, select.a[groupName]) : e.value,
        options: e.options,
        optgroups: e.optgroups,
        lAttr: e.group ? ['group', e.group] : ['group', select.c]
      })
    });

    if(list) list.list.forEach(e => {
      new El().List({
        path: iList,
        mode: e.mode,
        name: e.name,
        lName: e.lName,
        cName: e.cName,
        type: e.type,
        items: list.a ? this.auto(e.group, list.c, e.name, list.a[groupName]) : e.items,
        title: e.title,
        label: e.label,
        focus: e.focus,
        canDel: e.canDel,
        onRclick: e.onRclick,
        lAttr: e.group ? ['group', e.group] : ['group', list.c]
      });
    })

    if(form) this.Form({
      path: iList,
      cName: form.cName,
      id: form.id,
      name: form.name,
      action: form.action,
      method: form.method,
      func: form.func,
      style: form.style,
      rtn: form.rtn
    });

    if(func) func(iList);
    
    if(rtn){
      if(!rtn.length > 0) return main;
      this.obj={};
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    }
  }

  Form({path, cName, id, name, action, method, style, func, rtn}){
    this.main=document.createElement('form');
    if(cName) this.main.className=cName;
    if(style) this.main.style=style;
    if(id) this.main.id=id;
    this.main.name=name;
    if(action) this.main.action=action;
    method ? this.main.method=method : this.main.method='dialog';
    path.appendChild(this.main);

    if(rtn){
      if(!rtn.length > 0) return this.main;
      this.obj={};
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    };

    if(func) func(this.main);
  }

  auto(cnt, cnts, name, cfg){
    // console.log(cfg)
    // console.log(`cnt: ${cnt}, cnts:${cnts}, name:${name}, cfg:${cfg}`)
    const getter = (t, path) => path.split('.').reduce((r, k) => r?.[k], t);
    if(!cnt && !cnts) return cfg[name];
    else
    if(cnt) return getter(cfg, `${cnt}.${name}`);
    else
    if(cnts) return getter(cfg, `${cnts}.${name}`);
    else return cfg[name];
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

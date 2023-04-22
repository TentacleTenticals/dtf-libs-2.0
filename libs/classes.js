class Div{
  constructor({path, addBefore, cName, id, text, label, title, name, group, tab, value, valueName, editable, style, onclick, onkeydown, onkeyup, onwheel, onfocus, onblur, onpaste, onmouseenter, onmouseleave, rtn, func}){
    this.main=document.createElement('div');
    if(cName) this.main.className=cName;
    if(id) this.main.id=id;
    if(text) this.main.textContent=text;
    if(title) this.main.title=title;
    if(name) this.main.setAttribute('name', name);
    if(group) this.main.setAttribute('group', group);
    if(tab) this.main.tabIndex=tab;
    if(editable) this.main.setAttribute('contenteditable', true);
    if(style) this.main.style=style;
    if(onclick) this.main.onclick=onclick;
    if(onkeyup) this.main.onkeyup=onkeyup;
    if(onkeydown) this.main.onkeydown=onkeydown;
    if(onwheel) this.main.onwheel=onwheel;
    if(onfocus) this.main.onfocus=onfocus;
    if(onblur) this.main.onblur=onblur;
    if(onpaste) this.main.onpaste=onpaste;
    if(onmouseenter) this.main.onmouseenter=onmouseenter;
    if(onpointerenter) this.main.onpointerenter=onpointerenter;
    if(label) this.label=new Div({
      path: this.main,
      cName: 'title',
      text: label
    });
    addBefore ? path.insertBefore(this.main, addBefore) : path.appendChild(this.main);

    if(func) func(this.main);
    if(rtn) {
      if(!rtn.length > 0) return this.main;
      this.obj={};
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    }
  }
};

class Button{
  constructor({path, cName, id, text, label, container, style, onclick, disabled, rtn}){
    this.main=document.createElement('button');
    if(container){
      this.container=new Div({
        path: path,
        cName: typeof container === 'boolean' ? 'container' : container.cName,
        group: container.g,
        rtn: []
      });
    }
    if(cName) this.main.className=cName;
    if(id) this.main.id=id;
    if(text) this.main.textContent=text;
    if(style) this.main.style=style;
    if(onclick) this.main.onclick=onclick;
    if(disabled) this.main.disabled=disabled;
    (container ? this.container : path).appendChild(this.main);

    if(label) this.mainLabel=new Div({
      path: this.main,
      cName: 'label',
      text: label
    });

    if(rtn){
      if(!rtn.length > 0 && !container) return this.main;
      this.obj={};
      if(container) this.obj.container = this.container;
      rtn.forEach(e => {
        if(e) this.obj[e] = this[e];
      })
      return this.obj;
    }
  }
};

class Image{
  constructor({path, cName, url, text, title, scale, style, loading, onclick}){
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
  }
};
class Video{
  constructor({path, cName, url, poster, autoplay, loop, muted, controls, pIp, text, style, preload, onloadeddata, onclick, onplay, onpause, onended, rtn}){
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
    if(onloadeddata) this.main.onloadeddata=onloadeddata;
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
  }
};

class Select{
  Option({path, value, text}){
    let main=document.createElement('option');
    main.value=value;
    main.textContent=text;
    path.appendChild(main);
  };
  constructor({path, container, label, name, value, body, options, optgroups, onchange, rtn}){
    class Optgroup{
      constructor({path, label, option, options, rtn}){
        this.main=document.createElement('optgroup');
        this.main.label=label;
        if(option) new Option({
          path: this.main,
          text: option
        });
        if(options) options.forEach(e => {
          this.Option({
            path: this.main,
            value: e[0],
            text: e[1]
          })
        });
        path.appendChild(this.main);

        if(rtn){
          if(!rtn.length > 0) return this.main;
          this.obj={};
          rtn.forEach(e => {
            if(e) this.obj[e] = this[e];
          })
          return this.obj;
        }
      }
    }

    if(container){
      this.container=new Div({
        path: path,
        cName: container.n ? `container ${container.n}` : 'container',
        group: container.g,
        rtn: []
      });
    };

    this.main=document.createElement('select');
    this.main.name=name;
    if(onchange) this.main.onchange=onchange;
    (container ? this.container : path).appendChild(this.main);

    if(body) body(this.main, Optgroup, Option);

    if(options) options.forEach(e => {
      this.Option({
        path: this.main,
        value: e[0],
        text: e[1]
      })
    });
    if(optgroups) optgroups.forEach(e => {
      new Optgroup({
        path: this.main,
        label: e.label,
        option: e.option,
        options: e.options
      })
    });
    this.main.value=value;

    if(label){
      this.label=document.createElement('label');
      this.label.textContent=label;
      (container ? this.container : path).appendChild(this.label);
    }
    if(rtn){
      if(!rtn.length > 0 && !container) return this.main;
      this.obj={};
      if(container) this.obj.container = this.container;
      rtn.forEach(e => {
        if(e) this.obj[e] = this[e];
      })
      return this.obj;
    }
  }
};

class Input{
  constructor({path, container, type, cName, name, id, text, label, title, value, autocomplete, list, accepted, pattern, placeholder, min, max, step, checked, disabled, required, auto, onclick, onchange, onfocus, onblur, onpaste, onkeydown, onkeyup, style, rtn}){
    if(container){
      this.container=new Div({
        path: path,
        cName: container.n ? `container ${container.n}` : 'container',
        group: container.g,
        rtn: []
      });
    };
    // if(label){
    //   this.label=document.createElement('label');
    //   this.label.className='input-label';
    //   this.label.textContent=iText;
    //   path.appendChild(this.label);
    // }
    this.main=document.createElement('input');
    if(cName) this.main.className=cName;
    this.main.name=name;
    this.main.type=type;
    if(style) this.main.style=style;
    if(id) this.main.id=id;
    if(title) this.main.title=title;
    if(required) this.main.setAttribute('required', '');
    if(checked) this.main.checked=checked;
    if(disabled) this.main.disabled=true;
    if(list) this.main.setAttribute('list', list);
    if(value) this.main.value=value;
    autocomplete ? this.main.autocomplete=autocomplete : this.main.autocomplete='off';
    if(accepted) this.main.accepted=accepted;
    if(pattern) this.main.pattern=pattern;
    if(placeholder) this.main.placeholder=placeholder;
    if(min) this.main.min=min;
    if(max) this.main.max=max;
    if(step) this.main.step=step;
    if(auto) this.main.autocomplete=auto;
    if(onclick) this.main.onclick=onclick;
    if(onchange) this.main.onchange=onchange;
    if(onfocus) this.main.onfocus=onfocus;
    if(onblur) this.main.onblur=onblur;
    if(onpaste) this.main.onpaste=onpaste;
    if(onkeydown) this.main.onkeydown=onkeydown;
    if(onkeyup) this.main.onkeyup=onkeyup;
    // if(!container) path.appendChild(this.main);
    // else
    // if(container) this.container.appendChild(this.main);
    (container ? this.container : path).appendChild(this.main);

    if(label){
      this.label=document.createElement('label');
      this.label.className='input-label';
      // if(label[1]) this.label.htmlFor=this.main.id;
      this.label.textContent=label;
      // path.appendChild(this.label);
      (container ? this.container : path).appendChild(this.label);
    };

    if(rtn){
      if(!rtn.length > 0 && !container) return this.main;
      this.obj={};
      if(container) this.obj.container = this.container;
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    };
  }
};

class List{
  Li({t}){
    let main=document.createElement('li');
    main.textContent=t;
    this.main.appendChild(main);
  }
  constructor({path, cName, id, list, lists}){
    this.main=document.createElement('ul');
    if(cName) this.main.className=cName;
    if(id) this.id=id;
    if(list) list.forEach(e => {
      this.Li({
        path: this.main,
        t: e
      });
    });
    if(lists) lists.forEach(e => {
      this.Li({
        path: this.main,
        t: e.t
      });
    });
    path.appendChild(this.main);
  }
};

class LiveList{
  Build({path, container, cName, type, mode, view, edit, value, label, name, clearList, buttons}){
    this.main=new Div({
      path: path,
      cName: 'container',
      group: container.g,
      rtn: []
    });
    this.ul=document.createElement('ul');
    this.ul.className=`liveList${cName ? ` ${cName}` : ''}`;
    if(name) this.ul.setAttribute('name', name);
    if(type) this.ul.setAttribute('type', type);
    this.main.appendChild(this.ul);
    
    if(clearList){
      let cb=new Button({
        path: this.main,
        text: 'Clear',
        onclick: () => {
          this.ul.replaceChildren();
          if(edit) this.Item({
            path: this.ul,
            type: type,
            view: view,
            edit: edit,
            buttons: buttons
          })
        }
      })
    }
    
    if(label){
      let lab=document.createElement('label');
      lab.textContent=label;
      this.main.appendChild(lab);
    }

    if(value.length > 0) value.forEach(i => {
      this.Item({
        path: this.ul,
        value: i,
        type: type,
        view: view,
        edit: edit,
        buttons: buttons
      });
    })
    else
    if(mode && mode !== 'view-del') this.Item({
      path: this.ul,
      type: type,
      view: view,
      edit: edit,
      buttons: buttons
    })
  }
  Item({path, value, type, view, edit, buttons, focus}){
    let main=document.createElement('li');
    path.appendChild(main);
    
    let c=new Div({
      path: main,
      cName: 'cont',
      rtn: []
    });
    
    let v=new Div({
      path: c,
      cName: 'value',
      text: type === 'object' ? (view ? view(value) : JSON.stringify(value)) : value,
      editable: edit ? true : '',
      rtn: [],
      func: (e) => {
        if(value){
          if(view && type === 'string') main.setAttribute('value', value);
          else
          if(view && type === 'object') main.setAttribute('value', JSON.stringify(value));
          else
          if(type === 'string') main.setAttribute('value', value);
//           main.setAttribute('value', e.textContent);
        };
      },
      onblur: edit ? (e) => {
        main.setAttribute('value', e.target.textContent);
      } : '',
      onkeydown: edit ? (e) => {
        if(e.code === 'Enter'){
          e.preventDefault();
          this.Item({
            path: this.ul,
            edit: edit,
            buttons: buttons,
            focus: true
          });
        }
      } : ''
    });
    
    let cb=new Div({
      path: c,
      cName: 'contB',
      rtn: []
    });
    
    if(buttons) buttons(cb, value);
    new Button({
      path: cb,
      cName: 'btn',
      text: '❌',
      onclick: () => {
      if(this.ul.children.length > 1) main.remove();
    }
    });
    if(focus) v.focus();
  }
}

class Field{
  auto(cnt, cnts, name, cfg){
    // console.log(cfg)
    const getter = (t, path) => path.split('.').reduce((r, k) => r?.[k], t);
    if(!cnt && !cnts) return cfg[name];
    else
    if(cnt && cnt.g) return getter(cfg, `${cnt.g}.${name}`);
    else
    if(cnts && cnts.g) return getter(cfg, `${cnts.g}.${name}`);
    else return cfg[name];
  }
  constructor({path, groupName, cName, dontRead, legend, info, inputs, inputsAuto, select, liveList, style, form, func, rtn}){
    this.main=document.createElement('fieldset');
    this.main.groupName=this.main.setAttribute('groupName', groupName);
    dontRead ? this.main.setAttribute('dontread', true) : '';
    cName ? this.main.className=cName : '';
    if(style) this.main.style=style;
    path.appendChild(this.main);

    if(legend){
      this.legend=document.createElement('legend');
      this.legend.textContent=legend;
      this.legend.onclick=() => {
        this.main.classList.toggle('hide');
      }
      this.main.appendChild(this.legend);
    }
    if(info) new Div({
      path: this.main,
      cName: 'info',
      text: info
    });
    this.list=new Div({
      path: this.main,
      cName: 'list',
      rtn: []
    });

    if(inputs) inputs.list.forEach(e => {
      let type;
      if(e.type === 'checkbox') type = 'checked';
      else type = 'value';
      new Input({
        path: this.list,
        type: e.type,
        name: e.name,
        title: e.title,
        [type]: inputs.a ? this.auto(e.c, inputs.c, e.name, inputs.a[groupName]) : e[type],
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
        container: e.c ? e.c : inputs.c
      })
    });
    // get value(){
    //   return getter(mainCfg[test.groupName], this.c.g, this.name)
    // }
    if(inputsAuto) inputsAuto.list.forEach(e => {
      new Input({
        path: this.list,
        type: e.type,
        name: e.name,
        title: e.title,
        value: getter(inputsAuto.cfg[groupName], e.c ? e.c : inputsAuto.c.g, e.name),
        accepted: e.accepted,
        number: e.number,
        min: e.min,
        max: e.max,
        step: e.step,
        checked: e.checked,
        text: e.text,
        label: e.label,
        iText: e.iText,
        onchange: e.onchange,
        num: e.num,
        container: e.c ? e.c : inputsAuto.c
      })
    });

    if(select) select.list.forEach(e => {
      new Select({
        path: this.list,
        label: e.label,
        name: e.name,
        value: select.a ? this.auto(e.c, select.c, e.name, select.a[groupName]) : e.value,
        options: e.options,
        optgroups: e.optgroups,
        container: e.c ? e.c : select.c
      })
    });
    
    if(liveList) liveList.list.forEach(e => {
      new LiveList().Build({
        path: this.list,
        container: e.c ? e.c : liveList.c,
        cName: e.cName,
        label: e.label,
        name: e.name,
        type: e.type,
        mode: e.mode,
        view: e.view,
        edit: e.edit,
        value: liveList.a ? this.auto(e.c, liveList.c, e.name, liveList.a[groupName]) : e.value,
        buttons: e.buttons,
        clearList: e.clearList
      });
    });

    if(form) new Form({
      path: this.list,
      cName: form.cName,
      id: form.id,
      name: form.name,
      action: form.action,
      method: form.method,
      func: form.func,
      style: form.style,
      rtn: form.rtn
    });

    if(func) func(this.list);
    
    if(rtn){
      if(!rtn.length > 0) return this.main;
      this.obj={};
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    }
  }
};

class Form{
  constructor({path, cName, id, name, action, method, style, func, rtn}){
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
};

class Div{
  constructor({path, addBefore, cName, id, text, label, title, name, tab, value, valueName, editable, style, onclick, onkeydown, onkeyup, onwheel, onfocus, onblur, onmouseenter, onmouseleave, rtn, func}){
    this.main=document.createElement('div');
    if(cName) this.main.className=cName;
    if(id) this.main.id=id;
    if(text) this.main.textContent=text;
    if(title) this.main.title=title;
    if(name) this.main.setAttribute('name', name);
    if(tab) this.main.tabIndex=tab;
    if(editable) this.main.setAttribute('contenteditable', true);
    if(style) this.main.style=style;
    if(onclick) this.main.onclick=onclick;
    if(onkeyup) this.main.onkeyup=onkeyup;
    if(onkeydown) this.main.onkeydown=onkeydown;
    if(onwheel) this.main.onwheel=onwheel;
    if(onfocus) this.main.onfocus=onfocus;
    if(onblur) this.main.onblur=onblur;
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
  constructor({path, cName, id, text, label, style, onclick, rtn}){
    this.main=document.createElement('button');
    if(cName) this.main.className=cName;
    if(id) this.main.id=id;
    if(text) this.main.textContent=text;
    if(style) this.main.style=style;
    if(onclick) this.main.onclick=onclick;
    path.appendChild(this.main);

    if(label) this.mainLabel=new Div({
      path: this.main,
      cName: 'label',
      text: label
    });

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
  constructor({path, cName, url, poster, autoplay, loop, muted, controls, pIp, text, style, preload, onclick, onplay, onpause, onended, rtn}){
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
    if(pIp) this.main.disablePictureInPicture=pIp;
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
  }
};

class Select{
  constructor({path, container, label, name, value, body, options, onchange, rtn}){
    class Option{
      constructor({path, text}){
        this.main=document.createElement('option');
        this.main.textContent=text;
        path.appendChild(this.main);
      }
    };

    class Optgroup{
      constructor({path, label, option, options, rtn}){
        this.main=document.createElement('optgroup');
        this.main.label=label;
        if(option) new Option({
          path: this.main,
          text: option
        });
        if(options) options.forEach(e => {
          new Option({
            path: this.main,
            text: e
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
        cName: 'container',
        rtn: []
      });
    }

    this.main=document.createElement('select');
    this.main.name=name;
    if(onchange) this.main.onchange=onchange;
    (container ? this.container : path).appendChild(this.main);

    if(body) body(this.main, Optgroup, Option);

    if(options) options.forEach(e => {
      new Option({
        path: this.main,
        text: e
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
  constructor({path, container, type, cName, name, id, text, label, title, value, autocomplete, list, accepted, pattern, placeholder, min, max, step, checked, disabled, required, auto, onchange, onfocus, onblur, onkeydown, onkeyup, style, rtn}){
    if(container){
      this.container=new Div({
        path: path,
        cName: 'container',
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
    if(onchange) this.main.onchange=onchange;
    if(onfocus) this.main.onfocus=onfocus;
    if(onblur) this.main.onblur=onblur;
    if(onkeydown) this.main.onkeydown=onkeydown;
    if(onkeyup) this.main.onkeyup=onkeyup;
    // if(!container) path.appendChild(this.main);
    // else
    // if(container) this.container.appendChild(this.main);
    (container ? this.container : path).appendChild(this.main);

    if(label){
      this.label=document.createElement('label');
      this.label.className='input-label';
      if(label[1]) this.label.htmlFor=this.main.id;
      this.label.textContent=label[0];
      path.appendChild(this.label);
      // (container ? this.container : this.label).appendChild(this.main);
    };

    if(rtn){
      if(!rtn.length > 0 && !container) return this.main;
      this.obj={};
      if(container) this.obj.container = this.container;
      rtn.forEach(e => {
        this.obj[e] = this[e];
      })
      return this.obj;
    }
  }
};

class Form{
  constructor({path, cName, id, name, action, method, style, rtn}){
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
    }
  }
};

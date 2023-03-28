class El{
  Div({ path, addBefore, cName, id, text, label, title, name, group, tab, value, valueName, editable, style, onclick, onkeydown, onkeyup, onwheel, onfocus, onblur, onpaste, onmouseenter, onmouseleave, rtn, func }){
    this.main = document.createElement('div');
    if(cName) this.main.className = cName;
    if(id) this.main.id = id;
    if(text) this.main.textContent = text;
    if(title) this.main.title = title;
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
};

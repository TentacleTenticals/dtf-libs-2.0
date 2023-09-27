class BookMenu{
  getTime(d){
    let t = new Date(d * 1000);
    return `${t.getFullYear()}/${t.getMonth()+1 < 10 ? `0${t.getMonth()+1}` : t.getMonth()+1}/${t.getDate() < 10 ? `0${t.getDate()}` : t.getDate()} ${t.getHours() < 10 ? `0${t.getHours()}` : t.getHours()}:${t.getMinutes() < 10 ? `0${t.getMinutes()}` : t.getMinutes()}:${t.getSeconds() < 10 ? `0${t.getSeconds()}` : t.getSeconds()}`
  };
  prevItem(path, target, type){
    if((+path.children[0].children[0].children[0].children[0].textContent - 1) < 1) return;
    path.children[1].replaceChildren();
    this.rewriteText({target:path.children[0].children[0].children[0].children[0], mode:'--'});
    for(let i = 0, arr = mainCfg.bookMenu.size[type], length = arr; i < length; i++){
      new MenuItem()[type]({
        path:path.children[1],
        num:this.getList(path.children[0].children[0].children[0].children[0].textContent-1, i, type),
        get item(){
          return target[this.num]
        }
      });
    }
  }
  nextItem(path, target, type){
    if((+path.children[0].children[0].children[0].children[0].textContent + 1) > +path.children[0].children[0].children[0].children[1].textContent) return;
    path.children[1].replaceChildren();
    this.rewriteText({target:path.children[0].children[0].children[0].children[0], mode:'++'});
    for(let i = 0, arr = mainCfg.bookMenu.size[type], length = arr; i < length; i++){
      new MenuItem()[type]({
        path:path.children[1],
        num:this.getList(path.children[0].children[0].children[0].children[0].textContent-1, i, type),
        get item(){
          return target[this.num];
        },
      });
    }
  }
  sortByValue(t, value, ascend){
    if(!ascend) t.sort((a, b) => a.info[value] > b.info[value] ? 1 : -1);
    else
    t.sort((a, b) => a.info[value] > b.info[value] ? -1 : 1);
  }
  clear(e, full){
    if(e.children[1].children.length > 0) e.children[1].replaceChildren();
    if(full){
      this.rewriteText({target:e.children[0].children[0].children[0].children[0], text:'0'});
      this.rewriteText({target:e.children[0].children[0].children[0].children[1], text:'0'});
      this.rewriteText({target:e.children[0].children[0].children[1].children[0], text:'0'});
    }
  };
  getList(num, i, type){
    return (mainCfg.bookMenu.size[type] * num) + i;
  }
  itemList({path, target, type}){
    this.sortByValue(target, 'date', true);
    console.log('TYPE', type)
    console.log('TARGET', target)
    if(!target && !target.length > 0) return;
    path.parentNode.setAttribute('type', type);

    path.children[0].children[1].children[0].onclick = (e) => {
      this.prevItem(e.target.parentNode.parentNode.parentNode, target, type);
    }
    path.children[0].children[1].children[1].onclick = (e) => {
      this.nextItem(e.target.parentNode.parentNode.parentNode, target, type);
    }

    if(target.length > 0){
      this.rewriteText({target:path.children[0].children[0].children[0].children[0], text:'1'});
      this.rewriteText({target:path.children[0].children[0].children[0].children[1], text:Math.ceil(target.length / mainCfg.bookMenu.size[type])});
      this.rewriteText({target:path.children[0].children[0].children[1].children[0], text:target.length});
      for(let i = 0, arr = mainCfg.bookMenu.size[type], length = arr; i < length; i++){
        new MenuItem()[type]({
          path:path.children[1],
          num:this.getList(path.children[0].children[0].children[0].children[0].textContent-1, i, type),
          get item(){
            return target[this.num]
          }
        });
      }
    }
  }
  build({path, iName, target}){
    this.main=new El().Div({
      path: path,
      cName: 'bookMenu',
      rtn: true
    });
    new El().Div({
      path: this.main,
      cName: 'panelBar',
      func: (e) => {
        new El().Div({
          path: e,
          cName: 'howMany',
          func: (c) => {
            new El().Div({
              path: c,
              cName: 'nums',
              text: '📖:',
              func: (s) => {
                new El().Div({
                  path: s,
                  text: '0'
                });
                new El().Div({
                  path: s,
                  text: '0'
                });
              }
            });
            new El().Div({
              path: c,
              cName: 'nums',
              text: '🗃️:',
              func: (s) => {
                new El().Div({
                  path: s,
                  text: '0'
                });
              }
            });
            new El().Div({
              path: c,
              cName: 'nums point',
              text: '🖍️:',
              func: (s) => {
                new El().Div({
                  path: s,
                  text: '0'
                });
              },
              onclick: () => {
                const arr = JSON.parse(this.main.children[1].getAttribute('picked'));
                if(!arr||arr && !arr.length > 0) return;
                console.log('ARR', arr);
                this.main.children[1].setAttribute('picked', '[]');
                this.rewriteText({target:this.main.children[0].children[0].children[2].children[0], text:'0'});
                for(let i = 0, arr = this.main.children[1].children, length = arr.length; i < length; i++){
                  arr[i].classList.remove('picked');
                };

                if(db.name) new Odb()[db.name]({
                  run: 'delete',
                  type: 'feeds',
                  db: db,
                  target: arr.map(e => e.id),
                }).then(res => {
                  console.log(res);
                  if(res.length === 0){
                    console.log(`There's no saved feeds...`);
                    this.clear(path.children[0], true);
                    // new Types().feeds(p.children[0].children[3]);
                  }else{
                    console.log(`Founded saved feeds, loading...`, res);
                    path.parentNode.setAttribute('reload', true);
                    this.clear(path.children[0], true);
                    // new Types().feeds(p.children[0].children[3], res, db);
                  }
                }).catch(err => console.log(err));
                else{
                  path.parentNode.setAttribute('reload', true);
                  this.clear(path.children[0], true);
                }
              }
            });
          }
        });
        new El().Div({
          path: e,
          cName: 'btns',
          func: (c) => {
            new El().Button({
              path: c,
              text: '🔙\uFE0E'
            });
            new El().Button({
              path: c,
              cName: 'full',
              text: '🔜\uFE0E',
              onclick: (e) => {
                console.log('TYPE', target)
                this.nextItem(e.target.parentNode.parentNode.nextElementSibling, target, e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('type'));
              }
            });
          }
        });
      }
    });
    new El().Div({
      path: this.main,
      cName: `itemsList${iName ? ' '+iName : ''} scrollMid`,
      attr: ['picked', '[]']
    });
  }
  rewriteText({target, text, mode}){
    target.textContent = text ? text : (mode === '++' ? ++target.textContent : --target.textContent);
  }
}

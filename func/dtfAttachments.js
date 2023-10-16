function attachment(o){
  // console.log(i)
  function player(o){
    new El().Div({
      path: o.path,
      ...o.addBefore ? {addBefore: o.addBefore} : {},
      cName: 'cont',
      func: (m) => {
        new El().Div({
          path: m,
          cName: 'video-cont',
          onclick: (e) => {
            if(e.button !== 0) return;
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if(m.children[0].lastChild.paused) m.children[0].lastChild.play();
            else m.children[0].lastChild.pause();
          },
          func: (p) => {
            new El().Div({
              path: p,
              cName: 'mediaStarter',
              func: (s) => {
                new El().Div({
                  path: s,
                  cName: 'btn'
                });
              }
            });

            new El().Video({
              path: p,
              url: o.url,
              poster: o.poster,
              loop: true,
              muted: true,
              onplay: (e) => {
                e.target.parentNode.classList.toggle('playing');
              },
              onpause: (e) => {
                e.target.parentNode.classList.toggle('playing');
              },
              onended: (e) => {
                e.target.parentNode.classList.toggle('playing');
              }
            });
          }
        });
      }
    });

  // new El().Image({
  //   path: prev,
  //   url: 'https://github.com/TentacleTenticals/dtf-markdown/raw/main/libs/Play.svg'
  // });
  }
  if(!o.i||!o.i.data) return;
  if(o.i.type === 'image'){
    if(o.i.data.type.match(/video|gif/)){
      if(o.type.match(/media/)){
        player({
          path: o.path,
          url: `https://leonardo.osnova.io/${o.i.data.uuid}`,
          poster: o.poster
        })
      }else{
        const main=new El().Div({
          path: o.path,
          cName: `mask ${o.type} ${o.i.data && o.i.data.type||''}`,
          autoplay: true,
          rtn: true
        });
        new El().Video({
          path: main,
          cName: 'attach',
          url: `https://leonardo.osnova.io/${o.i.data.uuid}`
        })
      }
    }else{
      const main=new El().Div({
        path: o.path,
        cName: `mask ${o.type} ${o.i.data && o.i.data.type||''}`,
        onclick: o.onclick,
        onRclick: o.onRclick,
        tab: o.tab,
        rtn: true
      });
      new El().Image({
        path: main,
        cName: 'attach',
        url: `https://leonardo.osnova.io/${o.i.data.uuid}`
      })
    }
  }
};

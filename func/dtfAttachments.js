function attachment({path, type, i}){
  const main=new El().Div({
    path: path,
    cName: `mask ${type} ${i.data && i.data.type ? ' '+i.data.type : ''}`,
    rtn: true
  });
  if(!i.data) return;
  if(i.type === 'image'){
    if(i.data.type.match(/video|gif/)){
      new El().Video({
        path: main,
        cName: 'attach',
        url: `https://leonardo.osnova.io/${i.data.uuid}`
      })
    }else
    new El().Image({
      path: main,
      cName: 'attach',
      url: `https://leonardo.osnova.io/${i.data.uuid}`
    })
  }
};

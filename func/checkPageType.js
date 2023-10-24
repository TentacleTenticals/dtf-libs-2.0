function getPageType(url){
  if(!url){
    console.log('[GetPageType] error - no url');
    return;
  }
  url.replace(/https:\/\/.*dtf\.ru\/([^]+)/, (d, text) => {
    function ch(t){
      if(t) return true;
    }
    const arr = text.split('/');
    
    switch(true && true){
      case arr[0] && ch(arr[0].match(/^popular$/)?.input):{
        if(!arr[1]) return url = {type: 'popular'};
      }break;

      case arr[0] && ch(arr[0].match(/^new$/)?.input):{
        if(!arr[1]) return url = {type: 'new'};
      }break;

      case arr[0] && ch(arr[0].match(/^my$/)?.input):{
        if(arr[1] && arr[1].match(/^new$/)) return url = {type: 'my new'};
      }break;

      case arr[0] && ch(arr[0].match(/^bookmarks$/)?.input):{
        if(!arr[1]) return url = {type: 'bookmarks'};
      }break;

      case arr[0] && ch(arr[0].match(/^u$/)?.input):{
        if(arr[1] && !arr[2]) return url = {type: 'user page', name: arr[1]};
      else
        if(arr[1] && arr[2]) return url = {type: 'topic'};
      }break;
        
      case arr[0] && ch(arr[0].match(/^s$/)?.input):{
        if(arr[1] && !arr[2]) return url = {type: 'subsite', name: arr[1]};
      else
        if(arr[1] && arr[2]) return url = {type: 'topic'};
      }break;
        
      case arr[0] && ch(!arr[0].match(/^(u|s)$/)?.input):{
        if(arr[0] && !arr[1]) return url = {type: 'subsite', name: arr[0]};
      else
        if(arr[0] && arr[1]) return url = {type: 'topic'};
      }break;
        
    }
  })
  return url;
}

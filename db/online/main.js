let db;

class Odb{
  typeOf(t){
    return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
  }
  getUrl(name, id){
    if(name === 'supabase') return `https://${id||''}.supabase.co/rest/v1/`;
  }
  fetch(cmd){
    return fetch(`${db[db.online].url}${cmd.path}`, {
      method: cmd.method,
      headers: {
        'Content-Type': 'application/json',
        'apiKey': db[db.online].apiKey,
        'Authorization': `Bearer ${db[db.online].token}`,
        'Content-Type': 'application/json',
        ...cmd.method !== 'GET' ? {'Prefer': 'return=minimal'} : {}
      },
      ...cmd.data && cmd.method !== 'GET' ? {body: JSON.stringify(cmd.data)} : {}
    }).then(r => {
      // console.log(r);
      return r.json().then(res => {
        // console.log('Odb', res);
        if(!res) return undefined;
        if(this.typeOf(res) === 'array'){
          if(res.length < 1) return undefined;
          else
          if(res.length === 1 && cmd.rType === 'object') return res[0];
          else
          if(res.length >= 1) return res;
        }
        else
        return res;
      }).catch(err => {
        if(err.message === 'Unexpected end of JSON input') return r;
        else
        if(err.message.match(/'<', "<!DOCTYPE "... is not valid JSON/)) throw new Error(`"<!DOCTYPE "... is not valid JSON`);
        else{
          alerter({
            alert: true,
            title: '[Odb]',
            text: `Ошибка, перезагрузите страницу! ${err}`,
            timer: 5000
          });
          throw new Error(err);
        }
      });
    });
  }
  supabase(cmd){
    console.log('SUP', cmd);
    // this.fetch({run:'find', method:'GET', path:`${cmd.type}?id=eq.${cmd.target}`});

    switch(true){
      case cmd.run === 'find':{
        cmd.method = 'GET';
        cmd.path = this.typeOf(cmd.target) !== 'array' ? `${cmd.type}?id=eq.${cmd.target}` : `${cmd.type}?id=in.${(cmd.target).toString().replace(/([^]+)/gm, '\%28$1\%29')}`;

        return this.fetch(cmd);
      }
      break;
      case cmd.run === 'get all':{
        cmd.method = 'GET';
        cmd.path = `${cmd.type}?select=*`;

        return this.fetch(cmd);
      }
      break;
      case cmd.run === 'addOrUpdate':{
        console.log('addOrUpdate');
        cmd.method = 'GET';
        cmd.run = 'find';
        cmd.path = `${cmd.type}?id=eq.${cmd.target}`;

        return this.fetch(cmd).then(db => {
          console.log('DB', db);
          if(!db){
            console.log('Item not founded, adding...');
            cmd.method = 'POST';
            cmd.path = cmd.type;

            return this.fetch(cmd);

            // return this.fetch(cmd).then(db => {
            //   if(!db){
            //     console.log('Item not updated!');
            //     return db;
            //   }else
            //   if(db){
            //     console.log('Item updated!');
            //     return db;
            //   }
            // }).catch(err => {
            //   console.log(err);
            //   return err;
            // });
          }else
          if(db){
            console.log('Item founded, updating...');
            cmd.method = 'PATCH';
            cmd.path = `${cmd.type}?id=eq.${cmd.target}`;

            return this.fetch(cmd);
          }
        }).catch(err => {
          console.log('Error inside findOrAdd', err);
          return err;
        });
      }
      break;
      case cmd.run === 'add':{
        cmd.method = 'POST';
        cmd.path = `${cmd.type}`;

        return this.fetch(cmd);
      }
      break;
      case cmd.run === 'update':{
        cmd.method = 'PATCH';
        cmd.path = `${cmd.type}?id=eq.${cmd.target}`;

        return this.fetch(cmd);
      }
      break;
      case cmd.run === 'delete':{
        cmd.method = 'DELETE';
        cmd.path = this.typeOf(cmd.target) !== 'array' ? `${cmd.type}?id=eq.${cmd.target}` : `${cmd.type}?id=in.${(cmd.target).toString().replace(/([^]+)/gm, '\%28$1\%29')}`;

        return this.fetch(cmd);
      }
      break;
    }
  }
}

var data =  require('./data.json');

'use strict';
module.exports = {
  //Mock axios alike api to return data using promise
  get: () => {
    return Promise.resolve({
      mockData: data
    });
  }
};

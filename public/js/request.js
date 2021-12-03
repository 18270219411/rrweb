const baseURL = 'http://192.168.0.77:7777';

function baseRequest(url, method, data, dataType) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: baseURL + url,
      type: method || 'GET',
      contentType: 'application/x-www-form-urlencoded',
      dataType: dataType || 'JSON',
      data: data || '',
      success: (res) => {
        console.log(res);
        resolve(res);
      },
      error: (error) => {
        reject(error);
      },
    })
    // .then((resolve) => {
    //   resolve(resolve);
    // })
    // .catch((error) => {
    //   reject(error);
    // });
  });
};
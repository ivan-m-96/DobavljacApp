import { func } from 'prop-types';

const axios = require('axios');

export async function postDobavljac(dobavljac) {
  await axios({
    method: 'post',
    url: 'http://localhost:3001/dobavljaci',
    data: {
      naziv: dobavljac.naziv,
      adresa: dobavljac.adresa
    }
  }).then(function(response) {
    return response;
  });
}

export async function getOneDobavljac(id) {
  await axios({
    method: 'get',
    url: 'http://localhost:3001/dobavljaci',
    params: {
      id
    }
  })
    .then(function(response) {
      console.log('iz metode ' + response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
}

export async function getAllDobavljac() {
  let reresponse = [];
  await axios({
    method: 'get',
    url: 'http://localhost:3001/dobavljaci'
  })
    .then(function(response) {
      console.log('from the func' + response.data);
      reresponse = response.data;
    })
    .catch(function(error) {
      console.log(error);
      return;
    });

  return reresponse;
}

export async function removeDobavljac(id) {
  let responsee = null;
  await axios
    .delete('http://localhost:3001/dobavljaci/' + id)
    .then(function(response) {
      console.log('stigo del');
      console.log(response);
      responsee = response;
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
  return responsee;
}

export async function updateDobavljac(id, naziv, adresa) {
  let responsee = null;
  await axios
    .patch('http://localhost:3001/dobavljaci/' + id, { naziv, adresa })
    .then(response => (responsee = response))
    .catch(e => {
      console.log(e.message);
    });
  return responsee;
}

export async function getAllKatalog(id) {
  let responsee = null;
  console.log('http://localhost:3001/katalozi/' + id);
  await axios({
    method: 'get',
    url: 'http://localhost:3001/katalozi/' + id
  })
    .then(function(response) {
      console.log('from the function getAllKatalog' + response);
      responsee = response.data;
    })
    .catch(function(error) {
      console.log(error);
      return;
    });
  return responsee;
}
export async function getKataloziZaDobavljaca(id) {
  let resp = null;
  await axios({
    method: 'get',
    url: 'http://localhost:3001/dobavljaci/' + id + '/katalozi'
  })
    .then(function(response) {
      console.log('from the functione' + response.data);
      resp = response.data;
    })
    .catch(function(error) {
      console.log(error);
      return;
    });
  return resp;
}

export async function getPorudzbeniceZaDobavljaca(id) {
  let resp = null;
  await axios({
    method: 'get',
    url: 'http://localhost:3001/dobavljaci/' + id + '/porudzbenice'
  })
    .then(function(response) {
      console.log('from the functione' + response.data);
      resp = response.data;
    })
    .catch(function(error) {
      console.log(error);
      return;
    });
  return resp;
}

export default getAllDobavljac;

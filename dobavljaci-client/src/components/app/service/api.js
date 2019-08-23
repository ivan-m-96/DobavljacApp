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

export default getAllDobavljac;

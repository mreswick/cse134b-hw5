const TEMPLATE_SELECTOR = '#tableTemp';
const TABLE_CONT_SELECTOR = '#response';

export function setDate() {
  console.log("in setDate().");
  let inputDateEl = document.querySelector("#curdate");
  inputDateEl.value = JSON.stringify(new Date());
}

export function clearResponse() {
  let responseEl = document.querySelector(TABLE_CONT_SELECTOR);
  responseEl.innerHTML = "";
}

export function formatValForDisp(val, nestedObjAllowed=true) {
  console.log("format val: ", nestedObjAllowed);
  //format the string val to be displayed on page
  let toRet = val; //return val by default
  if(typeof(val) === 'object' && val !== null) {
    let emptyObjMsg = '';
    if(Object.keys(val).length === 0) {
      emptyObjMsg = 'Empty object ({}).';
      toRet = emptyObjMsg;
    } else if(nestedObjAllowed) {
      toRet = "Nested object {...}."
    }
  }
  else if (typeof(val) === 'string') {
    if(val.length === 0) {
      toRet = 'Empty string ("").';
    }
  }
  else if(val === null) {
    toRet = 'None received (null).';
  }
  return toRet;
}

//ind is index of children nodes of template element;
//ind gives which table to use
export function disp1DJSONObj(data, 
  tempInd,
  keyName, //name of key in returned JSON
  formattedKeyName, //name of key to display in table
  tempSel=TEMPLATE_SELECTOR,
  tableContSel=TABLE_CONT_SELECTOR) {

  //select table, fill if non-empty obj,
  //else just display empty obj message in table.
  let tableCont = document.querySelector(tableContSel);
  console.log("table container: ", tableCont);
  let tempEl = document.querySelector(tempSel);
  let tempDialCont = tempEl.content;
  // let argsTableEl = tempEl.querySelector('#argsTable');
  let argsTableEl = tempDialCont.children[tempInd].cloneNode(true);
  console.log("template el: ", tempEl);
  console.log('tableEl selected: ', argsTableEl);
  const objSel = data[keyName];

  console.log("selected: ", objSel);
  console.log("selected type: ", typeof(objSel));

  if(Object.keys(objSel).length !== 0) {
    console.log("If entered in disp1DJSONObj for adding rows for keyName: ", keyName);
    //remove first dummy row
    let firstTrEl = argsTableEl.querySelector('tbody tr > td');
    let firstRowEl = argsTableEl.querySelector('tbody > tr');
    firstRowEl.remove(firstTrEl);
    //add header column for arg vals
    let theadElFirstTr = argsTableEl.querySelector('tr');
    let thArgsValEl = document.createElement('th');
    thArgsValEl.innerHTML = `${formattedKeyName} Vals`;
    theadElFirstTr.appendChild(thArgsValEl);
    let theadElNameEl = argsTableEl.querySelector('thead tr > th');
    theadElNameEl.innerHTML = `${formattedKeyName} Names`
    let tbodyEl = argsTableEl.querySelector('tbody');
    //add new data row for each entry in args
    //assume args is 1D
    for(const argName in objSel) {
      const argVal = objSel[argName];
      let newDataRowEl = document.createElement('tr');
      let nameEl = document.createElement('td');
      let valEl = document.createElement('td');
      nameEl.innerHTML = argName;
      valEl.innerHTML = formatValForDisp(argVal);
      newDataRowEl.appendChild(nameEl);
      newDataRowEl.appendChild(valEl);
      tbodyEl.appendChild(newDataRowEl);
    }
  }
  //add table to container
  tableCont.appendChild(argsTableEl);
}

//ind is index of children nodes of template element;
//ind gives which table to use
export function dispOverallObj(data, 
  tempInd,
  formattedKeyName, //name of key to display in table
  tempSel=TEMPLATE_SELECTOR,
  tableContSel=TABLE_CONT_SELECTOR) {

  //select table, fill if non-empty obj,
  //else just display empty obj message in table.
  let tableCont = document.querySelector(tableContSel);
  console.log("table container: ", tableCont);
  let tempEl = document.querySelector(tempSel);
  let tempDialCont = tempEl.content;
  // let argsTableEl = tempEl.querySelector('#argsTable');
  let argsTableEl = tempDialCont.children[tempInd].cloneNode(true);
  console.log("template el: ", tempEl);
  console.log('tableEl selected: ', argsTableEl);
  const objSel = data;

  console.log("selected: ", objSel);
  console.log("selected type: ", typeof(objSel));

  if(Object.keys(objSel).length !== 0) {
    // let hasNonObjVal = false;
    // for(let keyVal in objSel) {
    //   if(typeof(objSel[keyVal]) != 'object') {
    //     hasNonObjVal = true;
    //   }
    // }
    //only add key-val pairs that are not nested objects
    //if(hasNonObjVal) {
    console.log("If entered in disp overall obj for adding rows");
    //remove first dummy row
    let firstTrEl = argsTableEl.querySelector('tbody tr > td');
    let firstRowEl = argsTableEl.querySelector('tbody > tr');
    firstRowEl.remove(firstTrEl);
    //add header column for arg vals
    let theadElFirstTr = argsTableEl.querySelector('tr');
    let thArgsValEl = document.createElement('th');
    thArgsValEl.innerHTML = `${formattedKeyName} Vals`;
    theadElFirstTr.appendChild(thArgsValEl);
    let theadElNameEl = argsTableEl.querySelector('thead tr > th');
    theadElNameEl.innerHTML = `${formattedKeyName} Names`
    let tbodyEl = argsTableEl.querySelector('tbody');
    //add new data row for each entry in args
    //assume args is 1D
    for(const argName in objSel) {
      const argVal = objSel[argName];
      //only add if not an object
      //if(typeof(argVal) !== 'object') {
        let newDataRowEl = document.createElement('tr');
        let nameEl = document.createElement('td');
        let valEl = document.createElement('td');
        nameEl.innerHTML = argName;
        valEl.innerHTML = formatValForDisp(argVal, true);
        newDataRowEl.appendChild(nameEl);
        newDataRowEl.appendChild(valEl);
        tbodyEl.appendChild(newDataRowEl);
       // }
    }
    //} 
  }
  //add table to container
  tableCont.appendChild(argsTableEl);
}

export function dispArgs(data, tempSel=TEMPLATE_SELECTOR, 
  tableContSel=TABLE_CONT_SELECTOR) {
    if(data['args'] !== undefined) {
      disp1DJSONObj(data, 0, 'args', 'Args', tempSel, tableContSel);
    }
}
export function dispFiles(data, tempSel=TEMPLATE_SELECTOR, 
  tableContSel=TABLE_CONT_SELECTOR) {
    if(data['files'] !== undefined) {
      disp1DJSONObj(data, 1, 'files', 'Files', tempSel, tableContSel);
    }
}
export function dispForm(data, tempSel=TEMPLATE_SELECTOR, 
  tableContSel=TABLE_CONT_SELECTOR) {
    if(data['form'] !== undefined) {
      disp1DJSONObj(data, 2, 'form', 'Form Input', tempSel, tableContSel);
    }
}
export function dispHeaders(data, tempSel=TEMPLATE_SELECTOR, 
  tableContSel=TABLE_CONT_SELECTOR) {
    if(data['headers'] !== undefined) {
      disp1DJSONObj(data, 3, 'headers', 'Headers', tempSel, tableContSel);
    }
}

export function displayReceivedData(data) {
  //data is JSON obj
  console.log("displaying recieved data: ", data);

  clearResponse();
  setTimeout(() => {
    //display on page for each key in object expected to be returned
    dispArgs(data);
    dispFiles(data);
    dispForm(data);
    dispHeaders(data);
    dispOverallObj(data, 4, 'Overall Property');
  }, 0);
}


export function setFormEncoding(form_names_vals) {
  //encodes an object of form names as keys
  //and vals as values as a string
  //Code inspired by "JavaScript: The Definitive Guide"
  //Sixth Edition, p. 502-503
  let name_val_pairs = [];
  for(let name in form_names_vals) {
    let value = form_names_vals[name];
    name = encodeURIComponent(name); //need + instead of %20
    name = name.replaceAll("%20", "+")
    value = encodeURIComponent(value); //need + instead of %20
    value = value.replaceAll("%20", "+")
    name_val_pairs.push(name + "=" + value);
  }
  let name_val_str = name_val_pairs.join('&');
  console.log("name_val_str in set form encoding: ", name_val_str);
  return name_val_str;
}

export function grabFormData(formSelector='#r111') {
  let formEl = document.querySelector(formSelector);
  let articleNameEl = formEl.querySelector('#article_name');
  let articleName = articleNameEl.name;
  let articleNameVal = articleNameEl.value;
  let articleBodyEl = formEl.querySelector('#article_body');
  let articleBodyName = articleBodyEl.name;
  let articleBodyVal = articleBodyEl.value;
  let curDateEl = formEl.querySelector('#curdate');
  let curDateName = curDateEl.name;
  let curDateVal = curDateEl.value;
  let formStrEnc = setFormEncoding({
    [articleName]: articleNameVal,
    [articleBodyName]: articleBodyVal,
    [curDateName]: curDateVal
  });
  return formStrEnc;
}

// set submission methods for buttons
//POST
export function setPostEl(butPostSelector='#post') {
  let butPostEl = document.querySelector(butPostSelector);
  butPostEl.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://httpbin.org/post');
    xhr.setRequestHeader('Content-Type', 
      'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        //callback to process result
        let responseType = xhr.getResponseHeader("Content-Type");
        console.log("Responded with type: ", responseType);
        let responseText = xhr.responseText;
        console.log("responseText: ", responseText);
        let responseJson = JSON.parse(responseText);
        // let responseJson = responseText; //I guess parsing isn't necessary
        // console.log("responseJson: ", responseJson);
        displayReceivedData(responseJson);
      }
    };
    setDate(); //set date right before sending data
    xhr.send(grabFormData());
  });
}
//GET
export function setGetEl(butPostSelector='#get') {
  let butGetEl = document.querySelector(butPostSelector);
  butGetEl.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    setDate(); //set date
    let formDataStr = `?${grabFormData()}`;
    xhr.open('GET', `https://httpbin.org/get${formDataStr}`);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        //callback to process result
        let responseType = xhr.getResponseHeader("Content-Type");
        console.log("Responded with type: ", responseType);
        let responseText = xhr.responseText;
        console.log("responseText: ", responseText);
        let responseJson = JSON.parse(responseText);
        // let responseJson = responseText; //I guess parsing isn't necessary
        // console.log("responseJson: ", responseJson);
        displayReceivedData(responseJson);
      }
    };
    xhr.send(null);
  });
}
//PUT (otherwise same as POST as I do below)
export function setPutEl(butPostSelector='#put') {
  let butPostEl = document.querySelector(butPostSelector);
  butPostEl.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://httpbin.org/put');
    xhr.setRequestHeader('Content-Type', 
      'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        //callback to process result
        let responseType = xhr.getResponseHeader("Content-Type");
        console.log("Responded with type: ", responseType);
        let responseText = xhr.responseText;
        console.log("responseText: ", responseText);
        let responseJson = JSON.parse(responseText);
        // let responseJson = responseText; //I guess parsing isn't necessary
        // console.log("responseJson: ", responseJson);
        displayReceivedData(responseJson);
      }
    };
    setDate(); //set date right before sending data
    xhr.send(grabFormData());
  });
}
//DELETE (otherwise same as POST as I do below)
export function setDeleteEl(butPostSelector='#delete') {
  let butDelEl = document.querySelector(butPostSelector);
  butDelEl.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    setDate(); //set date
    let formDataStr = `?${grabFormData()}`;
    xhr.open('DELETE', `https://httpbin.org/delete${formDataStr}`);
    xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        //callback to process result
        let responseType = xhr.getResponseHeader("Content-Type");
        console.log("Responded with type: ", responseType);
        let responseText = xhr.responseText;
        console.log("responseText: ", responseText);
        let responseJson = JSON.parse(responseText);
        // let responseJson = responseText; //I guess parsing isn't necessary
        // console.log("responseJson: ", responseJson);
        displayReceivedData(responseJson);
      }
    };
    xhr.send(null);
  });
}

export function preventDefaultFormSubmission(formSelector='#r111') {
  let formEl = document.querySelector(formSelector);
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

export function init() {
  //prevent default form submission
  preventDefaultFormSubmission();
  //add POST "submit" button event handler
  setPostEl();
  setGetEl();
  setPutEl();
  setDeleteEl();
}



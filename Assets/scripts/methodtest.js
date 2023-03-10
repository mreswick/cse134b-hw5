const TEMPLATE_SELECTOR = '#tableTemp';
const TABLE_CONT_SELECTOR = '#tableCont';

export function setDate() {
  let inputDateEl = document.querySelector("#curdate");
  inputDateEl.value = JSON.stringify(new Date());
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
    for(const argName in args) {
      const argVal = args[argName];
      let newDataRowEl = document.createElement('tr');
      let nameEl = document.createElement('td');
      let valEl = document.createElement('td');
      nameEl.innerHTML = argName;
      valEl.innerHTML = argVal;
      newDataRowEl.appendChild(nameEl);
      newDataRowEl.appendChild(valEl);
      tbodyEl.appendChild(newDataRowEl);
    }
  }
  //add table to container
  tableCont.appendChild(argsTableEl);
}

export function dispArgs(data, tempSel=TEMPLATE_SELECTOR, 
  tableContSel=TABLE_CONT_SELECTOR) {
  //select args table, fill if non-empty obj,
  //else just display empty obj message in table.
  let tableCont = document.querySelector(tableContSel);
  console.log("table container: ", tableCont);
  let tempEl = document.querySelector(tempSel);
  let tempDialCont = tempEl.content;
  // let argsTableEl = tempEl.querySelector('#argsTable');
  let argsTableEl = tempDialCont.children[0].cloneNode(true);
  console.log("template el: ", tempEl);
  console.log('argsTableEl selected: ', argsTableEl);
  const argsName = 'args';
  const args = data[argsName];

  console.log("args: ", args);
  console.log("args type: ", typeof(args));

  if(Object.keys(args).length !== 0) {
    console.log("If entered in dispArgs for adding rows.");
    //remove first dummy row
    let firstTrEl = argsTableEl.querySelector('tbody tr > td');
    let firstRowEl = argsTableEl.querySelector('tbody > tr');
    firstRowEl.remove(firstTrEl);
    //add header column for arg vals
    let theadElFirstTr = argsTableEl.querySelector('tr');
    let thArgsValEl = document.createElement('th');
    thArgsValEl.innerHTML = 'Args Vals';
    theadElFirstTr.appendChild(thArgsValEl);
    let tbodyEl = argsTableEl.querySelector('tbody');
    //add new data row for each entry in args
    //assume args is 1D
    for(const argName in args) {
      const argVal = args[argName];
      let newDataRowEl = document.createElement('tr');
      let nameEl = document.createElement('td');
      let valEl = document.createElement('td');
      nameEl.innerHTML = argName;
      valEl.innerHTML = argVal;
      newDataRowEl.appendChild(nameEl);
      newDataRowEl.appendChild(valEl);
      tbodyEl.appendChild(newDataRowEl);
    }
  }
  //add table to container
  tableCont.appendChild(argsTableEl);
}

export function displayReceivedData(data) {
  //data is JSON obj
  console.log("displaying recieved data: ", data);

  //display on page
  dispArgs(data);
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
}



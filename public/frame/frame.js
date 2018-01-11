function displayMessage(evt) {
  let message = `id=${getId()} origin=${evt.origin} data=${JSON.stringify(evt.data)}\n`;

  if (evt.origin === '?some magic domain origin?') {
    message += 'Magical origin!\n';
  } else {
    message += 'Other origin!';
  }


  if (typeof evt.data === 'object') {
    const dataflow = vega.parse(evt.data);

    const view = new vega.View(dataflow)
      .logLevel(vega.Warn) // set view logging level
      .initialize(document.getElementById('received-message'))
      .hover() // enable hover event processing
      .run(); // update and render the view

    window.parent.postMessage('vega drawing is done!', '*');
  } else {
    window.parent.postMessage('no vega was sent, adding to log', '*');
  }

  console.log(message);
}



if (window.addEventListener) {
  // For standards-compliant web browsers
  window.addEventListener('message', displayMessage, false);
} else {
  window.attachEvent('onmessage', displayMessage);
}




function getId() {
  const url = window.location.search.substring(1);
  const params = url.split('&');
  for (let i = 0; i < params.length; i++) {
    const params2 = params[i].split('=');
    if (params2[0] === 'id')
      return params2[1];
  }
  return '';
}

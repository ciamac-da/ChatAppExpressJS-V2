
const ausgabe = document.querySelector('.ausgabe');
const eingabe = document.querySelector('.eingabe');
const senden  = document.querySelector('.senden');
const nick    = document.querySelector('.name');

const fetchJSON = async (query,body)=> {
  let response = await fetch(
    'http://localhost:9922' + query, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  });
  return await response.json();
};

const nachrichtenAbholen = async ()=> {
  let data = await fetchJSON('/message',{});
  datenAusgeben(data.msgs);
};

const nachrichtSenden = async e => {
  let message = eingabe.value;
  let data = await fetchJSON(
    '/message', { msg:message, name:nick.innerHTML }
  );
  datenAusgeben(data.msgs);
  eingabe.value = '';
  eingabe.focus();
};


const datenAusgeben = (msgs)=> {
  localStorage.setItem('msgs',JSON.stringify(msgs));
  let vorher = ausgabe.innerHTML;
  ausgabe.innerHTML = '';
  for ( message of msgs ){
    let { img, msg, name, date } = message;
    ausgabe.innerHTML += `
      <div class="alert alert-${name === nick.innerHTML ? 'info' : 'warning' }" role="alert">
        <b>${name}:</b> ${msg}
        <span class="datum">
        <i>
          ${(new Date(date)).toLocaleDateString()}
          ${(new Date(date)).toLocaleTimeString()}
        </i>
        </span>
      </div>`;
  }
  if ( vorher !== ausgabe.innerHTML )
    ausgabe.parentElement.scrollTop = 999999999;
};


const neuenNamenAbfragen = e => {
  let n = prompt('Dein Name:');
  if ( ! n ) n = 'user' + Date.now().toString().substring(6);
  nick.innerHTML = n;
  localStorage.setItem('nick',n);
  eingabe.focus();
};


//this is how to 
nick.innerHTML = localStorage.getItem('nick') || 'Ciamac';
datenAusgeben(JSON.parse(localStorage.getItem('msgs') || '[]'));
nick.onclick = neuenNamenAbfragen;
senden.onclick = nachrichtSenden;
eingabe.onkeyup = e => { if ( e.key === "Enter" ) nachrichtSenden(); }

setInterval(nachrichtenAbholen,1000);
nachrichtenAbholen();
//this is how to reset the input field
eingabe.focus();

(function () {
  let counter = 1;
  const container = document.createElement('div');
  const valueContainer = document.createElement('div');
  valueContainer.innerHTML = counter;
  valueContainer.setAttribute('id', 'value');

  const incBtn = document.createElement('button');
  incBtn.setAttribute('data-type', 'inc');
  incBtn.innerText = 'Increment';
  const decBtn = document.createElement('button');
  decBtn.setAttribute('data-type', 'dec');
  decBtn.innerText = 'Decrement';

  container.appendChild(valueContainer);
  container.appendChild(incBtn);
  container.appendChild(decBtn);

  document.body.appendChild(container);

  incBtn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  });

  container.addEventListener('click', function ({ target }) {
    const valueContainer = document.getElementById('value');
    // document.querySelector('body > div')
    console.log(location);
    const type = target.getAttribute('data-type');
    if (type === 'inc') {
      counter++;
      valueContainer.innerHTML = counter;
    } else if (type === 'dec') {
      counter--;
      valueContainer.innerHTML = counter;
    }
  });
}());

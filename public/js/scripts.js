document.querySelector('#btnSend').addEventListener('click', () => {
  const idGuitar = document.querySelector('#idGuitar').value;
  const nameGuitar = document.querySelector('#nameGuitar').value;
  const departamentoN = document.querySelector('#department').value;
  const municipioN = document.querySelector('#municipio').value;
  
  const data = {
    id: idGuitar,
    name: nameGuitar,
    departamento: departamentoN,
    municipio: municipioN
  };

  fetch('http://localhost:3000/new-record', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => fetch("http://localhost:3000"))
  .catch(err => console.log(err));
});



document.getElementById('department').addEventListener('change', function () {
  const departmentCode = this.value; 
  const municipioSelect = document.getElementById('municipio');

  if (!departmentCode) {
      municipioSelect.innerHTML = '<option value="">Seleccionar Municipio</option>';
      municipioSelect.disabled = true;
      return;
  }

  
  fetch(`/towns/${departmentCode}`)
      .then(response => response.json())
      .then(municipios => {
          
          municipioSelect.innerHTML = '<option value="">Seleccionar Municipio</option>';
          municipios.forEach(municipio => {
              municipioSelect.innerHTML += `<option value="${municipio.code}">${municipio.name}</option>`;
          });
          municipioSelect.disabled = false;
      })
      .catch(error => console.error('Error al cargar los municipios:', error));
});

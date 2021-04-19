//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
    window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
    window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

const employeeData = [
    {
        name: "gopal",
        surname: "lapog",
        age: 35,
        dowod: "ABC123456",
        email: "gopal@tutorialspoint.com",
        phone: "123456789",
        adres: "UL Piotrkowska 1 Warszawa",
        kodpocztowy: "99-999"
    },
    {
        name: "Piotr",
        surname: "Nowak",
        age: 60,
        dowod: "PLK765021",
        email: "lemon@tree.com",
        phone: "718920128",
        adres: "UL Wiecowskiego 1 Bydgoszcz",
        kodpocztowy: "12-456"
    },
    {
        name: "Jan",
        surname: "Kowal",
        age: 15,
        dowod: "BCA109283",
        email: "test@domain.com",
        phone: "987654321",
        adres: "UL Piotrkowska 1 Lodz",
        kodpocztowy: "11-111"
    }
];
var db;
var request = window.indexedDB.open("newDatabase", 1);


request.onsuccess = function (event) {
    db = request.result;
    var objectStore = db.transaction("employee").objectStore("employee");
    tableCreate()
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            var tbody = document.getElementById('dyntbody')
            var tr = tbody.insertRow();
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.key))
            td.style.border = '1px solid black';
            td.style.minWidth = '50px'

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.value.name))
            td.style.border = '1px solid black';
            td.style.minWidth = '150px'

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.value.surname))
            td.style.border = '1px solid black';
            td.style.minWidth = '150px'

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.value.age))
            td.style.border = '1px solid black';
            td.style.minWidth = '50px'

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.value.dowod))
            td.style.border = '1px solid black';
            td.style.minWidth = '50px'

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.value.email))
            td.style.border = '1px solid black';
            td.style.minWidth = '50px'

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.value.phone))
            td.style.border = '1px solid black';
            td.style.minWidth = '50px'

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.value.adres))
            td.style.border = '1px solid black';
            td.style.minWidth = '50px'

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.value.kodpocztowy))
            td.style.border = '1px solid black';
            td.style.minWidth = '50px'

            var td = tr.insertCell();
            var btnremove = document.createElement('button')
            var id = cursor.key
            btnremove.onclick = function (){remove(this,id)}
            btnremove.textContent = 'usuń'
            td.appendChild(btnremove)
            td.style.border = '1px solid black';
            td.style.minWidth = '30px'

            cursor.continue();
        }
    };
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("employee", {autoIncrement: true});

    for (var i in employeeData) {
        objectStore.add(employeeData[i]);
    }
}

function tableCreate() {

    var body = document.body;
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute("id","mytable")
    var thead = document.createElement('thead');
    var theadtr = thead.insertRow()
    var theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('id'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('name'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('surname'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('age'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('ID number'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('email'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('Phone number'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('Address'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('Postal code'))
    theadtr.insertCell()

    var tbody = document.createElement('tbody')
    tbody.id = 'dyntbody'

    tbl.appendChild(thead)
    tbl.appendChild(tbody)
    body.appendChild(tbl)
}

function addrow() {
    var request = db.transaction(["employee"], "readwrite")
        .objectStore("employee")
        .add({
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            age: document.getElementById('age').value,
            dowod: document.getElementById('dowod').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            adres: document.getElementById('adres').value,
            kodpocztowy: document.getElementById('kodpocztowy').value
        });

    request.onsuccess = function (event) {
        var tbody = document.getElementById('dyntbody')
        var tr = tbody.insertRow();
        var td = tr.insertCell();

        var cursor = event.target.result;
        // console.log(cursor)
        td.appendChild(document.createTextNode(cursor))
        td.style.border = '1px solid black';
        td.style.minWidth = '50px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('name').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '150px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('surname').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '150px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('age').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '50px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('dowod').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '50px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('email').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '200px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('phone').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '200px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('adres').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '200px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('kodpocztowy').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '200px'


        var td = tr.insertCell();
        var btnremove = document.createElement('button')
        btnremove.onclick = function () {
            remove(document.createTextNode(cursor));
        }
        btnremove.textContent = 'usuń'
        td.appendChild(btnremove)
        td.style.border = '1px solid black';
        td.style.minWidth = '50px'

    };

    request.onerror = function (event) {
        alert("Unable to add data\r\n" + document.getElementById('id').value + " is aready exist in your database! ");
    }

}

function remove(id) {

    var request = db.transaction(["employee"], "readwrite")
        .objectStore("employee")
        .delete(id);

    request.onsuccess = function (event) {
        delete_row('mytable',id)
    };
    request.onerror = function () {
        console.log("error")
        return
    }
}
// https://stackoverflow.com/questions/28184177/dynamically-add-remove-rows-from-html-table/28184255
function remove(currElement, id ) {
    var request = db.transaction(["employee"], "readwrite")
        .objectStore("employee")
        .delete(id);
    request.onerror = function () {
        console.log("error")
        return
    }
     var parentRowIndex = currElement.parentNode.parentNode.rowIndex;
     document.getElementById("mytable").deleteRow(parentRowIndex);
}

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
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
    {id: "00-01", name: "gopal", age: 35, email: "gopal@tutorialspoint.com"},
    {id: "00-02", name: "prasad", age: 32, email: "prasad@tutorialspoint.com"},
    {id: "00-04", name: "BArtosz", age: 21, email: "kow@tsd.com"}
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
            td.appendChild(document.createTextNode(cursor.value.age))
            td.style.border = '1px solid black';
            td.style.minWidth = '50px'

            var td = tr.insertCell();
            td.appendChild(document.createTextNode(cursor.value.email))
            td.style.border = '1px solid black';
            td.style.minWidth = '300px'

            var td = tr.insertCell();
            var btnremove = document.createElement('button')
            btnremove.onclick = function () {
                remove(document.createTextNode(cursor.key.value));
            }
            btnremove.textContent = 'usuń'
            td.appendChild(btnremove)
            td.style.border = '1px solid black';
            td.style.minWidth = '50px'

            cursor.continue();
        }
    };
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("employee", {keyPath: "id"});

    for (var i in employeeData) {
        objectStore.add(employeeData[i]);
    }
}

function tableCreate() {

    var body = document.body;
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    var thead = document.createElement('thead');
    var theadtr = thead.insertRow()
    var theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('id'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('name'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('age'))
    theadth = theadtr.insertCell()
    theadth.appendChild(document.createTextNode('email'))
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
            id: document.getElementById('id').value, name: document.getElementById('name').value,
            age: document.getElementById('age').value, email: document.getElementById('email').value
        });

    request.onsuccess = function (event) {
        var tbody = document.getElementById('dyntbody')
        var tr = tbody.insertRow();
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('id').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '50px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('name').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '150px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('age').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '50px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(document.getElementById('email').value))
        td.style.border = '1px solid black';
        td.style.minWidth = '200px'

        var td = tr.insertCell();
        var btnremove = document.createElement('button')
        btnremove.onclick = function () {
            remove(document.createTextNode(document.getElementById('id').value));
        }
        btnremove.textContent = 'usuń'
        td.appendChild(btnremove)
        td.style.border = '1px solid black';
        td.style.minWidth = '50px'

    };

    request.onerror = function (event) {
        alert("Unable to add data\r\n" + document.getElementById('name') + " is aready exist in your database! ");
    }

}

function remove(id) {
    var request = db.transaction(["employee"], "readwrite")
        .objectStore("employee")
        .delete(id);

    request.onsuccess = function (event) {
        console.log(id)
    };
    request.onerror= function (){
        console.log("error")
    }
}

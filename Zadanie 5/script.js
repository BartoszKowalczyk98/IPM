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

// document.request.onerror = function (event) {
//     console.log("error: ");
// };

request.onsuccess = function (event) {
    db = request.result;
    var objectStore = db.transaction("employee").objectStore("employee");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        tableCreate(cursor);
    };
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("employee", {keyPath: "id"});

    for (var i in employeeData) {
        objectStore.add(employeeData[i]);
    }
}

function tableCreate(cursor) {
    var body = document.body,
        tbl = document.createElement('table');
    tbl.style.width = '100%';
    if (cursor) {
        var tr = tbl.insertRow();
        var td = tr.insertCell();
        td.appendChild(document.createTextNode(cursor.key))
        td.style.border = '1px solid black';
        td.style.width='50px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(cursor.value.name))
        td.style.border = '1px solid black';
        td.style.width='150px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(cursor.value.age))
        td.style.border = '1px solid black';
        td.style.width='50px'

        var td = tr.insertCell();
        td.appendChild(document.createTextNode(cursor.value.email))
        td.style.border = '1px solid black';
        td.style.width='3000px'
        cursor.continue();
    }
    body.appendChild(tbl)

}
import './style.css'

async function deleteData(id: String): Promise<void> {
    try {
        var response = await fetch(`https://6707298ca0e04071d229422e.mockapi.io/To-Do/${id}`,
            { method: 'DELETE' }
        );
        if (!response.ok) {
            throw new Error(String(response.status));
        }
        gettodoList();
    }
    catch (error: any) {
        console.log(error.message);
    }
}
function displaytododata(data: any) {
    var dataBody = document.querySelector("#table1 tbody")!;
    dataBody.innerHTML = "";
    data.forEach((element: { id: any; text: any; }) => {
        var row = document.createElement("tr");

        // col 1 
        var col1 = document.createElement("td");
        col1.className = 'hiddenElement';
        col1.innerText = element.id;

        // col 2
        var col2 = document.createElement("td");
        col2.innerText = element.text;

        // col 3
        var col3 = document.createElement("td");
        
        // col 3 button
        var col3Button = document.createElement("button");
        col3Button.className = 'deleteButton';
        col3Button.innerText = 'Delete';
        col3Button.id = element.id;
        col3Button.addEventListener ( 'click' , (event: MouseEvent) => {
            if ( event.target !== null )
            {
                deleteData ( (<HTMLButtonElement>event.target).id );
            }
        });
        col3.appendChild ( col3Button );

        // setup the row
        row.appendChild ( col1 );
        row.appendChild ( col2 );
        row.appendChild ( col3 );

        // add to the body
        dataBody.appendChild ( row );

        //row.innerHTML = `
      //<td class='hiddenElement'>${element.id}</td>
      //<td>${element.text}</td>
      //<td><button class='deleteButton' onclick="deleteData(${element.id})">Delete</button></td>
      //`;
        //dataBody.appendChild(row);
    });
}
async function gettodoList() {
    try {
        var response = await fetch("https://6707298ca0e04071d229422e.mockapi.io/To-Do");
        if (!response.ok) {
            throw new Error(String(response.status));
        }
        var json = await response.json();
        console.log(json);
        displaytododata(json);
    }
    catch (error: any) {
        console.log(error.message);
    }
}
async function addData(text: any) {
    try {
        var response = await fetch(`https://6707298ca0e04071d229422e.mockapi.io/To-Do`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            }
        );
        if (!response.ok) {
            throw new Error(String(response.status));
        }
        gettodoList();
    }
    catch (error: any) {
        console.log(error.message);
    }
}
gettodoList();
document.getElementById('form1')!.addEventListener('submit', function (event) {
    event.preventDefault();
    var text = (<HTMLInputElement>document.getElementById('text1')).value;
    addData(text);
    // reset the element
    (<HTMLInputElement>document.getElementById('text1')).value ='';
}
);
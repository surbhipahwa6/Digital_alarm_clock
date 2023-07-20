// to add local time in header
let time= document.querySelector('#time-header');
setInterval(function(){
    let date=new Date().toLocaleTimeString();
    if(date.length<11){
        date="0"+date;
    }
    time.innerHTML = date;
}, 1000);

// global variables
let itemCount = 0;
let items = [];
let list = document.getElementById('alarm-list');
let deleteButton = document.querySelector('.fa fa-trash .delete');
let setAlarmButton = document.getElementById('set-alarm');

//click event on document
document.addEventListener('click', handleClickEventListener);

// to handle click event
function handleClickEventListener(e) {
    const target = e.target;
    if (target.className == 'delete') {
        const itemId = target.id;
        deleteAlarm(itemId);
        return;

    } else if (target.id == 'set-alarm') {
        handleClickAddEventListener(e);
        return;
    }

}

// to handle add alarm click event
function handleClickAddEventListener(event) {
    event.preventDefault(); // Prevent form submission and page refresh

    // Get the input values inside the function
    let hours = document.querySelector('input[name="hour"]').value;
    let minute = document.querySelector('input[name="min"]').value;
    let seconds = document.querySelector('input[name="sec"]').value;
    let timezone = document.querySelector('select[name="zone"]').value;

    let title = '';
    //conditions if input type does not match standard criteria
    if (hours == "" || minute == "" || seconds == "") {
        alert("Please enter all fields to set an alarm");
        return;
    }
    if (hours > 12 || hours < 0) {
        alert("Please enter a value between 0 and 12 for hours to set an alarm");
        return;
    }
    if (minute > 59 || minute < 0) {
        alert("Please enter a value between 0 and 59 for minutes to set an alarm");
        return;
    }
    if (seconds > 59 || seconds < 0) {
        alert("Please enter a value between 0 and 59 for seconds to set an alarm");
        return;
    }
    title = hours + ":" + minute + ":" + seconds + " " + timezone;


    const item = {
        title,
        id: "Item" + itemCount
    }
    itemCount++;
    addAlarm(item);
}


// to add alarm in alarm list
function addAlarm(item) {
    if (item) {
        items.push(item);
        renderItems();
    } else {
        alert("Alarm not found");
    }

}

//function to delete alarm from alarm list
function deleteAlarm(itemId) {
    const newItem = items.filter((item) => {
        return item.id != itemId;
    });
    items = newItem;
    renderItems();
}

// function to render items
function renderItems() {
    list.innerHTML = '';
    for (let i = 0; i < items.length; i++) {
        addItemToDom(items[i]);
    }
    itemCount = items.length;

}

// function to append item to DOM

function addItemToDom(item) {
    const li = document.createElement('li');
    li.innerHTML = "<div class=\"alarm-list-item\">" +
        "<span class=\"time-set\">" + item.title + "</span>" +
        "<button class=\"delete\" id=\"" + item.id + "\">Delete</button>" +
        "</div>";

    list.append(li);
}

// to check if alarm is complete or not 
setInterval(function(){
    const alarm_check =[...document.querySelectorAll('.alarm-list-item span')];   
for(const j of alarm_check){
    let alarm=new Date().toLocaleTimeString();
    if(alarm.length<11){
        alarm="0"+alarm;
    }  
    let time_check=alarm;
    if(j.innerText== time_check){
        alert("You set an alarm! It's "+time_check);
        
    }
}
}, 1000);
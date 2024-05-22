const currTime = document.getElementsByClassName('currTimeContainer')[0];
const selectHrs = document.getElementById('selectHrs')
const selectMin = document.getElementById('selectMin')
const selectSec = document.getElementById('selectSec')
const setAlarmForm = document.getElementById('setAlarmForm');
const alarmList = document.getElementById('alarmList');

let currentTime = new Date();
const timeConfig = { hour12: true };
let alarmArray = [];
let idCount = 0;

//functions
const fillAlarmOptions = (element, max) => {
    for(let i=0; i<max; i++){
        const optionData = i<10? `0${i}`: i;
        const option = document.createElement('option');
        option.value = optionData;
        option.textContent = optionData;
        element.appendChild(option);
    }
}

const setAlarmHandler = (event) => {
    event.preventDefault();
    const time = event.target;
    const minutes = time.selectMin.value;
    const seconds = time.selectSec.value;
    const period = time.selectPeriod.value;
    let hours = Number(time.selectHrs.value);
    
    if (period === 'PM' && hours < 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = '00';
    }

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    date.setMilliseconds(0);

    alarmArray.push({ id: idCount, time: date })
    idCount++;
    renderAlarmList();
}

const renderAlarmList = () => {
    alarmList.innerHTML = '';
    alarmArray.forEach(alarm => {
        const newAlarmDiv = document.createElement('div');
        newAlarmDiv.setAttribute('data-alarm-id', alarm.id)
        newAlarmDiv.classList.add('alarmItem')
        const alarmValue = document.createElement('span');
        alarmValue.innerHTML = alarm.time.toLocaleTimeString('en-US', timeConfig);
        const deleteAlarmBtn = document.createElement('button');
        deleteAlarmBtn.innerHTML = 'Delete';
        deleteAlarmBtn.addEventListener('click', () => {
            alarmArray = alarmArray.filter(ele => ele.id !== alarm.id);
            renderAlarmList()
        })
        newAlarmDiv.appendChild(alarmValue);
        newAlarmDiv.appendChild(deleteAlarmBtn);
        alarmList.appendChild(newAlarmDiv);
    })
}

//event listeners
setAlarmForm.addEventListener('submit', setAlarmHandler);

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        currentTime = new Date();
        const timeString = currentTime.toLocaleTimeString('en-US', timeConfig);
        currTime.innerHTML = timeString;
    }, 1000);
    setInterval(() => {
        const now = new Date();
        now.setMilliseconds(0);

        alarmArray.forEach(alarm => {
            console.log(alarm.time.getTime(), now.getTime());
            if (alarm.time.getTime() === now.getTime()) {
                alert(`Alarm for ${alarm.time.toLocaleTimeString('en-US', timeConfig)} is ringing!`);
            }
        });
    }, 1000)
    fillAlarmOptions(selectHrs, 13);
    fillAlarmOptions(selectMin, 60);
    fillAlarmOptions(selectSec, 60);
});
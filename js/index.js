//Declaring all the empty variables and arrays
let get_name = "";
let wealth = "";
const wealth_format_options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
};

let user = {};
let usersArray = [];
let arrayDoubleWealth = [];
let totalWealth = 0;


//Calling the getUser function for three times to be displayed on reload
getUser();
getUser();
getUser();


//Function to get random User from random User API
async function getUser() {
    url = 'https://randomuser.me/api/';
    const response = await fetch(url);
    const result = await response.json();
    const get_user_detail = result.results[0];
    get_name = `${get_user_detail.name.first} ${get_user_detail.name.last}`;
    wealth = (Math.floor((Math.random()) * 10000000)).toLocaleString('en-US', wealth_format_options);
    user = {
        name: get_name,
        money: wealth
    };
    addData(user)
}

function addData(object) {
    usersArray.push(object);
    displayUser();
}

function displayUser(data = usersArray) {

    $('#displayUserName').html('<div class="displayUserName" id="displayUserName"></div>');
    $('#displayUserWealth').html(' <div class="displayUserWealth" id="displayUserWealth"></div>');


    data.forEach(person => {
        $('#displayUserName').append(`<div class="newUserDetails">${person.name}</div>`);
        $('#displayUserWealth').append(`<div class="newUserDetails userMoney">${person.money}</div>`);
    });
}

//onclick options on money options

//adding a user
$("#addUser").click(() => {
    getUser();
})

//Doubling money of each user

$("#doubleMoney").click(() => {
    usersArray = usersArray.map(user => {

        let userWealth = Number(user.money.toLocaleString().replace(/\D/g, ''));
        userWealth = userWealth * 2;
        userWealth = userWealth.toLocaleString('en-US', wealth_format_options);
        return {
            ...user,
            money: userWealth
        }
    });

    displayUser();
});


//Filter only the millionares from the list and display
$("#showMillionare").click(() => {
    usersArray = usersArray.filter((user) => {
        let millionDollar = Number(user.money.toLocaleString().replace(/\D/g, ''));
        return millionDollar > 5000000
    })
    displayUser();
})




//Sort the users by the richest 

$("#sortRichest").click(() => {
    usersArray.sort((a, b) => {
        // b = b.toLowerCase();
        // a = a.name.toLowerCase();
        let sec_money = b["money"];
        let bo = Number(sec_money.toLocaleString().replace(/\D/g, ''));
        let first_money = a["money"]
        let ao = Number(first_money.toLocaleString().replace(/\D/g, ''));

        if (bo < ao)
            return -1;
        if (bo > ao)
            return 1;
        return 0;
    });
    displayUser();
});

//calculating the entire wealth
$("#calculateWealth").click(() => {
    totalWealth = usersArray.reduce((acc, curr) => {
        let obj = curr.money;
        let curr_user_money = Number(obj.toLocaleString().replace(/\D/g, ''));
        acc = acc + curr_user_money;
        return acc;
    }, 0);

    totalWealth = totalWealth.toLocaleString('en-US', wealth_format_options);
    document.getElementById("totalMoney").innerHTML = `<hr class="horizontalRule"><div id = "total" >${totalWealth}`

    console.log(totalWealth);
});
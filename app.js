const phoneapi = require('prophoneint');
const Discord = require('discord.js');
const client = new Discord.Client();

phoneapi.init("apiUser",
    "apiKey");
let resp;
let data = [];
const uid = "545582259785302037";

function idGen() {
    return(Math.round(Math.random() * (999999999-111111111) + 111111111));
}

function phonenumber(inputtxt)
{
    const phone = /^\d{10}$/;
    return inputtxt.match(phone);
}
function getPhone(num)
{
    if (!phonenumber(num)) {
        console.log("Invalid Phone #");
        return (false);
    }
    const ID = idGen();
    try {
        resp = phoneapi.getPhone(num);
        const check = setInterval(() => {
            if (resp) 
            {
                data[ID] = resp;
                clearInterval(check);
            }
            
            if (!resp) {
                console.log(resp);
                console.log("ProPhoneInt: Waiting on Data")
            }
        }, 1000);
    } catch (error) {
        return(false);
    }
    return(ID);

}

client.on('ready', () => {
    console.log('Discord-Bot Module ready');
});

client.on('message', message => {
    if (message.author.id === uid){
        return;
    } if (message.content === "!-help") {
        message.channel.send("Commands List --> !-help (This) !-phone (Enter 10 digit NA Phone Code for Search)");
        return;
    }
    const phone = /(?:!-phone)/;
    if (message.content.match(phone)) {
        const exec = getPhone(message.content.substring(message.content.length - 10));
        console.log(exec);
        if (exec === false)
        {
            message.channel.send("Internal System Error");
            return;
        }
        const check = setInterval(() => {
            if (data[exec]) {
                const clone = data[exec];
                console.log(data[exec]);
                console.log(clone);
                try {
                    message.channel.send("Phone # : " + clone["Phone #"])
                } catch (error) {

                }

                try {
                    message.channel.send("Valid : " + clone["Valid"])
                } catch (error) {

                }

                try {
                    message.channel.send("Phone Line Type : " + clone["Phone Line Type"])
                } catch (error) {

                }

                try {
                    message.channel.send("Phone Carrier : " + clone["Phone Carrier"])
                } catch (error) {

                }

                try {
                    message.channel.send("PrePaid : " + clone["Prepaid"])
                } catch (error) {

                }

                try {
                    message.channel.send("Commercial : " + clone["Commercial"])
                } catch (error) {

                }

                try {
                    message.channel.send("Name : " + clone["Name"])
                } catch (error) {

                }

                try {
                    message.channel.send("Age Approx : " + clone["AgeAPPRX"])
                } catch (error) {

                }

                try {
                    message.channel.send("Gender : " + clone["Gender"])
                } catch (error) {

                }

                try {
                    message.channel.send("Street Line 1 : " + clone["Street Line 1"])
                } catch (error) {

                }

                try {
                    message.channel.send("Street Line 2 : " + clone["Street Line 2"])
                } catch (error) {

                }

                try {
                    message.channel.send("City : " + clone["City"])
                } catch (error) {

                }

                try {
                    message.channel.send("ZIP Code : " + clone["ZIP Code"])
                } catch (error) {

                }

                try {
                    message.channel.send("State Code : " + clone["State Code"])
                } catch (error) {

                }

                try {
                    message.channel.send("Country Code : " + clone["Country Code"])
                } catch (error) {

                }

                try {
                    message.channel.send("Latitude : " + clone["Latitude"])
                } catch (error) {

                }

                try {
                    message.channel.send("Longitude : " + clone["Longitude"])
                } catch (error) {

                }

                try {
                    message.channel.send("GeoTrace Accuracy : " + clone["Lat/Long Accuracy"])
                } catch (error) {

                }

                clearInterval(check);
                return;
            }
            if (!data[exec]) {
                console.log("Discord: Waiting on Data")
            }
        }, 500);
        return;
    }
});

client.login("login-sid-goes-here");

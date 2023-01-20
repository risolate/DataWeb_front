import React from 'react';
import axios from "axios";
import swal from "sweetalert";
import MyCard from "../../components/MyCard";

// HTTP connection utils
async function getText () {
    const response = await axios.get("http://118.67.143.94:30001/api/get_text");
    return response;
}

async function postLabeled (data) {
    const response = await axios.put("http://118.67.143.94:30001/api/labeling", data);
    return response;
}

async function getNeedCheckData () {
    const response = await axios.get("http://118.67.143.94:30001/api/get_need_check");
    return response
}

async function rejectLabel (data) {
    var state = false;

    swal("정말로 reject하겠습니까??", {
        buttons: {
            cancel: "Cancel",
            ok: {
                text: "OK",
                value: "ok",
            }
        }
    }).then(async (value) => {
        switch (value){
            case "ok":
                console.log("tempo");
                state = true;
                break;
        }
        if (state){
            const response = await axios.post("http://118.67.143.94:30001/api/reject", data);
            window.location.reload(true);
            return response;
        }
    })
}

async function permitLabel (data) {
    var state = false;

    swal("정말로 ok하겠습니까??", {
        buttons: {
            cancel: "Cancel",
            ok: {
                text: "OK",
                value: "ok",
            }
        }
    }).then(async (value) => {
        switch (value){
            case "ok":
                state = true;
                break;
        }
        if (state){
            const response = await axios.post("http://118.67.143.94:30001/api/permit", data);
            window.location.reload(true);
            return response;
        }
    })
}

async function userCount () {
    const response = await axios.get("http://118.67.143.94:30001/api/count/visit");
    return response;
}

async function topUser () {
    const response = await axios.get("http://118.67.143.94:30001/api/count/get_top_user");
    return response;
}



// Function utils
function cardDisplay(dataStore){
    const cards = [];
    for(const idx in dataStore){
        cards.push(<MyCard data={dataStore[idx]} key={idx} sx={{gridColumn: "span 3"}}/>)
    }
    return cards
}


export { getText, postLabeled, getNeedCheckData, userCount, cardDisplay, permitLabel, rejectLabel, topUser };
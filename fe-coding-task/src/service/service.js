import axios from "axios";
import {marks} from '../components/Marks'

 export const getData = async (data1) =>{
    const allData = [marks.map(el => el.label)]
    const sendData = allData[0].slice(allData[0].indexOf(data1.start), allData[0].indexOf(data1.end)+1)
    var axios = require('axios');

    let data= {

        query:[
            {
                code:"Boligtype",
                selection:{
                    filter:"item",
                    values:[
                        data1.type
                    ]
                }
            },
            {
                code:"ContentsCode",
                selection:{
                    filter:"item",
                    values:[
                        "KvPris"
                    ]
                }
            },
            {
                code:"Tid",
                selection:{
                    filter:"item",
                    values:[
                        // data1.start,
                        // data1.end
                        ...sendData
                    ]
                }
            }
        ],
        response:{
            format:"json-stat2"
        }
    }


    var config = {
        method: 'post',
        url: 'https://data.ssb.no/api/v0/no/table/07241',
        data :data,

        headers: {
            'Content-Type': 'application/json',
        },
    };

    return  axios.post(`https://data.ssb.no/api/v0/no/table/07241`, data )
        .then(function (response) {
            let chartData= []
            response.data.value.map((item, i )=>{
                    let x ={
                        name:sendData[i],
                        pv:item
                    }
                    chartData.push(x)
            })
            return chartData
        })
        .catch(function (error) {
            console.log(error);
            return error

        });


}
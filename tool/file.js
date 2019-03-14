const xlsx=require("node-xlsx")
const nodeExcel=require("excel-export")

const fileMd={
    analysisdata:(address)=>{
        return new Promise((resolve,reject)=>{
            let obj=xlsx.parse(address)
            resolve(obj)
        })
    },
    filterData:(data)=>{
        let arr=[]
        data.map((item,index)=>{
            if(index!==0){
                arr.push({
                    tel:item[0],
                    nickname:item[1],
                    password:item[2],
                    age:item[3],
                })
            }
        })
        return arr;
    },
    filterPro:(data)=>{
        let arr=[]
        data.map((item,index)=>{
            if(index!==0){
                arr.push({
                    idNum:item[0],
                    proName:item[1],
                    eName:item[2],
                    price:item[3],
                    scale:item[4],
                    temp:item[5],
                    sugar:item[6],
                    milk:item[7],
                    author:item[8],
                    con:item[9],
                    title:item[10],
                    met:item[11],
                    bigpic:item[12],
                    def:item[13],
                    ava:item[14],
                })
            }
        })
        return arr;
    },
    filterKind:(data)=>{
        let arr=[]
        data.map((item,index)=>{
            if(index!==0){
                arr.push({
                    idNum:item[0],
                    proName:item[1],
                    eName:item[2],
                    price:item[3],
                    pic:item[4],
                    type:item[5],
                    state:item[6],
                    def:item[7],
                })
            }
        })
        return arr;
    },
    filterTed:(data)=>{
        let arr=[]
        data.map((item,index)=>{
            if(index!==0){
                arr.push({
                    id:item[0],
                    speakerName:item[1],
                    title:item[2],
                    main_pic:item[3],
                    duration:item[4],
                    description:item[5],
                    downloads:item[6],
                    start:item[7],
                    audio:item[8],
                    tags:item[9],
                    letter:item[10],
                })
            }
        })
        return arr;
    },
    filterRota:(data)=>{
        let arr=[]
        data.map((item,index)=>{
            if(index!==0){
                arr.push({
                    idNum:item[0],
                    pic:item[1],
                })
            }
        })
        return arr;
    },
    exportdata:(_headers,rows)=>{
        var conf={}
        conf.name="mysheet"
        conf.cols=[]
        for(var i = 0; i < _headers.length; i++){
            var col = {};
            col.caption = _headers[i].caption;
            col.type = _headers[i].type;
            conf.cols.push(col);
        }
        conf.rows = rows;
        var result = nodeExcel.execute(conf);
        return result;

    }
}
module.exports=fileMd
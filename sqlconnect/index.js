let express = require('express');
let app = express();
let sql = require('mssql');

app.listen(3030, ()=>{console.log("Server is running on 3030")})

app.get('/', function(request, response){
    response.write("This is the home page");
    response.end()
})

let config = {
    user :'sa',
    password :'Martina@1399',
    server :'lenovo\\SQLEXPRESS',
    database :'organization',
    options :{
        encrypt: false,
        useUTC: true
     
    }
}

sql.connect(config, function(error){
    if(error)
    console.log(error);
    else
    console.log("Sql Connected");
})

app.get('/viewemp', function(request,response){
    let req = new sql.Request();
    req.query('select * from employee', function(records,error){
        if(error)
        console.log(error)
        else
        response.send(records)
    })

    app.post('/insertemp', function(request,response){
        let req = new sql.Request();
        req.query(`insert into employee values(7,'florina',54000,'1999-04-08',16)`,
        function(recordset, error){
            if(error)
            console.log(error)
        else
        response.send(recordset)

        })
    })
})
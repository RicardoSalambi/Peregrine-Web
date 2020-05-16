module.exports = (Sequelize,connection) =>  {


    return connection.define('workleave', {
        
        date  : {
            type  : Sequelize.DATE
        },
        id  : {
            type  : Sequelize.INTEGER,
            primaryKey    : true
        },
        name  : {
            type  : Sequelize.TEXT
        },
        surname  : {
            type  : Sequelize.TEXT
        },
        file  : {
            type  : Sequelize.BLOB('long')
        } 


  });
}
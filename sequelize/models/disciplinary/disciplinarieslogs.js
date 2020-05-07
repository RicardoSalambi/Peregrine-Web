module.exports = (Sequelize,connection) =>  {


    return connection.define('disciplinarieslogs', {

        date  : {
            type  : Sequelize.DATE,
            primaryKey    : true
        },
        worknumber  : {
            type  : Sequelize.INTEGER
        },
        MDD  : {
            type  : Sequelize.TEXT
        },        
        file  : {
            type  : Sequelize.BLOB('long')
        },
        comments : {
            type  : Sequelize.TEXT
        },


  });
}
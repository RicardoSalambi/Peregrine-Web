module.exports = (Sequelize,connection) =>  {


    return connection.define('disciplinaries', {
        
        date  : {
            type  : Sequelize.DATE
        },
        worknumber  : {
            type  : Sequelize.INTEGER,
            primaryKey    : true
        },
        MDD  : {
            type  : Sequelize.TEXT
        },
        filename : {
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
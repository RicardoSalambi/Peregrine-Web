module.exports = (Sequelize,connection) =>  {


    return connection.define('externalsituations', {
        
        date  : {
            type  : Sequelize.DATE
        },
        worknumber  : {
            type  : Sequelize.INTEGER,
            primaryKey    : true
        },
        responsiblities  : {
            type  : Sequelize.TEXT
        },


  });
}
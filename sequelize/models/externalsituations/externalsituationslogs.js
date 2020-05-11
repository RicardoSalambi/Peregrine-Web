module.exports = (Sequelize,connection) =>  {


    return connection.define('externalsituationslogs', {

        date  : {
            type  : Sequelize.DATE,
            primaryKey    : true
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
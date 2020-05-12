module.exports = (Sequelize,connection) =>  {


    return connection.define('traininglogs', {

        date  : {
            type  : Sequelize.DATE,
            primaryKey    : true
        },
        worknumber  : {
            type  : Sequelize.INTEGER,
            primaryKey    : true
        },
        trainingdescription  : {
            type  : Sequelize.TEXT
        },
        startdate  : {
            type  : Sequelize.DATEONLY
        },
        enddate : {
            type  : Sequelize.DATEONLY
        },
        filename : {
            type  : Sequelize.TEXT
        },
        file  : {
            type  : Sequelize.BLOB('long')
        }   


  });
}
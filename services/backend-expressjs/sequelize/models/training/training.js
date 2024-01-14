module.exports = (Sequelize,connection) =>  {


    return connection.define('trainings', {
        
        date  : {
            type  : Sequelize.DATE
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
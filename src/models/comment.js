'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsToMany(models.NewReport, {
        through: 'NewReports',
        as: 'newreport',
        foreingKey: 'id',
      });
      Comments.belongsToMany(models.User, {
        through: 'Users',
        as: 'user',
        foreingKey: 'id',
      });
    }
  }
  Comments.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'userId is required',
          },
        },
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'body is required',
          },
        },
      },
      newReportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'newReportId is required',
          },
        },
      },
      timestamps: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: 'Comments',
    }
  );
  return Comments;
};

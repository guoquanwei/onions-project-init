module.exports = (sequelize, DataTypes) => {
  const UserMeasuring = sequelize.define('UserMeasuring', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    measuringId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '布置表Id'
    },
    packageId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '资源包packageId'
    },
    userId: {
      type: DataTypes.STRING(24),
      allowNull: false,
      comment: '学生Id'
    },
    state: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: 'unfinished',
      comment: '完成状态'
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '开始作业时间'
    },
    finishedTime: {
      type: DataTypes.DATE,
      comment: '完成作业时间'
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    tableName: 'userMeasuring',
    comment: '学生作业记录表'
  })
  UserMeasuring.associate = function (models) {}
  return UserMeasuring
}

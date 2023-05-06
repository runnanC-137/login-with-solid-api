import { Model, DataTypes, type Sequelize } from 'sequelize'
import sequelize from '.'
class User extends Model {
  public id!: number
  public name!: string
  public email!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static initialize (sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true
        }
      },
      {
        sequelize,
        tableName: 'users',
        modelName: 'User'
      }
    )
  }

  static associate (models: any): void {
    // Define associations here
  }
}
User.initialize(sequelize)
export { User as user }

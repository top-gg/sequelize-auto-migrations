import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "account",
  timestamps: false,
  underscored: true,
})
export class Account extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Default(1000)
  @Column(DataType.BIGINT)
  testParam: string;

  @Default("abc")
  @Column
  firstName: string;

  @Default("")
  @Column
  lastName: string;

  @Column
  nickname: string;

  @Column
  gender: "male" | "female" | "other";

  @Column(DataType.DATEONLY)
  birthDate: Date;

  @Column
  lastLoginDate: Date;

  @Column
  createdAt: Date;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  isDeleted: boolean;

  @Column
  isBlocked: boolean;
}

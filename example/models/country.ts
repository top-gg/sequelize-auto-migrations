import {
  AllowNull,
  AutoIncrement,
  Column,
  Index,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "country",
  underscored: true,
  timestamps: false,
})
export class Country extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Index
  @AllowNull(false)
  @Column
  title: string;

  @Index
  @AllowNull(false)
  @Column
  display: boolean;
}

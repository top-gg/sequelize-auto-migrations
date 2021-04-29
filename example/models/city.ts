import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "city",
})
export class City extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  title: string;

  @Column
  display: string;
}

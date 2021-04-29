import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "geo",
})
export class Geo extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.GEOMETRY)
  geometry_1: number;

  @AllowNull(false)
  @Column(DataType.GEOMETRY("POINT"))
  geometry_2: number;

  @AllowNull(false)
  @Column(DataType.GEOMETRY("POINT", 4326))
  geometry_3: number;
}

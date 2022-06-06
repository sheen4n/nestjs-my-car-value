import {Report} from 'src/reports/report.entity';
import {
  AfterInsert,
  // AfterRemove,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany((): typeof Report => Report, (report: Report): User => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert () {
    console.log('Inserted User with id', this.id);
  }
  @AfterUpdate()
  logUpdate () {
    console.log('Updated User with id', this.id);
  }
  @BeforeRemove()
  logRemove () {
    console.log('Removed User with id', this.id);
  }
}

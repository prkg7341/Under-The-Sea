import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Artist } from "./Artist";
import { Nft } from "./nft-model";

@Entity()
export class Edition {
  @PrimaryGeneratedColumn()
  edition_seq: number;

  @Column()
  artist_seq: number;

  @Column()
  edition_name: string;

  @Column()
  edition_image: string;

  @Column()
  edition_description: string;

  @Column()
  edition_royalty: number;

  @CreateDateColumn()
  reg_dt: Date;

  @ManyToOne(() => Artist, (artist) => artist.editions)
  @JoinColumn()
  artistSeq2: Artist;

  @OneToMany(() => Nft, (nft) => nft.editionSeq2)
  nfts: Nft[];
}

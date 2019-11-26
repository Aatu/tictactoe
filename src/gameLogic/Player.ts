export interface IPlayer {
  id: number;
  name: string;
  character: string;
  ai: boolean;
}
export class Player implements IPlayer {
  id: number;
  name: string;
  character: string;
  ai: boolean;

  constructor(
    id: number = 1,
    name: string = "",
    character: string = "x",
    ai: boolean = false
  ) {
    this.id = id;
    this.name = ai ? "Computer" : "Player";
    this.character = character;
    this.ai = ai;
  }

  isAi() {
    return this.ai;
  }

  serialize(): IPlayer {
    return {
      id: this.id,
      name: this.name,
      character: this.character,
      ai: this.ai
    };
  }

  deserialize(data: IPlayer) {
    this.id = data.id;
    this.name = data.name;
    this.character = data.character;
    this.ai = data.ai;

    return this;
  }
}

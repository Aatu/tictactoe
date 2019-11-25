export class Player {

  id: number
  character: string
  ai: boolean

  constructor(id: number, character: string, ai: boolean = false) {
    this.id = id;
    this.character = character;
    this.ai = ai;
  }
}
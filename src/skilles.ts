import { SkillRarity } from "./constants";
import { Busyo, SkillArgs } from "./models";
import type { Skill } from "./types.d.ts";

export const SkillNames: string[] = ["天鷹炯眼", "針葉浄美", "遁世影武者"];

export class SkillCreator {
  static create(name: string, busyo: Busyo): Skill | null {
    switch (name) {
      case "天鷹炯眼":
        return new 天鷹炯眼(busyo);
      case "針葉浄美":
        return new 針葉浄美(busyo);
      case "遁世影武者":
        return new 遁世影武者(busyo);
      default:
        return null;
    }
  }
}

interface SkillOption {
  ratio?: number;
  effect?: number;
  immediate?: boolean;
}

class BaseSkill implements Skill {
  name: string;
  ratio: number;
  effect: number;
  busyo: Busyo;
  rarity: SkillRarity;
  imitable = true;

  constructor(
    busyo: Busyo,
    name: string,
    rarity: SkillRarity,
    options: SkillOption = {}
  ) {
    this.busyo = busyo;
    this.name = name;
    this.rarity = rarity;
    this.ratio = options.ratio ?? 0;
    this.effect = options.effect ?? 0;
    this.imitable = options.immediate ?? true;
  }

  culcEffect(args: SkillArgs): void {
    throw new Error("Method not implemented.");
  }
}

class ImitateSkill extends BaseSkill {
  constructor(
    busyo: Busyo,
    name: string,
    rarity: SkillRarity,
    options: SkillOption = {}
  ) {
    super(busyo, name, rarity, options);
  }

  getReaderSkill(args: SkillArgs): Skill | null {
    const reader = args.getReader(this.busyo);
    const skillName = reader.getFirstSkill().name;
    return SkillCreator.create(skillName, this.busyo);
  }

  preEffect(args: SkillArgs): void {
    const readerSkill = this.getReaderSkill(args);
    if (readerSkill.imitable) {
      args.isImitating = true;
      readerSkill.preEffect(args);
    }
  }

  culcEffect(args: SkillArgs): void {
    const readerSkill = this.getReaderSkill(args);
    if (readerSkill) {
      args.isImitating = true;
      readerSkill.culcEffect(args);
    }
  }
}

class 天鷹炯眼 extends BaseSkill {
  constructor(busyo: Busyo) {
    super(busyo, "天鷹炯眼", SkillRarity.S, { ratio: 0.24, effect: 1.16 });
  }

  preEffect(args: SkillArgs): void {
    const lineNumber = args.getBrigadeIndex(this.busyo);
    args.BrigadeEffects[lineNumber].cost += 3;
  }

  culcEffect(args: SkillArgs): void {
    const brigadeIndex = args.getBrigadeIndex(this.busyo);
    args.BrigadeEffects[brigadeIndex].all *= this.effect * this.ratio;
  }
}

class 針葉浄美 extends BaseSkill {
  constructor(busyo: Busyo) {
    super(busyo, "針葉浄美", SkillRarity.S, { ratio: 1, effect: 5 });
  }

  preeffect(args: SkillArgs): void {
    const lineNumber = args.getBrigadeIndex(this.busyo);
    args.BrigadeEffects[lineNumber].addProbabilityOnlyPrincess += 0.1;
  }

  culcEffect(args: SkillArgs): void {
    const brigadeIndex = args.getBrigadeIndex(this.busyo);
    args.BrigadeEffects[brigadeIndex].all *=
      this.effect * (this.ratio + args.probabilityAddition);
  }
}

class 遁世影武者 extends ImitateSkill {
  constructor(busyo: Busyo) {
    super(busyo, "遁世影武者", SkillRarity.B, { ratio: 1 });
  }
}

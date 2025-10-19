import { SkillRarity } from "./constants";
import { Busyo, ParameterMatrix, SkillArgs } from "./models";

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

  constructor(name: string, rarity: SkillRarity, options: SkillOption = {}) {
    this.name = name;
    this.rarity = rarity;
    this.ratio = options.ratio ?? 0;
    this.effect = options.effect ?? 0;
    this.imitable = options.immediate ?? true;
  }

  getProbability(args: SkillArgs): number {
    const t =
      this.ratio +
      args.totalAdditionalProbability +
      args.rankBonus +
      args.strategyBonus;
    return t >= 1 ? 1 : t;
  }

  preEffect(args: SkillArgs): void {
    return;
  }

  culcEffect(args: SkillArgs): void {
    throw new Error("Method not implemented.");
  }

  reduceCost(args: SkillArgs, effectValue: number): void {
    const brigadeIndex = args.getBrigadeIndex(this.busyo);
    const reduceValue = this.busyo.cost > effectValue ? effectValue : this.busyo.cost;
    args.brigadePreEffects[brigadeIndex].reduceCost += reduceValue;
  }

  culcEffectAll(args: SkillArgs): void {
    const brigadeIndex = args.getBrigadeIndex(this.busyo);
    const probability = this.getProbability(args);
    const effect = this.effect * probability;
    const m: ParameterMatrix = new ParameterMatrix();
    m.setAll(effect);
    args.putResult(brigadeIndex, m);
  }
}

class ImitateSkill extends BaseSkill {
  constructor(name: string, rarity: SkillRarity, options: SkillOption = {}) {
    super(name, rarity, options);
  }

  getReaderSkill(args: SkillArgs): Skill | null {
    const reader = args.getReader(this.busyo);
    const skillName = reader.getFirstSkill().name;
    return createSkill(skillName, this.busyo);
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

class Test extends BaseSkill {
  constructor() {
    super("Test", SkillRarity.S, { ratio: 0.5, effect: 1 });
  }
  culcEffect(args: SkillArgs): void {
    super.culcEffectAll(args);
  }
}

class 龍驤虎躍 extends BaseSkill {
  constructor() {
    super("龍驤虎躍", SkillRarity.S, { ratio: 0.6, effect: 8.1 });
  }

  preEffect(args: SkillArgs): void {
    this.reduceCost(args, 1);
  }

  culcEffect(args: SkillArgs): void {
    super.culcEffectAll(args);
  }
}

class 天鷹炯眼 extends BaseSkill {
  constructor() {
    super("天鷹炯眼", SkillRarity.S, { ratio: 0.24, effect: 1.16 });
  }

  preEffect(args: SkillArgs): void {
    const lineNumber = args.getBrigadeIndex(this.busyo);
    args.brigadePreEffects[lineNumber].additionalCost += 3;
  }

  culcEffect(args: SkillArgs): void {
    const brigadeIndex = args.getBrigadeIndex(this.busyo);
    const effect = this.effect * (this.ratio + args.totalAdditionalProbability);
    const m: ParameterMatrix = new ParameterMatrix();
    m.setAll(effect);
    args.putResult(brigadeIndex, m);
  }
}

class 針葉浄美 extends BaseSkill {
  constructor() {
    super("針葉浄美", SkillRarity.S, { ratio: 1, effect: 5 });
  }

  preEffect(args: SkillArgs): void {
    const index = args.getBrigadeIndex(this.busyo);
    args.brigadePreEffects[index].additionalProbability.princess += 0.1;
  }

  culcEffect(args: SkillArgs): void {
    const brigadeIndex = args.getBrigadeIndex(this.busyo);
    const probability = this.getProbability(args);
    const effect = this.effect * probability;
    const m: ParameterMatrix = new ParameterMatrix();
    m.setAll(effect);
    args.putResult(brigadeIndex, m);
  }
}

class 清賢ノ遊姫 extends BaseSkill {
  constructor() {
    super("清賢ノ遊姫", SkillRarity.B, { ratio: 1, effect: 1.4 });
  }

  preEffect(args: SkillArgs): void {
    const brigadeIndex = args.getBrigadeIndex(this.busyo);
    args.brigadePreEffects[brigadeIndex].additionalProbability.princess += 0.1;
    args.brigadePreEffects[
      brigadeIndex
    ].additionalTakuetsuProbability.princess += 0.25;
  }

  culcEffect(args: SkillArgs): void {
    const brigadeIndex = args.getBrigadeIndex(this.busyo);
    const effect = this.effect * this.ratio;
    const m: ParameterMatrix = new ParameterMatrix();
    m.setAll(effect);
    args.putResult(brigadeIndex, m);
  }
}

class 遁世影武者 extends ImitateSkill {
  constructor() {
    super("遁世影武者", SkillRarity.B, { ratio: 1 });
  }
}

/** スキル名一覧を取得する */
export const getSkillNames = () => Object.keys(skillDefMap);

/** スキルクラスのインスタンスをスキル名から生成する */
export const createSkill = (name: string, busyo: Busyo): Skill | null => {
  const defFunc = skillDefMap[name];
  if (defFunc) {
    const skill = defFunc();
    skill.busyo = busyo;
    return skill;
  }
  return null;
};

export interface Skill {
  busyo: Busyo;
  name: string;
  rarity: SkillRarity;
  imitable: boolean; // 模倣可能かどうか
  ratio: number;
  effect: number;
  preEffect(args: SkillArgs): void;
  culcEffect(args: SkillArgs): void;
}


const skillList: Skill[] = [
  new Test(),
  // し
  new 針葉浄美(),
  // せ
  new 清賢ノ遊姫(),
  // て
  new 天鷹炯眼(),
  // と
  new 遁世影武者(),
  // り
  new 龍驤虎躍(),
];

const skillDefMap: Record<string, () => Skill> = skillList.reduce(
  (map, skill) => {
    map[skill.name] = () => {
      return skill;
    };
    return map;
  },
  {} as Record<string, () => Skill>
);
